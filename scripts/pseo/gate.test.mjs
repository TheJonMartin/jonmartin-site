import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { renderPage } from './render.mjs';
import { gate } from './gate.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(dir, 'fixtures');

function loadJson(...parts) {
	return JSON.parse(readFileSync(path.join(fixturesDir, ...parts), 'utf8'));
}

const facts = loadJson('facts.json');
const products = loadJson('products.json');
const links = loadJson('links.json');
const claims = loadJson('claims.json');
const specs = {
	best: loadJson('specs', 'best.json'),
	compare: loadJson('specs', 'compare.json'),
	'howto-planned': loadJson('specs', 'howto-planned.json'),
};

const RUN_DATE = '2026-10-31';
const EXPECTED_KEYS = [
	'slug',
	'route',
	'template',
	'status',
	'title',
	'seoTitle',
	'description',
	'h1',
	'dek',
	'published',
	'modified',
	'checked',
	'disclosure',
	'niche',
	'fitTable',
	'sections',
	'faq',
	'closing',
	'ctas',
	'products',
	'sources',
].sort();

function render(spec, overrides = {}) {
	return renderPage(spec, { facts, products, links, claims, runDate: RUN_DATE, ...overrides });
}

function renderAll() {
	return {
		best: render(specs.best),
		compare: render(specs.compare),
		'howto-planned': render(specs['howto-planned']),
	};
}

for (const name of Object.keys(specs)) {
	test(`${name} fixture renders the step-1 page shape and passes the gate`, () => {
		const pages = renderAll();
		const page = pages[name];
		assert.deepEqual(Object.keys(page).sort(), EXPECTED_KEYS);

		const otherPages = Object.keys(pages)
			.filter((k) => k !== name)
			.map((k) => pages[k]);
		const result = gate(page, { spec: specs[name], facts, products, links, claims, otherPages, runDate: RUN_DATE });
		assert.deepEqual(result.errors, []);
		assert.equal(result.ok, true);
	});
}

test('rule 2: fails when an option product has too few facts', () => {
	const page = render(specs.best);
	const reducedFacts = facts.filter((f) => !(f.product === 'gamma-crm' && ['gamma.integrations', 'gamma.support'].includes(f.id)));
	const result = gate(page, { spec: specs.best, facts: reducedFacts, products, links, claims, runDate: RUN_DATE });
	assert.equal(result.ok, false);
	assert.ok(result.errors.some((e) => e.startsWith('rule 2:') && e.includes('gamma-crm')), result.errors.join('\n'));
});

test('rule 2: fails when facts are stale relative to the run date', () => {
	const page = render(specs.best);
	const result = gate(page, { spec: specs.best, facts, products, links, claims, runDate: '2026-12-31' });
	assert.equal(result.ok, false);
	assert.ok(result.errors.some((e) => e.startsWith('rule 2:') && e.includes('stale')), result.errors.join('\n'));
});

test('rule 4: fails when the body has a number with no matching fact', () => {
	const spec = structuredClone(specs.best);
	spec.sections[0].blocks.push({ type: 'p', html: 'A one-time setup consultation costs $77 if you want a human to do it for you.' });
	const page = render(spec);
	const result = gate(page, { spec, facts, products, links, claims, runDate: RUN_DATE });
	assert.equal(result.ok, false);
	assert.ok(result.errors.some((e) => e.startsWith('rule 4:') && e.includes('$77')), result.errors.join('\n'));
});

test('rule 6: fails on a banned phrase', () => {
	const spec = structuredClone(specs.best);
	spec.sections[0].blocks.push({ type: 'p', html: 'This feature is staff-only for now.' });
	const page = render(spec);
	const result = gate(page, { spec, facts, products, links, claims, runDate: RUN_DATE });
	assert.equal(result.ok, false);
	assert.ok(result.errors.some((e) => e.startsWith('rule 6:') && e.includes('staff-only')), result.errors.join('\n'));
});

test('rule 5: fails when an affiliate page has no disclosure', () => {
	const page = render(specs.best);
	page.disclosure = null;
	const result = gate(page, { spec: specs.best, facts, products, links, claims, runDate: RUN_DATE });
	assert.equal(result.ok, false);
	assert.ok(result.errors.some((e) => e.startsWith('rule 5:') && e.includes('disclosure')), result.errors.join('\n'));
});

test('rule 7: fails when a planned product gets a live cta', () => {
	const spec = structuredClone(specs['howto-planned']);
	const deltaSync = spec.products.find((p) => p.slug === 'delta-sync');
	deltaSync.role = 'own_cta';
	const page = render(spec);
	const result = gate(page, { spec, facts, products, links, claims, runDate: RUN_DATE });
	assert.equal(result.ok, false);
	assert.ok(result.errors.some((e) => e.startsWith('rule 7:') && e.includes('live cta')), result.errors.join('\n'));
});
