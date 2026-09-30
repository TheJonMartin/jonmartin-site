// Single source of truth for the Altitude section link list — used by Nav.astro
// and AltitudeFooter.astro so the two can't drift.
export const altitudeGroups: { label: string; links: { href: string; text: string }[] }[] = [
	{
		label: 'Start',
		links: [
			{ href: '/altitude', text: 'Overview' },
			{ href: '/altitude/module-02', text: 'The Four Altitudes' },
			{ href: '/altitude/module-03', text: 'The Diagnostic' },
			{ href: '/altitude/module-04', text: 'Failure Modes' },
			{ href: '/altitude/module-05', text: 'The L2 Bridge' },
		],
	},
	{
		label: 'Field',
		links: [
			{ href: '/altitude/appendix-a', text: 'Field Card' },
			{ href: '/altitude/module-08', text: 'Practice Drills' },
			{ href: '/altitude/module-09', text: 'Discovery Calls' },
			{ href: '/altitude/module-13', text: 'Capstone' },
		],
	},
	{
		label: 'Guide',
		links: [
			{ href: '/altitude/module-01', text: 'Module 1 — The Problem' },
			{ href: '/altitude/module-06', text: 'Module 6 — Advisory Layer' },
			{ href: '/altitude/module-07', text: 'Module 7 — Multi-Stakeholder' },
			{ href: '/altitude/module-10', text: 'Module 10 — The Document' },
			{ href: '/altitude/module-12', text: 'Module 12 — Drift' },
			{ href: '/altitude/module-18', text: 'Module 18 — Assessment' },
		],
	},
];
