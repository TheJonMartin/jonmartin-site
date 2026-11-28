---
title: "Every HubSpot Company Should Have a Domain and an Industry"
description: "Company domain drives HubSpot's automatic association and dedupe. Industry drives segmentation. Here is how I check both and how to fix the gaps."
seoTitle: "HubSpot Companies Need a Domain and Industry — Jon Martin"
pubDate: 2026-11-28
draft: true
tags: ['HubSpot', 'RevOps', 'Data Quality']
category: 'HubSpot Best Practices'
---

Every company record in HubSpot should have a domain, and most should have an industry. This is my opinion, not a HubSpot rule. HubSpot will let you create a company with just a name. But a company without a domain quietly breaks things, and a company without an industry can't be reported on.

## Why it matters

**Domain is how HubSpot connects things.** When the setting to automatically associate contacts with companies is on, HubSpot matches a contact's email domain to a company's domain. No domain on the company means new contacts from that business don't attach to it. Domain is also how HubSpot spots duplicate companies. Two records called "Acme" and "Acme Inc." with no domain look like two different businesses.

**Industry is how you slice the database.** Which industries buy from you, which ones close fastest, which ones churn. Ideal customer reporting, list building and targeted campaigns all lean on it. If half your companies have no industry, every one of those answers is a guess.

## How to check it

1. Go to **Companies** and add a filter: **Company domain name is unknown**. Compare the count to the total.
2. Do the same with **Industry is unknown**.
3. While you're there, look at the industry values that are set. If the same industry shows up three different ways, that's its own problem.

## What good looks like

My bar is **at least 80% of companies with a domain** and **at least 50% with an industry**.

Domain gets the higher bar because almost every real business has a website, and it does real work in HubSpot. Industry gets a lower bar because it's harder to fill and some companies don't fit neatly into one. Below those numbers, the gap is usually a process problem, not a few odd records.

## How to fix it

**First, backfill.**

1. Save a view of companies with no domain. Many of them have contacts whose email domain gives it away. Fill those in.
2. If your plan includes company enrichment, turn it on. It can fill industry and other firmographic fields for companies that have a domain.
3. For industry, pick one list of values and stick to it. HubSpot's default industry dropdown is a fine starting point. Clean up anything set outside it, then bulk edit the rest from saved views.

**Then, keep it filled.**

- Ask for a website on forms where a company is created, or derive it from the email domain.
- Map domain and industry when you import companies.
- Check what your integrations send. A connector that creates companies with only a name is a common source of the gap.
- **With workflows (Professional or Enterprise):** flag or task new companies created without a domain so someone fills it the same week.
- **Without workflows (Starter):** keep the "no domain" and "no industry" views and clear them on a recurring calendar reminder.

Domain is the one I'd fix first. It's quick, and it makes association and dedupe work the way people already assume they do.
