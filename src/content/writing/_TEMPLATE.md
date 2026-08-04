---
title: 'The headline of the piece'
description: 'One sentence. This shows on the writing index and in search results, so make it do real work.'
pubDate: 2026-08-04
draft: true
tags: ['Systems']
---

Copy this file, rename it to something like `why-the-senior-hire-failed.md`, and
write. The filename becomes the URL — this one would publish at
`/writing/why-the-senior-hire-failed/`.

Leave `draft: true` while you're working. Nothing with `draft: true` renders on
the site or appears in the index, so you can commit half-finished pieces safely.
Set it to `false` when it's ready to go live.

This file starts with an underscore, so Astro's content loader ignores it
entirely — it will never appear on the site even with `draft: false`.

## Front matter, field by field

`title` and `description` are required and the build fails without them. That's
deliberate: a post with no description gets a blank search snippet.

`pubDate` sets the ordering on the index — newest first. `updatedDate` is
optional; add it and the post page shows "updated [date]".

`tags` is a list. Keep the set small so it stays useful — something like
`Systems`, `RevOps`, `Faith`, `AuDHD`. Tags currently display but don't filter;
filtering is easy to add once there are enough posts to need it.

## Formatting available

Standard markdown. Headings, **bold**, *italic*, lists, links, and
`inline code` all render with styles matching the rest of the site.

> Blockquotes render in Courier with a sage rule — good for the kind of line you
> want a reader to slow down on.
