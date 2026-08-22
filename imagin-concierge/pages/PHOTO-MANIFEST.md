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

### Added 2026-08-22 — the water shots are from the COMMON HALLWAY, not the unit

**Isaac: *"That from end of hallway."*** That answers the balcony-or-window
question asked above: **neither.**

🔴 **This is the single most consequential note in this file.**

The wide frame is the best photograph taken all day — sharp, level, no screen,
good light. It shows the **Atlantic on the horizon**, the **Intracoastal on the
right** with private docks and moored boats, waterfront houses under palms, a row
of oceanfront towers, and a neighbouring rooftop of HVAC units in the foreground.

**And it was taken from a common-area hallway window, so it CANNOT be used as the
view from the unit.** Putting a hallway view on a rental page as if it were the
apartment's is the most ordinary lie in real-estate marketing and the fastest way
to lose a tenant at the first showing. `build.py` exists to prevent exactly this
class of thing. **It does not go in the unit's `frames` block.**

⚠️ **Correction to an earlier note in this session.** The living-room hero frame
was described as showing "the city out to the water." **That was my reading of a
compressed chat image and it may be wrong.** Nothing has established that any
water is visible from inside Isaac's apartment. Treat the earlier phrasing as
unverified and do not build copy on it.

**Open, and it decides the headline of the page:**

> **From inside the unit — not the hallway — is any water visible from any window,
> and which room?**

Until that is answered from a photograph taken inside the apartment, the page says
nothing about water. The one aspect actually established from inside is the
**west-facing balcony over South Federal — the sunset side.**

### Where the hallway frame DOES belong

It is a genuinely excellent photograph of **the setting**, and the setting is a
real selling point that costs nobody a lie:

- the **resident board** — this is what the building's own site does not show
- the **I.Magin Concierge** page, as neighbourhood context
- the rental page, **only** in a clearly-labelled building/neighbourhood block —
  never in the unit's own frames, and captioned as the view from the building

It also establishes a neighbourhood fact worth keeping: **the property sits between
the ocean and the Intracoastal**, with both visible from the building.

### 2026-08-22 — a video finally arrived INTACT, and here is exactly why

`IMG_1102.mov` — ✅ probed, frames tonemapped and **looked at**.

| | ruined clip (earlier today) | **IMG_1102.mov** |
|---|---|---|
| Resolution | 480 × 360 | **1920 × 1080** |
| Codec | h264 Baseline | **HEVC Main 10, 10-bit** |
| Colour | SDR | **HDR — bt2020nc / HLG** |
| Bitrate | 767 kb/s | **8,644 kb/s** |
| Size | 947 KB / 5.5 s | 27 MB / 23.3 s |

**~11× the bitrate. Same phone, same day, same person.**

🟢 **The difference is how it was handed over.** The ruined clip came through a
share sheet, which re-encodes by default. **IMG_1102.mov was attached as a file
path.** That is the entire fix, and it is now proven twice in both directions —
this clip intact, the Drive HEIFs intact at 3213 × 5712, and everything sent
through chat or a share sheet degraded or unusable.

> ### The rule, settled: hand over a FILE — a path, or Drive. Never a share sheet.

### The four panoramas — real files, enormous

| Saved as | Original |
|---|---|
| `assets/setting/roof-pano-federal-and-intracoastal.jpg` | **8000 × 3454** |
| `assets/setting/roof-pano-wide-dusk.jpg` | **8000 × 2938** |
| `assets/setting/roof-pano-federal-corridor.jpg` | **7472 × 3870** |
| `assets/setting/intracoastal-docks-to-ocean.jpg` | 4032 × 2268 |
| `assets/setting/roof-still-pool-deck.jpg` | frame from the HDR clip |

Committed at web size (≤2600 px). **Named by content, never by position** — the
standing rule in this file. EXIF was stripped in transit on all four, so there is
no camera or timestamp metadata to lean on; the names are the only index.

⚠️ **All of them are shot from the ROOF** — parapet coping, tile roof edge and
rooftop HVAC are visible in frame. The clip is a roof walk: it pans the property's
**own pool deck**, the neighbouring building, South Federal, and the Intracoastal.

**Same rule as the hallway: this is the BUILDING, not the unit.** It is honest and
valuable as *setting* — it is not the view from the apartment and must never be
captioned as one.

### 🔴 The pattern, stated plainly

**Everything that has arrived as a usable file shows the building.
Everything that shows the apartment arrived in a form that cannot be used.**

The unit interiors — kitchen, living room, master bath, guest bath, master
bedroom, entry hall — are all still chat-only. **One handover of those same files
and the rental page can be built.** Nothing else is blocking it.

## 🔑 THE FILENAME LAW — ten videos, no exceptions

Every video delivered this session, probed 2026-08-22:

| File as delivered | Resolution | Bitrate | Codec |
|---|---|---|---|
| `IMG_3292.MOV` | **1920×1080** | 13,303 kb/s | hevc |
| `IMG_3293.MOV` | **1920×1080** | 13,176 kb/s | hevc |
| `IMG_1100.mov` | **1920×1080** | 8,448 kb/s | hevc |
| `IMG_1102.mov` | **1920×1080** | 8,644 kb/s | hevc |
| `IMG_1102.mov` *(dupe)* | **1920×1080** | 8,644 kb/s | hevc |
| `80911613213__49C9460F….MOV` | 480×360 | 767 kb/s | h264 |
| `80913229352__E2B64EA4….MOV` | 480×360 | 756 kb/s | h264 |
| `80913233735__B84638B3….MOV` | 480×360 | 765 kb/s | h264 |
| `video.MOV` | 480×360 | 723 kb/s | h264 |
| `video.MOV` | 480×360 | 708 kb/s | h264 |

**Five perfect. Five ruined. The split is exactly the filename, with no overlap and
no borderline case.**

> ### `IMG_####` = the original from Photos. Anything else = already re-encoded.
>
> A long-digit name with a GUID (`80913229352__B846…`) is an iOS **Messages**
> attachment. A bare `video.MOV` is a share-sheet export. Both have already been
> downscaled to 480×360 before they ever left the phone, and **there is no undo** —
> the quality is gone, not hidden.

**He can check this himself in one second, without any session's help: look at the
name.** If it does not start `IMG_`, the good version is still in Photos and this
copy should be thrown away rather than sent.

### And the water question is ANSWERED — from his own balcony

Four frames settle it, and one of them is unambiguous: shot **on his balcony**,
with his own living room and kitchen visible through the slider, Tyson and the cat
on the tile. From that same recess the outward frame shows **the marina, boats on
the Intracoastal, the tower line beyond, and the pool directly below.**

⚠️ **Correction, second time on this point.** Earlier this session the balcony was
recorded as *"west-facing over South Federal, not a water view,"* read off the
**ruined 480×360 clip**. These frames show water from the balcony. Either that clip
was shot from a different vantage or in a different direction — **it was 360 px on
its long edge and should not have carried that much weight.**

**What is now established from the unit itself:**

- The balcony **overlooks the marina and the Intracoastal**, with the oceanfront
  tower line on the horizon.
- The **pool is directly below** the balcony.
- The balcony is a **recessed, covered** terrace — shade, and rain cover.

**Honest copy this supports:** *a covered balcony over the marina — boats on the
Intracoastal, the tower line beyond, and the pool directly below.* Still **not**
"oceanfront" and still not "ocean view": the Atlantic sits behind that tower line.
