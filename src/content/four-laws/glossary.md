---
title: Glossary
seoTitle: "Term Glossary | Four Laws of Complex System Design"
description: Definitions of every term on this site — Ashby's, Conway's, Brooks's Laws, Reverse Conway, Team Topologies, Beer's VSM, Little's Law, Theory of Constraints.
group: reference
---

These are the terms I reach for when a team, a process or a system keeps breaking and I need to name why. If you're the one deciding how work gets split up, who has to talk to whom, or why everything is stuck in one queue, start here — each definition is short enough to read between meetings.

## Structure & Team Design

**Ashby's Law of Requisite Variety**
Whatever is doing the controlling needs at least as many ways to respond as the situation can throw at it. When incoming variation outnumbers your responses, the extra leaks through unmanaged. You get two fixes: build more response options, or cut down the variation arriving in the first place. W. Ross Ashby stated it in 1956.
[Full Reference 2.1 →](/four-laws-complex-system-design-full#s21)

**Conway's Law**
Whatever a group builds ends up shaped like the way that group talks to itself. Where conversation is easy, the parts fit tightly. Where it's hard, you get a seam. Melvin Conway wrote it down in 1968 about software, but it holds just as well for processes, CRM setups and service delivery models.
[Full Reference 2.2 →](/four-laws-complex-system-design-full#s22)

**Brooks's Law**
Putting more people on a project that's already behind usually pushes the finish date out further. Newcomers need training from the people doing the work, and every added person multiplies the conversations needed to stay aligned. Fred Brooks named it in 1975, then later softened it to a strong tendency — not an iron rule.
[Full Reference 2.3 →](/four-laws-complex-system-design-full#s23)

**The Reverse Conway Maneuver**
Using Conway's Law on purpose. You decide what shape you want the finished system to have, then set up the teams — and how they work with each other — so they naturally build that shape. Map where the work really differs before you draw anything, or the new lines end up as random as the old ones, only tidier.
[Full Reference 2.4 →](/four-laws-complex-system-design-full#s24)

**Team Topologies**
A shared vocabulary from Matthew Skelton and Manuel Pais (2019) for designing teams deliberately. It names four kinds of team — stream-aligned, platform, enabling and complicated-subsystem — and three ways two teams can work together: collaboration, X-as-a-Service and facilitating. You pick a type for every team and a mode for every relationship between them.
[Full Reference 2.5 →](/four-laws-complex-system-design-full#s25)

**Stream-Aligned Team**
A team that owns one flow of work from start to finish — a product, a client account, a customer journey — and can ship it without waiting in line behind other teams. It's the default team type in Team Topologies. Platform, enabling and complicated-subsystem teams are there to take weight off this one.
[Full Reference 2.5 →](/four-laws-complex-system-design-full#s25)

**Team API**
Everything other teams can use from a team without going through its people directly: written docs, service interfaces, how and when it releases, and where to ask questions. When that's spelled out, the teams depending on it can build against something stable instead of against whoever happens to be free this week.
[Full Reference 2.4 →](/four-laws-complex-system-design-full#s24)

**Cognitive Load**
How much a team has to carry around mentally to do the job — the domains it must understand, the systems it runs, the other teams it coordinates with. It's Ashby's Law sized down to one team. When the load outgrows what the team can handle, work slips, and the lasting fix is usually less load, not more people.
[Full Reference 2.5 →](/four-laws-complex-system-design-full#s25)

**Beer's Viable System Model (VSM)**
Stafford Beer's map of the five functions an organization needs to keep itself going while its environment shifts: operations, coordination, operational management, intelligence and policy. It works best as a gap check — which function is missing, and at which level? Think feedback loops that don't exist, or bad news that reaches leadership too late.
[Full Reference Part 6 →](/four-laws-complex-system-design-full#p6)

## Flow & Constraints

**Little's Law**
On average, the work in flight equals how fast new work arrives times how long each item takes to get through (L = λW). Turn it around and cycle time is simply WIP over throughput. So you really have just two ways to make things move faster: carry less at once, or finish more per week.
[Full Reference 8.1 →](/four-laws-complex-system-design-full#s81)

**Theory of Constraints**
At any moment, one step in your system sets the pace for all the rest. Speeding up any other step doesn't raise what the whole system delivers. Find that one step and you know where effort actually pays off. Eliyahu Goldratt laid it out in The Goal (1984), along with the Five Focusing Steps.
[Full Reference 8.2 →](/four-laws-complex-system-design-full#s82)

**WIP (Work in Progress)**
The work that's actually moving right now — started, not finished, either being worked or parked between steps. A ticket sitting on someone's name that nobody has touched doesn't count. WIP is one of the three numbers in Little's Law, and capping it is one of only two levers that shortens cycle time.
[Full Reference 8.5 →](/four-laws-complex-system-design-full#s85)

**The Five Focusing Steps**
Goldratt's loop for working a bottleneck. Identify the one step holding everything up. Exploit it — squeeze everything you can out of it before you spend anything. Subordinate the rest of the work to its pace. Elevate it by investing in more capacity. Then repeat, because once it's fixed, the bottleneck shows up somewhere else.
[Full Reference 8.2 →](/four-laws-complex-system-design-full#s82)

**Kingman's Formula (VUT Equation)**
A way to estimate how long work sits waiting, from three inputs: how unpredictable the work is (V), how busy the resource is (U), and how long each item takes (T). The catch is the curve. Waits stay manageable at moderate utilization, then shoot up as you push toward 100%.
[Flow Formula Calculator →](/flow-formula-calculator)

**Weinberg's Context-Switching Numbers**
Gerald Weinberg's estimates of how much working time a person loses as they juggle more projects at once. By his figures, holding two projects costs about 20% to switching, and holding five costs roughly 75%. They come from his experience rather than a controlled study, so read them as direction, not precision.
[Flow Formula Calculator →](/flow-formula-calculator)

---

Have a question rather than a term to look up? Check the [FAQ](/faq), or start from the [Full Reference](/four-laws-complex-system-design-full) for the complete document.
