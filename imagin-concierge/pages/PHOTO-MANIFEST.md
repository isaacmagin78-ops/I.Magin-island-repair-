# Photo manifest — Isaac's unit (PH3)

**Why this file exists.** Photos in this workspace have twice been addressed by
*position* — newest-first, sorted by modification time — and twice that shipped the
wrong image, including roof photos onto a laundry punch list. Files that share an
mtime second do not sort stably. **Address media by label, never by position.**
This is the label list.

Everything here was captured **2026-08-22** on Isaac's phone and sent in chat.
Stills measured from this batch arrive at **4032 × 3024**, so the still pipeline is
not being re-encoded — that problem was specific to video.

## Received and labeled

| # | Isaac's label | What it shows | Usable? |
|---|---|---|---|
| 1–2 | *"Second bedroom/office from west side"* | ⚠️ **Label disputed** — both frames read as the **living room** (same TV, fan, art wall, balcony sliders). Aimed high; ~⅔ ceiling. **Do not use until Isaac resolves the label.** | ❌ reshoot |
| 3 | Kitchen, galley corridor | Both cabinet runs, quartz, marble backsplash, tile floor, stainless. Level, chest height. | ✅ **near-final** — clear the right-hand counter |
| 4 | *"Entrance view and kitchen"* | Peninsula, pass-through, range, microwave, entry door | ⚠️ counter clutter; personal items (wallet, keys, sunglasses) in frame |
| 5 | Living room, wide | The wall of glass, balcony, city out to water — **this is the hero frame** | ⚠️ good framing, heavy clutter |
| 6 | *"Living and second bed/office"* | Both zones plus balcony; the office corner becomes the second bedroom | ⚠️ same clutter |
| 7 | **Master bathroom** | Full-height veined porcelain, frameless sliding glass tub enclosure, recessed niche, rain head + slide bar, undermount sink on stone | ✅ **best of the batch** — remove 3 vanity appliances, thin the niche, drop the dark robe at right edge |

## Still owed before the page can be built

1. **Living room, cleared**, from the exact spot in #5.
2. **Balcony looking out.**

## Not for the page — a different job

**A tight close-up of the repaired tub**, showing where the crack and the scratch
were. `ph3-punchlist.vercel.app` carries that item with the note *"photograph it
before it gets touched and say which one it is."* The Kohler technician has already
been and gone (2026-08-21), so this documents a **completed** repair. Photo #7 is a
room shot and **does not** satisfy it.

## Planned, not built

The second bed / office is getting a **five-panel convertible partition,
ceiling-hung, no floor track** — Isaac, 2026-08-22. Good copy for the page: *a
second room that actually closes, with nothing to trip over in the doorway.*
🔴 See `HANDOFF.md` — this may be the same September millwork delivery that carries
the cargo-elevator sizing risk. **Do not describe it on a live page as if it is
installed.** It is not.

## The standing shooting rules

Phone at **chest height, level** — not tilted up. Every light on, blinds open,
daylight. Wipe the lens. **Clear horizontal surfaces** — counters and floor;
vertical things like art and shelves can stay, they read as lived-in. Name each
file as it is sent.


## 2026-08-22 — the Google Drive route WORKS, and the four "Balcony" files do not

✅ **Pipeline verified end to end, 2026-08-22.** Drive `search_files` →
`download_file_content` → base64 decode → `pillow-heif` → JPEG. Files arrive at
**3213 × 5712 HEIF, full resolution, not re-encoded.** This is the transfer path
the shooting brief asks for and it is now proven, not assumed.

**Use it. It is the only route that actually delivers files.**

⚠️ **Photos sent as chat attachments cannot be used to build a page.** They are
visible to a session but are not written to disk, so they cannot be embedded,
cropped, or measured. Every interior shot Isaac sent on 2026-08-22 — kitchen,
living room, master bath, master bedroom, closets, entry hall — arrived this way.
**Seen, not held.** They must be re-sent through Drive before any page can use them.

### What is actually in Drive (opened and looked at, not trusted by name)

| Drive title | What it really is |
|---|---|
| Balcony 1 | Tyson and the cat at the sliding glass door |
| Balcony 3 | same subject, seconds apart |
| Balcony 3 *(a second file, same name)* | near-identical duplicate |
| Balcony 4 | same subject again |

**All four are the same photograph of the dog and the cat pressed against the
glass, shot from the balcony side looking IN.** Not one is a balcony, and not one
is a view. Two separate files share the title "Balcony 3."

**This is the manifest rule proving itself in both directions.** Addressing by
label would have put a dog behind glass into a rental listing; addressing by
position would have been no better. **The only thing that worked was opening the
frames and looking** — the same lesson the variance-of-Laplacian miss taught:
*a number is not a look, and neither is a filename.*

### Where these photos DO belong

They are good pictures of Tyson and the cat at the glass. `balcony-buddies/` exists,
and the resident board already carries **Slot 03 — "Luna's Balcony Buddy."** Route
them there. **Not to the rental page.**

### Still owed, through Drive, not chat

1. Living room cleared, from the spot in frame #5
2. **The balcony shot facing OUT** — camera on the balcony, back to the glass
3. Re-send of kitchen corridor, master bath, master bedroom, entry hall

### Added 2026-08-22 — guest bath

**The unit has TWO bathrooms.** Master (tub/shower, frameless sliding glass,
full-height veined porcelain) and a **guest bath** — floating wood-front vanity
with integrated basin, brushed nickel fixtures, full-width mirror, large-format
tile floor. ⚠️ Sent by chat, so **seen, not held** — still needs to come through
Drive before it can go on a page.

The guest bath frame is the **tidiest room Isaac has photographed**: nothing to
clear, nothing to move. It is close to final as shot.

**"2 baths" is now a known fact about the unit** — but it stays in the `facts`
grid as a blank until Isaac confirms it in writing, per the no-fabrication rule
that `build.py` enforces structurally.

### Added 2026-08-22 — balcony video: 480 × 360 AGAIN

`3e7bcb03-…MOV`, "View from balcony". ✅ Probed with `ffprobe`, frames extracted
and **looked at**, not judged from metadata alone.

| | |
|---|---|
| Video | **480 × 360**, h264 Baseline, **767 kb/s** |
| Duration | 5.5 s, 29.97 fps |
| Rotation | −90° display matrix |
| Audio | AAC stereo **plus an `apac` 4.0 spatial track**, and four Apple `mebx` Core Media Metadata streams |

🔴 **480 × 360 at 767 kb/s is the exact signature of the failed clip in
`SHOOTING-BRIEF.md`** — same dimensions, near-identical bitrate. The Apple spatial
audio and Core Media metadata streams survive, so the container is still the
phone's; **the video track was downscaled somewhere in transit.** The original on
his phone is almost certainly fine. **This has now happened twice.**

**Unusable for a page.** The hero frame needs ~1500 px across; this is 360 px on
its long edge before rotation.

### What the frames do tell us — and it changes the copy

The view faces **west, over South Federal Highway**: parking, a line of palms,
low-rise rooftops, a distant skyline, and a very large sky. Handsome, and it is
plainly the **sunset side**.

⚠️ **It is NOT a water view, and the page must not imply one.** Other frames from
this unit do show water from different windows — so the unit has both aspects, and
each has to be described from the window it actually belongs to. Writing "ocean
view" off this balcony would be exactly the kind of fabrication `build.py` was
built to prevent.

**Honest copy this supports:** *west-facing balcony over the treetops — the sunset
side.* Nothing more.

**Action:** the full-resolution original is still in his Photos. Send **that** to
Drive. Do not re-share the clip that already arrived.

### Added 2026-08-22 — the water aspect is real

A frame shot **through insect screen** (mesh clearly visible across the whole
image) showing the **Atlantic on the horizon**: open blue water behind a band of
low-rise rooftops and heavy palm canopy, with two residential towers in the middle
distance and a tile-roofed house in the near foreground.

**This does not contradict the balcony finding — it completes it.** The balcony
clip faces **west** over South Federal. This frame faces **east to the ocean**. The
unit evidently has both aspects.

⚠️ **Unresolved and it changes the copy: was this taken from the balcony or from a
window?** Nobody has established it, and the honest wording differs —

- from a **window** → *"ocean on the horizon from the east-facing windows"*
- from the **balcony** → the balcony sees both ways, and the west-facing line
  written earlier is incomplete

**What is defensible from the frame either way:** the ocean is visible **over the
treetops, past low-rise rooftops** — a real water view, and plainly **not
beachfront**. Write it that way. A tenant checks this on day one, and "ocean view"
that turns out to be a horizon stripe is the kind of thing that ends a lease
before it starts.

**Also note the screen.** Shooting through insect mesh softens everything and lays
a grid over the image. For the page, the same view has to be shot with the screen
slid open or from the balcony side.
