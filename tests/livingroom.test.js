// The living room (js/livingroom.js, Fenwick's open-plan flat, with Thorn's dining table and chair): every piece in its layout named and built;
// as laid out, each inside the walls, clear of the kitchen's units and of the doorway and its open door; a piece moved goes where it's put; and
// the room as a correction's: each position's place on the open floor, its furniture there, the coffee table moved for the sofa and back.
const test = require('node:test'), assert = require('node:assert/strict');
globalThis.window = globalThis;
const ctx = new Proxy({}, { get: (t, k) => (k === 'createRadialGradient' || k === 'createLinearGradient' ? () => ({ addColorStop() {} }) : () => {}), set: () => true });
globalThis.document = { createElement: () => ({ width: 0, height: 0, getContext: () => ctx }) };
globalThis.THREE = require('../vendor/three.min.js');
require('../js/figure.js'); require('../js/kit.js'); require('../js/livingroom.js');
const { LivingRoom } = window, build = () => LivingRoom.build(new THREE.Scene());
// (boxes measured from the vertices themselves, as placed: three's own boxes a rotated, squashed sphere generously)
const vbox = o => { const b = new THREE.Box3(), v = new THREE.Vector3(); o.updateMatrixWorld(true);
  o.traverse(m => { if (!m.isMesh) return; const p = m.geometry.attributes.position; for (let i = 0; i < p.count; i++) b.expandByPoint(v.fromBufferAttribute(p, i).applyMatrix4(m.matrixWorld)); }); return b; };
const footprint = (lr, k) => { const b = vbox(lr.pieces[k].g); return { x0: b.min.x, x1: b.max.x, z0: b.min.z, z1: b.max.z, y1: b.max.y }; };
const meets = (a, b) => a.x0 < b.x1 && a.x1 > b.x0 && a.z0 < b.z1 && a.z1 > b.z0;

test('every piece in the layout named and built; the editor’s list is the layout’s', () => {
  const lr = build();
  assert.deepEqual(Object.keys(LivingRoom.LAYOUT).sort(), Object.keys(LivingRoom.LABELS).sort());
  assert.deepEqual(lr.keys, Object.keys(LivingRoom.LAYOUT));
  for (const k of lr.keys) { assert.ok(lr.pieces[k].label, k); assert.ok(lr.pieces[k].g.children.length, k + ' has something in it'); }
  for (const k of ['sofa', 'armchair', 'desk', 'deskChair', 'tvStand', 'drawers', 'shelves', 'coffeeTable', 'rug', 'table', 'chair']) assert.ok(lr.keys.includes(k), k);
});

test('as laid out: each piece inside the walls, clear of the kitchen’s units, the doorway and its open door', () => {
  const lr = build(), B = lr.bounds, tol = 0.02;
  const kitchen = [{ x0: B.maxX - 0.62, x1: B.maxX, z0: 2.0, z1: B.maxZ }, { x0: -1.37, x1: B.maxX, z0: B.maxZ - 0.62, z1: B.maxZ }];
  const door = { x0: B.minX, x1: B.minX + 0.9, z0: 0.42, z1: 1.36 };
  for (const k of lr.keys) {
    const f = footprint(lr, k);
    assert.ok(f.x0 >= B.minX - tol && f.x1 <= B.maxX + tol && f.z0 >= B.minZ - tol && f.z1 <= B.maxZ + tol, k + ' inside the walls: ' + JSON.stringify(f));
    for (const u of kitchen) assert.ok(!meets(f, u), k + ' clear of the kitchen');
    assert.ok(!meets(f, door), k + ' clear of the door');
    assert.ok(f.y1 < B.ht, k + ' under the ceiling');
  }
});

test('what stands together stays apart: the seats, the tables, the lamps and the cabinets don’t run into one another', () => {
  const lr = build(), solid = lr.keys.filter(k => k !== 'rug');
  // (each piece as the boxes of its parts, so an L-shaped sofa doesn't claim the corner its table stands in)
  const parts = k => { const out = []; lr.pieces[k].g.updateMatrixWorld(true); lr.pieces[k].g.traverse(o => { if (o.isMesh) out.push(vbox(o).expandByScalar(-0.003)); }); return out; };
  const allowed = new Set(['sofa|lampCorner', 'desk|amp']);      // (the lamp stands in the corner behind the sofa; the amp under the desk, as in the photographs)
  const P = {}; for (const k of solid) P[k] = parts(k);
  for (let i = 0; i < solid.length; i++) for (let j = i + 1; j < solid.length; j++) {
    const a = solid[i], b = solid[j]; if (allowed.has(a + '|' + b) || allowed.has(b + '|' + a)) continue;
    const hit = P[a].some(x => P[b].some(y => x.intersectsBox(y)));
    assert.ok(!hit, a + ' and ' + b + ' run into each other');
  }
});

test('a piece moved goes where it’s put; the views include the editor’s default', () => {
  const lr = build();
  lr.place('armchair', { x: 0.5, z: 0.4, ry: 0 }); lr.resides();
  const g = lr.pieces.armchair.g; assert.equal(g.position.x, 0.5); assert.equal(g.position.z, 0.4); assert.equal(lr.layout().armchair.x, 0.5);
  assert.ok(lr.views.Corner, 'Corner'); for (const k in lr.views) { assert.equal(lr.views[k].length, 2); assert.equal(lr.views[k][0].length, 3); }
  assert.ok(lr.sidesAt(new THREE.Vector3(0, 1.5, lr.bounds.maxZ - 0.1)).has('S'), 'by the kitchen, its wall out of the way');
});

test('the room as a correction’s: every position the page offers is the session’s, each with its place, and the aftercare on the sofa', () => {
  const lr = build(), bay = lr.bay(), S = bay.spots;
  assert.deepEqual(LivingRoom.POSITIONS.map(p => p[0]), ['otk', 'otk:sofa', 'table', 'wall']);
  assert.ok(S.bench && S.seats.sofa && S.wall && S.table && S.after, 'a seat, the sofa, the worktop, the table, the aftercare');
  assert.ok(bay.private && Array.isArray(S.watch) && !S.watch.length, 'private: nobody watches');
  // (the chair's seat where the chair is; the table's end, where she stands, in front of it; the worktop's edge the kitchen's)
  const ch = lr.pieces.chair.g.position; assert.ok(S.bench.at.distanceTo(new THREE.Vector3(ch.x, 0, ch.z)) < 0.01, 'across the knee: on the chair');
  const tb = footprint(lr, 'table'), at = S.table.at; assert.ok(at.x > tb.x0 && at.x < tb.x1 && Math.abs(tb.z0 - at.z - S.table.d) < 0.02, 'at the table’s end, facing it');
  assert.ok(Math.abs(S.wall.at.x + S.wall.support.d - (lr.bounds.maxX - 0.6)) < 0.01 && S.wall.support.y > 0.9, 'her hands on the worktop’s front edge');
  // (where she stands and where he sits are clear: no piece of furniture there but the one in use)
  for (const [nm, p, own] of [['the chair', S.bench.at, 'chair'], ['the table’s end', S.table.at, 'table'], ['the worktop', S.wall.at, null]]) {
    for (const k of lr.keys) { if (k === own || k === 'rug') continue; const f = footprint(lr, k); assert.ok(!(p.x > f.x0 - 0.15 && p.x < f.x1 + 0.15 && p.z > f.z0 - 0.15 && p.z < f.z1 + 0.15), nm + ' clear of ' + k); }
  }
  assert.ok(S.after.at.distanceTo(S.after.beside) > 0.5 && S.after.seatY > 0.4, 'side by side on the sofa');
});

test('across the knee on the sofa, the coffee table goes back out of the way, and comes back for the rest', () => {
  const lr = build(), bay = lr.bay(), was = Object.assign({}, lr.layout().coffeeTable), S = bay.spots.seats.sofa;
  bay.clear('otk:sofa'); const f = footprint(lr, 'coffeeTable');
  assert.ok(f.x0 > S.at.x + 0.9 || f.z1 < S.at.z - 0.9 || f.z0 > S.at.z + 0.9, 'clear of her in front of the sofa: ' + JSON.stringify(f));
  bay.clear('table'); assert.deepEqual(lr.layout().coffeeTable, was);
});
