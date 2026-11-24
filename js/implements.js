// Thorn — the implements: a wooden hairbrush, a long thick paddle and a folded belt. Each built in the frame of the right hand that holds it
// (js/figure.js: a bone's rest frame is the world's; the hand's fingers run down its −y and, posed by Poses.reach, its palm faces +x), at its
// true size in metres. Held as a bat is: the handle in the closed fist, across the palm, and the head carrying on past the fingers, its
// striking face turned the way the palm faces, so the swing that lands the palm on her lands the face of it instead (js/session.js).
//
//   Implements.make(kind) → THREE.Group, userData { kind, reach, face } · Implements.SPEC[kind]: { label, reach: how far past the wrist, down
//   the fingers, the middle of its striking face is; face: how far out the palm's way that face is; where: the correction's positions it's
//   used in (null: all); span: long enough to land across both sides at once } · Implements.KINDS (the hand first: no implement)
(function (root) {
'use strict';
const THREE = root.THREE;
const SPEC = {
  hand: { label: 'Hand', reach: 0, face: 0, where: null },
  hairbrush: { label: 'Hairbrush', reach: 0.192, face: 0.036, where: null },
  paddle: { label: 'Paddle', reach: 0.37, face: 0.037, where: ['table'], span: true },
  belt: { label: 'Belt', reach: 0.29, face: 0.03, where: ['table'], span: true },
};
const KINDS = Object.keys(SPEC);
const AT_X = 0.024;      // (the handle's axis, out from the hand's: in the closed fist, against the palm)

// (a painted wood: Figure's grain where it's there, else plain)
const MATS = {};
function mat(key, o) {
  if (MATS[key]) return MATS[key];
  const { grain, color } = o, p = Object.assign({ roughness: 0.5, metalness: 0.0 }, o); delete p.grain; delete p.color;
  let m = new THREE.MeshStandardMaterial(p); if (color) m.color = srgb(color);
  if (root.Figure && root.Figure.paint && grain) m = root.Figure.paint(m, { grain, scale: 40 });
  return (MATS[key] = m);
}
function srgb(hex) { const c = new THREE.Color(hex); return c.convertSRGBToLinear ? c.convertSRGBToLinear() : c; }
const shadow = m => { m.castShadow = true; m.receiveShadow = true; return m; };
// (a slab whose outline is an ellipse (or a rounded rectangle), lying in the hand's y–z plane, `t` thick along x; its middle at (x, y))
function ellipseSlab(ry, rz, t, x, y, m) {
  const g = new THREE.CylinderGeometry(1, 1, 1, 40); g.rotateZ(Math.PI / 2);
  const s = shadow(new THREE.Mesh(g, m)); s.scale.set(t, ry, rz); s.position.set(x, y, 0); return s;
}
function roundSlab(ly, lz, t, r, x, y, m) {
  const sh = new THREE.Shape(), hy = ly / 2, hz = lz / 2;
  sh.moveTo(-hz + r, -hy); sh.lineTo(hz - r, -hy); sh.quadraticCurveTo(hz, -hy, hz, -hy + r); sh.lineTo(hz, hy - r); sh.quadraticCurveTo(hz, hy, hz - r, hy);
  sh.lineTo(-hz + r, hy); sh.quadraticCurveTo(-hz, hy, -hz, hy - r); sh.lineTo(-hz, -hy + r); sh.quadraticCurveTo(-hz, -hy, -hz + r, -hy);
  const g = new THREE.ExtrudeGeometry(sh, { depth: t - 0.004, bevelEnabled: true, bevelThickness: 0.002, bevelSize: 0.002, bevelSegments: 2, curveSegments: 6 });
  g.translate(0, 0, -(t - 0.004) / 2); g.rotateY(Math.PI / 2);      // (its outline in y–z, its thickness along x)
  const s = shadow(new THREE.Mesh(g, m)); s.position.set(x, y, 0); return s;
}
// (a handle: round-ish, `rx` × `rz`, from y0 down to y1)
function handle(rx, rz, y0, y1, m) {
  const g = new THREE.CylinderGeometry(1, 1, 1, 20); const h = shadow(new THREE.Mesh(g, m)); h.scale.set(rx, y0 - y1, rz); h.position.set(AT_X, (y0 + y1) / 2, 0); return h;
}

function make(kind) {
  const S = SPEC[kind], G = new THREE.Group(); G.name = 'implement:' + kind; G.userData = { kind, reach: S ? S.reach : 0, face: S ? S.face : 0 };
  if (kind === 'hairbrush') {
    // A wooden paddle brush: beech, an oval head on a waisted handle, its back plain and flat (the side that lands), black bristles in a
    // cushion on the other
    const wood = mat('beech', { color: '#b8854e', roughness: 0.42, grain: 0.05 }), pad = mat('pad', { color: '#1c1a1a', roughness: 0.8 }), br = mat('bristle', { color: '#2a2626', roughness: 0.6 });
    G.add(handle(0.009, 0.0125, 0.012, -0.118, wood));
    G.add(ellipseSlab(0.012, 0.016, 0.017, AT_X, -0.124, wood));      // (the neck, where it widens)
    G.add(ellipseSlab(0.066, 0.045, 0.022, AT_X, -0.192, wood));
    G.add(ellipseSlab(0.058, 0.038, 0.006, AT_X - 0.013, -0.192, pad));
    const pts = []; for (let y = -0.05; y <= 0.05; y += 0.0095) for (let z = -0.033; z <= 0.033; z += 0.0095) if ((y / 0.053) ** 2 + (z / 0.034) ** 2 < 1) pts.push([y, z]);
    const bg = new THREE.CylinderGeometry(0.0011, 0.0011, 0.015, 5); bg.rotateZ(Math.PI / 2);
    const bm = new THREE.InstancedMesh(bg, br, pts.length), M = new THREE.Matrix4();
    pts.forEach(([y, z], i) => { M.makeTranslation(AT_X - 0.023, -0.192 + y, z); bm.setMatrixAt(i, M); }); bm.castShadow = true; G.add(bm);
  } else if (kind === 'paddle') {
    // A long, thick paddle: oak, a blade 40 cm by 11, two centimetres and more thick, its corners rounded; a turned handle, wrapped dark where
    // it's held
    const oak = mat('oak', { color: '#8a5a32', roughness: 0.45, grain: 0.07 }), grip = mat('grip', { color: '#2a1e16', roughness: 0.7 });
    G.add(handle(0.0135, 0.0165, 0.025, -0.1, grip));
    G.add(handle(0.012, 0.016, -0.1, -0.165, oak));
    G.add(roundSlab(0.4, 0.11, 0.026, 0.03, AT_X, -0.37, oak));
    G.add(roundSlab(0.05, 0.05, 0.027, 0.02, AT_X, -0.17, oak));      // (the shoulder, where the blade meets the handle)
  } else if (kind === 'belt') {
    // A brown leather belt, folded in two: the buckle and the tip together in the fist, the loop of the fold hanging on; the doubled strap
    // a little apart, flat, its stitched edges
    const lea = mat('leather', { color: '#5a3420', roughness: 0.55, grain: 0.04 }), metal = mat('buckle', { color: '#b8a888', roughness: 0.3, metalness: 0.8 });
    const L = 0.43, W = 0.036, T = 0.0045, Y0 = 0.015, YC = -SPEC.belt.reach, N = 26;
    // (the strap's line: straight from the fist, then, where it lands, curving in a little either side of the middle, as it lies round her)
    const bow = y => 2.0 * Math.max(0, Math.min(Math.abs(y - YC), 0.17) - 0.06) ** 2;
    for (const dx of [-0.0035, 0.0035]) for (let i = 0; i < N; i++) {
      const ya = Y0 - L * i / N, yb = Y0 - L * (i + 1) / N, xa = AT_X + dx + bow(ya), xb = AT_X + dx + bow(yb), len = Math.hypot(ya - yb, xa - xb);
      const s = shadow(new THREE.Mesh(new THREE.BoxGeometry(T, len * 1.04, W), lea)); s.position.set((xa + xb) / 2, (ya + yb) / 2, 0); s.rotation.z = Math.atan2(xb - xa, ya - yb); G.add(s);
    }
    const yF = Y0 - L, fold = shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, W, 12, 1, true, 0, Math.PI), lea)); fold.rotation.x = Math.PI / 2; fold.rotation.y = Math.PI / 2; fold.position.set(AT_X + bow(yF), yF, 0); G.add(fold);
    const bk = shadow(new THREE.Mesh(new THREE.TorusGeometry(0.024, 0.0028, 6, 4), metal)); bk.rotation.y = Math.PI / 2; bk.rotation.x = Math.PI / 4; bk.scale.set(1, 1, 0.9); bk.position.set(AT_X + 0.006 + bow(0.03), 0.03, 0); G.add(bk);
  }
  return G;
}

const api = { SPEC, KINDS, make };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
root.Implements = api;
})(typeof window !== 'undefined' ? window : globalThis);
