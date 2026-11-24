// Thorn — who's in it: Silas and Rose, as Fenwick Hall has them (js/cast.js there: their bodies, looks, how she takes pain, her wilfulness,
// her word, their temperaments), brought into the present day and dressed in modern clothes. The engine (js/session.js, ported from Fenwick
// and Project Meridian before it) reads the same fields Fenwick's roster gave it: pain, meters.wilfulness, body (h, mass, fat, bust,
// response), dynamic, word, base, look, braces, and what Silas calls her (short).
//
// What they wear is Meridian's modern wardrobe on the Blender-built layers (js/figure.js, outfit 'offduty'): a top (a shirt with its sleeves
// pushed up, or a long-sleeved one), down or raised; trousers, up or lowered; briefs, up or lowered; boots or shoes. Each top, legs and shoes
// is one of the patterns js/figure.js draws on them (TOPS, LEGS, SHOES).
//
//   Cast.ROSTER.rose · Cast.IDS · Cast.SQUIRE · Cast.WARDROBE · Cast.outfits('rose') · Cast.figureSpec('rose', 'f', 'jeans') · Cast.squireSpec({ outfit })
(function (root) {
'use strict';
const METERS = ['compliance', 'mindfulness', 'wilfulness'];

// ── Rose (Fenwick's Red: her given name; "Red" for the coat) ──
// resist: how she resists, as two numbers, 0–1: overt (open defiance: the session's wilfulness) and covert (concealment, withholding).
// pain: tolerance and resilience for js/pain.js. body: her height (metres), mass (muscle and frame), fat (softness), bust (0 small – 1 large),
// response (her body's response to a correction: 1, as Meridian and Fenwick have it). look: skin, hair, its style (braid, with braidLen in head
// units and its tie's colour), eyes. dynamic: romance, bond (affection given and returned, 0–1).
const ROSTER = {
  rose: {
    id: 'rose', name: 'Rose', short: 'Rose', title: 'Rose', age: 19, role: 'Works the counter at her mum’s bakery; Silas’s girlfriend',
    about: {
      names: 'Rose. Her mum and her nan still call her Red, for the red coat she’s worn every winter since school.',
      flaw: 'Drifting: headphones in, phone on two per cent, the shortcut through the woods after dark, the warnings heard and not heeded.',
      history: 'Her dad died when she was small; her mum runs the bakery on the high street on her own, and Rose works the counter and the early ovens. Most evenings she takes something round to her nan, whose cottage is the far side of the woods.',
      temperament: 'Warm, generous with her attention, liked by everyone who comes into the shop. Restless under repetition, drawn off the path by whatever catches her eye. Under the cheerfulness, a low, constant unease about where her life is going.',
      resistance: 'Repetition, not rebellion: dawdling, straying, turning up late with a flat battery. What she’s corrected for is follow-through and presence of mind.',
      terms: 'She asked for it, in the end: someone who’d notice, and mind. They agreed his terms between them, and her word, before he ever took her across his knee.',
    },
    resist: { style: 'repetition', overt: 0.3, covert: 0.2 }, meters: { wilfulness: 0.3, compliance: 0.45, mindfulness: 0.3 },
    pain: { tolerance: 0.55, resilience: 0.58 },
    body: { type: 'sturdy from the ovens and the walk to her nan’s, average height', h: { f: 1.65 }, mass: 0.52, fat: 0.45, bust: 0.55, response: 1 },
    look: { skin: '#e8c4a4', hair: '#5a2a1e', hairStyle: 'braid', hairCap: 'swept', braidLen: 4.5, ribbon: '#a8282a', eyes: '#6a5a3a' },
    dynamic: { romance: true, bond: 0.6 }, word: 'Lantern', base: 'smile',
  },
};
const IDS = Object.keys(ROSTER);

// ── What she wears: Meridian's off-duty layers, her own colours. Each an `off` spec for js/figure.js:
//   top: henley | thermal | open | waistcoat | cardigan | tee | sweatervest | plaid; sleeves: rolled (pushed up to the forearm) | long;
//   tunic: the top's colour; shirt: what's under it (a tee under an open shirt, a shirt under a cardigan); print: its print or buttons;
//   accent: a trim (a thread at the cuff, a print's centres); trousers: their colour; legs: canvas | joggers | chinos | work | combat |
//   pressed | jeans; legAccent: their stitching or cord; under: her briefs' colour; shoes: boots | soft | deck | work | sneakers | flats |
//   loafers; shoe, sole, trim, sock.
const WARDROBE = {
  rose: {
    jeans: { top: 'tee', sleeves: 'rolled', tunic: '#8e2a30', shirt: '#8e2a30', print: '#8e2a30', accent: '#8e2a30', trousers: '#3e5a86', legs: 'jeans', legAccent: '#d8963a',
      under: '#e8c8cc', shoes: 'sneakers', shoe: '#f4f2ee', sole: '#e8e4dc', trim: '#b8323a', sock: '#f4f2ee' },
    cardigan: { top: 'cardigan', sleeves: 'long', tunic: '#a8282a', shirt: '#f2ede2', print: '#e8dcc4', accent: '#a8282a', trousers: '#2a3a58', legs: 'jeans', legAccent: '#c8a46a',
      under: '#2a2426', shoes: 'flats', shoe: '#2a2020', sole: '#1a1414', trim: '#4a3a34', sock: '#d8c4b4' },
    lounge: { top: 'thermal', sleeves: 'long', tunic: '#9a9a9e', shirt: '#9a9a9e', accent: '#c83a3a', trousers: '#3a3a40', legs: 'joggers', legAccent: '#c83a3a',
      under: '#c8d8e8', shoes: 'soft', shoe: '#b8323a', sole: '#5a2a2a', trim: '#5a2a2a', sock: '#ece4da' },
    work: { top: 'henley', sleeves: 'rolled', tunic: '#5a6a4a', shirt: '#e8dcc4', trousers: '#c8b896', legs: 'chinos', legAccent: '#8a7a5a',
      under: '#f2ece4', shoes: 'work', shoe: '#5a3e2a', sole: '#2a2018', trim: '#c8a46a', sock: '#6a5a4a' },
  },
};
// (a line about each, for the set-up)
const OUTFIT_NOTES = {
  jeans: 'a plain red tee, jeans, trainers', cardigan: 'her red cardigan over a shirt, jeans, flats', lounge: 'a marl top and joggers, slippers', work: 'from the bakery: a henley, chinos, work shoes',
  henley: 'a henley, sleeves pushed up, jeans, boots', flannel: 'a check flannel shirt open over a tee, work trousers, boots', knit: 'a cardigan over a shirt, chinos, loafers',
};
for (const id in WARDROBE) ROSTER[id].wardrobe = WARDROBE[id];
const outfits = id => Object.keys(WARDROBE[id] || {});

// ── Silas (Fenwick's Silas Fenwick, in the present day) ──
// A practical, woodsy man in his late thirties: a tree surgeon who works the woods behind the town and lives at their edge. His temperament as
// Fenwick has it; his look the same (tousled hair, a beard); his build average.
const SQUIRE = {
  id: 'silas', name: 'Silas Fenwick', short: 'Silas', title: 'Silas', role: 'Tree surgeon; Rose’s boyfriend', age: 37,
  about: {
    archetype: 'The practical woodsman. Self-reliant; works with his hands, reads the weather and the trees, lives simply.',
    temperament: ['Exacting and economical with words; warmth shows in what he does', 'Immovable once decided, because he checks his reasoning first', 'Dry humour, rare enough to feel earned', 'Unimpressed by vanity or excuses; deeply protective once someone is in his care'],
    method: 'Hears an account before he judges. Says what he expects plainly, and does what he said he would.',
  },
  look: { skin: '#d6ad8e', hair: '#4a3220', hairStyle: 'tousled', eyes: '#5a6a4a', beard: true },
  build: { mass: 0.6, fat: 0.4 }, h: 1.86,      // (one build: average)
  wardrobe: {
    henley: { top: 'henley', sleeves: 'rolled', tunic: '#4e4a36', shirt: '#d8cdb4', trousers: '#2e3a52', legs: 'jeans', legAccent: '#c8963a', under: '#2a2c30',
      shoes: 'boots', shoe: '#5a3a24' },
    flannel: { top: 'plaid', sleeves: 'rolled', tunic: '#7a1e1e', shirt: '#4a4c50', print: '#1a1a1e', accent: '#c8a46a', trousers: '#5a5240', legs: 'work', legAccent: '#d8b46a', under: '#2a2c30',
      shoes: 'boots', shoe: '#4a3020' },
    knit: { top: 'cardigan', sleeves: 'long', tunic: '#3a4048', shirt: '#cfd8e0', print: '#2a2a2a', accent: '#3a4048', trousers: '#b8a888', legs: 'chinos', legAccent: '#8a7a5a', under: '#2a2c30',
      shoes: 'loafers', shoe: '#3a2418', sole: '#1a1410', trim: '#2a1a12', sock: '#2a2c34' },
  },
  options: { skin: ['#f0d0b4', '#d6ad8e', '#b88a6a', '#8a5a3e'], hair: ['#161210', '#3a2a20', '#4a3220', '#6a4a2e', '#8a8580'], hairStyle: ['tousled', 'short', 'crop'] },
};
const squireOutfits = () => Object.keys(SQUIRE.wardrobe);

const pronouns = () => ({ they: 'she', them: 'her', their: 'her', They: 'She' });
// Rose as a figure, in one of her outfits (her first by default), or 'none' (nothing on: the figures panel's, to see how the body moves).
function figureSpec(id, sex, outfit) {
  const r = ROSTER[id], L = r.look, W = WARDROBE[id] || {}, none = outfit === 'none', key = W[outfit] ? outfit : outfits(id)[0], O = W[key] || {};
  return { who: id, sex: 'f', height: r.body.h.f, mass: r.body.mass, fat: r.body.fat, skin: L.skin, hair: L.hair, hairStyle: L.hairStyle, hairCap: L.hairCap, braidLen: L.braidLen, ribbon: L.ribbon,
    eyes: L.eyes, lips: L.lips || null, beard: false, outfit: none ? 'none' : 'offduty', off: O, outfitKey: none ? 'none' : key, dept: O.accent || O.tunic || '#a8282a', bust: r.body.bust };
}
// Silas as a figure: c.outfit one of his (his first by default) or 'none'; skin, hair, hairStyle, beard as chosen.
function squireSpec(c) {
  c = Object.assign({ skin: SQUIRE.look.skin, hair: SQUIRE.look.hair, hairStyle: SQUIRE.look.hairStyle, beard: true }, c || {});
  const W = SQUIRE.wardrobe, key = W[c.outfit] ? c.outfit : squireOutfits()[0], O = W[key];
  return { sex: 'm', height: SQUIRE.h, mass: SQUIRE.build.mass, fat: SQUIRE.build.fat, skin: c.skin, hair: c.hair, hairStyle: c.hairStyle, eyes: SQUIRE.look.eyes, beard: c.beard !== false,
    outfit: c.outfit === 'none' ? 'none' : 'offduty', off: O, outfitKey: c.outfit === 'none' ? 'none' : key, dept: O.accent || O.tunic, bust: 0.45, size: 1, who: 'silas' };
}
// How much she squirms under a correction, 0 (stoic) – 1: the smaller she is the more (her height against Fenwick's household's and her
// mass), and the more pain she can take, a little the less. body.wriggle, where given, overrides it.
const H_SPAN = [1.55, 1.75];
function wriggle(id) {
  const r = ROSTER[id]; if (!r) return 0.5; if (r.body.wriggle != null) return r.body.wriggle;
  const hn = Math.max(0, Math.min(1, (r.body.h.f - H_SPAN[0]) / (H_SPAN[1] - H_SPAN[0]))), size = 0.4 * hn + 0.6 * r.body.mass, tol = r.pain.tolerance;
  return Math.max(0.15, Math.min(1, 1.15 - size - 0.5 * (tol - 0.5)));
}
// Voice pitch for the babble and cries (Hz).
const PITCH = { silas: 118, rose: 210 };
const pitch = id => PITCH[id] || 208;

const api = { METERS, ROSTER, IDS, SQUIRE, WARDROBE, OUTFIT_NOTES, outfits, squireOutfits, pronouns, figureSpec, squireSpec, pitch, wriggle };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
root.Cast = api;
})(typeof window !== 'undefined' ? window : globalThis);
