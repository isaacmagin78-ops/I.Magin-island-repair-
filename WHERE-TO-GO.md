# Where to go for what

Isaac runs four assistants — Claude (Code and chat), Kelly (GPT), Flex
(Perplexity), and Gemini. **None of them can see each other.** Each starts from
zero every session. That is not a bug to fix; it is the shape of the thing, and
this file is how to work with it instead of against it.

## The one rule

**Design ability is not the difference between these tools. Access is.**

All of them can draw a good chart. Only one of them can see your Stripe account,
your posting queue, your repo, and your client files. A beautiful diagram with
nothing real in it is worse than useless — it's confidently wrong, which is
harder to catch.

## Routing

| What you need | Go to | Why |
|---|---|---|
| Outside facts — market rates, competitors, what's trending, checking a claim | **Perplexity / Gemini** | Live web search is genuinely their strength. Better than Claude Code at this. |
| A visual with no private data in it — a concept, an explainer, a mockup | **Any of them** | Truly doesn't matter. Perplexity Labs and Claude artifacts both do this well. |
| Anything about *your* business — money, posting, the repo, a client, a live site | **Claude Code** | It is the only one wired into Stripe, Blotato, Vercel, GitHub, Drive, Gmail and Notion. |
| Something you need to *show* someone | **Claude Code**, then share the artifact | Use the `show-it` skill. Real numbers are what make it land. |

## Making the others useful

They aren't stuck being uninformed. **`HANDOFF.md` is one file containing every
verified fact about the business.** Paste it into Perplexity, Gemini or a GPT
chat and it stops guessing.

That is the actual point of consolidating everything onto `main`: not just so
Claude Code remembers, but so any tool can be handed the truth in one message.

## What went wrong before this file existed

- **2026-08-15** — Gemini was asked where the concierge marketing page was. It
  answered correctly, then that page nearly went to Linda Hoyt. It had no way to
  know Linda is a top-producing Sotheby's broker who had *already said yes* to
  something larger, or that a 19-asset package was sitting finished for her.
  Right answer, wrong person, because it could not see the repo.
- Weeks were lost to assuming Claude's Code, Dispatch, Cowork and Chat surfaces
  shared memory. They do not. See `HANDOFF.md`.

**When two assistants disagree, the one that can see the live system wins.**
Check the tool, not the opinion.

---

## 🎙️ What Claude Code can actually do — verified 2026-08-22 from the official docs

**Why this section exists.** Isaac, 2026-08-22: *"I can't go through two different
codes and them having different knowledges. That doesn't make sense."* He is
right, and the cause is mechanical: **every session's training has a cutoff, and
different sessions have different ones.** A session answering a "can Claude do X"
question from memory will be wrong sooner or later, and two sessions will
contradict each other.

> ### The rule: never answer a Claude-feature question from memory. Look it up.
> `code.claude.com/docs` is public and current. Check it, answer from it, and
> **update this section with the date** so the next session does not re-derive it.

### Voice — he already has it, and nobody told him

- **Speaking TO Claude Code works today.** Voice dictation is built in and is
  available to all users, **including Claude Code Desktop and Cowork.**
  - **Hold mode (default):** hold **Space** to record, speech appears as you
    talk, release to finalise.
  - **Tap mode:** tap once to start, tap again to send.
  - Anthropic's own note: most of the Claude Code team codes by speaking, and
    **speech is roughly 3× faster than typing.**
  - **This matters more for Isaac than for most people.** He works by voice on a
    phone constantly, and his dictation arrives badly garbled — which has already
    produced two wrong entries in this repo (an invented surname, and "trusted"
    recorded for a man he does not trust). Native dictation in the tool is likely
    cleaner than whatever is transcribing him now.
- **Claude speaking BACK is not a Claude Code feature.** Voice mode — the
  two-way spoken conversation — is a **Claude chat / mobile app** feature. Same
  trade as everything else in this file: the surface that talks cannot see the
  repo, Stripe or the queue.
- **Workaround to get both:** keep the session that has access and have the Mac
  read it aloud — macOS **System Settings → Accessibility → Spoken Content**.

### Claude Code Desktop — features worth knowing

Parallel sessions with git isolation · integrated terminal and file editor ·
drag-and-drop panes · side chats · **computer use** · Dispatch sessions from his
phone · visual diff review · app previews · PR monitoring · connectors.

⚠️ **"Computer use" is on that list**, which bears directly on a question Isaac has
asked repeatedly — why a session cannot drive his MacBook. **A cloud session like
this one cannot.** Whether the desktop app's computer use does what he remembers
from the night it "took over" is **not verified here** — read the docs and try it
before promising him anything.

**Sources (2026-08-22):**
[Voice dictation](https://code.claude.com/docs/en/voice-dictation) ·
[Desktop app](https://code.claude.com/docs/en/desktop) ·
[Voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode) ·
[What's new](https://code.claude.com/docs/en/whats-new)
