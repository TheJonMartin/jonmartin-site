---
title: "HubSpot Tickets Should Have an Owner and Move Through a Pipeline"
description: "An unowned ticket doesn't get worked, and tickets outside a real pipeline hide your backlog. Here is how I check ticket ownership and stages in HubSpot."
seoTitle: "HubSpot Tickets Need an Owner and a Pipeline — Jon Martin"
pubDate: 2026-11-28
draft: true
tags: ['HubSpot', 'RevOps', 'Service']
category: 'HubSpot Best Practices'
---

Every service ticket in HubSpot should have someone responsible for it and a stage that says where it stands. This is my opinion, not a HubSpot rule. HubSpot will store a ticket with no owner, and plenty of portals do.

## Why it matters

**An unowned ticket is nobody's problem.** It doesn't show up in anyone's queue, and nobody gets reminded. The customer waits, and nobody notices until they chase.

**Stages are how you see the backlog.** The ticket pipeline tells you how many tickets are new, waiting on you, waiting on the customer, or closed. SLA and response-time reporting depends on tickets moving through those stages. If tickets sit in one stage forever, or skip stages, those reports don't mean much.

And if you're a services business with no tickets at all, that usually means delivery and support work is tracked somewhere outside HubSpot, so you can't see it next to the customer record.

## How to check it

1. Go to **Tickets** and filter by **Ticket owner is unknown**. Compare the count to the total.
2. Check that every ticket has a pipeline stage. Open the board view and look for tickets that never move.
3. Look at your ticket pipeline's stages. Do they match how your team works a ticket?

## What good looks like

- **At least 80% of tickets have an owner.** Open tickets should all have one.
- **Essentially every ticket (99% or more) has a pipeline stage,** and stages reflect where the work really is.

## How to fix it

**First, clear the backlog.** Save a view of tickets with no owner, sort it by pipeline or category, and bulk edit the owner. Close tickets that are actually done.

**Then, assign on create.**

- **With workflows (Professional or Enterprise):** route tickets to an owner as soon as they're created, using a rotation or rules based on category or team.
- **Inbox or help desk assignment:** if tickets come in from your shared inbox or help desk, turn on automatic assignment there.
- **Without workflows (Starter):** assign owners from the ticket board, and put a recurring task on the calendar to assign anything new.

**Use the pipeline.** Keep a short set of stages, like new, in progress, waiting on customer and closed, and make moving the ticket part of working it. That's what makes the backlog and response-time reports useful.
