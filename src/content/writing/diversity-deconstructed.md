---
title: 'Diversity, Deconstructed'
description: '"Diversity" isn''t one thing — Scott Page breaks it into four distinct measures, and most "too much" or "too little" arguments are really about different ones.'
pubDate: 2026-09-08
draft: true
tags: ['Systems', 'RevOps', 'Complexity']
---

![Diversity, Deconstructed](/images/writing/04-diversity-deconstructed.svg)

"We need more diversity in our segmentation." "Our stack has gotten too diverse — too many tools doing overlapping things." I've heard both sentences from the same leadership team in the same quarter, and neither one meant anything precise, because diversity isn't one thing. It's at least four different things, and most "we have too much" or "we need more" conversations are really an argument between people measuring different quantities without realizing it.

Page breaks diversity into four distinct types of measure. Knowing which one you're actually talking about changes what the fix is.

## Four ways to measure it

**Variation measures** capture spread along a single numeric attribute — think statistical variance. Spread of deal size across your pipeline. Spread of sales cycle length. Useful for "how much does this one number vary," useless for "how many genuinely different kinds of things am I dealing with."

**Entropy measures** capture the evenness of a distribution across categories — more categories, more evenly spread, higher entropy. Distribution of deals across territories or segments. The flaw: entropy treats every category as equally different from every other one, even when two of your segments are basically twins and a third is nothing like the rest. High entropy can describe either genuine variety or five categories that shouldn't have been split apart in the first place.

**Distance measures** require an actual distance function — how far apart are these types, substantively, not just categorically. Enterprise healthcare and SMB e-commerce are a large distance apart. Two SMB verticals labeled as separate segments might be a small distance apart even though your CRM treats them as distinct.

**Attribute measures** count the total number of unique attributes present across the whole set, rather than counting types. Total unique tools in your stack. Total unique contract clause variants across active agreements. Total unique workflow automations running at once. This is usually the ugliest number in a scaling RevOps org, and the one almost nobody actually counts — which is exactly why tool sprawl and process sprawl sneak up on people. Nobody added "one more integration" as a decision. It just happened, twelve times, over three years.

When someone says "we have too much diversity," ask which of these four they mean, because the fixes don't overlap. Too many categories is a pruning conversation. Categories that aren't different enough is a consolidation conversation. Genuine attribute-level sprawl — the real count of unique configurations running underneath the tidy-looking category list — is usually the actual bloat problem, and it's the one nobody measured because nobody thought to count it.

## Four ways it gets there

Diversity doesn't show up randomly. Page names four distinct causes, and two of them are worth actively fighting while two of them are legitimate and shouldn't be flattened just to look tidy.

**Diversity begets diversity.** The more variation you start with, the more you tend to produce. Three integrations in the stack, and a fourth gets proposed the next time someone hits friction. Two customer segments, and a "special case" account gets its own bespoke handling because the precedent for splitting things apart already exists. This compounds quietly — each new addition makes the next one feel more reasonable.

**Weak selective pressure.** Nothing is pruning what's unused, so it just accumulates. The workflow automation built for a reorg two years ago that nobody's turned off because nobody's sure what it touches. The tool a since-departed VP championed that three people still open out of habit. This is the diversity that's purely cost — nothing is being served by it, it's just never been someone's job to remove it.

**Different landscapes.** Sometimes the diversity is real and earned, because the problems genuinely differ. An enterprise motion and an SMB motion actually do need different playbooks — different buying committees, different cycle lengths, different risk tolerance. Forcing these into one shared process isn't simplification, it's pretending two different landscapes are one.

**Dancing landscapes.** One actor's move reshapes the terrain for everyone else, and divergence builds up over multiple rounds of that. A competitor repositions, you differentiate in response, they counter, you differentiate again — and three competitive cycles later your segmentation has organically proliferated without a single meeting where anyone decided "let's add complexity here." Nobody chose this. It accreted, one adaptive response at a time.

The first two causes are usually worth pruning hard. The second two are legitimate, and pruning them just for tidiness will quietly break something that needed to be different.

## Why you sometimes can't fix this in place

Here's a distinction from the same lecture that reframes a specific kind of frustration I hear constantly: "we've tried to clean this up three times and it never sticks."

An org that accreted diversity the way evolution does — reorg by reorg, hire by hire, decision by small local decision — is bound by the same constraint evolution is. Every intermediate state along the way had to actually work well enough to survive. Nobody could jump straight from the clean structure of three years ago to a genuinely different clean structure today, because every step in between had to be independently viable — had to keep the business running while it happened. That's why incremental cleanup attempts on organically-accreted sprawl so often stall out half-finished: you're trying to evolve your way to a destination that evolution, by its nature, can't reach in one leap.

A deliberate redesign isn't bound by that constraint. It's a creative process, not an evolutionary one — you're allowed to specify an end state that no sequence of independently-viable small steps would ever have arrived at, and then build a real transition plan to get there, rather than hoping enough small improvements eventually add up to it. Sometimes "we can't seem to fix this by iterating on it" isn't a failure of effort. It's an accurate description of the difference between evolving and redesigning, and it means the fix was never going to be another round of incremental cleanup.

Which kind of diversity are you actually looking at right now — the kind worth pruning, or the kind that's telling you something true about the business that a tidier structure would erase?

---

*This is Part 4 of a series working through Scott Page's* Understanding Complexity *(The Great Courses, 2009) applied to RevOps at scaling companies. Next up: the explore/exploit trade-off — why some problems deserve a permanent testing budget instead of a finished answer.*
