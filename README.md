# Thorn

Fenwick Hall's base models, its correction and pain engine, and its living room, ported from [fenwick](https://github.com/asonichero/fenwick). On them is a correction test with James Edwards (based on Fenwick's Silas, with his own look), and two women in his life who've asked him to hold them to account: Rose (Fenwick's) and Bethan (Thorn's own). All three are in modern clothes. The page has Fenwick's figures character panel, but it runs one whole correction rather than the figures page's endless loop of rounds: she's placed, you run it, it ends, then the aftercare, then a summary of what came of it.

## The premise

The people James corrects are people in his life who trust him. Each has agreed, of their own accord, to give him the authority to discipline them: to relieve guilt, to build habits, or to improve their behaviour. It's always on terms agreed first, with a word of their own that stops it at once, and with aftercare after. Most of them, in time, come to have romantic or sexual feelings for him, from the steady, supportive presence he is. The whole of it, and Rose's and Bethan's stories under it, is in [`docs/lore.md`](docs/lore.md).

In the game:
- Each subject has her reasons for asking (`agreed`) and how her feelings for him grow (`feelings`), in `js/cast.js`.
- Her terms open with her asking him.
- After each correction, `Cast.grow` builds her trust (comfort), her feelings for him (desire) and her submission. They grow more the more ways he answers her in the aftercare, and resentment holds them back. The sliders carry what's built into the next correction.
- Once her feelings are strong, the aftercare opens and closes warmer.

## Run it

```
npm run serve        # http://localhost:8123/ opens the correction test (correction.html)
npm test             # the pain model and the implements; the cast and the lines; conversations; the living room as a correction's;
                     # and whole corrections, headless, on the models in the room: each position, her word, the implements
```

No build step and no dependencies: three.js r128 is in `vendor/`.

## The correction test (`correction.html`)

The living room at night. You play James.

- **The panel, down the left** (as Fenwick's figures page has it):
  - **Who:** Rose or Bethan; who she is, why she asked you, and her word (*Lantern*, *Bluebell*). Each keeps her own outfit and her own tracks with him.
  - **Outfit:**
    - **Rose:** jeans (a plain pink tee, jeans, trainers), cardigan (her red cardigan over a shirt, jeans, flats), lounge (a marl top, joggers, slippers), work (a henley, chinos, work shoes from the bakery), or None.
    - **Bethan:** office (a sage cardigan over a blouse, smart trousers, flats), weekend (a print shirt open over a tee, jeans, trainers), home (a soft lilac top and joggers, slippers), or None.
  - **Clothes:** before it begins, how she starts. During it, James changes them, seen: T-shirt or top raised, jeans or trousers lowered, knickers lowered.
  - **James:** tee (a plain maroon T-shirt, jeans, boots), henley (sleeves pushed up, jeans, boots), flannel (a check shirt open over a tee, work trousers, boots), knit (a cardigan over a shirt, chinos, loafers), or None.
  - **Position:**
    - Across the knee on a dining chair pulled out into the room.
    - Across the knee on the sofa. The coffee table is pushed back for this one.
    - Over the dining table, holding its sides.
    - Hands on the kitchen worktop.
  - **Where she is with him:** defiance, submission, desire, comfort and resentment. These take effect at once.
  - **Expression** and **Response:** auto, or held.
  - **Her terms first:** the conversation where he sets out how it works and she gives her word.
  - **Sound.**
- **The HUD, down the right:**
  - Her name, and where the correction has got to. The phases are defiance, covering, pride, breaking and receptive, then spent.
  - The cameras.
  - The controls:
    - Run on a toggle (**Space**), pace (`[` `]`), strength (`-` `=`), side (**D**), where (**A**: cheek, sit spot, thighs).
    - Soothe (**S**).
    - Implement (**I**).
    - Clothes (**T B U**).
    - End (**Enter**).
    - Cameras (**C**).
  - The meter: her distress against the bands, with the bar where she'd say her word.
- **Implements:** James's hand, a wooden hairbrush (every position), and a long thick paddle and a folded belt (over the table only). Each is held in his right hand, and its striking face lands where his palm would. The brush lands on one cheek; the paddle and the belt land across both.
  - Each has its own weight in the pain model. The hairbrush is sharper than the hand. The paddle is the heaviest, with more of it ache. The belt is the stingiest.
  - Each leaves its own marks and makes its own sound.
  - James announces each one as he takes it up, and Rose answers.
  - Moved off the table, the paddle or the belt goes back to his hand. He puts it down to soothe her or to dress her.
- **The end:**
  - **End:** he soothes her, then dresses her.
  - **Her word**, if it goes too far: it stops at once, and End is shut.
  - **The aftercare on the sofa:** reassure her, say why it mattered, ask how she is; then what she's to do with the rest of the evening.
  - **The summary:** where, how many smacks and with what, how it ended, the hardest it got, her defiance before and after, compliance and resentment gained, what he said, what his steadiness built between them (her trust, her feelings for him), and what next.
  - **Begin again** starts another correction. Changing her outfit or his also begins it again.
- **From the address:** `?who=rose|bethan&outfit=&clothes=down,up,up&sout=&pos=otk|otk:sofa|table|wall&def=&sub=&des=&com=&res=&expr=&resp=&terms=1`. `?still=1` holds it for screenshots: `window.step(n)` draws n frames, and `window.sim(n)` runs n frames without drawing.

## What came across, and what changed

| File | What it is |
|---|---|
| `models/thorn_m.glb` | Fenwick's male model (Meridian's shirt, tunic, trousers, briefs and boots; his nightclothes), unchanged. |
| `models/thorn_hair.glb` | Fenwick's hair styles and beard, unchanged, plus two built for James: `sweptback` (parted on his left, swept back and over to his right, short at the back) and `trim` (the beard with its cheek line running down from the sideburn to the moustache). |
| `models/thorn_f.glb` | Fenwick's female model, rebuilt with `tools/blender/build_figures.py` in Meridian's modern layers rather than Fenwick's period dress: a shirt (sleeves pushed up) and a long-sleeved top, each down or raised; trousers, up or lowered; briefs, up or lowered; shoes. The body is byte-identical to Fenwick's, and the joints are the same. |
| `models/thorn_meta.json` | The joints and landmarks; hers measured anew for the modern layers. |
| `js/figure.js`, `js/poses.js` | The figures and posing, ported. Added: a `jeans` pattern for the trousers (denim twill, fading, contrast double-stitching, scooped and patch pockets, a yoke, rivets) and a `plaid` top (a check flannel shirt open over a tee); boots in the wearer's own colour; a beard in its own colour and style (`beardCol`, `beardStyle`). |
| `js/pain.js` | The pain model, ported, with the hairbrush, the paddle and the belt added. |
| `js/session.js` | The correction, ported. Added: the implements (held, aimed, laid by, marks, sounds, lines, where each is allowed). |
| `js/implements.js` | New: the hairbrush, the paddle and the belt, built in the hand's frame. |
| `js/livingroom.js`, `js/kit.js` | The living room, ported. Added: a dining table and an armless dining chair, and `lr.bay()`, which gives the room's positions to the correction, with its cameras and the coffee table moved for the sofa. |
| `js/cast.js`, `js/lines.js` | New for Thorn: Bethan (26, James's colleague, a mother with her partner Will, who knows and supports it), with her own look, lines and terms; Rose (19, at her mum's bakery) as Fenwick wrote her; and James Edwards (37, a tree surgeon) with Fenwick's Silas's temperament and build and his own look: dark brown hair swept back from a left part, a short ginger-brown beard, brown eyes, fair skin, a maroon tee. A couple in the present day. Rose's lines, James's, the aftercare and her terms are rewritten for now (the woods after dark, a dead phone, her nan's), in the same structure. |
| `js/talk.js`, `js/audio.js`, `js/stage.js` | Conversations, synthesised sound and the renderer, ported. |
| `tools/blender/`, `tools/export-head.js` | The model builds. Hers is built in modern layers, and the hair adds James's styles; the outputs are named `thorn_*`, and `THORN_OUT` builds somewhere else. |

To rebuild the models you need Blender 5 (the `bpy` module from PyPI works, with scikit-image):

```
python3 -m venv .blender && .blender/bin/pip install "bpy==5.1.*" scikit-image
.blender/bin/python tools/blender/build_figures.py -- f m      # the bodies, their rig and keys, and the clothes (about 4 minutes each)
node tools/export-head.js && .blender/bin/python tools/blender/build_hair.py      # the hair and the beards (seconds)
```

Not ported: Fenwick's game, prologue, chapters, estate, the other rooms and cast, the walking, the pose editor, `js/discipline.js` (an unused scripted correction), and `tools/measure-reference.py` (which measured the turnaround `reference.json` came from).
