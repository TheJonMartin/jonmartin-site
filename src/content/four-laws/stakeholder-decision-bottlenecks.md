---
title: Why Executive Decisions Stall on Client Projects
description: Little's Law, Kingman's formula, and Weinberg's context-switching numbers, all applied to the steering committee — why the same sign-off takes six weeks.
seoTitle: "Why Executive Decisions Stall | Four Laws Framework"
group: explore
order: 40
---

<span class="label">Applied example · Client delivery</span>

Little's Law, Kingman's formula, and Weinberg's numbers, applied to the steering committee instead of the delivery team — why the same sign-off takes six weeks, and why "escalate harder" usually isn't the fix.

## The symptom you already recognize

A client engagement looks on track for weeks — sprints landing, milestones green — and then, seemingly overnight, three workstreams are blocked on the same thing: a decision only the client's leadership can make. Nobody planned for this. The project plan had "exec sign-off" as a single line item, one box on a Gantt chart, not a queue that had been quietly filling the whole time. This is Little's Law, Kingman's formula, and Weinberg's numbers showing up at the stakeholder level exactly the way they show up on a delivery team (see [Full Reference 8.1](/four-laws-complex-system-design-full#s81)) — except almost nobody diagnoses it that way, because it looks like a people problem ("the client is slow") instead of a flow problem.

## Little's Law — the decision queue you can't see

> **L = λW**

Treat "decisions awaiting stakeholder sign-off" as work in progress. The number of decisions stuck in that queue at any moment equals the rate you're pushing new decisions up to leadership, multiplied by how long each one sits there before it's resolved. Every phase of a subscription-billing migration or system integration generates decisions only the client's leadership can make — which pricing model, which data-ownership boundary, which vendor to prioritize, what risk to accept. If your project plan generates decisions faster than the client's leadership can resolve them, the backlog grows the same way WIP grows in front of any other constrained resource. It's invisible until it isn't, because a decision queue doesn't show up on a burndown chart the way a ticket queue does.

The two levers are the same two Little's Law always offers: reduce the arrival rate, or reduce the time each item spends in the queue. In practice that means batching decisions instead of drip-feeding them one at a time as they come up, and pre-packaging each one — options laid out, a recommendation attached, the actual question reduced to something answerable in minutes rather than something that requires the exec to reconstruct context from scratch.

## Kingman's formula — why the wait isn't linear

> **Wait ≈ V · U · T**

Kingman's formula explains why delay doesn't creep up gradually as a decision-maker gets busier — it explodes once utilization gets close to full, and the explosion is driven as much by variability as by how busy they are. Executives and steering committees are almost always running near full utilization: they're a shared resource across your engagement and every other initiative competing for their attention, not a dedicated resource for your project. And both of Kingman's variability terms are usually high in this setting — decisions arrive unpredictably (a vendor issue surfaces mid-sprint, a budget question comes up out of cycle) and they vary wildly in how long they take to resolve (a two-minute approval sitting next to a strategic re-architecture call). That combination of high utilization and high variability is exactly the regime where wait time stops being predictable and starts being explosive.

This gives you a lever even when you can't get more of the exec's time: reduce variability instead. Standardize how decisions are framed so they don't each require the exec to build new mental models. Batch similar decisions together so service time per item is more consistent. Give advance notice of what's coming so arrivals stop being a surprise. None of this makes the exec less busy — it makes the queue in front of them behave better, which is what actually shortens the wait.

## Weinberg — why the organization doesn't fix it even when it sees it

<span class="label">Context-switching & information distortion</span>

Little's Law and Kingman's formula both assume the queue is being processed rationally — that whoever's holding the decision has an accurate picture of what's waiting and what it's costing. Weinberg's work is about why that assumption usually fails. Two of his observations map directly onto stalled stakeholder decisions. First, information gets distorted as it moves up a hierarchy: by the time urgency and cost-of-delay reach the actual decision-maker, it's often been softened or summarized by people in between who don't want to be the bearer of bad news, or who don't fully understand the downstream cost themselves. Second, his context-switching numbers apply to executives the same way they apply to an engineer holding five tickets — a steering-committee sponsor who's also serving on two other initiative committees isn't just "busy," they're paying a real, measurable tax in effective capacity for every concurrent commitment they're holding ([see the Weinberg calculator](/flow-formula-calculator)).

There's a third piece worth naming even though it's less formula and more field observation: the stated problem is rarely the real problem. Sometimes a stalled decision isn't really about the decision at all — it's unresolved internal politics, a budget-ownership dispute, or a stakeholder protecting themselves from being blamed if the choice goes wrong. Little's Law tells you the queue exists. Kingman's formula tells you why the wait is unpredictable. Weinberg tells you why the signal reaching the person who could clear the queue is often wrong, softened, or beside the point.

## A worked example — a subscription migration approval chain

### The setup

A mid-market SaaS client is migrating billing platforms. A steering committee — CFO, VP Revenue, and IT — has to sign off on proration logic, a data-retention boundary for the old system, and a go-live date tied to a fiscal quarter close. Each decision gets raised the moment the delivery team hits it, one email or one Slack thread at a time, as it comes up.

### Where it breaks

By week four, all three decisions are pending simultaneously, and none of them individually looks urgent enough to interrupt anyone's calendar for. The CFO is also sponsoring two other initiatives this quarter, so utilization on that one seat of attention is already near capacity before this project asked for anything (Kingman). The project sponsor, worried about looking behind, has been softening the framing each time — "just a quick question" rather than "this blocks go-live" — so the true cost of delay never reaches the CFO in an undistorted form (Weinberg). Meanwhile the arrival rate of new decisions into that queue hasn't slowed down, so WIP keeps climbing (Little's Law) — until three blocked workstreams collide in the same week and the fiscal-quarter go-live date is suddenly at risk.

### The fix

Nothing about the fix requires the CFO to become more available. It requires redesigning the queue: batch the three decisions into a single steering packet delivered on a fixed biweekly cadence instead of as ad hoc asks (lowers λ and reduces Kingman's arrival variability). Attach a recommendation and a dollar-quantified cost-of-delay to each item so the real stakes survive the trip up the hierarchy undistorted (directly answers Weinberg's information-distortion problem). And name a single accountable decision owner per packet, so responsibility for clearing the queue doesn't diffuse across three people who each assume someone else has it.

## Put this into practice

Before your next steering-committee update, ask three questions: how many decisions are genuinely sitting in that queue right now, how saturated is the person who has to clear them across every commitment they're holding — not just yours, and how accurately does the real cost of delay actually reach them. Run your current engagement through the [Stakeholder Decision Stall Checklist](/stakeholder-decision-checklist) to get a plain answer on which of the three you're actually dealing with.

This is the pattern I run into most often doing presales and delivery architecture for subscription and SaaS system integrations — the technical build rarely stalls, the decision chain above it does. If a client engagement is stuck on something that looks like "the client is slow" and you suspect it's actually a queue problem, [get in touch](/contact). For the underlying formulas, start with [8.1 Little's Law](/four-laws-complex-system-design-full#s81) in the Full Reference, or try the [Flow Formula Calculator](/flow-formula-calculator) directly.
