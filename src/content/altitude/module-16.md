---
title: Module 16: Recovery — Closing Gaps After the Fact
description: "What to do when you notice a missing L2 after discovery is already supposed to be over."
seoTitle: "Module 16: Recovery | Requirements Altitude"
group: delivery
order: 40
draft: false
---
Everything through [Module 14](/altitude/module-14) is preventive. This module is for when prevention already failed — you're in scoping, or worse, in a kickoff, and you notice a topic has no real L2 behind it.
**First move: don't guess forward.** The instinct under time pressure is to write a plausible L2 statement yourself and move on. This is bridge overuse under a different trigger — a confirmation that was never actually offered to the client for correction. Resist it.
**The reconstruction technique.** Often you have L1 narrative and scattered L3 detail, but the L2 that should connect them was never authored. Work backward: given the process and the details that exist, what L2 statement would make both of them make sense? Draft it — but treat this draft as unconfirmed, not as a discovered fact.
**The recovery bridge.** Take the reconstructed L2 back to the client explicitly, and say so: *"Looking back at what we discussed, I want to confirm something we may not have nailed down — it sounds like the system needs to X. Is that accurate?"* Naming that it's a gap being closed, rather than presenting it as settled, protects the relationship and gets a more honest answer.
**Triage when there isn't time to recover everything.** Not every gap is equally urgent. Prioritize by:
- Topics with L3 detail already committed to a build (highest risk — work is happening against an unconfirmed requirement)
- Topics with conflicting stakeholder signals ([Module 7](/altitude/module-07)) that were never resolved
- Everything else, which can often wait for the next natural touchpoint
**What this is not:** a license to skip the discipline in Modules 1–9 because "I can always recover it later." Recovery costs more than prevention — it requires re-opening a topic the client may have believed was closed, which spends trust that a well-run discovery call wouldn't have needed to spend.
### Worked Example (Composite)
At requirements review, three weeks after discovery closed, the practitioner notices there's no confirmed L2 for how a caught billing error actually gets corrected — even though "billing errors" was the original L0 pain Sarah named. Working backward from scattered L1/L3 notes, a candidate L2 is reconstructed: "When a billing error is identified, Finance must be able to void and reissue the affected invoice directly within the new system, without a manual workaround." This is taken back to Sarah explicitly as unconfirmed: "Looking back over our notes, I want to check something we may not have nailed down — it sounds like Finance needs to be able to void and reissue an invoice directly when an error is caught, rather than working around it manually. Is that accurate?" Sarah confirms, with one addition: reissued invoices need an audit trail for compliance — which becomes part of the now-properly-bridged L2.
*Next: [Module 17](/altitude/module-17) — Special Conditions.*
---
