---
name: show-it
description: Turn one of Isaac's ideas, offers, or situations into a single shareable visual page built around real diagrams. Use when he says he wants to show someone something, explain what he's thinking, pitch a client, or when a written answer has run long enough that a picture would carry it better. Also use whenever he asks for "visuals," a "story," or says he can't follow something in text.
---

# Show it, don't explain it

Isaac's bottleneck is not thinking — it is getting what he's thinking **out of
his head and in front of another person**. He pitches constantly: sellers,
agents, small-business owners, family who refer him work. Every time he has to
explain in prose, he loses.

The fix is a picture with his real numbers in it. Not decoration — a diagram
that carries the argument.

## When to reach for this

- He says "show," "visualize," "explain what I'm thinking," or names an audience
  (Linda, Mom, Arturo, a client, a seller).
- He's overwhelmed and a written status update would add to the pile.
- An answer is running past ~300 words and the substance is a mechanism, a flow,
  a comparison, or a set of numbers that move.

**Do not** reach for it when a sentence is genuinely faster. A picture of one
fact is worse than the fact.

## What actually makes these work

The drawing is the easy part. **The value is in the numbers**, and the numbers
come from live tools, not from memory or from `HANDOFF.md`:

- Money → Stripe (`GetCheckoutSessions` as well as `GetPaymentIntents` — an
  abandoned checkout never becomes a PaymentIntent, and reading only the latter
  produces a badly wrong diagnosis)
- Posting, reach, engagement → Blotato (`blotato_list_top_posts`,
  `blotato_list_schedules`, `blotato_list_posts`)
- Live pages → Vercel MCP `web_fetch_vercel_url` (plain curl is proxy-blocked)
- Repo state → git

Check `date -u` before any claim about "now."

## How to build one

1. **Find the single claim.** One page, one argument. "The machine works but the
   money doesn't come out." "One shoot produces a whole campaign." If you can't
   say it in a sentence, you don't have the picture yet.
2. **Two or three diagrams, maximum.** Each one makes one point. Hand-authored
   inline `<svg>` — no libraries, no generated images.
3. **Put the real numbers inside the drawing.** `22,900`, `25`, `24`, `1`,
   `Jul 31`. Specific beats clever, and specific is what makes it credible to
   whoever he shows it to.
4. **Caption every figure** with the takeaway, not a description of the shapes.
5. **End with what to do** — three actions at most, each one sentence.
6. **Publish as an Artifact** and give him the link. He shares it from the page's
   share menu. Also commit the HTML into the repo when it belongs to a project.

## House style

Match the audience, not a template:

| Audience | Register |
|---|---|
| Luxury real estate (Linda, sellers) | Deep navy + champagne gold, serif display, generous space. See `Listing-Content-System/out/111-pompano-beach-611/pitch-visual.html`. |
| Trades and small business (concierge buyers) | Work-order look: bond paper, blueprint-blue rules, prices in a mono column. See `imagin-concierge/index.html`. |
| Isaac himself (status, diagnosis) | Calm and clinical. Semantic color only — red where something is broken, nothing decorative. |

Always: both light and dark themes via `:root` tokens, `overflow-x:auto` on any
wide figure, `role="img"` plus `aria-label` on every `<svg>`.

## The rules that don't bend

- **Never invent a number, a testimonial, or a result.** If it isn't verifiable,
  label it a hypothesis on the page — as the Jul 31 link change is.
- **Never name a client without authorization.** Describe the work instead.
  Linda's assets are the exception: they are *for* her and carry her sign-off
  requirement in the footer.
- State what you could not verify, on the page, in the footer.

See the root `CLAUDE.md` for the full content rules.
