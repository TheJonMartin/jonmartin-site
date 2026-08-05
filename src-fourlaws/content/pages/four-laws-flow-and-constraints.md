---
title: "Managing Process: Flow & Constraints"
description: A walkthrough of Little's Law and the Theory of Constraints — how work actually flows through the structure the four laws create.
group: explore
order: 10
---

<span class="label">Extending the framework · Part 8</span>

The four laws explain how teams and structure shape a system. Once that structure exists, work still has to move through it. Little's Law and the Theory of Constraints are the lenses for that — how fast work flows, and what's actually limiting it.

They aren't new peer laws. They operate one level down, on the work moving through whatever structure the four laws already shaped.

## Lens 1 — Little's Law

<span class="label">John D. C. Little, 1961</span>

Cycle time is not a mystery — it's arithmetic. It's determined by how much work is in progress relative to how fast that work gets processed.

In any stable system, the average amount of work in progress equals the arrival rate multiplied by the average time each item spends in the system.

> **L = λ × W**
> WIP = Arrival Rate × Time in System

Rearranged into the actionable form:

> **W = L / λ**
> Cycle Time = WIP ÷ Throughput

### Two levers to cut cycle time

1. **Reduce WIP** — cap how much is in flight at once.
2. **Raise throughput** — increase the rate items actually clear the system.

### Empirical status

Unlike the four laws, this is a proven mathematical identity — true for any stable queueing system regardless of arrival pattern or number of servers. Applying it to knowledge work means treating "arrivals," "WIP," and "time in system" as measurable — an approximation, but a productive one. It's the backbone of Kanban and DevOps flow metrics.

## Lens 2 — Theory of Constraints

<span class="label">Eliyahu Goldratt, 1984</span>

A chain is only as strong as its weakest link. At any moment, exactly one part of the system limits everything else — and improving anywhere else is wasted effort.

Every system has one binding constraint on its throughput. Optimizing a non-constraint doesn't raise system output — it just builds inventory in front of the real bottleneck.

Step A → Step B → **Step C (the constraint)** → Step D → Done

### The Five Focusing Steps

1. **Identify** the constraint
2. **Exploit** it fully
3. **Subordinate** everything else
4. **Elevate** it — invest
5. **Repeat** — find the next one

## 8.1 — Little's Law names the math. The constraint names the place.

Neither lens is complete alone. Together they turn "things feel slow" into a specific, fixable diagnosis.

**What Little's Law gives you.** The relationship between WIP, throughput, and cycle time — for the system as a whole. It treats the system as one black box: it tells you *that* cycle time will rise if WIP outpaces throughput, but not *where* inside the box the limit actually lives.

**What the constraint gives you.** The location. It tells you that raising system-wide throughput only works by raising the throughput of the *one* constrained step — improving a non-constraint doesn't move the system's real output at all, no matter how busy it looks.

Put together: cap WIP in front of the constraint while you work on elevating it — a Little's Law move. That's how cycle time gets shorter *immediately*, not just after the constraint is fixed.

## 8.2 — The same causal chain, one layer down

The four laws explain how structure forms. Flow and constraints explain what happens to work once it has to move through that structure.

**Ashby ↔ the constraint.** The constraint is usually exactly where incoming variety exceeds the regulator's capacity to absorb it. Ashby explains *why* the gap exists; the Theory of Constraints gives the operating discipline for managing a system that has one.

**Brooks ↔ Little's Law.** Adding people raises the arrival rate of coordination work (λ) without raising the constrained resource's throughput — so by L = λW, cycle time rises. Brooks observed the instance in 1975; Little's Law is the general rule that makes it predictable.

**Conway / Reverse Conway ↔ where the constraint sits.** A boundary drawn at a bad seam creates an artificial bottleneck — a person who becomes an unavoidable integration point by accident of org chart, not because the work requires it.

**Decomposability ↔ WIP.** Highly decomposable work runs many small parallel queues without bottlenecking. Sequentially-constrained work concentrates WIP into one line — exactly where constraints tend to form.

## 8.3 — Applied: a subscription-billing migration, diagnosed

Change orders and edge-case billing questions arrive continuously from the client. Everyone on the team is "busy" — but only one thing determines how fast tickets actually close.

**The setup:** every ticket eventually routes through the one architect who understands both the CPQ/billing system and the client's CRM data model. Sales, PM, and junior consultants stay fully occupied — none of that occupancy raises throughput, because the real constraint is one calendar.

**Little's Law diagnostic.** Cycle time = open tickets (WIP) ÷ tickets the architect closes per week (throughput). Two honest levers: *cap* how many tickets are open at once, or *raise* the architect's actual throughput. Adding more junior staff raises arrivals, not the constraint's output — Brooks's trap.

**Five steps, applied.** *Identify:* the architect. *Exploit:* shield their calendar; route only what needs their judgment. *Subordinate:* juniors pre-qualify tickets first. *Elevate:* turn their decisions into a playbook or train a backup. *Repeat:* the next bottleneck — maybe the client's own approval process — is now the one to find.

## 8.4 — Before you add headcount, ask these

A three-question diagnostic to run before reaching for the instinctive fix.

1. **What's my WIP right now?** — how much work is actually in flight, not just assigned.
2. **What's my real throughput?** — how much is genuinely completed per unit time, not hours logged.
3. **Where does the queue actually form?** — that's the constraint. Everywhere else is noise until that one thing changes.

**The instinct to avoid:** adding people or tools everywhere work feels stuck. Per Brooks, that raises arrivals (λ) system-wide without touching the one throughput number that matters — and per the Theory of Constraints, effort anywhere but the constraint is wasted motion.

---

Want to run these numbers yourself? Try the [Flow & Constraint Diagnostic](/part8-flow-diagnostic) or the [Flow Formula Calculator](/flow-formula-calculator).

This delivery team's flow problem started as a team-structure problem — see [Conway's Law and Your RevOps Team Structure](/conways-law-revops-team-structure).

Capping WIP without knowing where the constraint is doesn't help — see [WIP Limits vs. the Theory of Constraints](/wip-limits-vs-theory-of-constraints).
