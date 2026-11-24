// What's said (js/lines.js): Rose's lines for everything the correction asks of her, James's for every position the living room offers and
// every implement, the aftercare's choices each answered, and her terms ending in her word.
const test = require('node:test'), assert = require('node:assert/strict');
globalThis.window = globalThis;
require('../js/cast.js'); const Lines = require('../js/lines.js');

test('each of them has a line for every moment the correction asks one of her, and for each implement as it’s taken up', () => {
  for (const id of window.Cast.IDS) {
    for (const k of ['start', 'first', 'flinching', 'struggling', 'edge', 'past', 'plead', 'spent', 'accept', 'flushed', 'soothe', 'defy', 'yield', 'word', 'end', 'hairbrush', 'paddle', 'belt'])
      assert.ok(Lines.react(id, k), id + ' ' + k);
    assert.ok(Lines.react(id, 'word').includes(window.Cast.ROSTER[id].word), id + '’s word');
  }
  assert.match(Lines.react('rose', 'word'), /Lantern/); assert.match(Lines.react('bethan', 'word'), /Bluebell/);
  assert.equal(Lines.react('rose', 'nothing'), null);
});

test('James places her in every position the room offers, puts her back, and takes up each implement', () => {
  for (const p of ['otk', 'table', 'worktop']) assert.match(Lines.place('rose', p), /\w/, p);
  for (const k of ['hands', 'pin', 'take', 'down', 'worktop', 'table', 'hairbrush', 'paddle', 'belt', 'hand']) assert.ok(Lines.captain(k, 'rose'), k);
  assert.ok(!/\{name\}|\{word\}/.test(Lines.place('rose', 'otk') + Lines.captain('hands', 'rose')), 'filled in');
});

test('the aftercare: her opening by how it ended, three ways to answer her, then what she’s to do, each with her reply', () => {
  for (const id of window.Cast.IDS) for (const [outcome, mood] of [['done', null], ['word', null], ['done', 'unbroken'], ['done', 'fond']]) {
    const steps = Lines.after(id, outcome, mood);
    assert.equal(steps[0].who, 'subject'); assert.ok(steps[1].explore); assert.equal(steps[1].choose.filter(c => !c.end).length, 3);
    for (const c of steps[1].choose.filter(c => !c.end)) assert.equal(c.then.length, 2);
    assert.equal(steps[2].choose.length, Lines.ORDERS.length);
    for (const o of steps[2].choose) { assert.equal(o.then.length, 2); assert.ok(o.then[1].text && o.then[1].text !== 'undefined', o.label); }
    assert.equal(steps[3].who, 'subject');
  }
});

test('her terms: she asks him and says why; his terms, that nothing is owed; her agreement, and her word', () => {
  for (const id of window.Cast.IDS) {
    const steps = Lines.terms(id), last = steps[steps.length - 1], word = window.Cast.ROSTER[id].word;
    // (she asks; or, Niamh, he offers it once she's said the talking isn't working, and she chooses it)
    if (id === 'niamh') assert.equal(steps[1].who, 'subject'); else assert.equal(steps[0].who, 'subject', id + ' asks');
    assert.ok(steps.some(s => s.who === 'captain' && /owe/.test(s.text)), 'none of it owed');
    assert.ok(steps.length >= 6); assert.equal(last.who, 'captain'); assert.ok(last.text.includes(word));
    assert.ok(steps.some(s => s.who === 'subject' && s.text.includes(word)), id + ' gives it');
  }
  assert.ok(Lines.terms('bethan').some(s => /Will/.test(s.text)), 'Will knows, and said she should ask');
  assert.ok(Lines.terms('niamh').some(s => s.who === 'captain' && /Rose/.test(s.text) && /Bethan/.test(s.text)), 'he tells Niamh about Rose and Bethan');
  assert.match(Lines.terms('saskia')[0].text, /Niamh/, 'Saskia came by way of Niamh');
});

test('the aftercare warmer once her feelings for him are strong: a fond opening and close', () => {
  const fond = Lines.after('rose', 'done', 'fond'), plain = Lines.after('rose', 'done', null);
  assert.ok(Lines.AFTER.rose.open.fond.includes(fond[0].text)); assert.equal(fond[0].expr, 'tender');
  assert.notEqual(fond[3].text, plain[3].text);
  assert.ok(Lines.AFTER.rose.open.word.includes(Lines.after('rose', 'word', 'fond')[0].text), 'her word’s opening first all the same');
});
