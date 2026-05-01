# AutoKon — Evidence Integrity R&D Brief

**Version:** v1.0 · 2026-05-01
**Authors:** Adrian (VP Product, AutoKon) + Claude Cowork
**Builds on:** Dickson + Claude evidence integrity summary (`product-bank/prototypes/evidence-integrity/`, 2026-04-30 → 2026-05-01)
**For review by:** Dickson (CEO), Faishal (CTO)
**Status:** Comprehensive R&D brief. Disregards engineering and operational difficulty — proposes the full menu of options for prioritization. Disregards the deterministic-vs-agentic AI distinction; what banks see is features, not implementation choices.

---

## TL;DR

The bank pitch (BSN/BTN) hinges on one promise: **"prove the photo is real, taken now, of the unit it claims to be — and the audit trail behind it cannot be tampered with."** Dickson's prior work landed a 10-layer additive validation pipeline organized by engineering layer; this brief reorganizes that work — plus selectively-revived rejected items, plus new categories that close the bank-pitch gap — into **6 audience-first pillars** that map to bank concerns directly.

The 6 pillars are: **Authenticity** (is this photo real?), **Identity** (is the submitter who they claim?), **Place** (is this the actual unit?), **Time** (was this captured now?), **Chain of Custody** (can this record be tampered with post-hoc?), and **Independent Verification** (do you ever rely on something other than your own software?).

Across 6 pillars there are 35 items, with 100+ proposed solutions analyzed across multiple dimensions: cost, engineering complexity, implementability today, low-end-device friendliness, Pelaksana friction, pitch story strength, false-positive risk, and adversarial difficulty. Two cross-cutting lenses introduced during the R&D brainstorm shape the recommended ship priorities: **threat motivation** (which fraud is actually economically motivated for whom) and **attacker tech-savviness** (Indonesian field fraudsters are mostly low-tech with high motivation; Word-export-edit-reexport and Instagram-Story overlays are far more common than cryptographic forgery).

The recommended ship priority is **Phase 0** (high-motivation, high-volume, low-engineering-cost defenses + items already shipped in Dickson's prototype) → **Phase 1** (premium-tier features the first signed bank pilot funds) → **Phase 2** (roadmap-named features that build pitch credibility but await observed-attack data) → **Roadmap reserve** (named for completeness, deferred until real-world fraud data justifies investment).

Two key takeaways for the bank pitch:

1. **AutoKon is engineered for Indonesian field reality** — equatorial sun-angle math, BMKG weather feeds, call-to-prayer audio cross-check, RT/RW witness signatures, low-tech consumer-app fraud detectors (Word/IG-Story/screenshots), siteplan-relative GPS pattern matching that respects archipelago infrastructure realities. No US/EU competitor would think to build any of these.
2. **AutoKon makes the inspector 10x more focused** — software pre-screens, KJPP physical inspection inspects what software flags. Software catches ~80% of realistic fraud volume deterministically; the residual 20% is structurally chain-of-custody (multi-step approval + KJPP at draw milestones — already part of how Indonesian banks operate).

---

## Document Map

| Section | Pages | What it contains |
|---|---|---|
| **TL;DR** | 1 | This page. |
| **§1 Locked principles** | 2 | Two non-negotiable principles inherited from the v3.3 reports-roadmap PRD + supplementary principles from Pak Jun memo. |
| **§2 Two cross-cutting lenses** | 2 | Threat motivation lens + tech-savviness lens. The 2x2 that organizes everything. |
| **§3 The 6 pillars** | 18 | Main body. Each pillar: bank's question, items with threat description + threat motivation + Dickson's existing solution if any + 2–5 solutions with multi-dimensional +/-. |
| **§4 Master item table** | 2 | Every item across 6 pillars in a single sortable table. |
| **§5 Recommended ship priority** | 2 | Phase 0 / Phase 1 / Phase 2 / Roadmap reserve. |
| **§6 Pitch language reference** | 2 | Actual sentences for the bank pitch deck, organized by pillar. |
| **§7 Open questions for decision** | 1 | What Dickson + Faishal need to decide before engineering can proceed. |
| **§8 Appendix** | 1 | Relationship to existing AutoKon work (Dickson's 10-layer summary, Pak Jun's 19 product asks, the bank-pitch repo, V2.1 CPS, F3a Design System). |

---

## §1 Locked Principles

These are inherited from the AutoKon reports-roadmap PRD v3.3 (OpusPrime + Dickson, April 2026) and the Pak Jun product recommendations (April 24-25, 2026). This brief respects them without modification.

### 1.1 Quality is out of scope

AutoKon verifies *that* progress was done, not *that* the work is high quality.

- **Out:** SMKK compliance exports, quality inspections, SNI checklist reports, warranty defect audits, anything framed as QC.
- **In:** progress verification, rework tracking (financial ledger), retention release gates.
- The `diterima/diperbaiki` binary stays, reframed: *diperbaiki* = "claim needs revision," not "fix the defect."

This brief does not propose any fraud-detection layer that crosses into quality assessment. Every solution below is about verifying that the claimed event happened, not that the work is good.

### 1.2 Developers are the customer. Contractors are the counterparty.

Every AutoKon user works for the developer. Pelaksana, SM, PM, Finance, Owner — all developer-side. **Contractors never touch AutoKon.**

- PDF signatures: developer-org roles only.
- Document voice: "developer certifies that contractor work is [done/needs revision]." Not "both parties agree."
- Pelaksana rework feedback stays inside the developer's workflow.

This brief proposes signature/attestation flows only within the developer organization. No contractor signatures, no contractor logins, no contractor-side surfaces.

### 1.3 The bank is the primary user (Pak Jun's April 24 reframe)

For the bank pitch context, the bank is the buyer. The bank inputs the project record first; the developer onboards against it. Reports go to the bank as the audience; raw photos and process noise stay internal.

Implication for evidence integrity: the entire pitch story is built around what banks need to see, sign, share, and store. *Reports*, not *raw process*, are the bank-facing surface (Pak Jun #8). Bank PIC digital signature triggers fund disbursement (Pak Jun #9). KTP capture at handover is liability transfer (Pak Jun #10).

### 1.4 No recurring ground discipline

Throughout Dickson's design, anything requiring sustained ground-side discipline was rejected because Indonesian field operations don't sustain it. This brief preserves that posture except for **selectively revived one-time-cost items** — capture-at-onboarding tasks (KTP enrollment, siteplan upload, 360° baseline photo at project kickoff, drone overflight if developer already operates one) are eligible for revival because they're not recurring discipline.

What stays rejected: per-photo unit-painting, daily code rotation on paper, per-Pelaksana unit-assignment registry that requires foreman discipline, document-mode WhatsApp that relies on Pelaksana attention every time.

### 1.5 Indonesian field reality is a binding constraint, not a polite caveat

Three observations from Adrian (April 2026 brainstorm) that shape multiple pillars:

- **Cell-tower triangulation in eastern Indonesia is poor.** GPS readings drift ±30m+ in low-coverage provinces (NTT, Maluku, Papua). Solutions that gate on surveyor-grade GPS will never ship.
- **Indonesians use full addresses, not pin coordinates.** Shopee, Tokopedia, Grab Food, Gojek Food all default to typed addresses + landmarks. Bank PICs aren't going to type lat/long; they'll type the address.
- **Most Indonesian field fraudsters are low-tech with high motivation.** They use Microsoft Word to swap photos in PDFs and re-export. They use Instagram Story to layer overlays on fake photos. They screenshot other people's photos. They photograph printed photos. **Pillar 1 needs an explicit Item 1.6 covering these.**

---

## §2 Two Cross-Cutting Lenses

These two lenses, introduced during the brainstorm with Adrian, organize the recommended ship priorities. They cut across all 6 pillars and all 35 items.

### 2.1 Threat Motivation

For each fraud type, who has the economic motivation to commit it, and how strongly?

| Threat actor | Strong motivation | Weak motivation |
|---|---|---|
| **Developer (primary actor in FLPP construction-finance fraud)** | Recycling photos to cover delayed units · Adjacent-unit substitution · Backdating by weeks (when project genuinely behind) · Forged AI-generated photos when nothing was built · Submitting another developer's photos · Photo-of-printed-photo cover-ups | Sub-hour time-shift · Day-of-week shifting · Cryptographic forgery (technical sophistication required) |
| **Pelaksana (secondary actor)** | Buddy submission (laziness, side gigs) · Backdating sloppy work by hours/days · Account share for convenience | Edit-forgery (technical sophistication) · AI-generation (technical sophistication) |
| **External attacker** | All of the above, depending on access | Volume-driven attacks (low payoff per project) |
| **Insider (AutoKon employee, hacker via breach)** | Post-hoc database tampering · Audit-log forgery · Signature backdating | Real-time fraud submission (no need; have direct DB access) |

**Implication:** Solutions that defend against threats no one has motivation to commit are deprioritized. Solutions that defend against widely-motivated threats are prioritized — even if technically less impressive than the niche defenses.

### 2.2 Attacker Tech-Savviness

Most photo-fraud research assumes sophisticated attackers (cryptographic forgery, deep-learning AI generation, sensor PRNU manipulation). The dominant Indonesian fraud reality is the opposite — low-tech, consumer-app-grade fraud committed by motivated but technically-limited fraudsters.

| Attacker profile | Common attack surface | Coverage in 6-pillar framework |
|---|---|---|
| **Low-tech (most common in Indonesia)** | Word PDF export-edit-reexport · Instagram Story / IG Layout overlays · Screenshot-of-photo · Photo-of-printed-photo · WhatsApp re-share / forward · Basic phone editor (PicsArt, Canva) | **Pillars 1-4 catch ~80% of this volume.** Item 1.6 adds explicit consumer-app-grade fraud detectors. |
| **Medium-tech (uncommon)** | EXIF manipulation · Custom timestamp-camera spoofs · Fake-GPS Android apps · Multi-device coordination · Account share with cooperation | **Pillars 1, 2, 3 catch most of this.** Identity binding (Pillar 2) is the primary defense. |
| **High-tech (very rare)** | AI-generated photos · Sophisticated PRNU manipulation · Cryptographic forgery · Insider attacks | **Pillar 1 (AI detection) + Pillar 5 (chain of custody).** Banks audit Pillar 5 even though volume is low. |

### 2.3 The 2x2

```
                   Tech-savvy attacker
                         ▲
                         │
                         │
    Cryptographic        │     AI-generated
    forgery,             │     photos,
    insider attack       │     deepfake video
    (Pillar 5)           │     (Pillar 1.4)
                         │
    Low motivation ──────┼────── High motivation
                         │
    Sub-hour time        │     Word export, IG
    shift, weather       │     Story, screenshot,
    inconsistency        │     adjacent-unit, recycling
    (Pillar 4 Tier C)    │     (Pillars 1.1, 1.6, 3.1)
                         │
                         ▼
                 Tech-unsavvy attacker
```

**The volume-of-fraud quadrant is bottom-right** (low-tech attacker × high motivation). That's where AutoKon must focus engineering effort. The top-right (high-tech × high motivation) is where bank security teams audit but actual fraud is rare. The bottom-left and top-left are nearly empty.

---

## §3 The Six Pillars

Each pillar opens with the bank's question, names its scope, and walks each item with: threat description, threat motivation, Dickson's existing solution if any, 2-5 proposed solutions with multi-dimensional +/-, and a recommended take.

---

### Pillar 1 — Authenticity

**Bank's question:** *"Is this photo real, or is it fabricated, edited, or AI-generated?"*

**Scope:** All threats to the underlying authenticity of a photo's content. From sophisticated AI generation at the high-tech end to Microsoft Word export-edit at the low-tech end.

**Six items.**

#### Item 1.1 — Photo Recycling Detection

**Threat:** Pelaksana submits the same file (or a near-duplicate) across multiple sessions, units, or projects to claim work they didn't do. Dickson's #1 ranked attack, "very high frequency."

**Threat motivation:** Developer-side strong (cover delayed units), Pelaksana-side strong (laziness).

**Dickson's existing solution:** **pHash + project-scoped history**. Per-photo classification: `unique` / `fresh_revisit` / `exact_recycle`.

**Solutions:**

- **A. pHash + project-scoped history (Dickson's, baseline).** **+** Cost zero, deterministic, fast. **+** Already shipped. **+** `fresh_revisit` distinction prevents false positives during long interior stages. **−** Sophisticated attacker re-encodes/re-crops to push past Hamming threshold. **−** Project-scoped only; cross-project recycling missed.
- **B. Deep-learning feature-embedding similarity.** **+** Catches re-encoded / re-cropped recycling pHash misses. **+** Same model powers cross-project search for AutoKon Ops. **+** Cost ~$0.001 per photo. **−** Higher false-positive than pHash; threshold tuning needed during pilot.
- **C. Camera-sensor fingerprint (PRNU — Photo Response Non-Uniformity).** **+** Forensic-grade — used in courts. Strong pitch line *"courtroom-grade evidence."* **−** Theoretical for Indonesian field reality: requires 50–100 photo training set per phone before fingerprint stabilizes. WhatsApp recompression on low-end Android may degrade signature beyond detection. Engineering investment is real (forensics-academic literature, not turnkey). **−** Low-end-device friendliness uncertain.

**Take:** A is shipped. B is the second-layer addition for cross-project checks. C is a pitch-story option but theoretical for Indonesian device reality.

#### Item 1.2 — Cross-Photo Consistency

**Threat:** Pelaksana scripts or batch-generates a submission. 10 photos shot in 5 minutes back-to-back. Dickson's #11 ranked attack, "low-medium" frequency.

**Threat motivation:** Pelaksana-side medium (gaming the system), developer-side low (more work than just recycling).

**Dickson's existing solution:** L3 cross-photo consistency, 5 pts in scoring. Light description in his doc.

**Solutions:**

- **A. Time-spread statistical check.** **+** Real Pelaksana takes 10 photos over 5–30 min walking unit-to-spec. Scripted batch shows clustered timestamps. **+** Pairs with audio fingerprint of walk-around video. **+** Cost zero. **−** Patient attacker spaces fakes over 30 min.
- **B. Lighting / shadow direction consistency across batch.** **+** Sun moves ~15°/hour. Batch claiming 30 min should show consistent sun direction within ±8°. **+** Catches mixed-day batches. **+** *"We use sun position to verify time"* lands. **−** Indoor / cloudy day = no shadow signal.
- **C. Photo metadata + content cross-correlation (Claude-based, batch-level).** **+** Catches sophisticated mixed-batch fraud. **+** Already partially in Dickson's L1. **−** Adds Claude call per session (~$0.02). Slower to debug false positives.
- **D. Per-spec or per-session walk-around video as cross-photo consistency input.** **+** Cross-listed with Dickson's L0a. Audio + GPS trace from the video constrain what photos can claim. **+** Cost: zero (uses existing pipeline). **−** Friction already absorbed elsewhere.

**Take:** A is cheap and worth shipping immediately. B is high pitch-story value and ships at low cost. C is the deepest layer; justifies cost only if A+B are insufficient in pilot data. D is the substrate for the entire pillar.

#### Item 1.3 — Edit / Photoshop Forgery (ELA)

**Threat:** Photo opened in Photoshop / Lightroom / phone editor; timestamp or GPS overlay altered, then re-exported. Dickson's #14 ranked attack, "low frequency" but devastating.

**Threat motivation:** Medium for developer-side (covering specific units), low-medium for Pelaksana-side.

**Dickson's existing solution:** Deferred to Phase 0 — ELA (Error Level Analysis).

**Solutions:**

- **A. ELA (Error Level Analysis — Dickson's pick).** **+** Standard forensic technique. Open-source implementations. **+** Visual heatmap output makes great demo material. **−** WhatsApp recompression itself produces ELA noise; false-positive risk high. Threshold tuning critical.
- **B. PRNU sensor-pattern check.** Cross-listed with Item 1.1 Solution C. Same caveats — theoretical for low-end Indonesian devices.
- **C. Multi-model AI forgery ensemble (Hugging Face / commercial APIs).** **+** As an AI tech company, AutoKon should enable this. **+** Future-proof — models swappable as new techniques emerge. **+** Cost: $0.005–0.02 per photo through commercial APIs. **−** Models trained on faces/general media; construction-specific forgery may not match training distribution.

**Take:** A first because standard, cheap, demos visually. C as the AI ensemble — Adrian's "as an AI tech company we should enable this" argument is right. Pitch line: *"Multi-model AI ensemble screening every photo for editing tells."*

#### Item 1.4 — AI-Generated Photo Detection

**Threat:** Stable Diffusion, Midjourney, or similar generates a "construction-progress" photo from a text prompt. Dickson's #16 ranked, "near-zero frequency" today, deferred until observed.

**Threat motivation:** Developer-side high if AI tools become accessible enough. Today's Indonesian field actor profile makes this rare; tomorrow's may be common.

**Real-world Indonesian context:** The JAKI Pemprov DKI / Gemini watermark scandal (2024–early 2025) — Jakarta administration's anti-illegal-parking account posted AI-generated "after" photos with the Gemini watermark visible bottom-right. Went viral as proof that even government accounts can't or don't screen for AI generation tells. **The pitch case for not deferring: if Pemprov DKI couldn't catch this, why would a bank trust an unscreened photo pipeline?**

**Solutions:**

- **A. Stable-Diffusion artifact detector (off-the-shelf model).** **+** Deployable today via Claude / Hugging Face APIs. **+** *"We screen every photo against AI-generation detectors"* is a clean pitch sentence. **−** Adversarial — model swap needed every 3-6 months as SD authors push to defeat detectors.
- **B. C2PA content credentials check.** **+** Industry-standard, future-proof. Adobe/Microsoft/Sony/Canon all support it. Banks recognize. **−** Pelaksana phones in Indonesian field sites are mostly low-end without C2PA support (~5% device fleet today). WhatsApp strips C2PA on recompression. Realistically a 2027+ feature.
- **C. Frequency-domain statistical analysis.** **+** Cheap, deterministic, no model that becomes outdated. **+** Useful as a layer alongside A. **−** Sophisticated AI photo with simulated sensor noise defeats it.

**Take:** A is the headline pitch answer ("we run every photo through state-of-the-art AI-fake detectors"). C as backup deterministic layer. B is a roadmap line for the bank pitch even though deployable only later.

#### Item 1.5 — Trusted-Source Overlay Validation

**Threat:** Pelaksana submits a photo from a normal camera app (no overlay) or from an app that fakes the overlay format. Dickson's L1 critical-layer.

**Threat motivation:** Pelaksana-side strong (using personal camera app for convenience), developer-side strong (escape verification).

**Dickson's existing solution:** **Visible overlay parsed by Claude.** If missing or malformed, fail. 15 pts, critical (caps at Bronze).

**Solutions:**

- **A. Whitelisted timestamp-camera apps + Claude-parsed overlay (Dickson's, baseline).** **+** Cost zero per photo (Claude already in pipeline). **+** Already shipped. **−** Approved apps can be visually spoofed.
- **B. Custom AutoKon-branded camera app.** **+** Defeats overlay spoofing entirely (server-signed token in overlay). **+** Pairs naturally with Item 2.5 device attestation. **−** Custom-app friction — Dickson rejected for adoption. **★ R&D revival:** if a bank pays for the friction (via developer's contract), it's no longer adoption-friction, it's commercial-justified. Becomes PILOT-30 commitment. Also enables Item 2.5 Solution A (Play Integrity) "for free."
- **C. Server-side overlay validation via Claude OCR + structure check.** **+** Tolerates app diversity. Just enforces required fields (GPS, timestamp WIB, Pelaksana name, unit ID). **+** Implementable today. **−** Doesn't catch overlay-spoofing apps that fake all fields.

**Take:** A is shipped — keep. C is a baseline most production systems use — add. B is the bank-pitch PILOT-30 commitment for premium higher-trust mode.

#### Item 1.6 (NEW) — Low-Tech Indonesian Consumer-App Fraud Detection

**Threat:** The dominant Indonesian fraud profile per Adrian's brainstorm. Specific named attack vectors:

1. **PDF-Word-export-reedit-reexport** — open existing valid BASTP PDF in Word, swap photos, re-export.
2. **Instagram Story / IG Layout overlay** — run a fake photo through IG Story, add stickers/text/timestamps, export.
3. **Screenshot-of-photo / photo-of-screen** — screenshot someone else's photo, re-submit.
4. **Photo-of-printed-photo** — print a photo, photograph the print.
5. **WhatsApp re-share / forward washing** — forward through multiple chats to wash original metadata.
6. **Basic phone-editor manipulation** — PicsArt, Canva, WhatsApp's built-in editor.

**Threat motivation:** Highest. Low technical barrier × high economic incentive = the canonical Indonesian fraud profile.

**Dickson's existing solution:** None explicit. ELA (Item 1.3) and pHash (Item 1.1) catch some of this, but with high false-positive rates and gaps. This pillar item is largely new R&D for AutoKon.

**Solutions:**

- **A. JPEG quantization-table fingerprinting (catches Word + phone-app re-encodes).** **+** Microsoft Word, Photoshop, Instagram, WhatsApp all use specific JPEG quantization tables when embedding/exporting. Phone cameras use different tables. Detection of "this photo was last saved by Word" becomes deterministic. **+** Open-source forensic libraries (python-jpeg-toolbox, ImageMagick). **+** Implementable in a few weeks. **+** *"We can detect when a photo was last saved by Microsoft Word, Photoshop, Instagram, or other consumer apps"* — visceral pitch line. **−** Sophisticated attacker re-saves through quality matcher to defeat.
- **B. Instagram-Story / IG-Layout artifact detection.** **+** IG Story exports have specific aspect ratios (9:16), specific compression signatures, sticker/text-layer transitions that look unnatural under image analysis. **+** ML model trained on labeled "IG Story exports vs camera photos" — small dataset, achievable. **+** Indonesian-context relevance highest. **+** *"We catch the Instagram Story overlay trick"* — banks find it amusing AND convincing. **−** False-positive risk medium for Pelaksana legitimately using IG-shared photos.
- **C. Screenshot detection (image dimensions + screen-capture artifacts).** **+** Screenshots have *exactly* the device's screen resolution. iPhone 14 = 1170×2532, Samsung A52 = 1080×2400. Detection of dimension match flags. **+** Cost zero — just a dimension check against a known-screen-resolutions list. **+** Trivial to implement. **−** Genuine camera photos almost never match exact screen dimensions; very low false-positive risk.
- **D. Photo-of-screen detection (moiré pattern + reflection analysis).** **+** Camera capturing a digital screen produces moiré patterns and reflection artifacts that don't appear in genuine photos. **+** Off-the-shelf moiré detectors or fine-tuned classifier. **+** Strong Indonesian-context fit (low-tech fraud detection). **−** Low false-positive risk.
- **E. Photo-of-printed-photo detection (paper texture + color cast).** **+** Photographing a print introduces paper texture, warm color cast, printer dot patterns. **+** ML classifier on paper-texture detection. **−** Some legitimate construction photos have paper-textured surfaces (drawings, signage). False-positive risk medium.
- **F. WhatsApp re-share detection (compression signature + EXIF stripping).** **+** WhatsApp re-compresses every forward to specific quality settings. Detection of "WhatsApp's signature compression with no GPS and 3+ forward markers" flags re-shared content. **+** Cost zero. **−** Some legitimate forwarding happens.

**Take:** Solutions A + B + C + D should be the immediate Phase 0 priority. They directly address the highest-volume Indonesian fraud vectors, are individually cheap, and have very high pitch story value (*"We catch the Word-export trick. We catch the Instagram Story trick. We catch screenshots. We catch photos of printed photos."*). E and F are second-tier additions.

---

### Pillar 2 — Identity

**Bank's question:** *"Is the person submitting this who they claim to be? Is the developer's PIC really the one signing off?"*

**Scope:** Legal and operational accountability for who took the photo, who approved it, who signed the report. Pak Jun #10 lives here ("when there is a legal issue, he is the one responsible").

**Five items.**

#### Item 2.1 — Phone-Number Binding

**Threat:** Buddy submission. Account share. WhatsApp credentials theft.

**Threat motivation:** Pelaksana-side strong (laziness, side gigs).

**Dickson's existing solution:** Phone-number-as-identity tied to project roles, RBAC.

**Solutions:**

- **A. Strict phone whitelist + WhatsApp number verification (Dickson's, baseline).** **+** Already shipped. **+** Costs near-zero. **−** Defeatable: Pelaksana willingly hands phone to a buddy.
- **B. Two-factor OTP at session start.** **+** Adversarial difficulty medium. Buddy submission gets harder. **+** Cost low (~Rp 200/SMS). **−** Pelaksana friction adds 30–60s. SIM swap defeats.
- **C. WhatsApp Business API verified-business sender + per-message read-receipts cross-check.** **+** Stronger sender verification. *"We're built on WhatsApp Business API"* is a clean pitch line. **−** BSP migration (Twilio, Wati, 360dialog) is real engineering. WhatsApp Business charges per-conversation. **−** Doesn't defeat buddy submission.
- **D. Periodic re-authentication via biometric or KTP photo.** **+** Adversarial difficulty medium-high. Every 7/14/30 days, re-verify. **+** Pelaksana friction low (once per period). **+** Pairs with Items 2.2 + 2.4. **−** Doesn't catch buddy submission between re-auth windows.

**Take:** A is shipped. B/C/D are PILOT-30 upgrades.

#### Item 2.2 — KTP-Bound Capture (Pak Jun #10)

**Threat:** No legal-grade tie back to a specific human with a national ID.

**Threat motivation:** Pak Jun's exact framing — *"when there is a legal issue, he is the one responsible."* Banks need this for liability transfer.

**Dickson's existing:** Listed PILOT-30 — handover photo of PIC holding KTP, captured via Pengawas WhatsApp flow.

**Solutions:**

- **A. One-time KTP enrollment at Pelaksana onboarding (developer-side setup task).** **+** Implementable today. **+** Pelaksana friction zero post-onboarding. **−** Doesn't tell us *who pressed the button*; just "we have KTP on file."
- **B. Per-session KTP holding photo (Pak Jun's exact ask).** **+** Adversarial difficulty high. **+** Pak Jun explicitly endorsed. **+** *"Every session requires Pelaksana to hold KTP visibly in a fresh photo"* — strong legal-accountability pitch. **−** Pelaksana friction high (30s per session). **−** UU PDP (Indonesian data protection law) implications for KTP storage.
- **C. Government Dukcapil API integration (e-KTP verification).** **+** *"We verify Pelaksana KTP through the same Dukcapil API your KYC team uses."* Highest pitch credibility. **−** Hard to access — institutional registration required. Months of paperwork. **−** Cost per query Rp 1k–10k.
- **D. KTP + selfie + liveness combo (cross-listed with Item 2.4).** Highest adversarial difficulty. Cost Rp 5k–20k per check via vendor. Highest Pelaksana friction.
- **E. KYC partnership path (Adrian's contribution).** **+** Don't build IDV in-house. Partner with established Indonesian IDV vendors (Privy, Sumsub Indonesia, Tilaka, Veriff). **+** *"We use the same KYC vendor your bank's account-opening team uses"* — bank security teams immediately recognize. **+** De-risks engineering, adds pitch credibility. **−** Vendor lock-in. **−** Per-check costs aggregate at scale.

**Take:** A required as baseline. B is Pak Jun's explicit endorsement. C is the dream pitch line if Dukcapil access is secured (roadmap). D is the premium tier. **E is the path most likely shipped — partner with an Indonesian IDV vendor rather than build in-house.** This is "a product within a product" — KYC startup integration handles it.

#### Item 2.3 — Voice-Print of Pelaksana

**Threat:** A buddy uses Pelaksana's phone to record the walk-around video. Audio fingerprint catches *recycled* videos but not *fresh fakes by the wrong person*.

**Threat motivation:** Pelaksana-side medium (buddy submission). Useful add-on.

**Why this is a strong AutoKon-specific play:** Dickson's audio fingerprint (L0b) extracts and stores audio waveform signature. Adding *speaker-identification* on the same audio is a small additional ML step that turns L0b into both an anti-recycle layer AND an identity layer. Two layers, one data extraction.

**Solutions:**

- **A. Voice OTP — Pelaksana reads server-generated phrase aloud.** **+** Adversarial difficulty high. Buddy can't impersonate without prep. **+** Cost low–moderate ($0.01–0.05 per check; open-source models like Resemblyzer / SpeechBrain available). **+** Pelaksana friction low (5–10s in walk-around video). **+** Low-end-device friendliness high. **−** False-positive risk medium (cold/flu, background noise, accent variation).
- **B. Passive voice signature in walk-around video.** **+** Pelaksana friction zero. **−** False-positive risk high (some Pelaksana don't speak during video).
- **C. Background ambient-sound consistency.** **+** Adversarial difficulty high against staged/lab fakes. **+** *"Our system listens to whether the audio matches a real construction site"* — visceral. **+** Cross-listed with Item 4.1 Solution E. **−** Patient attacker plays YouTube ambience.

**Take:** A is the headline solution. C is a complementary background layer. B alone is too weak.

#### Item 2.4 — Liveness Check / Face Verification

**Threat:** Photo of Pelaksana from old selfie reused. Printed photo held in front of camera. Another person posing with Pelaksana's KTP.

**Threat motivation:** Pelaksana-side medium-high (buddy submission with face spoofing).

**Solutions:**

- **A. Passive liveness (server analyzes selfie for blink, micro-expression, depth via parallax).** **+** Pelaksana friction zero post-capture. **+** Vendor APIs (FaceTec, Sumsub liveness, AWS Rekognition liveness). **+** Cost Rp 2k–10k per check via vendor. **−** Replay attacks (video on screen) defeat passive.
- **B. Active liveness (server requests random gesture).** **+** Adversarial difficulty high. **+** Banks recognize from KYC apps. **−** Pelaksana friction meaningful (15-30s, good lighting, camera positioning needed). **−** Active liveness needs in-app SDK; Botpress on WhatsApp can't render natively. Would need browser link.
- **C. Face-match per-session selfie against onboarding photo.** **+** Cost very low (open-source face-match like FaceNet, dlib). **−** Photo-of-photo defeats. Useless without liveness layered on top.
- **D. Behavioral biometrics during video walk-around (gyroscope + accelerometer).** **+** Adversarial difficulty medium-high. Walking gait, hand-tremor signature. **+** Pelaksana friction zero. **−** Sensor data not currently captured by Botpress flow. Custom app required.
- **E. WhatsApp-native KYC enrollment (Adrian's contribution).** **+** Pelaksana sends KTP photo + selfie + short liveness video via existing WhatsApp number at onboarding (or via dedicated WA-for-KYC number). **+** Zero new app/SDK install, zero new tools learned. **+** Liveness analyzed server-side by IDV vendor (Privy/Tilaka/Sumsub). **+** Cross-applies to Item 2.2.

**Take:** A as baseline (passive liveness, no friction). B as PILOT-30 commitment for high-trust mode. D as future tech. **E is the genuinely low-friction Indonesian-context solution** — uses what Pelaksana already does (sending things via WhatsApp).

#### Item 2.5 — Device Attestation

**Threat:** Sophisticated attackers run AutoKon flow on rooted/jailbroken device, modified Android, emulator. Bypass any client-side check by patching OS or running synthetic photo injection at camera-API level.

**Threat motivation:** External attacker high if attempting scaled fraud. Developer-internal low (sophistication required).

**Solutions:**

- **A. Android Play Integrity API check.** **+** Hardware-rooted attestation. Defeats rooted devices, modified ROMs, emulators. **+** Cost zero (free Google API). **+** *"We use Google's Play Integrity API"* — bank security teams recognize immediately; what Indonesian banks use in their own apps. **−** Implementable in WhatsApp pipeline: HARD. Play Integrity is Android SDK call from inside an app. Botpress + WhatsApp can't trigger it. Requires custom capture app — same constraint as Item 1.5 Solution B.
- **B. SafetyNet attestation (Play Integrity's predecessor).** Deprecated. Don't pursue.
- **C. Soft device fingerprinting via WhatsApp metadata.** **+** Implementable today. Tracks device model, OS version, app version. Anomaly-detect sudden device change. **+** Cost zero. **−** Easily spoofed.
- **D. Developer-registered device whitelist (one-time per Pelaksana).** **+** At onboarding, register specific device IMEI/serial/Android ID. **+** Implementable today via WhatsApp Business API metadata. **−** Phone replacement requires re-registration. Determined attacker can spoof IMEI.

**Take:** A is the dream — friction problem same as Item 1.5 Solution B. Pairs naturally with Item 1.5 B as a *paired commitment*. C/D are baseline soft-checks for default flow. A becomes "a product within a product" via custom app — name in pitch as PILOT-30 option.

---

### Pillar 3 — Place

**Bank's question:** *"Is this the actual unit it claims to be? Not the one next door, not from a different project, not a 'show unit' staged for photos."*

**Scope:** Geographic identity verification. The hardest pillar for Indonesian field reality due to GPS infrastructure variance.

**The Indonesian-reality reframe (per Adrian):** AutoKon doesn't need surveyor-grade GPS. AutoKon needs (1) each unit's photos to cluster at a *distinct* GPS centroid, (2) the pattern of centroids to match the siteplan's relative layout, (3) new photos to fall on or near predicted positions. **Pattern beats accuracy.**

**Seven items.**

#### Item 3.1 — Photo GPS Consistency (NOT GPS Accuracy)

**Threat:** Wrong-unit / show-unit / sister-project / adjacent-unit photo substitution.

**Threat motivation:** Developer-side strong.

**Dickson's existing:** L2 — visible GPS in photo overlay parsed by Claude. Coordinates checked against project bounding box. 10 pts, critical.

**Solutions:**

- **A. Project-level bounding-box check (Dickson's, baseline).** **+** Cost zero. **+** Already shipped. **−** Adversarial difficulty zero against adjacent-unit (FLPP 6m grid; GPS noise 5–15m).
- **B. Per-unit centroid clustering (replaces "tighter micro-bbox").** **+** After ~5–10 photos per unit, centroid stabilizes. New photos must fall within accumulated centroid cloud (~2 SDs). **+** Compatible with Indonesian GPS reality — works even when individual readings noisy. **+** *"Each unit develops its own GPS signature over time"* — strong pitch. **+** Cost zero. **−** Cold-start: unit has no centroid until ~5 photos accumulate.
- **C. Generous bbox + heading/orientation cross-check.** Requires custom camera app for heading data.
- **D. Server-side IP-geolocation cross-check (audit only).** **+** Cost zero. **+** Implementable today. **−** Cellular IPs in Indonesia geo-resolve to province at best; VPN trivially defeats. Audit signal only, never gating.
- **E. GPS spoofing (Mock Location) detection.** Same caveats as 1.5B — needs custom app.

**Take:** A is shipped. B is the highest-leverage upgrade *that respects Indonesian GPS reality* and ships immediately as Phase 0 addition. The cold-start problem is bridged by Item 3.7.

#### Item 3.2 — Video Site Presence (Dickson's L0a)

**Threat:** Walk-around video shot somewhere other than actual project. Dickson's #4 + #10.

**Threat motivation:** Developer-side strong (covering missing units), Pelaksana-side strong (recording at home).

**Dickson's existing:** 30s walk-around video. Duration ≥20s, GPS in bbox, sufficient pan/motion, parseable overlay. 20 pts, critical.

**Solutions:**

- **A. Frame-sampled GPS extraction (Dickson's, baseline).** **+** Cost ~$0.04/session. **+** In production-ready prototype. **−** Adversarial difficulty low against Fake-GPS spoofing.
- **B. Continuous GPS embedded in video metadata.** Custom app required.
- **C. Multi-point GPS sampling at start/middle/end of walk-around.** **+** Real walk-around shows 3–10m GPS drift; static fake shows zero drift. **+** Extension of A — sample more frames. **+** *"We confirm Pelaksana physically moved during the video"* — strong pitch.
- **D. Audio-environmental cross-check (cross-listed with Item 2.3 Solution C).**
- **E. Drone-recorded fly-over baseline (revived per Adrian's pushback — see Item 3.4).**

**Take:** A is shipped. C is the immediate hardening upgrade. D layers on. E is now primary for drone-equipped developers.

**Indonesian-coverage caveat:** Bbox tolerance must be permissive in low-coverage provinces. Per-province GPS-error baseline that loosens checks where infrastructure justifies.

#### Item 3.3 — Video-Photo GPS Cross-Reference (Dickson's L4)

**Threat:** Pelaksana sends legit walk-around video but supplements with off-time/off-place photos.

**Threat motivation:** Developer-side strong.

**Dickson's existing:** Photo GPS within ~10m radius of video path. 10 pts.

**Solutions:**

- **A. Spatial proximity within session window (Dickson's, baseline).**
- **B. Temporal alignment — photo timestamps within video session window.** **+** Cost zero. **+** Pitch story strength medium.
- **C. Distance from video walk-path (vs distance from any point in video).** **+** Adversarial difficulty high. *"Each photo must lie on the path Pelaksana walked while recording the video."* **−** GPS noise needs threshold tuning.
- **D. Heading/orientation cross-reference between photo and video.** Custom app required.

**Take:** A baseline. B is cheap addition. C is the strong pitch line. D requires custom-app future.

#### Item 3.4 — Pre-Construction Baseline + Drone Reference (REVIVED)

**Per Adrian's pushback:** Big developers operate drones. Dickson's "drone fly-over impractical" rejection assumed AutoKon-coordinated flights. The revised assumption: developer-supplied drone footage (existing for marketing/sales documentation) ingested by AutoKon as cross-reference.

**Solutions:**

- **A. Smartphone 360° panorama at project kickoff (one-time).** **+** Cost near-zero. **+** Implementable today. **+** One-time setup, no recurring discipline.
- **B. Developer-supplied drone fly-over (monthly recurring).** **+** Adversarial difficulty very high at any post-foundation stage. **+** Cost zero to AutoKon (developer already drones for marketing). **+** *"We integrate the developer's existing drone monitoring as cross-reference"* — banks recognize. **+** Operational complexity low (monthly upload). **−** Coverage gap: smaller developers don't drone (but bank-pitch tier does). **−** Greenfield month-1 limitation persists.
- **C. Surveyor-grade reference points (BPN data integration).** **+** *"We cross-check unit GPS against BPN's official cadastral coordinates"* — banks find nearly unimprovable. **−** BPN API access requires partnership; months of paperwork. **−** Cost Rp 100–500/parcel-query.
- **D. Satellite imagery snapshot at kickoff (cross-listed with Item 3.6).**
- **E. Pre-construction siteplan as primary anchor (no GPS needed — Adrian's pattern insight).** **+** Cost zero (developers produce siteplans anyway). **+** Implementable today. **+** *"The siteplan is our ground truth for unit identity, not absolute coordinates."* **−** Engineering medium (siteplan PDF varies wildly).

**Take:** B + E together as the new primary approach. A as fallback. C/D as roadmap.

#### Item 3.5 — Project-Level Geo-Tag (Pak Jun #11)

**Pak Jun's exact ask:** *"We are using the coordinate geo-tagging for the unit. Right? We need to add one more — the geo-tagging of the project."*

**Solutions:**

- **A. Bank inputs project-level coordinates at onboarding.** **+** Cost zero. **+** *"The bank, not the developer, sets the project's geographic anchor at onboarding."* Reinforces bank-as-primary-user reframe. **+** Implementable in existing bank-onboarding flow.
- **B. Auto-derive from unit-level GPS centroid (post-data-collection).** **+** Cost zero. **−** Doesn't satisfy Pak Jun's framing.
- **C. Hybrid — bank input + system validates against unit centroid + flags discrepancy.** **+** Adversarial difficulty medium. *"Project location is locked at bank onboarding and continuously verified against field-captured unit GPS."*

**Refinement (per Indonesian app convention):** Solution A should accept full address + auto-geocode, not raw lat/long. System geocodes via Google Maps API or Mapbox. Stores both typed address and resolved coordinates.

**Take:** A is Pak Jun's explicit ask + zero cost = ship now. C is the strongest "trust but verify" story.

#### Item 3.6 — Satellite Imagery Cross-Check (NEW)

**Why add this:** Software-only verification has a credibility ceiling. *"What external source verifies what AutoKon says?"*

**Solutions:**

- **A. Sentinel-2 free tier (EU Space Agency).** **+** Cost zero. **+** 10m resolution, ~5-day cadence. **+** Implementable today via Sentinel Hub free tier. **+** *"We cross-check progress against EU Space Agency Sentinel-2 satellite imagery."* **−** 10m resolution = project-level anchor, not per-unit. **−** Indonesian wet-season cloud cover.
- **B. Planet Labs commercial (3m resolution, daily cadence).** **+** Approaching per-unit detail. **+** *"Planet is the gold standard"* — banks recognize. **−** Cost meaningful ($10–100/month per-project at FLPP scale).
- **C. Google Earth Engine.** **+** Historical archive huge. **+** Free for non-commercial. **−** Earth Engine API has learning curve. Mostly historical analysis, not real-time.
- **D. LAPAN/BRIN Indonesian satellite data.** **+** Indonesian-context relevance. **+** *"We use Indonesia's national satellite assets"* — resonates with regulators. **−** Lower resolution. **−** Operational access messy.

**Take:** A as default (free, good story). B as premium-tier upsell. C/D roadmap.

#### Item 3.7 (NEW) — Siteplan-Relative Cross-Reference

**Adrian's insight, formalized:** A siteplan defines the relative geography of units. If accumulated GPS centroids form a pattern matching the siteplan, the system has verified place without absolute coordinates.

**Solutions:**

- **A. Centroid-pattern verification.** **+** Pattern of centroids must match siteplan layout (within tolerance). **+** *"We verify 1000 units have 1000 distinct GPS signatures matching the siteplan layout — even if no single GPS reading is surveyor-accurate."* **+** Cost zero post-annotation.
- **B. Siteplan-based unit prediction.** **+** Given siteplan + 3+ confirmed unit centroids, predict where unit X should be. New unit X photos far from prediction = flagged. **+** *"We use the siteplan to predict where each unit's photos should land."*
- **C. Auto-calibration (system learns project's GPS distortion).** **+** As more data accumulates, system learns per-project GPS offset/noise distribution. **−** Engineering medium-high.
- **D. Manual siteplan annotation by developer/bank at onboarding.** **+** Cost zero. **+** Implementable today. **+** Engineering low.
- **E. Drone-overflight overhead photo as siteplan ground truth.** **+** Combines with Item 3.4 Solution B. **+** *"The developer's monthly drone footage IS the siteplan we cross-check against."*

**Take:** D as immediate baseline (zero engineering, just an onboarding ask). A + B together as Phase 0 addition. E as premium-tier for drone-equipped developers.

---

### Pillar 4 — Time

**Bank's question:** *"Was this captured now, not last week or recycled?"*

**Scope:** Temporal verification. Dickson's home turf — audio fingerprint is the unique-IP claim.

**Threat-motivation re-tier (per Adrian's insight):** Within-day time fraud is low-motivation for developers (they want money to flow; later isn't better than now). Real time-related developer fraud is week-scale replay and recycling. Sun-angle and call-to-prayer catch sub-hour shifts that developers don't actually commit — keep for pitch theater (memorable in demos), deprioritize for engineering.

| Tier | Items | Why |
|---|---|---|
| **A — High-motivation defenses (ship hard)** | 4.1 Audio fingerprint · 4.2 Freshness + monotonic · 4.5 Public sealing | Catches the time fraud developers actually commit |
| **B — Pelaksana-sloppy-fraud (ship lighter)** | 4.4 Behavioral baseline | Catches Pelaksana side-gigs / buddy submission |
| **C — Pitch theater, low-motivation (keep for demo, deprioritize)** | 4.3 Sun-angle · 4.6 Call-to-prayer · 4.6 BMKG weather | Memorable in demos. But developers don't have motive. |

**Six items.**

#### Item 4.1 — Audio Fingerprint (Dickson's L0b, Tier A)

Already detailed in Item 2.3 cross-list and Pillar 4 section. Five solutions: A direct hash (Dickson's), B spectral fingerprint (Shazam-style), C speaker-ID, D multi-segment, E acoustic environment.

**Take:** A shipped. B immediate hardening upgrade ("Shazam-style audio fingerprinting" pitch line). D + E layered defenses.

#### Item 4.2 — Photo Freshness + Monotonic (Dickson's L5, Tier A)

**Threat:** Stale replay (>14d), regression, clock spoof.

**Threat motivation:** Developer-side strong (project genuinely behind, Pelaksana wants to claim work done).

**Solutions:** A server-side timestamp (Dickson's), B overlay + freshness threshold (Dickson's), C multi-modal time triangulation (overlay + server + WhatsApp), D monotonic per Pelaksana per unit (Dickson's), E NTP-attested signed timestamps.

**Take:** A + B + D shipped. C is the immediate next-layer addition. E is chain-of-custody upgrade (cross-listed with Pillar 5 Item 5.3).

#### Item 4.3 — Sun-Angle / Shadow Consistency (Tier C — pitch theater)

**Per Adrian's insight:** Catches mixed-day batches that developers don't have economic motivation to commit. Keep for demo, deprioritize for engineering.

**Solutions:** A astronomical sun-angle (deterministic math), B shadow length / direction cross-photo, C Claude-based time-of-day estimation, D solar position from camera metadata.

**Take:** A is the dream pitch line — pull from Dickson's Phase 1 to Phase 0 *for the demo*, even if production rollout is slow.

#### Item 4.4 — Behavioral Baseline (Tier B)

**Solutions:** A time-of-day pattern, B pace-of-submission anomaly, C linguistic patterns in chat, D geographic patterns, E multi-factor composite.

**Take:** A + B + D simple-rule baselines ship now. C is ML-grade premium. E is the comprehensive framing.

#### Item 4.5 (NEW) — External Time Anchor / Public Sealing (Tier A — cross-listed with Pillar 5 Item 5.3)

**Solutions:** A OpenTimestamps (Bitcoin/Ethereum), B RFC 3161 TSA, C independent third-party (Privy/Tilaka), D self-published transparency log.

**Take:** B is the most professionally credible (RFC 3161 has gravitas with bank security teams; blockchain framing is divisive). Lead with B; mention A only when audience signals openness to blockchain language.

#### Item 4.6 (NEW) — Indonesian-Context Cross-Correlation (Tier C — pitch theater)

**Why uniquely Indonesian:** Call to prayer, Eid/Lebaran calendar, BMKG weather, equatorial daylight hours. **No US/EU competitor would build any of these.**

**Solutions:**

- **A. BMKG weather correlation.** **+** Free public API at province granularity. **+** *"We cross-check every photo's claimed weather against BMKG's official records."*
- **B. Call-to-prayer (azan) audio cross-check.** **+** Audio classifier for "is azan happening" + muezzin-schedule lookup per GPS location. **+** *"If the call to prayer is audible in the walk-around video, our system verifies it matches the muezzin schedule for that location."* Memorable demo line. **+** **No competitor in the world would think of this.**
- **C. Public holiday cross-reference.** Submissions during Eid/Christmas/Independence Day flagged for review.
- **D. Daylight-hours validation.** Indonesia equatorial; daylight 6am-6pm. Photos at 9pm in daylight = flagged.

**Take:** B is the standout — uniquely Indonesian moat. A is broader. C/D simpler layers.

---

### Pillar 5 — Chain of Custody

**Bank's question:** *"Once evidence enters AutoKon, can it be tampered with?"*

**Scope:** Post-submission integrity. Different threat actors than Pillars 1-4 (insiders, hackers, post-hoc tampering, not Pelaksana / developer real-time fraud).

**Adrian's calibration:** This pillar reads like a cybersecurity course because it defends against sophisticated threats. The dominant Indonesian fraud is low-tech (Pillar 1 Item 1.6). Pillar 5 is the *audit-credibility narrative*, not volume defense. Banks audit chain-of-custody during due diligence and incident reviews.

**Six items.**

#### Item 5.1 — Multi-Step Approval Workflow (Existing Baseline)

**Solutions:** A sequential 3-step (Dickson's, baseline), B quorum-based for high-value, C random sampling with deeper review, D AI-assisted reviewer queue prioritization.

**Take:** A shipped. B for high-value approvals. C for random-audit independence. D built on Dickson's existing tier classification.

#### Item 5.2 — Tamper-Evident Hash Chain (NEW)

**Threat:** Insider attack (DBA, engineer alters records).

**Solutions:**

- **A. Per-project Merkle tree of all evidence.** **+** *"Every project has a Merkle tree of all evidence. Any tampering — even by AutoKon admins — becomes detectable."* **+** Cost low. **+** Implementable in weeks.
- **B. Per-unit hash chain (sequential blocks, blockchain-style).** **+** Chronological proof. **+** Same +/- as A.
- **C. Append-only event log with hash links (event-sourcing pattern).** **+** Standard architecture pattern. **−** Retrofitting onto existing Supabase schema is significant rewrite. **★** Roadmap-name.
- **D. WORM (Write Once Read Many) storage for evidence files.** **+** Cost low (config flag on S3 / Supabase). **+** *"All evidence files are stored on Write-Once-Read-Many infrastructure with regulatory-grade retention."* **+** Engineering low — switch storage config in a day.

**Take:** A is the headline pitch story. B is implementation pattern. **D is the Phase-0 immediate win — config change ships in a day, gives strong pitch line, highest cost-effectiveness in the entire R&D landscape.**

#### Item 5.3 — Periodic Public Sealing (Cross-listed with Item 4.5)

**Solutions:** A OpenTimestamps (Bitcoin/Ethereum), B RFC 3161 TSA, C independent third-party (Privy/Tilaka), D self-published transparency log.

**Take:** **B is most professionally credible.** A is divisive blockchain framing — read the room.

#### Item 5.4 — SM Digital Sign-Off / Witness Attestation (Dickson's Open Question 5)

**Dickson's exact ask:** *"Saksi: Anda lihat kerja ini hari ini? Ya/Tidak"* — Botpress prompt to SM at approval time.

**Threat:** Approval rubber-stamping by SM.

**Threat motivation:** Recurring (Pak Jun called this out — *"site managers are naughty, delay a lot"*).

**Solutions:**

- **A. Botpress yes/no witness prompt at approval (Dickson's exact ask).** **+** Cost zero. **+** Forces SM explicit attestation; false attestation legally actionable. **+** *"Site managers must explicitly attest, in Bahasa, that they personally witnessed the work — captured in the audit log."* **+** SM friction low (5s).
- **B. SM-side dashboard with detailed click-to-confirm.**
- **C. Periodic SM affidavit (signed monthly attestation).**
- **D. Periodic SM physical site visit verification.**

**Take:** A is 10-minute Botpress flow change — high bank-pitch value. Should ship next sprint regardless. D is deeper-defense option for high-value bank deals.

#### Item 5.5 — Cryptographic Per-Signer Signing (NEW)

**Solutions:** A server-managed keys (centralized), B mobile-device-bound keys, C PKI with public registry, D HSM (Hardware Security Module).

**Take:** A baseline (server-managed). C is trust-extension layer (public registry; signatures independently verifiable by third parties). B is dream (device-bound) for custom-app future. D operational hardening.

#### Item 5.6 — Immutable Audit Log (NEW)

**Solutions:** A Postgres temporal tables, B separate audit log table with cryptographic chain (cross-listed with Item 5.2), C database-level WAL export to immutable storage.

**Take:** A immediate baseline. B reuses Item 5.2 hash chain. C is deeper protection for bank-pitch credibility.

---

### Pillar 6 — Independent Verification

**Bank's question:** *"Do you ever rely on something other than your own software?"*

**Scope:** Positioning layer — the *"we don't only trust ourselves"* narrative. Most items cross-listed with prior pillars.

**Five items.**

#### Item 6.1 — KJPP Physical Inspection (Existing Indonesian Standard)

**Solutions:** A KJPP at fixed milestones (status quo), B AutoKon-routed KJPP triggers (fraud-risk-aware sampling), C random-sample KJPP (audit independence).

**Take:** A status quo. **B is the cleanest implementation of the *"we make KJPP 10x more focused"* pitch line** — uses Dickson's existing tier classification directly. C is audit-independence layer.

#### Item 6.2 (REVIVED) — RT/RW or Lurah Witness Signature

**Indonesian context:** RT (neighborhood unit head), RW (community unit head), Lurah (village head) — local officials who know what's actually being built nearby.

**Solutions:** A RT/RW witness at major milestones, B Lurah-level witness, C RT/RW + photo verification combo.

**Take:** A cleanest entry point. C is higher-trust variant. **Uniquely Indonesian — no US/EU competitor would think to leverage RT/RW.**

#### Item 6.3 — Satellite Imagery Cross-Check (Cross-listed with Pillar 3 Item 3.6)

Pillar 6-specific framing: *"We don't just trust our own field data — we cross-check against EU Space Agency satellite imagery."*

#### Item 6.4 — Drone Overflight (Cross-listed with Pillar 3 Item 3.4 Solution B)

Pillar 6-specific framing: *"Big developers already operate drones for marketing. AutoKon ingests their drone footage as independent aerial verification."*

#### Item 6.5 (NEW) — Independent Third-Party Signing Service

**Solution:** Indonesian e-signature vendors (Privy, Tilaka, eMeterai) provide signing as third-party service. Bank PIC's signature on bank-grade report captured through Privy/Tilaka, not AutoKon-internal. Vendor holds independent record.

**Pitch line:** *"Bank PIC signatures go through Privy / eMeterai — the same e-signature infrastructure your KYC team uses for retail account opening."*

---

## §4 Master Item Table

| # | Item | Pillar | Threat motivation (developer) | Threat motivation (Pelaksana) | Threat motivation (insider) | Tech-savviness needed | Phase | Cost |
|---|---|---|---|---|---|---|---|---|
| 1.1 | Photo recycling detection | Authenticity | High | High | — | Low | 0 | Zero (shipped) |
| 1.2 | Cross-photo consistency | Authenticity | Med | Med | — | Low | 0 | Low |
| 1.3 | Edit/Photoshop forgery (ELA) | Authenticity | Med | Low-Med | — | Med | 0 | Low |
| 1.4 | AI-generated detection | Authenticity | Low (rising) | Low | — | High | 0–1 | Low–Med |
| 1.5 | Trusted-source overlay | Authenticity | High | High | — | Low–Med | 0 | Zero (shipped) |
| **1.6** | **Low-tech consumer-app fraud** | **Authenticity** | **Highest** | **High** | — | **Lowest (commits) / Med (catches)** | **0** | **Low** |
| 2.1 | Phone-number binding | Identity | — | Med | — | Low | 0 | Zero (shipped) |
| 2.2 | KTP-bound capture | Identity | High (legal liability) | — | — | Low | 0–1 | Low (Solution A) — Med (vendor partnership) |
| 2.3 | Voice-print Pelaksana | Identity | — | Med-High | — | Low (commits) | 0–1 | Low |
| 2.4 | Liveness check | Identity | — | Med-High | — | Low (commits) | 1 | Low–Med (vendor) |
| 2.5 | Device attestation | Identity | — | — | High | High | 1–2 | Zero (Play Integrity, but custom-app required) |
| 3.1 | Photo GPS consistency | Place | High | Med | — | Low | 0 | Zero |
| 3.2 | Video site presence | Place | High | High | — | Med | 0 | Low (shipped) |
| 3.3 | Video-photo GPS cross-ref | Place | High | Med | — | Low | 0 | Zero (shipped) |
| 3.4 | Pre-construction baseline + drone | Place | High | — | — | Low | 0–1 | Zero (smartphone 360) — Med (BPN) |
| 3.5 | Project-level geo-tag | Place | — (bank-set anchor) | — | — | — | 0 | Zero |
| 3.6 | Satellite imagery cross-check | Place | — | — | — | Med | 0–1 | Zero (Sentinel) — Med (Planet) |
| **3.7** | **Siteplan-relative cross-ref** | **Place** | **High (adjacent unit)** | **Med** | — | **Low** | **0** | **Zero** |
| 4.1 | Audio fingerprint | Time | High (recycle) | High | — | Low | 0 | Zero (shipped) |
| 4.2 | Photo freshness + monotonic | Time | High (replay) | Med | — | Low | 0 | Zero (shipped) |
| 4.3 | Sun-angle / shadow | Time | Low | Low | — | Med | 0 (demo) / 1 (prod) | Low |
| 4.4 | Behavioral baseline | Time | — | Med | — | Low | 0 (rules) / 1 (ML) | Zero–Low |
| 4.5 | Public sealing | Time / Custody | — | — | High | Low | 0–1 | Low |
| 4.6 | Indonesian-context | Time | Low | Low | — | Low | 0–1 | Low |
| 5.1 | Multi-step approval | Custody | Med | Med | — | Low | 0 | Zero (shipped) |
| 5.2 | Tamper-evident hash chain | Custody | — | — | High | Med | 0 (WORM) — 1 (Merkle) | Low |
| 5.3 | Periodic public sealing | Custody | — | — | High | Med | 1 | Low |
| 5.4 | SM digital sign-off | Custody | Med | — | — | Low | 0 | Zero |
| 5.5 | Crypto per-signer signing | Custody | — | — | High | High | 1–2 | Low–Med |
| 5.6 | Immutable audit log | Custody | — | — | High | Med | 0 (basic) — 1 (advanced) | Low |
| 6.1 | KJPP physical inspection | Independent | High | High | — | — | 0 (status quo) | Pass-through |
| 6.2 | RT/RW witness signature | Independent | High | — | — | — | 0–1 | Low |
| 6.3 | Satellite cross-check | Independent | (cross-listed) | | | | | |
| 6.4 | Drone overflight | Independent | (cross-listed) | | | | | |
| 6.5 | Independent third-party signing | Independent | — | — | High | — | 0–1 | Med (vendor fees) |

---

## §5 Recommended Ship Priority

Organized by Phase. Within each Phase, items grouped by pillar for traceability.

### Phase 0 — Ship now (high-motivation defenses + Phase-0 immediate wins)

**Authenticity:**
- 1.1A pHash (shipped)
- 1.2A Time-spread statistical check
- 1.3A ELA (Dickson's deferred Phase 0; ship)
- 1.4A AI-generation detector (deployable today)
- 1.5A whitelisted timestamp camera + Claude (shipped)
- **1.6A JPEG quantization-table fingerprinting** (highest-leverage new item)
- **1.6B IG-Story artifact detection**
- **1.6C Screenshot detection**
- **1.6D Photo-of-screen moiré detection**

**Identity:**
- 2.1A Phone whitelist (shipped)
- 2.2A One-time KTP enrollment at onboarding
- 2.3A Voice OTP (cross-leverage on Item 4.1 audio fingerprint pipeline)

**Place:**
- 3.1A Project bbox (shipped)
- 3.1B Per-unit centroid clustering
- 3.2A Video site presence (shipped)
- 3.2C Multi-point GPS sampling
- 3.3A Spatial proximity (shipped)
- 3.3B Temporal alignment
- 3.4A Smartphone 360° at kickoff (one-time)
- 3.4E Pre-construction siteplan as anchor
- 3.5A Bank inputs full-address geo-tag
- 3.6A Sentinel-2 free tier
- **3.7A Centroid-pattern verification**
- **3.7B Siteplan-based prediction**
- 3.7D Manual siteplan annotation

**Time:**
- 4.1A Audio fingerprint hash (shipped)
- 4.1B Spectral fingerprint hardening
- 4.2A-D Existing freshness + monotonic (shipped)
- 4.2C Multi-modal time triangulation
- 4.3A Astronomical sun-angle (for the demo)
- 4.4A-B-D Simple-rule behavioral baselines

**Chain of Custody:**
- 5.1A Multi-step approval (shipped)
- **5.2D WORM storage (config change — ships in a day)**
- 5.4A Botpress witness yes/no prompt (ships in 10 minutes)
- 5.6A Postgres temporal tables

**Independent Verification:**
- 6.1A KJPP at fixed milestones (status quo)
- **6.1B AutoKon-routed KJPP triggers (uses existing tier classification)**

### Phase 1 — Ship in 30 days from first signed bank pilot (PILOT-30 commitments)

**Authenticity:**
- 1.1B Deep-learning embedding similarity
- 1.3C Multi-model AI ensemble (the *"as an AI tech company"* commitment)

**Identity:**
- 2.2B Per-session KTP holding photo (Pak Jun's exact ask)
- 2.2E KYC partnership integration (Privy/Sumsub/Tilaka)
- 2.3A Voice OTP server-side
- 2.4A Passive liveness via vendor
- 2.4E WhatsApp-native KYC enrollment

**Place:**
- 3.4B Developer-supplied drone fly-over (for drone-equipped developers)
- 3.6B Planet Labs satellite (premium tier)

**Time:**
- 4.1D Multi-segment audio fingerprint
- 4.1E Acoustic environment fingerprint
- 4.4C Linguistic chat patterns (ML-grade)
- 4.5B RFC 3161 TSA sealing
- **4.6B Call-to-prayer cross-check** (uniquely Indonesian moat)
- 4.6A BMKG weather correlation

**Chain of Custody:**
- 5.2A Per-project Merkle tree
- 5.2B Per-unit hash chain
- 5.3B RFC 3161 TSA sealing (cross-listed)
- 5.4D Periodic SM physical site visit verification
- 5.5A Server-managed cryptographic signing
- 5.5C PKI public registry
- 5.6B Audit log with hash links

**Independent Verification:**
- 6.2A RT/RW witness signature at major milestones
- 6.5 Independent third-party signing service (Privy/eMeterai)

### Phase 2 — Roadmap (named in pitch, observed-attack-driven shipping)

**Authenticity:**
- 1.4B C2PA content credentials (waits on Pelaksana phone fleet upgrade ~2027+)
- 1.1C PRNU sensor fingerprint (theoretical for Indonesian field reality)

**Identity:**
- 2.5A Android Play Integrity (requires custom AutoKon camera app)
- 2.5B SafetyNet (deprecated, don't pursue)
- 2.4B Active liveness (requires custom app)

**Place:**
- 3.4C BPN data integration (partnership-blocked)

**Time:**
- 4.5A Bitcoin/Ethereum sealing (only when audience wants blockchain framing)

**Chain of Custody:**
- 5.2C Event-sourcing architecture (significant rewrite)
- 5.5B Mobile-device-bound keys (custom app)
- 5.5D HSM keys
- 5.6C Database WAL export

### Roadmap Reserve — Defer until observed

- 1.4 advanced AI-generation defeats (until a real attack is observed)
- VFX video forgery (until observed)
- Cross-modality consistent forgery (until observed)
- Rooted device sophisticated bypass (until observed at scale)

---

## §6 Pitch Language Reference

Actual sentences for the bank pitch deck, organized by pillar.

### Authenticity

- *"We screen every photo against state-of-the-art AI-generation detectors — the same techniques used to catch the JAKI Pemprov DKI Gemini-watermark scandal in 2025."*
- *"Our audio fingerprint catches recycled videos using the same forensic technique Shazam uses to identify songs."*
- *"We catch the Microsoft-Word-export trick. We catch the Instagram Story overlay trick. We catch screenshots. We catch photos of printed photos. We've engineered for what Indonesian fraudsters actually do."*

### Identity

- *"Every Pelaksana is KTP-bound. We use the same KYC vendor your bank's account-opening team uses."*
- *"Voice-print verification at every session — we know it's the registered Pelaksana speaking, not someone who borrowed their phone."*
- *"Bank-PIC signatures go through Privy / eMeterai — the same e-signature infrastructure your KYC team uses."*

### Place

- *"We don't claim perfect GPS coordinates — Indonesia's archipelago infrastructure makes that impossible. We claim that 1000 units have 1000 distinct GPS signatures matching the developer-provided siteplan layout."*
- *"We integrate the developer's existing drone monitoring as independent aerial cross-reference."*
- *"Cross-checked against EU Space Agency Sentinel-2 satellite imagery."*
- *"Project location is locked at bank onboarding and continuously verified against field-captured unit GPS."*

### Time

- *"We use astronomy to verify your photo was taken at the time you claim — sun angle, shadow direction, calculated from GPS and timestamp."*
- *"If the call to prayer is audible in the walk-around video, our system verifies it matches the muezzin schedule for that location."*
- *"Cross-checked against BMKG's official weather records."*
- *"Every day, our evidence hash is sealed to an RFC 3161 Time-Stamping Authority — the same standard used for legal e-signatures."*

### Chain of Custody

- *"Every record in AutoKon has a complete edit history, never a silent overwrite. Every project has a Merkle tree of all evidence — any tampering becomes detectable."*
- *"All evidence files are stored on Write-Once-Read-Many infrastructure with regulatory-grade retention. Even AutoKon admins cannot delete or overwrite evidence."*
- *"Site managers must explicitly attest, in Bahasa, that they personally witnessed the work — captured in the audit log as a legally actionable statement."*

### Independent Verification

- *"AutoKon makes KJPP 10x more focused. Software pre-screens; KJPP inspects what software flags as risky."*
- *"Local RT/RW officials witness major milestones — independent verification rooted in Indonesian community structure."*
- *"We don't ask the bank to trust only us — Privy/eMeterai holds an independent record of every signature."*

---

## §7 Open Questions for Decision

These need Dickson's, Faishal's, or commercial sign-off before engineering can proceed cleanly.

1. **Is custom AutoKon camera app on the table for PILOT-30?** Cross-cuts Items 1.5B + 2.5A. Resolves the device-attestation and overlay-spoofing gates simultaneously. Bank's premium-tier feature.
2. **KYC partnership selection.** Privy vs Tilaka vs Sumsub Indonesia vs Veriff. Commercial relationship + integration choice.
3. **Sentinel-2 free vs Planet Labs paid?** For Phase 0 satellite imagery. Read what banks ask for.
4. **OpenTimestamps (Bitcoin/Ethereum) vs RFC 3161 TSA?** Public sealing language preference. Read the room — blockchain is divisive in 2026.
5. **WORM storage migration** — Supabase storage config change to immutability mode. Engineering Phase-0 immediate win, but storage cost and retention period need decision.
6. **Drone overflight ingest format.** Big developers operate drones; what file format do they typically produce? MP4? GeoTIFF? Standardize ingest.
7. **Tier-3 review queue SLA** (Dickson's open question). Operational design Adrian or Dickson owns.
8. **RT/RW witness program scope.** Pilot first or default for all bank-pitch tier? Honoraria budget per project per milestone.

---

## §8 Appendix — Relationship to Existing AutoKon Work

| Existing work | This brief's relationship |
|---|---|
| Dickson's evidence integrity summary (`product-bank/prototypes/evidence-integrity/`, May 1) | **Reorganized.** The 10-layer framework is preserved underneath the 6-pillar pitch organization; every Dickson layer maps to one or more pillar items. Selectively-revived rejected items (drone fly-over, custom camera app) added per Adrian's R&D-mode push-back. |
| Pak Jun product recommendations (April 24-25) | **Items #2 KodeProper · #5 trigger points · #9 digital signatures · #10 KTP capture · #11 project geo-tag · #12 RBAC** — all integrated into the 6-pillar framework. |
| `autokon-app` production code | **No PRs proposed in this brief.** R&D-mode means we list options; Faishal decides what ships when. |
| `autokon-bank-report-pitch` repo + `autokon-bank-pitch.surge.sh` | **Frozen.** This brief is for the bank pitch's evidence-integrity narrative, but doesn't modify the bank-pitch repo or surge URL. |
| `autokon-three-audience-samples` repo | **Cross-referenced.** The audience-first framing of reports is consistent with the audience-first framing here. Both reorganize layer-first thinking into audience-first thinking. |
| V2.1 Continuous Progress Snapshot (CPS) | **Foundational primitive.** Some items (Pillar 5 hash chain) extend CPS's tamper-resistance. |
| F3a Design System Spec (OpusPrime) | **Independent.** This brief is about evidence integrity; F3a is about visual design language. Consistent voice (Bahasa labels, AutoKon brand) preserved. |

---

*End of brief. Comprehensive R&D options laid out. Phase 0 ship priority recommended. Awaiting Dickson + Faishal decisions on §7 open questions.*

*Authored by Adrian (VP Product) with Claude Cowork. Builds on Dickson's evidence integrity prototype and the brainstorm session of May 1, 2026. Not for publication outside AutoKon leadership + advisor circle.*
