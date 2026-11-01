// Build marker for post-deploy checks: /version.json reports the commit Netlify built
// (COMMIT_REF is set in Netlify builds; null locally, so local builds stay deterministic).
export function GET() {
	return new Response(JSON.stringify({ ok: true, commit: process.env.COMMIT_REF ?? null }) + '\n', {
		headers: { 'Content-Type': 'application/json' },
	});
}
