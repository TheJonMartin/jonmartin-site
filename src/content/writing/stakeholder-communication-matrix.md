---
title: 'A Field-Tested Stakeholder Communication Matrix'
description: 'Detail level should track decision-making need, not seniority — a six-tier communication matrix for systems integration and subscription management engagements.'
seoTitle: 'Stakeholder Communication Matrix — Jon Martin'
pubDate: 2026-08-06
draft: false
tags: ['Systems', 'RevOps', 'Client Delivery']
---

Every communication plan I've reviewed fails in the same two directions at once.

The C-suite gets a weekly status doc with field mappings in it. Nobody reads it. Four months later an executive is blindsided by a timeline slip that had been sitting on page three of every update since spring.

Meanwhile the client's system admin — the person who owns this thing after we leave — hears about an architecture decision at go-live.

Those look like opposite problems. They're the same mistake. Both plans were calibrated to the org chart.

## Detail should track decision-making need, not seniority

That's the whole idea, and it's worth defending, because it isn't how most plans get built.

The default assumption is that importance flows down from the top. The more senior the stakeholder, the more they should get. So executives get everything and everyone below gets a filtered version of it.

But an executive doesn't need integration specs. They need to know whether the business case still holds and whether the date moved. That's two sentences, a handful of times across an engagement. Send them more and they stop reading — which means when something genuinely needs their attention, it arrives in a channel they've already trained themselves to skim.

Over-communicating to an executive isn't a courtesy. It's how you lose the channel.

So ask a different question. Not "how senior is this person." Ask: **what decisions does this person actually make, and what do they need in order to make them?**

That question produces a different plan. Here's the one I keep landing on.

## The matrix

<table class="ledger matrix">
	<thead>
		<tr>
			<th>Stakeholder</th>
			<th>Frequency</th>
			<th>Channel</th>
			<th>Content type</th>
			<th>Detail</th>
			<th>RACI</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td data-label="Stakeholder"><strong>C-Suite</strong></td>
			<td data-label="Frequency">Milestone-based only (kickoff, go-live, major risk)</td>
			<td data-label="Channel">Async executive summary</td>
			<td data-label="Content type">Business case validation, major risks, budget/timeline impact</td>
			<td data-label="Detail">Very low</td>
			<td data-label="RACI">Informed</td>
		</tr>
		<tr>
			<td data-label="Stakeholder"><strong>Executive Sponsor</strong></td>
			<td data-label="Frequency">Bi-weekly or milestone-based</td>
			<td data-label="Channel">Async email + monthly live check-in</td>
			<td data-label="Content type">Status, risks and decisions needed, ROI/business impact</td>
			<td data-label="Detail">Low</td>
			<td data-label="RACI">Accountable</td>
		</tr>
		<tr>
			<td data-label="Stakeholder"><strong>Project Owner</strong></td>
			<td data-label="Frequency">Weekly</td>
			<td data-label="Channel">Scheduled call + shared doc</td>
			<td data-label="Content type">Progress vs. plan, blockers, upcoming decisions, trade-offs</td>
			<td data-label="Detail">Medium</td>
			<td data-label="RACI">Responsible</td>
		</tr>
		<tr>
			<td data-label="Stakeholder"><strong>Director / Manager</strong></td>
			<td data-label="Frequency">Weekly or bi-weekly, milestone-driven</td>
			<td data-label="Channel">Email/Slack + relevant working sessions</td>
			<td data-label="Content type">Departmental impact, workflow or process changes, timeline for their group</td>
			<td data-label="Detail">Medium</td>
			<td data-label="RACI">Consulted</td>
		</tr>
		<tr>
			<td data-label="Stakeholder"><strong>End Users</strong></td>
			<td data-label="Frequency">At key milestones (kickoff, UAT, go-live)</td>
			<td data-label="Channel">Live demo + written summary</td>
			<td data-label="Content type">Workflow changes, training, day-to-day impact</td>
			<td data-label="Detail">Low</td>
			<td data-label="RACI">Informed</td>
		</tr>
		<tr class="outlier">
			<td data-label="Stakeholder"><strong>Client System Admins</strong></td>
			<td data-label="Frequency">Weekly or as-needed</td>
			<td data-label="Channel">Slack/Teams + working sessions + documentation handoff</td>
			<td data-label="Content type">Architecture decisions, integration specs, field mappings, config, maintenance</td>
			<td data-label="Detail">High</td>
			<td data-label="RACI">Consulted → Responsible post-handoff</td>
		</tr>
	</tbody>
</table>

Read down the Detail column and you'll see it doesn't track the org chart. That's the point.

## The admin exception

Client system admins break the pattern, and they're the tier most plans get wrong.

They sit well below the executive sponsor on the org chart and they need more technical depth than anyone else on the list. Not because they're senior. Because they inherit ongoing ownership the day the engagement closes.

Everyone else on this matrix is making decisions *during* the project. The admin is making decisions for the next three years, alone, using whatever context you left behind.

If they learn the integration architecture from documentation handed over in the final week, you didn't hand off a system. You handed off a liability with your name on it.

So they get architecture decisions as they're made, not as they're documented. Field mappings while there's still time to argue about them. A seat in working sessions where the config gets decided.

> The admin's detail level isn't a function of their seniority. It's a function of how long they'll be living with your decisions.

That's also why their RACI moves. Consulted during delivery, Responsible after. It's the only row on the matrix that changes state, and the handoff is the moment it changes.

## How to use it

This is a starting position, not a deliverable. Four things I'd do with it on a real engagement:

1. **Map real names to tiers in week one.** Titles lie. The person with "Director" in their title is sometimes the Project Owner, and the actual executive sponsor is sometimes the only person who answers Slack. Ask who signs off on scope changes and who gets called when go-live slips. That's your Accountable.
2. **Treat frequency as a floor, not a ceiling.** Bi-weekly means at least bi-weekly. Nothing here says wait for the cadence when something breaks.
3. **Escalate ad hoc regardless of tier.** A major risk goes to the C-suite the day you find it, not at the next milestone. The matrix governs routine communication. Risk isn't routine.
4. **Re-check the admin row at every architecture decision.** This is the row that quietly falls behind, because keeping it current costs delivery time now and only pays off after you've left.

None of the four matter if nobody on your side owns the plan. A communication matrix with no named owner degrades into whoever happens to be writing the status doc that week — which is exactly the failure mode it was built to prevent.

There's a related failure worth knowing about: the decisions you route *to* executives form a queue, and queues have math. I wrote about that separately in [why executive decisions stall on client projects](/stakeholder-decision-bottlenecks) — Little's Law and Kingman's formula applied to the steering committee. Getting the communication plan right and still missing the queueing problem is a common way to be surprised on schedule.

Seniority tells you who to invite. It doesn't tell you what to say.

<div class="download">
	<p class="label">Download</p>
	<p>The full matrix as a one-page PDF — landscape, print-ready, no email required.</p>
	<a class="button" href="/stakeholder-communication-matrix.pdf" download>Get the matrix (PDF) &darr;</a>
</div>
