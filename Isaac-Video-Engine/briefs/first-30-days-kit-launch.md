# First 30 Days Kit — Launch Video (Brief v2, execution-ready)

Refines Chuck's original concept brief for the AI-video generation prompt.
v1 established the right guardrails (mobile-first vertical, no generic AI
imagery, "polished, cinematic, emotionally grounded", grounded in Tyson's
real rescue journey). v2 adds the four things v1 left open so the output
is executable, not just conceptual: a scripted 3-second hook, a defined
audio strategy, a beat-by-beat storyboard, and a locked CTA.

## At a glance

| Field | Value |
| --- | --- |
| Brand | Tyson's Time (`tysons-time` in `src/branding/themes.ts`) |
| Product | First 30 Days Kit — digital toolkit for new rescue-dog owners |
| Working name | `first-30-days-kit-launch` |
| Duration | 30 seconds |
| Platform / preset | Vertical 9:16, 1080×1920 (`tiktok` preset; also fits Reels/Shorts) |
| Audio | Recorded first-person voiceover + one warm acoustic underscore |
| Sales channel | E-commerce — "link in bio" |
| Output | `out/first-30-days-kit-launch.mp4` |

## North star (unchanged from v1)

- Polished, cinematic, emotionally grounded. Premium, never spammy.
- Mobile-first vertical framing. Keep faces/text inside platform safe zones.
- **No generic AI imagery.** Story beats use real Tyson footage only.
  Generated/mocked visuals are permitted in exactly one place: the product
  UI screens in Beats 4–5.
- The kit is *earned*: everything shown was actually lived through with
  Tyson. Authenticity is the trust engine for the sale.

## Storyboard — four beats, 30 seconds

Text overlays are quoted verbatim; treat them as final copy unless Chuck
revises. VO = voiceover line for that beat (full script in Audio section).

### Beat 1 — Hook (0:00–0:03)

- **Visual:** Raw, slightly shaky handheld clip of Tyson on day one —
  pressed low in a corner or crate, wary eyes, tail tucked. Natural light,
  little/no color grade. Imperfection is the point; it must read "real
  camera roll," not "produced ad."
- **Text on screen (two lines, staggered):**
  1. "He didn't need a perfect system."
  2. "He just needed safety."
- **Audio:** Room tone only for the first ~1.5s, then the first soft music
  note lands. No VO yet — the silence is the scroll-stopper.

### Beat 2 — The problem: the hard first days (0:03–0:11)

- **Visual:** 3–4 quick documentary cuts: untouched food bowl, chewed
  leash or blanket, late-night hallway pacing, Isaac sitting on the floor
  a few feet away, not reaching out.
- **VO:** "The first thirty days with a rescue aren't about training.
  They're about trust."
- **Text:** word-by-word captions mirroring the VO (video must work muted).

### Beat 3 — The turning point: finding structure (0:11–0:19)

- **Visual:** Footage warms up — first tail wag, first treat taken from a
  hand, sleeping belly-up, a calm walk (the Walker clip works here). Color
  grade shifts toward the brand ambers (#ffb020 / #ff6b35).
- **VO:** "What changed everything wasn't a trick. It was a rhythm — same
  walk, same words, same calm, every single day."
- **Text:** captions continue; optional single keyword pops ("rhythm").

### Beat 4 — The solution: the kit (0:19–0:26)

- **Visual:** Clean cut to product: a hand holding a phone, scrolling the
  First 30 Days Kit — day-by-day checklist, decompression schedule,
  printable routines. Bright, minimal, premium. This is the only beat
  where mocked/generated UI is allowed.
- **VO:** "So I turned those thirty days into the exact plan I wish I'd
  had — the First 30 Days Kit."
- **Text:** product name lockup + up to three short feature callouts
  (e.g. "Day-by-day plan · Decompression schedule · Printable routines").

### Beat 5 — CTA (0:26–0:30)

- **Visual:** Rapid, clean scroll of the toolkit on a smartphone screen,
  then hard cut to the end card: Tyson's Time logo on the dark brand
  background.
- **VO:** "Give your rescue their best first thirty days. Link in bio."
- **Text on screen:** "Get the First 30 Days Kit → Link in bio"
- **Audio:** music resolves and drops out under the last VO word so the
  CTA line lands in near-silence.

## Audio strategy (new in v2)

**Voiceover — recorded, first person, not an announcer.** Isaac reads it
himself: quiet, close-mic'd, conversational, as if telling one friend the
story. A phone recording in a quiet room is acceptable — authenticity
beats studio polish and matches the "no generic AI" guardrail. Avoid AI
voiceover for the master; if one is ever needed for a test variant, use a
calm, low-energy read, never an ad voice.

**VO script (full, ~55 words — fits 30s at a relaxed pace):**

```
The first thirty days with a rescue aren't about training.
They're about trust.
What changed everything wasn't a trick. It was a rhythm —
same walk, same words, same calm, every single day.
So I turned those thirty days into the exact plan I wish I'd had —
the First 30 Days Kit.
Give your rescue their best first thirty days. Link in bio.
```

**Music.** One warm, minimal acoustic bed for the whole piece — felt piano
or fingerpicked guitar, roughly 80–95 BPM. Enters softly ~1.5s in, lifts
subtly at the turning point (Beat 3), resolves and drops under the final
CTA line. No trending audio on the polished master (licensing + brand
consistency); a platform-native trending-sound cut can be posted as an A/B
variant separately.

**Mix for mute.** Most feed viewers watch silent: every VO line is
mirrored by captions, and the hook is text-first, so the video works with
sound off. Duck music −6 dB or more under VO. Optional light SFX only: a
soft whoosh into Beat 4 and gentle UI ticks on the CTA scroll.

## Generation prompt (copy-paste for the AI video tool)

```
30-second vertical video, 9:16, 1080x1920, 30fps. Polished, cinematic,
emotionally grounded — premium documentary tone, never spammy.

BEAT 1 (0:00-0:03) HOOK: Raw slightly shaky handheld footage of a nervous
rescue dog pressed low in a corner, tail tucked, natural light, ungraded.
Text overlay, two staggered lines: "He didn't need a perfect system." /
"He just needed safety." Room tone only, first soft piano note at ~1.5s.

BEAT 2 (0:03-0:11) PROBLEM: Quick documentary cuts — untouched food bowl,
chewed leash, late-night hallway pacing, owner sitting on the floor at a
distance. VO: "The first thirty days with a rescue aren't about training.
They're about trust." Word-by-word captions.

BEAT 3 (0:11-0:19) TURNING POINT: Footage warms — first tail wag, treat
taken from hand, dog asleep belly-up, calm walk. Color grade shifts to
warm amber. VO: "What changed everything wasn't a trick. It was a rhythm —
same walk, same words, same calm, every single day."

BEAT 4 (0:19-0:26) SOLUTION: Clean product shot — hand holding phone,
scrolling the "First 30 Days Kit" digital toolkit: day-by-day checklist,
decompression schedule, printable routines. Bright, minimal, premium. VO:
"So I turned those thirty days into the exact plan I wish I'd had — the
First 30 Days Kit."

BEAT 5 (0:26-0:30) CTA: Rapid clean scroll of the toolkit on a smartphone,
cut to end card: Tyson's Time logo, dark warm background. Text: "Get the
First 30 Days Kit → Link in bio". VO: "Give your rescue their best first
thirty days. Link in bio." Music resolves and drops out.

AUDIO: Single warm acoustic underscore (felt piano or fingerpicked guitar,
80-95 BPM), ducked under a quiet first-person male voiceover. Full
comprehension with sound off via captions.

CONSTRAINTS: Use only the provided real dog footage for story beats —
never generate a dog. Generated visuals allowed only for the product UI in
beats 4-5. No generic AI imagery, no stock-footage look, no text outside
platform safe zones, no watermark artifacts.
```

## Rendering the non-generative cut with this engine

The same brief maps directly onto the auto pipeline (Workflow A in
`CLAUDE.md`) once the real clips exist:

1. Drop the Tyson clips into `assets/videos/` (and stills into
   `assets/images/`), named in beat order: `01-hook-corner.mp4`,
   `02-food-bowl.mp4`, … `09-kit-scroll.mp4`.
2. Put the VO script above in `assets/script.txt` (word-timed captions),
   the recorded read in `assets/voiceover/`, and the acoustic track in
   `assets/music/`.
3. Set `assets/cta.txt` to `Get the First 30 Days Kit → Link in bio` and
   `assets/endcard.txt` to `Tyson's Time`.
4. Render:
   `BRAND=tysons-time PRESET=tiktok OUTPUT=out/first-30-days-kit-launch.mp4 npm run render:short`

Note: the pipeline's captions are evenly word-timed, and voiceover
placement requires the hand-authored path (`VoiceoverTrack`) — if VO
timing must hit the beat boundaries exactly, use Workflow B with the
timings in this brief.

## Shot checklist (pull from camera roll)

- [ ] Day-one footage: Tyson withdrawn/corner/crate (hook — the rawer the better)
- [ ] Untouched food bowl
- [ ] Chewed leash/blanket or similar evidence of the hard days
- [ ] Late-night pacing or restless clip
- [ ] Isaac sitting on the floor at a distance
- [ ] First tail wag / treat from hand
- [ ] Sleeping belly-up
- [ ] Calm walk (Tyson & Walker clip works)
- [ ] Product UI: kit checklist, decompression schedule, printables (screen
      recording or clean mockup)
