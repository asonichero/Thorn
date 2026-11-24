// Thorn — what's said in a correction (the structure is Fenwick Hall's js/lines.js, and Project Meridian's before it; Rose's and James's lines
// brought into the present day). Her scripted responses as it goes (as she's placed, the first smack, as her distress crosses each band, when
// soothed, her safe word when it's gone too far, at the end), James's word to place her and to correct her position, the conversation after
// (aftercare given through what's said, then what she's to do with the rest of the evening), and the terms: the conversation, before any
// correction, where James sets out how it works between them and she agrees to it and chooses her word.
// {word}: her safe word. {name}: what James calls her (Cast: short).
//
//   Lines.react(id, key) → a line or null · Lines.captain(key, id) (James; `captain` is the engine's name) · Lines.place(id, position)
//   Lines.after(id, outcome, mood) → the aftercare conversation as steps · Lines.terms(id) → the terms conversation as steps
(function (root) {
'use strict';
// (each list dealt like a shuffled pack: no line again till all of its others have been said, and never the same twice running)
const packs = new WeakMap();
const pick = a => {
  if (!Array.isArray(a)) return a; if (a.length < 2) return a[0];
  let P = packs.get(a); if (!P) packs.set(a, (P = { left: [], last: -1 }));
  if (!P.left.length) { P.left = a.map((_, i) => i).filter(i => i !== P.last); for (let i = P.left.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [P.left[i], P.left[j]] = [P.left[j], P.left[i]]; } }
  P.last = P.left.pop(); return a[P.last];
};

// James placing her, by position. Standing, by what she holds (a room's support names its lines): worktop, the kitchen's; edge, any edge;
// flat, a bare wall; table, chest down over a table.
const PLACE = {
  otk: ['Across my knee, {name}.', 'Here. Over my lap.', 'Come here. Across my knee.'],
  worktop: ['Hands on the worktop, {name}. Step back. Bend.', 'Palms flat on the counter. Feet apart.', 'Over here. Both hands on the worktop, and keep them there.'],
  edge: ['Hands on the edge, {name}. Step back. Bend.', 'Palms flat. Feet apart.', 'Over here. Both hands down, and keep them there.'],
  flat: ['Hands on the wall, {name}. Step back.', 'Palms flat on the wall. Feet apart.', 'Face the wall. Hands on it, and leave them there.'],
  table: ['Over the table, {name}.', 'Bend over the table. Hold the sides.', 'Here. Chest down on the table.'],
};
// James, when she gets in the way of it: a hand back over her seat (hands); the second time, he takes the wrist and holds it at the small of
// her back (pin); and when she comes up out of position (down: across the knee; then by what she holds).
const CAPTAIN = {
  hands: ['Hand down, {name}.', 'Move the hand.', 'That hand goes back where it was.'],
  pin: ['That’s twice. I’ll hold it for you.', 'Give me your wrist. There.', 'All right. I’ve got it. Stay.'],
  take: ['Give me your wrist. There.', 'I’ll hold that for you.', 'All right. I’ve got it. Stay.'],
  down: ['Down.', 'Stay down, {name}.', 'Back over. All the way.'],
  worktop: ['Hands back on the worktop.', 'Down. Palms flat, {name}.', 'Back over.'],
  edge: ['Hands back on the edge.', 'Down. Palms flat, {name}.', 'Back over.'],
  flat: ['Hands back on the wall.', 'Back in position, {name}.', 'Palms on the wall. Stay there.'],
  table: ['Back down on the table.', 'Chest down, {name}.', 'Stay down on the table.'],
  // (taking up an implement, or putting it down for his hand again)
  hairbrush: ['The hairbrush now, {name}.', 'Now the brush.', 'I’m using the hairbrush for this.'],
  paddle: ['The paddle now. Hold the table.', 'Now the paddle. Stay down.', 'Hold on to the sides. The paddle.'],
  belt: ['The belt now. Hold the table.', 'Now the belt. Stay where you are.', 'Hold on. The belt.'],
  hand: ['Just my hand now.', 'My hand again.'],
};

// During: start (as she's placed), first (the first smack), flinching, struggling, edge, past (each the first time it's reached), plead (now
// and then while it's hard), spent (now and then, once the fight's gone out of her: hardly words), accept (in place of a plea, the more
// submissive she is), flushed (once, if her body's response shows: embarrassment), soothe (the palm on her, between), word (her safe word,
// called), end (when James stops). While she's still defiant: defy (back-talk, in place of the early band lines and the pleas), and yield
// (once, as the defiance breaks). (Thorn) hairbrush, paddle, belt: as he takes it up.
const REACT = {
  rose: {
    start: ['I know. I walked back through the woods again. I know.', 'All right. I did promise.', 'I know. Phone dead, headphones in. I know.'],
    first: ['Oh!', 'Ah—'],
    flinching: ['I’ll text you— I will, every time—', 'Ow— yes— I hear you—'],
    struggling: ['I wasn’t thinking— I had my music on and I just—', 'Ah! I know, I know— it was dark—'],
    edge: ['I’m sorry— I’ll look, I’ll listen, I promise—', 'Please— I’ll remember this time—'],
    past: ['I’m sorry— I’m sorry I scared you—'],
    plead: ['James—', 'Please—'],
    spent: ['…', 'Mm…', '…'],
    accept: ['Yes. I know. You’re right.', 'I know why. I do.'],
    flushed: ['Don’t— oh, don’t look at my face.', 'I’m as red as my coat. Don’t say it.'],
    soothe: ['…mm. That’s kind.', 'Oh— that helps.'],
    defy: ['It was only the shortcut!', 'I’ve walked through there my whole life.', 'You sound exactly like my mum.', 'My phone died. That’s not a crime.'],
    yield: ['…All right. You’re right. I don’t look. I never look.', 'All right. All right. I’m listening.'],
    word: '{word}— {word}, please stop.',
    end: ['…I’ll take the road. I mean it this time.', '…You’ll still drive me to Nan’s?'],
    // (as he takes up an implement)
    hairbrush: ['Not the hairbrush—', 'Oh— not the brush—', 'That’s my hairbrush!'],
    paddle: ['James— that’s enormous—', 'Oh, no. Not that one.'],
    belt: ['The belt? James—', 'Oh— not the belt—'],
  },
};

// Aftercare: the conversation once it's over. Her opening line (by outcome: done, or word if she called it; or, if it ended with her defiance
// still standing, unbroken: short, guarded; or, her feelings for him grown strong (docs/lore.md), fond: warmer, wanting him near), three ways
// James can answer (reassure her; say why it mattered, in his own words; ask how she
// is), each with her reply; then what she's to do with the rest of the evening, with her answer; and a last word.
const APPROACH = [
  { id: 'reassure', label: 'Reassure her', captain: ['It’s done. It stays done. You’re all right, and so are we.', 'Come here. It’s over, and nobody’s going anywhere.'] },
  { id: 'explain', label: 'Say why it mattered' },
  { id: 'ask', label: 'Ask how she is', captain: ['Talk to me. How are you, really?', 'Breathe first. Then tell me where you are.'] },
];
const ORDERS = [
  { id: 'rest', label: 'Early night', captain: 'You’re done for today. A bath, some water, and bed. I’ll bring you tea.' },
  { id: 'supper', label: 'Eat with me', captain: 'Kitchen. You’ll eat something warm in front of me, and we won’t talk about it.' },
  { id: 'sofa', label: 'Sit with me', captain: 'Sofa. Blanket. Something daft on the telly. Nothing’s needed of you for an hour.' },
  { id: 'work', label: 'Back to it', captain: 'Back to whatever you were doing when you’re ready. Not before. And you text me when you’re at your nan’s.' },
];
const AFTER = {
  rose: {
    open: { done: ['…I’m all right. I’m all right.', 'That was worse than the woods in the dark. Almost.'], word: ['I’m sorry. I had to say it. It was too much.'], unbroken: ['Can I go home now?', 'Fine. I heard you.'],
      fond: ['…Stay a minute? Just like this.', '…I like it when you’re like this, after. Steady.', '…Don’t go anywhere yet.'] },
    why: 'I can’t look after you if your phone’s dead and you’re halfway through the woods in the dark with your music up. I need to know where you are. That’s all this is.',
    reply: { reassure: '…Thank you. I needed to hear you say it.', explain: 'I know. It’s just— walking’s the only time nobody wants anything from me.', ask: 'Shaky. Warm. Like after a long walk home.' },
    order: { rest: 'Mum’ll want to know why I’m in bed at eight. …I’ll tell her I was tired. It’s true.', supper: 'Only if I bring the bread. It’s better than anything you’ve got in.',
      sofa: 'I’d like that. Will you tell me about the old oak again?', work: 'Nan’s. By the road. The whole way. And I’ll text.' },
    close: '…Thank you, James.', closeFond: '…Thank you, James. For all of it. Not just— you know. All of it.',
  },
};
// The terms (the first time, before he ever corrects her: docs/lore.md): she asks, and says why; James sets out what he'll hold her to and what
// he'll do, and that none of it is owed and she can take it back; she agrees, and she chooses her word, which stops anything at once. Steps
// for js/talk.js: lines, then her answer.
const TERMS = {
  rose: [
    { who: 'subject', text: 'I scared Mum half to death last winter. And Nan, sitting up by the window. I keep saying I’ll be careful, and then I just… drift.' },
    { who: 'subject', text: 'I need someone who’ll actually hold me to it. Who’ll notice. And then let it be done with, so I’m not carrying it round.' },
    { who: 'captain', text: 'And you want that to be me.' },
    { who: 'subject', text: 'You’re the only one who’d do it properly. Without making me feel small.' },
    { who: 'captain', text: 'Then we do it properly. When you put yourself at risk, when you go quiet on me and walk home through the woods in the dark, I deal with it. Me, across my knee. Then it’s done, and it stays done.' },
    { who: 'subject', text: 'And if I change my mind?' },
    { who: 'captain', text: 'Then you say so, and it stops, and nothing else changes between us. You don’t owe me this. Not now, not ever.' },
  ],
};
// (her agreement, and her word, in her voice)
const AGREE = {
  rose: ['…All right. Yes. I want it to be you.', 'My word’s {word}. For the one Nan leaves in the window.'],
};
const WORD_ASK = 'And a word. If it’s ever more than you can bear, you say it, and it stops at once. Whatever it is, wherever we are.';

const WHO = { james: { short: 'James', word: '' }, captain: { short: 'James', word: '' } };
const fill = (t, id) => { const C = root.Cast, r = (C && C.ROSTER[id]) || WHO[id] || WHO.james; return t.replace(/\{word\}/g, r.word).replace(/\{name\}/g, r.short); };
function place(id, position) { return fill(pick(PLACE[position] || PLACE.otk), id); }
function react(id, key) { const R = REACT[id]; if (!R || !R[key]) return null; return fill(pick(R[key]), id); }
// (anyone without lines of their own: an aftercare in few words, and terms without her own reasons)
const AFTER_ANY = {
  open: { done: ['…', '…It’s over.'], word: ['I said it. I’m sorry.'], unbroken: ['…Are we finished?'] },
  why: 'It mattered, so I dealt with it. Now it’s done, and it stays done.',
  reply: { reassure: '…Thank you.', explain: '…I understand.', ask: '…Sore. Better than I was.' },
  order: { rest: 'Yes.', supper: 'All right.', sofa: 'All right.', work: 'Yes. I’ll get back to it.' },
  close: '…Thank you.',
};
const TERMS_ANY = [{ who: 'captain', text: 'When it’s needed, I deal with it myself, and then it’s done.' }];
function captain(key, id) { return CAPTAIN[key] ? fill(pick(CAPTAIN[key]), id) : null; }
// The aftercare conversation, as steps for the page to play (js/talk.js): { who: 'subject' | 'captain', text } lines, and { choose: [{ label,
// then: [...] }] }: what James says, explored (any or all of reassuring her, saying why it mattered, asking how she is), then what she's to do
// with the rest of the evening, one of them.
// (mood 'unbroken': it ended with her defiance still standing; 'fond': her feelings for him grown strong (docs/lore.md); the safe word's
// opening comes first all the same)
function after(id, outcome, mood) {
  const A = AFTER[id] || AFTER_ANY, k = outcome === 'word' ? 'word' : mood === 'unbroken' && A.open.unbroken ? 'unbroken' : mood === 'fond' && A.open.fond ? 'fond' : 'done', open = pick(A.open[k]);
  const said = a => (a.id === 'explain' ? A.why : pick(a.captain));
  return [
    { who: 'subject', text: fill(open, id), expr: k === 'word' ? 'sad' : k === 'unbroken' ? 'defiant' : k === 'fond' ? 'tender' : 'teary' },
    { explore: true, choose: APPROACH.map(a => ({ label: a.label, approach: a.id, then: [{ who: 'captain', text: fill(said(a), id) }, { who: 'subject', text: fill(A.reply[a.id], id), expr: a.id === 'reassure' ? 'teary' : a.id === 'explain' ? 'concerned' : 'wistful' }] }))
      .concat([{ label: 'Tell her what’s next', end: true, then: [] }]) },
    { choose: ORDERS.map(o => ({ label: o.label, order: o.id, then: [{ who: 'captain', text: fill(o.captain, id) }, { who: 'subject', text: fill(A.order[o.id], id), expr: 'soft' }] })) },
    { who: 'subject', text: fill(k === 'fond' && A.closeFond ? A.closeFond : A.close, id), expr: k === 'fond' ? 'tender' : 'soft' },
  ];
}
// The terms, as steps: James's terms and her question, then he asks for her word, and she agrees and gives it.
function terms(id) {
  const T = TERMS[id] || TERMS_ANY, A = AGREE[id], steps = T.map(s => ({ who: s.who, text: fill(s.text, id) }));
  if (!A) return steps.concat([{ who: 'captain', text: WORD_ASK }]);
  return steps
    .concat([{ who: 'subject', text: fill(A[0], id) }, { who: 'captain', text: WORD_ASK }, { who: 'subject', text: fill(A[1], id) }, { who: 'captain', text: fill('{word}, then. Say it and I stop.', id) }]);
}

const api = { PLACE, CAPTAIN, REACT, AFTER, APPROACH, ORDERS, TERMS, AGREE, place, captain, react, after, terms };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
root.Lines = api;
})(typeof window !== 'undefined' ? window : globalThis);
