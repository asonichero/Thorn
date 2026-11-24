// Thorn — who's in it: James Edwards and Rose. Rose as Fenwick Hall has her (js/cast.js there: her body, her look, how she takes pain, her
// wilfulness, her word, her temperament); James on Fenwick's Silas (his temperament, his build), his look his own. Both in the present day,
// in modern clothes.
//
// The premise (docs/lore.md): the people James corrects are people in his life who trust him and have agreed, of their own accord, to give him
// the authority to discipline them: to relieve guilt, to build habits, or to improve their behaviour (REASONS; each subject's `agreed`). It's
// always on terms agreed first, with a word of their own that stops it at once, and aftercare after. Most of them come, in time, to have
// romantic or sexual feelings for him, from the steady, supportive presence he is (each subject's `feelings`; Cast.grow, below).
//
// The engine (js/session.js, ported from Fenwick
// and Project Meridian before it) reads the same fields Fenwick's roster gave it: pain, meters.wilfulness, body (h, mass, fat, bust,
// response), dynamic, word, base, look, braces, and what James calls her (short).
//
// What they wear is Meridian's modern wardrobe on the Blender-built layers (js/figure.js, outfit 'offduty'): a top (a shirt with its sleeves
// pushed up, or a long-sleeved one), down or raised; trousers, up or lowered; briefs, up or lowered; boots or shoes. Each top, legs and shoes
// is one of the patterns js/figure.js draws on them (TOPS, LEGS, SHOES).
//
//   Cast.ROSTER.rose · Cast.IDS · Cast.SQUIRE · Cast.WARDROBE · Cast.outfits('rose') · Cast.figureSpec('rose', 'f', 'jeans') · Cast.squireSpec({ outfit })
//   · Cast.REASONS · Cast.grow(id, rel, result)
(function (root) {
'use strict';
const METERS = ['compliance', 'mindfulness', 'wilfulness'];
// (why someone asks him: docs/lore.md)
const REASONS = { guilt: 'to relieve guilt', habits: 'to build habits', behaviour: 'to improve her behaviour', release: 'to set responsibility down for a while' };

// ── Rose (Fenwick's Red: her given name; "Red" for the coat) ──
// resist: how she resists, as two numbers, 0–1: overt (open defiance: the session's wilfulness) and covert (concealment, withholding).
// pain: tolerance and resilience for js/pain.js. body: her height (metres), mass (muscle and frame), fat (softness), bust (0 small – 1 large),
// response (her body's response to a correction: 1, as Meridian and Fenwick have it). look: skin, hair, its style (braid, with braidLen in head
// units and its tie's colour), eyes. dynamic: romance, bond (affection given and returned, 0–1).
// agreed: why she gave him the authority (REASONS) and how she came to it. feelings: how her feelings for him grow from his presence: rate
// (0 never, 1 as most do, more for those it comes to easily), and what it's like for her.
const ROSTER = {
  rose: {
    id: 'rose', name: 'Rose', short: 'Rose', title: 'Rose', age: 19, role: 'Works the counter at her mum’s bakery; asked James to hold her to account',
    about: {
      names: 'Rose. Her mum and her nan still call her Red, for the red coat she’s worn every winter since school.',
      flaw: 'Drifting: headphones in, phone on two per cent, the shortcut through the woods after dark, the warnings heard and not heeded.',
      history: 'Her dad died when she was small; her mum runs the bakery on the high street on her own, and Rose works the counter and the early ovens. Most evenings she takes something round to her nan, whose cottage is the far side of the woods.',
      temperament: 'Warm, generous with her attention, liked by everyone who comes into the shop. Restless under repetition, drawn off the path by whatever catches her eye. Under the cheerfulness, a low, constant unease about where her life is going.',
      resistance: 'Repetition, not rebellion: dawdling, straying, turning up late with a flat battery. What she’s corrected for is follow-through and presence of mind.',
      terms: 'She asked for it: someone who’d notice, and mind. They agreed his terms between them, and her word, before he ever took her across his knee.',
    },
    agreed: { reasons: ['habits', 'guilt'],
      story: 'Last winter she went quiet for an evening and walked home through the woods in the dark; her mum rang round half the town and her nan sat up by the lantern in her window. She’s carried it since. James is in the shop every morning. She asked him to hold her to telling people where she is and keeping to the road, and to let her set the guilt down when she doesn’t.' },
    feelings: { rate: 1.3, text: 'She arrives liking him a good deal already. His steadiness is what she’s never had, and her feelings for him grow easily.' },
    resist: { style: 'repetition', overt: 0.3, covert: 0.2 }, meters: { wilfulness: 0.3, compliance: 0.45, mindfulness: 0.3 },
    pain: { tolerance: 0.55, resilience: 0.58 },
    body: { type: 'sturdy from the ovens and the walk to her nan’s, average height', h: { f: 1.65 }, mass: 0.52, fat: 0.45, bust: 0.55, response: 1 },
    look: { skin: '#e8c4a4', hair: '#5a2a1e', hairStyle: 'braid', hairCap: 'swept', braidLen: 4.5, ribbon: '#a8282a', eyes: '#6a5a3a' },
    dynamic: { romance: true, bond: 0.35 }, word: 'Lantern', base: 'smile',
  },
  // ── Bethan (Thorn's own: docs/lore.md) ──
  bethan: {
    id: 'bethan', name: 'Bethan', short: 'Beth', title: 'Bethan', age: 26, role: 'A colleague of James’s; a mother, with her partner, Will',
    about: {
      names: 'Bethan. Beth to everyone at work and at home; James uses either.',
      flaw: 'Holding everything: she says yes to everyone, runs herself into the ground, and when it’s too much she snaps at the people she loves and then can’t forgive herself for it.',
      history: 'She and James have worked together for two years. She’s twenty-six, with a young family at home and Will, her partner, who she loves and who loves her. She’s the one everyone leans on: in the office, at home, with her mum.',
      temperament: 'Warm, quick and capable, the organised one, funny when she’s rested. Proud of coping. Lets nobody look after her, and only lately has she let herself want it.',
      resistance: 'Control, not defiance: she manages it, apologises, talks herself through it, holds herself together for as long as she can. What she’s corrected for is running herself ragged; what she comes for is the moment she can stop holding it all.',
      terms: 'She asked: one evening after the office emptied, when everything was too much. They agreed his terms between them, and her word, and Will knew before any of it began.',
    },
    agreed: { reasons: ['release', 'habits'],
      story: 'She turned to James for support, and for somewhere she could stop being in charge. Will knows about their meetings, and about the feelings growing between them; he’s seen what it does for her, how much happier and easier she comes home, and he’s signed off on it entirely.' },
    feelings: { rate: 1.0, text: 'She came for the quiet. She didn’t expect to want his steadiness as much as she does, or him. She doesn’t hide it, and Will’s glad for her.' },
    braces: true,      // (given in, she holds on: the chair and his leg, not reaching back)
    resist: { style: 'control', overt: 0.4, covert: 0.55 }, meters: { wilfulness: 0.4, compliance: 0.6, mindfulness: 0.65 },
    pain: { tolerance: 0.6, resilience: 0.55 },
    body: { type: 'compact and soft, a little shorter than average', h: { f: 1.6 }, mass: 0.46, fat: 0.55, bust: 0.62, response: 1 },
    look: { skin: '#f2d2bc', hair: '#3a2216', hairStyle: 'chignon', eyes: '#5e7a6c', lips: '#b86a6a' },
    dynamic: { romance: true, bond: 0.45 }, word: 'Bluebell', base: 'smile',
  },
  // ── Niamh (Thorn's own: docs/lore.md) ──
  niamh: {
    id: 'niamh', name: 'Niamh', short: 'Niamh', title: 'Niamh', age: 21, role: 'A musical theatre student; met James at the amateur dramatic society',
    about: {
      names: 'Niamh (said “Neev”). Everyone at the society gets it wrong the first time; James never did.',
      flaw: 'Making everything about herself when she’s under pressure: late, under-rehearsed, on her phone, cancelling on people at the last minute, flaring up at notes and storming off, and then not listening to the people who love her when they say so.',
      history: 'In her final year of a musical theatre degree, and in every show the amateur dramatic society puts on, where she met James. It was hurting everything: her parents, her friends, whoever she was seeing, and her focus in rehearsals and performances.',
      temperament: 'Bright, quick and genuinely gifted; big-hearted when she’s paying attention; funny, theatrical, impatient. Easier to be dramatic than to be sorry.',
      resistance: 'Out loud: she argues the toss, protests that it’s unfair, makes a scene of it, and looks back at him. Her pride holds out until it doesn’t. What she’s corrected for is turning up, being prepared, and listening.',
      terms: 'After a heart-to-heart at the society, he offered to help, and for a while it was only talking. When she said she wasn’t getting anywhere, he told her about Rose and Bethan, and she agreed it might help her too. They agreed his terms between them, and her word.',
    },
    agreed: { reasons: ['behaviour', 'habits'],
      story: 'She admired his wisdom and his way with people, and after a heart-to-heart she saw what she was doing: to her parents, her friends, her partners, and to her own rehearsals and performances. His help was pastoral at first. When she told him she knew it all and still wasn’t changing, he explained how it is with Rose and Bethan, and she agreed it might help her too.' },
    feelings: { rate: 1.1, text: 'She admired him first: how steady he is, how he listens. The admiring is turning into something else, and she knows it.' },
    resist: { style: 'overt', overt: 0.6, covert: 0.25 }, meters: { wilfulness: 0.6, compliance: 0.35, mindfulness: 0.3 },
    pain: { tolerance: 0.45, resilience: 0.62 },
    body: { type: 'slim and toned, a dancer, a little taller than average', h: { f: 1.67 }, mass: 0.5, fat: 0.34, bust: 0.46, response: 1 },
    look: { skin: '#f3d8c6', hair: '#6a523e', hairStyle: 'braid', hairCap: 'swept', braidKind: 'loose', braidLen: 6.2, eyes: '#7d93a6', lips: '#c48a86', freckles: 0.8 },
    dynamic: { romance: true, bond: 0.3 }, word: 'Curtain', base: 'defiant',
  },
  // ── Saskia (Thorn's own: docs/lore.md) ──
  saskia: {
    id: 'saskia', name: 'Saskia', short: 'Saskia', title: 'Saskia', age: 22, role: 'A musical theatre student, Niamh’s friend; asked James to help her work',
    about: {
      names: 'Saskia. Sas, to Niamh.',
      flaw: 'Coasting on talent and charm: practice left till the night before, warm-ups skipped, out late before a show, the work talked her way out of; then the panic, in the wings.',
      history: 'On the same course as Niamh and in the society’s shows; in rehearsal now for its cheer-squad musical. When Niamh started turning up on time, off book and calmer, Saskia asked her what technique she’d found.',
      temperament: 'Bubbly, sunny, confident in a room; competitive; charming enough to get away with most things, and quietly afraid she isn’t as good as everyone thinks.',
      resistance: 'Charm and excuses: she bargains, jokes, promises, tries to talk her way out of it, and sulks when it doesn’t work. What she’s corrected for is doing the work.',
      terms: 'He met her to talk through her goals and how he works, and the two of them agreed to work together, on terms, with her word.',
    },
    agreed: { reasons: ['habits', 'behaviour'],
      story: 'She saw how much Niamh had changed and asked if she’d found a new study or performance technique. Niamh told her about James. He met Saskia to talk through her goals and his methods, and the two of them agreed to work together.' },
    feelings: { rate: 0.9, text: 'She came for results. She’s finding she likes being taken seriously, and the man who does it.' },
    resist: { style: 'charm', overt: 0.35, covert: 0.5 }, meters: { wilfulness: 0.45, compliance: 0.4, mindfulness: 0.35 },
    pain: { tolerance: 0.42, resilience: 0.6 },
    body: { type: 'athletic, a dancer, average height', h: { f: 1.66 }, mass: 0.5, fat: 0.42, bust: 0.6, response: 1 },
    look: { skin: '#f4d8c4', hair: '#e8d6a2', hairStyle: 'braid', hairCap: 'swept', braidKind: 'pigtails', braidLen: 3.6, ribbon: '#f2f0ec', eyes: '#7a8ea0', lips: '#c8888a' },
    dynamic: { romance: true, bond: 0.3 }, word: 'Blackout', base: 'smile',
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
    jeans: { top: 'tee', sleeves: 'rolled', tunic: '#c98a8e', shirt: '#c98a8e', print: '#c98a8e', accent: '#c98a8e', trousers: '#3e5a86', legs: 'jeans', legAccent: '#d8963a',
      under: '#e8c8cc', shoes: 'sneakers', shoe: '#f4f2ee', sole: '#e8e4dc', trim: '#b8323a', sock: '#f4f2ee' },
    cardigan: { top: 'cardigan', sleeves: 'long', tunic: '#a8282a', shirt: '#f2ede2', print: '#e8dcc4', accent: '#a8282a', trousers: '#2a3a58', legs: 'jeans', legAccent: '#c8a46a',
      under: '#2a2426', shoes: 'flats', shoe: '#2a2020', sole: '#1a1414', trim: '#4a3a34', sock: '#d8c4b4' },
    lounge: { top: 'thermal', sleeves: 'long', tunic: '#9a9a9e', shirt: '#9a9a9e', accent: '#c83a3a', trousers: '#3a3a40', legs: 'joggers', legAccent: '#c83a3a',
      under: '#c8d8e8', shoes: 'soft', shoe: '#b8323a', sole: '#5a2a2a', trim: '#5a2a2a', sock: '#ece4da' },
    work: { top: 'henley', sleeves: 'rolled', tunic: '#5a6a4a', shirt: '#e8dcc4', trousers: '#c8b896', legs: 'chinos', legAccent: '#8a7a5a',
      under: '#f2ece4', shoes: 'work', shoe: '#5a3e2a', sole: '#2a2018', trim: '#c8a46a', sock: '#6a5a4a' },
  },
  saskia: {
    costume: { top: 'tank', sleeves: 'rolled', tunic: '#f2f0ec', shirt: '#f2f0ec', accent: '#f2f0ec', trousers: '#2a48b0', legs: 'skirt', legAccent: '#f6f6f4', skirtLen: 0.32,
      under: '#f2f0ee', shoes: 'boots', shoe: '#7a7468', socks: '#f4f2ee', socksTop: 0.31 },
    casual: { top: 'tee', sleeves: 'rolled', tunic: '#e6a8b6', shirt: '#e6a8b6', print: '#e6a8b6', accent: '#e6a8b6', trousers: '#6a86b0', legs: 'jeans', legAccent: '#d8a04a',
      under: '#f2e4e8', shoes: 'sneakers', shoe: '#f4f2ee', sole: '#e8e4dc', trim: '#e6a8b6', sock: '#f4f2ee' },
    cosy: { top: 'thermal', sleeves: 'long', tunic: '#b8bcc4', shirt: '#b8bcc4', accent: '#e6a8b6', trousers: '#4a4e5a', legs: 'joggers', legAccent: '#e6a8b6',
      under: '#e4e8f0', shoes: 'soft', shoe: '#e6a8b6', sole: '#8a5a68', trim: '#8a5a68', sock: '#f0ebe4' },
  },
  niamh: {
    rehearsal: { top: 'tank', sleeves: 'rolled', tunic: '#1c1c20', shirt: '#1c1c20', accent: '#1c1c20', trousers: '#18181c', legs: 'leggings', legAccent: '#18181c',
      under: '#2a2628', shoes: 'flats', shoe: '#141414', sole: '#0c0c0c', trim: '#2a2a2a', sock: '#f0d4c2' },
    casual: { top: 'tee', sleeves: 'rolled', tunic: '#9aa890', shirt: '#9aa890', print: '#9aa890', accent: '#9aa890', trousers: '#3c4e6e', legs: 'jeans', legAccent: '#d8a04a',
      under: '#e8d4d8', shoes: 'sneakers', shoe: '#f4f2ee', sole: '#e8e4dc', trim: '#9aa890', sock: '#f4f2ee' },
    cosy: { top: 'cardigan', sleeves: 'long', tunic: '#ddd6c8', shirt: '#f4f2ee', print: '#b8ad98', accent: '#ddd6c8', trousers: '#18181c', legs: 'leggings', legAccent: '#18181c',
      under: '#d8d0e2', shoes: 'soft', shoe: '#c8bfb0', sole: '#7a7060', trim: '#7a7060', sock: '#f0ebe4' },
  },
  bethan: {
    office: { top: 'cardigan', sleeves: 'long', tunic: '#7e8c6c', shirt: '#f2ece0', print: '#d8cdb0', accent: '#7e8c6c', trousers: '#2a3044', legs: 'pressed', legAccent: '#1e2432',
      under: '#e8cdd2', shoes: 'flats', shoe: '#1e1a1a', sole: '#121010', trim: '#3a3030', sock: '#e2c8b8' },
    weekend: { top: 'open', sleeves: 'rolled', tunic: '#3e5c7c', shirt: '#f4f0ea', print: '#c6d6e2', accent: '#e8c46a', trousers: '#4a6488', legs: 'jeans', legAccent: '#d8a04a',
      under: '#d6e2ee', shoes: 'sneakers', shoe: '#f2f0ec', sole: '#e2ddd4', trim: '#3e5c7c', sock: '#f2f0ec' },
    home: { top: 'thermal', sleeves: 'long', tunic: '#c8b6c8', shirt: '#c8b6c8', accent: '#8a6a8a', trousers: '#5a5866', legs: 'joggers', legAccent: '#c8b6c8',
      under: '#f0e6e8', shoes: 'soft', shoe: '#8a7a9a', sole: '#4a3e52', trim: '#4a3e52', sock: '#ece4e6' },
  },
};
// (a line about each, for the set-up)
const OUTFIT_NOTES = {
  jeans: 'a plain pink tee, jeans, trainers', cardigan: 'her red cardigan over a shirt, jeans, flats', lounge: 'a marl top and joggers, slippers', work: 'from the bakery: a henley, chinos, work shoes',
  costume: 'her show costume: a white tank top, a blue pleated skirt, white socks, suede boots', rehearsal: 'rehearsal blacks: a sleeveless top, leggings, jazz shoes', casual: 'a sage tee, jeans, trainers', cosy: 'a cream cardigan over a white top, leggings, slippers',
  office: 'a sage cardigan over a blouse, smart trousers, flats', weekend: 'a print shirt open over a tee, jeans, trainers', home: 'a soft lilac top and joggers, slippers',
  tee: 'a plain maroon T-shirt, jeans, boots', henley: 'a henley, sleeves pushed up, jeans, boots', flannel: 'a check flannel shirt open over a tee, work trousers, boots', knit: 'a cardigan over a shirt, chinos, loafers',
};
for (const id in WARDROBE) ROSTER[id].wardrobe = WARDROBE[id];
const outfits = id => Object.keys(WARDROBE[id] || {});

// ── James Edwards (on Fenwick's Silas Fenwick, in the present day) ──
// A practical, woodsy man in his late thirties: a tree surgeon who works the woods behind the town and lives at their edge. His temperament as
// Fenwick has Silas's. His look: dark brown hair, worn longer on top, parted on his left and swept back and over (tools/blender/build_hair.py:
// sweptback); a short, full beard, trimmed lower on the cheek (trim), gingery against his hair (spec.beardCol); brown eyes, hazel at their edge; fair skin, warm and a little
// ruddy; a fuller face and frame. Most days a plain maroon T-shirt.
const SQUIRE = {
  id: 'james', name: 'James Edwards', short: 'James', title: 'James', role: 'Tree surgeon; trusted, by the people in his life who ask it, to hold them to account', age: 37,
  about: {
    archetype: 'The practical woodsman. Self-reliant; works with his hands, reads the weather and the trees, lives simply.',
    temperament: ['Exacting and economical with words; warmth shows in what he does', 'Immovable once decided, because he checks his reasoning first', 'Dry humour, rare enough to feel earned', 'Unimpressed by vanity or excuses; deeply protective once someone is in his care'],
    method: 'Hears an account before he judges. Says what he expects plainly, and does what he said he would.',
    arrangement: 'Corrects only those who’ve asked him to and agreed his terms; their word stops it at once; he stays afterwards, always. None of it is owed.',
  },
  look: { skin: '#ecc2a6', hair: '#4a2e1e', hairStyle: 'sweptback', eyes: '#6e4a2a', beard: true, beardCol: '#7e4e34', beardStyle: 'trim' },
  build: { mass: 0.6, fat: 0.52 }, h: 1.86,      // (one build: average, a little soft)
  wardrobe: {
    tee: { top: 'tee', sleeves: 'rolled', tunic: '#6e1c24', shirt: '#6e1c24', print: '#6e1c24', accent: '#6e1c24', trousers: '#2e3a52', legs: 'jeans', legAccent: '#c8963a', under: '#2a2c30',
      shoes: 'boots', shoe: '#5a3a24' },
    henley: { top: 'henley', sleeves: 'rolled', tunic: '#4e4a36', shirt: '#d8cdb4', trousers: '#2e3a52', legs: 'jeans', legAccent: '#c8963a', under: '#2a2c30',
      shoes: 'boots', shoe: '#5a3a24' },
    flannel: { top: 'plaid', sleeves: 'rolled', tunic: '#7a1e1e', shirt: '#4a4c50', print: '#1a1a1e', accent: '#c8a46a', trousers: '#5a5240', legs: 'work', legAccent: '#d8b46a', under: '#2a2c30',
      shoes: 'boots', shoe: '#4a3020' },
    knit: { top: 'cardigan', sleeves: 'long', tunic: '#3a4048', shirt: '#cfd8e0', print: '#2a2a2a', accent: '#3a4048', trousers: '#b8a888', legs: 'chinos', legAccent: '#8a7a5a', under: '#2a2c30',
      shoes: 'loafers', shoe: '#3a2418', sole: '#1a1410', trim: '#2a1a12', sock: '#2a2c34' },
  },
  options: { skin: ['#ecc2a6', '#f0d0b4', '#d6ad8e', '#b88a6a', '#8a5a3e'], hair: ['#4a2e1e', '#161210', '#3a2a20', '#6a4a2e', '#8a8580'], hairStyle: ['sweptback', 'tousled', 'short', 'crop'] },
};
const squireOutfits = () => Object.keys(SQUIRE.wardrobe);

const pronouns = () => ({ they: 'she', them: 'her', their: 'her', They: 'She' });
// Rose as a figure, in one of her outfits (her first by default), or 'none' (nothing on: the figures panel's, to see how the body moves).
// (either of them: Rose's plait, Bethan's chignon)
function figureSpec(id, sex, outfit) {
  const r = ROSTER[id], L = r.look, W = WARDROBE[id] || {}, none = outfit === 'none', key = W[outfit] ? outfit : outfits(id)[0], O = W[key] || {};
  return { who: id, sex: 'f', height: r.body.h.f, mass: r.body.mass, fat: r.body.fat, skin: L.skin, hair: L.hair, hairStyle: L.hairStyle, hairCap: L.hairCap, braidLen: L.braidLen, braidKind: L.braidKind, ribbon: L.ribbon, freckles: L.freckles || 0,
    eyes: L.eyes, lips: L.lips || null, beard: false, outfit: none ? 'none' : 'offduty', off: O, outfitKey: none ? 'none' : key, dept: O.accent || O.tunic || '#a8282a', bust: r.body.bust };
}
// James as a figure: c.outfit one of his (his first by default) or 'none'; skin, hair, hairStyle, beard, beardCol as chosen.
function squireSpec(c) {
  c = Object.assign({ skin: SQUIRE.look.skin, hair: SQUIRE.look.hair, hairStyle: SQUIRE.look.hairStyle, beard: true, beardCol: SQUIRE.look.beardCol, beardStyle: SQUIRE.look.beardStyle }, c || {});
  const W = SQUIRE.wardrobe, key = W[c.outfit] ? c.outfit : squireOutfits()[0], O = W[key];
  return { sex: 'm', height: SQUIRE.h, mass: SQUIRE.build.mass, fat: SQUIRE.build.fat, skin: c.skin, hair: c.hair, hairStyle: c.hairStyle, eyes: SQUIRE.look.eyes, beard: c.beard !== false, beardCol: c.beardCol, beardStyle: c.beardStyle,
    outfit: c.outfit === 'none' ? 'none' : 'offduty', off: O, outfitKey: c.outfit === 'none' ? 'none' : key, dept: O.accent || O.tunic, bust: 0.45, size: 1, who: 'james' };
}
// How much she squirms under a correction, 0 (stoic) – 1: the smaller she is the more (her height against Fenwick's household's and her
// mass), and the more pain she can take, a little the less. body.wriggle, where given, overrides it.
const H_SPAN = [1.55, 1.75];
function wriggle(id) {
  const r = ROSTER[id]; if (!r) return 0.5; if (r.body.wriggle != null) return r.body.wriggle;
  const hn = Math.max(0, Math.min(1, (r.body.h.f - H_SPAN[0]) / (H_SPAN[1] - H_SPAN[0]))), size = 0.4 * hn + 0.6 * r.body.mass, tol = r.pain.tolerance;
  return Math.max(0.15, Math.min(1, 1.15 - size - 0.5 * (tol - 0.5)));
}
// ── What his steadiness does, over time (docs/lore.md) ──
// After a correction he sees through with care, the aftercare done: her trust in him (comfort) grows, more the more ways he answered her
// (reassured her, said why it mattered, asked how she is); where it's her way (feelings.rate), her feelings for him (desire) grow, more slowly,
// and faster the more she trusts him; and what she took to heart leaves her a little readier to give way (submission). Resentment she
// carries holds it all back. A correction ended by her word, heard and honoured at once, still builds a little trust, but not the rest.
//   Cast.grow(id, rel, result) → { rel, delta }  (rel: submission, desire, comfort, defiance, resentment, 0–1; result: js/session.js's, with
//   approaches: the ways he answered her)
function grow(id, rel, r) {
  const R = ROSTER[id], rate = R && R.feelings ? R.feelings.rate : 0, c01 = x => Math.max(0, Math.min(1, x)), r2 = x => Math.round(x * 1000) / 1000;
  const n = new Set(r.approaches || []).size, care = 0.4 + 0.2 * Math.min(3, n), res = c01(rel.resentment || 0), comfort = c01(rel.comfort || 0), word = r.outcome === 'word';
  const delta = {
    comfort: r2((word ? 0.03 : 0.06 * care) * (1 - 0.6 * res)),
    desire: r2(word ? 0 : 0.045 * rate * care * (0.5 + 0.5 * comfort) * (1 - res)),
    submission: r2(word ? 0 : 0.12 * Math.max(0, r.compliance || 0) * (1 - res)),
  };
  const out = Object.assign({}, rel); for (const k in delta) out[k] = r2(c01((rel[k] || 0) + delta[k]));
  return { rel: out, delta };
}
// Voice pitch for the babble and cries (Hz).
const PITCH = { james: 116, rose: 210, bethan: 200, niamh: 218, saskia: 224 };
const pitch = id => PITCH[id] || 208;

const api = { METERS, REASONS, ROSTER, IDS, SQUIRE, WARDROBE, OUTFIT_NOTES, outfits, squireOutfits, pronouns, figureSpec, squireSpec, pitch, wriggle, grow };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
root.Cast = api;
})(typeof window !== 'undefined' ? window : globalThis);
