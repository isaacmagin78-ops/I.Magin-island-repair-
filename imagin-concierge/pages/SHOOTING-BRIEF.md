# How to shoot 90 seconds I can actually cut

Written 2026-08-19, after a real failure worth not repeating.

## What went wrong, and it was not the shooting

A generative video model was asked to "keep it real" and it replaced the footage
with invented footage, then delivered ten seconds. That is not the model
misbehaving. **A generative model does not edit your video — it makes a new one.**
"Keep it real" is not a setting it has. Handed material it cannot use, the only
thing it can do is generate.

If you want *your* footage, you need a tool that **cuts**, not one that
**generates**. Cutting is ffmpeg, and it is what produced the five-photo film and
every ranch deliverable in this repo. Nothing in a cut is invented, because nothing
in a cut can be.

## The finding that actually matters

**The clip that reached this session was 480 × 360 at 723 kb/s.** Its own metadata
says `com.apple.quicktime.model: iPad mini (A17 Pro)`.

**That iPad does not record 480 × 360.** So the file that arrived was not the file
that was shot — it was downscaled and re-encoded somewhere in transit, almost
certainly by whatever app it was shared through.

**The original footage is probably fine.** Everything downstream — the softness, the
smeared motion, the reason a model would rather regenerate than use it — traces back
to a transfer, not to a camera and not to the person holding it.

### So, first rule: send the original

- **Do:** AirDrop, the Files app, Google Drive, or an upload that says *Actual Size*.
- **Don't:** send it through a chat thread, or attach it from a messaging app's
  camera roll preview. Those re-encode by default and there is no undo.
- **Check it landed right:** a real 1080p or 4K iPhone/iPad clip of a minute or two
  is **tens of megabytes, often hundreds.** If a 3-minute video arrives at 19 MB,
  it was compressed on the way.

## Measured, from the clip that did arrive

| | |
|---|---|
| Length | 3:01 |
| Seconds sharp enough to use | **26 of 181 — 14%** |
| Where the sharpest seconds are | a TV wall, a gallery wall, and six seconds of close-up glassware |
| Usable walkthrough footage | **none** |

That was measured, not guessed — variance-of-Laplacian per second across all 181
seconds, then the top frames pulled and looked at. Worth knowing: the metric alone
picked a *close-up* as the "best" window, because busy texture scores like sharpness.
**A number is not a look. Always open the frames.**

## The recipe — 90 seconds, one take, phone only

**Before you press record**

1. **Clean the lens.** One wipe. It is the single largest quality gain available and
   it is free.
2. **Turn on every light**, including lamps, and open the blinds. Shoot in daylight
   if the room has any.
3. **Tap and hold** on a mid-tone wall until **AE/AF LOCK** appears. This stops the
   picture from pumping brighter and darker as you walk, which is most of what makes
   phone walkthroughs look amateur.
4. **Shoot at 4K 30, or 1080p 30.** Not 60 — you do not need it and it halves your
   light.
5. **Portrait** if it is going on a phone screen. Landscape only if it is going on a
   listing site.

**The walk**

6. **Both hands. Elbows in against your ribs.** Your body is the tripod.
7. **Walk heel-to-toe, slowly** — about half the speed that feels right. On playback
   it will look normal; at normal speed it looks like a chase.
8. **Hold each room for a slow count of five before you move.** Those still beats are
   the only frames that survive a cut. A continuous pan gives an editor nothing.
9. **Turn from the waist, not the wrists.** One smooth sweep per room, no
   back-and-forth.
10. **Do not narrate while walking.** Footsteps and breath land straight on the mic.
    Record the voice separately, seated, in one take.

**The shot list — 8 to 10 seconds each**

- The door, opening inward — the arrival shot
- The main room, from the doorway, standing still
- The kitchen, one slow sweep counter to counter
- Each bedroom from its doorway
- Each bath, from the doorway only
- The window or balcony — walk *toward* the light, ending on the view
- One detail worth pausing on: the counter, the fixture, the finish

**Then**

11. **Shoot it twice.** The second take is always better and it costs three minutes.
12. **Send both originals**, uncompressed, and say which is which.

From that, a 20–30 second cut takes minutes and every frame in it is real.
