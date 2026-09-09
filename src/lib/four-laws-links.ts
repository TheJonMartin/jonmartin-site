// Single source of truth for the Four Laws content/tool link list — used by
// both Nav.astro (the "Four Laws of Complex System Design" dropdown, visible
// from every page) and FourLawsFooter.astro (the same list, repeated as a
// sitemap at the bottom of every Four Laws page). Previously duplicated in
// both places by hand; centralized here so the two can't drift.
export const fourLawsGroups: { label: string; links: { href: string; text: string }[] }[] = [
	{
		label: 'Explore',
		links: [
			{ href: '/four-laws-flow-and-constraints', text: 'Flow Deck' },
			{ href: '/conways-law-revops-team-structure', text: "RevOps & Conway's Law" },
			{ href: '/conways-law-ai-agents-revops', text: "AI Agents & Conway's Law" },
			{ href: '/stakeholder-decision-bottlenecks', text: 'Stakeholder Decision Stalls' },
			{ href: '/wip-limits-vs-theory-of-constraints', text: 'WIP Limits vs. ToC' },
			{ href: '/vsm-ai-system-4', text: 'AI, System 4 & VSM' },
			{ href: '/applied-examples', text: 'More Applied Examples' },
		],
	},
	{
		label: 'Tools',
		links: [
			{ href: '/part8-flow-diagnostic', text: 'Diagnostic Tool' },
			{ href: '/flow-formula-calculator', text: 'Calculator' },
			{ href: '/stakeholder-decision-checklist', text: 'Decision Stall Checklist' },
		],
	},
	{
		label: 'Reference',
		links: [
			{ href: '/four-laws-complex-system-design-full', text: 'Full Reference' },
			{ href: '/glossary', text: 'Glossary' },
			{ href: '/faq', text: 'FAQ' },
			{ href: '/contact', text: 'Contact' },
		],
	},
];
