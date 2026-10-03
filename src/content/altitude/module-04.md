---
title: "Module 4: The Three Failure Modes, In Depth"
description: "Detail spelunking, altitude blindness, and bridge overuse — and why all three feel like progress."
seoTitle: "Module 4 | Requirements Altitude"
group: core
order: 40
draft: false
---
[Module 1](/altitude/module-01) named the core problem. This module gives you the specific tells for each of the three ways it manifests — the moments, in a live conversation, where you can catch yourself starting to drift into one of them.
### Detail Spelunking
**What it looks like from outside:** thorough, engaged, technically fluent. The practitioner is asking sharp, specific questions and the client is often impressed by how technical the conversation has gotten.
**What's actually happening:** the practitioner has followed an L3-shaped detail down before establishing the L2 statement it belongs to. The questions are specific, but nobody could say what requirement they're in service of.
**Tells, in the moment:**
- You realize you've been asking about a mechanic (a field, a config option, an edge case) for several minutes and couldn't state, if asked, the one-sentence requirement it supports.
- The client offers a random, colorful detail (a weird historical workaround, an exception process) and you find it genuinely interesting — interesting enough to keep pulling the thread regardless of whether it's central to scope.
- You're taking rapid, detailed notes and feeling productive, but if you tried to summarize the last five minutes in one sentence, you couldn't.
**The correction:** stop and ask yourself the L2 test from [Module 2](/altitude/module-02) — could two engineers agree on scope from what's been said so far? If not, back up a level before continuing down.
### Altitude Blindness
**What it looks like from outside:** attentive, warm, client-centered. The practitioner is letting the client talk, following their narrative, building rapport.
**What's actually happening:** the conversation is accumulating L0/L1 material at length, and no one — practitioner or client — is doing the work of translating any of it into an L2 statement. The rapport is real. The requirements aren't.
**Tells, in the moment:**
- The client has been talking for several minutes about goals or process, it's all been relevant and well-received, and you notice you haven't asked a single question that would narrow it toward a specific system capability.
- You feel good about how the call is going — which is itself sometimes the tell, because a call that's producing L2 statements often feels more effortful, not more pleasant, than one that's staying comfortably at L0/L1.
- Looking back at your notes, every line is a paraphrase of something the client said, and none of them are sentences *you* constructed.
**The correction:** deliberately author a candidate L2 statement out loud — "so it sounds like the system would need to X — is that right?" — and let the client confirm or correct it. This is the bridge move, and it's the entire subject of [Module 5](/altitude/module-05).
### Bridge Overuse
**What it looks like from outside:** rigorous, disciplined, on-script. The practitioner is visibly "doing the framework" — checking in, confirming, bridging constantly.
**What's actually happening:** the L2 Bridge Rule has been applied mechanically rather than judiciously. A bridge attempt is being deployed after nearly every statement, regardless of whether the topic has actually generated enough L0/L1 material to justify one. The client starts answering bridge questions just to keep the conversation moving, not because they've actually thought it through — and those rushed answers get recorded as confirmed L2 statements when they're closer to guesses.
**Why this is a distinct failure, not just "trying too hard":** it produces the same downstream symptom as blindness — an L2 statement that doesn't hold up under later scrutiny — but it looks like the opposite problem. A reviewer checking "does this document have L2 statements?" will find yes, plenty, and conclude the discovery was thorough. The defect is invisible until someone tries to actually scope against one of these over-hasty confirmations and the client says "wait, that's not really what I meant."
**Tells, in the moment:**
- You've bridged three or four times in the last five minutes, and the client's answers are getting shorter and more automatic ("yeah, sure, that works") rather than more considered.
- You catch yourself bridging out of momentum or habit rather than because you're actually unsure whether an L2 statement exists yet.
- The client seems to be deferring to your phrasing rather than actively shaping it — a real bridge exchange usually involves at least a small correction; a string of unmodified confirmations is itself a signal.
**The correction:** the Bridge Rule permits a bridge once enough L0/L1 material exists — it doesn't require one the instant it's possible. Before bridging, check: has this topic actually generated a real committed position, or am I bridging because the rule says I should?
### Why All Three Feel Like Progress
Spelunking feels like rigor. Blindness feels like rapport. Overuse feels like discipline. All three produce visible, plausible output. The common thread across all of them is the habit of checking the *quality* of an L2 statement, not just whether one exists: is it actually earned by enough material, actually specific enough to scope, and actually the stakeholder's considered position rather than a reflexive yes?
### Worked Examples (Composite — Northfield Analytics)
**Spelunking, illustrated:** After Sarah mentions billing errors, a practitioner without discipline immediately asks: "Is that a proration issue, or a plan-mapping issue? What billing system are you on? Do you use custom fields for discount tracking?" — three L3-shaped questions in a row, no L2 established. Five minutes later, the practitioner has detailed notes on the billing platform's field structure and still can't state, in one sentence, what Sarah actually needs built.
**Blindness, illustrated:** Sarah, Marcus, and Dana all talk for ten minutes about the renewal problem — frustrated customers, disputed invoices, the AE handoff process. It's a great conversation. The practitioner has three pages of accurate notes and hasn't yet said a single sentence back to the room. Nothing in those three pages is buildable yet.
**Overuse, illustrated:** After just one sentence from Marcus ("reps sometimes need same-day discount flexibility"), the practitioner immediately bridges: "So it sounds like the system needs an unlimited manual override on any discount at any time — is that right?" Marcus, caught off guard, says "uh, sure, I guess." That rushed, under-specified confirmation gets recorded as an L2 — and later turns out to directly contradict Sarah's approval-matrix requirement, because it was never actually thought through.
*Next: [Module 5](/altitude/module-05) — The L2 Bridge Rule, with the overuse guardrail and stakeholder attribution.*
---
