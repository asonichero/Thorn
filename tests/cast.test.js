// The cast (js/cast.js): Silas and Rose as Fenwick Hall has them, grown-ups both, in modern clothes: each outfit one of the patterns js/figure.js
// draws (Meridian's off-duty layers), each a figure the engine can make; and what the correction reads off her.
const test = require('node:test'), assert = require('node:assert/strict');
globalThis.window = globalThis;
const Cast = require('../js/cast.js');
const TOPS = ['henley', 'thermal', 'open', 'waistcoat', 'cardigan', 'tee', 'sweatervest', 'plaid'], LEGS = ['canvas', 'joggers', 'chinos', 'work', 'combat', 'pressed', 'jeans'];
const SHOES = ['boots', 'soft', 'deck', 'work', 'sneakers', 'flats', 'loafers'];

test('Rose and Silas, adults both, as Fenwick has them: her body, her word, how she takes it', () => {
  assert.deepEqual(Cast.IDS, ['rose']);
  const R = Cast.ROSTER.rose;
  assert.ok(R.age >= 18 && Cast.SQUIRE.age >= 18, 'grown-ups');
  assert.equal(R.word, 'Lantern'); assert.equal(R.body.h.f, 1.65); assert.ok(R.pain.tolerance > 0 && R.pain.resilience > 0);
  assert.equal(R.meters.wilfulness, 0.3); assert.equal(Cast.SQUIRE.h, 1.86); assert.ok(Cast.SQUIRE.look.beard);
  assert.ok(Cast.wriggle('rose') > 0 && Cast.wriggle('rose') <= 1); assert.ok(Cast.pitch('rose') > Cast.pitch('silas'));
});

test('every outfit is modern: a top, legs and shoes js/figure.js draws, a note for the set-up', () => {
  for (const [who, W] of [['rose', Cast.WARDROBE.rose], ['silas', Cast.SQUIRE.wardrobe]]) {
    assert.ok(Object.keys(W).length >= 3, who + ' has outfits');
    for (const k in W) {
      const O = W[k];
      assert.ok(TOPS.includes(O.top), `${who}/${k} top ${O.top}`); assert.ok(LEGS.includes(O.legs), `${who}/${k} legs ${O.legs}`); assert.ok(SHOES.includes(O.shoes), `${who}/${k} shoes ${O.shoes}`);
      assert.ok(['rolled', 'long'].includes(O.sleeves)); for (const c of ['tunic', 'trousers', 'under']) assert.match(O[c], /^#[0-9a-f]{6}$/i, `${who}/${k} ${c}`);
      assert.ok(Cast.OUTFIT_NOTES[k], `${who}/${k} has a note`);
    }
  }
});

test('each outfit as a figure: off duty in her own; nothing on (None); Silas in his', () => {
  for (const k of Cast.outfits('rose')) { const s = Cast.figureSpec('rose', 'f', k); assert.equal(s.sex, 'f'); assert.equal(s.outfit, 'offduty'); assert.equal(s.off, Cast.WARDROBE.rose[k]); assert.equal(s.outfitKey, k); assert.equal(s.hairStyle, 'braid'); }
  assert.equal(Cast.figureSpec('rose', 'f', 'none').outfit, 'none');
  assert.equal(Cast.figureSpec('rose').outfitKey, Cast.outfits('rose')[0]);
  for (const k of Cast.squireOutfits()) { const s = Cast.squireSpec({ outfit: k }); assert.equal(s.sex, 'm'); assert.equal(s.outfit, 'offduty'); assert.equal(s.off, Cast.SQUIRE.wardrobe[k]); }
  assert.equal(Cast.squireSpec({ outfit: 'none' }).outfit, 'none'); assert.equal(Cast.squireSpec().outfitKey, 'henley');
});
