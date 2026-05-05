// AutoKon Evidence Integrity R&D — PPT Summary Deck
// Build: node build-pptx.js
// Output: AutoKon-Evidence-Integrity-Summary.pptx

const pptxgen = require("pptxgenjs");
const pres = new pptxgen();

const C = {
  blue: "2563EB", blueDark: "1D4ED8", blueLight: "DBEAFE", blueTint: "EFF6FF",
  beer: "F7941D", halloween: "FF7426",
  slate900: "0F172A", slate800: "1E293B", slate700: "334155", slate600: "475569",
  slate500: "64748B", slate400: "94A3B8", slate300: "CBD5E1", slate200: "E2E8F0",
  slate100: "F1F5F9", slate50: "F8FAFC", slate25: "FBFCFE",
  white: "FFFFFF", green: "22C55E", red: "EF4444", amber: "F59E0B",
};
const F_DISPLAY = "Poppins";
const F_BODY = "Inter";
const F_MONO = "JetBrains Mono";

pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
pres.author = "Adrian + Claude Cowork";
pres.title = "AutoKon — Evidence Integrity R&D Brief — Summary";

const W = 13.333, H = 7.5, PAD = 0.6;
const TOTAL = 18;

function darkBg(s) { s.background = { color: C.slate900 }; }
function lightBg(s) { s.background = { color: C.slate50 }; }
function eyebrow(s, text) {
  s.addText(text.toUpperCase(), {
    x: PAD, y: 0.32, w: 8, h: 0.36,
    fontFace: F_MONO, fontSize: 10, color: C.slate500, bold: true,
    charSpacing: 6, margin: 0, valign: "middle",
  });
}
function pageNum(s, n, dark) {
  s.addText(`${String(n).padStart(2, "0")} / ${TOTAL}`, {
    x: W - PAD - 1.2, y: H - 0.5, w: 1.2, h: 0.3,
    fontFace: F_MONO, fontSize: 10, color: dark ? C.slate400 : C.slate500,
    align: "right", valign: "middle", margin: 0,
  });
}
function brandMark(s, dark) {
  const fg = dark ? C.white : C.slate900;
  s.addText([
    { text: "AutoKon", options: { bold: true, fontSize: 13, color: fg, fontFace: F_DISPLAY } },
    { text: ".id", options: { fontSize: 13, color: dark ? C.slate400 : C.slate500, fontFace: F_DISPLAY } },
  ], { x: PAD, y: H - 0.5, w: 3, h: 0.3, margin: 0, valign: "middle" });
}
function bigTitle(s, lines, opts) {
  // lines: array of either string or {text, color}
  let y = (opts && opts.y) || 1.0;
  const fontSize = (opts && opts.fontSize) || 56;
  const lineH = (opts && opts.lineH) || 0.95;
  const dark = opts && opts.dark;
  lines.forEach((line, i) => {
    if (typeof line === "string") {
      s.addText(line, {
        x: PAD, y: y + i * lineH, w: W - 2 * PAD, h: lineH,
        fontFace: F_DISPLAY, fontSize, color: dark ? C.white : C.slate900,
        bold: true, charSpacing: -2, valign: "top", margin: 0,
      });
    } else {
      s.addText(line.parts, {
        x: PAD, y: y + i * lineH, w: W - 2 * PAD, h: lineH,
        fontFace: F_DISPLAY, fontSize, charSpacing: -2, bold: true,
        valign: "top", margin: 0,
      });
    }
  });
}

// ============= SLIDE 1 — COVER =============
{
  const s = pres.addSlide(); darkBg(s);
  s.addText("BANK PITCH · EVIDENCE INTEGRITY R&D · V1.0", {
    x: W - PAD - 7, y: 0.5, w: 7, h: 0.3,
    fontFace: F_MONO, fontSize: 10, color: C.slate400, bold: true,
    align: "right", charSpacing: 6, valign: "middle", margin: 0,
  });
  s.addText([
    { text: "AutoKon", options: { bold: true, fontSize: 16, color: C.white, fontFace: F_DISPLAY } },
    { text: ".id", options: { fontSize: 16, color: C.slate400, fontFace: F_DISPLAY } },
  ], { x: PAD, y: 0.5, w: 4, h: 0.4, valign: "middle", margin: 0 });

  s.addText("PROVE THE PHOTO IS REAL · TAKEN NOW · OF THE UNIT IT CLAIMS TO BE", {
    x: PAD, y: 2.0, w: W - 2 * PAD, h: 0.4,
    fontFace: F_MONO, fontSize: 11, color: C.beer, bold: true,
    charSpacing: 4, valign: "middle", margin: 0,
  });

  s.addText("Six Pillars to make", {
    x: PAD, y: 2.7, w: W - 2 * PAD, h: 1.05,
    fontFace: F_DISPLAY, fontSize: 64, color: C.white, bold: true,
    charSpacing: -2, valign: "top", margin: 0,
  });
  s.addText([
    { text: "AutoKon's", options: { color: C.white, bold: true } },
    { text: " evidence", options: { color: C.blue, bold: true } },
  ], {
    x: PAD, y: 3.65, w: W - 2 * PAD, h: 1.05,
    fontFace: F_DISPLAY, fontSize: 64, charSpacing: -2, valign: "top", margin: 0,
  });
  s.addText([
    { text: "stand up to", options: { color: C.white, bold: true } },
    { text: " bank scrutiny.", options: { color: C.beer, bold: true } },
  ], {
    x: PAD, y: 4.6, w: W - 2 * PAD, h: 1.05,
    fontFace: F_DISPLAY, fontSize: 64, charSpacing: -2, valign: "top", margin: 0,
  });

  // Footer meta
  const metaY = H - 1.05;
  s.addShape(pres.shapes.RECTANGLE, {
    x: PAD, y: metaY - 0.15, w: W - 2 * PAD, h: 0.01,
    fill: { color: C.slate700 }, line: { color: C.slate700 },
  });
  const cols = [
    { lbl: "AUTHORS", val: "Adrian + Claude Cowork" },
    { lbl: "BUILDS ON", val: "Dickson evidence integrity (May 1)" },
    { lbl: "FOR", val: "Dickson · Faishal · BSN/BTN pitch" },
    { lbl: "DATE", val: "May 1, 2026" },
  ];
  cols.forEach((m, i) => {
    const colW = (W - 2 * PAD) / 4;
    const x = PAD + i * colW;
    s.addText(m.lbl, {
      x, y: metaY, w: colW, h: 0.22,
      fontFace: F_MONO, fontSize: 9, color: C.slate400, bold: true,
      charSpacing: 6, margin: 0, valign: "middle",
    });
    s.addText(m.val, {
      x, y: metaY + 0.25, w: colW - 0.2, h: 0.32,
      fontFace: F_BODY, fontSize: 12, color: C.white, bold: true,
      margin: 0, valign: "middle",
    });
  });
}

// ============= SLIDE 2 — THE CHALLENGE =============
{
  const s = pres.addSlide(); lightBg(s);
  eyebrow(s, "01 · The Challenge"); brandMark(s, false); pageNum(s, 2, false);

  s.addText("Banks need defensible proof. The current pipeline has a single trust surface.", {
    x: PAD, y: 1.0, w: W - 2 * PAD, h: 1.6,
    fontFace: F_DISPLAY, fontSize: 36, color: C.slate900, bold: true,
    charSpacing: -1, valign: "top", margin: 0,
  });

  // Two columns
  const cardY = 3.0, cardH = 3.5;
  const colW = (W - 2 * PAD - 0.4) / 2;

  // Left — today's risk
  s.addShape(pres.shapes.RECTANGLE, {
    x: PAD, y: cardY, w: colW, h: cardH,
    fill: { color: C.white }, line: { color: C.slate200 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: PAD, y: cardY, w: 0.08, h: cardH,
    fill: { color: C.red }, line: { color: C.red },
  });
  s.addText("TODAY · STRUCTURAL FRAUD GAPS", {
    x: PAD + 0.3, y: cardY + 0.3, w: colW - 0.6, h: 0.3,
    fontFace: F_MONO, fontSize: 10, color: C.red, bold: true,
    charSpacing: 6, valign: "middle", margin: 0,
  });
  const todayPts = [
    "Photo recycling and metadata manipulation",
    "Adjacent-unit confusion (FLPP 6m grid)",
    "Single Claude read = entire trust surface",
    "No cross-checking layer",
    "Indonesian field reality breaks naive GPS",
  ];
  todayPts.forEach((p, i) => {
    s.addText("• " + p, {
      x: PAD + 0.3, y: cardY + 0.85 + i * 0.45, w: colW - 0.6, h: 0.45,
      fontFace: F_BODY, fontSize: 13, color: C.slate800,
      valign: "middle", margin: 0,
    });
  });

  // Right — what banks ask
  s.addShape(pres.shapes.RECTANGLE, {
    x: PAD + colW + 0.4, y: cardY, w: colW, h: cardH,
    fill: { color: C.slate900 }, line: { color: C.slate900 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: PAD + colW + 0.4, y: cardY, w: 0.08, h: cardH,
    fill: { color: C.beer }, line: { color: C.beer },
  });
  s.addText("WHAT BANKS ASK · 6 QUESTIONS", {
    x: PAD + colW + 0.7, y: cardY + 0.3, w: colW - 0.6, h: 0.3,
    fontFace: F_MONO, fontSize: 10, color: C.beer, bold: true,
    charSpacing: 6, valign: "middle", margin: 0,
  });
  const askPts = [
    "Is this photo real? (Authenticity)",
    "Is the submitter who they claim? (Identity)",
    "Is this the actual unit? (Place)",
    "Was this captured now? (Time)",
    "Is the audit trail tamper-proof? (Custody)",
    "Do you trust other than your own software? (Independent)",
  ];
  askPts.forEach((p, i) => {
    s.addText("• " + p, {
      x: PAD + colW + 0.7, y: cardY + 0.85 + i * 0.40, w: colW - 0.6, h: 0.4,
      fontFace: F_BODY, fontSize: 12, color: C.slate200,
      valign: "middle", margin: 0,
    });
  });
}

// ============= SLIDE 3 — THE FRAMEWORK =============
{
  const s = pres.addSlide(); lightBg(s);
  eyebrow(s, "02 · The Framework"); brandMark(s, false); pageNum(s, 3, false);

  s.addText("Six pillars of trust. One bank question per pillar.", {
    x: PAD, y: 1.0, w: W - 2 * PAD, h: 0.9,
    fontFace: F_DISPLAY, fontSize: 36, color: C.slate900, bold: true,
    charSpacing: -1, valign: "top", margin: 0,
  });
  s.addText("Reorganized from Dickson's 10-layer engineering architecture into 6 audience-first pillars that map directly to bank concerns. 35 items across all pillars; 100+ proposed solutions.", {
    x: PAD, y: 1.95, w: W - 2 * PAD, h: 0.5,
    fontFace: F_BODY, fontSize: 14, color: C.slate500, italic: true,
    valign: "top", margin: 0,
  });

  // 6 pillar cards in a grid 3x2
  const pillars = [
    { num: "01", title: "Authenticity", q: "Is the photo real?", color: C.blue, items: 6 },
    { num: "02", title: "Identity", q: "Who submitted it?", color: C.beer, items: 5 },
    { num: "03", title: "Place", q: "Is this the right unit?", color: C.halloween, items: 7 },
    { num: "04", title: "Time", q: "Was it captured now?", color: C.green, items: 6 },
    { num: "05", title: "Chain of Custody", q: "Tamper-proof?", color: C.slate700, items: 6 },
    { num: "06", title: "Independent Verification", q: "External cross-check?", color: C.slate500, items: 5 },
  ];
  const cardW = (W - 2 * PAD - 0.4) / 3;
  const cardH = 1.95;
  const gap = 0.2;
  pillars.forEach((p, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = PAD + col * (cardW + gap);
    const y = 3.0 + row * (cardH + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cardW, h: cardH,
      fill: { color: C.white }, line: { color: C.slate200 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cardW, h: 0.4,
      fill: { color: p.color }, line: { color: p.color },
    });
    s.addText("PILLAR " + p.num + " · " + p.items + " ITEMS", {
      x: x + 0.25, y, w: cardW - 0.5, h: 0.4,
      fontFace: F_MONO, fontSize: 9, color: C.white, bold: true,
      charSpacing: 6, valign: "middle", margin: 0,
    });
    s.addText(p.title, {
      x: x + 0.25, y: y + 0.55, w: cardW - 0.5, h: 0.5,
      fontFace: F_DISPLAY, fontSize: 22, color: C.slate900, bold: true,
      charSpacing: -0.5, valign: "top", margin: 0,
    });
    s.addText(p.q, {
      x: x + 0.25, y: y + 1.1, w: cardW - 0.5, h: 0.7,
      fontFace: F_BODY, fontSize: 12, color: C.slate600, italic: true,
      valign: "top", margin: 0,
    });
  });
}

// Helper for pillar slide
function pillarSlide(num, title, question, items, anchor) {
  const s = pres.addSlide(); lightBg(s);
  eyebrow(s, String(anchor).padStart(2, "0") + " · Pillar " + num + " · " + title);
  brandMark(s, false); pageNum(s, anchor + 1, false);

  s.addText(title, {
    x: PAD, y: 0.95, w: W - 2 * PAD, h: 0.85,
    fontFace: F_DISPLAY, fontSize: 36, color: C.slate900, bold: true,
    charSpacing: -1, valign: "top", margin: 0,
  });
  s.addText('"' + question + '"', {
    x: PAD, y: 1.85, w: W - 2 * PAD, h: 0.45,
    fontFace: F_BODY, fontSize: 16, color: C.slate500, italic: true,
    valign: "top", margin: 0,
  });

  const itemY = 2.65, itemH = (H - 2.65 - 0.7) / items.length;
  items.forEach((it, i) => {
    const y = itemY + i * itemH;
    s.addShape(pres.shapes.RECTANGLE, {
      x: PAD, y, w: W - 2 * PAD, h: itemH * 0.92,
      fill: { color: C.white }, line: { color: C.slate200 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: PAD, y, w: 0.08, h: itemH * 0.92,
      fill: { color: it.tag === "NEW" ? C.beer : (it.tag === "REVIVED" ? C.blue : (it.tag === "SHIPPED" ? C.green : C.slate400)) },
      line: { color: "00000000" },
    });
    s.addText(it.id, {
      x: PAD + 0.3, y, w: 0.7, h: itemH * 0.92,
      fontFace: F_MONO, fontSize: 11, color: C.slate500, bold: true,
      valign: "middle", margin: 0,
    });
    s.addText(it.title, {
      x: PAD + 1.1, y, w: 5.5, h: itemH * 0.92,
      fontFace: F_BODY, fontSize: 13, color: C.slate900, bold: true,
      valign: "middle", margin: 0,
    });
    s.addText(it.note, {
      x: PAD + 6.7, y, w: 5.0, h: itemH * 0.92,
      fontFace: F_BODY, fontSize: 11, color: C.slate600,
      valign: "middle", margin: 0,
    });
    if (it.tag) {
      const tagColor = it.tag === "NEW" ? C.beer : (it.tag === "REVIVED" ? C.blue : (it.tag === "SHIPPED" ? C.green : C.slate400));
      s.addShape(pres.shapes.RECTANGLE, {
        x: W - PAD - 1.0, y: y + itemH * 0.18, w: 0.85, h: itemH * 0.55,
        fill: { color: tagColor }, line: { color: tagColor },
      });
      s.addText(it.tag, {
        x: W - PAD - 1.0, y: y + itemH * 0.18, w: 0.85, h: itemH * 0.55,
        fontFace: F_MONO, fontSize: 8.5, color: C.white, bold: true,
        align: "center", valign: "middle", charSpacing: 2, margin: 0,
      });
    }
  });
}

// ============= SLIDE 4 — THE PELAKSANA ATTACK PLAYBOOK =============
{
  const s = pres.addSlide(); lightBg(s);
  eyebrow(s, "03 · The Pelaksana Attack Playbook"); brandMark(s, false); pageNum(s, 4, false);

  s.addText("10 named ways a Pelaksana can fool us.", {
    x: PAD, y: 0.95, w: W - 2 * PAD, h: 0.85,
    fontFace: F_DISPLAY, fontSize: 36, color: C.slate900, bold: true,
    charSpacing: -1, valign: "top", margin: 0,
  });
  s.addText("Per Dickson's reframe (May 2026): focus on in-system Pelaksana fraud — a legitimately enrolled user gaming what they capture, when, and where. Out-of-system fabrication (Word/IG/Canva) is the long tail — Item 1.6 demoted to Phase 2 residual.", {
    x: PAD, y: 1.85, w: W - 2 * PAD, h: 0.65,
    fontFace: F_BODY, fontSize: 13, color: C.slate500, italic: true,
    valign: "top", margin: 0,
  });

  // 10 attack vectors in 2 columns
  const vectors = [
    { id: "PV-1", title: "Wrong-unit substitution", note: "Unit B photos for Unit A", catches: "Pillar 3.7 siteplan-relative" },
    { id: "PV-2", title: "Sister-project substitution", note: "Different KodeProper", catches: "Pillar 3.1 bbox + 1.1B" },
    { id: "PV-3", title: "Recycled photo (previous trip)", note: "Yesterday's photos for today", catches: "Pillar 1.1 pHash + 4.3 sun" },
    { id: "PV-4", title: "Stage relabeling", note: "Rangka photos as atap", catches: "Pillar 1.1 + 1.5 vision" },
    { id: "PV-5", title: "Still-video fake walk", note: "Stand still, wave phone", catches: "NEW motion-vector" },
    { id: "PV-6", title: "Mock-GPS spoofing", note: "Fake-location Android app", catches: "Pillar 3.2C + 2.5 attestation" },
    { id: "PV-7", title: "Delegation / buddy", note: "Hand phone to a runner", catches: "Pillar 2.3 voice + 2.4 selfie" },
    { id: "PV-8", title: "Photo-of-render", note: "Marketing brochure / mock-up", catches: "Pillar 1.4 AI + 3.7 + 4.3" },
    { id: "PV-9", title: "Front-loaded capture", note: "All photos in 1 trip, distributed submission", catches: "Pillar 4.3 + 4.6 + 4.1E" },
    { id: "PV-10", title: "Coverage fraud", note: "Only the good parts", catches: "NEW spec-coverage + 1.2D" },
  ];
  const colW = (W - 2 * PAD - 0.2) / 2;
  const rowH = 0.40;
  vectors.forEach((v, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = PAD + col * (colW + 0.2);
    const y = 2.7 + row * (rowH + 0.05);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: colW, h: rowH,
      fill: { color: C.white }, line: { color: C.slate200 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.08, h: rowH,
      fill: { color: C.halloween }, line: { color: "00000000" },
    });
    s.addText(v.id, {
      x: x + 0.2, y, w: 0.55, h: rowH,
      fontFace: F_MONO, fontSize: 9, color: C.halloween, bold: true,
      valign: "middle", margin: 0,
    });
    s.addText(v.title, {
      x: x + 0.78, y, w: 2.4, h: rowH,
      fontFace: F_BODY, fontSize: 11, color: C.slate900, bold: true,
      valign: "middle", margin: 0,
    });
    s.addText(v.catches, {
      x: x + 3.2, y, w: colW - 3.3, h: rowH,
      fontFace: F_BODY, fontSize: 9.5, color: C.slate500,
      valign: "middle", margin: 0,
    });
  });

  s.addText("Bank pitch flagship: \"For each pattern, we have at least one Phase 0 defense that catches the lazy version, and one PILOT-30 commitment that hardens against the patient version.\"", {
    x: PAD, y: H - 0.65, w: W - 2 * PAD, h: 0.4,
    fontFace: F_BODY, fontSize: 11, color: C.slate600, italic: true,
    valign: "middle", align: "center", margin: 0,
  });
}

// ============= SLIDE 5 — DEFENSE MATRIX + RESHAPED PHASE 0 =============
{
  const s = pres.addSlide(); lightBg(s);
  eyebrow(s, "04 · Defense Matrix · Phase 0 Reshape"); brandMark(s, false); pageNum(s, 5, false);

  s.addText("Two new Phase 0 items follow directly from leading with the attack model.", {
    x: PAD, y: 0.95, w: W - 2 * PAD, h: 0.85,
    fontFace: F_DISPLAY, fontSize: 30, color: C.slate900, bold: true,
    charSpacing: -1, valign: "top", margin: 0,
  });

  // Three change cards
  const changes = [
    {
      tag: "ADD",
      title: "Motion-vector / optical-flow analysis",
      note: "On walk-around videos. Catches PV-5 still-video fake walks. Trivial OpenCV implementation on the existing video pipeline.",
      color: C.beer,
    },
    {
      tag: "ADD",
      title: "Spec-coverage scoring",
      note: "Every spec item present/absent. \"Obscured\" requires SM second-photo + reason. Catches PV-10 coverage fraud.",
      color: C.beer,
    },
    {
      tag: "DEMOTE",
      title: "Item 1.6 (Word/IG/Canva detectors) → Phase 2 residual",
      note: "These detectors address out-of-system fabricated artifacts — the long tail, not the dominant fraud surface. Engineering budget reallocates to PV-5 and PV-10 defenses.",
      color: C.slate500,
    },
  ];
  const cardH = 1.45;
  changes.forEach((c, i) => {
    const y = 2.0 + i * (cardH + 0.18);
    s.addShape(pres.shapes.RECTANGLE, {
      x: PAD, y, w: W - 2 * PAD, h: cardH,
      fill: { color: C.white }, line: { color: C.slate200 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: PAD, y, w: 0.16, h: cardH,
      fill: { color: c.color }, line: { color: "00000000" },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: PAD + 0.4, y: y + 0.25, w: 1.0, h: 0.4,
      fill: { color: c.color }, line: { color: c.color },
    });
    s.addText(c.tag, {
      x: PAD + 0.4, y: y + 0.25, w: 1.0, h: 0.4,
      fontFace: F_MONO, fontSize: 10, color: C.white, bold: true,
      align: "center", valign: "middle", charSpacing: 4, margin: 0,
    });
    s.addText(c.title, {
      x: PAD + 1.55, y: y + 0.22, w: W - 2 * PAD - 1.7, h: 0.5,
      fontFace: F_DISPLAY, fontSize: 18, color: C.slate900, bold: true,
      valign: "top", margin: 0,
    });
    s.addText(c.note, {
      x: PAD + 1.55, y: y + 0.78, w: W - 2 * PAD - 1.7, h: 0.6,
      fontFace: F_BODY, fontSize: 12, color: C.slate600,
      valign: "top", margin: 0,
    });
  });

  s.addText("\"We name 10 ways a Pelaksana can fool us, and here's how we catch each.\" — pitch flagship", {
    x: PAD, y: H - 0.65, w: W - 2 * PAD, h: 0.4,
    fontFace: F_BODY, fontSize: 12, color: C.slate700, italic: true, bold: true,
    valign: "middle", align: "center", margin: 0,
  });
}

// ============= SLIDES 6-11 — PILLARS =============
pillarSlide("01", "Authenticity", "Is the photo real, or is it fabricated, edited, or AI-generated?", [
  { id: "1.1", title: "Photo recycling detection", note: "pHash + deep-learning embedding · Dickson's L3 baseline + cross-project layer", tag: "SHIPPED" },
  { id: "1.2", title: "Cross-photo consistency", note: "Time-spread + shadow direction + Claude batch-check", tag: "" },
  { id: "1.3", title: "Edit/Photoshop forgery (ELA)", note: "ELA + multi-model AI ensemble — 'as an AI tech company we should enable this'", tag: "" },
  { id: "1.4", title: "AI-generated photo detection", note: "JAKI Pemprov DKI Gemini scandal proof point — must address", tag: "" },
  { id: "1.5", title: "Trusted-source overlay validation", note: "Whitelisted timestamp camera + custom AutoKon app (PILOT-30 commitment)", tag: "SHIPPED" },
  { id: "1.6", title: "Out-of-system consumer-app fraud (residual)", note: "Word/IG/Canva/screenshot detection · DEMOTED to Phase 2 residual per Dickson's reframe", tag: "P2" },
], 5);

pillarSlide("02", "Identity", "Is the person submitting this who they claim to be?", [
  { id: "2.1", title: "Phone-number binding", note: "Phone whitelist · 2FA OTP · WhatsApp Business API · periodic re-auth", tag: "SHIPPED" },
  { id: "2.2", title: "KTP-bound capture", note: "Pak Jun #10 · per-session KTP holding photo + KYC partnership (Privy/Tilaka)", tag: "" },
  { id: "2.3", title: "Voice-print of Pelaksana", note: "Voice OTP at session start · piggybacks on L0b audio fingerprint", tag: "NEW" },
  { id: "2.4", title: "Liveness check", note: "Passive + active liveness · WhatsApp-native KYC enrollment (Adrian's idea)", tag: "NEW" },
  { id: "2.5", title: "Device attestation", note: "Android Play Integrity · pairs with custom AutoKon camera app", tag: "NEW" },
], 6);

pillarSlide("03", "Place", "Is this the actual unit it claims to be?", [
  { id: "3.1", title: "Photo GPS consistency (not accuracy)", note: "Per-unit centroid clustering · pattern beats accuracy", tag: "" },
  { id: "3.2", title: "Video site presence", note: "Dickson's L0a + multi-point GPS sampling start/middle/end", tag: "SHIPPED" },
  { id: "3.3", title: "Video-photo GPS cross-reference", note: "Dickson's L4 + temporal alignment + walk-path proximity", tag: "SHIPPED" },
  { id: "3.4", title: "Pre-construction baseline + drone reference", note: "Smartphone 360° + drone (revived per Adrian — big devs already drone)", tag: "REVIVED" },
  { id: "3.5", title: "Project-level geo-tag (Pak Jun #11)", note: "Bank inputs full address; system geocodes — respects Indonesian app convention", tag: "" },
  { id: "3.6", title: "Satellite imagery cross-check", note: "Sentinel-2 free tier default · Planet Labs premium tier", tag: "NEW" },
  { id: "3.7", title: "Siteplan-relative cross-reference", note: "Pattern-matching against siteplan — Adrian's archipelago-reality insight", tag: "NEW" },
], 7);

pillarSlide("04", "Time", "Was this captured now, not last week or recycled?", [
  { id: "4.1", title: "Audio fingerprint", note: "Dickson's L0b · Shazam-style spectral upgrade · best single pitch sentence", tag: "SHIPPED" },
  { id: "4.2", title: "Photo freshness + monotonic", note: "Dickson's L5 · multi-modal time triangulation upgrade", tag: "SHIPPED" },
  { id: "4.3", title: "Sun-angle / shadow consistency", note: "Astronomical math — 'we use physics to verify time' · pitch theater", tag: "" },
  { id: "4.4", title: "Behavioral baseline per Pelaksana", note: "Time-of-day · pace · linguistic · geographic · multi-factor composite", tag: "" },
  { id: "4.5", title: "External time anchor / public sealing", note: "RFC 3161 TSA preferred over blockchain framing", tag: "NEW" },
  { id: "4.6", title: "Indonesian-context cross-correlation", note: "BMKG weather · call-to-prayer · uniquely Indonesian moat", tag: "NEW" },
], 8);

pillarSlide("05", "Chain of Custody", "Once evidence enters AutoKon, can it be tampered with?", [
  { id: "5.1", title: "Multi-step approval workflow", note: "Pengawas → SM → PM · quorum-based for high-value · AI-assisted queue", tag: "SHIPPED" },
  { id: "5.2", title: "Tamper-evident hash chain", note: "Per-project Merkle tree · WORM storage = Phase-0 win, ships in a day", tag: "NEW" },
  { id: "5.3", title: "Periodic public sealing", note: "RFC 3161 TSA · independent third-party (Privy/Tilaka) · transparency log", tag: "NEW" },
  { id: "5.4", title: "SM digital sign-off / witness", note: "Dickson's exact ask — 'Saksi: Anda lihat hari ini? Ya/Tidak' · 10-min ship", tag: "" },
  { id: "5.5", title: "Cryptographic per-signer signing", note: "PKI public registry · independently verifiable signatures", tag: "NEW" },
  { id: "5.6", title: "Immutable audit log", note: "Postgres temporal tables · WAL export to immutable storage", tag: "NEW" },
], 9);

pillarSlide("06", "Independent Verification", "Do you ever rely on something other than your own software?", [
  { id: "6.1", title: "KJPP physical inspection", note: "AutoKon-routed triggers using Dickson's tier classification — flagship pitch line", tag: "" },
  { id: "6.2", title: "RT/RW or Lurah witness signature", note: "Uniquely Indonesian — no US/EU competitor would think of this", tag: "REVIVED" },
  { id: "6.3", title: "Satellite imagery cross-check", note: "Cross-listed with Pillar 3 · 'EU Space Agency Sentinel-2'", tag: "" },
  { id: "6.4", title: "Drone overflight", note: "Cross-listed with Pillar 3 · developer-supplied", tag: "" },
  { id: "6.5", title: "Independent third-party signing", note: "Privy/eMeterai · same e-sign as bank's KYC team", tag: "NEW" },
], 10);

// ============= SLIDE 10 — TWO LENSES =============
{
  const s = pres.addSlide(); lightBg(s);
  eyebrow(s, "11 · Two Cross-Cutting Lenses"); brandMark(s, false); pageNum(s, 12, false);

  s.addText("Threat motivation × tech-savviness — the 2x2 that organizes priority.", {
    x: PAD, y: 0.95, w: W - 2 * PAD, h: 1.05,
    fontFace: F_DISPLAY, fontSize: 26, color: C.slate900, bold: true,
    charSpacing: -1, valign: "top", margin: 0,
  });
  s.addText("Most Indonesian fraud is low-tech with high motivation, not the cybersecurity-textbook profile. This shapes ship priority.", {
    x: PAD, y: 2.05, w: W - 2 * PAD, h: 0.4,
    fontFace: F_BODY, fontSize: 13, color: C.slate500, italic: true,
    valign: "top", margin: 0,
  });

  // Draw the 2x2 chart
  const chartX = 1.5, chartY = 2.65, chartW = 10.3, chartH = 4.0;
  // Border
  s.addShape(pres.shapes.RECTANGLE, {
    x: chartX, y: chartY, w: chartW, h: chartH,
    fill: { color: C.white }, line: { color: C.slate300, width: 1 },
  });
  // Cross lines
  s.addShape(pres.shapes.LINE, {
    x: chartX + chartW / 2, y: chartY, w: 0, h: chartH,
    line: { color: C.slate300, width: 1, dashType: "dash" },
  });
  s.addShape(pres.shapes.LINE, {
    x: chartX, y: chartY + chartH / 2, w: chartW, h: 0,
    line: { color: C.slate300, width: 1, dashType: "dash" },
  });
  // Axis labels
  s.addText("LOW MOTIVATION", {
    x: chartX, y: chartY + chartH + 0.05, w: chartW / 2, h: 0.3,
    fontFace: F_MONO, fontSize: 9, color: C.slate500, bold: true,
    charSpacing: 6, align: "center", valign: "middle", margin: 0,
  });
  s.addText("HIGH MOTIVATION", {
    x: chartX + chartW / 2, y: chartY + chartH + 0.05, w: chartW / 2, h: 0.3,
    fontFace: F_MONO, fontSize: 9, color: C.slate500, bold: true,
    charSpacing: 6, align: "center", valign: "middle", margin: 0,
  });
  // Quadrant content
  const quads = [
    { x: chartX + 0.2, y: chartY + 0.2, w: chartW / 2 - 0.4, h: chartH / 2 - 0.4,
      title: "TECH-SAVVY × LOW MOTIVATION", body: "Cryptographic forgery · Insider attack\n(Pillar 5 — audit-grade defense)",
      bg: C.slate100, color: C.slate700 },
    { x: chartX + chartW / 2 + 0.2, y: chartY + 0.2, w: chartW / 2 - 0.4, h: chartH / 2 - 0.4,
      title: "TECH-SAVVY × HIGH MOTIVATION", body: "AI-generated photos · Deepfake video\n(Pillar 1.4 — name in pitch)",
      bg: C.slate100, color: C.slate700 },
    { x: chartX + 0.2, y: chartY + chartH / 2 + 0.2, w: chartW / 2 - 0.4, h: chartH / 2 - 0.4,
      title: "LOW-TECH × LOW MOTIVATION", body: "Sub-hour time-shift · Weather inconsistency\n(Pillar 4 Tier C — deprioritize)",
      bg: C.slate100, color: C.slate700 },
    { x: chartX + chartW / 2 + 0.2, y: chartY + chartH / 2 + 0.2, w: chartW / 2 - 0.4, h: chartH / 2 - 0.4,
      title: "★ LOW-TECH × HIGH MOTIVATION ★", body: "Word export · IG Story · screenshots · adjacent-unit · recycling\n(Pillars 1.1, 1.6, 3.1 — VOLUME OF FRAUD)",
      bg: C.beer, color: C.white },
  ];
  quads.forEach(q => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: q.x, y: q.y, w: q.w, h: q.h,
      fill: { color: q.bg }, line: { color: q.bg },
    });
    s.addText(q.title, {
      x: q.x + 0.15, y: q.y + 0.15, w: q.w - 0.3, h: 0.35,
      fontFace: F_MONO, fontSize: 8.5, color: q.color, bold: true,
      charSpacing: 4, valign: "top", margin: 0,
    });
    s.addText(q.body, {
      x: q.x + 0.15, y: q.y + 0.55, w: q.w - 0.3, h: q.h - 0.7,
      fontFace: F_BODY, fontSize: 11, color: q.color,
      valign: "top", margin: 0,
    });
  });
}

// ============= SLIDE 11 — INDONESIAN MOAT =============
{
  const s = pres.addSlide(); lightBg(s);
  eyebrow(s, "12 · The Indonesian Moat"); brandMark(s, false); pageNum(s, 13, false);

  s.addText("Engineered for Indonesian field reality.", {
    x: PAD, y: 0.95, w: W - 2 * PAD, h: 0.9,
    fontFace: F_DISPLAY, fontSize: 38, color: C.slate900, bold: true,
    charSpacing: -1.5, valign: "top", margin: 0,
  });
  s.addText("No US/EU competitor would think to build any of these. They're the differentiation banks remember.", {
    x: PAD, y: 1.95, w: W - 2 * PAD, h: 0.4,
    fontFace: F_BODY, fontSize: 14, color: C.slate500, italic: true,
    valign: "top", margin: 0,
  });

  const moats = [
    { num: "01", title: "Equatorial sun-angle math", body: "Sun moves ~15°/hour at equator vs ~7° in mid-latitudes. Indonesia is uniquely sensitive to time-shift." },
    { num: "02", title: "Call-to-prayer (azan) cross-check", body: "If azan is in walk-around audio, cross-reference muezzin schedule for that GPS." },
    { num: "03", title: "BMKG weather correlation", body: "Cross-check claimed weather against Indonesian Meteorological Agency feed." },
    { num: "04", title: "RT/RW witness signatures", body: "Local Indonesian governance officials witness milestones — community-rooted independence." },
    { num: "05", title: "Low-tech consumer-app fraud", body: "Catch Word export, IG Story, screenshots — what Indonesian fraudsters actually do." },
    { num: "06", title: "Siteplan-relative GPS pattern", body: "Pattern beats accuracy — designed for archipelago-reality GPS infrastructure." },
  ];
  const cardW = (W - 2 * PAD - 0.4) / 3;
  const cardH = 1.95;
  const gap = 0.2;
  moats.forEach((m, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = PAD + col * (cardW + gap);
    const y = 2.6 + row * (cardH + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cardW, h: cardH,
      fill: { color: C.white }, line: { color: C.beer, width: 1 },
    });
    s.addText(m.num, {
      x: x + 0.25, y: y + 0.2, w: 1, h: 0.45,
      fontFace: F_DISPLAY, fontSize: 22, color: C.beer, bold: true,
      valign: "middle", margin: 0,
    });
    s.addText(m.title, {
      x: x + 0.25, y: y + 0.65, w: cardW - 0.5, h: 0.5,
      fontFace: F_DISPLAY, fontSize: 14, color: C.slate900, bold: true,
      valign: "top", margin: 0,
    });
    s.addText(m.body, {
      x: x + 0.25, y: y + 1.15, w: cardW - 0.5, h: 0.7,
      fontFace: F_BODY, fontSize: 10.5, color: C.slate600,
      valign: "top", margin: 0,
    });
  });
}

// ============= SLIDE 12 — PHASE 0 =============
{
  const s = pres.addSlide(); darkBg(s);
  s.addText("13 · PHASE 0 — IMMEDIATE WINS", {
    x: PAD, y: 0.32, w: 8, h: 0.36,
    fontFace: F_MONO, fontSize: 10, color: C.slate400, bold: true,
    charSpacing: 6, margin: 0, valign: "middle",
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: W - PAD - 1.4, y: 0.32, w: 1.4, h: 0.36,
    fill: { color: C.green }, line: { color: C.green },
  });
  s.addText("PHASE 0", {
    x: W - PAD - 1.4, y: 0.32, w: 1.4, h: 0.36,
    fontFace: F_MONO, fontSize: 10, color: C.white, bold: true,
    align: "center", valign: "middle", charSpacing: 4, margin: 0,
  });
  brandMark(s, true); pageNum(s, 14, true);

  s.addText("Ship in days. Highest leverage.", {
    x: PAD, y: 1.0, w: W - 2 * PAD, h: 0.95,
    fontFace: F_DISPLAY, fontSize: 48, color: C.white, bold: true,
    charSpacing: -1.5, valign: "top", margin: 0,
  });
  s.addText("Items that defend against the high-motivation high-volume Indonesian fraud profile, with zero or near-zero engineering cost.", {
    x: PAD, y: 2.0, w: W - 2 * PAD, h: 0.4,
    fontFace: F_BODY, fontSize: 14, color: C.slate300, italic: true,
    valign: "top", margin: 0,
  });

  const wins = [
    { stat: "1.6 A–D", title: "Low-tech fraud detectors", body: "JPEG-quantization, IG-Story, screenshot, photo-of-screen — catches the dominant Indonesian fraud profile" },
    { stat: "5.2 D", title: "WORM storage config", body: "Single config change. Ships in a day. 'Even AutoKon admins cannot delete evidence.'" },
    { stat: "5.4 A", title: "Botpress witness prompt", body: "10-minute flow change. Forces SM legal-grade attestation." },
    { stat: "3.7 A+B", title: "Centroid + siteplan pattern", body: "Adrian's pattern-beats-accuracy insight. Fixes adjacent-unit confusion in a way Indonesian GPS can support." },
    { stat: "4.1 B", title: "Spectral fingerprint", body: "Shazam-style upgrade to existing audio fingerprint. Defeats re-encoding attacks." },
    { stat: "6.1 B", title: "AutoKon-routed KJPP", body: "Uses existing tier classification. 'Software pre-screens, KJPP inspects what software flags.'" },
  ];
  const cardW = (W - 2 * PAD - 0.4) / 3;
  const cardH = 2.05;
  const gap = 0.2;
  wins.forEach((w, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = PAD + col * (cardW + gap);
    const y = 2.85 + row * (cardH + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cardW, h: cardH,
      fill: { color: C.slate800 }, line: { color: C.slate700 },
    });
    s.addText(w.stat, {
      x: x + 0.3, y: y + 0.2, w: cardW - 0.6, h: 0.45,
      fontFace: F_MONO, fontSize: 14, color: C.green, bold: true,
      valign: "middle", margin: 0,
    });
    s.addText(w.title, {
      x: x + 0.3, y: y + 0.7, w: cardW - 0.6, h: 0.5,
      fontFace: F_DISPLAY, fontSize: 14, color: C.white, bold: true,
      valign: "top", margin: 0,
    });
    s.addText(w.body, {
      x: x + 0.3, y: y + 1.2, w: cardW - 0.6, h: 0.85,
      fontFace: F_BODY, fontSize: 10.5, color: C.slate300,
      valign: "top", margin: 0,
    });
  });
}

// ============= SLIDE 13 — PHASE 1 =============
{
  const s = pres.addSlide(); lightBg(s);
  eyebrow(s, "14 · PHASE 1 — PILOT-30 Commitments");
  s.addShape(pres.shapes.RECTANGLE, {
    x: W - PAD - 1.4, y: 0.32, w: 1.4, h: 0.36,
    fill: { color: C.beer }, line: { color: C.beer },
  });
  s.addText("PILOT-30", {
    x: W - PAD - 1.4, y: 0.32, w: 1.4, h: 0.36,
    fontFace: F_MONO, fontSize: 10, color: C.white, bold: true,
    align: "center", valign: "middle", charSpacing: 4, margin: 0,
  });
  brandMark(s, false); pageNum(s, 15, false);

  s.addText("Ship in 30 days from first signed pilot.", {
    x: PAD, y: 1.0, w: W - 2 * PAD, h: 1.0,
    fontFace: F_DISPLAY, fontSize: 42, color: C.slate900, bold: true,
    charSpacing: -1.5, valign: "top", margin: 0,
  });
  s.addText("Premium-tier features the first signed bank pilot funds. Public commitment with audit-grade legal weight.", {
    x: PAD, y: 2.0, w: W - 2 * PAD, h: 0.4,
    fontFace: F_BODY, fontSize: 13, color: C.slate500, italic: true,
    valign: "top", margin: 0,
  });

  const pilots = [
    { lbl: "Identity", text: "KTP-bound capture (Pak Jun #10) · KYC partnership (Privy/Tilaka) · WhatsApp-native KYC enrollment · liveness via vendor" },
    { lbl: "Place", text: "Drone fly-over ingest from developer's existing drone · Planet Labs satellite (premium tier)" },
    { lbl: "Time", text: "RFC 3161 TSA public sealing · BMKG weather correlation · call-to-prayer cross-check · multi-segment audio fingerprint" },
    { lbl: "Custody", text: "Per-project Merkle tree · per-unit hash chain · RFC 3161 sealing · PKI public registry · audit log with hash links" },
    { lbl: "Independent", text: "RT/RW witness signature · Privy/eMeterai third-party signing" },
  ];
  pilots.forEach((p, i) => {
    const y = 2.95 + i * 0.78;
    s.addShape(pres.shapes.RECTANGLE, {
      x: PAD, y, w: W - 2 * PAD, h: 0.65,
      fill: { color: C.white }, line: { color: C.slate200 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: PAD, y, w: 0.08, h: 0.65,
      fill: { color: C.beer }, line: { color: C.beer },
    });
    s.addText(p.lbl.toUpperCase(), {
      x: PAD + 0.3, y, w: 1.5, h: 0.65,
      fontFace: F_MONO, fontSize: 10, color: C.beer, bold: true,
      charSpacing: 4, valign: "middle", margin: 0,
    });
    s.addText(p.text, {
      x: PAD + 1.85, y, w: W - 2 * PAD - 1.95, h: 0.65,
      fontFace: F_BODY, fontSize: 11.5, color: C.slate800,
      valign: "middle", margin: 0,
    });
  });
}

// ============= SLIDE 14 — PHASE 2 + ROADMAP =============
{
  const s = pres.addSlide(); lightBg(s);
  eyebrow(s, "15 · PHASE 2 + Roadmap Reserve"); brandMark(s, false); pageNum(s, 16, false);

  s.addText("Roadmap-named, observed-attack-driven shipping.", {
    x: PAD, y: 1.0, w: W - 2 * PAD, h: 0.95,
    fontFace: F_DISPLAY, fontSize: 36, color: C.slate900, bold: true,
    charSpacing: -1, valign: "top", margin: 0,
  });
  s.addText("Named in the pitch for credibility, but engineered only when real-world fraud data justifies the investment.", {
    x: PAD, y: 1.95, w: W - 2 * PAD, h: 0.4,
    fontFace: F_BODY, fontSize: 13, color: C.slate500, italic: true,
    valign: "top", margin: 0,
  });

  // Two columns
  const cardY = 2.7, cardH = 4.4;
  const colW = (W - 2 * PAD - 0.4) / 2;

  // Phase 2
  s.addShape(pres.shapes.RECTANGLE, {
    x: PAD, y: cardY, w: colW, h: cardH,
    fill: { color: C.slate200 }, line: { color: C.slate300 },
  });
  s.addText("PHASE 2", {
    x: PAD + 0.4, y: cardY + 0.3, w: colW - 0.8, h: 0.4,
    fontFace: F_MONO, fontSize: 12, color: C.slate700, bold: true,
    charSpacing: 6, valign: "middle", margin: 0,
  });
  s.addText("Future-tier features", {
    x: PAD + 0.4, y: cardY + 0.7, w: colW - 0.8, h: 0.5,
    fontFace: F_DISPLAY, fontSize: 22, color: C.slate900, bold: true,
    valign: "top", margin: 0,
  });
  const p2Items = [
    "C2PA content credentials · waits for Pelaksana phone fleet upgrade ~2027+",
    "Android Play Integrity · requires custom AutoKon camera app",
    "Mobile-device-bound keys · custom-app pairing",
    "HSM keys · operational hardening",
    "Database WAL export · deeper protection",
    "Event-sourcing architecture · significant rewrite",
    "PRNU sensor fingerprint · theoretical for Indonesian field",
    "Bitcoin/Ethereum sealing · only when audience wants blockchain framing",
  ];
  p2Items.forEach((it, i) => {
    s.addText("• " + it, {
      x: PAD + 0.4, y: cardY + 1.4 + i * 0.35, w: colW - 0.8, h: 0.35,
      fontFace: F_BODY, fontSize: 10.5, color: C.slate800,
      valign: "middle", margin: 0,
    });
  });

  // Roadmap reserve
  s.addShape(pres.shapes.RECTANGLE, {
    x: PAD + colW + 0.4, y: cardY, w: colW, h: cardH,
    fill: { color: C.slate100 }, line: { color: C.slate400, dashType: "dash" },
  });
  s.addText("ROADMAP RESERVE", {
    x: PAD + colW + 0.8, y: cardY + 0.3, w: colW - 0.8, h: 0.4,
    fontFace: F_MONO, fontSize: 12, color: C.slate600, bold: true,
    charSpacing: 6, valign: "middle", margin: 0,
  });
  s.addText("Defer until observed", {
    x: PAD + colW + 0.8, y: cardY + 0.7, w: colW - 0.8, h: 0.5,
    fontFace: F_DISPLAY, fontSize: 22, color: C.slate900, bold: true,
    valign: "top", margin: 0,
  });
  const reserveItems = [
    "Advanced AI-generation defeats — until real attack observed in pilot data",
    "VFX video forgery — until observed",
    "Cross-modality consistent forgery — until observed",
    "Rooted-device sophisticated bypass — until observed at scale",
    "",
    "These items live in the pitch as 'we have the architectural framework to add these when threats emerge,'  not as committed delivery.",
  ];
  reserveItems.forEach((it, i) => {
    s.addText(it ? "• " + it : "", {
      x: PAD + colW + 0.8, y: cardY + 1.4 + i * 0.4, w: colW - 0.8, h: 0.4,
      fontFace: F_BODY, fontSize: 10.5, color: i >= 5 ? C.slate600 : C.slate800,
      italic: i >= 5, valign: "middle", margin: 0,
    });
  });
}

// ============= SLIDE 15 — PITCH LANGUAGE =============
{
  const s = pres.addSlide(); lightBg(s);
  eyebrow(s, "16 · Pitch Language Reference"); brandMark(s, false); pageNum(s, 17, false);

  s.addText("The actual sentences for the bank pitch deck.", {
    x: PAD, y: 1.0, w: W - 2 * PAD, h: 0.85,
    fontFace: F_DISPLAY, fontSize: 32, color: C.slate900, bold: true,
    charSpacing: -1, valign: "top", margin: 0,
  });

  const lines = [
    { p: "Authenticity", t: "We screen every photo against state-of-the-art AI-generation detectors — the same techniques used to catch the JAKI Pemprov DKI Gemini-watermark scandal in 2025.", c: C.blue },
    { p: "Authenticity", t: "We catch the Microsoft-Word-export trick. We catch the Instagram Story overlay trick. We catch screenshots. We've engineered for what Indonesian fraudsters actually do.", c: C.blue },
    { p: "Identity", t: "Bank-PIC signatures go through Privy / eMeterai — the same e-signature infrastructure your KYC team uses.", c: C.beer },
    { p: "Place", t: "We don't claim perfect GPS coordinates — Indonesia's archipelago infrastructure makes that impossible. We claim 1000 units have 1000 distinct GPS signatures matching the siteplan layout.", c: C.halloween },
    { p: "Time", t: "Our audio fingerprint catches recycled videos using the same forensic technique Shazam uses to identify songs.", c: C.green },
    { p: "Time", t: "If the call to prayer is audible in the walk-around video, our system verifies it matches the muezzin schedule for that location.", c: C.green },
    { p: "Custody", t: "All evidence files are stored on Write-Once-Read-Many infrastructure. Even AutoKon admins cannot delete or overwrite evidence.", c: C.slate700 },
    { p: "Independent", t: "AutoKon makes KJPP 10x more focused. Software pre-screens; KJPP inspects what software flags as risky.", c: C.slate500 },
  ];
  lines.forEach((line, i) => {
    const y = 2.15 + i * 0.62;
    s.addShape(pres.shapes.RECTANGLE, {
      x: PAD, y, w: 1.5, h: 0.5,
      fill: { color: line.c }, line: { color: line.c },
    });
    s.addText(line.p.toUpperCase(), {
      x: PAD, y, w: 1.5, h: 0.5,
      fontFace: F_MONO, fontSize: 9, color: C.white, bold: true,
      align: "center", valign: "middle", charSpacing: 3, margin: 0,
    });
    s.addText('"' + line.t + '"', {
      x: PAD + 1.7, y, w: W - 2 * PAD - 1.7, h: 0.5,
      fontFace: F_BODY, fontSize: 11.5, color: C.slate800, italic: true,
      valign: "middle", margin: 0,
    });
  });
}

// ============= SLIDE 16 — THE CLOSE =============
{
  const s = pres.addSlide(); darkBg(s);
  s.addText("17 · CLOSE", {
    x: PAD, y: 0.32, w: 8, h: 0.36,
    fontFace: F_MONO, fontSize: 10, color: C.slate400, bold: true,
    charSpacing: 6, margin: 0, valign: "middle",
  });
  pageNum(s, 18, true);

  s.addText("Two takeaways", {
    x: PAD, y: 1.4, w: W - 2 * PAD, h: 0.8,
    fontFace: F_DISPLAY, fontSize: 64, color: C.white, bold: true,
    charSpacing: -2, valign: "top", margin: 0,
  });
  s.addText("for the bank.", {
    x: PAD, y: 2.25, w: W - 2 * PAD, h: 0.8,
    fontFace: F_DISPLAY, fontSize: 64, color: C.beer, bold: true,
    charSpacing: -2, valign: "top", margin: 0,
  });

  // Two big cards
  const cardY = 3.5, cardH = 3.0;
  const colW = (W - 2 * PAD - 0.4) / 2;
  s.addShape(pres.shapes.RECTANGLE, {
    x: PAD, y: cardY, w: colW, h: cardH,
    fill: { color: C.slate800 }, line: { color: C.blue, width: 2 },
  });
  s.addText("01", {
    x: PAD + 0.4, y: cardY + 0.35, w: colW - 0.8, h: 0.6,
    fontFace: F_DISPLAY, fontSize: 36, color: C.blue, bold: true,
    valign: "middle", margin: 0,
  });
  s.addText("AutoKon is engineered for Indonesian field reality.", {
    x: PAD + 0.4, y: cardY + 1.0, w: colW - 0.8, h: 1.1,
    fontFace: F_DISPLAY, fontSize: 20, color: C.white, bold: true,
    valign: "top", margin: 0,
  });
  s.addText("Equatorial sun-angle math · BMKG weather feeds · call-to-prayer audio cross-check · RT/RW witness signatures · low-tech consumer-app fraud detectors · siteplan-relative GPS pattern matching. No US/EU competitor would build any of these.", {
    x: PAD + 0.4, y: cardY + 2.05, w: colW - 0.8, h: 0.85,
    fontFace: F_BODY, fontSize: 11.5, color: C.slate300,
    valign: "top", margin: 0,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: PAD + colW + 0.4, y: cardY, w: colW, h: cardH,
    fill: { color: C.slate800 }, line: { color: C.beer, width: 2 },
  });
  s.addText("02", {
    x: PAD + colW + 0.8, y: cardY + 0.35, w: colW - 0.8, h: 0.6,
    fontFace: F_DISPLAY, fontSize: 36, color: C.beer, bold: true,
    valign: "middle", margin: 0,
  });
  s.addText("AutoKon makes the inspector 10x more focused.", {
    x: PAD + colW + 0.8, y: cardY + 1.0, w: colW - 0.8, h: 1.1,
    fontFace: F_DISPLAY, fontSize: 20, color: C.white, bold: true,
    valign: "top", margin: 0,
  });
  s.addText("Software catches ~80% of realistic fraud volume deterministically. The residual 20% is structurally chain-of-custody — KJPP at draw milestones, already part of how Indonesian banks operate. Software pre-screens; KJPP inspects what software flags.", {
    x: PAD + colW + 0.8, y: cardY + 2.05, w: colW - 0.8, h: 0.85,
    fontFace: F_BODY, fontSize: 11.5, color: C.slate300,
    valign: "top", margin: 0,
  });

  s.addText("AutoKon", {
    x: PAD, y: H - 0.5, w: 3, h: 0.3,
    fontFace: F_DISPLAY, fontSize: 14, color: C.white, bold: true,
    margin: 0, valign: "middle",
  });
}

// ============= SLIDE 17 — ASKS =============
{
  const s = pres.addSlide(); lightBg(s);
  eyebrow(s, "18 · Open Questions for Decision"); brandMark(s, false); pageNum(s, 19, false);

  s.addText("Eight decisions before engineering proceeds.", {
    x: PAD, y: 1.0, w: W - 2 * PAD, h: 0.85,
    fontFace: F_DISPLAY, fontSize: 32, color: C.slate900, bold: true,
    charSpacing: -1, valign: "top", margin: 0,
  });

  const asks = [
    "Is custom AutoKon camera app on the table for PILOT-30? (Resolves Items 1.5B + 2.5A together)",
    "KYC partnership selection: Privy vs Tilaka vs Sumsub vs Veriff",
    "Sentinel-2 free vs Planet Labs paid for Phase 0 satellite imagery",
    "OpenTimestamps blockchain vs RFC 3161 TSA for public sealing language",
    "WORM storage migration on Supabase — engineering Phase-0 immediate win",
    "Drone overflight ingest format standardization with developers",
    "Tier-3 review queue SLA (Dickson's open question 6)",
    "RT/RW witness program scope and honoraria budget",
  ];
  asks.forEach((a, i) => {
    const y = 2.4 + i * 0.55;
    s.addShape(pres.shapes.OVAL, {
      x: PAD, y: y + 0.06, w: 0.4, h: 0.4,
      fill: { color: C.blue }, line: { color: C.blue },
    });
    s.addText(String(i + 1), {
      x: PAD, y: y + 0.06, w: 0.4, h: 0.4,
      fontFace: F_DISPLAY, fontSize: 13, color: C.white, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(a, {
      x: PAD + 0.6, y, w: W - 2 * PAD - 0.6, h: 0.5,
      fontFace: F_BODY, fontSize: 13, color: C.slate800,
      valign: "middle", margin: 0,
    });
  });
}

// ============= SLIDE 18 — END =============
{
  const s = pres.addSlide(); darkBg(s);
  s.addText("19 · END", {
    x: PAD, y: 0.32, w: 8, h: 0.36,
    fontFace: F_MONO, fontSize: 10, color: C.slate400, bold: true,
    charSpacing: 6, margin: 0, valign: "middle",
  });
  pageNum(s, 20, true);

  s.addText("Six pillars,", {
    x: PAD, y: 1.7, w: W - 2 * PAD, h: 0.95,
    fontFace: F_DISPLAY, fontSize: 64, color: C.white, bold: true,
    charSpacing: -2, valign: "top", margin: 0,
  });
  s.addText([
    { text: "thirty-five", options: { color: C.beer } },
    { text: " items,", options: { color: C.white } },
  ], {
    x: PAD, y: 2.55, w: W - 2 * PAD, h: 0.95,
    fontFace: F_DISPLAY, fontSize: 64, charSpacing: -2, bold: true,
    valign: "top", margin: 0,
  });
  s.addText([
    { text: "one ", options: { color: C.white } },
    { text: "verifiable", options: { color: C.blue } },
    { text: " bank pitch.", options: { color: C.white } },
  ], {
    x: PAD, y: 3.4, w: W - 2 * PAD, h: 0.95,
    fontFace: F_DISPLAY, fontSize: 64, charSpacing: -2, bold: true,
    valign: "top", margin: 0,
  });

  // Footer
  const fY = 5.7;
  const fCols = [
    { lbl: "FULL BRIEF", val: "EVIDENCE_INTEGRITY_RESEARCH.md", c: C.beer },
    { lbl: "INTERACTIVE", val: "index.html", c: C.white },
    { lbl: "AUTHORS", val: "Adrian + Claude Cowork", c: C.white },
  ];
  fCols.forEach((m, i) => {
    const colW = (W - 2 * PAD) / 3;
    const x = PAD + i * colW;
    s.addText(m.lbl, {
      x, y: fY, w: colW, h: 0.3,
      fontFace: F_MONO, fontSize: 10, color: C.slate400, bold: true,
      charSpacing: 6, margin: 0, valign: "middle",
    });
    s.addText(m.val, {
      x, y: fY + 0.32, w: colW - 0.2, h: 0.5,
      fontFace: F_BODY, fontSize: 16, color: m.c, bold: true,
      margin: 0, valign: "middle",
    });
  });

  s.addText([
    { text: "AutoKon", options: { bold: true, fontSize: 14, color: C.white, fontFace: F_DISPLAY } },
    { text: ".id", options: { fontSize: 14, color: C.slate400, fontFace: F_DISPLAY } },
  ], { x: PAD, y: H - 0.5, w: 3, h: 0.3, margin: 0, valign: "middle" });
}

pres.writeFile({ fileName: "AutoKon-Evidence-Integrity-Summary.pptx" })
  .then(name => console.log("Created:", name))
  .catch(err => { console.error(err); process.exit(1); });
