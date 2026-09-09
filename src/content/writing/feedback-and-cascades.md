---
title: 'The Small Event That Wasn''t Actually Small'
description: 'Cascading failures don''t need an attacker — highly connected systems can quietly organize into a shape where an ordinary event triggers collapse on its own.'
pubDate: 2026-09-08
draft: false
tags: ['Systems', 'RevOps', 'Complexity']
---

![The Small Event That Wasn't Actually Small](/images/writing/07-feedback-and-cascades.svg)

Last post ended on hub-node fragility — what happens when someone or something knocks out the one connection everything else depends on. Here's the part that's harder to sit with: sometimes nobody has to knock anything out. Highly connected systems can build toward a state where an entirely ordinary, unremarkable event triggers a cascade all on its own. Nothing attacked anything. The system had just quietly organized itself into a shape where that was always going to happen eventually.

Two ideas explain most of what looks like "random" chaos in a scaling RevOps org. Neither one is actually random.

## Why some practices spread and equally good ones don't

The keyboard you're typing on is arranged the way it is — QWERTY — not because it's the best layout. It won because it accumulated four separate positive feedbacks: production scale, the fact that people who'd already learned it kept using it, instruction manuals built around it, and standardization that let resources concentrate on one design instead of splitting across several. Once those feedbacks were running, a better layout genuinely couldn't compete, not on merit — on momentum. Page calls this path dependence: what happened early on the path mattered more than any inherent quality of the destination.

I've watched this exact pattern crown a mediocre internal tool. A workaround process gets built to patch a real gap, a few people adopt it because it works well enough, training materials quietly get built around it because it's what the newest hires see first, and eighteen months later it's "the way things are done" — not because anyone evaluated it against alternatives, but because the feedback loop of adoption, documentation, and habit did what QWERTY's did. The better alternative that never got early traction doesn't get a fair fight. It never had the chance.

Positive feedback plus diversity produces something else worth naming: tipping. Model a group with identical thresholds for abandoning a failing process, and nothing tips until every single person's threshold is crossed at once — rare, and not how real teams behave. Give people genuinely different thresholds — some resist change until forced, some bail at the first sign of friction — and you get real tipping: a few early defectors cross their threshold, that shift changes what everyone downstream is looking at, and a cascade follows that the original average threshold never would have predicted. The people sitting at the extremes of that distribution, not the average person, are usually what determines whether the whole thing holds or collapses. The tail wags the dog.

Feedback doesn't only destabilize. Run it in the other direction and you get the thing that actually holds a system together. A thermostat is negative feedback in its plainest form — imperfect, always a little behind, but it keeps a room roughly stable instead of drifting to an extreme. Your QBR cadence functions the same way: not a perfect corrective, but a recurring check that pulls the forecast back toward reality before drift compounds. And diversity changes how well that stabilization works — Page's beehive model found that genetically similar bees produce bigger temperature swings inside the hive, while genetically diverse ones stabilize it, because no single vulnerability is shared by the whole colony at once. A team where everyone came up through the same training, sold the same way, reacts to pressure the same way is the similar-bee hive: efficient, and one bad quarter away from swinging hard in one direction. Real variation in how people sell and think is often what keeps the swings survivable.

## The sandpile

Feedback explains momentum and stability. It doesn't explain the specific shape of the big, ugly, seemingly-out-of-nowhere failure — the deal that unravels and somehow takes the whole quarter with it. For that, Page reaches for a physicist's model: drop grains of sand one at a time onto a table. Most of the time, adding one more grain does nothing, or shifts one or two grains at most. Every so often, without warning, one more grain triggers an avalanche that takes half the pile down with it. Plot the sizes of those avalanches and you don't get a bell curve. You get a power law — most events tiny, a few catastrophically large, with nothing in between to warn you which kind is coming.

The pile isn't random. It's a system that has self-organized into a critical state — connected and loaded up just enough that most additions are absorbed harmlessly, and a small number aren't, for reasons that have everything to do with the pile's structure and nothing to do with the size of whatever grain triggered it.

This is the mechanism behind the hub-node fragility from last post, one layer deeper. A highly connected system doesn't just risk a bad outcome if someone deliberately attacks the hub. It can organize itself, through totally ordinary daily activity, into a state where an unremarkable event — one deal falling through, one key contact going quiet — cascades into a reforecast, which triggers a territory reshuffle, which triggers a comp dispute, which stalls three unrelated renewals because the rep handling them is now consumed by the fallout. Nobody did anything wrong at any individual step. The cascade was already latent in how connected the system had become. The triggering event was just the last grain.

## What you actually do about this

You can't prevent every small triggering event — that's the wrong target, and chasing it is exhausting and pointless. What you can influence is how far a cascade travels once one starts, and that comes back to connectedness, the same dial from a few posts back. Deliberately limiting how many downstream systems a single change can touch — compartmentalizing, the way an airport can seal off one terminal fast instead of letting an incident ripple through the whole facility — caps the avalanche size without requiring you to predict which grain sets it off.

The reframe that actually matters here: the big, ugly quarter that seems to come from nowhere usually isn't bad luck. It's the output of how connected your system had already become, showing up in the one place it was always going to show up eventually.

---

*This is Part 7 of a series working through Scott Page's* Understanding Complexity *(The Great Courses, 2009) applied to RevOps at scaling companies. Last one: what actually separates genuine randomness from the output of a complex system — and what you can do about a system you can't fully control.*
