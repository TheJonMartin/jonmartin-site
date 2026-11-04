// Step 2: pure render of a page spec into the resolved JSON shape from src/lib/pseo.ts.
// No I/O here — facts/products/links/claims are plain objects passed in by the caller.

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const HTML_UNESCAPES = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" };

function escapeHtml(value) {
	return String(value).replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

function decodeEntities(text) {
	return text.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, (e) => HTML_UNESCAPES[e]);
}

function stripTags(html) {
	return html.replace(/<[^>]*>/g, '');
}

function formatNumber(n) {
	const isInt = Number.isInteger(n);
	return n.toLocaleString('en-US', isInt ? {} : { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatMoney(n) {
	return '$' + formatNumber(n);
}

/** expr is `<factId> * <n>` or `<factId> + <factId>`, operating on fact.number. */
function evalExpr(expr, factsById) {
	const m = expr.match(/^(\S+)\s*([*+])\s*(\S+)$/);
	if (!m) throw new Error(`invalid computed expr: ${expr}`);
	const [, leftId, op, rightRaw] = m;
	const left = factsById.get(leftId);
	if (!left || typeof left.number !== 'number') throw new Error(`computed expr references unknown/non-numeric fact: ${leftId}`);
	let moneyLike = left.value.startsWith('$');
	let result;
	if (op === '*') {
		const n = Number(rightRaw);
		if (Number.isNaN(n)) throw new Error(`invalid multiplier in computed expr: ${expr}`);
		result = left.number * n;
	} else {
		const right = factsById.get(rightRaw);
		if (!right || typeof right.number !== 'number') throw new Error(`computed expr references unknown/non-numeric fact: ${rightRaw}`);
		result = left.number + right.number;
		moneyLike = moneyLike || right.value.startsWith('$');
	}
	return { result, moneyLike };
}

/** Resolve a spec's `computed` entries against `facts`. Shared by renderPage and gate.mjs (rule 4). */
export function computedValues(spec, facts) {
	const factsById = new Map(facts.map((f) => [f.id, f]));
	const out = new Map();
	for (const c of spec.computed ?? []) {
		const { result, moneyLike } = evalExpr(c.expr, factsById);
		out.set(c.id, { result, formatted: moneyLike ? formatMoney(result) : formatNumber(result) });
	}
	return out;
}

/** Inline link to a product: affiliate link (sponsored) when approved, else the product's own site (plain). */
function productAnchor(slug, ctx) {
	const product = ctx.productsBySlug?.get(slug);
	if (!product) throw new Error(`unknown product in link token: ${slug}`);
	const specProduct = ctx.specProductsBySlug?.get(slug);
	const affiliate = specProduct?.link ? ctx.links?.[slug] : null;
	const name = escapeHtml(product.name);
	if (affiliate) return `<a href="${escapeHtml(affiliate)}" target="_blank" rel="sponsored nofollow noopener noreferrer">${name}</a>`;
	if (product.site) return `<a href="${escapeHtml(product.site)}" target="_blank" rel="noopener">${name}</a>`;
	throw new Error(`link token for "${slug}" but it has no affiliate link and no site`);
}

function escapeRegex(text) {
	return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Inside link-capable text, names of the spec's "mention" products that appear in a fact value become links (first occurrence each). */
function linkMentions(html, ctx) {
	let out = html;
	for (const [slug, sp] of ctx.specProductsBySlug ?? []) {
		if (sp.role !== 'mention') continue;
		const name = ctx.productsBySlug?.get(slug)?.name;
		if (!name) continue;
		const re = new RegExp(`(^|[^\\w>])(${escapeRegex(escapeHtml(name))})(?![\\w<])`);
		out = out.replace(re, (_, pre) => `${pre}${productAnchor(slug, ctx)}`);
	}
	return out;
}

function resolveTokens(text, ctx, { allowLinks = false } = {}) {
	return text.replace(/\{\{([^}]*)\}\}/g, (match, inner) => {
		const [kind, id] = inner.split(':');
		if (kind === 'link') {
			if (!allowLinks) throw new Error(`link token only allowed in paragraph html: {{${inner}}}`);
			return productAnchor(id, ctx);
		}
		if (kind === 'fact') {
			const fact = ctx.factsById.get(id);
			if (!fact) throw new Error(`unknown fact token: {{${inner}}}`);
			return allowLinks ? linkMentions(escapeHtml(fact.value), ctx) : escapeHtml(fact.value);
		}
		if (kind === 'calc') {
			const computed = ctx.computed.get(id);
			if (!computed) throw new Error(`unknown calc token: {{${inner}}}`);
			return escapeHtml(computed.formatted);
		}
		throw new Error(`unknown token: {{${inner}}}`);
	});
}

function resolveBlock(block, ctx) {
	if (block.type === 'p') return { type: 'p', html: resolveTokens(block.html, ctx, { allowLinks: true }) };
	if (block.type === 'h3') return { type: 'h3', text: resolveTokens(block.text, ctx) };
	if (block.type === 'table') {
		return {
			type: 'table',
			...(block.caption ? { caption: resolveTokens(block.caption, ctx) } : {}),
			head: block.head.map((h) => resolveTokens(h, ctx)),
			rows: block.rows.map((row) => row.map((cell) => resolveTokens(cell, ctx))),
		};
	}
	if (block.type === 'cta') {
		const cta = ctx.ctasByProduct?.get(block.product);
		if (!cta) throw new Error(`cta block references a product with no link: ${block.product}`);
		return { type: 'cta', product: block.product, label: cta.label, href: cta.href, kind: cta.kind };
	}
	// 'ul' | 'ol' | 'steps'
	return { type: block.type, items: block.items.map((item) => resolveTokens(item, ctx)) };
}

function headLink(cta) {
	return cta ? { label: cta.label, href: cta.href, kind: cta.kind } : null;
}

function buildFitTable(spec, ctx, productsBySlug) {
	if (spec.fitTable) {
		return {
			caption: resolveTokens(spec.fitTable.caption, ctx),
			head: spec.fitTable.head.map((h) => resolveTokens(h, ctx)),
			rows: spec.fitTable.rows.map((row) => row.map((cell) => resolveTokens(cell, ctx))),
		};
	}
	if (!spec.niche?.must_haves?.length) return null;
	const optionProducts = spec.products.filter((p) => p.role === 'option');
	const head = ['Must-have', ...optionProducts.map((p) => productsBySlug.get(p.slug).name)];
	// Same cells as trusted HTML, with {{link:slug}} and mention names linked.
	const rowsHtml = spec.niche.must_haves.map((mustHave) => [
		escapeHtml(mustHave),
		...optionProducts.map((p) => {
			const cell = spec.fit?.[mustHave]?.[p.slug];
			return cell !== undefined ? resolveTokens(cell, ctx, { allowLinks: true }) : '';
		}),
	]);
	const rows = rowsHtml.map((row) => row.map((cell) => decodeEntities(stripTags(cell))));
	const links = [null, ...optionProducts.map((p) => headLink(ctx.ctasByProduct?.get(p.slug)))];
	return { caption: `Fit for ${resolveTokens(spec.niche.label, ctx)}`, head, rows, rowsHtml, links };
}

function buildCtas(spec, productsBySlug, links) {
	const ctas = [];
	for (const p of spec.products) {
		const product = productsBySlug.get(p.slug);
		if (p.role === 'option') {
			// Every option product gets a link: affiliate when approved, otherwise the product's own site (plain link).
			if (p.link && links[p.slug]) {
				ctas.push({ label: `Try ${product.name}`, href: links[p.slug], kind: 'affiliate', product: p.slug });
			} else if (product.site) {
				ctas.push({ label: `Visit ${product.name}`, href: product.site, kind: 'site', product: p.slug });
			}
			continue;
		}
		if (p.role === 'own_cta') {
			ctas.push({ label: `Try ${product.name}`, href: product.cta_url, kind: 'own', product: p.slug });
			continue;
		}
		if (p.role === 'waitlist') {
			ctas.push({ label: 'Join the waitlist', href: `/contact?topic=${p.slug}-waitlist`, kind: 'waitlist', product: p.slug });
		}
	}
	return ctas;
}

function buildSources(spec, facts, productsBySlug) {
	const optionSlugs = new Set(spec.products.filter((p) => p.role === 'option').map((p) => p.slug));
	const seenUrls = new Set();
	const sources = [];
	for (const fact of facts) {
		if (!optionSlugs.has(fact.product) || seenUrls.has(fact.source_url)) continue;
		seenUrls.add(fact.source_url);
		sources.push({ text: fact.source_label ?? `${productsBySlug.get(fact.product).name} pricing page`, href: fact.source_url });
	}
	return sources;
}

function formatChecked(runDate) {
	const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const [y, m, d] = runDate.slice(0, 10).split('-').map(Number);
	return `${MONTHS[m - 1]} ${d}, ${y}`;
}

export function renderPage(spec, { facts, products, links, claims, runDate }) {
	const factsById = new Map(facts.map((f) => [f.id, f]));
	const productsBySlug = new Map(products.map((p) => [p.slug, p]));
	const computed = computedValues(spec, facts);
	const ctas = buildCtas(spec, productsBySlug, links);
	const ctasByProduct = new Map(ctas.map((c) => [c.product, c]));
	const specProductsBySlug = new Map(spec.products.map((p) => [p.slug, p]));
	const ctx = { factsById, computed, ctasByProduct, productsBySlug, specProductsBySlug, links };

	const dek = spec.dek.map((line) => resolveTokens(line, ctx));
	const sections = spec.sections.map((section) => ({
		label: resolveTokens(section.label, ctx),
		blocks: section.blocks.map((block) => resolveBlock(block, ctx)),
	}));
	const faq = (spec.faq ?? []).map((f) => {
		const aHtml = resolveTokens(f.a, ctx, { allowLinks: true });
		return { q: resolveTokens(f.q, ctx), a: decodeEntities(stripTags(aHtml)), aHtml };
	});
	const disclosure = ctas.some((c) => c.kind === 'affiliate')
		? 'This page contains affiliate links. If you sign up through one, I earn a commission. It costs you nothing extra.'
		: null;

	return {
		slug: spec.slug,
		route: spec.route,
		template: spec.template,
		status: 'live',
		title: resolveTokens(spec.title, ctx),
		seoTitle: resolveTokens(spec.seoTitle, ctx),
		description: resolveTokens(spec.description, ctx),
		h1: resolveTokens(spec.h1, ctx),
		dek,
		published: spec.published ?? runDate.slice(0, 10),
		modified: runDate.slice(0, 10),
		checked: formatChecked(runDate),
		disclosure,
		niche: { label: resolveTokens(spec.niche.label, ctx) },
		fitTable: buildFitTable(spec, ctx, productsBySlug),
		sections,
		faq,
		closing: resolveTokens(spec.closing, ctx),
		ctas,
		products: spec.products.map((p) => {
			const product = productsBySlug.get(p.slug);
			const cta = ctasByProduct.get(p.slug);
			return {
				slug: p.slug,
				name: product.name,
				type: product.product_type,
				...(p.pick ? { pick: resolveTokens(p.pick, ctx) } : {}),
				...(p.role === 'option' && cta ? { href: cta.href, linkKind: cta.kind } : {}),
			};
		}),
		sources: buildSources(spec, facts, productsBySlug),
		// Filled by attachRelated() once every page in the run is rendered.
		related: [],
	};
}

function proseParts(page) {
	const parts = [page.title, page.h1, ...page.dek];
	if (page.fitTable) {
		parts.push(page.fitTable.caption, ...page.fitTable.head);
		for (const row of page.fitTable.rows) parts.push(...row);
	}
	for (const section of page.sections) {
		parts.push(section.label);
		for (const block of section.blocks) {
			if (block.type === 'p') parts.push(stripTags(block.html));
			else if (block.type === 'h3') parts.push(block.text);
			else if (block.type === 'table') {
				if (block.caption) parts.push(block.caption);
				parts.push(...block.head);
				for (const row of block.rows) parts.push(...row.map(stripTags));
			} else if (block.type === 'cta') {
				// button label is covered by page.ctas in pageText
			} else parts.push(...block.items.map(stripTags));
		}
	}
	for (const p of page.products) if (p.pick) parts.push(p.pick);
	for (const f of page.faq) parts.push(f.q, f.a);
	parts.push(page.closing);
	return parts.filter(Boolean);
}

/** Prose text, excluding CTA labels — used by gate.mjs rule 7 (own-product sentence check). */
export function pageProse(page) {
	return decodeEntities(proseParts(page).join('\n'));
}

/** All visible prose, including CTA labels. */
export function pageText(page) {
	return decodeEntities(proseParts(page).concat(page.ctas.map((c) => c.label)).join('\n'));
}

export function affiliateLinks(page) {
	return page.ctas.filter((c) => c.kind === 'affiliate').map((c) => c.href);
}

export const MAX_RELATED = 4;

function nicheKey(page) {
	return (page.niche?.label ?? '').trim().toLowerCase();
}

function productSlugs(page) {
	return new Set((page.products ?? []).map((p) => p.slug));
}

/** Other live pages that share at least one product or the same niche with `page`, best match first (max 4, never self, never noindex). */
export function relatedFor(page, pool, max = MAX_RELATED) {
	const mine = productSlugs(page);
	return pool
		.filter((other) => other.slug !== page.slug && other.status === 'live')
		.map((other) => {
			const shared = [...productSlugs(other)].filter((slug) => mine.has(slug)).length;
			const sameNiche = nicheKey(other) !== '' && nicheKey(other) === nicheKey(page);
			return { other, shared, sameNiche };
		})
		.filter((c) => c.shared > 0 || c.sameNiche)
		.sort((a, b) => b.shared - a.shared || Number(b.sameNiche) - Number(a.sameNiche) || a.other.seoTitle.localeCompare(b.other.seoTitle))
		.slice(0, max)
		.map(({ other }) => ({
			slug: other.slug,
			route: other.route,
			title: other.seoTitle,
			dek: other.dek?.[0] ?? '',
			href: `/tools/${other.route}/${other.slug}`,
		}));
}

/** Sets `related` on each page in `targets` from the full pool, so a new page and its siblings link both ways on the same run. */
export function attachRelated(targets, pool) {
	for (const page of targets) page.related = relatedFor(page, pool);
	return targets;
}
