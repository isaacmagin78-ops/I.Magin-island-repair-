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
this one cannot.** The desktop app's computer use can — see the next section,
which was read from the docs rather than remembered.

### Dispatch and computer use — what he stumbled on, read from the docs 2026-08-22

**Isaac, 2026-08-22:** *"I could've sworn... there was something where we were —
or was it Dispatch, Cowork — some feature I stumbled on in Dispatch."*

**He did stumble on something real, and it is two separate features.**

**1. Dispatch — messaging Claude from his phone and having it work on the Mac.**

- Dispatch is *a persistent conversation with Claude that lives in the Cowork
  tab* of the desktop app. He messages it a task and **it decides how to handle
  it.**
- If the task is development work it **spawns a Claude Code session on his Mac
  by itself** — bug fixes, dependency updates, tests, pull requests. Research,
  documents and spreadsheets stay in Cowork.
- That session shows in the Code tab sidebar with a **Dispatch badge**, and he
  gets **a push notification on his phone when it finishes or needs approval.**
- **Pro or Max only.** Not on Team or Enterprise.

**2. Computer use — Claude opening his apps and controlling his screen.**

- Docs, verbatim: *"lets Claude open your apps, control your screen, and work
  directly on your machine the way you would"* — for GUI-only tools with no CLI.
- **Research preview, macOS and Windows, Pro or Max, and the desktop app must be
  running.** Off by default.
- Turning it on: **Settings → General (under Desktop app) → Computer use**, then
  on macOS grant **Accessibility** and **Screen Recording**.
- Claude tries the precise tool first and falls back to screen control last.
  Per-app caps: **browsers are view-only, terminals and IDEs are click-only.**
- Dispatch-spawned sessions can use it too, but **app approvals there expire
  after 30 minutes** instead of lasting the session.

> ### 🚨 The warning that goes with it — say this before he enables anything
>
> The docs say it plainly: unlike the sandboxed Bash tool, **computer use runs on
> his actual desktop with access to whatever he approves**, and the trust
> boundary is different. Claude flags possible prompt injection from what is on
> screen, but this is the one Claude feature where a bad instruction on a web
> page is looking at his real machine.
>
> **His standing rule still applies: a permission prompt gets "Later" by
> default.** Accessibility and Screen Recording are exactly what this feature
> needs — so grant them *at the moment he actually tries it*, not in advance, and
> revoke them in System Settings if he stops using it.

**Unverified, and label it that way if it comes up:** whether computer use could
read a Ring camera feed open on his Mac screen. It controls the screen, not a
camera — so a Ring window already open is the only plausible route, and nobody
has tested it. Do not promise it.

**3. Remote Control — the third one, and the one he found himself 2026-08-23.**

He tapped **Add device** in the Code tab and got a dialog reading *"Set up remote
control — in a terminal, open the project you want Claude to work in and run this
command to connect your device: `claude rc`."* Read from the docs, not guessed:

- **What a "device" is:** his own machine. Every session in his list today shows a
  **cloud icon** — those run on Anthropic's computers, not his. Adding a device
  connects the MacBook so a session runs *there*.
- **The code stays on his machine.** Docs: *"Claude keeps running locally the
  entire time, so your code execution and filesystem access stay on your
  machine."* His filesystem, his MCP servers, his project config.
- **Both surfaces stay in sync** — he can type in the terminal, the iPad and the
  browser interchangeably, in the same session.
- **Available on all plans.** No Pro/Max gate, unlike Dispatch and computer use.
- Traffic is TLS through the Anthropic API, with short-lived scoped credentials.

**The three are different things — do not conflate them for him:**

| | What it is |
|---|---|
| **Dispatch** | He messages from the phone; Claude *starts* work on the desktop by itself. |
| **Computer use** | Claude opens apps and controls the *screen*. |
| **Remote Control** | One session running on his Mac that he can drive from any device. |

**Remote Control is the closest match to what he has actually been asking for** —
a session that can see his real files rather than a cloud clone. It needs the
MacBook, a terminal, and one command typed in the project folder. **Not a
phone-in-the-jacuzzi task; hand it to him when he is at the desk.**

**Sources (2026-08-22, Remote Control added 2026-08-23):**
[Desktop app — computer use](https://code.claude.com/docs/en/desktop#let-claude-use-your-computer) ·
[Desktop app — sessions from Dispatch](https://code.claude.com/docs/en/desktop#sessions-from-dispatch) ·
[Remote Control](https://code.claude.com/docs/en/remote-control)

**Sources (2026-08-22):**
[Voice dictation](https://code.claude.com/docs/en/voice-dictation) ·
[Desktop app](https://code.claude.com/docs/en/desktop) ·
[Voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode) ·
[What's new](https://code.claude.com/docs/en/whats-new)
