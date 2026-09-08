import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

// Minimal frontmatter reader for the fixed shape used in
// src/content/writing/*.md (see src/content.config.ts for the schema this
// mirrors). Not a general YAML parser — only handles single-line scalars and
// bracketed arrays, which is all this content ever uses.
function parseFrontmatter(raw) {
	const match = raw.match(/^---\n([\s\S]*?)\n---/);
	if (!match) return {};
	const data = {};
	for (const line of match[1].split('\n')) {
		const lineMatch = line.match(/^(\w+):\s*(.*)$/);
		if (!lineMatch) continue;
		const [, key, rawValue] = lineMatch;
		let value = rawValue.trim();
		if (value.startsWith('[') && value.endsWith(']')) {
			value = value
				.slice(1, -1)
				.split(',')
				.map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
				.filter(Boolean);
		} else {
			value = value.replace(/^['"]|['"]$/g, '');
		}
		data[key] = value;
	}
	return data;
}

export async function readWritingSource(writingDir) {
	let entries;
	try {
		entries = await readdir(writingDir);
	} catch {
		return [];
	}
	const posts = [];
	for (const name of entries) {
		if (!name.endsWith('.md') || name.startsWith('_')) continue;
		const raw = await readFile(path.join(writingDir, name), 'utf-8');
		const data = parseFrontmatter(raw);
		posts.push({
			slug: name.replace(/\.md$/, ''),
			file: path.join(writingDir, name),
			draft: data.draft === 'true' || data.draft === true,
			title: data.title ?? null,
			pubDate: data.pubDate ?? null,
			tags: Array.isArray(data.tags) ? data.tags : [],
		});
	}
	return posts;
}

// Scans known source files for TODO/FIXME markers left as a note-to-self —
// these are usually incomplete content sitting on the live site (e.g. an
// About page shipped with a TODO block listing what's still missing).
export async function findTodoMarkers(roots) {
	const findings = [];
	for (const root of roots) {
		let entries;
		try {
			entries = await readdir(root, { withFileTypes: true, recursive: true });
		} catch {
			continue;
		}
		for (const entry of entries) {
			if (!entry.isFile()) continue;
			if (!/\.(astro|md|json|mjs|ts)$/.test(entry.name)) continue;
			const full = path.join(entry.parentPath ?? entry.path ?? root, entry.name);
			const raw = await readFile(full, 'utf-8');
			const lines = raw.split('\n');
			lines.forEach((line, i) => {
				if (/\bTODO\b/.test(line)) {
					findings.push({ file: full, line: i + 1, text: line.trim().slice(0, 200) });
				}
			});
		}
	}
	return findings;
}
