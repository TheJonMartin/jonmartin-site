---
title: 'The Missing Middle of Discovery'
description: 'Discovery fails in the gap between pain and configuration. Requirements live at four altitudes, and the usable one almost never arrives in the client\'s words.'
seoTitle: 'The Missing Middle of Discovery — Jon Martin'
pubDate: 2026-09-19
draft: false
tags: ['Systems', 'RevOps', 'Client Delivery']
category: 'Client Delivery'
---

![The Missing Middle of Discovery](/images/writing/missing-middle-discovery.svg)

A discovery call can go well and still produce nothing you can scope.

The notes are long. The client felt heard. Finance named a pain. Sales ops walked a process. IT offered a field. Someone wrote "requirements gathered" on the recap. Two weeks later the statement of work is precise about the wrong things and vague about the right ones, and nobody can point to the sentence that would have prevented it.

That sentence was never spoken. It had to be authored.

## Information has altitude

Every statement in a discovery conversation sits at a level of abstraction. Most practitioners treat gathering as one skill — ask good questions, write it down. That framing hides the actual work. The work is noticing *which level you are on*, and moving information when the client leaves it in the wrong place.

Four altitudes:

**L0 — Business outcome.** Goal, pain, success criteria. No system named. *"Billing errors are costing us renewals."*

**L1 — Process / capability.** Workflow, actors, sequence. Still technology-agnostic. *"When a deal closes, someone on finance re-keys the terms into billing."*

**L2 — Functional requirement.** What the system must do. Specific enough to estimate against; not yet a mapping. *"When a deal is marked Closed Won, billing must create the subscription from the approved plan, price, discount, and start date — no manual re-entry."*

**L3 — Detail / configuration.** Fields, APIs, exact rules. *"Map Opportunity.Amount and CloseDate on StageName = Closed Won."*

The test for each is simple:

- L0 is true no matter which vendor you pick.
- L1 can be drawn as swimlanes with no system on the boxes.
- L2 is a sentence two engineers could roughly size without asking "what do you mean."
- L3 can be resolved without another conversation with the client.

L0 and L1 arrive in the client's voice. L3 arrives if you wait long enough, or if an architect is in the room. L2 almost never arrives on its own. Clients speak outcomes and processes. L2 is constructed by the practitioner from those two, then confirmed. That construction step is the missing middle.

This is why "just one more discovery workshop" does not settle the number. A coastline has no single length. The length you get depends on the size of the ruler, who is holding it, and which wiggles you agree to count. L0 is the island. L1 is the outline you can see from altitude. L2 is the map scale you can sell. L3 is walking every inlet. Finer questions on a quote-to-cash shore usually add surface. That added surface is often scope revelation, not moral scope creep — but only if you already named the ruler. Without an L2, you are measuring with a stick you have not admitted you are using.

## Three ways the middle disappears

The failures do not feel like failures while they are happening. That is the point.

**Detail spelunking.** The client mentions invoice disputes and you are three questions into proration logic before anyone has said what the system must do. It looks like thoroughness. Downstream you have a pile of L3 trivia anchored to nothing scopable.

**Altitude blindness.** You capture the pain and the process with real care. The recap is rich. Nothing in it is a requirement. It looks like listening. Downstream, scoping has to invent the L2 sentence that the call never produced — or ship a SOW that quotes the pain and hopes delivery will figure it out.

**Bridge overuse.** You have learned that L2 matters, so you force confirmations before there is enough L0/L1 to justify them. The client says yes because the call is moving. That yes gets treated as settled scope. It looks like decisiveness. Downstream the "confirmed" requirement was a guess wearing a timestamp.

The discipline that cuts all three is one sentence long:

> No L3 question on a topic until an L2 statement exists for it.

And the companion: do not treat an L0 or L1 statement as if it already *is* that L2. Importance is not buildability.

## Whose statement is this

Altitude alone is an incomplete tag the moment more than one voice is in the room — which is every real discovery call.

Finance, sales ops, IT, and customer success can describe the same process and mean four different systems. A perfectly leveled set of notes can average two people who do not agree. So every statement gets two attributes, not one: its altitude, and its source. Who said it, and do they have standing to say it.

A VP of finance can own billing policy. She cannot settle a source-of-truth question for the CRM. An IT architect can own the mapping. He cannot settle whether usage-based line items are even in scope. Tagging the speaker is not extra overhead. It is the same instinct you already use when the same sentence from two different people does not weigh the same.

## What the call is for

The useful output of discovery is not a transcript. It is a short list of confirmed L2 statements, each tagged with who confirmed them and what L0/L1 material they were built from.

Everything else is raw material or premature detail.

A practical close-out rule follows from that. If the involvement produced no written artifact the same day — a scope brief, a discovery note with at least one attempted L2, a contribution to a proposal — it was a meeting, not discovery. Memory is not a requirements system. The middle disappears fastest in the gap between the call and the writeup.

## The diagnostic you can run live

You will not pause after every sentence. The compressed version is one background question:

**Could I hand this sentence to an engineer as-is?**

- No — they would ask what the client actually wants → L0 or L1. Stay there, or build a bridge.
- No — they would ask which field, which system, which exact rule → you may already be at L2. L3 questions are now fair.
- Yes → L3. The only remaining check is whether an L2 exists that this detail is in service of.

A bridge sounds like this, not like a quiz:

> It sounds like when a deal closes, billing terms need to land automatically instead of being re-keyed — is that the requirement?

If they confirm, you now have the sentence scoping needs. If they correct you, the correction is usually the real L2. Either way you authored something the transcript would not have contained.

## Why this is a systems problem, not a note-taking problem

[Ashby](/four-laws-complex-system-design-full#s21) says the regulator has to match the variety of the thing being controlled. Unleveled discovery notes are unregulated variety: outcomes, workflows, field names, and opinions arriving on the same page with no way to tell which ones commit you to work. The altitude model is a variety filter. It decides what gets absorbed into scope and what stays context.

[Conway](/four-laws-complex-system-design-full#s22) shows up in the source tag. The disagreement between finance and sales ops is often not a wording problem. It is two teams drawing the process from their own side of a boundary. If you flatten them into "the client said," you have designed the SOW to a communication structure that does not exist.

This is also why "just listen better" does not fix bad requirements. Listening harder at L1 produces more L1. The gap between process narrative and a buildable statement is a translation step. Translation is design work. It belongs to the practitioner, not the client.

## What to do Monday

On the next discovery call, keep a two-column scratch: altitude and speaker. Do not chase a field name until you can write one L2 sentence for that thread and hear it confirmed by someone with standing. After the call, write the L2 list before you write the recap story. If you cannot produce even one, the call did not finish. That is information, not failure — and it is cheaper to know that on Monday than in UAT.

The middle is missing because nobody is assigned to build it. Assign yourself.
