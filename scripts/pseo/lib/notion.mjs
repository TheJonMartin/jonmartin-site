// Step 3: read-only Notion client. Walks the cheat-sheet page's block children
// (paginating, recursing into toggles/tables) looking for a block whose plain
// text names a product, and takes the first https link in that block.

const NOTION_VERSION = '2022-06-28';

async function listChildren(token, blockId, fetchImpl) {
	const results = [];
	let cursor;
	do {
		const url = new URL(`https://api.notion.com/v1/blocks/${blockId}/children`);
		url.searchParams.set('page_size', '100');
		if (cursor) url.searchParams.set('start_cursor', cursor);
		const res = await fetchImpl(url, {
			headers: { Authorization: `Bearer ${token}`, 'Notion-Version': NOTION_VERSION },
		});
		if (!res.ok) throw new Error(`notion blocks.children failed: ${res.status} ${await res.text()}`);
		const data = await res.json();
		results.push(...data.results);
		cursor = data.has_more ? data.next_cursor : undefined;
	} while (cursor);
	return results;
}

function richTextArraysOf(block) {
	const body = block[block.type];
	if (!body) return [];
	if (block.type === 'table_row') return body.cells ?? [];
	if (Array.isArray(body.rich_text)) return [body.rich_text];
	return [];
}

function plainTextOf(richTextArrays) {
	return richTextArrays
		.flat()
		.map((rt) => rt.plain_text ?? '')
		.join('');
}

function firstHttpsHrefOf(richTextArrays) {
	for (const rt of richTextArrays.flat()) {
		if (rt.href && rt.href.startsWith('https://')) return rt.href;
	}
	return null;
}

async function collectRows(token, blockId, fetchImpl) {
	const rows = [];
	const children = await listChildren(token, blockId, fetchImpl);
	for (const block of children) {
		const richTextArrays = richTextArraysOf(block);
		if (richTextArrays.length) rows.push({ text: plainTextOf(richTextArrays), href: firstHttpsHrefOf(richTextArrays) });
		if (block.has_children && block.type !== 'table_row') rows.push(...(await collectRows(token, block.id, fetchImpl)));
	}
	return rows;
}

export async function fetchLinks({ token, pageId, products, fetchImpl = fetch }) {
	const rows = await collectRows(token, pageId, fetchImpl);
	const links = {};
	for (const product of products) {
		const name = product.cheat_sheet_name;
		if (!name) continue;
		const row = rows.find((r) => r.href && r.text.includes(name));
		if (row) links[product.slug] = row.href;
	}
	return links;
}
