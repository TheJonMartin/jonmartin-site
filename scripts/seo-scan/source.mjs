import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

// Minimal frontmatter reader for the markdown collections under src/content/
// (schemas in src/content.config.ts). Not a general YAML parser — single-line
// scalars, bracketed arrays, and block lists (`key:` followed by `  - item`).
// That's every shape this scan reads.
function parseFrontmatter(raw) {
	const match = raw.match(/^---\n([\s\S]*?)\n---/);
	if (!match) return {};
	const lines = match[1].split('\n');
	const data = {};
	for (let i = 0; i < lines.length; i++) {
		const lineMatch = lines[i].match(/^(\w+):\s*(.*)$/);
		if (!lineMatch) continue;
		const [, key, rawValue] = lineMatch;
		let value = rawValue.trim();
		if (value.startsWith('[') && value.endsWith(']')) {
			value = value
				.slice(1, -1)
				.split(',')
				.map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
				.filter(Boolean);
		} else if (value === '') {
			const items = [];
			while (i + 1 < lines.length && /^\s+-\s+/.test(lines[i + 1])) {
				i += 1;
				items.push(lines[i].replace(/^\s+-\s+/, '').trim().replace(/^['"]|['"]$/g, ''));
			}
			if (items.length > 0) value = items;
		} else {
			value = value.replace(/^['"]|['"]$/g, '');
		}
		data[key] = value;
	}
	return data;
}

// Generic reader for the flat, one-file-per-entry markdown collections
// (src/content/writing/, src/content/four-laws/, src/content/altitude/).
// Returns slug/file plus the frontmatter fields the scan uses.
export async function readMarkdownCollection(dir) {
	let entries;
	try {
		entries = await readdir(dir);
	} catch {
		return [];
	}
	const items = [];
	for (const name of entries) {
		if (!name.endsWith('.md') || name.startsWith('_')) continue;
		const raw = await readFile(path.join(dir, name), 'utf-8');
		const data = parseFrontmatter(raw);
		items.push({
			slug: name.replace(/\.md$/, ''),
			file: path.join(dir, name),
			draft: data.draft === 'true',
			title: data.title ?? null,
			pubDate: data.pubDate ?? null,
			tags: Array.isArray(data.tags) ? data.tags : [],
		});
	}
	return items;
}

// Scans known source files for TODO markers left as a note-to-self —
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
