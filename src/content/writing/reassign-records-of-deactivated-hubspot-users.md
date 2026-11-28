---
title: "Reassign Records Owned by Deactivated HubSpot Users"
description: "When a HubSpot user is deactivated, their records, tasks and rotations stay with them, and nobody works them. Here is how I find those records and reassign them."
seoTitle: "Reassign Records of Deactivated HubSpot Users — Jon Martin"
pubDate: 2026-11-28
draft: true
tags: ['HubSpot', 'RevOps', 'Data Quality']
category: 'HubSpot Best Practices'
---

When someone leaves and their HubSpot user is deactivated, their records should go to someone else. This is my opinion, not a HubSpot rule. HubSpot doesn't move them for you. The person's name stays on every contact, deal and ticket they owned, and those records look owned when in practice nobody has them.

## Why it matters

A record owned by a deactivated user is worse than an unowned one, because it hides. It doesn't show up in a "no owner" view. It still counts as owned in reports. But no active person sees it in their views, gets its reminders, or follows up on it.

The same goes for everything that points at that person: open tasks, lead rotation, workflow assignments, sequences, form notifications and meeting links. New leads can keep going to someone who isn't there.

## How to check it

1. Go to **Settings > Users & Teams** and list the users who are deactivated or removed.
2. On each object's index page, filter by owner and pick each of those people.
3. Count what's still assigned, with open deals and open tickets first.
4. Check your rotations, workflows and sequences for those names too.

## What good looks like

**No records, open tasks, rotations or workflows assigned to a deactivated user.** This one is pass or fail for me. Even a handful of open deals sitting with someone who left is a handful of deals nobody is working.

## How to fix it

**First, clear what's there.**

1. Save a view per object filtered to the departed owner.
2. Decide who takes over. Often that's their manager, their replacement, or whoever owns the account at company level.
3. Select the records and use **Edit** to change the owner in bulk. Do open deals and tickets first.
4. Reassign or close their open tasks.
5. Update rotations, workflows, sequences, form notifications and meeting links that name them.

**Then, stop it happening again.** Make reassignment the first step of offboarding, before the user is deactivated, not after. A short checklist the admin runs the day someone leaves is enough.

- **With workflows (Professional or Enterprise):** after the backlog is cleared, you can add a workflow that reassigns anything that still lands on that owner.
- **Without workflows (Starter):** keep the saved views by departed owner and check them on a recurring reminder for a few weeks after someone leaves.
