---
title: "Coastline Scoping"
description: "A RevOps project has no single length. The number you publish is a length at a stated altitude, from named sources, against a stated reference."
seoTitle: "Coastline Scoping — Jon Martin"
pubDate: 2026-09-30
draft: false
tags: ['Systems', 'RevOps', 'Client Delivery']
category: 'Client Delivery'
---

![Coastline Scoping](/images/writing/coastline-scoping.svg)

Two teams looked at the same quote-to-cash work and published two numbers.

Sales ops measured the handoff. Finance measured recognition, amendments, and the one customer on a custom anniversary. Neither was padding. They were walking the same shore with different rulers. The SOW averaged them anyway, and delivery spent the next six weeks discovering that the average was not a place.

A coastline has no single length. Measure Britain with 100 miles steps and you get one number. Measure it with 50 miles steps and you get a longer one. The island did not grow. The stick got shorter.

RevOps technical scope behaves the same way.

## This is not the missing middle again

[The missing middle](/writing/missing-middle-discovery) is a discovery failure. The L2 requirements sentence never got written, so scoping had to invent it.

[The reset](/writing/the-reset-is-the-project) is a delivery failure. The L2 requirements sentence existed, then died in Slack and UAT.

Coastline scoping is what happens in between: you have material, you need a number, and you treat "how long will this take?" as if it were a property of the work. It is not. Effort, interface surface, and requirement count depend on the altitude you estimate at, whose statements you treat as the border, and what you agreed to count as shore.

Ask for a length with no ruler and you will get a number. It will not survive the next workshop.

## L2 is the map you can sell

The four altitudes are the same ones from discovery. Scoping just decides what each one is allowed to do.

**L0 is the island.** The result. "Invoice disputes stop showing up in renewal loss reviews." Contract that sentence. Do not attach hours to it.

**L1 is the 200 mile outline.** Enough to see which shores exist. Still not estimable as build.

**L2 is the map scale you sell.** "When a deal is Closed Won, billing must create the subscription from the approved commercial terms — no re-key." This is the only altitude that gets a price.

**L3 is walking every inlet.** Field names, sync direction, the workflow someone already described. Price it only when it is anchored to a confirmed L2. Everything else is a spike or it is out.

The discipline does not change:

> No L3 on a thread until an L2 exists for it.

What changes is the cost of breaking it. In discovery, unanchored L3 is trivia. In scoping, unanchored L3 is the number you will be held to.

## Spain and Portugal

Richardson noticed the paradox because Spain and Portugal published different lengths for the same border. They were not lying. They used different sticks.

Finance and sales ops do this every week.

An L2 from the VP of finance is not the same L2 from sales ops. Tag altitude without tagging source and you will average two people who do not agree. The blended list looks decisive. It is how UAT gets a surprise that was sitting in the room the whole time.

If the two lists differ, show two lengths. Name the disputed stretch. Do not invent a third sentence in the last five minutes of the call.

## Five objects, or the number will move

You are not scoping "the project." You are scoping five things. Miss one and the estimate is a draft wearing a date.

**Reference.** Systems in and out. Motions in and out. Forward-only or historical rewrite. Who owns identity, amount, status, product. If two stakeholders can still draw different borders after reading this block, stop. You do not have a measurement yet.

**Island.** One L0 sentence that does not name a vendor. If that sentence changes later, it is a different project — not a change order on this one.

**Confirmed L2s.** Authored, sourced, confirmed by someone with standing. If two implementers would still ask "what do you mean, exactly," it is still L1. Do not put points on it.

**Named exception classes.** Partner-sourced. Multi-entity. Custom billing schedule. Mid-term amendment. Each class is in, a time-boxed spike, a manual path, or out. "What about Acme" is not a class. That is a rock. Log it. Do not resize the coast for one rock unless the rock is the brief.

**Explicit non-coast.** Historical reopen of closed-won. Commission engine. Warehouse grain. Write them. Silence becomes implied shore.

## Publish two rulers

Never publish one number from one conversation.

**Ruler A** is L2 only: confirmed functional requirements plus the exception classes you marked in. This is the number you sell if the reference holds.

**Ruler B** is L2 plus the L3 already visible in the room. This is the number delivery will feel if you start tomorrow with no further generalization.

The gap is the forecast. A small gap means the process is almost a straight edge — more discovery should barely move A. A large gap means fjord country. Every extra workshop will add surface. That is often scope revelation, not discovery failure. It is still information you are not allowed to hide inside a blended hope.

If B is twice A, you have two honest moves: raise the altitude back to A and park the rest as classes, or change the reference and sell B on purpose. Padding is the third move. It produces a number nobody can defend when the next inlet appears.

A practical test:

> Could I hand this estimate to the confirmed L2 list and have them agree?

If the honest answer needs a tour of the exceptions, you published Ruler B and labeled it A.

## The shape can change

A real coast cannot. A revenue process can.

Automating every existing inlet makes the measured length longer. The way to shorten scope is to make the shore less wrinkly: one identity key, one stage model, one master for each class of fact, a manual path for a named class instead of a workflow that follows the unofficial variant.

"We will not support that motion in v1" moves the shoreline inland. That is the lever. A smaller font on the work-breakdown is not.

This is also why "just integrate what you have" and "small HubSpot workflow" are not the same species of project. Same SOW language. Different shore.

## What to do Monday

Before you put a number on a RevOps build, write four lines and stop if any of them is blank.

1. **What island are we enclosing?** One L0 sentence.
2. **At what altitude is this estimate?** Default is confirmed L2. Say so in the SOW.
3. **Who else is measuring it?** If finance and sales ops disagree, show both lengths.
4. **Which inlets are we walking, which are named and deferred, and which are not-coast?**

Then publish A and B. Put this sentence under the hours:

> This estimate is valid at L2 for the named capabilities. Exception classes are in as classes, not as unbounded cleanup. L3 without a parent L2 is change control.

"Phase 1" is not a substitute for that sentence. Phase 1 without a ruler is optimism.

The middle was missing because nobody was assigned to build it. Drift happens because nobody is assigned to keep it. The coastline number moves because nobody was assigned to say which stick they used. Assign yourself.
