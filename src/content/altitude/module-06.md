---
title: Module 6: The Advisory Layer — When a Correct Requirement Is the Wrong Requirement
description: "Vertical traceability: a confirmed L2 can still fail the L0 it is supposed to serve."
seoTitle: "Module 6: The Advisory Layer | Requirements Altitude"
group: core
order: 60
draft: false
---
Every module so far has treated the practitioner as a faithful translator: capture accurately, level correctly, bridge honestly, flag conflicts. That's necessary, and it's most of the job. But it isn't all of it.
A solution architect is not a stenographer. There is a category of failure the entire preceding framework will not catch, because the framework is designed to test whether a requirement is *well-formed* — not whether it is *right*.
### The Stenographer Failure
**What it is:** an L2 statement that passes every test in this guide — properly constructed, confirmed by a stakeholder with standing, no conflicts, correctly bridged from real L0/L1 material — and is still the wrong thing to build.
**Why the framework can't catch it:** the preceding modules evaluate the *process* by which a requirement was produced. A requirement can be produced correctly and still solve the wrong problem, because the client's own reasoning between their L0 and their L2 was flawed, and the practitioner faithfully transcribed that flaw at higher resolution.
**Why it's insidious:** unlike the three failure modes in [Module 4](/altitude/module-04), this one leaves behind a clean paper trail. Every artifact looks right. The requirements document is well-formed, well-attributed, well-flagged. When it surfaces later — as a build that works exactly as specified and doesn't solve the client's actual problem — the documentation will show that the practitioner did everything correctly. Which is true, and beside the point.
### The Vertical Traceability Check
The ladder isn't only a classification tool. It's also a **validation** tool, and this is its second use: every level should genuinely justify the one below it.
For each topic, ask downward:
- Does this L2 statement actually achieve the L0 outcome it's attached to? Or does it address a symptom of that outcome while leaving the cause untouched?
- Does this L2 contradict any *other* confirmed L2 elsewhere in the document?
- Is the L1 process this L2 supports one that should itself be changed, rather than automated as-is?
- Is the cost of this L2 proportionate to the value of the L0 it serves?
A "no" to any of these doesn't mean the requirement was captured wrong. It means the requirement was captured right and warrants a conversation.
### Five Patterns Worth Recognizing
**1. Symptom, not cause.** The L2 addresses the visible pain in the L0 without touching what produces it. Billing errors get a validation layer bolted on, when the errors originate upstream in how deals are structured at close.
**2. Automating a broken process.** The L1 process description is accurate, and the process itself is the problem. Building a system to execute a bad workflow faster produces a faster bad workflow — and makes the underlying process harder to change later, because now it's encoded. **In consulting work this is one of the most common and most expensive versions of the stenographer failure**, because clients rarely present process dysfunction as a problem; they present it as context.
**3. Pre-baked solutions arriving as requirements.** The client walks in having already chosen a solution — a vendor, an architecture, a specific mechanism — and presents it as an L2 statement. It's often well-formed and confidently stated. The tell is the missing ladder underneath: ask for the L0 and L1 it derives from, and either they can't produce them, or the ones they produce don't actually lead to that solution.
**4. Disproportionate cost.** The L2 is correct and would work, and the effort to build it is wildly out of proportion to the L0 value at stake. Not the practitioner's decision to make unilaterally — but absolutely the practitioner's obligation to surface, because the client usually cannot see the cost curve from where they're sitting.
**5. Internal contradiction.** Two confirmed L2 statements, both properly attributed, that can't both be true in the same system. Distinct from the stakeholder conflict covered in [Module 7](/altitude/module-07): there, two people disagree. Here, the *requirements* disagree, and possibly nobody has noticed — including the stakeholders who confirmed each of them separately.
### Raising It Without Burning Trust
The technique matters as much as the observation, because this conversation carries real relationship risk: handled badly it reads as the consultant second-guessing the client's understanding of their own business.
**Anchor to their own L0, not your judgment.** The move is not "I think this is wrong." It's "help me connect this back to what you said you're trying to achieve" — using their own stated outcome as the standard. If the L2 genuinely doesn't serve their L0, they will usually see it themselves once the two are placed side by side. This is the single highest-leverage phrasing in the module.
**Ask before asserting.** "What happens if we build exactly this — does the renewal problem go away?" invites them to run the trace themselves. It also protects you against the real possibility that they know something you don't and the requirement is fine.
**Separate the observation from the recommendation.** Naming a gap ("this addresses the errors after they occur, not where they originate") is different from prescribing an alternative. Lead with the gap. Let them ask for the recommendation — and they usually will.
**Time it deliberately.** Mid-discovery, while material is still accumulating, is usually too early; you may be missing context. The natural moment is at review, when the leveled document exists and the trace can be shown rather than argued.
### The Limits of the Advisory Role
**You are advising, not deciding.** The same standing logic from [Module 7](/altitude/module-07) applies to you: you have standing on feasibility, cost, technical consequence, and internal consistency. You generally do not have standing on business strategy, organizational priorities, or political constraints you can't see. A client may hear you fully, understand the trade-off, and choose the requirement anyway for reasons that are entirely valid and entirely invisible to you.
**When they decline, log it and proceed.** The requirement stays in the document, correctly captured, with the concern recorded alongside it — not as a defensive artifact, but because if circumstances change later, the reasoning needs to be recoverable. This is the origin of the **`advised`** status flag in [Module 10](/altitude/module-10)'s document structure: captured, confirmed, concern raised and acknowledged, proceeding as specified.
**Don't advise on everything.** Every challenge spends credibility. A practitioner who questions every requirement is not rigorous, they're exhausting, and their genuinely important objections get discounted along with the rest. Reserve this for cases where the trace failure is material — where building as specified would meaningfully fail to deliver the L0.
### Why This Belongs in the Curriculum
The three failure modes in [Module 4](/altitude/module-04) are mistakes anyone can make. The stenographer failure is different: it's the specific failure of someone who has learned this framework well. A practitioner who masters the preceding modules becomes very good at producing well-formed requirements — and that competence is exactly what makes it easy to stop asking whether the well-formed requirement is the right one. **This module is the guard against the guide's own success.**
### Worked Example (Composite)
**The confirmed L2:** "When a deal is marked Closed Won in Salesforce, the billing system must automatically create a subscription reflecting the approved plan, price, discount, and start date."
**Where vertical traceability catches something:** Later, Priya (IT) mentions that Finance sometimes edits billing terms directly in the billing system after close, for true-ups and corrections. That reveals the confirmed L2 rests on a false premise — Salesforce isn't the single source of truth Sarah assumed it was. A one-way "auto-sync on close" would solve the manual re-entry problem but wouldn't touch the actual source of the invoice disputes, which happen when post-close corrections in billing drift out of sync with Salesforce. Automating the current one-way assumption would encode the wrong architecture (Pattern 2 — automating a broken process) without fixing what's actually driving the L0 pain.
**How it's raised:** "Help me connect this back to the renewal problem — if we build a one-way sync and Finance is still editing billing directly afterward for true-ups, would the invoice disputes actually go away, or would we just move where the mismatch happens?" Sarah pauses, then agrees: the real requirement is two-way reconciliation, not one-way sync. The L2 statement is revised before it ever reaches scoping.
*Next: [Module 7](/altitude/module-07) — Multi-Stakeholder Altitude Mapping.*
---
