---
title: 'Three Landscapes: Fuji, Rugged, and Dancing'
description: 'Scott Page''s landscape metaphor for solvability — Mount Fuji, rugged, and dancing terrain — and why each shape calls for a different strategy.'
pubDate: 2026-09-08
draft: true
tags: ['Systems', 'RevOps', 'Complexity']
---

![Three Landscapes: Fuji, Rugged, and Dancing](/images/writing/02-three-landscapes.svg)

Once you know you're looking at a complex problem and not just a complicated one, a second question matters just as much: can this actually be solved, or am I chasing something that won't hold still long enough to be solved?

Scott Page answers that with a metaphor that turned out to be more useful than the metaphors usually are — the landscape. Picture the value of a potential solution as elevation. High ground is good, low ground is bad, and your job is to find the highest point you can. Three shapes of terrain show up, and they call for three completely different strategies.

## Mount Fuji

Some problems have one clean peak. No traps, no local maxima to get stuck on — just a straightforward climb to a single best answer.

Page's example is Frederick Taylor's shovel study from the early 1900s. Taylor charted worker productivity against shovel size and got a smooth curve with one obvious best size. Test it, find the peak, standardize it, done — forever. That's the entire logic of scientific management, and it only works because the landscape underneath it has exactly one hill.

Plenty of RevOps work is genuinely Fuji-shaped, and it's worth knowing which pieces those are, because they're the ones you get to actually finish. What order do you provision system access for a new hire? Which field on a form maps to which property in your CRM? These have a best answer. Find it, document it, move on. Not every problem deserves a strategy meeting.

## Rugged

Most RevOps work isn't Fuji-shaped. It's rugged — many peaks, because your own choices interact with each other.

Comp plan design is the clearest version of this I run into. Base salary, accelerator thresholds, SPIF structure, quota-setting methodology — none of these are independent decisions. Change the accelerator curve and you've changed what quota level makes sense. Change quota-setting and you've changed how the accelerators actually pay out in practice. There's no single lever to pull; there's a whole interacting system, and the "best" comp structure sits somewhere in a landscape with a lot of decent-looking hills and a few genuinely bad ones that look fine from a distance.

The trap here is what computer scientists call a greedy algorithm: take whatever step looks like an immediate improvement, and stop as soon as nothing looks better. On a rugged landscape, that strategy reliably strands you on a mediocre peak — a comp plan that's locally fine but nowhere near the best structure available, because you stopped exploring the moment the first change looked like progress. Rugged problems reward real testing before you commit: try configurations that look worse on paper, see what you learn, before locking in.

The upside: once you've genuinely found a strong peak on a rugged landscape, it tends to hold. Nobody's actively working against you here. The comp plan doesn't fight back — it's just complicated to search through.

## Dancing

Then there's the landscape that never holds still, because someone else is adapting too.

Pricing and packaging is the textbook case. You're not the only actor on this terrain — competitors reposition in response to your moves, customers develop new expectations based on what's available in the market, and the "right" structure from two quarters ago may already be wrong, not because anyone built it badly, but because the ground shifted underneath a decision that was correct when it was made.

This is a different problem from a rugged one, and it demands a different response. On a rugged landscape, you explore hard up front and then settle in and exploit what you found — that peak isn't going anywhere. On a dancing landscape, settling in is exactly the mistake. The peak moves. What worked has an expiration date whether you notice it or not. We'll go deeper into exactly how to manage this — the explore/exploit trade-off, and why some things should never fully ship — a few posts from now.

## The filter this gives you

Before you sink real time into "solving" something, ask which landscape you're actually standing on.

→ If it's Fuji-shaped, solve it once, write it down, stop thinking about it.
→ If it's rugged, invest the real effort — test configurations, resist the greedy first-win, and trust that a strong solution here will actually hold.
→ If it's dancing, the instinct to "get this right and move on" is the mistake itself. Build something adjustable. Budget for revisiting it. Chasing a final, optimal state on a dancing landscape isn't rigor — it's wasted motion, because the target won't be where you left it.

Most RevOps failures I see aren't bad solutions. They're the right kind of effort aimed at the wrong kind of terrain — Fuji-level effort thrown at a rugged problem, or worse, rugged-level "let's nail this once" thrown at something that was always going to keep moving.

What landscape are you standing on right now, and does your effort actually match it?

---

*This is Part 2 of a series working through Scott Page's* Understanding Complexity *(The Great Courses, 2009) applied to RevOps at scaling companies. Next up: the four dials that determine whether a system produces genuine complexity or just falls apart — and why the answer is never found at the extremes.*
