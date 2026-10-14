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
	related?: string[];
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
		related: ['unitel-voice', 'elevenlabs'],
		name: 'Aircall',
		title: 'Aircall for HubSpot Teams — Jon Martin',
		seoTitle: 'Aircall HubSpot Integration: What It Does and Who It Fits',
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
		related: ['seamless-ai', 'aircall'],
		name: 'Apollo.io',
		title: 'Apollo.io for HubSpot Teams — Jon Martin',
		seoTitle: 'Apollo.io HubSpot Integration: Push Rules to Set First',
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
		related: ['trainual', 'apollo-io'],
		name: 'Capsule and Transpond',
		title: 'Capsule and Transpond with HubSpot — Jon Martin',
		seoTitle: 'Capsule CRM and Transpond with HubSpot: Do You Need Them?',
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
		related: ['gamma', 'capsule-and-transpond'],
		name: 'Trainual',
		title: 'Trainual for HubSpot Process Docs — Jon Martin',
		seoTitle: 'Trainual for HubSpot Teams: Document How You Use HubSpot',
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

	{
		slug: 'adcreative-ai',
		related: ['whatconverts', 'gamma'],
		name: 'AdCreative.ai',
		title: 'AdCreative.ai and HubSpot — Jon Martin',
		seoTitle: 'AdCreative.ai and HubSpot: Where AI Ad Creative Fits',
		description:
			"AdCreative.ai makes banners, ad copy, and short video ads. For HubSpot teams it sits upstream of the CRM. What it does, who it fits, and what to set up first.",
		h1: 'AdCreative.ai sits upstream of HubSpot.',
		dek: [
			'AdCreative.ai makes ads. Banners, ad copy, product photos, short video ads.',
			"That's useful for a performance marketing team. For a RevOps or HubSpot admin audience, it's a weak fit. It sits upstream of HubSpot, in the ad platforms, not in your CRM.",
		],
		category: 'AI ad creative',
		facts: [
			{ label: 'Category', value: 'AI ad creative' },
			{ label: 'Native HubSpot integration', value: 'None confirmed', flag: true },
			{ label: 'Credits used', value: 'When you download' },
			{ label: 'Where it sits', value: 'Upstream, in the ad platforms' },
		],
		sections: [
			{
				label: "Who it's for",
				blocks: [
					{
						type: 'ul',
						items: [
							"Small businesses and e-commerce brands running paid social and search that don't have a designer.",
							'Agencies producing a lot of ad variations for clients.',
							'In-house marketers who need to test more creative, faster.',
						],
					},
					{ type: 'p', html: '<strong>Not for:</strong> anyone looking for a tool that improves HubSpot data, reporting, or process.' },
				],
			},
			{
				label: 'What it does',
				blocks: [
					{ type: 'p', html: "Per AdCreative.ai's homepage:" },
					{
						type: 'ol',
						items: [
							'<strong>Ad creatives.</strong> Generates ad banners and variations in many sizes for different platforms.',
							'<strong>Ad text.</strong> Writes headlines and copy using copywriting frameworks.',
							'<strong>Product photoshoots and video ads.</strong> Turns product photos into studio-style images and short videos.',
							'<strong>Creative Scoring AI.</strong> Scores creatives before you spend money. AdCreative claims over 90% accuracy on performance prediction. Treat that as a vendor claim.',
							"<strong>Competitor Insights AI.</strong> Looks at competitors' best-performing ads.",
							'<strong>Buyer personas.</strong> Generated from your website data.',
							'<strong>Brand import.</strong> Pulls your logo, colors, and fonts so outputs stay on brand.',
						],
					},
					{ type: 'p', html: 'Credits are used when you download a creative, not when you generate one, per their FAQ.' },
				],
			},
			{
				label: 'How it fits a HubSpot stack',
				blocks: [
					{ type: 'p', html: "AdCreative.ai's own homepage describes integrations as connecting your <strong>ad accounts</strong> to your brands, which tunes the AI to your account." },
					{ type: 'p', html: "I didn't find a HubSpot integration confirmed on AdCreative.ai's site or a HubSpot Marketplace listing. Some third-party pages say one exists. I'm not counting those." },
					{ type: 'p', html: 'Realistically, the HubSpot connection is indirect:' },
					{
						type: 'steps',
						items: [
							'AdCreative makes the ad',
							'The ad runs on Meta, Google, or wherever',
							'HubSpot captures the lead and reports on the campaign',
						],
					},
					{ type: 'p', html: "HubSpot doesn't need to know AdCreative exists for that to work." },
				],
			},
		],
		pros: [
			'Fast creative output without a designer.',
			'Lots of variations for A/B testing.',
			'Brand import keeps things consistent.',
			'Credits only burn on downloads, so you can explore before you commit.',
		],
		cons: [
			'Not a HubSpot tool. No confirmed integration.',
			'Performance claims on the homepage ("up to 14x more conversions," 90%+ scoring accuracy) are vendor claims. Test against your own numbers.',
			'Heavy e-commerce and consumer tilt in the examples. B2B teams may need to work harder to get useful output.',
			'AI-generated creative still needs a human with taste to review it.',
		],
		after: [
			{
				label: 'If you buy it anyway',
				blocks: [
					{ type: 'p', html: "Make sure your HubSpot campaign tracking is set up first. Better ads don't help if you can't see which ones produced pipeline." },
				],
			},
		],
		closing: 'Creative is upstream. Attribution is the part that tells you if it worked.',
		cta: { label: 'Try AdCreative.ai', href: 'https://free-trial.adcreative.ai/fwji4dybiz2t' },
		sources: [
			{ text: 'AdCreative.ai homepage (features, FAQ, integrations description)', href: 'https://www.adcreative.ai/' },
		],
	},

	{
		slug: 'unitel-voice',
		related: ['aircall', 'elevenlabs'],
		name: 'Unitel Voice',
		title: 'Unitel Voice and HubSpot — Jon Martin',
		seoTitle: 'Unitel Voice and HubSpot: A Phone Line, Not a RevOps Tool',
		description:
			"Unitel Voice is a business phone service for solo founders and small teams. No HubSpot integration confirmed. Who it fits, who should look elsewhere, and why.",
		h1: 'A business number for your cell, not a RevOps tool.',
		dek: [
			'Unitel Voice is a good fit for a solo founder who needs a business number on their cell.',
			"For a HubSpot-driven sales or service team, it's a weak fit. I couldn't confirm a HubSpot integration on Unitel's site, and for RevOps the integration is the whole point.",
		],
		category: 'Small-business phone',
		facts: [
			{ label: 'Category', value: 'Small-business phone service' },
			{ label: 'HubSpot integration', value: 'None confirmed', flag: true },
			{ label: 'Best for', value: 'Solo founders, 1-3 person teams' },
			{ label: 'Desk phones', value: 'Office plan only' },
		],
		sections: [
			{
				label: "Who it's for",
				blocks: [
					{ type: 'p', html: 'Per Unitel, it\'s built for "bootstrappers and business builders": solo entrepreneurs, startup teams, and small businesses.' },
					{ type: 'p', html: '<strong>Good fit:</strong>' },
					{
						type: 'ul',
						items: [
							'A one-to-three person business that wants a toll-free, local, or vanity number without carrying a second phone.',
							'Small teams that want calls answered professionally, with greetings and routing.',
							'Owners who want a real human on the support line. Unitel leans hard on its US-based support.',
						],
					},
					{ type: 'p', html: '<strong>Weak fit:</strong>' },
					{
						type: 'ul',
						items: ['Any team that needs every call logged to a HubSpot contact, deal, or ticket automatically.'],
					},
				],
			},
			{
				label: 'What it does',
				blocks: [
					{ type: 'p', html: "From Unitel's homepage and its Office plan page:" },
					{
						type: 'ul',
						items: [
							'<strong>Business numbers:</strong> local, toll-free, or vanity, usable on your existing devices.',
							'<strong>Custom greetings</strong> by business hours, and routing to available people or voicemail.',
							'<strong>Mobile app</strong> on every plan (iOS and Android).',
							'<strong>Office plan:</strong> IP desk phones, softphone, presence (see who\'s on a call), team messaging and file sharing.',
							'<strong>Office Plus plan:</strong> video conferencing and screen sharing.',
							'<strong>Outage rerouting.</strong> Unitel says if your internet or power goes out, calls reroute to the mobile app or voicemail.',
							'<strong>Concierge phone setup.</strong> Unitel says it pre-configures IP phones before shipping.',
						],
					},
				],
			},
			{
				label: 'How it fits a HubSpot stack',
				blocks: [
					{ type: 'p', html: "It doesn't, as far as I could confirm." },
					{ type: 'p', html: "I didn't find a HubSpot integration on the Unitel Voice pages I opened, and I didn't find a HubSpot Marketplace listing." },
					{ type: 'p', html: "Without it, calls happen outside HubSpot. Reps would have to log them by hand. That's exactly the gap that breaks activity reporting." },
					{ type: 'p', html: 'If HubSpot call logging matters, look at a calling tool with a confirmed HubSpot integration. Aircall is one. It\'s on my <a href="/tools/aircall">Aircall page</a>.' },
				],
			},
		],
		pros: [
			'Simple. Unitel\'s whole pitch is "no tech headaches."',
			"Human support is the core of Unitel's pitch, and it's what the testimonials on its homepage keep mentioning.",
			'Works with the phones you already have.',
			'Separates business and personal calls on one device.',
		],
		cons: [
			"No HubSpot integration I could confirm.",
			"Built for small businesses. Not a contact-center or sales-floor tool.",
			'Desk phones and softphones are Office-plan only; other plans are mobile app and forwarding.',
			'Plan structure (which features sit on which tier) takes a minute to sort out.',
		],
		after: [
			{
				label: 'Bottom line for RevOps',
				blocks: [
					{ type: 'p', html: "If the phone system doesn't write to HubSpot, your activity reports are guesses." },
					{ type: 'p', html: "Unitel is fine for a small business phone line. It's not a RevOps tool." },
				],
			},
		],
		closing: 'Pick the phone system after you decide where the call record lives.',
		cta: { label: 'Try Unitel Voice', href: 'https://unitelvoice.partnerlinks.io/jp010yb97vom' },
		sources: [
			{ text: 'Unitel Voice homepage', href: 'https://www.unitelvoice.com/' },
			{ text: 'Unitel Voice, Office plan (business VoIP) page', href: 'https://www.unitelvoice.com/product/business-voip-phone-service/' },
		],
	},

	{
		slug: 'seamless-ai',
		related: ['apollo-io', 'aircall'],
		name: 'Seamless.AI',
		title: 'Seamless.AI and HubSpot — Jon Martin',
		seoTitle: 'Seamless.AI and HubSpot: Import Rules Before You Connect',
		description: `Seamless.AI is a contact data tool with a HubSpot import and a Breeze Prospecting Agent link. The fine print and the governance questions to settle first.`,
		h1: `What happens to your database when reps click import.`,
		dek: [
			`Seamless.AI is a contact data tool.`,
			`The question for a HubSpot team isn't "is the data good." It's "what happens to my database when reps start clicking import."`,
		],
		category: 'Contact data',
		facts: [
			{ label: 'Category', value: 'Contact and company data' },
			{ label: 'HubSpot connections', value: 'Import, and Breeze Prospecting Agent' },
			{ label: 'Agent needs', value: 'Sales Hub (any tier)' },
			{ label: 'Agent data sources', value: 'One at a time', flag: true },
		],
		sections: [
			{
				label: `Who it's for`,
				blocks: [
					{ type: 'p', html: `Outbound sales teams on HubSpot that need verified emails and direct dials for list building.` },
					{ type: 'p', html: `It's also worth a look if you're on HubSpot Sales Hub and want a data source for HubSpot's Breeze Prospecting Agent.` },
					{ type: 'p', html: `If your pipeline is mostly inbound, you probably don't need a dedicated prospecting database.` },
				],
			},
			{
				label: 'What it does',
				blocks: [
					{ type: 'p', html: `Seamless finds contacts and companies and returns verified emails and phone numbers. It enriches records with company details and, per Seamless, 100+ additional data points.` },
					{ type: 'p', html: `It also says it can identify look-alike contacts and accounts that match your ideal customer profile, and surface decision-makers inside accounts you already have.` },
				],
			},
			{
				label: 'How it fits a HubSpot stack',
				blocks: [
					{ type: 'p', html: `Seamless confirms two HubSpot connections on its own pages:` },
					{
						type: 'ol',
						items: [
							`<strong>The HubSpot integration.</strong> Import contacts and companies into HubSpot in a few clicks. You control what gets imported, set match scores to avoid duplicate entries, and customize import mappings.`,
							`<strong>A data source for HubSpot's Breeze Prospecting Agent.</strong> Seamless says it's a native data source for the agent. Once connected, the agent can source contacts that match enrolled accounts and ICP criteria, enrich them, enroll them into plays, and sync activity back to HubSpot.`,
						],
					},
					{ type: 'p', html: `The fine print on the Prospecting Agent connection, from Seamless's help article:` },
					{
						type: 'ul',
						items: [
							`You need HubSpot Sales Hub (Starter, Professional, or Enterprise).`,
							`HubSpot supports <strong>one external data source at a time</strong> in the Prospecting Agent. Connect Seamless and you're switching away from whatever you had.`,
							`You need to be a Super Admin or have Prospecting Agent permissions.`,
							`Your inbox needs to be connected and AI settings enabled first.`,
						],
					},
				],
			},
		],
		pros: [
			`Direct import into HubSpot with mapping and duplicate matching controls.`,
			`Works inside HubSpot's own Prospecting Agent, so reps don't have to leave HubSpot.`,
			`Enrichment can feed lead scoring with more firmographic data.`,
		],
		cons: [
			`The Prospecting Agent only takes one data source. If you also run Apollo or another provider there, you have to pick.`,
			`Import tools are only as clean as your match settings. Bad match scores mean duplicates.`,
			`Seamless's marketing pages are heavy on outcome claims. Judge it on a trial against your own ICP, not the testimonials.`,
			`More contacts in HubSpot can mean more cost and more cleanup. Decide who gets imported before anyone imports.`,
		],
		after: [
			{
				label: 'Questions to answer before you connect it',
				blocks: [
					{
						type: 'ol',
						items: [
							`Which HubSpot properties will Seamless be allowed to overwrite?`,
							`What match score counts as "same company"?`,
							`Who's allowed to auto-import, and who has to review first?`,
							`If you use the Prospecting Agent, is Seamless your one data source?`,
						],
					},
					{ type: 'p', html: `None of those are Seamless questions. They're governance questions. Answer them anyway.` },
				],
			},
		],
		closing: `Data tools don't make databases messy. Unwritten import rules do.`,
		cta: { label: 'Try Seamless.AI', href: 'https://get.seamless.ai/625is3pk44k6' },
		sources: [
			{ text: 'Seamless.AI, HubSpot integration page', href: 'https://seamless.ai/products/integrations/hubspot' },
			{ text: `Seamless.AI help, "Using Seamless with HubSpot's Breeze Prospecting Agent"`, href: 'https://seamless.ai/customers/education/articles/hubspot-and-seamless-data-source-integration' },
		],
	},

	{
		slug: 'whatconverts',
		related: ['aircall', 'adcreative-ai'],
		name: 'WhatConverts',
		title: 'WhatConverts and HubSpot — Jon Martin',
		seoTitle: 'WhatConverts and HubSpot: Call Attribution Through Zapier',
		description: `WhatConverts tracks calls, forms, and chats back to their marketing source. Its HubSpot link runs through Zapier. How the two flows work and where they break.`,
		h1: `Which campaign drove that deal?`,
		dek: [
			`"Which campaign drove that deal?" is the question every marketing team gets asked and few can answer when the lead came in by phone.`,
			`WhatConverts is built for that gap. Just know going in that its HubSpot connection runs through Zapier.`,
		],
		category: 'Call tracking and attribution',
		facts: [
			{ label: 'Category', value: 'Lead and call tracking' },
			{ label: 'HubSpot connection', value: 'Through Zapier, not native', flag: true },
			{ label: 'Sync timing', value: 'Zapier polling, 1 to 15 minutes' },
			{ label: 'Free trial', value: '14 days (as of Oct 13, 2026)' },
		],
		sections: [
			{
				label: `Who it's for`,
				blocks: [
					{ type: 'p', html: `Marketing agencies and in-house marketers running paid search, SEO, or local campaigns where a big share of leads call instead of filling out a form.` },
					{ type: 'p', html: `WhatConverts lists agencies, franchises, and service businesses like HVAC, legal, dental, and medical as core audiences.` },
					{ type: 'p', html: `For a pure B2B SaaS team where almost everything comes through forms and demos, HubSpot's own attribution may be enough.` },
				],
			},
			{
				label: 'What it does',
				blocks: [
					{ type: 'p', html: `WhatConverts tracks leads across calls, forms, chat, and e-commerce, with the marketing source attached.` },
					{ type: 'p', html: `Call tracking uses dynamic number insertion, which swaps the number on your site for tracking numbers, plus call recording.` },
					{ type: 'p', html: `Leads land in one place where you can search, qualify, and put a value on them. Reports show which channels and keywords produce the best leads.` },
					{ type: 'p', html: `Per its homepage, there's a 14-day free trial (as of Oct 13, 2026).` },
				],
			},
			{
				label: 'How it fits a HubSpot stack',
				blocks: [
					{ type: 'p', html: `WhatConverts' help center is clear: the HubSpot integration works through Zapier, not a direct native connection.` },
					{ type: 'p', html: `Two separate flows:` },
					{
						type: 'ol',
						items: [
							`<strong>WhatConverts → HubSpot.</strong> A new lead (call, form, or chat) creates a HubSpot contact. The WhatConverts Lead ID gets stored in a custom HubSpot property.`,
							`<strong>HubSpot → WhatConverts.</strong> When a deal stage changes or a deal updates, Zapier reads the Lead ID from the associated contact and sends the deal value and status back to WhatConverts.`,
						],
					},
					{ type: 'p', html: `That second flow is the point. It closes the loop from marketing source to closed revenue.` },
					{ type: 'p', html: `The limitations, straight from WhatConverts' docs:` },
					{
						type: 'ul',
						items: [
							`You build and maintain each Zap yourself.`,
							`You need a Zapier account, and the Zaps count against your Zapier usage.`,
							`You create the custom Lead ID property in HubSpot by hand.`,
							`Not real-time. Sync follows Zapier polling, 1 to 15 minutes depending on your Zapier plan.`,
							`The deal has to be associated with a contact that has the Lead ID, or the update can't find its lead.`,
						],
					},
				],
			},
		],
		pros: [
			`Call attribution with marketing source, which HubSpot forms alone won't give you for phone leads.`,
			`Revenue flows back to the marketing source, so agencies can show ROI in dollars.`,
			`Clear docs about how the integration works and where it breaks.`,
		],
		cons: [
			`Not a native HubSpot integration. Zapier is a dependency with its own cost and failure points.`,
			`Deal-to-contact association has to be clean for revenue to flow back. Messy associations break the loop.`,
			`Polling delay means it's not instant.`,
			`Someone has to own the Zaps when they break.`,
		],
		after: [
			{
				label: 'What to check first',
				blocks: [
					{
						type: 'steps',
						items: [
							`Is your deal-to-contact association reliable today?`,
							`Who owns the Zapier account?`,
							`What share of your leads actually come in by phone?`,
						],
					},
					{ type: 'p', html: `If the third answer is "almost none," skip it.` },
				],
			},
		],
		closing: `Attribution only works if the association data underneath it is clean.`,
		cta: { label: 'Try WhatConverts', href: 'https://partners.whatconverts.com/srs1hg1mn12z' },
		sources: [
			{ text: 'WhatConverts homepage', href: 'https://www.whatconverts.com/' },
			{ text: `WhatConverts help, "Understand the HubSpot Integration" (updated May 26, 2026)`, href: 'https://www.whatconverts.com/help/docs/integrations/customer-relationship-management-integrations/hubspot/understand-the-hubspot-integration/' },
		],
	},

	{
		slug: 'elevenlabs',
		related: ['aircall', 'unitel-voice'],
		name: 'ElevenLabs',
		title: 'ElevenLabs and HubSpot — Jon Martin',
		seoTitle: 'ElevenLabs Agents and HubSpot: What the Build Involves',
		description: `ElevenLabs agents can read and write HubSpot records mid-conversation. It's an API build, not a toggle. The setup, the risks, and what to settle first.`,
		h1: `ElevenLabs agents can act in HubSpot. It's a build.`,
		dek: [
			`ElevenLabs started with AI voices. Its agent platform, ElevenAgents, is the part a HubSpot team should care about: voice and chat agents that can read and write CRM records mid-conversation.`,
			`That's powerful. It's also a build, not a toggle.`,
		],
		category: 'AI voice and chat agents',
		facts: [
			{ label: 'Category', value: 'AI voice and chat agents' },
			{ label: 'HubSpot connection', value: 'API build, first-party guide' },
			{ label: 'Setup level', value: 'Intermediate, per ElevenLabs' },
			{ label: 'Listed setup time', value: '10 to 15 minutes', flag: true },
		],
		sections: [
			{
				label: `Who it's for`,
				blocks: [
					{
						type: 'ul',
						items: [
							`Service teams that want an AI agent to handle inbound calls, look up the customer, and open a ticket.`,
							`Sales teams that want inbound lead qualification over the phone or chat, with results written back to HubSpot.`,
							`Teams with someone technical enough to set up a HubSpot private app and API tools. ElevenLabs rates the HubSpot setup "Intermediate."`,
						],
					},
					{ type: 'p', html: `<strong>Not for:</strong> a team looking for a plug-and-play HubSpot app. This is closer to a project.` },
				],
			},
			{
				label: 'What it does',
				blocks: [
					{ type: 'p', html: `Per ElevenLabs' agents page:` },
					{
						type: 'ul',
						items: [
							`<strong>Voice and chat agents</strong> across phone, web, mobile, WhatsApp, SMS, and email, keeping context across channels.`,
							`<strong>90+ languages,</strong> with the ability to switch mid-conversation.`,
							`<strong>Workflows:</strong> triage and route conversations to sub-agents.`,
							`<strong>Guardrails, simulations, and automated tests</strong> before anything reaches a customer.`,
							`<strong>Analytics:</strong> resolution rate, CSAT, transcripts, debug logs.`,
							`<strong>Bring your own LLM,</strong> plus connections through MCP, APIs, and webhooks.`,
							`<strong>Compliance.</strong> ElevenLabs lists SOC 2 Type II, ISO 27001, PCI DSS Level 1, HIPAA, and GDPR.`,
						],
					},
				],
			},
			{
				label: 'How it fits a HubSpot stack',
				blocks: [
					{ type: 'p', html: `ElevenLabs has a first-party HubSpot integration page. Setup, per that page:` },
					{
						type: 'ol',
						items: [
							`Create a <strong>HubSpot private app</strong> with scopes for contacts, companies, deals, tickets, and conversations.`,
							`Store the access token and Hub ID in <strong>ElevenLabs Secrets Manager.</strong>`,
							`Build <strong>API tools</strong> for the agent: search contact, create deal, update contact, create ticket, each pointed at HubSpot's CRM API.`,
							`<strong>Map properties.</strong> Decide which HubSpot properties the agent can read and write, and set association rules.`,
						],
					},
					{ type: 'p', html: `ElevenLabs says this enables real-time CRM lookups during calls, record updates, ticket creation, and triggering HubSpot workflows from conversation outcomes. Listed setup time: 10 to 15 minutes. Realistic setup time for a production agent with governance: longer.` },
					{ type: 'p', html: `I didn't confirm a HubSpot Marketplace listing for ElevenLabs. This is an API-based integration.` },
				],
			},
			{
				label: 'The RevOps questions',
				blocks: [
					{ type: 'p', html: `This is where I'd slow down.` },
					{
						type: 'ol',
						items: [
							`<strong>Which properties can the agent write?</strong> Lock it to a short list. An agent that can update any contact property will.`,
							`<strong>What creates a deal vs a ticket?</strong> Write the rule before the agent does it 500 times.`,
							`<strong>Who owns the private app token?</strong> It's a credential. Treat it like one.`,
							`<strong>How do you test?</strong> ElevenLabs has simulations and tests. Use them against a sandbox portal first.`,
						],
					},
				],
			},
		],
		pros: [
			`Agents can actually act in HubSpot (look up, create, update), not just talk.`,
			`Strong voice quality is ElevenLabs' core business.`,
			`Testing and guardrails are built in.`,
			`Works across channels with one context.`,
		],
		cons: [
			`It's an API build. Private apps, tokens, endpoints, property mapping.`,
			`An agent with write access can create bad data fast if rules are loose.`,
			`Hard to evaluate without a pilot. Demos don't show your edge cases.`,
			`Overkill if what you need is better call logging. A calling tool with a native HubSpot integration is simpler.`,
		],
		closing: `An agent with write access is only as safe as the property list you give it.`,
		cta: { label: 'Try ElevenLabs', href: 'https://try.elevenlabs.io/38w4z4aw3o33' },
		sources: [
			{ text: 'ElevenLabs, ElevenAgents overview', href: 'https://elevenlabs.io/agents' },
			{ text: 'ElevenLabs, HubSpot integration page', href: 'https://elevenlabs.io/agents/integrations/hubspot' },
		],
	},

	{
		slug: 'gamma',
		related: ['trainual', 'adcreative-ai'],
		name: 'Gamma',
		title: 'Gamma and HubSpot — Jon Martin',
		seoTitle: 'Gamma HubSpot App: Win/Loss and QBR Decks From Your CRM Data',
		description: `Gamma builds AI presentations, and its HubSpot app reads deal, account, and campaign data into decks. What it does, how access works, and a first test.`,
		h1: `Gamma's HubSpot app is aimed at the QBR deck loop.`,
		dek: [
			`Every QBR deck starts the same way. Export from HubSpot. Paste into slides. Fix the formatting. Repeat next quarter.`,
			`Gamma's HubSpot app is aimed right at that loop.`,
		],
		category: 'AI presentations',
		facts: [
			{ label: 'Category', value: 'AI decks, docs, and sites' },
			{ label: 'HubSpot app', value: 'Marketplace connector, 100+ installs' },
			{ label: 'Access', value: 'Read-only, per user' },
			{ label: 'Marketplace reviews', value: 'None yet (as of Oct 13, 2026)', flag: true },
		],
		sections: [
			{
				label: `Who it's for`,
				blocks: [
					{
						type: 'ul',
						items: [
							`Account managers and CSMs building renewal decks and QBRs from deal and account data.`,
							`Sales leaders doing win/loss reviews.`,
							`Marketers turning campaign reports into recap decks.`,
							`RevOps folks who get asked for "a quick deck on pipeline" more than they'd like.`,
						],
					},
					{ type: 'p', html: `Good fit for teams that already keep their data in HubSpot. If the data's wrong in HubSpot, the deck will be wrong faster.` },
				],
			},
			{
				label: 'What it does',
				blocks: [
					{ type: 'p', html: `Gamma is an AI tool for presentations, documents, and websites. You describe what you need and it builds the layout and design.` },
					{ type: 'p', html: `It exports to PDF, PPTX, PNG, and Google Slides, and imports PDF and PPTX, per the HubSpot listing (as of Oct 13, 2026).` },
				],
			},
			{
				label: 'How it fits a HubSpot stack',
				blocks: [
					{ type: 'p', html: `Confirmed on the HubSpot Marketplace (checked Oct 13, 2026): a <strong>Gamma</strong> connector, built by Gamma, 100+ installs.` },
					{ type: 'p', html: `The listing's features:` },
					{
						type: 'ol',
						items: [
							`<strong>Pull deal and account data into a gamma.</strong> Deal, account, and contact details, no copy-paste.`,
							`<strong>Analyze closed-won and closed-lost deals.</strong> Turn a quarter of closed deals into a win/loss deck.`,
							`<strong>Turn campaign reports into a recap deck.</strong>`,
							`<strong>Pull a HubSpot marketing dashboard into a card:</strong> traffic, conversions, campaign performance.`,
						],
					},
					{ type: 'p', html: `From Gamma's help center on connectors:` },
					{
						type: 'ul',
						items: [
							`<strong>Read-only.</strong> Gamma says it never writes to, deletes from, or shares content from a connected tool.`,
							`<strong>Per-user access.</strong> Each person connects their own account, and Gamma can only read what that user can already see in HubSpot.`,
							`<strong>Only when referenced.</strong> Data gets pulled when you reference the source in a prompt, not in the background.`,
							`<strong>Admin control on Enterprise.</strong> Workspace admins can allow or block connectors.`,
							`<strong>No extra charge for connectors.</strong> Generations still use credits as usual.`,
						],
					},
					{ type: 'p', html: `The HubSpot listing shows access type "Personal" and says no HubSpot permissions are required, though Gamma may request more while connecting.` },
				],
			},
		],
		pros: [
			`Read-only by design. It can't mess up your CRM.`,
			`Respects HubSpot permissions, since it acts as the connecting user.`,
			`Win/loss and QBR use cases are real, recurring work.`,
			`Exports to the formats people actually send around.`,
		],
		cons: [
			`AI-built decks still need a human check. Numbers pulled into a narrative can get framed wrong.`,
			`Per-user connections mean each person sets it up. Fine for a small team, more coordination for a big one.`,
			`The HubSpot listing had zero reviews as of Oct 13, 2026. It's new.`,
			`Garbage in, garbage out. Incomplete close reasons make a useless win/loss deck.`,
		],
		after: [
			{
				label: 'A good first test',
				blocks: [
					{ type: 'p', html: `Pick last quarter's closed-lost deals. Ask Gamma for a win/loss deck. Then check every number against the HubSpot report.` },
					{ type: 'p', html: `If close reasons are blank on half the deals, you've found your real problem.` },
				],
			},
		],
		closing: `The deck is only as honest as the close reasons behind it.`,
		cta: { label: 'Try Gamma', href: 'https://try.gamma.app/1fj0ceqtkde6' },
		sources: [
			{ text: 'HubSpot Marketplace, Gamma listing (rendered Oct 13, 2026)', href: 'https://ecosystem.hubspot.com/marketplace/listing/gamma-app' },
			{ text: `Gamma Help Center, "How do I use Gamma with inbound connectors?"`, href: 'https://help.gamma.app/en/articles/15675394-how-do-i-use-gamma-with-inbound-connectors' },
		],
	},

	{
		slug: 'plesk',
		related: ['quicksigner', 'whatconverts'],
		name: 'Plesk',
		title: 'Plesk and HubSpot — Jon Martin',
		seoTitle: 'Plesk and HubSpot: A Hosting Control Panel for Agencies',
		description: `Plesk is a hosting and server control panel. It doesn't touch your CRM. The narrow case where it matters to a HubSpot agency, and who should skip it.`,
		h1: `Plesk is a server control panel, not a RevOps tool.`,
		dek: [
			`Plain answer: Plesk is a weak fit for RevOps and HubSpot teams.`,
			`It's a hosting and server control panel. It helps whoever runs your web servers. It doesn't touch your CRM, your pipeline, or your reporting.`,
			`I'm including it because some readers run agencies or manage client websites. If that's you, keep reading. If not, this isn't your tool.`,
		],
		category: 'Hosting control panel',
		facts: [
			{ label: 'Category', value: 'Hosting and server control panel' },
			{ label: 'HubSpot integration', value: 'None found', flag: true },
			{ label: 'Built for', value: 'Hosts, IT admins, agencies' },
			{ label: 'Overlap with HubSpot', value: 'Narrow' },
		],
		sections: [
			{
				label: `Who it's for`,
				blocks: [
					{ type: 'p', html: `Per Plesk, it's built for:` },
					{
						type: 'ul',
						items: [
							`Infrastructure and hosting providers`,
							`IT admins`,
							`Developers`,
							`Digital agencies managing many client sites`,
							`Content managers`,
						],
					},
					{ type: 'p', html: `The overlap with a HubSpot audience is narrow: agencies or consultants who also host WordPress sites for clients outside HubSpot's CMS.` },
				],
			},
			{
				label: 'What it does',
				blocks: [
					{ type: 'p', html: `From Plesk's homepage:` },
					{
						type: 'ol',
						items: [
							`<strong>One dashboard</strong> to build and manage multiple sites, run updates, and monitor performance.`,
							`<strong>Security</strong> across OS, network, and apps, built into the core and extended through security partners.`,
							`<strong>WP Toolkit.</strong> Install, manage, update, and secure WordPress sites. Plesk lists AI-powered regression testing, cloning, staging, and backup and restore.`,
							`<strong>100+ extensions.</strong> Plesk names tools like DigiCert SSL, CloudLinux, Cloudflare, Let's Encrypt, Git, NodeJS, PHP, NGINX, ImunifyAV, and Backup to Cloud Pro.`,
							`<strong>Runs on many platforms.</strong> Plesk says it works across virtualization and container platforms and major clouds like AWS, Google, Azure, Alibaba, and DigitalOcean.`,
							`<strong>Full root access</strong> via SSH on Plesk-powered VPS and dedicated servers.`,
							`<strong>SolusVM</strong> for virtualization and VPS hosting.`,
						],
					},
				],
			},
			{
				label: 'How it fits a HubSpot stack',
				blocks: [
					{ type: 'p', html: `It doesn't, directly.` },
					{ type: 'p', html: `I didn't find a HubSpot integration on Plesk's site or a HubSpot Marketplace listing.` },
					{ type: 'p', html: `The only realistic connection: if a client's marketing site runs on WordPress on a Plesk-managed server, HubSpot tracking code and forms live on that site. Plesk keeps the site up. HubSpot captures what happens on it. They don't talk to each other.` },
				],
			},
		],
		pros: [
			`One panel for many sites, which matters if you manage a lot of them.`,
			`WP Toolkit covers the boring, important WordPress work: updates, staging, backups.`,
			`Big extension catalog.`,
			`Runs on most hosting setups.`,
		],
		cons: [
			`Not a RevOps tool. No HubSpot connection.`,
			`Built for people comfortable with servers. Root access and SSH aren't features most marketers want.`,
			`If your site is on HubSpot's CMS, you don't need this at all.`,
		],
		after: [
			{
				label: 'Where it might make sense',
				blocks: [
					{
						type: 'ul',
						items: [
							`An agency hosting a dozen client WordPress sites`,
							`Each site runs HubSpot tracking and forms`,
							`Plesk keeps those sites patched and backed up`,
						],
					},
					{ type: 'p', html: `That's the whole fit. It's real, but it's narrow.` },
				],
			},
		],
		closing: `Right tool, different job.`,
		cta: { label: 'Try Plesk', href: 'https://try.plesk.com/uohmer32q2su' },
		sources: [{ text: 'Plesk homepage', href: 'https://www.plesk.com/' }],
	},

	{
		slug: 'quicksigner',
		related: ['trainual', 'plesk'],
		name: 'QuickSigner',
		title: 'QuickSigner and HubSpot — Jon Martin',
		seoTitle: 'QuickSigner and HubSpot: E-Signature Through the API',
		description: `QuickSigner is a simple, lower-cost e-signature tool. No native HubSpot integration found, so the connection is an API build. What it takes and who it suits.`,
		h1: `E-signature is the last mile of the deal.`,
		dek: [
			`The contract gets signed, and then someone has to remember to move the deal to Closed Won.`,
			`QuickSigner is a simple, lower-cost e-signature tool. The catch for HubSpot teams: I couldn't confirm a native HubSpot integration. You'd connect it through its API.`,
		],
		category: 'E-signature',
		facts: [
			{ label: 'Category', value: 'E-signature' },
			{ label: 'HubSpot integration', value: 'None confirmed', flag: true },
			{ label: 'Connects through', value: 'REST API and webhooks' },
			{ label: 'Signer account', value: 'Not required' },
		],
		sections: [
			{
				label: `Who it's for`,
				blocks: [
					{
						type: 'ul',
						items: [
							`Small businesses and small teams that send contracts, NDAs, and order forms and don't want per-envelope limits.`,
							`Teams that want to replace a bigger e-signature tool for basic signing.`,
							`Teams with a developer, or a consultant, who can wire signing events into HubSpot.`,
						],
					},
					{ type: 'p', html: `Moderate fit. Good tool for signing. HubSpot connection is a build.` },
				],
			},
			{
				label: 'What it does',
				blocks: [
					{ type: 'p', html: `Per QuickSigner's homepage and API page:` },
					{
						type: 'ol',
						items: [
							`<strong>Upload, add signers, send.</strong> PDF or Word. Signers get a secure link and don't need an account.`,
							`<strong>Templates</strong> with fields and recipient roles already placed.`,
							`<strong>Signing order:</strong> sequential or parallel.`,
							`<strong>Reminders, tracking, and an audit trail.</strong>`,
							`<strong>Legal and security.</strong> QuickSigner says signatures use PAdES with an Adobe Approved Trust List (AATL) certificate, that it's ISO/IEC 27001:2022 certified and GDPR compliant, and that signatures are recognized under the US ESIGN Act, UETA, and eIDAS.`,
							`<strong>Unlimited documents on paid plans,</strong> per QuickSigner (as of Oct 13, 2026).`,
							`<strong>A REST API</strong> with templates, embedded signing, field tags, and webhooks.`,
						],
					},
				],
			},
			{
				label: 'How it fits a HubSpot stack',
				blocks: [
					{ type: 'p', html: `I didn't find a HubSpot integration on quicksigner.com or a QuickSigner HubSpot Marketplace listing.` },
					{ type: 'p', html: `One trap while researching: a Swedish product called QuickSign (quicksign.se) advertises a HubSpot integration. It's a different domain. Don't confuse the two.` },
					{ type: 'p', html: `What QuickSigner does have, per its API page:` },
					{
						type: 'ul',
						items: [
							`Webhooks: <strong>RECIPIENT_SIGNED</strong> for each signer and <strong>REQUEST_COMPLETED</strong> when the document is sealed.`,
							`Templates you can send by ID, so you don't have to upload a file each time.`,
							`Embedded signing in an iframe.`,
							`QuickSigner itself lists "a 'send contract' button in a CRM" as a typical API use.`,
						],
					},
					{ type: 'p', html: `So a HubSpot connection would look like:` },
					{
						type: 'steps',
						items: [
							`Rep clicks a custom action on a HubSpot deal`,
							`Your integration creates a QuickSigner request from a template`,
							`REQUEST_COMPLETED webhook fires`,
							`Your integration updates the deal stage and attaches the signed PDF`,
						],
					},
					{ type: 'p', html: `That's a real build. Someone owns it.` },
				],
			},
		],
		pros: [
			`Simple signing. No account needed for signers.`,
			`Strong standards story (PAdES, AATL, ISO 27001), per QuickSigner.`,
			`API is clearly documented, with webhooks built for "signed" events.`,
			`Templates cut repeat setup.`,
		],
		cons: [
			`No native HubSpot integration I could confirm.`,
			`No official SDKs, per the API page. Plain REST.`,
			`Younger product. Reviewers on its homepage mention features being added after feedback, and one calls it "not as sophisticated as the more established services."`,
			`If you already use HubSpot's own quote or signing tools, check whether you need this at all.`,
		],
		closing: `A signed contract that doesn't update the deal is half a close.`,
		cta: { label: 'Try QuickSigner', href: 'https://get.quicksigner.com/mvxowii17iqr' },
		sources: [
			{ text: 'QuickSigner homepage', href: 'https://www.quicksigner.com/' },
			{ text: 'QuickSigner, eSignature API page (states "Prices and features as of October 7, 2026")', href: 'https://www.quicksigner.com/esignature-api/' },
		],
	},
];

export const disclosure =
	'This page contains an affiliate link. If you sign up through it, I earn a commission. It costs you nothing extra.';
