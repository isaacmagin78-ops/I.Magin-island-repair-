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

## Project overview

This repo contains two things:

- **College Launch OS** (root Next.js app): a family "Send-Off college command center" — checklist, parent/student modes, dashboard, timeline, budget, documents, reminders, concierge chatbot.
- **Isaac Video Engine** (`Isaac-Video-Engine/`): a local Remotion video-generation setup with a component library, motion/audio systems, social presets, and a one-command render pipeline (`npm run render:short`). Personal source video clips are gitignored on purpose.
