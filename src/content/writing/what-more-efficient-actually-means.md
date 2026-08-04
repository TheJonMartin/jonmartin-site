---
title: '"I Want to Make Processes More Efficient" — What That Actually Means'
description: 'Operations is variety management, not efficiency work — four systems laws (Ashby, Conway, Brooks, Reverse Conway) that make an ambiguous job definable.'
pubDate: 2026-08-04
draft: false
tags: ['Systems', 'RevOps']
---

Someone reached out to me recently who is exploring operations roles. Their question was honest in a way most career questions aren't:

> I would really want to focus on making processes more efficient, and can't seem to figure out how to define it, as operations positions are so wide. Is this similar to what you are doing?

Yes. And also: the reason the field feels impossible to define is that the phrase "more efficient" is doing too much work. It hides the actual variable.

Here is how I'd answer it, using four systems laws I keep coming back to.

## Ashby: you're not managing efficiency, you're managing variety

Ashby's Law of Requisite Variety says that a control system must have at least as much variety as the thing it's trying to control. If your customers can generate forty kinds of situation and your process can handle twelve, the other twenty-eight leak out as escalations, spreadsheets, Slack threads, and someone named Rachel who "just knows how to handle those."

That's the real definition of the job. Operations is variety management.

Once you see it that way, "make this more efficient" stops being vague, because Ashby gives you exactly two levers:

1. **Reduce the variety coming in.** Fewer SKUs. Fewer contract terms. Standardized discount tiers. A quote form that won't let sales invent a new billing frequency on a Tuesday.
2. **Increase the variety of the regulator.** Better tooling, automation, clearer decision rights, more skilled people, more decisions pushed to the edge instead of up the chain.

Most people who say they want to improve processes are reaching for lever two, because it feels productive and doesn't require telling anyone no. Lever one is usually cheaper, faster, and far more politically expensive. Knowing which lever a given organization will actually let you pull tells you more about the job than the job description does.

And notice what's missing from both levers: "work harder" and "document it better." Documentation doesn't add variety. It just describes the gap.

## Conway: the process you were hired to fix is a picture of the org chart

Conway's Law: organizations produce designs that mirror their own communication structures.

It was written about software, but it's more obviously true of business process than of code. The reason quote-to-cash takes nine days isn't that anyone is slow. It's that quoting lives in sales, approval lives in finance, provisioning lives in delivery, and invoicing lives in accounting — so the process has four handoffs, because the company has four teams. The handoffs are the org chart. You are looking at a diagram of who talks to whom, rendered as a workflow.

This is the single most useful thing I know for a new ops person, because it reframes what you're actually looking at when you map a process. Every queue, every "waiting on approval," every re-keyed field between systems marks a boundary between two groups of people who don't share a manager, a metric, or a lunch table.

It also explains why process improvement projects so often produce a beautiful new SOP that nobody follows. The SOP asked people to communicate in a pattern the organization isn't shaped for. The org chart won.

## Brooks: the reflex fix makes it worse

Brooks's Law: adding people to a late project makes it later. Communication paths grow roughly as n(n-1)/2, so every new person adds coordination cost faster than they add capacity.

The operations version of this shows up constantly. A process is straining, so the company hires a coordinator to manage the handoffs. Now there are five parties instead of four, and the new person's entire job is absorbing variety by hand — which means the variety never gets designed out, it gets staffed around. A year later the coordinator is indispensable, undocumented, and the actual bottleneck.

Brooks is the reason "just add headcount" is not the same as "increase regulator variety." Sometimes more people genuinely help. But if the constraint is coordination rather than throughput, more people is a tax, not a fix.

## Reverse Conway: the lever most people never reach for

If structure produces process, then the way to change process is to change structure. That's the Reverse Conway Maneuver: deliberately reshape team boundaries so the system you want becomes the natural output.

Give one team end-to-end ownership of quote through first invoice, and the four handoffs collapse — not because anyone optimized them, but because they stopped being handoffs. The seam disappeared when the boundary moved.

This is the highest-leverage move in operations and the one most operations people can't make, which brings me to the part that matters most for anyone evaluating these roles.

You often won't control team boundaries. I do a lot of my work as an external designer — I'm brought in to fix the system, not to redraw the org. When the Reverse Conway lever isn't available, you're back to Ashby's two levers, and the honest thing to do is say so out loud: this constraint is structural, here's what it costs you annually, and here's the best system I can build inside it. That sentence is worth more than any workflow diagram. Naming a constraint you can't remove is not failure. Pretending you can automate around it is.

## A note on Beer's VSM

If you want a fuller model of how an organization stays viable under all this, Stafford Beer's Viable System Model is the natural next step. It isn't a fifth law on equal footing — it's an operationalization of Ashby's second lever at the organizational level, showing where variety gets absorbed, where it should be amplified, and which parts of a business are responsible for adaptation rather than execution. Worth reading once you've got the four laws in your hands.

## So how do you define the role?

Not by function. By which lever you'll be allowed to pull. Three questions I'd ask in any operations interview:

**"When a process breaks here, does the fix usually come from changing the tooling, changing the rules, or changing who owns what?"** That tells you whether the role lives in Ashby, Ashby again, or Reverse Conway.

**"Who can say no to a non-standard deal?"** Variety reduction requires someone with authority to refuse inputs. If nobody has that authority, you'll be permanently downstream, absorbing variety by hand.

**"Where is work waiting?"** Not where it's slow — where it's waiting. Every wait state is a team boundary. Ask what's on either side of it.

So, to answer the original question directly: yes, this is what I do. But I'd stop describing it as making processes more efficient. It's deciding what variety a business should absorb, what it should refuse, and whether the answer requires new tooling or a redrawn boundary. That's a definable job. "Efficiency" isn't.
