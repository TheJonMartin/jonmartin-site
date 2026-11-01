// Step 3: open one PR via the GitHub git data API. Never merges, never touches deploys.

const API = 'https://api.github.com';

async function gh(fetchImpl, token, method, path, body) {
	const res = await fetchImpl(`${API}${path}`, {
		method,
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: 'application/vnd.github+json',
			'X-GitHub-Api-Version': '2022-11-28',
			'Content-Type': 'application/json',
		},
		body: body === undefined ? undefined : JSON.stringify(body),
	});
	if (!res.ok) throw new Error(`github ${method} ${path} failed: ${res.status} ${await res.text()}`);
	return res.json();
}

/** `files` maps path -> content; a `null` content deletes that path from the tree. */
export async function openPr({ token, repo, base = 'main', branch, files, title, body, fetchImpl = fetch }) {
	const baseRef = await gh(fetchImpl, token, 'GET', `/repos/${repo}/git/ref/heads/${base}`);
	const baseCommitSha = baseRef.object.sha;
	const baseCommit = await gh(fetchImpl, token, 'GET', `/repos/${repo}/git/commits/${baseCommitSha}`);

	const tree = await Promise.all(
		Object.entries(files).map(async ([path, content]) => {
			if (content === null) return { path, mode: '100644', type: 'blob', sha: null };
			const blob = await gh(fetchImpl, token, 'POST', `/repos/${repo}/git/blobs`, { content, encoding: 'utf-8' });
			return { path, mode: '100644', type: 'blob', sha: blob.sha };
		})
	);

	const newTree = await gh(fetchImpl, token, 'POST', `/repos/${repo}/git/trees`, { base_tree: baseCommit.tree.sha, tree });
	const commit = await gh(fetchImpl, token, 'POST', `/repos/${repo}/git/commits`, {
		message: title,
		tree: newTree.sha,
		parents: [baseCommitSha],
	});
	await gh(fetchImpl, token, 'POST', `/repos/${repo}/git/refs`, { ref: `refs/heads/${branch}`, sha: commit.sha });
	const pr = await gh(fetchImpl, token, 'POST', `/repos/${repo}/pulls`, { title, body, head: branch, base });
	return { url: pr.html_url, number: pr.number };
}
