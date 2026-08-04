---
title: Glossary
description: Definitions of every term on this site — Ashby's, Conway's, Brooks's Laws, Reverse Conway, Team Topologies, Beer's VSM, Little's Law, Theory of Constraints.
group: reference
order: 20
---

Short definitions of every term used across this site, grouped the same way the Full Reference document is — structure and team design first, then flow and constraints. Click through to the full section for the complete explanation.

## Structure & Team Design

**Ashby's Law of Requisite Variety**
A regulator can only absorb as much variety (complexity/uncertainty) as it has capacity to match; if the variety of what it's regulating exceeds that capacity, control breaks down.
[Full Reference 2.1 →](/four-laws-complex-system-design-full#s21)

**Conway's Law**
Organizations design systems that mirror their own communication structure — the architecture of a system reflects the architecture of the team that built it.
[Full Reference 2.2 →](/four-laws-complex-system-design-full#s22)

**Brooks's Law**
Adding people to a late software project makes it later, because new arrivals raise coordination and communication overhead faster than they add output.
[Full Reference 2.3 →](/four-laws-complex-system-design-full#s23)

**The Reverse Conway Maneuver**
Deliberately restructuring teams to match the system architecture you want, so Conway's Law works in your favor instead of against it.
[Full Reference 2.4 →](/four-laws-complex-system-design-full#s24)

**Team Topologies**
Skelton and Pais' framework of four team types (stream-aligned, platform, enabling, complicated-subsystem) and three interaction modes (collaboration, X-as-a-Service, facilitating) for operationalizing the Reverse Conway Maneuver.
[Full Reference 2.5 →](/four-laws-complex-system-design-full#s25)

**Stream-Aligned Team**
A team aligned to one end-to-end flow of value — a product, a feature set, or a client engagement — able to deliver against it with minimal hand-offs to other teams.
[Full Reference 2.5 →](/four-laws-complex-system-design-full#s25)

**Team API**
Everything another team can consume from a given team without needing direct access to it: its documentation, service interfaces, release practices, and communication channels.
[Full Reference 2.4 →](/four-laws-complex-system-design-full#s24)

**Cognitive Load**
The total domain knowledge, operational responsibility, and coordination a team must hold to do its job — Ashby's Law of Requisite Variety applied at team scale.
[Full Reference 2.5 →](/four-laws-complex-system-design-full#s25)

**Beer's Viable System Model (VSM)**
Stafford Beer's cybernetic model of the functions any autonomous, self-regulating organization needs in order to remain viable amid a changing environment.
[Full Reference Part 6 →](/four-laws-complex-system-design-full#p6)

## Flow & Constraints

**Little's Law**
In any stable queueing system, the average work in progress equals the arrival rate multiplied by the average time each item spends in the system (L = λW).
[Full Reference 8.1 →](/four-laws-complex-system-design-full#s81)

**Theory of Constraints**
Every system has exactly one binding constraint on its throughput at any given time; improving anywhere else doesn't raise system output, only the Five Focusing Steps applied to the constraint itself does.
[Full Reference 8.2 →](/four-laws-complex-system-design-full#s82)

**WIP (Work in Progress)**
The amount of work actively in flight in a system at a given moment — not assigned, but genuinely being worked on or waiting between steps.
[Full Reference 8.5 →](/four-laws-complex-system-design-full#s85)

**The Five Focusing Steps**
The Theory of Constraints' operating cycle: identify the constraint, exploit it, subordinate everything else to it, elevate it, then repeat on the next constraint.
[Full Reference 8.2 →](/four-laws-complex-system-design-full#s82)

**Kingman's Formula (VUT Equation)**
Estimates average wait time from variability (V), utilization (U), and processing time (T); wait time rises non-linearly as utilization approaches 100%.
[Flow Formula Calculator →](/flow-formula-calculator)

**Weinberg's Context-Switching Numbers**
A practitioner heuristic estimating how much effective capacity a person loses as the number of concurrent projects they hold increases.
[Flow Formula Calculator →](/flow-formula-calculator)

---

Have a question rather than a term to look up? Check the [FAQ](/faq), or start from the [Full Reference](/four-laws-complex-system-design-full) for the complete document.
