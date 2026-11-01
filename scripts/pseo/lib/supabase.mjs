// Step 3: tiny PostgREST client for the `pseo_*` tables (service_role only; RLS blocks anon/authenticated).

function headers(serviceKey, extra = {}) {
	return {
		apikey: serviceKey,
		Authorization: `Bearer ${serviceKey}`,
		'Content-Type': 'application/json',
		...extra,
	};
}

export function createClient({ url, serviceKey, fetchImpl = fetch }) {
	async function request(method, table, { query = '', body, extraHeaders = {} } = {}) {
		const res = await fetchImpl(`${url.replace(/\/$/, '')}/rest/v1/${table}${query}`, {
			method,
			headers: headers(serviceKey, extraHeaders),
			body: body === undefined ? undefined : JSON.stringify(body),
		});
		if (!res.ok) throw new Error(`supabase ${method} ${table} failed: ${res.status} ${await res.text()}`);
		if (res.status === 204) return null;
		const text = await res.text();
		return text ? JSON.parse(text) : null;
	}

	return {
		select(table, query = '?select=*') {
			return request('GET', table, { query });
		},
		insert(table, rows) {
			return request('POST', table, { body: rows, extraHeaders: { Prefer: 'return=representation' } });
		},
		upsert(table, rows, { onConflict } = {}) {
			const query = onConflict ? `?on_conflict=${encodeURIComponent(onConflict)}` : '';
			return request('POST', table, {
				query,
				body: rows,
				extraHeaders: { Prefer: 'resolution=merge-duplicates,return=representation' },
			});
		},
		patch(table, query, body) {
			return request('PATCH', table, { query, body, extraHeaders: { Prefer: 'return=representation' } });
		},
	};
}

export async function loadAll({ url, serviceKey, fetchImpl = fetch }) {
	const client = createClient({ url, serviceKey, fetchImpl });
	const [products, facts, claims, niches, pages, metrics] = await Promise.all([
		client.select('pseo_products'),
		client.select('pseo_facts'),
		client.select('pseo_claims_allowlist'),
		client.select('pseo_niches'),
		client.select('pseo_pages'),
		client.select('pseo_page_metrics'),
	]);
	return { products, facts, claims, niches, pages, metrics };
}
