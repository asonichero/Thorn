// The cast (js/cast.js): James Edwards (on Fenwick's Silas) and Rose (Fenwick's), grown-ups both, in modern clothes: each outfit one of the patterns js/figure.js
// draws (Meridian's off-duty layers), each a figure the engine can make; and what the correction reads off her.
const test = require('node:test'), assert = require('node:assert/strict');
globalThis.window = globalThis;
const Cast = require('../js/cast.js');
const TOPS = ['henley', 'thermal', 'open', 'waistcoat', 'cardigan', 'tee', 'sweatervest', 'plaid'], LEGS = ['canvas', 'joggers', 'chinos', 'work', 'combat', 'pressed', 'jeans'];
const SHOES = ['boots', 'soft', 'deck', 'work', 'sneakers', 'flats', 'loafers'];

test('Rose and James, adults both: her body, her word and how she takes it, as Fenwick has them; his name and his own look', () => {
  assert.deepEqual(Cast.IDS, ['rose', 'bethan']);
  for (const id of Cast.IDS) { const X = Cast.ROSTER[id]; assert.ok(X.age >= 18, id + ' a grown-up'); assert.ok(X.word && X.pain.tolerance > 0 && X.body.h.f > 1.5, id);
    assert.ok(X.agreed.reasons.every(k => Cast.REASONS[k]) && X.agreed.story && X.feelings.text, id + ': why she asked, and how she feels'); assert.ok(Cast.outfits(id).length >= 3, id + ' outfits'); }
  const B = Cast.ROSTER.bethan; assert.ok(B.age >= 24 && B.age <= 27, 'mid-twenties'); assert.ok(B.agreed.reasons.includes('release')); assert.match(B.agreed.story, /Will/);
  const R = Cast.ROSTER.rose;
  assert.ok(R.age >= 18 && Cast.SQUIRE.age >= 18, 'grown-ups');
  assert.equal(R.word, 'Lantern'); assert.equal(R.body.h.f, 1.65); assert.ok(R.pain.tolerance > 0 && R.pain.resilience > 0);
  assert.equal(R.meters.wilfulness, 0.3); assert.equal(Cast.SQUIRE.h, 1.86); assert.ok(Cast.SQUIRE.look.beard);
  assert.equal(Cast.SQUIRE.name, 'James Edwards'); assert.equal(Cast.SQUIRE.short, 'James'); assert.equal(Cast.SQUIRE.look.hairStyle, 'sweptback');
  const J = Cast.squireSpec(); assert.equal(J.beardCol, Cast.SQUIRE.look.beardCol); assert.notEqual(J.beardCol, J.hair, 'his beard its own colour'); assert.equal(J.off.top, 'tee', 'a T-shirt, most days');
  assert.ok(Cast.wriggle('rose') > 0 && Cast.wriggle('rose') <= 1); assert.ok(Cast.pitch('rose') > Cast.pitch('james'));
});

test('every outfit is modern: a top, legs and shoes js/figure.js draws, a note for the set-up', () => {
  for (const [who, W] of Cast.IDS.map(id => [id, Cast.WARDROBE[id]]).concat([['james', Cast.SQUIRE.wardrobe]])) {
    assert.ok(Object.keys(W).length >= 3, who + ' has outfits');
    for (const k in W) {
      const O = W[k];
      assert.ok(TOPS.includes(O.top), `${who}/${k} top ${O.top}`); assert.ok(LEGS.includes(O.legs), `${who}/${k} legs ${O.legs}`); assert.ok(SHOES.includes(O.shoes), `${who}/${k} shoes ${O.shoes}`);
      assert.ok(['rolled', 'long'].includes(O.sleeves)); for (const c of ['tunic', 'trousers', 'under']) assert.match(O[c], /^#[0-9a-f]{6}$/i, `${who}/${k} ${c}`);
      assert.ok(Cast.OUTFIT_NOTES[k], `${who}/${k} has a note`);
    }
  }
});

test('each outfit as a figure: off duty in her own; nothing on (None); James in his', () => {
  for (const id of Cast.IDS) for (const k of Cast.outfits(id)) { const s = Cast.figureSpec(id, 'f', k); assert.equal(s.sex, 'f'); assert.equal(s.outfit, 'offduty'); assert.equal(s.off, Cast.WARDROBE[id][k]); assert.equal(s.outfitKey, k); }
  assert.equal(Cast.figureSpec('rose').hairStyle, 'braid'); assert.equal(Cast.figureSpec('bethan').hairStyle, 'chignon');
  assert.equal(Cast.figureSpec('rose', 'f', 'none').outfit, 'none');
  assert.equal(Cast.figureSpec('rose').outfitKey, Cast.outfits('rose')[0]);
  for (const k of Cast.squireOutfits()) { const s = Cast.squireSpec({ outfit: k }); assert.equal(s.sex, 'm'); assert.equal(s.outfit, 'offduty'); assert.equal(s.off, Cast.SQUIRE.wardrobe[k]); }
  assert.equal(Cast.squireSpec({ outfit: 'none' }).outfit, 'none'); assert.equal(Cast.squireSpec().outfitKey, 'tee');
});

test('the premise: she asked him, for her own reasons, on terms; his steadiness grows her trust and, as most do, her feelings for him', () => {
  const R = Cast.ROSTER.rose;
  assert.ok(R.agreed.reasons.length && R.agreed.reasons.every(k => Cast.REASONS[k]), 'her reasons are the premise’s: guilt, habits, behaviour');
  assert.ok(R.agreed.story && !/girlfriend/i.test(R.role), 'someone in his life who asked, not cast as his partner from the start');
  assert.ok(R.feelings.rate > 0 && R.feelings.text);
  // (a correction seen through with care, every way of answering her taken: her trust and her feelings for him grow, and more than with none)
  const rel = { submission: 0, desire: 0.1, comfort: 0.2, defiance: 0.3, resentment: 0 }, r = { outcome: 'done', compliance: 0.3 };
  const all = Cast.grow('rose', rel, Object.assign({ approaches: ['reassure', 'explain', 'ask'] }, r)), none = Cast.grow('rose', rel, r);
  assert.ok(all.delta.comfort > none.delta.comfort && all.delta.desire > none.delta.desire && none.delta.desire > 0);
  assert.ok(all.rel.comfort > rel.comfort && all.rel.desire > rel.desire && all.rel.submission > 0); assert.equal(rel.comfort, 0.2, 'the one given is left as it was');
  // (the more she trusts him, the faster her feelings; resentment holds it back; her word builds trust only)
  assert.ok(Cast.grow('rose', Object.assign({}, rel, { comfort: 0.9 }), r).delta.desire > none.delta.desire);
  assert.ok(Cast.grow('rose', Object.assign({}, rel, { resentment: 0.8 }), r).delta.desire < none.delta.desire);
  const w = Cast.grow('rose', rel, { outcome: 'word', compliance: 0.2 }); assert.ok(w.delta.comfort > 0); assert.equal(w.delta.desire, 0); assert.equal(w.delta.submission, 0);
  // (over many, it settles toward the top, never past it)
  let x = rel; for (let i = 0; i < 60; i++) x = Cast.grow('rose', x, Object.assign({ approaches: ['reassure', 'ask'] }, r)).rel;
  assert.ok(x.desire > 0.8 && x.desire <= 1 && x.comfort <= 1);
});
