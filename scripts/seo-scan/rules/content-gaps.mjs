const CATEGORY = 'content-gap';

function finding(id, priority, page, title, detail, fix) {
	return { id: `${CATEGORY}:${page ?? 'site'}:${id}`, priority, category: CATEGORY, page, title, detail, fix };
}

function daysSince(dateStr) {
	if (!dateStr) return null;
	const then = new Date(dateStr).getTime();
	if (Number.isNaN(then)) return null;
	return Math.floor((Date.now() - then) / 86_400_000);
}

export function buildTodoFindings(todoMarkers) {
	return todoMarkers.map((todo) =>
		finding(`todo-${todo.file}-${todo.line}`, 'P1', null, 'Unresolved TODO in site source',
			`${todo.file}:${todo.line} — "${todo.text}"`,
			'Either fill in the missing content or remove the marker if it no longer applies.')
	);
}

export function runContentGapRules(pages, { config, writingPosts }) {
	const findings = [];

	// Topic coverage: tags used across published posts vs. the target list.
	const publishedPosts = writingPosts.filter((p) => !p.draft);
	const usedTags = new Set(publishedPosts.flatMap((p) => p.tags.map((t) => t.toLowerCase())));
	const uncovered = config.targetTopics.filter((topic) => {
		const words = topic.toLowerCase().split(/[\s&/-]+/).filter(Boolean);
		return ![...usedTags].some((tag) => words.some((w) => tag.includes(w) || w.includes(tag)));
	});
	if (uncovered.length > 0) {
		findings.push(finding('topic-gaps', 'P2', null, 'Target topics with no published post',
			`No post touches: ${uncovered.join(', ')}.`,
			'Not urgent individually, but worth keeping on the writing backlog so coverage doesn\'t skew entirely toward whatever\'s top of mind.'));
	}

	// Publishing cadence.
	const dates = publishedPosts.map((p) => p.pubDate).filter(Boolean).sort();
	const lastPubDate = dates.at(-1);
	if (lastPubDate) {
		const age = daysSince(lastPubDate);
		if (age !== null && age > config.thresholds.targetCadenceDays) {
			findings.push(finding('cadence-overdue', 'P1', null, 'Publishing cadence has slipped',
				`${age} days since the last published post (target: every ${config.thresholds.targetCadenceDays} days). Consistent publishing is itself an AEO/SEO signal — engines and readers both weight active sites higher.`,
				'Pick one topic from the gap list above, or from an existing draft, and ship it.'));
		}
	}

	// Drafts sitting unpublished.
	const drafts = writingPosts.filter((p) => p.draft);
	for (const draft of drafts) {
		findings.push(finding(`unpublished-draft-${draft.slug}`, 'P2', `/writing/${draft.slug}/`, 'Draft sitting unpublished',
			`"${draft.title ?? draft.slug}" is marked draft: true and isn\'t live.`,
			'Finish it or delete it — an old draft with no path forward is just backlog noise.'));
	}

	return findings;
}
