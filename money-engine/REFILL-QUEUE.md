# Runbook — Refill the Tyson's Time posting queue

This is the standing instruction for refilling the queue. It exists so nobody
has to reconstruct the channel IDs, the cadence, or the platform rules from
scratch again.

**Who can run this:** Dispatch, or any surface with the Blotato tools connected.
Claude Code sessions in the cloud container do **not** have those tools — the
queue cannot be refilled from there. Check first; don't assume.

**Before saying anything about the queue, run `blotato_list_schedules`.**
Written figures in this repo go stale within days. Verify, then act.

---

## Paste this into Dispatch

```
Refill the Tyson's Time posting queue. It's empty — verified via
blotato_list_schedules. Last post published Aug 10 23:00Z, so all
channels have been dark since.

Schedule the next 7 days on the cadence that was working:
  17:00Z TikTok · 21:00Z Instagram · 22:30Z Threads · 23:00Z YouTube

Account IDs:
  Instagram @tysonstime            61044   (best channel by ~10x — never skip)
  TikTok    @tysons_time           49211
  YouTube   Tyson's Time           42110
  Threads   @tysonstravels_...      8305
  Facebook                         43069   (dark, no Page linked — skip)

Rules that have already been learned the hard way:
- Instagram: MAX 5 HASHTAGS. Hard API error above that.
- Always cross-post to Instagram. Historically the biggest recurring miss.
- Media must live in Blotato storage. Google Drive URLs never work.
  Existing database.blotato.io/storage/... URLs are reusable forever.
- YouTube requires title + privacyStatus + shouldNotifySubscribers.
- Every caption needs the Amazon Associates disclosure.
- Use the sales page https://tysons-time-kit.vercel.app/ in captions,
  never the raw Stripe link.

Also fix two broken posts from Aug 8 that published with the literal
caption "Post Text" — no Kit link, no Amazon disclosure:
  TikTok  post id 5968806
  YouTube post id 5968795
The missing disclosure is a compliance problem, not just a typo.

When you're done, write what you did into HANDOFF.md in the
isaacmagin78-ops/I.Magin-island-repair- repo on main. That file is now
the shared memory across Code, Dispatch, and Cowork — it already has the
Jul 22-23 recovery and the verified queue state in it. Keep it current so
no session wakes up blind again.
```

---

## Why the dates above will go stale

The "Aug 10" and "empty" figures were verified on **2026-08-14**. If you are
reading this later, re-run `blotato_list_schedules` and update the first
paragraph before pasting. Everything below it — IDs, cadence, platform rules —
stays true.

## After any refill

Update the queue section in `HANDOFF.md` with the verified state and the date
you verified it. That section has been wrong before, and a wrong file is worse
than no file: it sends the next session off confident and mistaken.
