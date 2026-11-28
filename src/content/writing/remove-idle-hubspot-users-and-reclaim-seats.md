---
title: "Remove Idle HubSpot Users and Reclaim Their Seats"
description: "A HubSpot user who hasn't logged in for months is a security risk and, on a paid seat, wasted spend. Here is how I find idle users and clean them up safely."
seoTitle: "Remove Idle HubSpot Users and Reclaim Seats — Jon Martin"
pubDate: 2026-11-28
draft: true
tags: ['HubSpot', 'RevOps', 'Security']
category: 'HubSpot Best Practices'
---

If someone hasn't logged in to HubSpot in 90 days, they probably don't need an account. This is my opinion, not a HubSpot rule. But idle users pile up in almost every portal I look at, usually people who left or changed roles and nobody told the admin.

## Why it matters

**Every active login is a way in.** An account nobody uses is an account nobody would notice being misused. If that person left the company, they may still have access to your contacts and deals. Each one is a bit of risk with no upside.

**Paid seats cost money.** Sales Hub and Service Hub seats are billed per user. A seat assigned to someone who never logs in is money spent on nothing, and it may be the seat a new hire needs.

## How to check it

1. Go to **Settings > Users & Teams**.
2. Look at each user's last activity. Sort or scan for anyone with no login in the last 90 days.
3. For each idle user, note which seats they hold. The ones on a paid Sales or Service seat matter most.

## What good looks like

**Every user has logged in within the last 90 days.** Idle users on free seats are a tidy-up item. An idle user on a paid seat is the one I'd fix this week, because it costs money and access at the same time.

There are fair exceptions, like someone on leave. Those should be a known short list, not a surprise.

## How to fix it

Do it in this order, so nothing gets dropped.

1. **Reassign their records first.** Filter contacts, companies, deals and tickets by that person as owner and move them to someone who's actually working them. Check tasks too.
2. **Check what references them.** Lead rotation, workflows that assign to them, sequences, forms that notify them, and meeting links. Point those at an active person.
3. **Move the paid seat.** Remove the Sales or Service seat and give it to whoever needs it, or drop it at renewal.
4. **Deactivate or remove the user.** Once nothing depends on them, turn off their access.

Then make it a habit: a short review of Users & Teams every quarter, plus a step in your offboarding checklist that tells the HubSpot admin the same day someone leaves.

If you skip step 1, you end up with the next problem: records owned by a user who no longer exists. I cover that one separately.
