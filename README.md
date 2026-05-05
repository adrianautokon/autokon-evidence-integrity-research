# AutoKon — Evidence Integrity R&D Brief

**Internal R&D · Pre-Faishal · 2026-05-01**
**Authored by:** Adrian (VP Product) with Claude Cowork
**For review by:** Dickson (CEO), Faishal (CTO)
**Builds on:** Dickson + Claude evidence integrity summary (May 1, 2026)
**GitHub:** https://github.com/adrianautokon/autokon-evidence-integrity-research
**Status:** Comprehensive R&D brief — disregards engineering / operational difficulty; proposes the full menu

---

## What this repo is

A comprehensive R&D brief for AutoKon's photo verification + evidence integrity layer — the foundational trust story for the BSN/BTN bank pitch. Reorganizes Dickson's 10-layer engineering architecture into **6 audience-first pillars** that map directly to bank concerns. **35 items, 100+ proposed solutions** with multi-dimensional +/- across cost, engineering, implementability, low-end-device friendliness, Pelaksana friction, pitch story strength, false-positive risk, and adversarial difficulty.

The framing leads with the **Pelaksana Attack Playbook** (§3) — 10 named in-system fraud vectors (PV-1 through PV-10) mapped to the pillar/item that catches each. Per Dickson's May 2026 reframe: AutoKon's primary fraud surface is **in-system Pelaksana behavior** (a legitimately enrolled Pelaksana gaming what they capture, when, and where) — not **out-of-system fabricated artifacts** (Word/IG/Canva/screenshot/photo-of-print). Engineering budget reallocates: Item 1.6 consumer-app detectors demote to Phase 2 residual, and two new Phase 0 items appear — motion-vector analysis (catches still-video fake walks, PV-5) and spec-coverage scoring (catches coverage fraud, PV-10).

Two cross-cutting lenses introduced during the brainstorm — **threat motivation** and **attacker tech-savviness** — shape the recommended ship priorities.

The 6 pillars:

1. **Authenticity** — Is the photo real, fabricated, edited, or AI-generated?
2. **Identity** — Is the submitter who they claim to be?
3. **Place** — Is this the actual unit, not the one next door or sister-project?
4. **Time** — Was this captured now, not last week or recycled?
5. **Chain of Custody** — Once evidence enters AutoKon, can it be tampered with?
6. **Independent Verification** — Do you ever rely on something other than your own software?

---

## Artifacts

This repo answers two related questions from Dickson, in two layers.

### Layer A — The R&D brief (foundational, already approved by Dickson)

The 6-pillar evidence integrity R&D brief itself, in four formats:

| File | Format | Purpose | Read time |
|---|---|---|---|
| **`EVIDENCE_INTEGRITY_RESEARCH.md`** | Markdown | The master source. ~30 pages comprehensive. | ~45 min |
| **`index.html`** | Interactive HTML | Brand-styled · sticky TOC · collapsible pillars · in-page search | Click-through |
| **`AutoKon-Evidence-Integrity-Research.docx`** | Word | Traditional formal report for printing / formal sharing | ~45 min |
| **`AutoKon-Evidence-Integrity-Summary.pptx`** | PowerPoint | 18-slide executive summary in AutoKon brand | ~12 min |

### Layer B — The workflow + commercial follow-ups (Dickson's specific asks)

After approving the R&D brief, Dickson asked two sequential questions. Each is answered by a sibling document with a matching interactive HTML.

| Dickson's question | Answer artifact | Format |
|---|---|---|
| *"Can you come up with a proposal on how this solution would fit into the workflow? Siteplan and videos"* | **`WORKFLOW_INTEGRATION.md`** + **`workflow.html`** | MD source + interactive HTML with Mermaid diagrams |
| *"How confident is the outcome going to be for production? Is it realistic? How do we measure the results? From the perspective of SLAs — what is the number we can confidently commit to the bank that we will uphold, if it goes lower we get penalised?"* | **`SLA_PROPOSAL.md`** + **`sla.html`** | Commercial annex: confidence framework, metrics, pilot + steady-state SLA schedule, service credit structure, industry benchmarks, negotiation positioning |

The workflow proposal grounds the brief in TARA AI's existing pipeline (WhatsApp → Botpress → n8n → Supabase) — every change lands in one of those five layers, no new infrastructure. The SLA proposal frames *what AutoKon can confidently commit* as service-credit-backed pilot SLAs (months 1-6) followed by calibrated steady-state SLAs (month 7+).

---

## How to read

**Quick orientation — the R&D brief (10 minutes):**

1. Open the **PPT summary** (`AutoKon-Evidence-Integrity-Summary.pptx`) — gets you to the 6 pillars + ship priority + open questions in 18 slides.

**Standard read — the R&D brief (1 hour):**

2. Open the **interactive HTML** (`index.html`) — same content as the MD but with TOC navigation, collapsible pillars, in-page search. Best for picking specific items.

**Deep read — the R&D brief (full engagement):**

3. Read the **MD master** (`EVIDENCE_INTEGRITY_RESEARCH.md`) or the **DOCX** (`AutoKon-Evidence-Integrity-Research.docx`). Same content; pick the format you prefer.

**Operational follow-on — workflow proposal (30 minutes):**

4. Open **`workflow.html`** — answers Dickson's *"how does this fit into the workflow?"* question. Mermaid sequence + flowchart diagrams. Grounded in TARA AI's existing WhatsApp → Botpress → n8n → Supabase pipeline. Or read the source at `WORKFLOW_INTEGRATION.md`.

**Commercial follow-on — SLA proposal (30 minutes):**

5. Open **`sla.html`** — answers Dickson's *"how confident, is it realistic, how do we measure, what number can we commit to the bank?"* questions. Confidence framework + metrics + pilot SLAs (months 1-6) + steady-state SLAs (month 7+) + service-credit penalty structure + bank-negotiation positioning. Or read the source at `SLA_PROPOSAL.md`.

---

## Source files

- **`build-pptx.js`** — Node.js script (uses `pptxgenjs`) that generates `AutoKon-Evidence-Integrity-Summary.pptx`. Edit the script + run `node build-pptx.js` to regenerate.
- **`build-docx.py`** — Python script (uses `python-docx`) that generates `AutoKon-Evidence-Integrity-Research.docx`. Edit the script + run `python3 build-docx.py` to regenerate.
- **`package.json`** — Node dependencies for the PPT build.

---

## Recommended ship priority (high-level)

**Phase 0 — Ship now (immediate wins):**
- **NEW** — Motion-vector / optical-flow analysis on walk-around videos (catches PV-5 still-video fake walk)
- **NEW** — Spec-coverage scoring (catches PV-10 coverage fraud — every spec item present/absent + "obscured" requires SM second-photo + reason)
- Item 5.2 D — WORM storage config change (ships in a day)
- Item 5.4 A — Botpress witness yes/no prompt (10-minute Botpress flow change)
- Item 3.7 A+B — Centroid-pattern + siteplan-based prediction (Adrian's pattern insight; catches PV-1 wrong-unit substitution)
- Item 4.1 B — Spectral fingerprint hardening on Dickson's audio fingerprint
- Item 6.1 B — AutoKon-routed KJPP triggers using existing tier classification
- *(Item 1.6 A-D consumer-app fraud detectors moved from Phase 0 to Phase 2 residual per Dickson's reframe)*

**Phase 1 — PILOT-30 commitments** (ship in 30 days from first signed bank pilot):
- KYC partnership integration · drone fly-over ingest · RFC 3161 TSA sealing · Merkle tree hash chain · call-to-prayer cross-check · BMKG weather correlation · RT/RW witness program · Privy/eMeterai third-party signing

**Phase 2 — Roadmap-named, observed-attack-driven shipping:**
- Custom AutoKon camera app (resolves Play Integrity + overlay-spoof simultaneously) · C2PA content credentials · HSM keys · WAL export
- **Item 1.6 A-D residual** — JPEG quantization fingerprinting · IG-Story artifact detection · screenshot detection · photo-of-screen moiré detection (out-of-system fabrication tail)

See §6 of `EVIDENCE_INTEGRITY_RESEARCH.md` for full priority breakdown.

---

## The Indonesian moat

Six items in this brief are uniquely Indonesian — no US/EU competitor would think to build them:

1. Equatorial sun-angle math (sun moves ~15°/hour at equator vs ~7° in mid-latitudes)
2. Call-to-prayer (azan) audio cross-check against muezzin schedules
3. BMKG (Indonesian Meteorological Agency) weather feed correlation
4. RT/RW witness signatures rooted in Indonesian community governance
5. Low-tech consumer-app fraud detectors (Word, IG Story, screenshots, photo-of-print)
6. Siteplan-relative GPS pattern matching that respects archipelago infrastructure realities

---

## Open questions for decision

Eight decisions before engineering can proceed cleanly. Listed in §8 of the MD master.

1. Is custom AutoKon camera app on the table for PILOT-30?
2. KYC partnership selection: Privy vs Tilaka vs Sumsub vs Veriff
3. Sentinel-2 free vs Planet Labs paid for satellite imagery
4. OpenTimestamps blockchain vs RFC 3161 TSA for public sealing
5. WORM storage migration on Supabase
6. Drone overflight ingest format standardization
7. Tier-3 review queue SLA
8. RT/RW witness program scope and honoraria budget

---

## Relationship to existing AutoKon work

- **Dickson's evidence integrity summary (May 1)** — This brief reorganizes Dickson's 10-layer architecture into 6 pillars. Same engineering substrate; different audience-organization for bank-pitch use.
- **Pak Jun product recommendations (Apr 24-25)** — Items #2 KodeProper, #5 trigger points, #9 digital signatures, #10 KTP capture, #11 project geo-tag, #12 RBAC are all integrated into the 6-pillar framework.
- **`autokon-bank-report-pitch` repo** — **Frozen.** This brief is for the bank-pitch evidence-integrity narrative but doesn't modify that repo.
- **`autokon-three-audience-samples` repo** — Cross-referenced. Audience-first framing consistent across both.
- **`autokon-app` production code** — No PRs proposed. R&D-mode means we list options; Faishal decides what ships when.
- **F3a Design System Spec** — Independent. Different scope; consistent voice.

---

## Status

Not for pitching. Not for engineering yet. Internal iteration only. Adrian and Dickson decide if/when this becomes engineering input for Faishal or feeds directly into the bank pitch deck.

---

*Authored: 2026-05-01. Adrian (VP Product, AutoKon) + Claude Cowork. Builds on Dickson's evidence integrity prototype and the brainstorm session of May 1, 2026.*
