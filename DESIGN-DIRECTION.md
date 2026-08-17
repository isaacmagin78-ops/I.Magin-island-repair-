# Design direction — read before designing anything

**Recorded 2026-08-16, after Isaac had to say it again:**

> *"I'm not in the pride or any gay colored rainbow shit — I know I'm not against
> it, but I don't sell that... Miami colors, vibrant, like Apple. Apple's
> beautiful. You should know this, we're basing our designs off what Apple does.
> Why do I have to keep repeating this?"*

He should not have had to. It is written down now.

---

## The two references, in order

### 1. Apple is the design standard
Not "modern," not "clean" — **Apple specifically.** What that means in practice:

- **Restraint.** One idea per screen. Space is a material, not wasted room.
- **Precise typography.** Tight tracking on large display type, generous
  line-height on body text, a real scale with nothing in between.
- **Soft, controlled gradients** — never banded, never more than a few hues,
  always resolving to something calm.
- **Deep true blacks** and honest whites. No muddy greys.
- **Motion that is felt, not watched.** A sweep, a settle, a breath. Nothing
  bounces, nothing spins, nothing announces itself.
- **Materials, not decorations.** Glass, foil, brushed metal, depth of field —
  surfaces that behave like real ones. No stickers, no emoji as section markers,
  no drop shadows for their own sake.

### 2. Miami is the palette
Miami sunset and art-deco Miami Beach:

| | |
|---|---|
| Peach | `#FFB78C` |
| Coral | `#FF5787` |
| Violet | `#A159FF` |
| Aqua | `#33C7EB` |

Deep near-black grounds. **Warm amber `#FFB020` and ember `#FF6B35`** stay in
play — they are already his brand tokens in `isaac-video-engine/src/branding/themes.ts`.

---

## ⛔ The hard rule: no full-spectrum rainbows

**A gradient that includes yellow AND green alongside pink and blue reads as a
pride flag.** Isaac is not against it — **it is simply not what he sells**, and a
mark that signals it is a mark he cannot use.

**This is a technical rule with a technical fix.** Do not "tone it down" — remove
the yellow-green band entirely:

- ❌ `cos(6.28*(t + vec3(0.0, 0.33, 0.67)))` — the standard iridescence trick.
  It produces the full ROYGBIV spectrum. **Never use it for his brand.**
- ✅ A **closed palette** of 3–4 named stops interpolated in a loop. See the
  `miami()` function in the I.MAGIN hologram shader for the working version.

Iridescence and foil are wanted. **A rainbow is not.** The difference is entirely
in which hues are allowed in the ramp.

---

## Also avoid — the generic-AI look

Independently of the above, these read as machine-generated and cheapen the work:

- Purple-to-blue gradient heroes (every AI company on earth)
- Robots, brains, circuit boards, neural-net nodes
- Warm cream `#F4F1EA` + serif display + terracotta accent
- Emoji as section markers
- Everything centered, everything rounded, an accent bar on every card

---

## What he is actually building toward

He works from an **iPad Pro 13", an iPad mini Pro and an iPhone** — that is the
canvas. **A design that needs a desktop to look right has failed.**

And he means the Apple comparison at full strength. He is not asking for
"Apple-ish." He is asking for work that would not embarrass itself next to it.
Treat that as the bar.
