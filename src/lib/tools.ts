/*
 * Affiliate tool pages — one entry per page under /tools/<slug>.
 * Copy comes from the Notion drafts of Oct 13, 2026. Strings in `html` blocks are
 * trusted, hand-written markup (rendered with set:html); keep user input out of them.
 * Every page states the affiliate relationship twice: under the hero and above the footer.
 */

export type Block =
	| { type: 'p'; html: string }
	| { type: 'ul'; items: string[] }
	| { type: 'ol'; items: string[] }
	| { type: 'steps'; items: string[] };

export interface Section {
	/** Rail label, without the number (the template adds "01 / "). */
	label: string;
	blocks: Block[];
}

export interface Tool {
	slug: string;
	/** Display name used in the CTA button and schema. */
	name: string;
	title: string;
	seoTitle: string;
	description: string;
	h1: string;
	dek: string[];
	category: string;
	/** Four label/value pairs for the spec strip. `flag` marks an outlier (dark mustard). */
	facts: { label: string; value: string; flag?: boolean }[];
	sections: Section[];
	pros: string[];
	cons: string[];
	/** Sections that come after Pros / Cons. */
	after?: Section[];
	closing: string;
	cta: { label: string; href: string };
	sources: { text: string; href: string }[];
}

export const CHECKED = 'Oct 13, 2026';
export const PUBLISHED = '2026-10-14';

export const tools: Tool[] = [
	{
		slug: 'aircall',
		name: 'Aircall',
		title: 'Aircall for HubSpot Teams — Jon Martin',
		seoTitle: 'Aircall HubSpot Integration: What It Does and Who It Fits — Jon Martin',
		description:
			'Aircall is a cloud phone system with one of the deepest HubSpot calling integrations. What it logs, what it costs you in setup, and who should skip it.',
		h1: 'Calls that land on the HubSpot record.',
		dek: [
			"If your reps make calls and those calls don't land on the HubSpot record, your pipeline report is fiction.",
			"That's the problem Aircall solves. It's a cloud phone system, and its HubSpot integration is one of the deepest in the calling category.",
		],
		category: 'Cloud phone',
		facts: [
			{ label: 'Category', value: 'Cloud phone system' },
			{ label: 'Logs to', value: 'Contacts, Companies, Deals, Tickets' },
			{ label: 'Plan needed', value: 'Essentials or Professional' },
			{ label: 'Marketplace', value: '4.3 stars, 326 reviews' },
		],
		sections: [
			{
				label: "Who it's for",
				blocks: [
					{ type: 'p', html: 'Sales and support teams that live on the phone and already run HubSpot as the system of record.' },
					{ type: 'p', html: 'Think inbound sales desks, SDR teams doing call blocks, and service teams that need calls tied to tickets.' },
					{ type: 'p', html: 'If your team makes a handful of calls a week, this is more phone system than you need.' },
				],
			},
			{
				label: 'What it does',
				blocks: [
					{ type: 'p', html: 'Aircall gives your team business numbers, an app for desktop and mobile (iPhone and Android), and call routing.' },
					{
						type: 'ul',
						items: [
							'<strong>Inbound:</strong> IVR call trees, call whispering, warm and direct transfers.',
							'<strong>Outbound:</strong> power dialing and click-to-call. You can build a dialing session from a HubSpot list or a CSV.',
							'<strong>Messaging:</strong> 1:1 SMS and MMS. Aircall says it syncs WhatsApp messages too.',
						],
					},
				],
			},
			{
				label: 'How it fits a HubSpot stack',
				blocks: [
					{ type: 'p', html: "This is where Aircall earns its spot. Per Aircall's integration page and its HubSpot Marketplace listing (checked Oct 13, 2026):" },
					{
						type: 'ol',
						items: [
							'<strong>Calls and SMS log to Contacts, Companies, Deals, and Tickets.</strong> Duration, number, recording link, agent comments, call outcome, and transcription land on the record. That means native HubSpot reporting and workflow triggers work off real call data.',
							'<strong>Insight Cards.</strong> Before a rep picks up, Aircall pulls HubSpot context (contact, company, deal, ticket) into the call screen. Admins choose what shows.',
							'<strong>Custom properties that trigger workflows.</strong> Aircall writes call info to contact properties, so you can automate post-call follow-ups in HubSpot.',
							'<strong>Automatic ticket creation.</strong> Admins pick the pipeline and status per call type.',
							"<strong>Help Desk channel.</strong> Aircall can connect as a calling and SMS channel in HubSpot's Help Desk (Service Hub).",
							'<strong>SMS from HubSpot workflows.</strong> You can trigger an Aircall SMS from a workflow.',
							'<strong>Conversation intelligence.</strong> Aircall says calls can be analyzed in HubSpot Conversation Intelligence, plus its own transcription and scorecards.',
						],
					},
					{
						type: 'p',
						html: 'The Marketplace listing shows it as a HubSpot Certified App, built by Aircall, with about 16K installs and a 4.3 rating from 326 reviews (as of Oct 13, 2026). The listing says it requires an Aircall Essentials or Professional plan.',
					},
				],
			},
		],
		pros: [
			'Call data lands on the right HubSpot objects, not in a separate silo.',
			'Works for both sales (deals) and service (tickets) in the same account.',
			'Workflow-triggering properties mean less manual follow-up.',
			"Deep, well-used integration. Aircall's own listing calls it HubSpot's most-installed calling partner.",
		],
		cons: [
			"It's another subscription on top of HubSpot, and the integration needs a specific Aircall plan tier.",
			'Lots of settings. Ticket pipelines, properties, routing: someone has to own the configuration or it gets messy.',
			'Some of the newest pieces, like AI Actions for the virtual agent, are labeled Beta on the listing.',
			'4.3 stars is good, not perfect. Read the recent reviews before you commit.',
		],
		after: [
			{
				label: 'Before you buy',
				blocks: [
					{ type: 'p', html: 'Decide which HubSpot objects should get call activity and who owns the routing rules. Do that first. Then connect it.' },
				],
			},
		],
		closing: "Calls you can't report on are calls that didn't happen.",
		cta: { label: 'Try Aircall', href: 'https://get.aircall.io/fddlp6kkr3qu' },
		sources: [
			{ text: 'Aircall, HubSpot integration page', href: 'https://aircall.io/integrations/hubspot/' },
			{ text: 'HubSpot Marketplace, Aircall listing (rendered Oct 13, 2026)', href: 'https://ecosystem.hubspot.com/marketplace/listing/aircall' },
		],
	},

	{
		slug: 'apollo-io',
		name: 'Apollo.io',
		title: 'Apollo.io for HubSpot Teams — Jon Martin',
		seoTitle: 'Apollo.io HubSpot Integration: Push Rules to Set First — Jon Martin',
		description:
			"Apollo can fill your HubSpot with contacts fast. The two integrations, the push and write rules that matter, and the review score you should read before buying.",
		h1: 'Apollo fills HubSpot fast. Set the rules first.',
		dek: [
			"Apollo can fill your HubSpot with contacts fast. That's the pitch and the risk.",
			"Set it up with rules and it's a strong prospecting layer on top of HubSpot. Set it up without rules and you'll be cleaning duplicates for a quarter.",
		],
		category: 'Prospecting and enrichment',
		facts: [
			{ label: 'Category', value: 'Prospecting and enrichment' },
			{ label: 'Integrations', value: 'Full sync or enrichment only' },
			{ label: 'Plan needed', value: 'Paid Apollo plan' },
			{ label: 'Enrichment app', value: '2.7 stars, 34 reviews', flag: true },
		],
		sections: [
			{
				label: "Who it's for",
				blocks: [
					{ type: 'p', html: 'Outbound sales teams that run HubSpot Sales Hub as the CRM and need a contact database, enrichment, and sequencing.' },
					{ type: 'p', html: "Apollo's own HubSpot page puts it plainly: Apollo finds leads, HubSpot works them. Neither replaces the other." },
					{ type: 'p', html: "If you're mostly inbound, the enrichment piece may be all you need." },
				],
			},
			{
				label: 'What it does',
				blocks: [
					{ type: 'p', html: 'Apollo is a B2B contact and company database with search filters (role, seniority, industry, signals), enrichment, and multichannel sequences across email, calls, and social.' },
					{ type: 'p', html: 'It also flags job changes and buying intent, per Apollo.' },
				],
			},
			{
				label: 'How it fits a HubSpot stack',
				blocks: [
					{ type: 'p', html: 'Apollo offers two different HubSpot integrations. Pick the right one.' },
					{
						type: 'ol',
						items: [
							'<strong>HubSpot CRM (full sync).</strong> Two-way sync of contacts, accounts, and deals. Apollo also pushes emails, calls, meetings, tasks, and notes into HubSpot.',
							'<strong>HubSpot Data Enrichment.</strong> Enriches existing HubSpot records only. No two-way sync, no activity push. This is the "Apollo Enrichment" app on the HubSpot Marketplace.',
						],
					},
					{ type: 'p', html: "The controls that matter for RevOps, per Apollo's docs:" },
					{
						type: 'ul',
						items: [
							'<strong>Push rules.</strong> Push new contacts to HubSpot only when they hit a stage, a verified email status, or a custom field. Updates to existing records push automatically.',
							'<strong>Write rules.</strong> You choose whether Apollo overwrites HubSpot values or only fills empty ones.',
							'<strong>Field and stage mapping.</strong> Map Apollo stages to HubSpot properties.',
							'<strong>Duplicate flags and a sync error log.</strong> You can see what HubSpot rejected and why.',
							'<strong>A 6-hour configuration window</strong> on paid plans, so nothing syncs before you\'ve set the rules.',
						],
					},
					{ type: 'p', html: "Two things to know. The HubSpot integration needs a paid Apollo plan, and some enrichment actions use credits. And Apollo says it doesn't set or manage HubSpot marketing contact status. That stays your job." },
					{ type: 'p', html: "Apollo also says it can feed HubSpot's Prospecting Agent as a data source." },
				],
			},
		],
		pros: [
			'Real two-way sync, not just a CSV export.',
			'Activity history follows the deal into HubSpot, so post-sale teams see the outbound history.',
			'Granular control over what gets written and when.',
			"Enrichment-only option if you don't want Apollo touching records beyond that.",
		],
		cons: [
			'The Apollo Enrichment app on the HubSpot Marketplace sits at 2.7 stars from 34 reviews (as of Oct 13, 2026). Recent reviews complain about data accuracy and credit usage. Take that seriously.',
			'Credits add a variable cost you need to watch.',
			'Loose push rules can bloat your database fast.',
			"Marketing contact status isn't managed by Apollo, so you still need a HubSpot-side process.",
		],
		after: [
			{
				label: 'Set it up in this order',
				blocks: [
					{
						type: 'steps',
						items: [
							'Decide full sync or enrichment only',
							'Map fields and stages',
							'Set write rules (fill empty vs overwrite)',
							'Set push conditions',
							'Then turn on sync',
						],
					},
				],
			},
		],
		closing: "The tool isn't the risk. The push rules are.",
		cta: { label: 'Try Apollo.io', href: 'https://get.apollo.io/mep2h66xs2o5' },
		sources: [
			{ text: 'Apollo, HubSpot integration directory', href: 'https://www.apollo.io/product/integrations/hubspot' },
			{ text: 'Apollo, "Prospect in Apollo. Grow in HubSpot."', href: 'https://www.apollo.io/apollo-hubspot' },
			{ text: 'Apollo Knowledge Base, HubSpot Integration Overview (updated Oct 9, 2026)', href: 'https://knowledge.apollo.io/hc/en-us/articles/19745130546573-HubSpot-Integration-Overview' },
			{ text: 'HubSpot Marketplace, Apollo Enrichment listing (rendered Oct 13, 2026)', href: 'https://ecosystem.hubspot.com/marketplace/listing/apollo-enrichment-1353872' },
		],
	},

	{
		slug: 'capsule-and-transpond',
		name: 'Capsule and Transpond',
		title: 'Capsule and Transpond with HubSpot — Jon Martin',
		seoTitle: 'Capsule CRM and Transpond with HubSpot: Do You Need Them? — Jon Martin',
		description:
			"Capsule is a simple CRM and Transpond is its email tool. For most HubSpot teams that's a second CRM. Who they actually fit, and how the HubSpot sync works.",
		h1: "You probably don't need Capsule.",
		dek: [
			"Straight answer first: if you already run HubSpot well, you probably don't need Capsule.",
			"Capsule is a CRM. Transpond is its email marketing tool. For most HubSpot teams that's a second CRM and a second marketing tool. That's a weak fit, and I'd rather say so here than pretend.",
		],
		category: 'Small-business CRM and email',
		facts: [
			{ label: 'Category', value: 'Simple CRM and email' },
			{ label: 'Capsule sync', value: 'Built by HubSpot, 100+ installs' },
			{ label: 'Custom field mapping', value: 'Data Hub Starter or higher' },
			{ label: 'Transpond listing', value: '1.7 stars, 3 reviews', flag: true },
		],
		sections: [
			{
				label: "Who it's actually for",
				blocks: [
					{
						type: 'ol',
						items: [
							'<strong>Small businesses that find HubSpot more than they need.</strong> Capsule pitches itself as a simple CRM for small teams: contacts, pipeline, tasks, projects, a mobile app.',
							"<strong>A team or business unit that already lives in Capsule</strong> and needs its records to show up in a parent company's HubSpot.",
							"<strong>Very small teams</strong> comparing a simple CRM against HubSpot's starter tiers.",
						],
					},
					{ type: 'p', html: 'If none of those is you, close this tab.' },
				],
			},
			{
				label: 'What it does',
				blocks: [
					{ type: 'p', html: '<strong>Capsule CRM:</strong> contact management, sales pipeline, project tracking, tasks and calendar sync with Outlook and Gmail, and a mobile app. Capsule says it connects to 100+ integrations, including Xero, QuickBooks, Sage, Slack, and Zapier.' },
					{ type: 'p', html: "<strong>Transpond:</strong> Capsule's marketing tool. With Capsule, it pulls tags, lists, and custom fields through, syncs contact changes both ways, and lets you trigger automated emails from Capsule events like an opportunity being created or closed." },
				],
			},
			{
				label: 'How it fits a HubSpot stack',
				blocks: [
					{ type: 'p', html: 'Two Marketplace listings exist. Both confirmed on the HubSpot Marketplace (checked Oct 13, 2026):' },
					{
						type: 'ol',
						items: [
							'<strong>Capsule data sync, built by HubSpot.</strong> Two-way sync between Capsule and HubSpot. Organisations map to Companies, People to Contacts, Opportunities to Deals. You can do one-way or two-way, and filter by a Capsule field (like tags) or a HubSpot list. Default mappings come out of the box. Custom field mappings need Data Hub Starter or higher (paid). Listed as a HubSpot Certified App with 100+ installs.',
							'<strong>Transpond, built by MPZMail Ltd.</strong> Syncs HubSpot contacts and leads into Transpond for email campaigns and automations. Listing shows 60+ installs and a 1.7 rating from 3 reviews. The reviews that are there describe sync problems.',
						],
					},
					{ type: 'p', html: 'So the honest read:' },
					{
						type: 'ul',
						items: [
							'<strong>Capsule ↔ HubSpot sync</strong> is real and built by HubSpot. Useful if two teams need to share records.',
							"<strong>Transpond on top of HubSpot</strong> overlaps with what HubSpot's own marketing email does. I'd need a specific reason to recommend it.",
						],
					},
				],
			},
		],
		pros: [
			'Capsule is built to be simple. Fewer settings, faster to start.',
			'The HubSpot-built data sync handles companies, contacts, and deals with filters.',
			'Transpond and Capsule are designed to work together, with two-way contact and tag sync.',
		],
		cons: [
			"For a HubSpot team, it's a second CRM. Two systems of record means two sets of rules.",
			'Custom field mapping in the sync needs a paid Data Hub tier.',
			"Transpond's HubSpot listing has very few installs and a low rating.",
			'Sync doesn\'t fix ownership. You still need to decide which system wins when records conflict.',
		],
		after: [
			{
				label: "When I'd point someone here",
				blocks: [
					{ type: 'p', html: "A small business that's honestly outgrown spreadsheets but isn't ready for a full HubSpot build." },
					{ type: 'p', html: 'Or a team stuck in Capsule that needs to feed HubSpot without a migration project.' },
					{ type: 'p', html: 'Everyone else: stay in HubSpot and clean it up.' },
				],
			},
		],
		closing: 'Two CRMs is one CRM too many, unless the sync is the point.',
		cta: { label: 'Try Capsule and Transpond', href: 'https://get.capsulenow.io/x0kzganxlolo' },
		sources: [
			{ text: 'Capsule CRM homepage', href: 'https://capsulecrm.com/' },
			{ text: 'Capsule, Transpond integration page', href: 'https://capsulecrm.com/integrations/transpond/' },
			{ text: 'Transpond, HubSpot integration page', href: 'https://transpond.io/integrations/hubspot-email-marketing/46/' },
			{ text: 'HubSpot Marketplace, Capsule data sync listing (rendered Oct 13, 2026)', href: 'https://ecosystem.hubspot.com/marketplace/listing/capsule-data-sync' },
			{ text: 'HubSpot Marketplace, Transpond listing (rendered Oct 13, 2026)', href: 'https://ecosystem.hubspot.com/marketplace/listing/mpzmail-202738' },
		],
	},

	{
		slug: 'trainual',
		name: 'Trainual',
		title: 'Trainual for HubSpot Process Docs — Jon Martin',
		seoTitle: 'Trainual for HubSpot Teams: Document How You Use HubSpot — Jon Martin',
		description:
			"Trainual isn't a HubSpot tool. It's where you write down lifecycle rules, deal stage criteria, and property ownership. What it does and how Zapier connects it.",
		h1: 'Get the HubSpot rules out of one person’s head.',
		dek: [
			"A lot of HubSpot portals share the same gap: the process lives in someone's head. Lifecycle stage rules. Deal stage exit criteria. Who's allowed to create properties.",
			"Trainual isn't a HubSpot tool. It's where you write that stuff down so it stops living in one person's head.",
		],
		category: 'Process documentation and training',
		facts: [
			{ label: 'Category', value: 'SOPs and training' },
			{ label: 'Native HubSpot integration', value: 'None confirmed', flag: true },
			{ label: 'Connects through', value: 'Zapier' },
			{ label: 'Fit', value: 'Indirect' },
		],
		sections: [
			{
				label: "Who it's for",
				blocks: [
					{ type: 'p', html: 'Operations and RevOps leaders at growing companies who keep answering the same process questions over and over.' },
					{ type: 'p', html: 'Sales managers onboarding new reps who need "how we use HubSpot here" documented and assigned.' },
					{ type: 'p', html: "Fit is indirect. You won't buy Trainual for the HubSpot integration. You'd buy it to document how your team uses HubSpot." },
				],
			},
			{
				label: 'What it does',
				blocks: [
					{ type: 'p', html: "Per Trainual's homepage:" },
					{
						type: 'ul',
						items: [
							'<strong>Process docs and SOPs</strong> in one searchable place, with AI help to draft them.',
							'<strong>Role-based training paths and onboarding.</strong>',
							'<strong>Tests and e-signatures</strong> for acknowledgments.',
							"<strong>Completion tracking:</strong> who's done, who's behind, what's overdue.",
							'<strong>Org chart and role mapping:</strong> who owns which work.',
							'<strong>Goals, scorecards, and KPIs,</strong> plus structured meetings with action items.',
							'<strong>An AI assistant</strong> you can ask about training, roles, and goals.',
							"<strong>Version history and stale-content reminders,</strong> so docs don't rot.",
							'<strong>SSO and HRIS integrations.</strong>',
						],
					},
				],
			},
			{
				label: 'How it fits a HubSpot stack',
				blocks: [
					{ type: 'p', html: "I didn't find a native HubSpot integration on Trainual's site or a HubSpot Marketplace listing." },
					{ type: 'p', html: "What is confirmed is a Zapier connection. Zapier's HubSpot + Trainual page lists:" },
					{
						type: 'ul',
						items: [
							'<strong>Trainual triggers:</strong> Subject Completed, Topic Completed, All Subjects Completed, Test Passed, Test Failed.',
							'<strong>Trainual actions:</strong> Invite New User, Assign Roles, Assign Subjects, Archive and Unarchive User, and more.',
						],
					},
					{ type: 'p', html: "Paired with HubSpot's Zapier triggers and actions, that opens up a few useful patterns:" },
					{
						type: 'ol',
						items: [
							'A rep passes the "HubSpot deal stages" test → Zapier updates a HubSpot record or adds a contact to a workflow.',
							'A role changes → Zapier assigns that role\'s Trainual subjects.',
							'Someone leaves → Zapier archives their Trainual user.',
						],
					},
					{ type: 'p', html: 'These are Zapier builds, not one-click features. Someone has to own them.' },
				],
			},
		],
		pros: [
			'Gets process out of people\'s heads and into something you can assign and track.',
			'Tests and completion tracking give you proof someone read the rules, not just a shared doc link.',
			'Stale-content reminders help with the biggest documentation problem: it goes out of date.',
			'Zapier triggers make it possible to tie training to HubSpot events.',
		],
		cons: [
			'No native HubSpot integration that I could confirm. Zapier only.',
			"It's another tool to maintain. If nobody owns the content, it becomes a graveyard of old SOPs.",
			'Broad scope. Training, goals, meetings, KPIs: you may only need one piece.',
		],
		after: [
			{
				label: "Where I'd start",
				blocks: [
					{
						type: 'steps',
						items: [
							'Document your lifecycle stage definitions',
							'Document deal stage entry and exit criteria',
							'Document who can create properties and why',
							'Assign all three to every new HubSpot user',
						],
					},
				],
			},
		],
		closing: "A process that only one person knows isn't a process. It's a dependency.",
		cta: { label: 'Try Trainual', href: 'https://start.trainual.com/7kqqclprayt4' },
		sources: [
			{ text: 'Trainual homepage', href: 'https://trainual.com/' },
			{ text: 'Zapier, HubSpot + Trainual integrations', href: 'https://zapier.com/apps/hubspot/integrations/trainual' },
		],
	},
];

export const disclosure =
	'This page contains an affiliate link. If you sign up through it, I earn a commission. It costs you nothing extra.';
