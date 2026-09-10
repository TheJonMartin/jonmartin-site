const CATEGORY = 'technical-seo';

// Social platforms are known to block plain HTTP HEAD/GET checks (they want
// a real browser session), which produces a 403/999 that has nothing to do
// with whether the link is actually broken. Any non-OK response from one of
// these gets downgraded to "couldn't verify" instead of "broken".
const BOT_HOSTILE_HOSTS = ['linkedin.com', 'x.com', 'twitter.com', 'instagram.com', 'threads.net', 'threads.com', 'facebook.com'];
const USER_AGENT = 'Mozilla/5.0 (compatible; JonMartinSiteScan/1.0; +https://thejonmartin.com)';

function finding(id, priority, page, title, detail, fix) {
	return { id: `${CATEGORY}:${page ?? 'site'}:${id}`, priority, category: CATEGORY, page, title, detail, fix };
}

function isBotHostile(url) {
	try {
		const host = new URL(url).hostname.replace(/^www\./, '');
		return BOT_HOSTILE_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
	} catch {
		return false;
	}
}

async function checkOne(url, timeoutMs) {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeoutMs);
	const opts = { redirect: 'follow', signal: controller.signal, headers: { 'User-Agent': USER_AGENT } };
	try {
		let res = await fetch(url, { ...opts, method: 'HEAD' });
		if (res.status === 405 || res.status === 501) {
			res = await fetch(url, { ...opts, method: 'GET' });
		}
		return { ok: res.ok, status: res.status };
	} catch (err) {
		return { ok: null, error: err.message };
	} finally {
		clearTimeout(timer);
	}
}

// Best-effort: checks every distinct external URL linked from the crawled
// pages once, then maps failures back to the page(s) that link to them.
// Network errors/timeouts are reported as "couldn't verify" (P2) rather than
// "broken" (P1) — a flaky check shouldn't read as confidently as a real 404.
export async function checkExternalLinks(pages, { enabled, timeoutMs, concurrency }) {
	if (!enabled) return [];

	const linkToPages = new Map();
	const linkToSiteLabels = new Map();
	for (const page of pages) {
		for (const url of page.externalLinks) {
			linkToPages.set(url, [...(linkToPages.get(url) ?? []), page.route]);
			linkToSiteLabels.set(url, new Set([...(linkToSiteLabels.get(url) ?? []), page.siteLabel]));
		}
	}

	const urls = [...linkToPages.keys()];
	const results = new Map();
	let cursor = 0;
	async function worker() {
		while (cursor < urls.length) {
			const url = urls[cursor++];
			results.set(url, await checkOne(url, timeoutMs));
		}
	}
	await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, worker));

	const findings = [];
	for (const [url, result] of results) {
		const linkedFrom = linkToPages.get(url).join(', ');
		const siteLabel = [...linkToSiteLabels.get(url)].join(' / ');
		if (result.ok === false && isBotHostile(url)) {
			findings.push({
				...finding(`external-link-unverified-${url}`, 'P2', null, 'External link could not be verified',
					`"${url}" returned HTTP ${result.status}. This host is known to block automated checks, so this is more likely bot-blocking than a real dead link. Linked from: ${linkedFrom}.`,
					'Spot-check it manually in a browser rather than trusting this scan\'s HTTP check for this host.'),
				siteLabel,
			});
		} else if (result.ok === false) {
			findings.push({
				...finding(`external-link-${url}`, 'P1', null, 'Broken external link',
					`"${url}" returned HTTP ${result.status}. Linked from: ${linkedFrom}.`,
					'Update or remove the link.'),
				siteLabel,
			});
		} else if (result.ok === null) {
			findings.push({
				...finding(`external-link-unverified-${url}`, 'P2', null, 'External link could not be verified',
					`"${url}" didn't respond within the check window (${result.error}). Linked from: ${linkedFrom}. May just be a flaky/slow server, not necessarily broken.`,
					'Spot-check it manually if it keeps showing up here week over week.'),
				siteLabel,
			});
		}
	}
	return findings;
}
