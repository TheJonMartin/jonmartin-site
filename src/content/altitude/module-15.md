---
title: "Module 15: Applying the Framework to Written and Asynchronous Sources"
description: "The same diagnostic on decks, tickets, Slack threads, and recorded walkthroughs."
seoTitle: "Module 15 | Requirements Altitude"
group: reference
order: 20
draft: false
---
Everything so far assumes a live conversation where a bridge statement gets an immediate answer. RFPs, requirement questionnaires, existing documentation, and email threads don't work that way — there's no live moment to say "is that right?" and get a response.
**What doesn't change:** the ladder. Every sentence in an RFP or email still has an altitude, and Step 0 still applies — a requirement stated by procurement carries different standing than the same line from the actual system owner buried in an appendix.
**What does change:** the bridge becomes a written loop instead of a spoken exchange, and it has to be batched rather than continuous.
**The written-source pass:**
1. Tag the entire document first, pure classification, no bridging yet — this surfaces the shape of what you're dealing with before you commit to specific follow-ups.
2. Group L0/L1 material by topic, the same way live discovery groups it into threads.
3. Draft written bridge statements for every topic that has enough material to justify one — batched into a single follow-up (questionnaire, email, or a scheduled call), not sent as they're discovered.
4. Explicitly flag anything that reads as L2 or L3 in the source document but has no visible L0/L1 justification — RFPs in particular are full of specific-sounding requirements with no visible reasoning behind them, which is detail spelunking baked into the source material before you ever touched it.
**A written-source-specific risk:** an RFP requirement that sounds precise (L2/L3-shaped) often originates from a template, a competitor's spec, or a consultant who wrote the RFP without full context — not from an actual stakeholder with standing. Treat RFP language as provisional by default until a real stakeholder confirms it, even when the wording sounds authoritative.
## Worked Example (Composite RFP Excerpt)
> *3.2 Billing Integration: The proposed solution must support automated synchronization of subscription terms between the CRM and billing platform.*
> *3.2.1 The system shall support multi-currency invoicing for international subsidiaries.*
> *3.2.2 The system shall provide role-based approval workflows for discount thresholds exceeding 15%.*
**Tagging:** 3.2 reads L2-shaped but has no visible L0/L1 behind it in the RFP itself — provisional until a real stakeholder confirms why. 3.2.1 is a genuine, standalone L2 (and matches the multi-currency pattern from [Module 9](/altitude/module-09)'s domain watch points — likely a coverage gap nobody else on the eventual call will know to raise). 3.2.2 is L2, and worth checking directly against whatever Sales Ops says about discount authority, since RFP language like this is sometimes written by procurement without Sales Ops ever having weighed in.
**Batched follow-up questions this generates:** "Section 3.2 mentions automated sync — can you walk us through what's driving that today, and who owns billing accuracy on your side?" "Section 3.2.2 mentions a 15% threshold — who set that number, and does Sales leadership agree with it?"
*Next: [Module 16](/altitude/module-16) — Recovery, for when gaps are discovered after discovery is already over.*
---
