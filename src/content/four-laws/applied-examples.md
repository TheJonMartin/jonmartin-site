---
title: "Applied Examples: The Four Laws Across Revenue Teams"
description: Ten worked examples of Ashby's, Conway's, and Brooks's Laws applied to Marketing, Sales, CS, Finance, and RevOps in SaaS and professional-services teams.
seoTitle: "Applied Examples: Four Laws in Revenue Teams | Four Laws"
group: explore
order: 70
---

<span class="label">Applied examples</span>

Ten short, worked examples — two per team, one SaaS and one professional-services flavor — showing where Ashby's Law, Conway's Law, Brooks's Law, and the Reverse Conway Maneuver show up in Marketing, Sales, Customer Success, Finance, and Revenue Operations. For the full RevOps-and-tooling deep dive, see [Conway's Law and Your RevOps Team Structure](/conways-law-revops-team-structure), or for the same argument applied to AI agents, see [Conway's Law in the AI Agent Era](/conways-law-ai-agents-revops).

Jump to: [Marketing](#marketing) · [Sales](#sales) · [Customer Success](#cs) · [Finance](#finance) · [Revenue Operations](#revops)

<!-- Explicit ids, not markdown's auto-generated slugs. The jump links above and
     any external deep links point at these exact anchors on the live site —
     letting the heading text generate them would silently break both. -->
<h2 id="marketing">Marketing</h2>

### Channel-siloed content teams produce a fragmented buyer journey

<span class="label">Conway's Law · SaaS</span>

A SaaS marketing org splits into separate content, paid, and product-marketing pods, each with its own editorial calendar and its own definition of the ideal customer profile. Conway's Law ([2.2](/four-laws-complex-system-design-full#s22)) predicts exactly what shows up on the website: three different value propositions competing across the homepage, a pricing page written by one team and a comparison page written by another that quietly contradicts it. The buyer experiences the org chart before they experience the product. The fix isn't a style guide — it's a shared, single-owner narrative spine that every pod's content has to plug into, so the team boundary stops leaking into the page.

### Staffing up a stalled rebrand slows it down further

<span class="label">Brooks's Law · Services</span>

A professional services firm is three weeks behind on a rebrand and adds two more marketers to catch up before a conference deadline. Brooks's Law ([2.3](/four-laws-complex-system-design-full#s23)) is precise about why this backfires: the new hires don't yet share the tacit brand decisions the original two people made in hallway conversations, so onboarding them consumes the very people who were making progress. The deadline gets closer while velocity drops. The correct move is almost always to cut scope — ship the deck and one-pager on time, push the full site relaunch — rather than add headcount to a communication-bound problem.

<h2 id="sales">Sales</h2>

### Redrawing the AE/SDR boundary around deal variety, not headcount

<span class="label">The Reverse Conway Maneuver · SaaS</span>

A SaaS company's SDR team is organized by territory, feeding AEs who are organized by segment (SMB, mid-market, enterprise). Every enterprise-bound lead has to cross a territory-shaped seam it was never designed for, and enterprise conversion quietly lags. Applying the Reverse Conway Maneuver ([2.4](/four-laws-complex-system-design-full#s24)) means redrawing the SDR boundary to mirror the AE segment boundary instead of geography — so the handoff seam sits where the deal's real variety changes, not where the map happens to.

### One business-development lead can't absorb enterprise RFP variety

<span class="label">Ashby's Law · Services</span>

A boutique services firm has a single BD person who has successfully run point on every proposal for two years — until an enterprise RFP arrives with security questionnaires, legal redlines, and multi-stakeholder pricing scenarios well outside anything the firm has quoted before. Ashby's Law ([2.1](/four-laws-complex-system-design-full#s21)) explains the stall precisely: the incoming variety of the RFP exceeds what one regulator can absorb, no matter how capable. The fix isn't a faster BD person — it's temporarily pulling in delivery and legal as co-regulators so the response's variety-handling capacity matches what the RFP is actually asking.

<h2 id="cs">Customer Success</h2>

### Onboarding and renewals teams produce two versions of the same customer

<span class="label">Conway's Law · SaaS</span>

A SaaS company splits CS into an onboarding team and a renewals team, each with its own tooling and its own health-score model, handing off at day 90. Conway's Law predicts — and the CRM confirms — two different records of customer sentiment that rarely agree: onboarding calls the account healthy at handoff, renewals inherits a customer who's already quietly churning. The system mirrors the team boundary exactly. Closing the gap means either merging the handoff into a single accountable pod for the account's first year, or building a shared health-score definition that both teams write to, so the tooling stops encoding two competing truths.

### Adding CSMs mid-engagement to save a failing account

<span class="label">Brooks's Law · Services</span>

A services firm sees a strategic account going sideways and assigns a second CSM to help save it, expecting faster turnaround. Instead, the account gets worse for two more weeks: the new CSM has to be brought current on eighteen months of relationship history, decisions, and unwritten context, and the original CSM's time gets consumed doing the briefing instead of doing the saving. This is Brooks's Law in a retention context — a relationship-bound, not headcount-bound, problem. The better lever is usually escalating the original CSM's authority and support (pricing flexibility, exec sponsor time) rather than adding a second person who has to catch up first.

<h2 id="finance">Finance</h2>

### A flat-rate billing system can't regulate usage-based pricing

<span class="label">Ashby's Law · SaaS</span>

A SaaS company built its billing system for simple per-seat subscriptions and later layers in usage-based pricing for a new product line — overage tiers, mid-cycle proration, multi-product bundling. Support tickets and manual invoice corrections spike immediately. Ashby's Law names the failure mode: the billing system is the regulator, and the variety of pricing scenarios it now has to absorb has exceeded the variety it was designed to handle. No amount of manual finance-team patching closes that gap permanently — the regulator (the billing logic itself) needs more requisite variety, not more people compensating for its shortfall.

### Time-and-billing systems fragment along practice-area lines

<span class="label">Conway's Law · Services</span>

A professional services firm runs separate time-tracking and billing setups per practice area (consulting, implementation, managed services), each reporting to a different partner. Utilization reporting at the firm level becomes a monthly reconciliation project because Conway's Law has done what it always does: the systems mirror the practice-area boundary, and there's no single source of truth for cross-practice utilization or realization rate. Getting one clean number requires either a shared time-and-billing platform or a Reverse Conway move — standing up a small cross-practice finance-ops function whose only job is owning the unified reporting layer.

<h2 id="revops">Revenue Operations</h2>

### RevOps as the missing System 2–3 coordination layer

<span class="label">Beer's Viable System Model · SaaS</span>

A SaaS company has strong Marketing, Sales, and CS teams (each a capable System 1 operating unit in VSM terms — see [Part 6](/four-laws-complex-system-design-full#p6)) but no function coordinating resource allocation and anti-oscillation across them, so each quarter's GTM plan gets renegotiated from scratch in a scramble of conflicting Slack threads. Standing up RevOps as a genuine System 2/3 layer — not just a reporting function, but the thing that resolves resource conflicts between the three GTM units — is precisely the gap Beer's model predicts will cause instability if left unfilled.

### Adding delivery staff to a stalled SOW doesn't move the constraint

<span class="label">Brooks's Law · Services</span>

A services company's SOW delivery has stalled, and the account team's instinct is to add two more consultants to catch up before the client escalates. If the actual constraint is a single approvals bottleneck — one architect who has to review every deliverable before it ships — the new consultants just produce more work waiting in that same queue, and cycle time gets worse, not better (Little's Law: WIP rises, throughput at the constraint doesn't). The Theory of Constraints move is to subordinate everything to the architect's review capacity first — batch reviews, delegate a subset of sign-off authority — before considering headcount at all. Run your own numbers in the [Flow & Constraint Diagnostic](/part8-flow-diagnostic).

---

These are illustrative patterns, not a substitute for mapping your own org — every team's actual variety, boundaries, and constraints are specific to it. If you want to work through where your GTM or delivery structure is fighting these laws instead of using them, [get in touch](/contact). For the underlying theory behind every example above, start with the [Full Reference](/four-laws-complex-system-design-full) or browse the [Glossary](/glossary).
