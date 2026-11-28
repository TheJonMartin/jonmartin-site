---
title: 'Every Record in HubSpot Should Have an Owner'
description: 'An unowned contact, company, deal or ticket falls out of every queue and owner report. Here is how I check owner coverage in HubSpot and how to fix it.'
seoTitle: 'Every HubSpot Record Should Have an Owner — Jon Martin'
pubDate: 2026-11-28
draft: true
tags: ['HubSpot', 'RevOps', 'Data Quality']
category: 'HubSpot Best Practices'
---

Every contact, company, deal and ticket in HubSpot should have an owner. This is my opinion, not a HubSpot rule. HubSpot will happily store a record with nobody's name on it. But after years of working inside HubSpot portals, it's the first thing I check, because almost everything else depends on it.

## Why it matters

An owner is how HubSpot decides whose work something is. Task queues, "my contacts" views, owner-based reports, rotation, notifications and most sales and service workflows all start from the owner field.

A record with no owner isn't anyone's job. It doesn't show up in a rep's views. It doesn't count in their reports. Nobody gets a reminder about it. So nobody follows up, and nobody notices that nobody followed up. The record just sits there.

That's the quiet cost. Missing owners rarely cause an error you can see. They cause work that never happens.

## How to check it

In HubSpot, the field is called **Contact owner**, **Company owner**, **Deal owner** or **Ticket owner** depending on the object. Under the hood they're all the same property, `hubspot_owner_id`.

1. Open each object's index page (Contacts, Companies, Deals, Tickets).
2. Add a filter: owner **is unknown**.
3. Compare that count to the total.

For deals, I only count the ones that still matter: open deals, plus deals closed won or lost in the last 12 months. A deal that closed three years ago without an owner isn't hurting anyone today.

## What good looks like

My bar is **at least 80% of records with an owner** on each object. 100% is the goal for anything a person is expected to work: open deals, open tickets, and contacts in an active stage.

I don't expect 100% everywhere. Some records are legitimately nobody's yet, like a newsletter subscriber who has never talked to sales. But if a fifth of your records have no owner, that's a process gap, not an edge case.

## How to fix it

**First, clear the backlog.**

1. Save a view for each object filtered to owner **is unknown**.
2. Sort or filter it by something that tells you who should own it: territory, company, source, lifecycle stage.
3. Select the records and use **Edit** to set the owner in bulk.

If some of those records belong to people who have left, deal with that at the same time. Records owned by deactivated users have the same problem as unowned ones: nobody is working them.

**Then, stop new gaps from forming.**

- **With workflows (Professional or Enterprise):** add an owner on create. Use a **Rotate record to owner** action for round-robin, or set the owner from a rule like territory or company owner.
- **Without workflows (Starter):** keep the saved "no owner" views and put a recurring task on your calendar to clear records created since the last check.
- **Check your sources.** Forms, imports and integrations are where most unowned records come from. Set a default owner wherever the form, import or integration lets you.

Once the backlog is clear and new records get an owner on day one, this stays fixed with very little effort. It's one of the cheapest fixes in a HubSpot portal, and one of the ones that pays back fastest.
