// A whole correction, headless (js/session.js in the living room, js/livingroom.js, on the Blender-built figures): Rose in modern clothes, in
// each position the room offers, placed, corrected and ended (soothed, dressed, done), then the aftercare on the sofa; her word when it goes
// too far, and nothing after it; the implements: offered where they're for, each one's face landing where the palm would, and what each does.
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
globalThis.window = globalThis;
const ctx = new Proxy({}, { get: (t, k) => (k === 'createRadialGradient' || k === 'createLinearGradient' ? () => ({ addColorStop() {} }) : () => {}), set: () => true });
globalThis.document = { createElement: () => ({ width: 0, height: 0, getContext: () => ctx }) };
globalThis.THREE = require('../vendor/three.min.js');
require('../vendor/GLTFLoader.js');
for (const m of ['pain', 'cast', 'lines', 'figure', 'poses', 'kit', 'livingroom', 'implements', 'session']) require('../js/' + m + '.js');
const { Figure, Session, LivingRoom, Implements, Cast } = window, V3 = THREE.Vector3;
const MODELS = path.join(__dirname, '..', 'models'), buf = f => { const b = fs.readFileSync(path.join(MODELS, f)); return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength); };
const meta = JSON.parse(fs.readFileSync(path.join(MODELS, 'thorn_meta.json')));
const loaded = Promise.all([Figure.adopt(meta, 'f', buf('thorn_f.glb')), Figure.adopt(meta, 'm', buf('thorn_m.glb')), Figure.adoptHair(buf('thorn_hair.glb'))]);

// (a stage that draws nothing: the session only needs its scene and camera)
function setup(position, o, who, outfit) {
  const scene = new THREE.Scene(), stage = { scene, camera: new THREE.PerspectiveCamera(), go() {}, fade: fn => fn() };
  const lr = LivingRoom.build(scene), bay = lr.bay(); bay.clear(position);
  const ses = Session.create(stage, bay, Object.assign({ captain: { outfit: 'tee' }, position, between: 'aside', queue: [{ id: who || 'rose', sex: 'f', outfit: outfit || 'jeans' }], witnesses: [], sound: false }, o || {}));
  const ev = []; ses.on((t, d) => ev.push([t, d]));
  ses.start(); return { ses, ev, lr, step: n => { for (let i = 0; i < n; i++) ses.update(0.05); } };
}
const wait = ms => new Promise(r => setTimeout(r, ms));

test('the models: hers rebuilt in modern layers (a shirt or long-sleeved top, up or raised; trousers; briefs; shoes), his as Fenwick’s', async () => {
  await loaded;
  const f = Figure.make(Cast.figureSpec('rose', 'f', 'jeans'));
  assert.ok(f.model, 'built from the model'); assert.deepEqual(f.layers, ['top', 'bottoms', 'under']);
  for (const k of ['Shirt', 'ShirtUp', 'Tunic', 'TunicUp', 'Trousers', 'TrousersDown', 'Briefs', 'BriefsDown', 'Boots']) assert.ok(f.model.mesh[k], k);
  f.setClothes({ top: 'up', bottoms: 'down', under: 'down' }); assert.ok(f.clothes.top.visible && f.clothes.bottoms.visible && f.clothes.under.visible);
  assert.equal(f.clothes.top, f.gm.ShirtUp); assert.equal(f.clothes.bottoms, f.gm.TrousersDown); assert.equal(f.clothes.under, f.gm.BriefsDown);
  // (her cardigan's long-sleeved; the jeans and the check shirt are drawn as such)
  const c = Figure.make(Cast.figureSpec('rose', 'f', 'cardigan')); assert.ok(c.gm.Tunic && c.gm.Tunic.visible);
  assert.equal(f.gm.Trousers.material.userData.u.uL0.value.z, 6, 'jeans');
  const s = Figure.make(Cast.squireSpec({ outfit: 'flannel' })); assert.equal(s.gm.Shirt.material.userData.u.uL0.value.x, 8, 'a check shirt');
});

for (const [position, name] of LivingRoom.POSITIONS) {
  test(`a whole correction, ${name.toLowerCase()}: placed, run till she’s receptive, ended (soothed, dressed), then the aftercare on the sofa`, async () => {
    await loaded;
    const { ses, ev, step } = setup(position, { implement: position === 'table' ? 'paddle' : 'hairbrush' });
    step(10); assert.equal(ses.st.phase, 'turn'); assert.equal(ses.current.id, 'rose');
    // (she's where the position puts her: her hips over his lap, at the table, at the worktop)
    const hips = ses.current.f.bone.hips.getWorldPosition(new V3()), cap = ses.captain.bone.hips.getWorldPosition(new V3());
    assert.ok(hips.distanceTo(cap) < 1.0, 'beside him'); assert.ok(hips.y > 0.5 && hips.y < 1.1, 'her hips up, as across or over something');
    ses.dress({ top: 'up', bottoms: 'down' }); step(120); assert.equal(ses.current.f.state.bottoms, 'down');
    ses.set({ pace: 2, strength: 1.25 });
    for (let i = 0; i < 120 && !(ses.receptive && ses.distress() > 1); i++) { if (ses.covering) ses.tell(); if (!ses.st.running && !ses.busy) ses.run(true); step(10); }
    assert.ok(ses.receptive, 'her defiance gone'); assert.ok(ses.distress() > 1, 'past the edge'); assert.ok(!ses.st.word);
    ses.run(false); step(5); ses.endTurn(); step(200); await wait(1000); step(2);      // (on to the next, or done, a moment after)
    const end = ev.find(e => e[0] === 'turnEnd'), done = ev.find(e => e[0] === 'done');
    assert.ok(end && done, 'it ended, and she’s done');
    const r = end[1]; assert.equal(r.outcome, 'done'); assert.ok(r.hits > 10); assert.ok(r.defiance.to < r.defiance.from); assert.deepEqual(r.implements, [position === 'table' ? 'paddle' : 'hairbrush']);
    assert.deepEqual(ses.current.f.state, { top: 'down', bottoms: 'up', under: 'up' }, 'dressed again');
    ses.aftercare('rose'); step(5); assert.equal(ses.st.phase, 'after');
    assert.ok(!ses.held || !ses.held.visible, 'the implement put down');
    await wait(1700);      // (her last line, said after a moment)
  });
}

test('her word, when it goes too far: it stops at once, ends as hers, and straight to the aftercare', async () => {
  await loaded;
  const { ses, ev, step } = setup('table', { implement: 'paddle' });
  ses.dress({ top: 'up', bottoms: 'down', under: 'down' }); step(160); ses.set({ pace: 2, strength: 1.5 });
  for (let i = 0; i < 1500 && !ses.st.word; i++) { if (ses.covering) ses.tell(); if (!ses.st.running && !ses.busy) ses.run(true); step(10); }
  assert.ok(ses.st.word, 'she said it'); const w = ev.find(e => e[0] === 'word'); assert.equal(w[1].word, 'Lantern');
  assert.ok(!ses.st.running); const hits = ses.current.hits; step(20); assert.equal(ses.current.hits, hits, 'nothing more lands');
  await wait(1100); step(2);
  const end = ev.find(e => e[0] === 'turnEnd'); assert.equal(end[1].outcome, 'word'); assert.ok(ev.some(e => e[0] === 'aftercareNow'));
  assert.ok(end[1].resentment > 0, 'taken past what she could bear: resented');
  await wait(1700);
});

test('the implements: the hand and the hairbrush anywhere, the paddle and the belt over the table only; moved off it, back to the hand', async () => {
  await loaded;
  const { ses } = setup('otk');
  assert.deepEqual(ses.implements(), ['hand', 'hairbrush']);
  assert.equal(ses.implement('paddle'), false); assert.equal(ses.st.implement, 'hand');
  assert.ok(ses.implement('hairbrush')); assert.equal(ses.st.implement, 'hairbrush');
  ses.position('table'); assert.deepEqual(ses.implements(), ['hand', 'hairbrush', 'paddle', 'belt']);
  ses.set({ implement: 'belt' }); assert.equal(ses.st.implement, 'belt');
  ses.position('otk:sofa'); assert.equal(ses.st.implement, 'hand', 'the belt’s only for over the table');
  for (const k of Implements.KINDS) assert.ok(Implements.SPEC[k].label, k);
  await wait(1700);
});

test('each implement’s striking face lands where the smack goes: the hairbrush on the spot, the paddle and the belt across both sides', async () => {
  await loaded;
  for (const [position, k] of [['otk', 'hairbrush'], ['otk:sofa', 'hairbrush'], ['wall', 'hairbrush'], ['table', 'hairbrush'], ['table', 'paddle'], ['table', 'belt']]) {
    const { ses, step } = setup(position, { implement: k });
    ses.current.f.setClothes({ top: 'up', bottoms: 'down', under: 'down' }); ses.st.holdHand = 'on'; step(20);      // (bare: the face on her skin)
    const G = ses.held; assert.ok(G && G.visible, `${k} in his hand`); G.updateMatrixWorld(true);
    const I = Implements.SPEC[k], face = new V3(0.024 + 0.012, -I.reach, 0).applyMatrix4(G.matrixWorld), P = ses.current.f;
    const sp = s => { const o = { p: new V3(), n: new V3() }; P.surface(ses.st.area + s, o, 0.004); return o.p; };
    const side = ses.st.nextSide, at = I.span ? sp('L').add(sp('R')).multiplyScalar(0.5) : sp(side);
    assert.ok(face.distanceTo(at) < (I.span ? 0.035 : 0.02), `${k}, ${position}: ${face.distanceTo(at).toFixed(3)} m off`);
    await wait(1700);
  }
});

test('what each leaves: the hairbrush concentrated, the paddle and the belt across both sides', async () => {
  await loaded;
  const marks = k => {
    const { ses, step } = setup('table', { implement: k });
    ses.dress({ top: 'up', bottoms: 'down', under: 'down' }); step(160); ses.set({ side: 'R' }); ses.run(true);
    for (let i = 0; i < 40 && ses.current.hits < 6; i++) step(5);
    ses.run(false); const s = ses.current.f.spot; return { R: s.sitspotR.mark, L: s.sitspotL.mark, hits: ses.current.hits };
  };
  const brush = marks('hairbrush'), paddle = marks('paddle'), belt = marks('belt');
  assert.ok(brush.R > 0.1 && brush.L < 0.01, 'the brush on one side only: ' + JSON.stringify(brush));
  assert.ok(paddle.L > 0.5 * paddle.R && belt.L > 0.7 * belt.R, 'the paddle and the belt across both: ' + JSON.stringify({ paddle, belt }));
  await wait(1700);
});

test('Bethan, in her office clothes: placed across his knee, run till she gives in and is receptive, ended, the aftercare', async () => {
  await loaded;
  const { ses, ev, step } = setup('otk', { implement: 'hairbrush' }, 'bethan', 'office');
  step(10); assert.equal(ses.current.id, 'bethan'); assert.ok(ses.current.f.gm.Tunic.visible, 'her cardigan, long-sleeved');
  ses.dress({ top: 'up', bottoms: 'down' }); step(120); ses.set({ pace: 2, strength: 1.25 });
  for (let i = 0; i < 150 && !(ses.receptive && ses.distress() > 1); i++) { if (ses.covering) ses.tell(); if (!ses.st.running && !ses.busy) ses.run(true); step(10); }
  assert.ok(ses.receptive && ses.distress() > 1 && !ses.st.word);
  assert.ok(ev.some(e => e[0] === 'say' && e[1].id === 'bethan'), 'in her own words');
  ses.run(false); step(5); ses.endTurn(); step(200); await wait(1000); step(2);
  const end = ev.find(e => e[0] === 'turnEnd'); assert.equal(end[1].outcome, 'done'); assert.equal(end[1].id, 'bethan');
  ses.aftercare('bethan'); step(5); assert.equal(ses.st.phase, 'after');
  await wait(1700);
});
