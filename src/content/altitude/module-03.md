---
title: Module 3: The Diagnostic — Classifying Statements in Real Time
description: "A ladder you can run live: note the speaker, then classify altitude without stopping the call."
seoTitle: "Module 3: The Diagnostic | Requirements Altitude"
group: core
order: 30
draft: false
---
The four levels are only useful if you can apply them live, inside a conversation, without stopping to think for ten seconds after every sentence. This module gives you the fast version: a question ladder you can run in the background while still listening and engaging normally.
### Step 0 — Note the Speaker
Before running the altitude test, note who's talking and what role they hold. This isn't extra overhead — it's the same instinct you already use to register that a comment from your spouse and the same comment from an acquaintance carry different weight; you're applying it to stakeholders. Carry this forward into every tag you make: altitude alone is an incomplete tag once more than one voice is in the room (see [Module 7](/altitude/module-07)).
### The Ladder
For any statement, ask in this order and stop at the first "yes":
1. **Is this true regardless of what system or process is used?** → L0. Stop.
2. **Could this be diagrammed with swimlanes and no system named?** → L1. Stop.
3. **Would two engineers independently agree on roughly what this takes to build?** → L2. Stop.
4. **Would resolving this require no further conversation with the client?** → L3.
The order matters. You're checking from the top down because L0 and L1 statements can *sound* specific enough to trigger a premature "this is a requirement" reaction. The ladder forces you to rule out the higher levels first.
### The Two-Second Version
In live conversation you won't run the full ladder consciously. The compressed version is a single background question: **"Could I hand this sentence to an engineer as-is?"**
- If the honest answer is "no, they'd ask what the client actually wants" → you're at L0 or L1.
- If the honest answer is "no, they'd ask which field / which system / which exact rule" → you're at L2, and L3 questions are now fair game.
- If the honest answer is "yes" → you're at L3, and the only thing left to check is whether an L2 statement exists that this L3 detail is actually in service of.
### What the Diagnostic Is *For*
The diagnostic is not a note-taking system. It's a **noticing system**. Its job is to interrupt the automatic reflex — chasing an interesting detail, or nodding along with a good process description — long enough for you to ask: *do I know what level I'm at right now, whose statement it is, and is that the level this conversation actually needs next?*
### A Note on Speed
This will feel slow the first several times you practice it deliberately. That's expected, and it's the same learning curve as any skill that's currently unconscious competence for you and conscious effort for someone building it from scratch. The goal of the drills in [Module 8](/altitude/module-08) is to move this from a deliberate checklist to the same kind of background pattern-match you already run automatically.
### Worked Example (Composite — Annotated)
| Statement | Speaker | Altitude |
| --- | --- | --- |
| "Our billing errors are costing us renewals." | Sarah, VP Finance | L0 |
| "When a deal closes, someone re-keys the terms into billing by hand." | Sarah | L1 |
| "And half the time we don't know it happened until the customer calls angry." | Marcus, Sales Ops | L1 |
| "So billing needs to auto-pick-up deal terms with no manual re-entry — right?" | Practitioner (bridge) | — |
| "Yes — plan, price, discount, and start date should flow through automatically." | Sarah (confirms) | L2 |
| "Map Opportunity.Amount to the billing platform's rate plan on Closed Won." | Priya, IT | L3 |
Running the ladder line by line like this is the two-second version made visible — in practice this whole exchange takes under a minute.
*Next: [Module 4](/altitude/module-04) — The Three Failure Modes in depth, and how to catch yourself mid-pattern.*
---
