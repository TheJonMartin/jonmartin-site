---
title: "Your Number of HubSpot Pipelines Should Fit Your Deal Volume"
description: "Many deal pipelines with only a few deals each split your reporting and usually signal clones or old experiments. Here is how I check pipeline count and consolidate."
seoTitle: "HubSpot Pipeline Count Should Fit Deal Volume — Jon Martin"
pubDate: 2026-11-28
draft: true
tags: ['HubSpot', 'RevOps', 'Sales Process']
category: 'HubSpot Best Practices'
---

You should have only as many deal pipelines as you have genuinely different sales processes. This is my opinion, not a HubSpot rule. When a portal has lots of pipelines and only a few deals in each, it's almost never because the business has that many processes.

## Why it matters

Every extra pipeline splits your data. Forecasts, win rates and stage reports get calculated per pipeline, so each one has fewer deals and the numbers get noisy. Reps have to remember which pipeline to use. Workflows and reports have to be built and kept up once per pipeline.

Usually the extra pipelines are clones made for one product, one region or one test, and then left behind.

## How to check it

1. Go to **Settings > Objects > Deals > Pipelines** and count your deal pipelines.
2. Go to **Deals** and look at how many deals sit in each pipeline.
3. Divide total deals by number of pipelines to get a rough average.

## What good looks like

My rule of thumb: **more than 5 deal pipelines with fewer than 20 deals each on average** is a sign you have more pipelines than your volume supports. Five or fewer pipelines is fine at any volume. So are more pipelines if each has plenty of deals.

For very small companies, I don't worry about this much. The payoff from consolidating is small.

## How to fix it

1. **Group pipelines by process.** If two pipelines have basically the same steps, they're the same process.
2. **Use a property for the variation.** Product line, region, new business vs. renewal: those are usually better as a deal type or similar property than a separate pipeline. Reports can filter or group by it.
3. **Keep separate pipelines only where the steps really differ.** Renewals and new business often do. Partner deals sometimes do.
4. **Move deals, then retire the old pipeline.** Set the new property on the deals first so you don't lose the distinction. Check workflows, reports and forms that point at the old pipeline before removing it.

Fewer pipelines with more deals each gives you numbers you can actually trust.
