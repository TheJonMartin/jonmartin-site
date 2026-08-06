---
title: WIP Limits vs. the Theory of Constraints
description: A WIP limit is a Kanban practice; the Theory of Constraints tells you where to put it. Why conflating them leaves throughput exactly where it started.
seoTitle: "WIP Limits vs. Theory of Constraints | Four Laws"
group: explore
order: 50
---

<span class="label">Disambiguation · Flow & constraints</span>

They get conflated constantly. A WIP limit is a practice you apply; the Theory of Constraints is how you decide where to apply it. Confusing the two is the most common reason a Kanban board gets "disciplined" without throughput actually moving.

## The confusion you keep running into

A team adopts Kanban, puts WIP limits on every column — 3 here, 5 there — and waits for things to speed up. Sometimes they do. Often they don't, and the team concludes WIP limits "don't really work for us," when the actual problem is that the limits were placed uniformly across the board instead of deliberately in front of the one place work actually backs up. This mix-up is common enough that [the FAQ](/faq) gets asked some version of it constantly: is a WIP limit the same thing as the Theory of Constraints? They're related, but they're not the same move, and knowing the difference is the entire reason one team's WIP limits work and another's don't.

## Two ideas with three separate origins

Part of the confusion is that WIP limits, Little's Law, and the Theory of Constraints arrived from three unconnected places and only later turned out to be mathematically compatible:

- **WIP limits** come from Taiichi Ohno's kanban system at Toyota in the 1940s–50s — a physical card-based pull system where a downstream station could only pull work from upstream when it had spare capacity. This capped WIP structurally, decades before anyone named the math behind why it worked. David J. Anderson's *Kanban: Successful Evolutionary Change for Your Technology Business* (2010) adapted the practice for knowledge work — explicit WIP limits per workflow stage, visualized on a board — which is what most teams mean by "Kanban" today.
- **Little's Law** ([Full Reference 8.1](/four-laws-complex-system-design-full#s81)) is John Little's 1961 proof that in any stable queueing system, WIP equals arrival rate times time in system (L = λW) — a mathematical identity, not a practice.
- **The Theory of Constraints** ([8.2](/four-laws-complex-system-design-full#s82)) is Eliyahu Goldratt's 1984 claim that every system has exactly one binding constraint on its throughput at any moment, and that the Five Focusing Steps are how you work on it deliberately instead of by instinct.

None of these three built on each other. They were discovered independently and only later recognized as describing the same underlying behavior from different angles — which is exactly why it's easy to treat "cap WIP" and "manage the constraint" as interchangeable when they're actually a practice and the theory that tells you where the practice belongs.

## Where they actually connect

Little's Law treats the system as one black box: it tells you *that* cycle time rises if WIP outpaces throughput, not *where* the limit lives. The Theory of Constraints supplies the location — and the two combine into a single move ([Full Reference 8.3.1](/four-laws-complex-system-design-full#s831)):

> **The synthesis.** A WIP limit set in front of the actual constraint is Little's Law and the Theory of Constraints applied simultaneously. A WIP limit set anywhere else just moves where the queue is invisible — it does nothing for system throughput.

That's the whole distinction. A WIP limit is a mechanism. The Theory of Constraints is the analysis that tells you the one place in the system where that mechanism actually changes throughput, instead of just relocating the backlog somewhere less visible.

## A worked example — capping WIP in the wrong place

### The setup

A subscription-billing migration team is getting buried in change orders and edge-case billing questions from the client. Every ticket eventually routes through one architect — the only person who understands both the CPQ/billing system and the client's CRM data model. Sales, PM, and junior consultants are all "busy," but none of that occupancy determines how fast tickets actually close.

### Where it breaks

The team reads about Kanban, likes the discipline, and puts a uniform WIP limit — three tickets per person — across the whole board, including the architect's queue. Throughput doesn't improve. The architect's three-ticket cap is still full at all times, because every ticket eventually needs their judgment regardless of who else picks it up first; meanwhile juniors and PM sit under their own caps with spare capacity that was never the bottleneck to begin with. The team has technically "adopted WIP limits" and gotten nothing for it, because the cap was applied evenly across a system that isn't even — it has exactly one binding constraint, and the limit wasn't placed there on purpose.

### The fix

Run the Five Focusing Steps first, *then* decide where the WIP limit goes. **Identify:** the architect is the constraint — cycle time is open tickets (WIP) divided by tickets the architect closes per week (throughput), and no other role's throughput number matters as much. **Exploit:** shield the architect's calendar; route only what genuinely needs their judgment. **Subordinate:** juniors pre-qualify tickets before they reach the architect, which is itself a WIP limit — but placed specifically in front of the constraint, capping how much unqualified work can reach that one calendar at once. **Elevate:** turn the architect's recurring decisions into a playbook, or train a backup, raising the constraint's actual throughput. **Repeat:** once that constraint moves, the next one — maybe the client's own approval process — is now the one worth capping in front of.

## Put this into practice

Before you add or adjust a WIP limit anywhere, ask where your system's actual constraint is first — not where the board looks busiest. A WIP limit in front of the constraint is the highest-leverage change available to you; the same limit anywhere else is cosmetic. Run your own numbers in the [Flow & Constraint Diagnostic](/part8-flow-diagnostic) to find where yours belongs.

This is the same diagnosis I run for clients whose delivery teams have "done Kanban" without seeing the throughput gains they expected — the board changed, the constraint didn't move. If a WIP limit isn't producing the result it should, [get in touch](/contact). For the underlying theory, see [8.3.1](/four-laws-complex-system-design-full#s831) and [8.3.2](/four-laws-complex-system-design-full#s832) in the Full Reference, or the worked delivery example in the [Flow Deck](/four-laws-flow-and-constraints).
