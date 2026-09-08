---
title: 'Two Fields That Never Talked to Each Other, Converging on the Same Physics'
description: 'Two lineages that never cited each other — Ashby, Conway, Brooks, and Beer''s systems theory, and Scott Page''s complexity science — converge on the same mechanisms.'
seoTitle: 'Two Fields, Converging on the Same Physics — Jon Martin'
pubDate: 2026-09-08
draft: true
tags: ['Systems', 'RevOps', 'Complexity', 'Frameworks']
---

![Two Fields That Never Talked to Each Other, Converging on the Same Physics](/images/writing/09-capstone-four-laws.svg)

I built a framework out of cybernetics and software engineering theory — Ashby, Conway, Brooks, Beer — to explain why RevOps delivery breaks down at scale. None of those four ever cited Scott Page. Page's complexity science, decades later, never cited them either. Two lineages with no contact.

Then I spent eight posts working through Page's *Understanding Complexity*, and kept running into my own framework wearing different words. Not a loose analogy — the same mechanism, named twice, by people who never read each other. That's either a coincidence worth ignoring, or it's evidence that both fields found something real, independently, because it's actually there. I've come to believe it's the second one, and this piece is the pairing, law by law.

## Ashby's Law and why documentation dies

Post 1 of this series drew the line between complicated and complex: a complicated system has diverse, connected, interdependent parts that don't adapt — fix it once, it stays fixed. A complex one adapts, which is why the onboarding SOP that was accurate on the day it published goes quietly wrong within two quarters, without anyone touching it.

W. Ross Ashby named the same failure in 1956, in a completely different vocabulary, working on the mathematics of regulation rather than organizations at all. His Law of Requisite Variety: only variety can absorb variety. A regulator — whatever's doing the controlling — can only manage a system as complex as itself. Variety, in Ashby's sense, is the number of distinguishable states something can be in. A two-state thermostat has low variety. One that responds to humidity, occupancy, time of day, and outdoor temperature has high variety. His law says the regulator's variety has to be at least as large as the variety of whatever it's regulating, or the excess flows through uncontrolled.

An SOP is a regulator. It was calibrated against the variety the org had when it was written — a certain rep count, a certain set of edge cases, a certain competitive picture. The org kept adapting after the doc froze. That's not the doc being wrong. That's Ashby's Law asserting itself: a fixed-variety regulator failing to match a target that's still moving.

Ashby names two responses, and the interesting part is that most organizations reach for only one of them. You can increase the regulator's variety — more people, more tooling, more process sophistication, the instinct almost everyone has by default. Or you can reduce the environmental variety instead — standardize, segment, constrain what's actually coming in, so there's simply less for the regulator to match. Ashby calls this second lever consistently underused. Page never uses Ashby's name, but every post in this series that dealt with the diversity dial was really an argument for lever two: prune the tool sprawl, consolidate the segments that aren't substantively different, cap the bespoke handling — reduce what the system has to absorb, instead of only ever adding more capacity to absorb it with.

## The Reverse Conway Maneuver and reshaping the landscape

Post 2 introduced three landscapes — Fuji, rugged, dancing — and made a specific claim: rugged landscapes are worth solving hard because the solution holds, dancing ones aren't, because the ground keeps moving. What that post didn't answer is whether you can actually change which landscape you're standing on. Not just recognize it — reshape it.

Melvin Conway answered a version of this in 1968, watching software teams rather than markets: organizations that design systems are constrained to produce designs that mirror the communication structure of the organizations that built them. Not by intent — by information flow. Decisions made within a team are cheap; decisions that need cross-team coordination are slow and expensive, so over time people minimize the expensive kind by drawing sharp interfaces between groups. Those interfaces become the seams in whatever gets built. It's descriptive, not a design choice — the mirroring happens whether anyone plans it or not.

The Reverse Conway Maneuver, coined later by Jonny LeRoy and Matt Simons and popularized in Skelton and Pais's *Team Topologies* (2019), turns that inevitability into a lever: if the architecture mirrors the org chart regardless, deliberately design the org chart to produce the architecture you actually want. Draw team boundaries at the low-interface seams — the places where two domains genuinely don't need much ongoing cross-talk — and Conway's mirroring effect does the flattening work for you.

That's a rugged or dancing landscape being reshaped, not just described. A pricing and packaging function that's tangled with sales comp, contracting, and provisioning — dancing, because every function is reacting to every other one in real time — gets calmer terrain not by "trying harder to solve pricing," but by redrawing the boundary so pricing decisions don't require four teams to agree in real time to ship one change. The landscape didn't get simpler because the problem changed. It got simpler because the communication structure creating the interdependency changed.

There's a prerequisite the framework is explicit about, and it matters here: you can't draw a good Reverse Conway boundary without an Ashby analysis first — knowing where the real variety domains are, what each team actually needs to carry, where the natural low-interface seams sit. Skip that, and you've just replaced an accidental boundary with a deliberate arbitrary one. Map the variety, then draw the line. Ashby before Conway, every time.

## The same lever, discovered twice

Post 3 named the interesting in-between — four dials, complexity only showing up in the moderate middle, never at the extremes. The diversity dial specifically: too little, you leave money on the table; too much, and nothing can scale or roll up to a clean report.

Ashby's second lever — reduce incoming variety — is that same diagnosis, arrived at from control theory instead of complexity economics, six decades earlier. A complexity scientist studying dial settings and a cybernetician studying regulators landed on the identical fix for the identical failure mode: an overloaded, over-diverse system doesn't necessarily need a bigger regulator. Sometimes it needs less variety coming in to begin with. Neither one is citing the other. Both found the same underused lever because it's actually there, in the mathematics, regardless of which field goes looking for it.

## Little's Law, Theory of Constraints, and the moving peak

Post 5 was about why some things should never fully ship. On a dancing landscape, the peak keeps moving, so cooling the exploration temperature all the way to zero — settling in, exploiting a solution — means exploiting a peak that's already drifted somewhere else.

Flow theory gives the arithmetic underneath that same intuition, from a completely different origin. John Little proved in 1961 that in any stable system, cycle time equals work in progress divided by throughput — L = λW, or rearranged, W = L/λ. There are exactly two levers that change how fast anything moves through a system: reduce what's in flight, or raise how fast the system actually completes it. Nothing else touches cycle time — not visibility, not meetings, not adding people who don't change either number.

Eliyahu Goldratt's Theory of Constraints, developed independently starting in 1984, adds the piece Little's Law doesn't supply: at any moment, exactly one part of the system is the actual limiting factor, and effort spent anywhere else is wasted motion, however busy it looks. The two combine into a specific, practical move — a WIP limit placed in front of the real constraint is both laws applied at once; placed anywhere else, it just moves where the queue hides.

Here's the part that maps straight onto the dancing-landscape problem: Goldratt's own framework warns that the constraint moves. In work that's genuinely a network rather than a stable chain — a client engagement touching billing, CRM, identity, and reporting all at once — the binding constraint can shift week to week, and treating last quarter's diagnosis as permanent is precisely the inertia his fifth step warns against. That's Little's Law and the Theory of Constraints describing a dancing landscape in the vocabulary of queues instead of peaks. "Identify the constraint" isn't a one-time fix any more than "explore/exploit" is. It's a standing habit, rechecked on a cadence, because the thing you're diagnosing hasn't stopped moving just because you found an answer once.

## Beer's Viable System Model and the shadow spreadsheet

Post 6 described emergence with a slime mold: cells under stress self-organizing into a coordinated structure nobody designed. The RevOps translation was the shadow spreadsheet — a workaround that spreads informally when the official process hits a gap, until it's a second system half the team depends on that nobody remembers deciding to build.

Stafford Beer's Viable System Model, developed through the 1970s in direct dialogue with Ashby, gives that phenomenon a name and a structural diagnosis instead of just a story. Beer argued that any organization surviving in a complex environment necessarily contains five recursive functions: operations (System 1, the actual work), coordination (System 2, the anti-oscillation mechanism between operating units), operational management (System 3, running the current internal state), intelligence (System 4, scanning the environment and adapting), and policy (System 5, balancing the internal view against the external one). When System 2 — coordination — is missing or weak, System 1 units don't wait for permission to fix the resulting friction. They self-organize around it, informally, because the structural need for coordination doesn't disappear just because nobody built the mechanism for it.

That's not a rogue-employee problem. That's a System 2 gap, showing up exactly where Beer's model predicts it will. The shadow spreadsheet isn't evidence someone went around the process. It's evidence the coordination function the process needed was never actually built, so the operating unit built its own, the same way Beer's framework says it structurally must. The fix isn't reprimanding the workaround. It's building the System 2 function that was missing, because the variety it was supposed to absorb didn't go anywhere.

## Brooks's Law and the cascade that wasn't random

Post 7 closed on self-organized criticality — a highly connected system building toward a state where an ordinary event, not an attack, triggers a disproportionate cascade. A sandpile that mostly absorbs new grains harmlessly, until one more, indistinguishable from the last, brings half the pile down.

Frederick Brooks described a version of this in 1975, watching a single late software project rather than a physicist's sandpile. His law — adding people to a late project makes it later — has a mechanism most people forget once they've heard the punchline. Communication pairs in a team of *n* people scale as n(n−1)/2. Ten people, forty-five pairs. Past a certain size, coordination overhead grows faster than the work it's coordinating, silently, with no single moment where anyone can point and say "now it's too big." The project isn't late because of one bad decision. It's late because the overhead had already crossed a threshold nobody was tracking, and the next addition — completely ordinary on its own — was just the one that finally showed it.

That's the sandpile, described in headcount instead of sand grains. Beer's model even names the missing piece directly: System 2's whole job is containing exactly this overhead, routing coordination through defined channels instead of leaving every pair to negotiate directly. Without it, Brooks's condition runs at full severity — every unit talking to every other unit, no structure limiting how far one disruption travels. The cascading pipeline blowup from a few posts back — one deal falling through, dragging a reforecast, a territory reshuffle, and three stalled renewals behind it — isn't bad luck any more than a late software project is. It's what an under-coordinated, over-connected system produces once it's been allowed to reach that state, whether the field studying it calls the mechanism a sandpile or a communication graph.

## What holding both gives you

None of this makes either field redundant. Page's complexity science tells you what shape the terrain is — rugged, dancing, or building toward criticality — and why. Ashby, Conway, Brooks, and Beer tell you what to actually build in response — which lever to pull, where to draw the boundary, which structural function is missing. One diagnoses. The other prescribes. You need both, and until I put them side by side, I'd been running the second without fully understanding why the first kept confirming it was right.

Two fields, no contact with each other, describing the same physics from opposite directions. That's not a metaphor holding up under pressure. That's what it looks like when something is actually true.

---

*This closes the series working through Scott Page's* Understanding Complexity *(The Great Courses, 2009) and the Four Laws of Complex System Design (Ashby, Conway, Brooks, Beer) applied to RevOps at scaling companies.*
