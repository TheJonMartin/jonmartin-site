// Step 2: gate checks from BUILD_PLAN.md "Gate" section, rules 1-9.

import { pageText, pageProse, computedValues, relatedFor, MAX_RELATED } from './render.mjs';

const BANNED_PHRASES = [
	'steward',
	'staff-only',
	'staff only',
	'we implement',
	'i implement',
	'implement it for you',
	'done-for-you',
	'aggregaterating',
	'"@type":"review"',
];

const OWN_PRICE_PHRASES = ['$29', '$199', '$19/mo', '$49'];
const PLANNED_LIVE_PHRASES = ['available now', 'sign up today', 'get started'];
const PROXIMITY_CHARS = 80;

function wordCount(text) {
	return text.trim().split(/\s+/).filter(Boolean).length;
}

function shingles(text, n = 5) {
	const words = text
		.toLowerCase()
		.replace(/[^a-z0-9\s$%.,-]/g, '')
		.split(/\s+/)
		.filter(Boolean);
	const set = new Set();
	for (let i = 0; i + n <= words.length; i++) set.add(words.slice(i, i + n).join(' '));
	return set;
}

function jaccard(a, b) {
	if (a.size === 0 || b.size === 0) return 0;
	let intersection = 0;
	for (const x of a) if (b.has(x)) intersection++;
	const union = a.size + b.size - intersection;
	return union === 0 ? 0 : intersection / union;
}

function lowerIndices(text, needle) {
	const lowerText = text.toLowerCase();
	const lowerNeedle = needle.toLowerCase();
	const positions = [];
	let idx = lowerText.indexOf(lowerNeedle);
	while (idx !== -1) {
		positions.push(idx);
		idx = lowerText.indexOf(lowerNeedle, idx + 1);
	}
	return positions;
}

function within(text, a, b, maxDist) {
	const posA = lowerIndices(text, a);
	if (posA.length === 0) return false;
	const posB = lowerIndices(text, b);
	for (const pa of posA) for (const pb of posB) if (Math.abs(pa - pb) <= maxDist) return true;
	return false;
}

function daysBetween(dateA, dateB) {
	const a = new Date(dateA);
	const b = new Date(dateB);
	return Math.abs((a.getTime() - b.getTime()) / 86400000);
}

function collectHtmlFragments(page) {
	const out = [];
	for (const section of page.sections) {
		for (const block of section.blocks) {
			if (block.type === 'p') out.push(block.html);
			else if (block.type === 'table') {
				out.push(...block.head);
				for (const row of block.rows) out.push(...row);
			} else if (block.type === 'ul' || block.type === 'ol' || block.type === 'steps') out.push(...block.items);
		}
	}
	return out;
}

function findAnchors(html) {
	const anchors = [];
	const re = /<a\s+[^>]*>/gi;
	let m;
	while ((m = re.exec(html))) {
		const tag = m[0];
		const href = tag.match(/href\s*=\s*"([^"]*)"/i) ?? tag.match(/href\s*=\s*'([^']*)'/i);
		const rel = tag.match(/rel\s*=\s*"([^"]*)"/i) ?? tag.match(/rel\s*=\s*'([^']*)'/i);
		anchors.push({ href: href?.[1] ?? null, rel: rel?.[1] ?? null });
	}
	return anchors;
}

const NUMBER_RE = /\$?\d[\d,]*(?:\.\d+)?%?\+?/g;

function normalizeNumber(token) {
	return Number(token.replace(/^\$/, '').replace(/,/g, '').replace(/%$/, '').replace(/\+$/, ''));
}

function checkOptionsCount(page, spec, errors) {
	const optionCount = spec.products.filter((p) => p.role === 'option').length;
	const min = page.template === 'best' ? 3 : 2;
	if (optionCount < min) errors.push(`rule 1: expected >= ${min} option products, found ${optionCount}`);
}

function checkFacts(page, spec, facts, runDate, errors) {
	const optionSlugs = spec.products.filter((p) => p.role === 'option').map((p) => p.slug);
	for (const slug of optionSlugs) {
		const productFacts = facts.filter((f) => f.product === slug);
		if (productFacts.length < 5) errors.push(`rule 2: product "${slug}" has ${productFacts.length} facts, needs >= 5`);
		const stale = productFacts.filter((f) => daysBetween(f.checked_at, runDate) > 30);
		for (const f of stale) errors.push(`rule 2: fact "${f.id}" checked_at ${f.checked_at} is stale vs run date ${runDate}`);
	}
	const hasComputed = (spec.computed ?? []).length > 0;
	const hasFitTable = page.fitTable && page.fitTable.rows.length >= 1;
	if (!hasComputed && !hasFitTable) errors.push('rule 2: page has no computed value and no fit table with >= 1 row');
}

function checkBodyAndSimilarity(page, otherPages, errors) {
	const text = pageText(page);
	const words = wordCount(text);
	if (words < 600) errors.push(`rule 3: body has ${words} words, needs >= 600`);
	const mySet = shingles(text);
	for (const other of otherPages) {
		const score = jaccard(mySet, shingles(pageText(other)));
		if (score >= 0.5) errors.push(`rule 3: too similar to "${other.slug}" (jaccard ${score.toFixed(2)})`);
	}
}

function checkNumbers(page, spec, facts, errors) {
	const computed = computedValues(spec, facts);
	const computedNumbers = new Set([...computed.values()].map((c) => c.result));
	const tokens = pageText(page).match(NUMBER_RE) ?? [];
	const seen = new Set();
	for (const token of tokens) {
		if (seen.has(token)) continue;
		seen.add(token);
		const num = normalizeNumber(token);
		if (Number.isNaN(num)) continue;
		const matchesFact = facts.some((f) => f.number === num || f.value.includes(token));
		const matchesComputed = computedNumbers.has(num);
		const isYear = Number.isInteger(num) && num >= 2000 && num <= 2100;
		const isSmallInt = Number.isInteger(num) && num >= 1 && num <= 10;
		if (!matchesFact && !matchesComputed && !isYear && !isSmallInt) {
			errors.push(`rule 4: number "${token}" in body text doesn't match a fact, computed value, year, or 1-10`);
		}
	}
}

function checkDisclosureAndLinks(page, links, errors) {
	const htmlFragments = collectHtmlFragments(page);
	const anchors = htmlFragments.flatMap(findAnchors);
	const linkValues = new Set(Object.values(links));
	const sponsoredAnchors = anchors.filter((a) => a.rel && /sponsored/i.test(a.rel));
	const hasAffiliateCta = page.ctas.some((c) => c.kind === 'affiliate');

	if ((hasAffiliateCta || sponsoredAnchors.length > 0) && !page.disclosure) {
		errors.push('rule 5: disclosure is missing but the page has an affiliate link');
	}
	for (const cta of page.ctas) {
		if (cta.kind === 'affiliate' && !linkValues.has(cta.href)) {
			errors.push(`rule 5: affiliate cta href "${cta.href}" is not in the links map`);
		}
	}
	for (const a of sponsoredAnchors) {
		if (!a.rel || !/nofollow/i.test(a.rel)) errors.push(`rule 5: sponsored anchor missing "nofollow" in rel (href "${a.href}")`);
		if (!a.href || !linkValues.has(a.href)) errors.push(`rule 5: sponsored anchor href "${a.href}" is not in the links map`);
	}
}

function checkBannedWords(page, errors) {
	const haystacks = [pageText(page).toLowerCase(), JSON.stringify(page).toLowerCase()];
	for (const phrase of BANNED_PHRASES) {
		if (haystacks.some((h) => h.includes(phrase))) errors.push(`rule 6: banned phrase "${phrase}" found`);
	}

	const text = pageText(page);
	const ownNames = page.products.filter((p) => p.type === 'own_live' || p.type === 'own_planned').map((p) => p.name);
	for (const price of OWN_PRICE_PHRASES) {
		for (const name of ownNames) {
			if (within(text, price, name, PROXIMITY_CHARS)) errors.push(`rule 6: own-product price "${price}" found near "${name}"`);
		}
	}

	const plannedNames = page.products.filter((p) => p.type === 'own_planned').map((p) => p.name);
	for (const phrase of PLANNED_LIVE_PHRASES) {
		if (within(text, phrase, 'stripe sync', PROXIMITY_CHARS)) errors.push(`rule 6: planned-live wording "${phrase}" found near "stripe sync"`);
		for (const name of plannedNames) {
			if (within(text, phrase, name, PROXIMITY_CHARS)) errors.push(`rule 6: planned-live wording "${phrase}" found near "${name}"`);
		}
	}
}

function checkOwnProductClaims(page, claims, errors) {
	const liveProducts = page.products.filter((p) => p.type === 'own_live');
	if (liveProducts.length > 0) {
		const prose = pageProse(page);
		const sentences = prose
			.split(/(?<=[.!?])\s+/)
			.map((s) => s.trim())
			.filter(Boolean);
		for (const product of liveProducts) {
			for (const sentence of sentences) {
				if (!sentence.includes(product.name)) continue;
				const approved = claims.some((c) => c.product === product.slug && c.approved_by && c.claim.trim() === sentence);
				if (!approved) errors.push(`rule 7: sentence naming own product "${product.name}" has no approved claim: "${sentence}"`);
			}
		}
	}

	const plannedProducts = page.products.filter((p) => p.type === 'own_planned');
	for (const product of plannedProducts) {
		const liveCta = page.ctas.find((c) => c.product === product.slug && (c.kind === 'own' || c.kind === 'affiliate'));
		if (liveCta) errors.push(`rule 7: planned product "${product.name}" has a live cta (kind "${liveCta.kind}")`);
		if (within(JSON.stringify(page), 'available', product.name, PROXIMITY_CHARS)) {
			errors.push(`rule 7: planned product "${product.name}" is described as available`);
		}
	}
}

/** Rule 8: every option product on the page is linked somewhere (affiliate link if approved, else its own site). */
function checkEveryToolLinked(page, spec, products, links, errors) {
	const productsBySlug = new Map((products ?? []).map((p) => [p.slug, p]));
	for (const p of spec.products.filter((x) => x.role === 'option')) {
		const product = productsBySlug.get(p.slug);
		const hasAffiliate = Boolean(p.link && links?.[p.slug]);
		const hasSite = Boolean(product?.site);
		if (!hasAffiliate && !hasSite) {
			errors.push(`rule 8: option product "${p.slug}" has neither an affiliate link nor a site URL`);
			continue;
		}
		if (!page.ctas.some((c) => c.product === p.slug && (c.kind === 'affiliate' || c.kind === 'site'))) {
			errors.push(`rule 8: option product "${p.slug}" has no link on the page`);
		}
	}	// Products only mentioned in prose (role "mention") must be linked inline via {{link:slug}}.
	const anchors = collectHtmlFragments(page).flatMap(findAnchors);
	for (const p of spec.products.filter((x) => x.role === 'mention')) {
		const product = productsBySlug.get(p.slug);
		const targets = [product?.site, p.link ? links?.[p.slug] : null].filter(Boolean);
		if (targets.length === 0) errors.push(`rule 8: mentioned product "${p.slug}" has neither an affiliate link nor a site URL`);
		else if (!anchors.some((a) => targets.includes(a.href))) errors.push(`rule 8: mentioned product "${p.slug}" is not linked in the page prose`);
	}
}

/** Rule 9: a page with at least one eligible sibling (live, not self, shares a product or niche) must carry at least one related link, and every related link must point at an eligible sibling. */
export function checkRelatedLinks(page, pool, errors = []) {
	const eligible = relatedFor(page, pool, Infinity);
	const related = page.related ?? [];
	if (eligible.length > 0 && related.length === 0) errors.push(`rule 9: page has ${eligible.length} eligible sibling page(s) but no related links`);
	const eligibleHrefs = new Set(eligible.map((r) => r.href));
	for (const r of related) if (!eligibleHrefs.has(r.href)) errors.push(`rule 9: related link ${r.href} is not a live sibling page`);
	if (related.length > MAX_RELATED) errors.push(`rule 9: ${related.length} related links (max ${MAX_RELATED})`);
	return errors;
}

export function gate(page, { spec, facts, products, links, claims, otherPages = [], runDate, relatedPool = null }) {
	const errors = [];
	checkOptionsCount(page, spec, errors);
	checkFacts(page, spec, facts, runDate, errors);
	checkBodyAndSimilarity(page, otherPages, errors);
	checkNumbers(page, spec, facts, errors);
	checkDisclosureAndLinks(page, links, errors);
	checkBannedWords(page, errors);
	checkOwnProductClaims(page, claims, errors);
	checkEveryToolLinked(page, spec, products, links, errors);
	if (relatedPool) checkRelatedLinks(page, relatedPool, errors);
	return { ok: errors.length === 0, errors };
}
