const API = 'https://api.github.com';

function headers(token) {
	return {
		Authorization: `Bearer ${token}`,
		Accept: 'application/vnd.github+json',
		'Content-Type': 'application/json',
		'X-GitHub-Api-Version': '2022-11-28',
	};
}

// GitHub does not reliably auto-create a label from an issue-create call, so
// create it explicitly the first time rather than assuming it exists.
async function ensureLabel(repo, token, label) {
	const getRes = await fetch(`${API}/repos/${repo}/labels/${encodeURIComponent(label)}`, { headers: headers(token) });
	if (getRes.ok) return;
	await fetch(`${API}/repos/${repo}/labels`, {
		method: 'POST',
		headers: headers(token),
		body: JSON.stringify({ name: label, color: 'c5def5', description: 'Weekly SEO & AEO scan output' }),
	});
	// If this races another run creating the same label, the 422 is fine to
	// ignore — the label exists either way, which is all that matters here.
}

export async function findOpenIssue(repo, token, label, title) {
	const url = `${API}/repos/${repo}/issues?state=open&labels=${encodeURIComponent(label)}&per_page=50`;
	const res = await fetch(url, { headers: headers(token) });
	if (!res.ok) throw new Error(`Failed to list issues: ${res.status} ${await res.text()}`);
	const issues = await res.json();
	return issues.find((issue) => issue.title === title && !issue.pull_request) ?? null;
}

// Creates the scan issue if none exists, otherwise replaces its body with
// the latest report and posts a short comment noting what changed. Reusing
// one issue (rather than opening a fresh one weekly) keeps this a single
// standing checklist instead of a pile of near-duplicate issues. Pass
// `existing` when the caller already looked it up (e.g. to read its body for
// diffing) so this doesn't re-fetch.
export async function upsertScanIssue({ repo, token, label, title, body, changeSummary, existing }) {
	if (existing === undefined) existing = await findOpenIssue(repo, token, label, title);

	if (!existing) {
		await ensureLabel(repo, token, label);
		const res = await fetch(`${API}/repos/${repo}/issues`, {
			method: 'POST',
			headers: headers(token),
			body: JSON.stringify({ title, body, labels: [label] }),
		});
		if (!res.ok) throw new Error(`Failed to create issue: ${res.status} ${await res.text()}`);
		const issue = await res.json();
		return { issue, created: true };
	}

	const patchRes = await fetch(`${API}/repos/${repo}/issues/${existing.number}`, {
		method: 'PATCH',
		headers: headers(token),
		body: JSON.stringify({ body }),
	});
	if (!patchRes.ok) throw new Error(`Failed to update issue: ${patchRes.status} ${await patchRes.text()}`);
	const issue = await patchRes.json();

	if (changeSummary) {
		const commentRes = await fetch(`${API}/repos/${repo}/issues/${existing.number}/comments`, {
			method: 'POST',
			headers: headers(token),
			body: JSON.stringify({ body: changeSummary }),
		});
		if (!commentRes.ok) throw new Error(`Failed to comment on issue: ${commentRes.status} ${await commentRes.text()}`);
	}

	return { issue, created: false };
}
