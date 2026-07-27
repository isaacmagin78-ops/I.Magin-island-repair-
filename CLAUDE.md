# Instructions for Claude

## Session handoff (do this every session)

1. **At the start of every session:** Read `HANDOFF.md` in the repo root before doing anything else. It contains the current state of the project, what was recently done, and what's planned next. Treat it as the continuation of the previous conversation.

2. **Before ending any session where work was done:** Update `HANDOFF.md` with:
   - What was accomplished this session
   - Anything in progress or discussed but not yet built
   - The agreed next steps
   - Any new preferences or decisions Isaac made (style, tone, tools, things he said no to)

   Then commit and push it along with the rest of the work. Keep it current — overwrite stale sections rather than letting the file grow forever. Keep it under ~150 lines.

## Working style Isaac prefers

- Be proactive: lead with the single best recommendation, not a menu of options.
- Answer the question *behind* the question, not just the literal question.
- Keep explanations plain and non-technical unless he asks for detail.
- **Verify with live tool checks before saying anything is broken or asking Isaac to do something.** Never hand him a task a tool can do.
- Ship first, report with live URLs. Don't promise — post, then show the link.

## NEVER-AGAIN RULE: media must be reachable before you post it

A whole batch of posts silently failed for days because videos sat in Google Drive set to **private** — Blotato fetched a Google login page instead of a video ("Failed to read media metadata").

**Before using ANY media URL in a post, confirm it is publicly readable.**

- Google Drive: check with `get_file_permissions`. It MUST include `{"role":"reader","type":"anyone"}`. If it only lists the owner, STOP — it will fail. Ask Isaac to set Share → General access → "Anyone with the link" → Viewer.
- Correct Drive URL form for posting (works for large files once public):
  `https://drive.usercontent.google.com/download?id=FILE_ID&export=download&confirm=t`
  The `uc?export=download` form returns an HTML warning page for big files — do not use it.
- Best practice: prefer media already hosted at `database.blotato.io/storage/...` (any past post's mediaUrl is reusable forever) over Drive links.
- **If you generate or render a video for Isaac (Remotion, Descript, any tool), you own making it postable**: upload it to Blotato or verify public Drive sharing in the same session. Never hand back a file that a posting tool can't read.
- After creating a post, ALWAYS poll `blotato_get_post_status` until it says `published` and report the real URL. A submission ID is not a published post.

## Posting rules learned the hard way (Blotato)

- **Instagram: max 5 hashtags.** More is a hard API rejection.
- Instagram is the strongest channel by ~10x (≈2,200 views vs 42–275 on TikTok) — always cross-post there.
- YouTube posts require `title`, `privacyStatus`, `shouldNotifySubscribers`.
- TikTok requires `privacyLevel` + the boolean flags (comments/duet/stitch/branded/brand/AI).
- **Never let the schedule queue hit zero.** Check `blotato_list_schedules` every session; refill if it's short.
- Every caption carries the Kit link (`https://tysons-time-kit.vercel.app/`) and the Amazon Associates disclosure.
- This environment's proxy blocks `*.vercel.app` and `drive.usercontent.google.com` for plain WebFetch/curl. Use the **Vercel MCP `web_fetch_vercel_url`** tool for Vercel pages. Blotato's own servers are NOT blocked — they fetch Drive URLs fine.

## Project overview

This repo contains two things:

- **College Launch OS** (root Next.js app): a family "Send-Off college command center" — checklist, parent/student modes, dashboard, timeline, budget, documents, reminders, concierge chatbot.
- **Isaac Video Engine** (`Isaac-Video-Engine/`): a local Remotion video-generation setup with a component library, motion/audio systems, social presets, and a one-command render pipeline (`npm run render:short`). Personal source video clips are gitignored on purpose.
