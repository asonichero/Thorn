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
  bethan: {
    start: ['Right. Okay. I asked for this. I know I did.', 'I’ve been looking forward to this all week. Which is ridiculous.', 'Okay. I’m not in charge of anything for the next half hour.'],
    first: ['Oh—', 'Ah!'],
    flinching: ['Okay— okay, that’s real—', 'Mm— right— right—'],
    struggling: ['I said yes to everything again— I know—', 'Ah— I snapped at everyone this week— I know I did—'],
    edge: ['I’m sorry— I keep trying to hold it all—', 'Please— I can’t keep it all up—'],
    past: ['I don’t have to be in charge— I don’t—', 'I can put it down— I can put it all down—'],
    plead: ['James—', 'Please—'],
    spent: ['…', 'Mm…', '…okay…'],
    accept: ['I know. I know why.', 'Yes. Thank you.'],
    flushed: ['Don’t look at me— I’m bright red—', 'Oh god, my face.'],
    soothe: ['…oh. That’s lovely.', 'Mm. Don’t stop that.'],
    defy: ['I’m perfectly capable of managing my own week, thank you.', 'It wasn’t that bad. Everything got done.', 'You don’t know what my week’s been like.', 'I’m fine. I’m always fine.'],
    yield: ['…Okay. Okay. I’ll stop. I’ll let you.', 'All right— you’ve got it. You’ve got it.'],
    word: '{word}— {word}, stop, please.',
    end: ['…That’s the first time I’ve breathed out all week.', '…Okay. Okay. I feel lighter.'],
    hairbrush: ['Oh, not the brush—', 'That’s— okay. Okay.'],
    paddle: ['James— that’s huge—', 'Oh, that’s not fair.'],
    belt: ['Oh— okay. Okay.', 'The belt? …All right.'],
  },
  niamh: {
    start: ['Fine. I know. I was late again. And I wasn’t off book.', 'This is so— okay. Okay. I agreed to this.', 'Can I just say, for the record, that I’m mortified?'],
    first: ['Ow!', 'Oh my god—'],
    flinching: ['Okay— okay, I get it—', 'Ow— that’s— right—'],
    struggling: ['I snapped at Mum again— I know—', 'Ah— I bailed on Ellie again— I know I did—'],
    edge: ['I’m sorry— I make everything about me— I’m sorry—', 'Please— I’ll learn it, I’ll be on time—'],
    past: ['I’m sorry— to all of them— I’m so sorry—'],
    plead: ['James—', 'Please—'],
    spent: ['…', 'Mm…', '…'],
    accept: ['I know. I needed this.', 'Yeah. I know why.'],
    flushed: ['Don’t look at my face. I’m a tomato.', 'This is not my best angle.'],
    soothe: ['…oh. Okay. That’s nice.', 'Mm. Can you just do that for a bit.'],
    defy: ['This is so unfair. Everyone’s late sometimes.', 'Notes are one thing, this is— this is a lot.', 'You’re being really dramatic about this.', 'I was going to learn it. I was literally about to.'],
    yield: ['…Okay. Okay. You’re right. I’m listening. I’m actually listening.', 'All right— I hear you. I’ll stop fighting it.'],
    word: '{word}— {word}, please, stop.',
    end: ['…I think I can actually focus now. Weird.', '…Okay. On time on Thursday. And off book.'],
    hairbrush: ['Not the hairbrush— that’s so—', 'Oh, come on—'],
    paddle: ['That is a prop. That has to be a prop.', 'James— no— that’s enormous—'],
    belt: ['The belt? Oh my god.', 'Okay— okay. I deserve that.'],
  },
  saskia: {
    start: ['Okay. Okay. I didn’t practise. You know I didn’t practise.', 'Can we negotiate? No? No. Okay.', 'Niamh did warn me you don’t do discounts.'],
    first: ['Ah!', 'Oh—'],
    flinching: ['Okay, I’ll practise— I’ll actually practise—', 'Ow— okay— point made—'],
    struggling: ['I skipped warm-up again— I know—', 'Ah— I went out before the dress run— I know—'],
    edge: ['I’m sorry— I keep coasting— I’m sorry—', 'Please— I’ll do the work, I will—'],
    past: ['I don’t want to just get away with it— I don’t—'],
    plead: ['James—', 'Please—'],
    spent: ['…', 'Mm…', '…'],
    accept: ['Yeah. I know. I needed this.', 'I know why.'],
    flushed: ['Don’t look at my face, it’s all blotchy.', 'I am so red right now.'],
    soothe: ['…oh. Okay. That’s really nice.', 'Mm. Five more minutes of that.'],
    defy: ['I was going to do it tonight. Literally tonight.', 'I always pull it off on the night, though.', 'Can’t we just do a warning?', 'This is so not a technique.'],
    yield: ['…Okay. Okay. I hear you. I’ll stop bargaining.', 'All right— you win. You actually win.'],
    word: '{word}— {word}, please stop.',
    end: ['…Okay. Scales at eight. Every day. I mean it.', '…I think that’s the first time anyone hasn’t let me charm my way out.'],
    hairbrush: ['Not the hairbrush— seriously—', 'Oh, that’s so unfair.'],
    paddle: ['Is that a paddle? Is that an actual paddle?', 'James— no— not that one—'],
    belt: ['The belt? Okay— okay.', 'Oh my god. Okay.'],
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
  bethan: {
    open: { done: ['…I didn’t think I could let go like that.', '…Everything’s very quiet in my head.'], word: ['I’m sorry. I needed to stop. Thank you for stopping.'],
      unbroken: ['I’m fine. Honestly. I should get back.', 'Can we just leave it there?'],
      fond: ['…Can I stay here a minute? Will’s got everything at home.', '…I look forward to this bit more than I should.', '…Don’t move yet.'] },
    why: 'You carry everyone, Beth. At work, at home. You don’t have to carry this. For this half hour, I’ve got it. That’s the whole point.',
    reply: { reassure: '…Thank you. I didn’t know how much I needed someone to say that.', explain: 'I know. It’s just— nobody’s ever offered to take it off me before.', ask: 'Sore. Light. Really, really light.' },
    order: { rest: 'An early night. Will’s going to be insufferable about how relaxed I am.', supper: 'Something warm. And I’m not cooking it. That’s new.',
      sofa: 'Yes. I’d like that. Don’t let me check my phone.', work: 'Back to it. Calmer. I’ll text you when I’m home.' },
    close: '…Thank you, James.', closeFond: '…Thank you. For this. For you. Will says thank you too, you know. He means it.',
  },
  niamh: {
    open: { done: ['…That was a lot.', '…I feel like I’ve just done a two-show day.'], word: ['I’m sorry. I had to. Thank you for stopping straight away.'],
      unbroken: ['Can we not do the talking bit?', 'I’m fine. Can I go?'],
      fond: ['…Can I stay here? Just for a bit.', '…You’re the only person I don’t have to perform for.', '…Don’t go anywhere.'] },
    why: 'Because you’re talented enough that people forgive it, and you’re running out of people. You don’t have to be the lead in everyone’s day, Niamh. Turn up. Listen. That’s all.',
    reply: { reassure: '…Thank you. Nobody tells me I’m all right unless I’ve just been brilliant.', explain: 'I know. It’s just easier to be dramatic than to be sorry.', ask: 'Sore. Shaky. Quiet inside, for once.' },
    order: { rest: 'Early night. Off book by Thursday. I mean it.', supper: 'Yes. And I won’t talk about myself the whole time. Probably.',
      sofa: 'Can we watch something? Not a musical. I’ll only critique it.', work: 'Lines. Then I’m ringing Mum. Properly.' },
    close: '…Thank you, James.', closeFond: '…Thank you. I mean it. For seeing me, and not just the act.',
  },
  saskia: {
    open: { done: ['…Okay. That worked. I hate that it worked.', '…Wow. Okay. My whole brain’s gone quiet.'], word: ['I’m sorry. I had to stop. Thank you for stopping.'],
      unbroken: ['Are we done? I’ve got a thing.', 'Fine. Lesson learned. Can I go?'],
      fond: ['…Can I stay a minute? I like it here.', '…You don’t let me get away with anything. I think I like that.', '…Stay. Please.'] },
    why: 'Because you’re good, Saskia, and you’ve been getting by on good. You want to be brilliant. Brilliant’s just good that turns up and does the work.',
    reply: { reassure: '…Thanks. People usually just tell me I’m great.', explain: 'I know. It’s just easier to be charming than to be ready.', ask: 'Sore. Focused. Weirdly calm.' },
    order: { rest: 'Early night. Scales in the morning. Before coffee, even.', supper: 'Yes, please. And then I’ll do my lines. Out loud. At you.',
      sofa: 'Okay. One episode. Then practice.', work: 'Warm-up, then the whole of act two. Properly.' },
    close: '…Thank you, James.', closeFond: '…Thank you. Niamh was right about you. About all of it.',
  },
};
// The terms (the first time, before he ever corrects her: docs/lore.md): she asks, and says why; James sets out what he'll hold her to and what
// he'll do, and that none of it is owed and she can take it back; she agrees, and she chooses her word, which stops anything at once. Steps
// for js/talk.js: lines, then her answer.
const TERMS = {
  saskia: [
    { who: 'subject', text: 'Niamh’s completely different. On time, off book, actually nice to everyone. I asked what technique she was using, and she told me about you.' },
    { who: 'captain', text: 'And what is it you want?' },
    { who: 'subject', text: 'To stop coasting. I get by on charm and the night itself, and one day it won’t be enough. I want to do the work, every day. I just… don’t.' },
    { who: 'captain', text: 'Then this is how I work. We agree what you’ll do: practice, warm-ups, early nights before a show. When you don’t, I deal with it. Across my knee. Then it’s done.' },
    { who: 'subject', text: 'And if I hate it?' },
    { who: 'captain', text: 'Then you say so, and it stops, and we never mention it again. You don’t owe me anything, Saskia. Not now, not ever.' },
  ],
  niamh: [
    { who: 'captain', text: 'You said the talking isn’t working.' },
    { who: 'subject', text: 'It isn’t. I know what I do now, and I still do it. Mum. Ellie. Whoever I’m seeing. Rehearsals. I know, and I do it anyway.' },
    { who: 'captain', text: 'There are two people I help another way. Rose, and Bethan. They asked me to hold them to account, properly. When they slip, I deal with it, across my knee, and then it’s done.' },
    { who: 'subject', text: '…And it works?' },
    { who: 'captain', text: 'For them. It might not be for you. If you want it, we agree what I hold you to. You can stop it with a word, or end it altogether, and nothing changes between us. You don’t owe me this.' },
    { who: 'subject', text: 'Turning up. Being ready. Listening. Not making everything about me.' },
    { who: 'captain', text: 'Then that’s what I’ll hold you to.' },
  ],
  bethan: [
    { who: 'subject', text: 'Everyone leans on me. At work, at home. And I’m good at it. I’m just so tired of being the one who holds everything.' },
    { who: 'subject', text: 'I want somewhere I don’t have to be in charge. Where someone else decides, and I just… let them.' },
    { who: 'captain', text: 'And Will?' },
    { who: 'subject', text: 'He knows. He’s the one who said I should ask you. He says I’m happier when I’ve got somewhere to put it all down.' },
    { who: 'captain', text: 'Then this is how it works. When you run yourself into the ground, when you say yes to everyone but you, I deal with it. Across my knee. And then it’s done, and you don’t carry it home.' },
    { who: 'subject', text: 'And if it stops being what I need?' },
    { who: 'captain', text: 'Then you say so, and it stops, and we’re just two people who work together and get on. You don’t owe me this. Not ever.' },
  ],
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
  saskia: ['…Okay. Let’s work together. Properly.', 'My word’s {word}. End of scene, lights out.'],
  niamh: ['…Yes. I want to try it. I want to be better at people.', 'My word’s {word}. Like at the end of the show.'],
  bethan: ['…Yes. Please. I want that.', 'My word’s {word}. They come up along the lane by the office every spring.'],
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
