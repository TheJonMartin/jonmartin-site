---
title: "Module 2: The Altitude Model"
description: "L0 through L3: what each level commits to, who authors it, and how to tell them apart."
seoTitle: "Module 2: The Altitude Model | Requirements Altitude"
group: core
order: 20
draft: false
---
[Module 1](/altitude/module-01) established that requirements information exists at different levels of abstraction, and that failing to notice which level you're in produces bad requirements even when the conversation itself goes well. This module defines the four levels precisely, so you have a fixed vocabulary to work from.
Each level is defined by **what it does and does not commit to**. That's the test that matters more than length, specificity of language, or how technical the client sounds — a client can say something highly detailed-*sounding* that's still only a process description, and something short and vague-*sounding* that's actually a real functional requirement.
### L0 — Business Outcome (Why)
**Definition:** A statement of goal, pain, or success criteria. No system, process, or actor is named — only the state of the world the client wants or doesn't want.
**Test:** Could this sentence be true regardless of what system, vendor, or process is used to achieve it? If yes, it's L0.
**Common trap:** L0 statements often *feel* like requirements because they're emotionally weighted and clearly important to the client. They are important — but importance is not the same as build ability. An L0 statement tells you what to aim for. It doesn't tell you what to build.
### L1 — Process / Capability (What Happens)
**Definition:** A description of workflow, actors, sequence, or handoffs — still technology-agnostic. It describes *what has to happen*, not what a specific system has to do.
**Test:** Could this sentence be diagrammed as a flowchart with swimlanes for people/departments, without naming a single system or field? If yes, it's L1.
**Common trap:** L1 is the level people are best at capturing naturally, because it maps to how clients actually narrate their business. This is also why it's dangerous: a call can generate pages of rich, accurate L1 material and feel completely productive, while never producing a single sentence that tells you what the system needs to do.
### L2 — Functional Requirement (What the System Must Do)
**Definition:** A specific, scope-able statement of system behavior or capability. It is precise enough to estimate against, but does not yet specify configuration, field names, or exact mechanics.
**Test:** Could two different engineers read this sentence and independently agree on roughly what it would take to build, without needing to ask "what do you mean, exactly"? If yes, it's L2. If they'd both need to ask a clarifying question before scoping it, it's still L1.
**Why this is the missing middle:** L2 is the level almost nobody produces without deliberate effort, because it isn't handed to you by the client — it has to be *constructed* from L0 and L1 material through a translation step. Clients don't naturally speak in L2. They speak in outcomes and processes. L2 is authored by the practitioner, not transcribed from the conversation.
### L3 — Detail / Configuration (How Exactly)
**Definition:** Field-level, API-level, or rule-level specificity. Exact mechanics: mappings, formats, edge cases, configuration values.
**Test:** Would changing this detail require no further conversation with the client, only an internal technical decision? If yes, it's L3.
**Common trap:** L3 detail is genuinely necessary — eventually. The failure isn't collecting L3 information; it's collecting it *before* an L2 statement exists to justify why that particular detail matters. L3 without L2 is trivia. L3 anchored to a confirmed L2 statement is a spec.
### Reading the Levels Together
| Level | Answers | Authored by | Test |
| --- | --- | --- | --- |
| L0 | Why does this matter? | The client, directly | True regardless of system used |
| L1 | What has to happen? | The client, directly | Diagrammable with no system named |
| L2 | What must the system do? | **The practitioner, constructed** | Two engineers would agree on scope |
| L3 | How exactly? | The practitioner or client, jointly | Resolvable without further client input |
The single most important row in that table is L2's "authored by" column. Everything else in this guide exists to help you notice when L2 hasn't been authored yet, and to build the habit of authoring it deliberately instead of hoping it emerges on its own.
### Worked Examples (Composite — Northfield Analytics)
**L0 (Sarah, VP Finance):** "Our billing errors are costing us renewals."
**L1 (Sarah):** "When a deal closes, our AE marks it won in Salesforce, but someone on my team manually re-keys the deal terms into the billing system. That's where things go wrong — wrong plan tier, wrong start date, missed discounts."
**L2 (bridged, confirmed by Sarah):** "When a deal is marked Closed Won in Salesforce, the billing system must automatically create a subscription reflecting the approved plan, price, discount, and start date — no manual re-entry."
**L3 (once L2 was confirmed, from Priya, IT):** "Map Salesforce Opportunity.Amount, Opportunity.Discount_Percent__c, and Opportunity.CloseDate to the billing platform's Subscription object on the Opportunity.StageName = 'Closed Won' trigger."
*Next: [Module 3](/altitude/module-03) — The Diagnostic, a fast, repeatable test for classifying any statement in real time.*
---
