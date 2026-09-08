---
title: 'What Shows Up Without Anyone Designing It'
description: 'Half of what keeps a scaling RevOps org functioning was never designed by anyone — it emerged bottom-up, the way structure does in complex systems.'
pubDate: 2026-09-08
draft: false
tags: ['Systems', 'RevOps', 'Complexity']
---

![What Shows Up Without Anyone Designing It](/images/writing/06-emergence-and-networks.svg)

Last post, I said dancing landscapes need a standing practice instead of a finish line. Here's the harder question underneath that: who's actually running that practice? Not on the org chart — in reality. Half the time, the real system managing a dancing problem isn't the one anyone designed. It's one that showed up on its own.

That's emergence, and once you can see it, you start noticing that a good chunk of what actually keeps a scaling RevOps org functioning was never specified by anyone. It just appeared, bottom-up, the way structure tends to appear in complex systems with no central planner involved.

## The slime mold problem

Page's example is genuinely strange and worth sitting with. Slime molds are single-celled organisms that mostly do nothing interesting — until food runs short. Under that stress, one cell secretes a warning enzyme. Others pick it up and do the same. A trail forms, the individual cells aggregate into a single moving colony, and eventually it stops and builds a stalk. The cells that reach the top release spores. The ones that didn't become the structure that let the others survive. They started identical. They ended up doing completely different jobs — what Page calls breaking symmetry — and nothing outside the colony told them to specialize. The specialization is the emergent structure.

Now watch for the RevOps version of the same mechanism. An official process hits a gap — a deal type it wasn't built for, a handoff nobody defined — and instead of nothing happening, someone under the same kind of local stress builds a workaround. A spreadsheet. A side channel. A manual check that isn't in any documented workflow. It spreads, the way the enzyme signal spreads, because it solves a real problem the official system doesn't. Six months later it's an unofficial second system half the team quietly depends on, and nobody remembers deciding to build it, because nobody did. It emerged, the same way the slime mold's stalk did — under stress, bottom-up, with no central planner.

This isn't a compliance problem to stamp out. It's the system doing exactly what complex systems do when a real gap exists and nobody's filled it top-down. The useful move usually isn't "shut down the workaround" — it's "figure out what the workaround is telling you the official process is missing."

## Robustness nobody designed either

Page's other example is a model of banks that can make risky loans (higher payout, but nervous neighbors might pull deposits) or safe loans (lower payout, more stable). Left to learn on their own, most banks lean risky — until a few discover the value of playing it safe, breaking the pattern the rest are following. What emerges isn't planned diversity. It's a repeating structure — a run of risky banks, then a safe one, then risky again — that functions as a firewall. The system becomes more robust to a shock, and nobody designed the firewall. It emerged from individuals adapting locally.

I've seen the same pattern inside account teams. Nobody mandates it, but on most healthy teams there's a person who always over-documents a deal "just in case," who always confirms verbally instead of trusting the CRM field, who's quietly slower and more careful than everyone around them. When an audit hits, or a rep leaves without notice, that person's habit is often the only reason nothing falls through. Nobody designed that redundancy into the org chart. It emerged, the same way the safe-lending bank emerged — as one adaptive response, among many, that happened to make the whole system more resilient.

## The design implication

You can't always engineer the outcome you want by specifying the process in complete detail up front. That's the Lecture 1 problem again, restated at the system level: a complicated-system solution — write the perfect SOP, enforce it — tends to fail the moment real adaptive people are working inside it, because they'll keep responding to gaps you didn't anticipate. Sometimes the better move is genuinely different: set good local incentives and constraints, and let a workable pattern emerge on its own, rather than trying to specify the "right" answer in advance.

## Then there's the question of what breaks

Emergence explains what shows up. It doesn't explain what happens when part of it fails — for that you need to look at shape, not behavior. And the shape that keeps showing up in RevOps systems is one that's efficient right up until the exact moment it isn't.

Most real-world networks aren't random and they aren't uniform. Social networks cluster — your close working relationships are also connected to each other — with a handful of long-range ties stitched through the clusters, usually one person who used to work somewhere else, or knows someone at a partner company. That combination — tight clusters plus a few long jumps — is what produces the famous six-degrees effect: short paths between almost anyone, even though most of your connections are local.

Your systems architecture, more often than not, isn't shaped like that. It's shaped like the World Wide Web: a power-law network. A small number of hub nodes carry an enormous share of the connections — the core CRM object everything else writes to, the one integration every downstream workflow depends on, the one person who actually understands how the custom schema fits together — and a long tail of minor nodes with only one or two connections each.

Power-law structure has a specific, counterintuitive property: it's robust to random failure and fragile to targeted failure. Knock out a random node — a minor integration breaks, a small workflow stalls — and the system barely notices, because there's redundancy everywhere in the long tail. Knock out a hub — the core object, the key integration, the one person who holds the schema in their head — and the whole thing fractures at once.

"Is our system generally robust?" is close to the wrong question. The real one: what are the actual hub nodes — systems and people both — and what happens if each one specifically fails? That's a short list, usually shorter than people expect, and it's rarely the list leadership would guess without actually mapping it.

Do you know what your hub nodes are, or only that the system has mostly held up so far?

---

*This is Part 6 of a series working through Scott Page's* Understanding Complexity *(The Great Courses, 2009) applied to RevOps at scaling companies. Next up: why highly connected systems don't just risk failure from an outside shock — they can build toward states where an ordinary small event triggers a cascade on its own.*
