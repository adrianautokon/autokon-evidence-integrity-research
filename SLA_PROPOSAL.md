# AutoKon — SLA, Metrics & Confidence Proposal

**Companion to:** `EVIDENCE_INTEGRITY_RESEARCH.md` (R&D brief, v1.0) and `WORKFLOW_INTEGRATION.md` (siteplan + video workflow)
**Date:** 2026-05-01
**Authored by:** Adrian (VP Product) with Claude Cowork
**For:** Dickson (CEO) — answering four pointed questions:

> *"How confident is the outcome going to be for production? Is it realistic? How do we measure the results? From the perspective of SLAs — what is the number we can confidently commit to the bank that we will uphold, if it goes lower we get penalised?"*

**Audience:** Dickson + commercial counterparties + bank legal/risk teams + Faishal (engineering buy-in).
**Status:** Commercial annex, ready for bank-side negotiation. **Phased structure:** pilot SLAs (months 1-6) + steady-state SLAs (month 7+). **Penalty structure:** service credits only (standard SaaS B2B pattern). No cash penalties, no claw-backs.

---

## TL;DR

- **We commit hard on uptime, performance, coverage.** These are deterministic and within our control. Numbers below.
- **We commit thoughtfully on effectiveness.** Pre-pilot, only deterministic-mathematics-backed numbers (e.g., recycled photo detection via pHash). ML-driven effectiveness numbers calibrate post-pilot.
- **Pilot phase (months 1-6):** process + coverage SLAs are live with service credits. Effectiveness is best-effort with quarterly joint review with the bank's risk team. No effectiveness penalties.
- **Steady-state phase (month 7+):** effectiveness SLAs activate, calibrated to observed pilot data. Service-credit penalties on misses.
- **What we explicitly DO NOT commit:** raw fraud-detection rates as a single number. Stripe Radar doesn't. Sumsub doesn't. Onfido doesn't. We follow industry pattern.

---

## §1 Confidence framework (Dickson Q1: "How confident is the outcome going to be for production?")

The 35 items in the brief fall into five confidence bands. Each band has a different production-confidence story.

### 1.1 The bands

| Band | What's in it | Confidence basis |
|---|---|---|
| **HIGH (deterministic, shipped, or trivial extension)** | ~50% of items | Already in production at app.autokon.id, or extending shipped substrate, or off-the-shelf libraries with deterministic behavior |
| **HIGH-MEDIUM (engineering hardening)** | ~20% of items | Engineering effort straightforward; threshold tuning needed during pilot |
| **MEDIUM (ML-training-dependent)** | ~15% of items | Depends on labeled training data quality |
| **MEDIUM (vendor-partnership-dependent)** | ~10% of items | Technical confidence high; depends on external partner timelines |
| **CONDITIONAL (pilot-discoverable)** | ~5% of items | Cannot model from architecture alone; pilot data answers |

### 1.2 Items by band

**HIGH band (50%) — already proven or trivially deterministic:**

| Item | Why HIGH |
|---|---|
| 1.1 A pHash photo recycling | Mathematically deterministic; shipped in Dickson's prototype; 13/13 fixtures pass |
| 1.5 A Trusted-source overlay (Claude OCR) | Shipped; running in production today |
| 2.1 A Phone whitelist | Shipped via WhatsApp Business API |
| 3.1 A Project bbox check | Shipped; Dickson L2 |
| 3.2 A-C Video site presence + multi-point GPS | Dickson L0a shipped; multi-point is trivial frame-sampling extension |
| 3.3 A-B Video-photo GPS cross-reference | Dickson L4 shipped |
| 4.1 A-B Audio fingerprint (direct + spectral) | L0b shipped; spectral is open-source library swap |
| 4.2 A-D Photo freshness + monotonic | L5 shipped |
| 5.1 A Multi-step approval | Production today: Pengawas → SM → PM |
| 5.2 D WORM storage | Single Supabase storage config flag |
| 5.4 A Botpress witness yes/no prompt | 10-minute Botpress flow change |
| 6.1 A KJPP at fixed milestones | Existing Indonesian standard, status quo |

**HIGH-MEDIUM band (20%) — engineering with threshold tuning:**

| Item | What needs tuning |
|---|---|
| 1.2 A-D Cross-photo consistency | Statistical thresholds calibrated during pilot |
| 1.6 A JPEG quantization fingerprinting | Catch-rate vs false-positive threshold |
| 1.6 C Screenshot detection | Phone-screen-resolution database maintenance |
| 3.1 B Per-unit centroid clustering | Cold-start tolerance; 2-sigma vs 3-sigma decision |
| 3.7 A-B Centroid-pattern + siteplan prediction | Tolerance based on Indonesian GPS noise per province |
| 4.4 A-D Behavioral baseline (rule-based) | Per-Pelaksana baseline calibration after 30 days |
| 5.4 B SM-side dashboard | UI engineering, but no product risk |
| 6.1 B AutoKon-routed KJPP triggers | Tier-classification thresholds; uses Dickson's existing system |

**MEDIUM band (15%) — ML-training-dependent:**

| Item | Training requirement |
|---|---|
| 1.3 C Multi-model AI ensemble | Vendor model selection + threshold tuning |
| 1.6 B IG-Story artifact detection | Labeled IG-Story-export vs camera-photo dataset |
| 1.6 D Photo-of-screen moiré detection | Labeled moiré-positive vs negative dataset |
| 1.6 E Photo-of-print detection | Labeled print-photo vs camera dataset |
| 2.3 A-B Voice-print of Pelaksana | Speaker-ID model + per-Pelaksana enrollment |
| 4.1 E Acoustic environment classifier | "Construction site vs not" labeled audio dataset |
| 4.6 B Call-to-prayer (azan) detector | Audio classifier + muezzin schedule API integration |
| 4.4 C Linguistic pattern matching | Per-Pelaksana chat history baseline |

**MEDIUM (vendor-dependent) band (10%) — partnership timelines:**

| Item | Partner |
|---|---|
| 2.2 E KYC partnership (Privy/Sumsub/Tilaka/Veriff) | Vendor selection + integration |
| 2.4 A-E Liveness via vendor + WhatsApp KYC | IDV vendor liveness API |
| 3.4 C BPN data integration | Government partnership; months of paperwork |
| 3.6 A-B Sentinel-2 + Planet Labs | API integration; trivial for Sentinel, commercial for Planet |
| 4.5 B-C RFC 3161 TSA + Privy/Tilaka | Vendor selection |
| 4.6 A BMKG weather correlation | Indonesian Meteorological Agency API integration |
| 6.5 Independent third-party signing | Privy/eMeterai integration |

**CONDITIONAL band (5%) — pilot-discoverable:**

| Item | Variable |
|---|---|
| The 30-second video ask itself | Pelaksana adoption rate (technical confidence high; behavioral confidence pilot-dependent) |
| Voice OTP success rate | Depends on language clarity, signal quality, Pelaksana willingness to speak |

### 1.3 What this means for the bank pitch

The honest sentence to a bank security team:

> *"Half the system is in production today, screening real construction evidence. Twenty percent is incremental engineering on that proven substrate. Fifteen percent requires labeled pilot data to calibrate. Ten percent depends on vendor partnerships — Privy, Sumsub, BMKG — that we either have or will sign in your pilot. Five percent — Pelaksana behavior change — is the variable we ship to learn. We're not promising perfection. We're promising you a system whose confidence scales as we run it together."*

That's defensible. It's also honest about the pilot-data dependency, which protects us from over-committing.

---

## §2 Realism rating (Dickson Q2: "Is it realistic?")

Per-item realism rating across three brackets.

### 2.1 Realistic for default flow (~90% of Phase 0)

**Items that work today within TARA AI architecture:**

- All HIGH-band items (Section 1.2)
- Most HIGH-MEDIUM items
- 1.6 A-D low-tech consumer-app fraud detectors (cheap engineering, deterministic)
- 3.7 A-B siteplan-relative cross-reference (math on existing data)
- 5.2 D WORM storage (config change)
- 5.4 A Botpress witness prompt (10-minute change)

**Realism risk: minimal.** No new infrastructure, no new behavior asks beyond the 30-second video.

### 2.2 Realistic only as PILOT-30 paid commitments (~5%)

**Items where realism depends on bank funding the build:**

- 1.3 C Multi-model AI ensemble — vendor licensing + integration cost
- 2.2 E KYC partnership — per-check vendor fees
- 2.3 Voice-print ML — engineering investment justified by paying bank
- 4.6 B Call-to-prayer detector — niche ML investment justified by named bank pilot
- 4.5 B RFC 3161 TSA — per-seal vendor fees
- 3.4 B Drone overflight ingest — engineering for a feature that bank pays for premium tier
- 6.2 A RT/RW witness program — honoraria budget required
- 6.5 Privy/eMeterai third-party signing — vendor fees per signature

**Realism risk: depends on commercial structure.** If the first signed bank pilot funds these as PILOT-30 commitments, realism is high. If we try to ship them speculatively, realism collapses.

### 2.3 Not realistic short-term (~5%) — roadmap-only naming

**Items honest enough to keep in pitch as direction but not as ship targets:**

- 1.4 B C2PA content credentials — waits on Pelaksana phone fleet upgrade (~2027+)
- 2.5 A Android Play Integrity API — requires custom AutoKon camera app
- 1.5 B Custom AutoKon camera app — adoption-friction problem for default flow
- 5.5 D HSM keys — multi-quarter engineering
- 5.6 C Database WAL export — significant infrastructure rewrite
- 5.2 C Event-sourcing architecture — multi-quarter rewrite
- 1.1 C PRNU sensor fingerprint — theoretical for Indonesian low-end-device fleet
- 3.4 C BPN data integration — partnership-blocked, months of paperwork

**Realism risk: high if treated as ship items.** Honest framing in the pitch is "we have the architectural framework to add these when conditions are right."

### 2.4 The single biggest realism question

**Pelaksana adoption of the 30-second video.** Everything else is server-side automation. The video is the one place where field behavior must change.

**My realistic estimate based on Indonesian field-ops baseline:**
- Month 1: 70-80% adoption (early adopters + SM enforcement)
- Month 3: 85-92% adoption (after Pelaksana habit forms)
- Month 6: 90-95% adoption (steady state)

**Mitigation if adoption is below estimate:**
- SM-enforced gate: no approval if no video
- Bonus structure for Pelaksana with 100% video compliance
- Botpress UX iteration to reduce friction
- Voice-OTP phrase simplification

This is a pilot-discoverable number. The realistic posture is *"high confidence in upper-end of range; commit to lower-end of range as SLA floor."*

---

## §3 Metrics framework (Dickson Q3: "How do we measure the results?")

Five metric categories. Each maps to what banks audit, what we control, and what we report.

### 3.1 Coverage metrics (system-deterministic, easy to commit)

| Metric | Definition | Target |
|---|---|---|
| Pipeline screening coverage | % of submissions screened through full 10-layer pipeline | 100% |
| Bronze tier human review | % of Bronze submissions routed to human review | 100% |
| Audit trail capture | % of submissions with complete chain-of-custody record | 100% |
| Schema integrity | % of submissions with all required fields populated | 100% |

**Measurement:** System-side counters, exposed via internal dashboard + bank-facing API. **Reported:** Real-time + monthly bank report.

### 3.2 Process performance metrics (deterministic, standard SaaS)

| Metric | Definition | Target |
|---|---|---|
| Submission acknowledgment time | Time from WhatsApp send to "received" confirmation | < 5 min, p95 |
| Validation pipeline completion | Time from submission to tier classification | < 30 min, p95 |
| Tier-3 review SLA | Time from Bronze flag to human review decision | < 24 hours, p95 |
| Report generation | Time from PM approval to PDF/HTML delivery | < 2 hours, p95 |
| Bank webhook delivery | Time from both signatures to webhook fire | < 1 min, p95 |
| System uptime | % availability of submission ingestion | 99.5% monthly |

**Measurement:** Application metrics (Sentry, Vercel analytics, Supabase observability). **Reported:** Monthly.

### 3.3 Detection effectiveness metrics (require pilot data)

| Metric | Definition | Pilot baseline | Steady-state target |
|---|---|---|---|
| Recycled photo detection (deterministic) | % of pHash-positive submissions caught | ≥ 95% | ≥ 98% |
| Stale photo replay (deterministic) | % of >14-day-old submissions caught | ≥ 95% | ≥ 99% |
| Adjacent-unit confusion (with siteplan) | % of cross-unit substitutions caught | ≥ 60% | ≥ 80% |
| AI-generated photo detection | % of test-set AI photos flagged | ≥ 70% | ≥ 85% |
| False-positive rate (legit submissions falsely flagged) | % of legit sessions flagged Bronze | ≤ 8% | ≤ 3% |
| Tier distribution: Gold | % of all sessions classified Gold | TBD pilot | ≥ 70% |
| Tier distribution: Bronze | % of all sessions classified Bronze | TBD pilot | ≤ 10% |

**Measurement:** Internal labeling of every submission outcome. SM/PM disputes tracked as ground-truth for false positives. Quarterly blind audit by KJPP on 10% sample. **Reported:** Quarterly bank review.

**Critical note:** Pilot-baseline numbers above are **defensible commit floors** based on Dickson's prototype data + industry benchmarks. Steady-state numbers calibrate after 6 months of pilot data.

### 3.4 Adoption metrics (operational signal)

| Metric | Definition | Target |
|---|---|---|
| Pelaksana session-with-video rate | % of sessions with successfully submitted walk-around video | ≥ 85% (M3), ≥ 95% (M6+) |
| Voice OTP success rate | % of videos with successful voice-print verification | ≥ 90% (M3), ≥ 96% (M6+) |
| SM witness response rate | % of approvals with witness yes/no captured | ≥ 95% |
| Tier-3 review queue depth | Avg # of Bronze submissions in review queue | < 50 |
| Pelaksana support tickets | # of Pelaksana-side issues per 100 sessions | < 5 |

**Measurement:** Workflow telemetry. **Reported:** Weekly to AutoKon ops; monthly to bank.

### 3.5 Outcome metrics (comparative, requires baseline)

| Metric | Definition | Target |
|---|---|---|
| KJPP visit reduction | % reduction in physical inspections vs offline-only baseline | ≥ 50% by M6 |
| Time-to-disbursement | End-to-end from session start to disbursement webhook | ≤ 36 hours, p90 |
| Fraud loss reduction | Estimated loss prevented vs offline-inspector baseline | ≥ 60% by M12 |
| Bank credit officer satisfaction | NPS-style score from bank's review team | ≥ 7/10 |

**Measurement:** Comparative analysis with the bank's own historical baseline data. **Reported:** Quarterly, jointly with bank.

---

## §4 SLA schedule — Pilot phase (months 1-6)

The pilot-phase posture: **commit hard on what we control, calibrate on what depends on real data.** Service credits on misses; no cash penalties.

### 4.1 Process SLAs (active from day 1, with service credits)

| SLA | Commitment | Service credit if missed |
|---|---|---|
| System uptime | **99.5% monthly** | 5% of monthly fee per 0.1% below 99.5%, capped at 50% |
| Submission acknowledgment | < 5 min p95 | 2% credit per 5% of submissions over 5 min |
| Validation pipeline completion | < 30 min p95 | 2% credit if > 30 min for > 5% of submissions |
| Tier-3 Bronze review | < 24 hours p95 | 3% credit per 5% of Bronze submissions over 24 hours |
| Report generation | < 2 hours p95 | 2% credit if > 2 hours for > 5% of reports |
| Bank webhook delivery | < 1 min p95 | 3% credit if > 5 min for > 1% of webhooks |
| Audit trail completeness | 100% | Material breach trigger if < 100% |

### 4.2 Coverage SLAs (active from day 1, with service credits)

| SLA | Commitment | Service credit |
|---|---|---|
| Pipeline screening coverage | 100% of submissions | Material breach if any session bypasses pipeline |
| Bronze tier human review routing | 100% of Bronze sessions | 5% credit per session bypassed |
| Schema integrity | 100% of submissions | Material breach if data incomplete |

### 4.3 Effectiveness SLAs (best-effort during pilot, no penalties)

For the **first 6 months**, effectiveness numbers are **measured and reported but not penalized.** Quarterly joint review with bank's risk team to:

- Establish observed pilot baselines
- Identify gaps and adjust thresholds
- Negotiate steady-state SLA numbers

**Why this is the right posture:**

- Pre-pilot, no vendor can honestly commit a fraud-detection rate. Stripe Radar publishes ranges based on observed data, not commitments. Sumsub IDV ranges are "claimed by vendor" not "guaranteed in contract."
- Bank gets quarterly transparency: every metric measured, every result reported, both sides see what's working.
- Steady-state numbers after pilot are **calibrated to reality**, not theoretical, which means they're commitments AutoKon can actually keep.

### 4.4 Effectiveness *commitments* during pilot (deterministic-mathematics-backed)

These ARE committed during pilot because they're deterministic, not ML:

| Commitment | Number | Service credit if missed |
|---|---|---|
| Recycled photo detection (pHash + spectral fingerprint) | ≥ 95% recall on exact-recycle attempts | 5% credit per 5% below 95% |
| Stale photo replay detection (freshness + monotonic) | ≥ 95% recall on >14-day-old submissions | 5% credit per 5% below 95% |
| Walk-around video required pass-through | 100% of sessions gated; no photos accepted without validated video | Material breach if bypassed |
| Audit trail tamper-evidence (WORM storage) | 100% of evidence files write-once-read-many | Material breach if any tampering |

These are mathematics-backed (pHash is deterministic), system-enforced (gating cannot be bypassed), or infrastructure-guaranteed (WORM is a storage property). **No pilot data needed to commit; we can defend these on day 1.**

---

## §5 SLA schedule — Steady-state (month 7+)

After the 6-month pilot, **effectiveness SLAs activate**, calibrated to observed pilot data.

### 5.1 Calibration process

At month 6, AutoKon and bank's risk team jointly review:

1. Observed effectiveness metrics across the 6-month pilot
2. False-positive rate and Pelaksana adoption signals
3. Industry benchmarks for context
4. Bank's own risk tolerance

Output: a **steady-state SLA schedule** with effectiveness numbers that AutoKon commits to with service-credit penalties.

### 5.2 Pre-calibration commit floors (defensible regardless of pilot data)

These are the **minimum** numbers AutoKon will commit at month 7 even if pilot data is pessimistic:

| Effectiveness SLA | Commit floor | Aspirational target |
|---|---|---|
| Recycled photo detection | ≥ 95% (already committed in pilot) | ≥ 98% |
| Stale photo replay detection | ≥ 95% (already committed in pilot) | ≥ 99% |
| Adjacent-unit confusion catch | ≥ 60% | ≥ 80% |
| AI-generated photo detection | ≥ 70% | ≥ 85% |
| False-positive rate cap | ≤ 8% | ≤ 3% |
| Pelaksana session-with-video rate | ≥ 85% | ≥ 95% |
| KJPP visit reduction vs baseline | ≥ 30% | ≥ 50% |

**The aspirational targets become the actual commitments if pilot data supports them.** If pilot data shows lower performance, AutoKon commits to the floor numbers above and works toward aspirational over subsequent quarters.

### 5.3 SLA evolution path

```
Month 1-6: PILOT
  ├─ Process SLAs:        ACTIVE with service credits
  ├─ Coverage SLAs:       ACTIVE with service credits
  ├─ Determ. effectiveness: ACTIVE with service credits (pHash, freshness, WORM)
  └─ ML/pilot effectiveness: MEASURED + REPORTED, no penalties

Month 6: JOINT REVIEW
  ├─ Pilot data review with bank risk team
  ├─ Calibrate steady-state numbers
  └─ Sign updated SLA schedule

Month 7+: STEADY-STATE
  ├─ All Pilot SLAs continue
  └─ ML/pilot effectiveness: ACTIVE with service credits at calibrated numbers

Month 12: ANNUAL REVIEW
  ├─ Re-baseline metrics with annual data
  └─ Adjust aspirational → committed where data supports
```

---

## §6 Service credit structure

**Standard SaaS B2B pattern.** No cash penalties, no claw-backs, no termination-without-cause.

### 6.1 Calculation

Service credits applied as a percentage discount on the next monthly invoice. Cumulative cap: 50% of monthly fee per month. Excess miss is a material breach trigger requiring remediation plan.

### 6.2 Trigger thresholds and credit amounts

(See Section 4.1 for per-SLA credit amounts.)

### 6.3 Notification + remediation flow

1. **AutoKon self-reports SLA miss within 24 hours** via bank dashboard + email notification.
2. **Service credit applied automatically** on next invoice.
3. **If miss is sustained for 3 consecutive months** for any single SLA, AutoKon delivers written remediation plan within 14 days.
4. **If remediation plan fails 90 days after acceptance**, bank may invoke material breach clause.
5. **Material breach** triggers escalation to AutoKon executive review and potential termination right (without penalty).

### 6.4 What AutoKon does NOT accept in negotiation

- Cash penalties for SLA miss (industry pattern is service credits only)
- Liquidated damages clauses tied to AutoKon's effectiveness metrics
- Claw-back of historical service fees on future SLA miss
- Personal liability or guarantor structure for effectiveness numbers

These are negotiation lines AutoKon's commercial team holds firmly. Banks who insist are not the right pilot partners.

---

## §7 What we explicitly do NOT commit numerically (and why)

**Banks may push for "what % of fraud will AutoKon catch?" as a single number SLA. AutoKon's answer: we don't commit this, and here's why.**

### 7.1 The reasoning

Fraud detection effectiveness depends on:
1. **What fraud is attempted** (constantly evolving threat landscape)
2. **The bank's own underwriting** (which sessions enter our pipeline at all)
3. **The Pelaksana workforce quality** (developer-controlled)
4. **External factors** (macro fraud trends, new attacker tools)

AutoKon controls the screening pipeline. AutoKon does NOT control the threat landscape, the bank's underwriting, or Indonesia's broader fraud trends. **Committing a single fraud-detection rate would have AutoKon underwriting the bank's own underwriting decision** — an asymmetric risk we shouldn't accept and any reasonable contract negotiator on our side wouldn't accept.

### 7.2 The industry pattern

| Vendor | Public benchmark | Contractual SLA |
|---|---|---|
| Stripe Radar | "~85% precision, ~70% recall on card fraud" (publicly disclosed) | Process + coverage SLAs only; no fraud-rate SLA |
| Sumsub IDV | "99% liveness accuracy" (vendor-claimed) | Process + coverage SLAs; effectiveness as best-effort |
| Onfido | "<1% false-positive rate" (vendor-claimed) | Process + coverage SLAs |
| AWS Fraud Detector | (no public benchmark) | Process + coverage SLAs only |
| Indonesian Dukcapil | "98% NIK match" (regulator-mandated) | Coverage SLA only; no effectiveness SLA |

**No mature fraud-detection vendor commits raw fraud-rate numbers as contractual SLAs. AutoKon shouldn't be the first.**

### 7.3 What we offer instead

**Process + coverage commitments** (deterministic, defensible) **+ measured effectiveness with quarterly transparency** (calibrated to pilot data) **+ industry-benchmark-aligned aspirational targets** (visible in pitch but not contractual).

This is what banks actually negotiate when their commercial counterparties are mature. The first bank that signs AutoKon will negotiate this structure with us; the second bank inherits the precedent.

---

## §8 Industry benchmark reference

When defending the SLA proposal in negotiation, these are the public benchmarks Dickson can cite:

| Capability | Vendor | Public claim | AutoKon equivalent |
|---|---|---|---|
| Card fraud detection | Stripe Radar | ~85% precision, ~70% recall | We're in the same ballpark; better in pilot data + Indonesian context |
| Liveness detection | FaceTec / Sumsub | 99% accuracy on FIDO Alliance benchmark | Via our KYC partner (Privy/Sumsub/Tilaka) |
| Document authentication | Onfido | <1% false-positive rate | KYC partner-dependent |
| AI-generated image detection | Hive AI / Sensity | 90-95% claimed | Via our AI ensemble vendor selection |
| Audio fingerprinting | Shazam / AudibleMagic | Industry standard (used by streaming platforms) | We use the same forensic approach |
| Time-stamp authority | DigiCert / FreeTSA | RFC 3161 standard | Via TSA vendor selection |
| Indonesian e-KTP verification | Dukcapil (regulator) | 98% NIK match accuracy | If we partner via Privy/Tilaka, we inherit this |

**These benchmarks give Dickson commercial cover.** When a bank asks "but Stripe says 85%, why don't you commit 85%?", the answer is: *"Stripe doesn't commit 85% in their contract either. They publish 85% as a marketing benchmark. The contractual SLA is process + coverage. We follow the same pattern."*

---

## §9 Bank negotiation positioning — common pushbacks and responses

### Pushback: "We need a fraud-detection rate SLA or we can't sign."

**Response:** *"No mature fraud-detection vendor in the world commits raw fraud-rate numbers. Stripe Radar doesn't. Sumsub doesn't. Onfido doesn't. The reason is simple — fraud effectiveness depends on what attackers attempt, which neither party controls. What we commit is process + coverage with service credits, plus quarterly transparency on effectiveness. After 6 months of pilot data, we calibrate steady-state effectiveness commitments together. This is the SaaS standard, and frankly, any vendor who commits a single fraud-rate number on day 1 is either lying or about to lose money."*

### Pushback: "Cash penalties only — service credits aren't strong enough signal."

**Response:** *"AWS, Stripe, Vercel, Supabase, and every major Indonesian SaaS vendor uses service credits, not cash penalties. The reason is contractual coherence — service credits scale with the relationship. A vendor who pays cash penalties on misses tends to under-invest in fixing the underlying issue because they're already paying the cost. Service credits create an incentive to over-invest in fix to retain the relationship."*

### Pushback: "Termination right after first material breach, not third."

**Response:** *"The standard SaaS pattern is termination right after sustained breach (typically 3 months). The reason is operational continuity — banks don't want a vendor switch every time there's a temporary issue, and AutoKon doesn't want to be replaceable on a single bad month. After 3 consecutive months of miss with a remediation plan that hasn't worked, both sides have evidence the partnership isn't working. That's the right termination trigger."*

### Pushback: "Why is Pelaksana adoption AutoKon's responsibility?"

**Response:** *"It's a shared responsibility — AutoKon designs the UX and provides the tooling; the developer's PM/SM enforce the workflow. We commit to a Pelaksana-adoption-rate SLA at the system level (≥ 85% by month 3), but we explicitly note that the bank, the developer, and AutoKon all contribute to this. If adoption drops below threshold, we jointly diagnose: is it UX, enforcement, or training?"*

### Pushback: "Why can't we get a custom SLA at higher numbers — we'll pay more."

**Response:** *"PILOT-30 is the structure for that. Higher-confidence-tier features — custom AutoKon camera app, KYC partnership integration, Sentinel-2 + Planet Labs satellite, RFC 3161 sealing, RT/RW witness program — are PILOT-30 commitments funded by the first signed bank pilot. We deliver these in 30 days from your signature. They unlock higher-confidence numbers that we'd commit at higher SLA levels. Different tier, different number, transparent pricing."*

---

## §10 Open questions for commercial decision

Before AutoKon's commercial team takes this proposal to a bank, six decisions need Dickson's call:

1. **Pilot duration.** 6 months is the proposed default. Some banks will push for 12 months "trial" before contract. Some will push for 3 months. Recommendation: 6 months minimum, as that's the time-to-baseline for ML metrics.

2. **Service credit cap.** 50% of monthly fee proposed. Standard SaaS is 25-50%. Banks may push for 100%. Recommendation: 50% max — beyond that, AutoKon is exposed.

3. **Material breach threshold.** 3 consecutive months proposed. Banks may push for 1 month. Recommendation: 3 months minimum — operational stability requires it.

4. **What counts as "fraud" in joint metrics.** Need joint definition: only KJPP-confirmed fraud cases? AutoKon-flagged + bank-confirmed? AutoKon-flagged regardless of confirmation? This shapes effectiveness measurement.

5. **Pricing implication of PILOT-30 commitments.** If a bank wants the premium-tier features, what's the price uplift vs default tier? Recommendation: 50-100% above default pricing for first signed bank; this funds the engineering investment.

6. **Reporting cadence.** Monthly minimum proposed. Banks may want weekly. Recommendation: monthly default with weekly bank-side dashboard access for self-serve.

---

## §11 Summary — the SLA proposal in one paragraph

**AutoKon commits hard on what it controls (uptime, performance, coverage) with service-credit penalties from day 1. AutoKon commits with discipline on deterministic-math-backed effectiveness (pHash, freshness, WORM) from day 1. AutoKon measures and reports ML-driven effectiveness during the 6-month pilot without penalty, then activates calibrated effectiveness SLAs at month 7. The penalty structure is service credits only — standard SaaS B2B pattern. The first signed bank gets PILOT-30 premium features funded by their pilot. We do not commit raw fraud-detection rates as a single number; no mature vendor does, and we follow industry pattern.**

That's the answer Dickson can defend in front of a bank legal team, a CFO, and an audit committee.

---

*End of SLA proposal. Companion artifact: `sla.html` (interactive version). Ready for Dickson's review and commercial team's onward use in bank negotiations.*

*Authored 2026-05-01. Adrian (VP Product, AutoKon) + Claude Cowork.*
