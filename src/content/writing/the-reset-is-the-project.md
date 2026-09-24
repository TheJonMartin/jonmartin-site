---
title: "The Reset Is the Project"
description: "Scope resets aren't vendor failure. They are what happens when a signed L2 requirement is quietly renegotiated in Slack, UAT, and one more edge case."
seoTitle: "The Reset Is the Project — Jon Martin"
pubDate: 2026-09-24
draft: false
tags: ['Systems', 'RevOps', 'Client Delivery']
category: 'Client Delivery'
---

![The Reset Is the Project](/images/writing/the-reset-is-the-project.svg)

They signed sixty percent of the scope. They kept one hundred percent of the picture in their head.

Discovery had gone well. There was a recap. There was even a short list of confirmed L2 requirements — the missing middle from [the last note](/writing/missing-middle-discovery), authored and tagged, not just a pile of pain. Build started. Then came a few edge cases. Then another. Then someone said "while we're in there." By week six the team was rebuilding decisions that had already been made, and nobody could point to the meeting where the ruler changed.

Reset one was treated as thoroughness. Reset two was the project.

## This is not the missing middle again

[The missing middle](/writing/missing-middle-discovery) is a discovery failure. A usable requirement never got written, so scoping had to invent it, or the SOW quoted the pain and hoped delivery would figure it out.

Drift is what happens after the middle exists on paper and still dies.

The L2 requirement was authored. The person Responsible for that requirement confirmed it. Then the statement moved — in a Slack thread, an email, in UAT, in a working session that produced no artifact — and the original sentence was treated as still the requirement. The work already done did not pause. It got replaced.

That is a different defect. Listening harder will not catch it. Another discovery workshop will not catch it. You already had the requirement. You let it become folklore.

## Four cheap-looking moves that produce an expensive reset

The failures do not look like failures while they're happening. That is the point, same as altitude blindness. Each one looks like delivery doing its job.

**An edge case promoted to a new requirement.** Someone finds an additional sales process, a mid-term seat change, a grandfathered subscription structure. Useful. Necessary, even. It gets built as if it were already in the L2 requirements. It was not. An L3 surprise just rewrote the map without anyone stopping to agree the map had changed.

**Someone who is not Responsible amending a requirement the Responsible person already confirmed.** Finance confirmed the billing rule. Three weeks later a sales manager adjusts it in a working session because "that's not how we actually sell." The builder hears a client. The original confirmation is still in the brief. You now have two L2 requirements and one build. Consulted is not Responsible. Informed is not Responsible. The [communication matrix](/writing/stakeholder-communication-matrix) already draws that line. Drift ignores it.

**"While we're in there."** Adjacent work gets pulled into the current build because the hood is already open. It feels efficient. It is a new scope with the old estimate attached. The project did not slip. The scope got bigger and nobody agreed to it.

**Silence between signature and first build week.** The SOW is signed. The kickoff is two weeks out. In the gap, memory replaces the artifact. Kickoff opens with a slightly different story than the one that was confirmed. No one notices, because the story is close. Close is how drift starts.

A practical test for all four:

> Could I hand the current build to the original L2 requirements list and have them agree?

If the honest answer is "not without a conversation," you are not iterating. You are restarting under a friendlier name.

## What a reset actually destroys

None of this shows up as a line item. All of it is in the timeline.

**The work.** Decision three does not build on decision two. It replaces it. Configuration that was finished becomes archaeology.

**The reasoning.** By reset three, nobody remembers why reset one happened, what drove it, or why it was needed. You cannot learn from a decision whose cause has been overwritten.

**The pace.** People who have been burned twice stop building at full speed. They hedge. Why finish something that might get scrapped next week.

**The relationship.** Whoever is building it starts bracing for the next reset instead of trusting the current plan. That bracing is rational. It is also how a six-week engagement becomes a twelve-week one without anyone agreeing to twelve weeks.

The software was never the expensive part. The restarts are.

If you have reset scope more than once, the problem is usually not the vendor or the tool. It is that signed scope and remembered scope diverged, and nobody was assigned to notice.

## Why this is a systems problem, not a change-order problem

[Ashby](/four-laws-complex-system-design-full#s21) says the regulator has to match the variety of the thing being controlled. An L2 requirements list is a variety filter. Drift is unregulated variety walking back in through the side door — the same door discovery was supposed to have closed. A change-order process that only fires when someone says the word "change" will miss it. Drift almost never introduces itself as a change. It introduces itself as a clarification.

[Conway](/four-laws-complex-system-design-full#s22) is why the Responsible row still matters after the call. The org that could not agree in discovery cannot hold agreement in delivery either. Finance and sales ops will keep drawing the process from their own side of the boundary. If you let the louder room in week four overwrite the Responsible person from discovery, you have redesigned the system to a communication structure that the SOW does not describe.

This is also why "be more agile" does not fix a reset pattern. Agility without a ruler is just permission to start over. The discipline is not refusing change. It is refusing to pretend the scope hasn't changed.

## What to do Monday

No scope change is real until it is written as a new or amended L2 requirement, tagged with who is Responsible, and held against the original L2 requirements list.

Three checks, in order:

1. **Is this the same sentence, a narrower sentence, or a different sentence?** Same: keep building. Narrower: note the constraint, do not reopen the parent. Different: stop and write it.
2. **Who is Responsible for this?** If the speaker is not the Responsible person on that L2 requirement, they cannot amend it alone. Consulted can correct a fact. They cannot change the sentence.
3. **Did the coastline get longer?** If you cannot answer that in one sentence, you are not scoping. You are restarting.

After any working session that touched behavior, update the L2 requirements list the same day — the same close-out rule as discovery. Memory is not a requirements system in week one. It is not one in week six either.

The middle was missing because nobody was assigned to build it. Drift happens because nobody is assigned to keep it. Assign yourself.
