---
title: Frequently Asked Questions
description: Direct answers on Conway's Law vs. Team Topologies, Brooks's Law under Agile, Little's Law for knowledge work, and WIP limits vs. the Theory of Constraints.
group: reference
order: 30
---

Straight answers to the questions that come up most when people first meet Ashby's Law, Conway's Law, Brooks's Law, Team Topologies, Beer's VSM, Little's Law, and the Theory of Constraints — and where each idea starts to bump into the others.

## Structure & Team Design

### What's the difference between Conway's Law and Team Topologies?

Conway's Law is the observation: organizations design systems that mirror their own communication structure. Team Topologies (Skelton & Pais, 2019) is the practitioner's toolkit for acting on that observation — it defines four team types (stream-aligned, platform, enabling, complicated-subsystem) and three interaction modes (collaboration, X-as-a-Service, facilitating) you can use to deliberately shape communication structure via the Reverse Conway Maneuver, instead of leaving it to accident. See [Full Reference 2.5](/four-laws-complex-system-design-full#s25).

### How do you actually run the Reverse Conway Maneuver?

Map the domain's real variety first (Ashby's Law) — don't skip this step. Then use the interface density test to find low-interface seams, draw team boundaries there, and design explicit interaction modes for the couplings you can't avoid. The order matters: variety mapping before boundary drawing, or you're just substituting one arbitrary boundary for another. See [Full Reference 2.4](/four-laws-complex-system-design-full#s24) and [4.2](/four-laws-complex-system-design-full#s42).

### Does Brooks's Law still apply on Agile teams?

Yes, with the same caveat Brooks himself later added: it's a strong tendency for late, highly interdependent work, not an absolute law. Small, cross-functional Agile teams don't repeal the communication-overhead math — they just keep team size small enough that the overhead stays manageable. Adding people to an already-late sprint still adds ramp-up cost and coordination overhead before it adds output. See [Full Reference 2.3](/four-laws-complex-system-design-full#s23).

### What is Ashby's Law of Requisite Variety, in plain English?

Only variety can absorb variety — a system can only control outcomes as complex as its own range of responses. If what you're managing throws more variation at you than you have ways to respond, you lose control of it. The two fixes: increase your own capacity to respond, or reduce the variety arriving at you in the first place (standardize, filter, template). See [Full Reference 2.1](/four-laws-complex-system-design-full#s21).

### What is Beer's Viable System Model (VSM) used for?

Stafford Beer's VSM is a diagnostic for whether an organization has all the functions it needs to stay viable — self-regulating — as its environment changes, not just deliver its current output. It's most useful for finding structural gaps a straightforward Conway's Law analysis won't surface: missing feedback loops, missing coordination functions, or a whole level of the organization trying to do a job it was never built to do. See [Full Reference Part 6](/four-laws-complex-system-design-full#p6).

### How is cognitive load different from Ashby's Law?

They're the same principle at different scales. Ashby's Law is the general claim: a regulator can only absorb as much variety as it has capacity for. Cognitive load is that same claim scoped down to one team — the domain knowledge, responsibilities, and coordination a team has to hold in its head. If cognitive load exceeds the team's capacity, that's Ashby's Law breaking down at team level, and the fixes are the same two levers: add capacity, or reduce what's arriving. See [Full Reference 2.5](/four-laws-complex-system-design-full#s25).

## Flow & Constraints

### What's the difference between a WIP limit and the Theory of Constraints?

A WIP limit is a practice — a cap on how many items can be in flight at a workflow stage, borrowed from Kanban. The Theory of Constraints is the analytical framework for deciding where that cap matters most: every system has exactly one binding constraint, and a WIP limit placed in front of it is the highest-leverage place to put one. Used together, the constraint tells you where; the WIP limit is the mechanism you apply there. See [Full Reference 8.3](/four-laws-complex-system-design-full#s83), or the full breakdown with a worked example in [WIP Limits vs. the Theory of Constraints](/wip-limits-vs-theory-of-constraints).

### Is Little's Law still valid for knowledge work and software teams?

As math, yes — it's a proven identity (L = λW) for any stable queueing system, not an assumption. The practical criticism is about the inputs, not the formula: knowledge work rarely holds WIP, arrival rate, and throughput steady long enough for a single averaged number to mean much. Use it as a diagnostic direction-of-travel tool — cut WIP or raise throughput to cut cycle time — not a precise prediction. See [Full Reference 8.1](/four-laws-complex-system-design-full#s81).

### What's a good WIP limit?

There's no universal number — it depends on your throughput and target cycle time (Little's Law: cycle time equals WIP divided by throughput). The practical approach is to start with your current WIP, cut it noticeably, and watch what breaks: if throughput doesn't drop, you had slack you didn't know about; if a queue backs up visibly, you've found your real constraint faster than any amount of theorizing would. Try the [Flow & Constraint Diagnostic](/part8-flow-diagnostic) with your own numbers.

### What is Kingman's formula and why does utilization matter so much?

Kingman's formula (the VUT equation) estimates average wait time from variability, utilization, and processing time — and the relationship to utilization isn't linear. As utilization approaches 100%, wait times climb sharply: a team at 90% utilization isn't a bit busier than one at 65%, it's in a qualitatively different, much less predictable regime. See the curve for yourself in the [Flow Formula Calculator](/flow-formula-calculator).

### If a bottleneck is slowing everything down, doesn't adding more people fix it?

Usually not — and this is where Brooks's Law and the Theory of Constraints reinforce each other. Adding people raises arrivals system-wide without necessarily raising the constrained resource's throughput, so cycle time can actually get worse. The Theory of Constraints says the same thing from a different angle: effort spent anywhere but the actual constraint is wasted, no matter how busy it looks. See [Full Reference 8.2](/four-laws-complex-system-design-full#s82)–[8.4](/four-laws-complex-system-design-full#s84).

### What are the Five Focusing Steps in the Theory of Constraints?

Identify the constraint, exploit it fully (get the most from it before spending money), subordinate everything else to that decision, elevate it (invest to raise its capacity), and repeat — because once you fix one constraint, another one appears somewhere else. See [Full Reference 8.2](/four-laws-complex-system-design-full#s82), or work through your own numbers in the [Flow & Constraint Diagnostic](/part8-flow-diagnostic).

---

Looking for a term rather than a question? Check the [Glossary](/glossary) for short definitions of everything on this site, or start from the [Full Reference](/four-laws-complex-system-design-full) for the complete document.
