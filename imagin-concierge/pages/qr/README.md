# QR codes

Every file here was **decode-verified with `cv2.QRCodeDetector` on 2026-08-22** —
the URL listed is what actually came back out of the image, not what was intended
going in. Re-verify after any edit; a QR that looks fine and decodes wrong is the
worst possible failure here, because it fails silently in someone else's hand.

| File | Size | Decodes to |
|---|---|---|
| `qr-poster.png` | 2550×3300 | resident board — `aa5db7a7…` |
| `qr-code-only.png` | 900×900 | resident board — `aa5db7a7…` |
| `qr-marc.png` | 1200×1700 | Marc, handyman — `ca8bb479…` |
| `qr-ivan.png` | 1200×1700 | Ivan, used cars — `2a7d347a…` |
| `qr-chloe.png` | 1200×1700 | Chloe, hiring — `2eea24fc…` |
| `qr-rental.png` | 1200×1700 | rental listing — `1f1021fa…` |

`qr-poster.png` is 2550×3300 = **8.5×11 at 300 dpi**. Print it at full size, no
scaling. `qr-code-only.png` is the bare code for dropping into other layouts.

## ⚠️ A correct QR is not a working QR

These point at **Claude artifacts, which are private until shared from the page's
own share menu.** A private page shows a stranger a login wall, and a login wall on
a flyer in a 507-unit building is one shot spent.

**No tool in this repo can check an artifact's sharing state.** The only reliable
test is physical, and it takes ten seconds:

> Scan the code with a phone that is **not signed into Isaac's Claude account** —
> a second phone, or a private/incognito browser. If the page loads, it is live.
> If anything asks to sign in, it is not.

**Do that before anything gets printed or posted.** Not after.

## Why these are committed

They were generated into a session scratch directory, which is ephemeral — when
that container is reclaimed the files are gone and someone regenerates them from
memory, possibly pointing at the wrong artifact. That is the exact way work in this
workspace has gone missing before. They live in git now.
