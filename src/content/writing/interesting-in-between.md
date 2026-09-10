---
title: 'The Interesting In-Between'
description: 'Good complexity doesn''t come from maximizing integration and data, or minimizing for simplicity — it lives in the middle Page calls the interesting in-between.'
pubDate: 2026-09-08
draft: false
tags: ['Systems', 'RevOps', 'Complexity']
---

![The Interesting In-Between](/images/writing/03-interesting-in-between.svg)

Here's a question that sounds simple and isn't: why do some RevOps systems produce genuine, useful complexity — the kind that adapts intelligently and gets better over time — while others either calcify into dead process or spiral into a mess nobody can manage?

Page's answer surprised me, because it's the opposite of what most operators assume. You don't get good complexity by maximizing everything — more integration, more data, more cross-functional visibility, all dialed to ten. You don't get it by minimizing everything either, in the name of simplicity. You get it in the middle. He calls it the interesting in-between, and once you see the pattern, you start noticing it everywhere a system has gone wrong.

## Four classes of behavior

Before the dials, it's worth knowing what you're actually diagnosing. Physicist Stephen Wolfram sorted system behavior into four classes, and RevOps systems land in all four:

→ **Stable equilibrium** — the system sits at one state and stays there. A process nobody's touched in three years.
→ **Periodic orbit** — a regular, repeating cycle. Your monthly close. Predictable, if a little numbing.
→ **Chaotic** — wildly sensitive to small changes, unpredictable, exhausting to manage. The pipeline review that produces a different number every time someone tweaks a filter.
→ **Complex** — regular structure, but rich enough that it can't be fully described in a sentence. This is where a healthy GTM motion actually lives, and it's the hardest of the four to build on purpose.

Most troubleshooting conversations I've sat in are really an argument about which of these four states a system is actually in, without anyone naming it that way.

## The four dials

Page frames complexity as four dials, each running 0 to 10: interdependency, connectedness, diversity, and adaptation. Turn any one of them too low, and the system goes dead and predictable. Turn it too high, and it goes chaotic. Complexity — the useful kind — only shows up in the middle.

**Interdependency** — how much your actions depend on what others are doing.

At zero, a rep does their job with no regard for what marketing or CS is doing. No coordination, but also no chaos — just missed opportunities at every handoff. Turn it up to a moderate level — SDR-to-AE handoff quality actually shapes AE behavior, CS renewal signals actually shape sales's next move — and you get the good kind of complexity: functions genuinely informing each other. Turn it up too far, and you get thrash: pricing reacting to every competitor twitch, a comp plan rewritten every quarter chasing last quarter's workaround, nothing ever standing still long enough to tell if it's working.

**Connectedness** — how many other systems or people a given piece touches.

Low connectedness is manual handoffs and siloed tools — slow, but predictable and easy to debug when something breaks. Moderate connectedness — a handful of clear, deliberate integration points — gives you real visibility without unmanageable blast radius. High connectedness is when one small change fires a cascade through a dozen downstream workflows nobody fully mapped. That's efficient right up until it isn't, and it's the exact setup that produces the kind of outsized, hard-to-predict blowup we'll dig into a few posts from now.

**Diversity** — how many genuinely different types you're dealing with: personas, segments, deal shapes.

One segment, one motion is simple but leaves money on the table. A handful of clearly differentiated personas gives you real targeting power without configuration chaos. Push it further — bespoke handling for every account, no two deals structured the same way — and nothing can scale, automation breaks, and your reporting can't roll up to anything meaningful because there's no clean "type" left to group by.

**Adaptation** — how intelligently the people in the system respond over time.

Zero adaptation is a model or playbook nobody's revisited since it was built — it quietly goes stale, still confidently producing numbers that stopped meaning anything. Moderate adaptation is a system that gets genuinely better: a lead-scoring model retrained on real win/loss data, a playbook updated from what's actually closing. But turn this dial too far and you get Goodhart's Law — when a measure becomes a target, it stops being a good measure. Reps who've fully reverse-engineered a comp plan don't optimize for revenue anymore; they optimize for the formula. An "activities logged" metric produces logged activities, not more selling. The number goes up. The thing it was supposed to represent quietly stops moving.

## Why this zone gets ignored

Page makes a point about game theory that reframes the whole problem: most formal models study either two players or infinite players, because those are the cases with clean math. The messy, moderately-connected middle — a team of forty, a market with a dozen real competitors, an org with real but limited cross-functional dependency — gets skipped by the theory almost entirely.

That's not a coincidence. It's also almost exactly the size and shape of a scaling RevOps org. Not a two-person founder-led sales motion, not a thousand-person machine with statistical regularities. The interesting in-between. Most of what you're managing has never had a clean model built for it, because the clean models only get built at the extremes.

## What to actually do with this

The fix is never "push every dial to max" — more integration, more automation, more visibility isn't automatically better, and past a point it's actively worse. It's also never "simplify everything" — you'll flatten the system into something dead and brittle.

It's diagnosis, one dial at a time: when something's not working, ask which dial is actually turned too far, and pull that one back toward the middle. A comp plan that's being gamed doesn't need less adaptation — reps should keep learning and improving — it needs a metric that can't be fully reverse-engineered into a target divorced from the outcome. A workflow that keeps cascading into unrelated systems doesn't need more automation to "fix" the cascade. It needs fewer, more deliberate connections.

Most fixes fail because someone reaches for the whole toolbox when the actual problem was one dial, cranked too far in one direction.

---

*This is Part 3 of a series working through Scott Page's* Understanding Complexity *(The Great Courses, 2009) applied to RevOps at scaling companies. Next up: diversity, taken apart — the four different ways to measure it, and why most "we need more diversity" conversations are arguing about the wrong one.*

[← Previous: Three Landscapes](/writing/three-landscapes) · [Next: Diversity, Deconstructed →](/writing/diversity-deconstructed)
