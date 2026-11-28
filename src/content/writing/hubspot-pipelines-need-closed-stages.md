---
title: "Every HubSpot Pipeline Needs Closed Stages, and Not Too Many Stages"
description: "Without a closed stage, records never leave the pipeline. With 13+ stages, milestones get mixed with activities. Here is how I check HubSpot pipeline structure."
seoTitle: "HubSpot Pipelines Need Closed Stages and Fewer Stages — Jon Martin"
pubDate: 2026-11-28
draft: true
tags: ['HubSpot', 'RevOps', 'Sales Process']
category: 'HubSpot Best Practices'
---

Every pipeline in HubSpot should have a way out, and it should be short enough to read at a glance. This is my opinion, not a HubSpot rule. Two things I check on every deal and ticket pipeline: does it have closed stages, and does it have more than 12 stages?

## Why it matters

**No closed stage means nothing ever finishes.** In a deal pipeline, closed won and closed lost are how HubSpot knows a deal is done. They drive win rate, revenue reports and the open pipeline total. Ticket pipelines work the same way with a closed status. Without one, finished work stays in the open count forever and reports overstate the backlog.

**Too many stages usually means activities snuck in.** When I see 13, 15 or 20 stages, some of them are almost always tasks like "Follow-up 2" or "Waiting on legal call". Reps skip them, deals jump around, and stage reports stop meaning much.

## How to check it

1. Go to **Settings > Objects > Deals > Pipelines** and open each pipeline. Do the same for ticket pipelines.
2. Check that each one has closed stages: closed won and closed lost for deals, and at least one closed status for tickets.
3. Count the stages. Note any pipeline with more than 12.

## What good looks like

- **Every pipeline has closed stages.** For deals, both won and lost.
- **No pipeline has more than 12 stages.** For most deal pipelines, **5 to 9 milestone stages** plus won and lost is the sweet spot.

## How to fix it

**Missing closed stages:**

1. Add closed won and closed lost stages to deal pipelines, or a closed status to ticket pipelines.
2. Move finished deals and tickets into them. Bulk edit from a filtered view works well.
3. If you track why deals are lost, add a closed-lost reason property so the reason is captured when a deal closes.

**Too many stages:**

1. List the stages and mark which ones are milestones (the buyer has done something) and which are activities (a rep has done something).
2. Turn the activities into tasks or timeline activity instead.
3. Move deals out of the stages you plan to remove, then delete those stages.
4. Check any workflows and reports that reference the removed stages before you delete them.

This is usually a quick fix with a big effect on how readable your pipeline board and reports are.
