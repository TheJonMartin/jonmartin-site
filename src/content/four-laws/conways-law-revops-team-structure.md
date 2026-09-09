---
title: Conway's Law and Your RevOps Team Structure
description: Why your CRM, CPQ, and billing systems already mirror your RevOps org chart — and how to redraw team boundaries around quote-to-cash using Reverse Conway.
seoTitle: "Conway's Law and Your RevOps Team Structure | Four Laws"
group: explore
order: 20
---

<span class="label">Applied example · RevOps</span>

Why your CRM, CPQ, and billing systems already look like your org chart — and what to do about it before your next reorg.

## The symptom you already recognize

If you've ever had to explain why a deal took three system hops to close, or why the same customer looks different in Salesforce, your CPQ, and your billing platform, you've already met Conway's Law without naming it: organizations design systems that mirror their own communication structure (see [Full Reference 2.2](/four-laws-complex-system-design-full#s22)). RevOps lives inside this effect more than almost any other function, because RevOps sits directly on top of the seam between Sales, Marketing, and Customer Success — and whatever seam exists in the org chart shows up again, faithfully, in the tooling.

## The two RevOps models, through a Conway's Law lens

Most RevOps org-design guidance boils down to a choice between two shapes. The **departmental model** splits RevOps by GTM function — Sales Ops, Marketing Ops, CS Ops — each reporting up through its own department, each usually owning its own slice of the stack. The **functional model** organizes by capability instead — strategy, systems, enablement, insights — with one team supporting all three GTM departments.

Neither description usually mentions what Conway's Law predicts each one will produce, but the prediction is exactly what most RevOps leaders have already lived through:

- **Departmental model** — expect the stack to fragment along the same lines as the org chart. Lead handoff from Marketing Ops to Sales Ops, quote handoff from Sales Ops to whoever owns billing, renewal handoff from CS Ops back to Sales — each boundary in the team structure becomes a boundary in the data model, with its own translation layer and its own definition of "customer."
- **Functional model** — the stack tends toward a more unified data layer, because the team boundary isn't drawn along GTM department lines in the first place. The trade-off is coordination cost ([Brooks's Law, 2.3](/four-laws-complex-system-design-full#s23)): a single systems team supporting three GTM motions has to hold more context, and risks becoming a calendar-constrained bottleneck of its own.

Neither model is "correct" in the abstract — Conway's Law just tells you which system architecture you're implicitly choosing to produce by picking one.

## Map the variety before you redraw the boundary

The mistake most reorgs make is redrawing team lines before answering the Ashby's Law question underneath them ([2.1](/four-laws-complex-system-design-full#s21)): where does the real variety in your revenue motion actually live? A usage-based SaaS company selling exclusively self-serve has a fundamentally different variety profile than one running a mix of self-serve, mid-market sales-assist, and enterprise multi-year contracts. The org chart that fits one badly fits the other.

Before redrawing any RevOps boundary, the [Reverse Conway Maneuver (2.4)](/four-laws-complex-system-design-full#s24) says: map the variety first.

- Where does deal complexity genuinely differ — self-serve vs. sales-assist vs. enterprise, standard terms vs. negotiated terms?
- What does each segment's motion actually require a team to carry — pricing logic, contract review, provisioning, proration?
- Where are the natural low-interface seams — the places a boundary can be drawn without constant cross-team negotiation?

## A worked example — splitting Deal Desk from Billing Ops

### The setup

A subscription company runs Deal Desk (quoting, reporting through Sales) and Billing Ops (invoicing and revenue recognition, reporting through Finance) as two separate teams. For standard deals this works fine — the handoff is clean because the variety on each side is genuinely low.

### Where it breaks

It breaks down the moment a deal includes anything non-standard: a mid-term seat change, a usage-based component, a multi-entity billing arrangement. Now the deal needs both teams to negotiate a one-off, because neither team owns the full quote-to-cash surface — and Conway's Law guarantees that whatever gets shipped is whatever the two-team seam can most easily agree to, not necessarily what the deal actually needs. This is exactly the seam Ashby's Law predicts will fail: variety exceeding either team's individual capacity to absorb it, because the capacity is split across a boundary that wasn't drawn where the real variety lives.

### The Reverse Conway fix

The fix isn't necessarily "merge the teams" — it's Team Topologies' more precise move ([2.5](/four-laws-complex-system-design-full#s25)): make quote-to-cash a **stream-aligned** pod that owns the full flow for non-standard deals end-to-end, with Deal Desk and Billing Ops operating as **platform teams** underneath it for the standard-deal volume that doesn't need custom handling. The interaction mode between them becomes explicit **X-as-a-Service** for standard deals, temporary **Collaboration** for the non-standard ones that actually need it.

## Put this into practice

Before your next RevOps reorg, ask: where does deal or customer variety actually concentrate, and does today's team boundary sit on top of that variety or cut through the middle of it? If your systems keep needing custom integration work at the same handoff every quarter, that handoff is your seam — not a systems problem to code around, but a team-boundary problem to redraw. Run the numbers on your own current WIP and cycle time in the [Flow & Constraint Diagnostic](/part8-flow-diagnostic) once you've found it.

This is the kind of team-and-systems-boundary work I do day to day with subscription and SaaS companies — presales and delivery architecture for the systems that sit underneath quote-to-cash. If you're mid-reorg or evaluating a RevOps restructure, [get in touch](/contact). For the underlying theory, start with [2.4 The Reverse Conway Maneuver](/four-laws-complex-system-design-full#s24) or [2.5 Team Topologies](/four-laws-complex-system-design-full#s25) in the Full Reference. If you're scoping AI agents into a RevOps or delivery workflow, the same boundary problem shows up a layer down — see [Conway's Law in the AI Agent Era](/conways-law-ai-agents-revops).
