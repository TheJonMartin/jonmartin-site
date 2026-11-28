---
title: "Every HubSpot Contact Should Have a Lifecycle Stage"
description: "Lifecycle stage is the backbone of funnel reporting, lead handoff and automation in HubSpot. Here is how I check lifecycle coverage and keep it filled."
seoTitle: "Every HubSpot Contact Needs a Lifecycle Stage — Jon Martin"
pubDate: 2026-11-28
draft: true
tags: ['HubSpot', 'RevOps', 'Marketing']
category: 'HubSpot Best Practices'
---

Every contact in HubSpot should have a lifecycle stage. This is my opinion, not a HubSpot rule. HubSpot sets it automatically in some cases, but contacts from imports, integrations and some forms often arrive with it blank.

## Why it matters

Lifecycle stage is how HubSpot knows where someone is in your funnel: subscriber, lead, marketing qualified lead, sales qualified lead, opportunity, customer and so on. Funnel reports, lead handoff from marketing to sales, lists and lifecycle automation all start from it.

A contact with no lifecycle stage falls out of all of that. They don't show up in your funnel numbers, they don't trigger handoff, and they don't get the nurture meant for their stage.

## How to check it

1. Go to **Contacts** and filter by **Lifecycle stage is unknown**. Compare the count to the total.
2. Then add **Create date** or **Original source** as columns. That usually shows you where the blanks are coming from: one import, one integration, one form.

## What good looks like

My bar is **lifecycle stage on at least 95% of contacts.** Between 80% and 95% is a gap worth fixing soon. Below 80%, your funnel reporting is missing a big piece of the picture.

## How to fix it

**First, backfill.** Save a view of contacts with no lifecycle stage. Group them by what you know: customers from your billing or deal data, leads from form submissions, subscribers from email-only signups. Bulk edit each group.

**Then, set it on create.**

- **Forms:** set a lifecycle stage on each form (for example, Lead on a contact form, Subscriber on a newsletter signup).
- **Imports:** always include and map a lifecycle stage column.
- **Integrations:** check which apps create contacts and whether they set a stage. If they can't, catch their contacts another way.

**Then, keep it moving.**

- **With workflows (Professional or Enterprise):** set a stage on create for anything that still arrives blank, and advance contacts when something real happens, like a deal being created or won.
- **Without workflows (Starter):** keep a saved view of contacts with no stage, and move stages by hand from saved views when a relationship changes.

One thing to know: HubSpot normally only lets lifecycle stage move forward. To move a contact back to an earlier stage, clear the field first, then set the new value.
