---
title: "Read-Only on Purpose"
description: "A HubSpot audit that can write is a project in disguise. Portal Audit scores the portal from configuration and counts, then stops."
seoTitle: "Read-Only on Purpose — Jon Martin"
pubDate: 2026-10-07
draft: false
tags: ['Systems', 'RevOps']
category: 'RevOps'
---

A HubSpot audit usually ends the way a discovery call ends. Someone was in the portal. A deck arrived. The last slide is a statement of work.

The score was real enough to feel measured. The recommendation was a project. Those two facts are not independent. The person who scored the portal is usually the person who wants to rebuild it. A soft finding keeps the door open. A hard finding that the team could fix on Thursday does not.

Portal Audit is built the other way around. It installs in the account, reads configuration and counts, and hands back a score, the evidence, and a fix plan. It cannot create, change, or delete anything in HubSpot. The product is the measurement. The project, if there is one, is someone else's.

One free audit per portal. No card. Installing it does not change the HubSpot subscription. The app lives at [audit.thejonmartin.com](https://audit.thejonmartin.com).

## What an audit is allowed to be

A portal is not a story. It is a set of objects, properties, pipelines, users, workflows, and the fill rates on the fields those objects actually use. Most of the pain people bring to an audit — forecasts nobody trusts, a senior hire who cannot operate, a report that disagrees with the spreadsheet — is downstream of that set.

The useful audit names which part of the set is wrong, at a stated altitude, from a named source. It does not average a Super Admin's impression with a rep's complaint and call the blend a health score.

That is the same failure as [coastline scoping](/writing/coastline-scoping). Two people walk the same shore with different sticks and publish one number. Here the sticks are "I clicked around" and "we should replatform." Neither is a measurement.

Portal Audit publishes the stick.

The free audit covers six areas. The homepage lists them, and the engine reads them as modules:

- **Data model.** Properties per object, unused and duplicate-looking properties, custom objects, association labels.
- **Pipelines.** Deal and ticket pipelines and stages.
- **Data quality.** How complete the key fields are on contacts, companies, deals, and tickets. Counts only.
- **People and access.** Owners, users, roles, super admins, teams, inactive users.
- **Marketing and automation.** Segments, forms, marketing emails, workflows, if the plan includes them.
- **Security and limits.** Login and security activity over a window (default 90 days), an audit-log summary, account limits, and a meter of legacy private-app API calls.

A section it cannot check is marked not assessed. Missing permission, tool not on the plan, beta endpoint not available, or a temporary error. A category with no assessed rules is left out of the overall score. Silence is not a pass.

## What it reads, and what it refuses to copy

The data-quality checks do not download the CRM. A fill rate is a search with a `HAS_PROPERTY` filter, limit 1, total only. Record totals are search totals. Unused custom properties are properties with zero records holding a value. The report stores configuration and aggregates. It does not store CRM record values, owner emails, login IPs, email subjects, or custom code.

That boundary is the product, not a privacy footnote.

A consultant audit "has a look" by opening records. That look is how the recommendation gets a customer's name in it, and how the auditor ends up holding a copy of the database. Portal Audit cannot make that trade. Completeness is a count. Governance is a user list and a role flag. Security is activity summaries, not a dossier.

The same boundary is enforced in code before a token is even fetched. Outbound requests go through a read-only allowlist. GET is allowed against HubSpot's API hosts. POST is allowed only for the read paths HubSpot insists on using POST for: search, batch read, listing segments, the OAuth token calls, and one associations usage report. PUT, PATCH, DELETE, any other POST, any other host: rejected, and the audit stops.

Four HubSpot permissions have no read-only version. Forms, marketing email, workflows, and content. HubSpot's install screen describes them as read and write, because that is the only version HubSpot offers. Portal Audit uses them only to read names, states, and settings. Submissions are not read. Nothing is sent. No workflow is changed. All four are optional. Uncheck them and those sections show as not assessed. Everything else still runs.

The installer has to be a Super Admin, or a user with App Marketplace access who also has permission for each data area the app reads. Any HubSpot account can install. A section that needs a tool the plan does not include is not assessed. The app does not guess an edition.

## A finding is a sentence with evidence

Each finding has a stable rule id, a title, a severity, a category, the evidence, and a recommendation. Evidence is counts, config names, and percentages. Never a record. Never an email. Never an IP.

Severities are critical, high, medium, low, and info. Info deducts nothing. It is a fact the report is not willing to pretend is a pass.

A few of the rules, so the altitude is obvious:

A custom property with no description is DM-001. Medium if half or more of the custom properties lack one, otherwise low. Duplicate custom labels are DM-002, low. Properties dumped into HubSpot's default groups are DM-003. A pipeline that still wears four of HubSpot's five template open-stage names is DM-004. A pipeline with no closed stage, or more than twelve stages, is DM-005.

Fill rates are DQ-001, one finding per object, scored off the worst key field against its target. Under a quarter of target is high. Under three quarters is medium. Unused custom properties are DQ-002. If the search cap is hit, the remaining checks are reported as not checked (DQ-003, info), not as clean.

More than two super admins is GOV-003. High if they are more than a quarter of users, otherwise medium. Active owners tied to deactivated users are GOV-004. Users with no login in the window are GOV-006, and the severity rises if any of them hold a paid seat. Failed logins are GOV-005. The account audit log is Enterprise-only; if it is not there, GOV-008 says so and deducts nothing.

Off workflows are AUTO-001. Empty workflows are AUTO-002. Lists with no update or membership change in 180 days are AUTO-003. Forms untouched for a year, and draft marketing emails untouched for 180 days, are info.

Legacy private apps still making calls are INT-001, high if the meter shows calls in the window. Workflow custom-code actions are INT-002, high if the exposed code carries a legacy-API signal (`/v1/` through `/v4/`, a hapikey, the old associations or pipelines paths, legacy CRM cards), otherwise medium. The report stores which signals matched. It does not store the code. Webhook actions are INT-003. The playbook dates those recommendations currently use: legacy private-app creation disabled 26 October 2026, legacy CRM cards stop 31 October 2026, Pipelines v1 sunset 4 December 2026, v4 unsupported 30 March 2027, v1–v3 APIs and legacy apps lose support in September 2027. Those are the dates in the audit's own rule notes. If HubSpot slips one, the recommendation should slip with it.

Account limits are LIM-001. At or over 90 percent is critical, 75 percent high, 60 percent medium, one finding per limit type. Pipelines are the exception, and it is deliberate: hitting the pipeline cap is medium and never higher, so a pipeline limit cannot by itself trip the critical cap. HubSpot's pipeline limit does not count the default pipeline. The evidence says so.

Twenty-nine scoring rules. Not a vibe, and not "15+ checks" as the pricing page currently phrases the monthly audit. The page and the engine should be brought into line before this essay ships. Until then, the engine is the source.

## How the number is made

Each category starts at 100. A finding deducts by severity: critical 40, high 20, medium 10, low 4, info 0. The category floors at 0.

The overall score is a weighted mean of the categories that were actually assessed, rounded.

| Category | Weight |
| --- | --- |
| Data model | 1.0 |
| Data quality | 1.25 |
| Governance and security | 1.25 |
| Automation | 1.0 |
| Integrations | 1.0 |
| Limits | 0.75 |

Data quality and governance weigh more because that is where a portal lies to its own team. A beautiful pipeline on empty amount fields is not a B.

If any finding is critical, the overall score is capped at 59. The grade scale is A at 90, B at 80, C at 70, D at 60, F below that. A critical finding cannot wear a C. The cap is the point. A portal at 91 percent of its record limit does not get to average that away against a tidy property group.

A rule whose input was unavailable is not assessed. It is listed. It never counts as a pass or a fail. Re-rendering the markdown re-evaluates the rules against the saved report. The score can be recomputed without calling HubSpot again. That is the test a deck usually fails. If the number cannot be rebuilt from the evidence, it was a mood.

## Practices are a second ruler

The score is the deduction table. Beside it, a library of 37 practices is evaluated against the same report. Deterministic. No model in the loop.

A practice comes back pass, partial, fail, not applicable, or not assessed. Not applicable means the practice does not fit this portal: no custom objects, or tailoring turned it off. Not assessed means the data was not available, or the check is manual. Validation rules on properties are a manual check. The audit says so instead of inventing a pass.

Each practice carries a source. When the source is a HubSpot knowledge-base article, the link is that article. When it is consultant judgement, it is marked opinion. "Every record has an owner" is opinion. "Two super admins at most" cites HubSpot's permissions guide. The report does not dress the first up as the second.

Targets on the key fields, so a partial is not a shrug:

- Contacts: email at 90 percent, first and last name at 80, lifecycle stage at 90.
- Owner, on contacts, companies, deals, and tickets: 80 percent.
- Deals: amount at 80, close date at 90, an associated company and contact at 80.
- Companies: domain at 80, industry at 50.

Tailoring runs only after the business profile is confirmed. Industry and size come from the intake, a flag, or a profile already stored. An inferred profile alone never changes a score. A company of one to ten is not penalised for having no teams, and is not penalised for extra pipelines. A regulated industry — banking, insurance, healthcare, legal, government, the list is in the practice notes — fails BP-GOV-01 at any super-admin count above two, and raises the governance impacts. A services business with zero tickets fails the ticket practice. A product-led motion raises the lifecycle and product-usage practices. Every adjustment is listed in the report with its reason.

Usage gaps are the third ruler. What the portal has, inferred from seat names, custom objects, workflows, lists, and custom properties, against what the audit measured it using. A gap is reported only when the data shows it. Anything unseen goes under not assessed. Product-library use is one of those. A hub subscription with no assigned seats is another.

Priority on the improvement plan is impact divided by effort. Effort is S, M, or L: hours, days, weeks. Impact is the effect on data trust, security, or the revenue process. That is a sort, not a promise that the small item is the right one for this quarter. A Super Admin cleanup is usually S and high impact. Renaming a pipeline to buyer-verifiable stages is M. The plan will rank the first above the second. A team that sells in the template stages may still need the second first. The ranking is there so that choice is visible.

## What you get back

After install, the company profile is confirmed: industry, company size, website. That is what tailoring hangs on. Then the audit runs. A typical portal takes a few minutes. A large one takes longer, because the app stays under HubSpot's marketplace rate limit — 110 requests per 10 seconds per installed account — and under its own tighter buckets. Search is capped per audit. When the cap is hit, the rest is not checked, not guessed.

The setup guide promises a PDF, and on request the underlying data as JSON or Markdown. The report leads with the score, the category scores, and the top findings. Findings are sorted by severity, then rule id. The fix plan groups them into ordered steps with effort estimates. On a later monthly audit, steps already done are marked done.

The engine also writes sections the public setup guide does not yet promise in those words: the confirmed business profile, a SWOT whose claims have to cite a fetched page, the practice results, usage gaps, a 30/60/90 improvement plan tied to finding and practice ids, and a narrative. The narrative is checked. Every number in it has to appear in the input. Every cited id has to exist. Ungrounded output is flagged or rejected. Until that check is the public promise, treat those sections as part of the report object, not as a line on the pricing page.

There is a separate fix-plan file aimed at an agent or a person who does have write access. Each item has the change, the API call or the UI path, the write scopes, the risk, the rollback, a before-snapshot, and the rule ids it closes. Portal Audit executes none of it. The app stays read-only. A plan that the auditor also runs is how the score becomes a project. This one stops at the list.

Context Home gets an estimate, labelled as an estimate, not HubSpot's score. It is built from the four inputs HubSpot names: populated CRM fields, logged activity, connected integrations, team settings. HubSpot's own score can be entered by hand and shown beside it. Drafts for the Context Home fields are marked draft. Review before pasting.

## What it will not do

It will not send email, enroll a record, or change a setting.

It will not copy the contact, company, or deal tables.

It will not turn a not-assessed section into a green row.

It will not apply the fix catalog on the free audit. Automated fixes exist only on Guard and Assist, through a separate connection a Super Admin creates, only for catalog items that connection's owner has enabled, inside each item's limits. Every change is read back and logged. Pulse never changes data. Checkout for Pulse, Guard, and Assist is not open. Nothing is provisioned until payment is received. The prices, so the page is not a teaser: Pulse is $100 a month or $1,000 a year. Guard is $250 a month or $2,500 a year, plus a $99 one-time onboarding charge. Assist is $500 a month or $5,000 a year, plus $299. Annual is ten times monthly, paid upfront. Onboarding is the setup wizard, not a call. Prices are US dollars and exclude tax.

Disconnect is two paths. In HubSpot: Settings, Integrations, Connected apps, Portal Audit, Uninstall. Or email jon@thejonmartin.com and the app is uninstalled through HubSpot's API. Access ends immediately. Stored credentials are deleted. Scheduled audits stop. Reports, the company profile, and audit history are deleted 30 days later, or sooner on request. The portal is unchanged, because nothing was written.

One install friction, stated so it is not a surprise. The app is not yet a reviewed Marketplace listing. HubSpot shows a confirmation on unverified third-party installs, and the installer types a risk acknowledgement before the connect completes. Unlisted marketplace apps are also capped at 25 installs until they are listed. That is HubSpot's rule, not a queue on our side.

## What to do Monday

Install it on the portal you are about to spend money on. Not the sandbox you tidied for the demo. The one the forecast comes out of.

Read the not-assessed list before the score. A 90 with workflows skipped is not a 90 on automation. It is a 90 on the parts you allowed the app to see.

Then read the criticals, if any. The cap already told you the grade cannot clear a D while one of those is open. The finding tells you which limit, which seat, which integration. Fix that before you commission a redesign of the property sidebar.

If the score and the practice library disagree, believe the disagreement. The score is deductions from findings. The practices are a second stick, some of them opinion, some of them HubSpot's. Two lengths, named. Do not average them into a single "health" and buy a project off the average.

The free audit is the whole offer until checkout opens. [Install Portal Audit](https://audit.thejonmartin.com/oauth/install). The setup guide is at [audit.thejonmartin.com/docs](https://audit.thejonmartin.com/docs). Pricing, including the line that checkout is not open yet, is at [audit.thejonmartin.com/pricing](https://audit.thejonmartin.com/pricing).

A portal does not get healthier because someone was paid to look at it. It gets healthier when the thing that was wrong is named, with the count, at a severity that cannot be talked out of the grade. That is the audit. The rebuild is a different engagement, and it should have to survive this one.
