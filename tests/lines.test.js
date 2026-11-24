// What's said (js/lines.js): Rose's lines for everything the correction asks of her, Silas's for every position the living room offers and
// every implement, the aftercare's choices each answered, and her terms ending in her word.
const test = require('node:test'), assert = require('node:assert/strict');
globalThis.window = globalThis;
require('../js/cast.js'); const Lines = require('../js/lines.js');

test('Rose has a line for every moment the correction asks one of her, and for each implement as it’s taken up', () => {
  for (const k of ['start', 'first', 'flinching', 'struggling', 'edge', 'past', 'plead', 'spent', 'accept', 'flushed', 'soothe', 'defy', 'yield', 'word', 'end', 'hairbrush', 'paddle', 'belt'])
    assert.ok(Lines.react('rose', k), k);
  assert.match(Lines.react('rose', 'word'), /Lantern/);
  assert.equal(Lines.react('rose', 'nothing'), null);
});

test('Silas places her in every position the room offers, puts her back, and takes up each implement', () => {
  for (const p of ['otk', 'table', 'worktop']) assert.match(Lines.place('rose', p), /\w/, p);
  for (const k of ['hands', 'pin', 'take', 'down', 'worktop', 'table', 'hairbrush', 'paddle', 'belt', 'hand']) assert.ok(Lines.captain(k, 'rose'), k);
  assert.ok(!/\{name\}|\{word\}/.test(Lines.place('rose', 'otk') + Lines.captain('hands', 'rose')), 'filled in');
});

test('the aftercare: her opening by how it ended, three ways to answer her, then what she’s to do, each with her reply', () => {
  for (const [outcome, mood] of [['done', null], ['word', null], ['done', 'unbroken']]) {
    const steps = Lines.after('rose', outcome, mood);
    assert.equal(steps[0].who, 'subject'); assert.ok(steps[1].explore); assert.equal(steps[1].choose.filter(c => !c.end).length, 3);
    for (const c of steps[1].choose.filter(c => !c.end)) assert.equal(c.then.length, 2);
    assert.equal(steps[2].choose.length, Lines.ORDERS.length);
    for (const o of steps[2].choose) { assert.equal(o.then.length, 2); assert.ok(o.then[1].text && o.then[1].text !== 'undefined', o.label); }
    assert.equal(steps[3].who, 'subject');
  }
});

test('her terms: his, her question, her agreement, and her word', () => {
  const steps = Lines.terms('rose'), last = steps[steps.length - 1];
  assert.ok(steps.length >= 6); assert.equal(last.who, 'captain'); assert.match(last.text, /Lantern/);
  assert.ok(steps.some(s => s.who === 'subject' && /Lantern/.test(s.text)), 'she gives it');
});
