---
title: "Module 5: The L2 Bridge Rule"
description: "How to construct the missing-middle sentence, when to deploy it, and the overuse guardrail."
seoTitle: "Module 5: The L2 Bridge Rule | Requirements Altitude"
group: core
order: 50
draft: false
---
Everything in this guide compresses into one operating rule:
> **No L3 question is permitted on a topic thread until an L2 bridge statement exists for it — no topic thread is considered closed at L0/L1 without a deliberate attempt to construct one — and no bridge attempt should be made before enough L0/L1 material exists to justify it.**
This rule prevents all three failure modes simultaneously: spelunking skips past L2 on the way down, blindness never reaches it on the way up, and overuse forces it before it's earned. All three are the same underlying gap — the absence of a properly earned, authored L2 statement — approached from three different directions.
## What a Bridge Statement Actually Is
A bridge statement is a sentence **you construct and offer back to the client for confirmation.** It is not something you wait to hear — it is something you build from L0/L1 material and test out loud.
Structure: *"So it sounds like \[system/process\] needs to be able to \[specific capability\] — is that right?"*
The client's response does one of three things:
- **Confirms it** — you now have a real L2 statement, and L3 questions on this thread are earned.
- **Corrects it** — often more valuable than a confirmation, because the correction itself is usually a sharper L2 statement than your first attempt.
- **Reveals it's not actually a requirement at all** — the pain point doesn't translate into a system need, which is itself important scoping information.
## The Overuse Guardrail
A bridge attempt should follow enough L0/L1 material to justify it — not be deployed reflexively at every opportunity. If you can't point to at least one or two concrete L0/L1 statements the bridge is synthesizing, it's likely premature, and a confirmed answer at that point is closer to a guess than a requirement.
## Stakeholder Attribution in Bridge Statements
When multiple stakeholders are in the room, a bridge statement should name whose position it's synthesizing, especially if departments have offered conflicting L0/L1 material: *"It sounds like Ops needs X — does that match what Finance needs too, or is there a difference there?"* This forces the L2 statement to be honest about whose requirement it actually is, and surfaces stakeholder conflict at the moment it's cheapest to resolve.
## When to Deploy It
Deploy a bridge attempt when:
- A topic has generated meaningful L0/L1 material and the conversation is naturally pausing or shifting
- You notice yourself tempted to ask an L3 question (a signal a bridge is due first)
- A call is ending and you do a final pass across every major topic discussed
## Worked Example (Composite)
**L0/L1 material:** Sarah — "Billing errors are costing us renewals." / "Someone re-keys deal terms by hand when a deal closes." Marcus — "We don't have visibility once a deal closes."
**Bridge offered:** "It sounds like when a deal is marked Closed Won, the billing system needs to automatically pick up the plan, price, discount, and start date, rather than someone re-keying it — is that accurate?"
**Response:** Sarah confirms, then adds a correction: "Yes — and it needs to flag anything where the discount is above our approval threshold, not just sync blindly." That correction is sharper than the original bridge, and becomes the real L2: automatic sync **plus** an approval-threshold flag, not automatic sync alone.
*Next: [Module 6](/altitude/module-06) — The Advisory Layer, and what to do when a correct requirement is the wrong requirement.*
---
