// Step 3: fact refresh (re-check a source page for its quote) and affiliate link health checks.

const TIMEOUT_MS = 10_000;

async function fetchWithTimeout(fetchImpl, url, options = {}) {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
	try {
		return await fetchImpl(url, { ...options, signal: controller.signal });
	} finally {
		clearTimeout(timer);
	}
}

/** `html` facts: one GET at source_url, source_quote found -> checked_at=now, stale=false; not found or request failed -> stale=true, checked_at untouched. `manual` facts pass through. */
export async function refreshFacts(facts, { fetchImpl = fetch, now }) {
	const out = [];
	for (const fact of facts) {
		if (fact.refresh_method !== 'html') {
			out.push(fact);
			continue;
		}
		try {
			const res = await fetchWithTimeout(fetchImpl, fact.source_url);
			const text = await res.text();
			out.push(text.includes(fact.source_quote) ? { ...fact, checked_at: now, stale: false } : { ...fact, stale: true });
		} catch {
			out.push({ ...fact, stale: true });
		}
	}
	return out;
}

async function attempt(fetchImpl, url, method) {
	try {
		const res = await fetchWithTimeout(fetchImpl, url, { method, redirect: 'follow' });
		return { status: res.status, failed: false };
	} catch {
		return { status: null, failed: true };
	}
}

/** HEAD first; GET fallback on network failure or any HEAD status >= 400 (PartnerStack affiliate links answer HEAD with 404 but GET with 200). Bot-blocking (403/429) counts as ok, not dead. */
export async function checkLink(url, fetchImpl = fetch) {
	let result = await attempt(fetchImpl, url, 'HEAD');
	if (result.failed || result.status >= 400) {
		result = await attempt(fetchImpl, url, 'GET');
	}
	if (result.failed) return { ok: false, dead: true, status: null };
	const { status } = result;
	const dead = status === 404 || status === 410;
	const ok = !dead && (status < 400 || status === 403 || status === 429);
	return { ok, dead, status };
}
