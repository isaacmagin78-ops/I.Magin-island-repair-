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
