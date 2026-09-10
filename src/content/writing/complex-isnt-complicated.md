---
title: 'Complex Isn''t Complicated — And That Distinction Is Costing You'
description: 'Complicated systems have parts; complex systems have parts that adapt — and that''s why documentation alone stops working once a RevOps process scales.'
seoTitle: 'Complex Isn''t Complicated — Jon Martin'
pubDate: 2026-09-08
draft: false
tags: ['Systems', 'RevOps', 'Complexity']
---

![Complex Isn't Complicated — And That Distinction Is Costing You](/images/writing/01-complex-isnt-complicated.svg)

Every RevOps leader I've talked to in the last decade has said some version of the same sentence: "our systems are so complicated."

Most of the time, that's the wrong word. What's actually happening is complexity, not complication — and it's a different failure mode entirely. One that no amount of documentation fixes.

I spent 18 years building and running RevOps functions before I heard this distinction named properly. Founded two firms, scaled both, sold both. Now I spend my days at Process Pro helping SaaS and professional services companies through the same moment, over and over: a system that ran clean at $2M ARR starts fighting back at $20M, and nobody can quite explain why. The team didn't get worse. The tools didn't get worse. Something else changed.

Here's the something else, borrowed from Scott Page's *Understanding Complexity* lecture series — a complexity scientist's language for a problem I'd been circling for years without a name for it.

## Complicated is not complex

A complicated system has a lot of moving, connected, diverse parts. But those parts don't adapt. Wire it up once, and it stays wired. An assembly line is complicated. So is a tax form.

A complex system has the same moving parts — plus the parts respond. To you, and to each other. Page names four ingredients: diversity, connection, interdependence, adaptation. Turn all four up, and you don't have a complicated machine anymore. You have something that's alive, in the sense that it reacts.

That fourth ingredient — adaptation — is the whole ballgame. It's also the one nobody accounts for when they're building a process.

## Adaptation cuts both ways

Here's the part that took me longer to sit with: adaptation isn't just the thing that makes your documentation go stale. It's also the thing that lets a GTM org survive a hit that would flatten a purely complicated one.

Page's lecture makes a point I didn't expect from a course on organizational failure: complex systems are often more robust than simple ones, precisely because they adapt. A rigid, complicated system has no give — remove one part and the whole thing stops, the way an assembly line halts when one station goes down. A complex system routes around damage. Lose your best AE mid-quarter, and a genuinely adaptive sales org compensates — other reps pick up slack, the manager reshuffles territories, pipeline gets redistributed without anyone issuing a directive. Nobody wrote a "what to do if we lose our top rep" SOP. The system just adapted.

That's the same mechanism that broke your lead routing rule. Adaptation degrades what's fixed and documented; it also builds resilience nothing documented could produce on its own. You don't get to keep one and skip the other.

The other thing this buys you, whether you want it or not, is unpredictability. A complicated system's behavior is fully specified by its parts — you can predict it because nothing in it is deciding anything. A complex system can produce genuinely large, hard-to-foresee swings, good and bad, because the parts are reacting to each other in ways that compound. This is why two companies with nearly identical org charts can have wildly different responses to the same shock — a key departure, a pricing change from a competitor, a bad quarter. Same structure on paper. Different adaptive history underneath it. We'll come back to exactly how these large swings get produced later in this series — there's a specific mechanism for it, and it's not random.

## Where this shows up at scale

At five reps, your lead routing rule is one sentence, everyone knows it, and it's basically complicated — connected parts, sure, but nobody's gaming it because nobody's had time to learn it well enough to game it.

At fifty reps, it's still the same rule on paper. Except now:

→ Reps have learned exactly which fields to fill in to get routed to the accounts they want.
→ Managers have built informal workarounds because the "official" process broke down for a deal type nobody designed it for.
→ The person who wrote the rule left eighteen months ago, and the two people who've patched it since didn't know the original intent.

Nothing about the rule changed. The system around it adapted. That's the shift from complicated to complex, and it's exactly the shift that happens as a company scales — not because growth breaks things on purpose, but because growth is what turns on the adaptation dial. More reps, more managers, more edge cases, more people with a reason to route around the process instead of through it.

This is also why forecast accuracy quietly degrades even when nobody touched the forecasting model. The model was calibrated against a sales team that behaved a certain way. The team adapted — new hires, new incentives, new competitive pressure — and the model didn't. It's not broken. It's stale, and staleness is what complexity produces when nobody's watching for it.

## Why "just document it better" doesn't fix this

Documentation is a complicated-system solution. It assumes that once you've written the process down correctly, it stays correct. That's true for a fixed, non-adaptive system. It is not true the moment humans start reacting to the documentation itself.

I've watched this exact pattern kill three separate onboarding processes across client accounts: someone writes the definitive SOP, it's accurate on the day it's published, and within two quarters it's quietly wrong — not because anyone did anything wrong, but because the org it was describing kept moving after the doc froze in place.

This isn't an argument against documentation. It's an argument for knowing which kind of problem you're documenting. A complicated problem, solve once. A complex one, you're not solving — you're managing, on an ongoing basis, because the target keeps moving whether you're watching or not.

## The diagnostic question

Before you troubleshoot a "complicated" RevOps problem, ask one question: are the humans in this system reacting to it?

If reps, managers, or customers are adapting their behavior in response to the process — gaming a metric, routing around a bottleneck, quietly building a workaround — you're not looking at a complication problem. You're looking at a complexity problem. And the fix isn't a cleaner flowchart. It's building something that assumes the ground will keep shifting, because it will.

A complicated system needs a better process. A complex system needs a different kind of attention entirely.

---

*This is Part 1 of a series working through Scott Page's* Understanding Complexity *(The Great Courses, 2009) applied to RevOps at scaling companies. Next up: why some problems can be solved once and others never stay solved — the difference between a rugged landscape and a dancing one.*

[Next: Three Landscapes →](/writing/three-landscapes)
