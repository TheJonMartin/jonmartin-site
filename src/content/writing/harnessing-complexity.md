---
title: 'Harnessing What You Can''t Control'
description: 'A complex system can''t be controlled the way a complicated one can — the real skill is recognizing it accurately and responding to match.'
pubDate: 2026-09-08
draft: true
tags: ['Systems', 'RevOps', 'Complexity']
---

![Harnessing What You Can't Control](/images/writing/08-harnessing-complexity.svg)

Seven posts in, here's the harder question underneath all of it: once you've named a problem complex instead of complicated, mapped its landscape, tuned its dials, and understood how it emerges and cascades — what do you actually do with any of that? You still have a quarter to hit.

Page closes his course on exactly this, and the honest answer isn't as satisfying as a five-step framework. It's closer to a discipline: you don't get to control a complex system the way you'd control a complicated one. You get to recognize it accurately, and respond in a way that matches what it actually is instead of what you wish it were.

## Randomness that isn't random

Start with a distinction that reframes a lot of what gets waved off as bad luck. There are a few standard explanations for why something looks random: it was engineered to be that way, it's caused by some other randomness upstream, or it's a fundamental property of the thing itself. Complexity theory adds a fourth: interdependent rules. A handful of simple, deterministic rules, interacting, can produce output that looks completely unpredictable even though nothing about it is actually random.

That reframes the cascade from last post, and the hub-node fragility from the post before it. A deal that unravels and takes the quarter with it doesn't have to be luck. It can be the deterministic output of a system whose rules and connections you could, in principle, trace — you just haven't looked closely enough to see the mechanism, so it reads as chance instead of consequence.

Here's the sharper problem: even once you've built a good model of that mechanism, it doesn't stay good indefinitely. A complex system adapts — that's the whole premise from the first post in this series — which means the distribution of outcomes tomorrow isn't guaranteed to look like the distribution of outcomes yesterday. Statisticians call the assumption that it does stay stable "stationarity," and building on it when it doesn't hold has sunk things much bigger than a quarterly forecast — a hedge fund the size of Long-Term Capital Management, and an entire mortgage market in 2008, both leaned on models that assumed tomorrow would statistically resemble yesterday, in systems that had already adapted well past where those models were calibrated.

A churn model or a forecast built on last year's patterns is making the exact same bet at a much smaller scale. The market, the team, and the customers have all kept adapting since the model was built. It may still run fine. It's also quietly answering a question that's stopped being the question you're actually facing, and there's no alarm that goes off when that happens.

The practical takeaway cuts both directions, and it's worth holding both halves at once: something that's working right now isn't guaranteed to keep working, because the landscape underneath it can move. And something that failed once hasn't been proven to never work, for the same reason. Neither a current win nor a past loss is as final as it feels in the moment.

## Recognition before response

Before reaching for any of this, Page's first move is worth taking seriously: not everything is complex. Some problems really are linear and predictable — genuinely Fuji-shaped, back from a few posts ago — and the discipline here includes knowing when to just solve the thing and move on instead of importing complexity-management machinery where it isn't needed. Standard decision theory — list your options, estimate the payoffs, pick the best one — works fine for those. It breaks down specifically because it assumes away the things that make a system complex in the first place: it ignores that other people are adapting to you too, it collapses complexity into simple uncertainty, and it optimizes for one outcome instead of asking what kind of system your choice leaves behind.

Once you've confirmed you're actually looking at a complex system, Page gives four levers — and every one of them is a callback to something already in this series.

**Diversity.** Encourage it, but not without limit — the same moderate zone from the interesting in-between, a few posts back. Enough variation prevents blind spots and keeps a single shared vulnerability from taking down the whole team at once. Too much, and you're back to the sprawl from the diversity post — configurations nobody can support, reporting that can't roll up to anything.

**Selection and incentives.** Define your goals carefully, because whatever you measure is what people will actually optimize — the Goodhart's Law problem from a few posts back, and it doesn't go away just because you've read about it once. Every metric is a live target the moment someone's compensation depends on it.

**Interdependencies.** Don't chase small efficiency gains so aggressively that you push the system toward the kind of tightly wound, over-connected state that self-organizes into cascading failure — last post's sandpile, waiting for an ordinary event to be the one that finally triggers it.

**Connections.** Look for the links that are genuinely synergistic and worth strengthening, and cut the ones that are just adding fragility without adding value — the hub-node audit from two posts back, done as an ongoing practice instead of a one-time exercise.

## The case for a little slack

Page cites something I didn't expect from a course on complexity theory: organizations that have survived more than five hundred years — a mix of universities and a smaller number of businesses — tend to share one trait. They run with a bit of slack. Not maximum efficiency, not zero waste, not every process optimized to the theoretical limit. A little give.

That slack is what makes the robustness from a few posts back possible in the first place — the team that absorbs a departed rep without a directive telling it how, the informal habit that saves an audit nobody saw coming. You can't optimize a system down to zero slack and still expect it to route around damage the way a genuinely adaptive system can. The efficiency and the resilience are in tension, and pretending they aren't is how a lot of otherwise well-run RevOps orgs end up brittle in exactly the way that only shows up once, at the worst possible time.

## Where this actually leaves you

If you've been following this whole series, you already have the tool. Every motion in your revenue engine sits on some version of this landscape, and naming it changes what kind of effort it deserves:

| Motion | Landscape | What that means |
|---|---|---|
| Demand gen / lead scoring | Dancing | Standing exploration, never a finished model |
| Sales process / pipeline | Rugged | Worth solving hard — once found, it holds |
| Pricing / packaging | Dancing | Adaptable architecture, not a final version |
| Contracting / paperwork | Rugged → Fuji | Standardize once, mostly done |
| Onboarding / provisioning | Rugged | Real interaction complexity, not adversarial |
| Billing / subscription logic | Rugged | Worth engineering hard, holds once solved |
| Renewals / expansion | Dancing | Customer behavior keeps moving the target |
| Retention / churn | Dancing | Customers adapt directly to your intervention |

Command-and-control optimization isn't wrong. It's just the wrong tool for half of what's actually on this list, and most of the friction I see in scaling RevOps orgs comes down to using it on the dancing half anyway — trying to finish something that was never going to hold still.

You don't get to control a complex system. You get to understand it well enough to stop being surprised by it.

---

*This closes the eight-part series working through Scott Page's* Understanding Complexity *(The Great Courses, 2009) applied to RevOps at scaling companies. One more piece is coming — connecting all of this to a framework built from a completely different lineage: Ashby, Conway, Brooks, and Beer. Different field, no contact with this one, and somehow the same physics underneath.*
