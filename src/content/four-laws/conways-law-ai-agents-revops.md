---
title: Conway's Law in the AI Agent Era
description: AI agents inherit your team boundaries, not just your tasks — why an AI SDR or billing-exceptions agent fails exactly where your org chart already had a seam.
seoTitle: "Conway's Law in the AI Agent Era | Four Laws Framework"
group: explore
order: 30
---

<span class="label">Applied example · RevOps & AI</span>

AI agents inherit your team boundaries, not just your tasks — why an AI SDR or billing-exceptions agent quietly fails exactly where your org chart already had a seam.

## The symptom you already recognize

You scope an AI agent to "handle billing exceptions" or "qualify inbound leads," point it at the relevant system, and it works — for a while. Standard cases clear fast. Then non-standard ones start piling up somewhere you're not watching: not a Slack thread anyone notices, not an inbox that visibly backs up, just a log field or a queue of "needs review" tickets quietly growing. Nobody planned for this, because it doesn't look like an org-design problem. It looks like the agent needs a better prompt, or more training examples, or a smarter model. Usually it's none of those. It's Conway's Law ([Full Reference 2.2](/four-laws-complex-system-design-full#s22)), showing up one layer down — the agent's scope was drawn along whatever team boundary already existed, and it inherited that boundary's blind spots along with its job description.

## Agent scopes are team boundaries now, just faster

Conway's Law says organizations design systems that mirror their own communication structure. That prediction doesn't need a human on both ends of the communication — it applies just as cleanly when one side is an agent. Fuzzy team boundaries produce fuzzy agent scopes, with the exact same downstream coordination costs a fuzzy human handoff produces. The difference is speed and visibility: a new hire who's confused about where their job ends will say so, or visibly stall, or ask someone. An agent that's confused about where its scope ends will either escalate into a void nobody's watching, or — worse — take an action that was never really its call to make, confidently and at machine speed.

This is Ashby's Law ([2.1](/four-laws-complex-system-design-full#s21)) applied to the agent itself: it's a regulator, and it can only absorb as much variety as it was actually designed to handle. Scope it to the variety of "standard billing exceptions" and it'll handle standard billing exceptions well. Point it at "billing exceptions" broadly, without mapping where the real variety in that category lives, and it will quietly mismatch capacity to task the same way an overloaded person does — except a person tells you they're drowning, and an agent, absent explicit guardrails, usually doesn't.

## The same two RevOps models, with an agent layered in

The [departmental vs. functional RevOps split](/conways-law-revops-team-structure) already predicts what happens to human handoffs at each seam. Add an AI agent into either model without redesigning the seam first, and the agent just reproduces the same fragmentation, faster:

- **Departmental model** — an AI SDR agent gets scoped to Sales Ops' slice of the funnel, an enrichment or lead-scoring agent sits inside Marketing Ops, and neither agent has a defined interaction mode with the other. The lead handoff that used to be a Slack message with some context now happens agent-to-agent with less context, not more — the seam didn't disappear, it just got faster and quieter.
- **Functional model** — a single systems team owns the agent across all three GTM motions, which avoids the fragmentation but concentrates something new: nobody but that team fully understands what the agent will and won't do in an edge case, which is a Brooks's Law–shaped bottleneck ([2.3](/four-laws-complex-system-design-full#s23)) wearing an AI-governance costume.

Neither model is wrong. But whichever one you're running, the agent's scope will mirror it exactly — unless you deliberately draw the agent's boundary somewhere else on purpose.

## Map the variety before you scope the agent

The mistake is the same one [the RevOps reorg piece](/conways-law-revops-team-structure) warns about, just one step earlier in the process: scoping an agent to a team's existing job description before mapping where the real variety in that job actually lives. A usage-based SaaS company's billing exceptions look nothing like a mid-market company's negotiated-contract exceptions — an agent tuned on one variety profile will silently misjudge the other. Before scoping any agent into a RevOps or delivery workflow, ask the same questions the [Reverse Conway Maneuver (2.4)](/four-laws-complex-system-design-full#s24) asks about a human team:

- Where does the real variety in this workflow concentrate — which cases are genuinely standard, and which require judgment a rule can't capture?
- What happens at the edge of the agent's scope — does it escalate to a specific accountable person, or does "needs review" mean no one in particular?
- Who owns this agent the way a Team Topologies stream-aligned team owns its stream — not just who built it, but who's accountable for its guardrails and its failure mode?

## A worked example — a billing-exceptions agent scoped to the old boundary

### The setup

A subscription company automates its Billing Ops queue with an AI agent: it reads incoming proration disputes and mid-cycle plan-change requests, resolves the standard ones against pricing rules, and drafts a response. It's scoped exactly the way the human Billing Ops team was always scoped — to invoicing and standard plan changes, reporting through Finance, with Deal Desk (quoting, reporting through Sales) handling anything non-standard, just like before.

### Where it breaks

The agent handles the routine 80% cleanly, which looks like a win for weeks. Then a wave of multi-entity billing exceptions and usage-based proration disputes arrives — the same non-standard cases that used to require Deal Desk and Billing Ops to negotiate a one-off together. The agent was never given a defined interaction mode with Deal Desk, so it does one of two things: it either flags the case into a generic "needs human review" queue that nobody owns end-to-end, where it sits exactly the way an unbatched decision sits in a steering-committee queue ([Little's Law, again, one layer down](/stakeholder-decision-bottlenecks)) — or, worse, it applies its standard-case logic to a non-standard case because nothing told it where its authority actually ends. Either way, the failure is invisible until a customer complains, because there was never a human equivalent of "I'm not sure this is my call" built into the handoff.

### The Reverse Conway fix

The fix mirrors the human-team version exactly, applied to the agent's scope instead of a person's job description: make quote-to-cash exception handling a defined **stream-aligned** scope with the agent operating as an **X-as-a-Service** platform capability for genuinely standard cases, and an explicit, named **Collaboration** interaction mode — a specific human Deal Desk owner, not a queue — for anything the agent's variety mapping says it shouldn't resolve alone. That owner is doing the same job Beer's VSM ([Part 6](/four-laws-complex-system-design-full#p6)) assigns to a System 2/3 coordination function: resolving exactly the conflicts and edge cases the operating units — human or agent — aren't built to resolve on their own.

## Put this into practice

Before you scope your next AI agent into a RevOps or delivery workflow, ask the same three questions you'd ask before a reorg: where does the real variety concentrate, what's the agent's defined escalation path — to a named owner, not a queue — and who's accountable when it's wrong. An agent is cheaper to rescope than a team is to reorganize, which makes this the rare case where getting the boundary right is actually easier than it's ever been — if you draw it on purpose instead of copying whatever boundary was already there.

This is the same team-and-systems-boundary work I do for subscription and SaaS clients, now showing up a layer down in how AI agents get scoped into quote-to-cash workflows. If you're evaluating where to put agents into a RevOps or delivery process — or you've already got one quietly misbehaving at an edge case — [get in touch](/contact). For the underlying theory, start with [2.4 The Reverse Conway Maneuver](/four-laws-complex-system-design-full#s24) or [2.5 Team Topologies](/four-laws-complex-system-design-full#s25) in the Full Reference, or see the human-team version of this same argument in [Conway's Law and Your RevOps Team Structure](/conways-law-revops-team-structure). The same unowned-accountability problem shows up above the agent layer too — see [AI, System 4, and Beer's VSM](/vsm-ai-system-4). For why these four laws and an entirely separate field of complexity science independently landed on the same mechanisms, see [Two Fields That Never Talked to Each Other, Converging on the Same Physics](/writing/capstone-four-laws).
