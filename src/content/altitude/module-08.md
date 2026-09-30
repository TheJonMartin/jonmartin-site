---
title: Module 8: Practice Drills
description: "Tagging, translation, live-fire, and conflict-mapping drills with worked transcripts."
seoTitle: "Module 8: Practice Drills | Requirements Altitude"
group: practice
order: 10
draft: false
---
The goal of these drills is to move the diagnostic ([Module 3](/altitude/module-03)) and the bridge rule ([Module 5](/altitude/module-05)) from something you apply deliberately to something that runs in the background.
### Drill 1 — Tagging
**Setup:** A real (sanitized), multi-stakeholder discovery-call transcript, broken into individual statements.
**Task:** Tag every statement's altitude (L0–L3) and source/speaker, using the ladder from [Module 3](/altitude/module-03).
**Check:** Compare against an answer key. Disagreements are the valuable part.
This drill now has three worked transcripts below: one sanitized from an actual client working session, and two reconstructed from real meeting notes.
### Worked Example — Sanitized Real Transcript (Drill 1 Candidate)
**Source note:** derived from an actual client discovery/architecture call, anonymized — company, people, and internal tool names replaced; personal conversation and scheduling logistics removed; substantive discussion preserved and lightly condensed.
**Scenario:** Meridian Tax Advisory (bookkeeping/tax services for startups) is mid-project on a contracts and billing system rebuild. Attendees: **Andre Silva** (Client PM/Operations Lead), **Devon Osei** (Client Integration Lead), **Miguel Torres** (Client Finance Ops), **Jenna Marsh** (Lead Consultant), **Casey Moreno** (Solutions Architect).
---
**Jenna:** I did meet with a couple of the other stakeholders earlier and they brought up architecture questions I think will eventually impact this project. My concern is if there's something we need to change architecturally, we should do it now rather than visit them too late in the process.
**Andre:** Understood — just make sure I'm looped in on anything that gets raised.
**Jenna:** The biggest gap right now is there's no true written sales process documented. We're validating what we've designed against gaps, not starting from scratch.
**Andre:** From lead to deal to deposit — we have that framework documented. There shouldn't be questions on the mechanics.
**Jenna:** We have parts of it, but there are probably gaps we don't know about since the process has changed hands a few times. That's where the validation comes in — us not guessing.
*Tagging note: Andre's statement is L1, stated with more confidence than the actual documentation supports — Jenna's response is a standing/provisional check, not yet a conflict.*
**Jenna:** Let me give you a quick example of why this matters even though it's technically upstream of scope. We get a company — they're a prospect, then they start a new company mid-funnel, and people are taking those records and merging them into new ones. You lose the history of where the original one started.
**Andre:** They don't create multiple accounts multiple times a day. That's way overstated.
**Jenna:** They told me it happens multiple times a day, which is why I flagged it.
**Andre:** All right, we'll talk about it when we get to it.
*Tagging note: a real, unresolved disagreement on frequency/severity — both have some standing (Jenna relaying another stakeholder's report, Andre owning day-to-day operations), and neither is clearly right. This is exactly the apparent-vs-genuine conflict [Module 7](/altitude/module-07) asks trainees to sort out — good Drill 4 candidate too.*
**Devon:** Just to be clear on the technical side — is the CRM always the source of truth, or does Finance sometimes adjust terms after the fact directly in the billing system?
**Miguel:** What about payment method info — how we have clients doing bank connections through the app?
**Andre:** That's a big one. This could come at signup or six months later, at any point. They can be using the product the whole time before payment info is finalized.
**Miguel:** It depends on the service though — for some services we pause immediately on a rejected payment or no payment method on file.
**Andre:** Yes — we have a manual process around this. It's not perfect.
*Tagging note: genuine L1 process detail with a real edge case (payment timing vs. service delivery) — a good candidate for the "solve for the 99%, bucket the exception" pattern from [Module 16](/altitude/module-16).*
**Casey:** [walking through the architecture diagram] This is where I have questions for the piece that's still disconnected — I'm not sure where this needs to flow into, or whether it flows at all.
**Devon:** The question there is: if there's data we want to push back into the CRM, what would that data be, so we know exactly what to connect it to. That's the part that's missing.
**Andre:** The only thing I can think of off the top of my head is the billing contact — the person who gets the invoice. That's been a bit of a headache in the past.
*Tagging note: this is the moment a practitioner without discipline chases straight into field-level mapping. Note that the group parks it appropriately a few lines later — "let's not get hung up on this piece here" — which is the correction [Module 4](/altitude/module-04) describes, happening in real time.*
**Andre:** I'm hung up on the chicken-and-egg thing. Does the order form precede the renewal quote, or does the renewal quote precede the renewal order form? ... I just don't have a good line of sight through all this right now.
*Tagging note: this is close to a verbatim description of altitude blindness — rich L1 material has accumulated across several minutes with no one having yet authored the L2 statement that would resolve the sequencing question. A strong candidate for a facilitator to point trainees to directly.*
**Andre:** [on product structure] This was the first thing I challenged years ago — what on earth are we creating a different product by year for. It's not scalable. This requires rethinking how we manage the product catalog, and ultimately engineering has to sign off. This isn't broadly shared yet — don't run with it as the plan.
**Jenna:** This is already something we're recommending — the structure would consolidate by removing the year as a separate product and making it a field instead.
*Tagging note: a real L2 candidate ("consolidate products, make year a field not a separate SKU") that is explicitly not-yet-confirmed — Andre names both standing ("engineering has to sign off") and status ("not broadly shared") in the same breath. Good real-world instance of the provisional status flag from [Module 10](/altitude/module-10).*
---
**Facilitator note:** this transcript is unusually good for Drill 1 because several of the tells described abstractly in [Module 4](/altitude/module-04) and [Module 6](/altitude/module-06) appear in the client's own words rather than needing to be constructed. Consider using it as the first transcript trainees see, specifically to show that these patterns aren't an invented taxonomy — they're how real discovery conversations actually sound.
### Worked Example — Reconstructed from Real Meeting Notes (Drill 1, Transcript 2)
**Source note:** unlike the transcript above, this is reconstructed dialogue built from real structured meeting notes (a Gemini-generated summary of an actual client working session), not a transcription of verbatim quotes. Company and people fully fictionalized; the decisions, numbers, and structure are faithful to what was actually discussed and decided.
**Scenario:** Bright Path Learning, a corporate training company, is restructuring their contract and pricing data model. Attendees: **Jamie Ortiz** (Client VP of Programs), **Alex Rivera** (Lead Solutions Architect), **Sam Chen** (Solutions Architect).
---
**Alex:** Walking through your files, I'm seeing a hierarchy of programs, packages, and offerings that doesn't quite match how contracts actually reference them today. Before we go further — can you walk me through what a "learning journey" actually is from your side?
**Jamie:** Sure — we really have two types. Program Packages are cohort-based, same group of learners the whole way through, usually two to four workshop topics plus at least one skills lab. Skill Series are bigger audiences, quarterly usually, no skills lab, and honestly right now we just handle those as one-off custom programs because we never built real structure around them.
*Tagging note: the first sentence is L1; the admission that follows ("we never built structure around them") is a real L0-adjacent gap — a good moment to bridge on.*
**Alex:** So it sounds like the system needs a defined "Skill Series" journey type, distinct from Program Packages, rather than continuing to treat it as an undefined custom program — is that right?
**Jamie:** Yes, exactly. And can we also fold skills assessments in as an add-on instead of a separate session type? That's been messy on our end too.
*Tagging note: a clean, earned bridge — confirmed immediately because real L1 material was already behind it.*
**Sam:** On sessions — I want to make sure I'm capturing this right. Workshops, skills labs, custom workshops, and something called Skills Spotlights?
**Jamie:** Right, Skills Spotlights are the one-hour executive version of the program. Separate session type.
**Alex:** For custom workshop development — flat $15,000 per topic, three iterations included, still accurate?
**Jamie:** Yes, but there's a wrinkle — we've been charging a 40% rush fee on top when a client needs fast turnaround, and honestly I don't know if that still makes sense as a percentage versus a flat fee. I'd need to run that by our Chief Product Officer before confirming which way we're going.
*Tagging note: a textbook standing moment — Jamie has standing on program structure, not unilateral standing on this specific pricing mechanism. The correct move is exactly what happens next.*
**Alex:** Understood — let's log that as open pending your CPO conversation, rather than guess at a number now. I don't want to build against a rush-fee rule that might change next week.
**Sam:** One more — travel expenses. Quoted up front, or billed as incurred?
**Jamie:** Billed as incurred, always. Flights, hotel, ground transport, tagged to the specific session, shown as line items on the invoice — never baked into the quote.
*Tagging note: clean L2, confirmed without hesitation — full standing, unambiguous material.*
### Worked Example — Reconstructed from Real Meeting Notes (Drill 1, Transcript 3)
**Source note:** same caveat as above — reconstructed from real structured notes, not verbatim quotes.
**Scenario:** Wexford & Cole, a multi-region professional services firm, is rebuilding CRM compliance and lead-scoring processes. Attendees: **Renata Fields** (Client Marketing Ops Lead), **Tobias Wren** (Client IT/Security), **Morgan Ellis** (Consultant).
---
**Morgan:** Let's start with cookies — how's that handled today?
**Renata:** We're moving to a proper cookie management system as the website migrates in September. Right now it's patchy — our current provider is having issues, and Tobias probably has more visibility into that than I do.
**Tobias:** Yeah, we're getting some flags on it. I can loop in our security contact, but I don't own that relationship directly.
*Tagging note: a standing question surfaces naturally — neither person in the room fully owns the cookie-provider relationship, worth flagging rather than assuming either statement settles it.*
**Morgan:** For GDPR — can you describe what your consent process looks like today?
**Renata:** All contacts follow the same policy regardless of region — GDPR, UK data rules, express consent, one standard. We're mostly B2B, which simplifies some of this versus a B2C company.
**Morgan:** Do you require double opt-in anywhere — Germany, Austria, places that expect it?
**Renata:** No, we don't currently.
*Tagging note: L1 process description, confirmed directly — no bridge needed yet, still discovery.*
**Morgan:** So it sounds like the CRM needs to support a single unified consent policy across all regions rather than region-specific opt-in logic — is that accurate, or does IT see it differently?
**Tobias:** That matches what we've built so far, yeah — one policy, applied uniformly.
*Tagging note: bridge deployed and confirmed by both stakeholders present — a clean real example of naming whose position is being synthesized when two people are in the room.*
**Renata:** One more thing — on lead scoring, do you still have meta-segments that should score lower than a standard segment?
**Morgan:** That's a good question for next session rather than chasing it now — let's park it so we don't lose the thread on consent.
*Tagging note: a real moment of resisting a topic-jump mid-thread — explicitly deferring rather than letting the conversation fragment.*
---
**Facilitator note:** transcripts 2 and 3 are weaker than transcript 1 for showing raw, unfiltered failure-mode moments (since they're reconstructed from decisions already reached, not live struggle), but stronger for practicing clean standing/bridge mechanics once trainees have the basic pattern down. Consider sequencing transcript 1 first, these two second.
### Drill 2 — Translation
**Setup:** A single statement at a given level.
**Task:** Write the statement one level up and one level down.
### Drill 3 — Live-Fire with an Altitude Buddy
**Setup:** A trainee conducts a real (or realistic simulated), ideally multi-stakeholder, discovery call. A second person shadows silently.
**Task:** The shadow flags any moment where the conversation drifts into any of the three failure modes, and any moment a bridge attempt would be well-placed.
**Debrief:** Compare the trainee's own sense of how the call went against the shadow's log.
### Drill 4 — Conflict Mapping (New)
**Setup:** A transcript or scenario involving two or more stakeholders making statements on the same topic, at least one pair of which conflicts.
**Task:** Tag each statement's altitude, source, and standing. Identify whether any conflicts are genuine (requiring escalation) or apparent (resolvable by stepping up to L1 and mapping the full process).
**Check:** Compare against an answer key specifying which conflicts were genuine vs. apparent, and the correct escalation contact for genuine ones.
### Sequencing
Tagging and translation should precede live-fire. Conflict Mapping (Drill 4) should follow Drills 1–3, since it depends on tagging and translation being solid before adding the stakeholder-attribution layer.
### Worked Example — Drill 2 (Composite)
**Given statement (L1):** "When a deal closes, billing needs to be notified and set up."
**One level up (L0):** "Deal terms should be reflected accurately and quickly enough that customers aren't billed incorrectly."
**One level down (L2):** "When a deal is marked Closed Won in Salesforce, the billing system must automatically create a subscription with the approved plan, price, discount, and start date, without manual re-entry."
*Next: [Module 9](/altitude/module-09) — Applying it in discovery calls.*
---
