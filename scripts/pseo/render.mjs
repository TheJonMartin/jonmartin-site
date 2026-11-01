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

function resolveTokens(text, ctx) {
	return text.replace(/\{\{([^}]*)\}\}/g, (match, inner) => {
		const [kind, id] = inner.split(':');
		if (kind === 'fact') {
			const fact = ctx.factsById.get(id);
			if (!fact) throw new Error(`unknown fact token: {{${inner}}}`);
			return escapeHtml(fact.value);
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
	if (block.type === 'p') return { type: 'p', html: resolveTokens(block.html, ctx) };
	if (block.type === 'h3') return { type: 'h3', text: resolveTokens(block.text, ctx) };
	if (block.type === 'table') {
		return {
			type: 'table',
			...(block.caption ? { caption: resolveTokens(block.caption, ctx) } : {}),
			head: block.head.map((h) => resolveTokens(h, ctx)),
			rows: block.rows.map((row) => row.map((cell) => resolveTokens(cell, ctx))),
		};
	}
	// 'ul' | 'ol' | 'steps'
	return { type: block.type, items: block.items.map((item) => resolveTokens(item, ctx)) };
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
	const rows = spec.niche.must_haves.map((mustHave) => {
		const row = [mustHave];
		for (const p of optionProducts) {
			const cell = spec.fit?.[mustHave]?.[p.slug];
			row.push(cell !== undefined ? resolveTokens(cell, ctx) : '');
		}
		return row;
	});
	return { caption: `Fit for ${resolveTokens(spec.niche.label, ctx)}`, head, rows };
}

function buildCtas(spec, productsBySlug, links) {
	const ctas = [];
	for (const p of spec.products) {
		const product = productsBySlug.get(p.slug);
		if (p.role === 'option') {
			if (p.link && links[p.slug]) {
				ctas.push({ label: `Try ${product.name}`, href: links[p.slug], kind: 'affiliate', product: p.slug });
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
		sources.push({ text: `${productsBySlug.get(fact.product).name} pricing page`, href: fact.source_url });
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
	const ctx = { factsById, computed };

	const dek = spec.dek.map((line) => resolveTokens(line, ctx));
	const sections = spec.sections.map((section) => ({
		label: resolveTokens(section.label, ctx),
		blocks: section.blocks.map((block) => resolveBlock(block, ctx)),
	}));
	const faq = (spec.faq ?? []).map((f) => ({ q: resolveTokens(f.q, ctx), a: resolveTokens(f.a, ctx) }));
	const ctas = buildCtas(spec, productsBySlug, links);
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
			return { slug: p.slug, name: product.name, type: product.product_type };
		}),
		sources: buildSources(spec, facts, productsBySlug),
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
			} else parts.push(...block.items.map(stripTags));
		}
	}
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
