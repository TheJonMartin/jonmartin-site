---
title: "Module 12: Requirements Drift in Delivery"
description: "What happens after discovery when new statements arrive and L2 is treated as optional."
seoTitle: "Module 12 | Requirements Altitude"
group: delivery
order: 30
draft: false
---
Everything so far is calibrated to initial discovery. But altitude confusion doesn't end at kickoff — it recurs constantly during delivery, usually disguised as something else: scope creep, a change order dispute, a stakeholder who feels like something obvious got missed.
## The Same Failure Patterns, Later in the Timeline
- A stakeholder mentions something mid-project that sounds like a casual aside (L0/L1 — "oh, we also need to handle refunds differently for that segment") and it gets either waved off (blindness, recurring) or immediately spelunked into a change order before anyone's confirmed whether it's actually new (spelunking, recurring).
- A change request gets bridged and confirmed too quickly under delivery time pressure — "yeah, we can just add that" — without the same rigor applied during discovery (overuse, recurring), and it turns out to conflict with an earlier confirmed requirement nobody cross-checked against.
## The Discipline Doesn't Change, Only the Trigger
The same Step 0 → altitude ladder → bridge discipline from discovery applies here. The only real difference is the trigger: instead of a scheduled discovery call, the trigger is any moment during delivery when a stakeholder says something that sounds like new information.
## The Delivery-Specific Addition: Cross-Checking Against the Existing Document
Because a requirements document already exists by delivery time ([Module 10](/altitude/module-10)'s output), every new statement during delivery should be checked against it before being bridged: does this contradict an existing confirmed L2 statement? Does it clarify a topic left provisional or conflicted? Or is it genuinely new? That check is the one addition this phase requires.
## Worked Example (Composite)
Three weeks into delivery, Marcus mentions offhand in a status call: "Oh — sometimes we restructure an annual deal into a multi-year contract mid-term, does the sync handle that?" This sounds like a small aside, but checked against the existing requirements document, the confirmed L2 ("sync on Closed Won") only ever addressed net-new deal closes — mid-term contract restructuring was never in scope, and nothing in the document contradicts or confirms how it should behave. Rather than either dismissing it (blindness, recurring) or immediately promising to add it as a same-day change (overuse, recurring), the practitioner logs it as genuinely new, cross-checks it doesn't conflict with the reconciliation requirement, and routes it through a proper bridge and change-scoping conversation.
*Next: [Module 13](/altitude/module-13) — Capstone.*
---
