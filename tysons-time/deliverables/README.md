# Tyson's Time — finished deliverables

Finished films for the Tyson's Time pit-bull-rescue brand. These are committed
here because the render environment is ephemeral: anything not committed is gone
when the container is reclaimed, and because a public raw URL on this repo is the
only reachable way to hand a finished video to Blotato for distribution.

| File | Length | Format | Built from |
|---|---|---|---|
| `tysons-time-little-sister.mp4` | 63s | 1080x1920 H.264 / AAC | `littlesister`, `sibling`, `missvstyson` source clips |

## tysons-time-little-sister.mp4

A long-form story cut — Tyson meeting and living with the kitten — rather than a
short-form clip. Assembled with ffmpeg from three verified source clips.

Every source window used in the edit was chosen off a 1-frame-per-second contact
sheet review, so that a subject is actually in frame for the whole runtime. This
matters: an earlier cut put a caption over a shot of an oven because the source
clip pans away from the animals. Spans excluded for cause:

- `littlesister` 2.2-4.8s and 10.0s+ — camera pans to an oven and a dog food can
- `sibling` 21.9s+ — torn/corrupted frames, then a CapCut outro card
- `missvstyson` — letterboxed 16:9 content inside a 9:16 frame; cropped to
  `720:404:0:438` and blur-padded back to vertical

Two other source clips recovered alongside these (`firstmeets`, `bewildered`)
were **100% black** and were discarded. `blackdetect` did not catch them, because
a burned-in watermark kept the frame under the all-black threshold — they were
only caught by looking at extracted frames.

### The bottom bar is load-bearing

The opaque bar at y=1742 is not decoration. The source clips carry a burned-in
`descript` watermark that lands at y1777-1867 once a 720x1280 source is scaled to
1080x1920. The bar covers it and carries the `@tysons_time` handle instead.

### Do not re-export this through Descript

Descript's publish step stamps its own `descript` watermark onto the output and
downscales 1080x1920 to 720x1280. It is fine as a *fetch* proxy for pulling
source media in, but it cannot be used to host a finished brand film.
