---
title: "Module 14: Common Frameworks Mapped to Altitude"
description: "JTBD, user stories, epics, impact maps, and use cases read against L0–L3."
seoTitle: "Module 14 | Requirements Altitude"
group: reference
order: 10
draft: false
---
Practitioners rarely come to discovery empty-handed. Most already know one or more of the frameworks below. This module doesn't replace those tools — it shows how the altitude model explains why each one works, where each one quietly fails, and how to combine them into a single pipeline.
### Jobs to Be Done (JTBD)
**Format:** *"When \[situation\], I want to \[motivation\], so I can \[expected outcome\]."*
**Altitude mapping:** a well-formed JTBD statement is almost purely **L0**. That's by design — JTBD deliberately avoids naming a solution, system, or process, staying focused on the outcome the customer is actually hiring something to accomplish.
**Its real strength:** JTBD is a built-in defense against detail spelunking. Because the format structurally resists naming a system, it's very hard to spelunk from a JTBD statement — there's nothing solution-shaped to chase yet.
**Its blind spot:** the same discipline that protects against spelunking creates a specific risk of **altitude blindness**. A team can generate a whole set of well-written, legitimately insightful JTBD statements and mistake that body of work for requirements gathering. It isn't — it's excellent L0 material that still needs L1 process mapping and an authored L2 bridge statement before anyone can scope against it. **Treat every JTBD statement as the start of the ladder, not the end of the exercise.**
### User Stories
**Format:** *"As a \[persona\], I want \[capability\], so that \[benefit\]."*
**Altitude mapping:** unlike JTBD, user stories don't map to a single altitude — and this is the important part. The format is a **container**, not an altitude guarantee. Two stories in identical format can sit at completely different levels:
- *"As a user, I want a better billing experience, so that I'm less frustrated."* — still L0/L1, wearing L2 clothing.
- *"As an admin, I want to export a CSV of transactions, so that I can reconcile in QuickBooks."* — genuinely L2, buildable as written.
**The failure mode this creates — format masquerading as altitude:** a backlog full of correctly-formatted user stories *feels* like a backlog of requirements. Teams stop applying scrutiny because the format looks finished. This is altitude blindness wearing a disguise — the story template satisfies the eye without satisfying the L2 test.
**The fix:** run every user story through the [Module 3](/altitude/module-03) diagnostic before trusting it. Specifically: would two engineers agree on scope from the "I want" clause alone? If the honest answer is no, the story is still L0/L1 and needs a real bridge statement, regardless of how well-formatted it is.
**Acceptance criteria as L3:** once a story genuinely clears the L2 bar, acceptance criteria are the natural home for the L3 detail that follows — but only once, not instead of, the L2 test passing.
### Epics → Stories → Tasks
**Format:** the standard agile decomposition hierarchy — a broad epic, broken into stories, broken into tasks.
**Altitude mapping:** this hierarchy is the closest existing match to the ladder itself. An epic is typically L0/L1 — a large outcome or capability area, not yet buildable as a single unit. A story, when properly formed, is L2. A task is L3.
**Why this mapping is useful, not just tidy:** most trainees already work in this hierarchy daily, in whatever tracker their team uses. The altitude model doesn't ask them to adopt something new — it gives them a test for whether their *existing* epics and stories are actually sitting at the level their label claims. An "epic" that's really just a restated L0 goal with no L1 process mapping underneath it will produce stories that skip straight to L3 tasks with no real L2 in between — spelunking, wearing a Jira ticket.
**The diagnostic applied:** before splitting an epic into stories, run the epic itself through the [Module 3](/altitude/module-03) ladder. If it fails the L1 test (can't be diagrammed with swimlanes), it's still an L0 goal masquerading as a scoped body of work, and splitting it into stories prematurely will just distribute the ambiguity downward instead of resolving it.
### Impact Mapping
**Format:** a visual tree — goal, at the center, branching to actors, then to the impacts those actors need to have, then to deliverables that support those impacts.
**Altitude mapping:** unusual among these frameworks because it already encodes the ladder's logic without naming it. Goal = L0. Actor + impact = L1 (who does what, and what changes). Deliverable = L2, sometimes edging into L3 depending on specificity.
**Why it's worth teaching explicitly:** it's useful as a worked example of "a framework that got this right" — showing trainees that the discipline this guide teaches isn't an invented complication, it's the same structure good frameworks already converge on. It's also genuinely useful for the multi-stakeholder problem ([Module 7](/altitude/module-07)): because it forces explicit actors before deliverables, it surfaces *whose* impact a deliverable is meant to serve, which is exactly the standing question [Module 7](/altitude/module-07) raises.
**Where it still needs the diagnostic:** impact mapping tells you *whose* impact you're serving, but doesn't by itself test whether a deliverable is actually L2-specific enough to scope. A deliverable box on an impact map can still be vague ("improve reporting") — the [Module 3](/altitude/module-03) ladder still applies to whatever ends up written in that box.
### Use Cases
**Format:** actor, goal, preconditions, main scenario (numbered steps), alternate/exception flows.
**Altitude mapping:** use cases sit mostly at L1, with the main scenario often edging into L2 once the steps get specific enough to be buildable. This makes them a genuinely useful *bridge* format — the numbered main scenario is frequently where an L1 process description gets forced into enough specificity to become a real L2 candidate, almost as a side effect of the format's structure.
**Where they're strongest:** integration-heavy work — because use cases are built for describing interaction between actors and a system, they map naturally onto "when X happens in system A, Y should happen in system B," which is precisely the shape of most integration triggers discussed in [Module 9](/altitude/module-09)'s domain watch points.
**The trap specific to use cases:** the exception/alternate flows are where detail spelunking most often creeps in — a well-intentioned effort to be thorough about edge cases can pull a use case deep into L3 territory before the main scenario has even been confirmed at L2. Apply the Bridge Rule literally here: don't write alternate flows for a use case whose main scenario hasn't cleared L2 yet.
### Gherkin / BDD (Given-When-Then)
**Format:** `Given [context], When [action], Then [outcome]` — structured, executable acceptance criteria.
**Altitude mapping:** this is the clearest L3-native format in the set. A well-formed Gherkin scenario is specific enough to be automated, which is a stronger test than even the [Module 3](/altitude/module-03) "would two engineers agree" bar — it has to be specific enough that a test script agrees with it.
**Why it belongs at the end of the pipeline, not the start:** because Gherkin is so naturally precise, it's tempting to reach for it early, while a topic is still at L0/L1 — this is detail spelunking in its purest form, writing executable specificity for a requirement that hasn't been confirmed yet. **Gherkin scenarios should only be written once a user story has already cleared the L2 test.** Writing Given-When-Then before that point produces very precise documentation of the wrong thing.
**Its genuine strength once earned:** unlike acceptance criteria written as loose prose, Gherkin forces every precondition and outcome to be stated explicitly, which makes it very good at surfacing genuinely missing L3 detail — but only once the L2 statement underneath it is solid.
### Using JTBD, User Stories, and Acceptance Criteria Together — A Pipeline
1. **JTBD** to establish and validate the L0 outcome with stakeholders
2. **L1 process mapping** ([Module 2](/altitude/module-02)) or **Use Cases** to understand how that outcome plays out operationally
3. **User story**, tested against the [Module 3](/altitude/module-03) diagnostic, as the vehicle for the authored **L2 bridge statement**
4. **Gherkin / acceptance criteria** as the **L3** detail, attached only once the story has actually earned its L2 status
This gives trainees who already know these tools a reason to keep using them — while adding the one check (the diagnostic) that determines whether any of them has actually produced something buildable, or just something well-formatted.
### Cross-Reference Notes
**5 Whys — the countermeasure to spelunking.** Not a capture format, a technique: when you notice you're stuck at L3 (per the [Module 4](/altitude/module-04) tells), asking "why does this detail matter?" repeatedly climbs back up the ladder toward the L0 it should be anchored to. Use it as a recovery move, not a planned step — it's what you reach for after the [Module 4](/altitude/module-04) self-check catches you mid-spelunk.
**RACI — not an altitude tool, a standing tool.** RACI (Responsible, Accountable, Consulted, Informed) doesn't map to L0–L3 at all; it answers a different question entirely — who owns a decision. It's a natural companion to [Module 7](/altitude/module-07)'s "standing" concept: before treating any stakeholder's L2 statement as confirmed, RACI is one clean way to check whether they're Accountable for that topic or merely Consulted on it. A Consulted-only stakeholder's L2 statement should be logged as provisional, same as before.
**Non-Functional Requirements — the deliberate exception.** Performance, security, scalability, and similar NFRs don't sit at a single altitude the way functional requirements do — a security requirement can be simultaneously an L0 concern (regulatory exposure), an L2 constraint (the system must support role-based access control), and an L3 detail (specific encryption standard), all describing the same underlying need. Don't force NFRs onto the ladder as if they were a single statement moving through levels. Instead, treat each NFR topic as needing its *own* pass through the ladder, separate from the functional requirement it constrains — an easy trap is assuming a system's core functional L2 statement automatically carries its performance or security requirements with it, when those need to be elicited and bridged independently.
### Worked Example — Full Pipeline (Composite)
**JTBD:** "When a deal closes, I want billing to reflect the correct terms automatically, so I can stop losing renewals to invoice disputes." (Sarah, VP Finance — L0)
**Process mapping (L1):** Deal marked Closed Won in Salesforce → currently manual re-key into billing → Finance also makes direct post-close true-up corrections.
**User story (tested against the [Module 3](/altitude/module-03) diagnostic — passes, this is L2):** "As a Billing Ops Analyst, I want deal terms to reconcile two-way between Salesforce and the billing platform after a deal closes, so that post-close corrections don't silently drift out of alignment and cause invoice disputes."
**Gherkin (L3, written only after the story cleared L2):**
```
Given a deal is marked Closed Won in Salesforce with an approved plan, price, and discount
When the reconciliation job runs
Then the billing platform creates a subscription matching those terms
And any subsequent direct edit in the billing platform is flagged for review against the Salesforce record
```
---
