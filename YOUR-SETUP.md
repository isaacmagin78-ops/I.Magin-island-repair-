# Your setup

One rule: **the 13-inch iPad Pro is your machine.** Everything else has one job
each, or no job at all.

## Which device, for what

| Device | Its one job | When to pick it up |
|---|---|---|
| **iPad Pro 13"** | Everything | Default. Talking to Claude, reading, approving, sending. Split View: Claude on one side, whatever you're looking at on the other. |
| **iPhone** | The things only you can do | Checking a bio. Clicking a payment link to test it. Deleting a bad post. Texting Linda. |
| **MacBook** | Rendering video, and running Claude on your own files | Almost never. Open it when a video needs to render locally, or when you want `claude rc` pointed at files that live on that machine. |
| **iPad mini** | Not a work surface | Camera, glancing, reading in bed. Two panes on that screen is too cramped to use. |

## The part worth noticing

**Every action that is genuinely blocked on you is a phone job.** Not a
sit-down-at-a-desk job:

1. Open Instagram → look at the bio → which link is in it?
2. Tap your own Stripe link → does the page after payment load, and does the
   PDF download?
3. Delete the two posts from Aug 8 with the caption `Post Text`.

None of those take a laptop. None take more than a minute. They have been the
top of the list for a while precisely because they feel like desk work and
aren't.

## Setup, once

Only what actually matters. Skip the rest.

- **Same Apple ID and two-factor on every device.** Nothing else works without it.
- **Handoff on** (Settings → General → AirPlay & Continuity). This is what lets
  the devices see each other at all.
- **Split View on the iPad Pro** — drag a second Safari window to the screen
  edge. That's it. No Sidecar, no mirroring, nothing to pair.

**Universal Control** (one keyboard and trackpad across the MacBook and iPad) is
worth turning on only when you actually want to type long things on the Mac
keyboard while reading on the iPad. It is not needed for anything above.

**Do not set up Sidecar or screen mirroring.** Mirroring shows the same screen
twice, which is the opposite of what you want, and Sidecar solves a problem you
do not have.

## Why it's this small

The failure mode here has never been missing tools. It was eleven copies of the
truth across eleven branches, four assistants each seeing a third of the
picture, and work deployed from machines with no source committed anywhere.

Adding surfaces made that worse every time. One screen, one repo, one handoff
file — that is the whole fix.

See `WHERE-TO-GO.md` for which assistant to use for what.
