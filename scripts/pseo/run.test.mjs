import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { refreshFacts, checkLink } from './lib/refresh.mjs';
import { trafficVerdicts } from './lib/gsc.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));

test('refreshFacts: html fact whose source_quote is found gets checked_at=now, stale=false', async () => {
	const facts = [{ id: 'a', refresh_method: 'html', source_url: 'https://example.com/pricing', source_quote: 'Solo ($9/user)', checked_at: '2026-01-01' }];
	const fetchImpl = async () => ({ text: async () => 'Pricing: Solo ($9/user) per month' });
	const out = await refreshFacts(facts, { fetchImpl, now: '2026-11-01' });
	assert.equal(out[0].checked_at, '2026-11-01');
	assert.equal(out[0].stale, false);
});

test('refreshFacts: html fact whose source_quote is missing is marked stale and keeps checked_at', async () => {
	const facts = [{ id: 'a', refresh_method: 'html', source_url: 'https://example.com/pricing', source_quote: 'Solo ($9/user)', checked_at: '2026-01-01' }];
	const fetchImpl = async () => ({ text: async () => 'Totally different pricing page' });
	const out = await refreshFacts(facts, { fetchImpl, now: '2026-11-01' });
	assert.equal(out[0].checked_at, '2026-01-01');
	assert.equal(out[0].stale, true);
});

test('refreshFacts: manual facts are untouched and never fetched', async () => {
	const fact = { id: 'a', refresh_method: 'manual', source_url: 'https://example.com/pricing', source_quote: 'x', checked_at: '2026-01-01' };
	let called = false;
	const fetchImpl = async () => {
		called = true;
		return { text: async () => '' };
	};
	const out = await refreshFacts([fact], { fetchImpl, now: '2026-11-01' });
	assert.equal(called, false);
	assert.deepEqual(out[0], fact);
});

test('checkLink: 200 is ok and not dead', async () => {
	const result = await checkLink('https://example.com', async () => ({ status: 200 }));
	assert.equal(result.ok, true);
	assert.equal(result.dead, false);
});

test('checkLink: 403 (bot-blocked) is ok and not dead', async () => {
	const result = await checkLink('https://example.com', async () => ({ status: 403 }));
	assert.equal(result.ok, true);
	assert.equal(result.dead, false);
});

test('checkLink: 404 is dead and not ok', async () => {
	const result = await checkLink('https://example.com', async () => ({ status: 404 }));
	assert.equal(result.ok, false);
	assert.equal(result.dead, true);
});

test('trafficVerdicts: empty metrics table skips entirely', () => {
	const pages = [{ slug: 'a', status: 'live', published: '2026-01-01' }];
	assert.deepEqual(trafficVerdicts(pages, [], '2026-11-01'), {});
});

test('trafficVerdicts: a 90+ day old page with fewer than 10 impressions -> noindex', () => {
	const pages = [{ slug: 'a', status: 'live', published: '2026-01-01' }];
	const metrics = [{ page: 'a', date: '2026-10-01', impressions: 3 }];
	assert.deepEqual(trafficVerdicts(pages, metrics, '2026-11-01'), { a: 'noindex' });
});

test('trafficVerdicts: a 90+ day old page with plenty of impressions is left alone', () => {
	const pages = [{ slug: 'a', status: 'live', published: '2026-01-01' }];
	const metrics = [{ page: 'a', date: '2026-10-01', impressions: 50 }];
	assert.deepEqual(trafficVerdicts(pages, metrics, '2026-11-01'), {});
});

test('run.mjs --local --dry-run exits 0', () => {
	const result = spawnSync(process.execPath, [path.join(dir, 'run.mjs'), '--local', '--dry-run'], { encoding: 'utf8' });
	assert.equal(result.status, 0, result.stderr);
});
