// Step 3: local substitute for Supabase + Notion, used by `run.mjs --local`.

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dir = path.dirname(fileURLToPath(import.meta.url));

function readJson(...parts) {
	return JSON.parse(readFileSync(path.join(dir, ...parts), 'utf8'));
}

/** Page specs always live in the repo (scripts/pseo/specs/*.json), regardless of --local. */
export function loadSpecs() {
	const specsDir = path.join(dir, 'specs');
	return readdirSync(specsDir)
		.filter((name) => name.endsWith('.json'))
		.sort()
		.map((name) => readJson('specs', name));
}

/** Same shape as supabase.mjs loadAll(), plus `links` and `specs` so a local run needs nothing else. */
export function loadLocal() {
	const factsFile = readJson('seed', 'facts.json');
	const products = factsFile.products;
	const facts = factsFile.facts.map((f) => ({ ...f, checked_at: factsFile.checked_at, stale: false }));
	const claims = readJson('seed', 'claims.json');
	const niches = readJson('seed', 'niches.json');
	const links = readJson('seed', 'links.json');

	return { products, facts, claims, niches, pages: [], metrics: [], links, specs: loadSpecs() };
}
