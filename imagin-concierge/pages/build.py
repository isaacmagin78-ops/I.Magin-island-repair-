#!/usr/bin/env python3
"""
Why this file exists
--------------------
The $99 Quick Win and $499 Launch Kit only make money if a client page takes
minutes, not an evening. This is the stamp: one layout, one token set, and a
JSON brief per client. Adding a client means adding a JSON file — never editing
the template, and never hand-writing HTML again.

The rule it enforces: every fact on a generated page comes from the brief.
A field left empty renders as a visible, honest blank ("ask the owner"), never as
an invented number, price, or phone. That is the repo's no-fabrication rule made
structural — a placeholder cannot silently become a claim.

Run:  python3 build.py            # builds every brief in clients/
"""
import json, pathlib, html, sys

ROOT = pathlib.Path(__file__).parent
OUT  = ROOT / "out"

# ---------------------------------------------------------------- template ---
PAGE = """<title>{title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300&family=JetBrains+Mono:wght@400;600&display=swap">
<style>
:root{{
  --ground:#EDF1F1; --surface:#FFFFFF; --surface-2:#E1E8E8;
  --line:#C5D2D2; --text:#121D22; --muted:#5C6F76;
  --accent:{accent_light}; --accent-soft:{accent_soft_light};
  --shadow:0 1px 0 rgba(18,29,34,.06), 0 12px 30px -18px rgba(18,29,34,.5);
}}
@media (prefers-color-scheme: dark){{
  :root:not([data-theme="light"]){{
    --ground:#0C1418; --surface:#14232B; --surface-2:#1B2E37;
    --line:#28414C; --text:#E6EEEE; --muted:#8AA3AC;
    --accent:{accent_dark}; --accent-soft:{accent_soft_dark};
    --shadow:0 1px 0 rgba(255,255,255,.03), 0 16px 40px -22px #000;
  }}
}}
:root[data-theme="dark"]{{
  --ground:#0C1418; --surface:#14232B; --surface-2:#1B2E37;
  --line:#28414C; --text:#E6EEEE; --muted:#8AA3AC;
  --accent:{accent_dark}; --accent-soft:{accent_soft_dark};
  --shadow:0 1px 0 rgba(255,255,255,.03), 0 16px 40px -22px #000;
}}
*{{box-sizing:border-box}}
body{{margin:0;background:var(--ground);color:var(--text);
  font-family:"Newsreader",Georgia,"Times New Roman",serif;
  font-size:17px;line-height:1.55;-webkit-font-smoothing:antialiased}}
.wrap{{max-width:36rem;margin:0 auto;
  padding:clamp(1.75rem,6vw,3.25rem) clamp(1.15rem,5vw,2rem) 4rem;
  display:flex;flex-direction:column;gap:2.4rem}}
.brand{{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:.66rem;
  letter-spacing:.18em;text-transform:uppercase;color:var(--accent);
  display:flex;align-items:center;gap:.6rem}}
.brand::after{{content:"";flex:1;height:1px;background:var(--line)}}
h1{{font-family:"Bricolage Grotesque","Helvetica Neue",Arial,sans-serif;
  font-weight:800;font-size:clamp(2rem,9vw,2.9rem);line-height:1.03;
  letter-spacing:-.025em;margin:.7rem 0 0;text-wrap:balance}}
h1 em{{font-style:normal;color:var(--accent)}}
.sub{{margin:.9rem 0 0;color:var(--muted);font-size:1.06rem;max-width:34ch}}
h2{{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:.66rem;
  letter-spacing:.16em;text-transform:uppercase;color:var(--muted);
  margin:0 0 .9rem;font-weight:600;display:flex;align-items:center;gap:.6rem}}
h2::after{{content:"";flex:1;height:1px;background:var(--line)}}
.facts{{display:grid;grid-template-columns:repeat(auto-fit,minmax(8.5rem,1fr));
  background:var(--surface);border:1px solid var(--line);border-radius:2px;
  overflow:hidden}}
.fact{{padding:.9rem 1rem;border-right:1px solid var(--line);
  border-bottom:1px solid var(--line);margin:0 -1px -1px 0}}
.fact .k{{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:.6rem;
  letter-spacing:.14em;text-transform:uppercase;color:var(--muted);
  display:block;margin-bottom:.3rem}}
.fact .v{{font-family:"Bricolage Grotesque","Helvetica Neue",Arial,sans-serif;
  font-weight:600;font-size:1.15rem;letter-spacing:-.01em;
  font-variant-numeric:tabular-nums}}
.fact .v.blank{{color:var(--muted);font-weight:400;font-size:.9rem;
  font-family:"Newsreader",Georgia,serif;font-style:italic}}
.frames{{display:grid;grid-template-columns:1fr 1fr;gap:.5rem}}
.frame{{aspect-ratio:4/3;border:1px dashed var(--line);border-radius:2px;
  display:flex;align-items:center;justify-content:center;text-align:center;
  padding:.8rem;color:var(--muted);
  font-family:"JetBrains Mono",ui-monospace,monospace;font-size:.6rem;
  letter-spacing:.1em;text-transform:uppercase;background:var(--surface)}}
.frame.wide{{grid-column:1 / -1;aspect-ratio:16/9}}
.frame.filled{{padding:0;border-style:solid;overflow:hidden}}
.frame.filled img{{width:100%;height:100%;object-fit:cover;display:block}}
.item{{background:var(--surface);border:1px solid var(--line);border-radius:2px;
  box-shadow:var(--shadow);padding:1.05rem 1.15rem;margin:0 0 .65rem}}
.item h3{{font-family:"Bricolage Grotesque","Helvetica Neue",Arial,sans-serif;
  font-weight:600;font-size:1.04rem;line-height:1.25;letter-spacing:-.015em;
  margin:0 0 .45rem;text-wrap:balance;
  display:flex;justify-content:space-between;align-items:baseline;gap:1rem}}
.item h3 .p{{font-family:"JetBrains Mono",ui-monospace,monospace;
  font-size:.78rem;color:var(--accent);white-space:nowrap;
  font-variant-numeric:tabular-nums}}
.item p{{margin:0;color:var(--muted);font-size:.98rem}}
.prose p{{margin:0 0 .9rem;color:var(--muted)}}
.prose p:first-child{{color:var(--text);font-size:1.08rem}}
.cta{{display:block;padding:1.15rem 1.2rem;background:var(--accent-soft);
  border:1px solid var(--accent);border-radius:2px;text-decoration:none;
  color:var(--text)}}
.cta:focus-visible{{outline:2px solid var(--accent);outline-offset:2px}}
.cta .t{{display:block;font-family:"Bricolage Grotesque","Helvetica Neue",Arial,sans-serif;
  font-weight:600;font-size:1.08rem;letter-spacing:-.012em;margin-bottom:.35rem}}
.cta .d{{display:block;color:var(--muted);font-size:.94rem}}
footer{{border-top:1px solid var(--line);padding-top:1.4rem;color:var(--muted);font-size:.9rem}}
footer p{{margin:0 0 .7rem}}
.fine{{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:.66rem;
  line-height:1.7;letter-spacing:.02em;color:var(--muted);opacity:.85}}
.rise{{opacity:0;transform:translateY(10px);animation:rise .55s cubic-bezier(.22,.7,.3,1) forwards}}
.rise:nth-child(1){{animation-delay:.05s}} .rise:nth-child(2){{animation-delay:.13s}}
.rise:nth-child(3){{animation-delay:.21s}} .rise:nth-child(4){{animation-delay:.29s}}
.rise:nth-child(5){{animation-delay:.37s}} .rise:nth-child(6){{animation-delay:.45s}}
@keyframes rise{{to{{opacity:1;transform:none}}}}
@media (prefers-reduced-motion: reduce){{.rise{{animation:none;opacity:1;transform:none}}}}
</style>

<div class="wrap">
  <header class="rise">
    <p class="brand">{brand}</p>
    <h1>{headline}</h1>
    <p class="sub">{subhead}</p>
  </header>
{sections}
  <footer class="rise">
{footer_notes}
    <p class="fine">{fine}</p>
  </footer>
</div>
"""

def esc(s): return html.escape(str(s), quote=False)

def facts(block):
    cells = []
    for f in block["items"]:
        v = f.get("value", "").strip()
        cell = f'<span class="v">{esc(v)}</span>' if v else \
               f'<span class="v blank">{esc(f.get("blank","ask the owner"))}</span>'
        cells.append(f'    <div class="fact"><span class="k">{esc(f["label"])}</span>{cell}</div>')
    return '  <div class="facts">\n' + "\n".join(cells) + "\n  </div>"

def frames(block):
    """A frame item is either a caption string (an honest empty slot) or
    {"caption": ..., "file": ...} — a real photo, embedded as a data URI so the
    published page stays self-contained."""
    import base64, mimetypes
    out = []
    for i, it in enumerate(block["items"]):
        cls = "frame wide" if (i == 0 and block.get("hero", True)) else "frame"
        if isinstance(it, dict) and it.get("file"):
            path = ROOT / it["file"]
            mime = mimetypes.guess_type(str(path))[0] or "image/jpeg"
            b64 = base64.b64encode(path.read_bytes()).decode()
            out.append(f'    <div class="{cls} filled">'
                       f'<img src="data:{mime};base64,{b64}" alt="{esc(it["caption"])}" loading="lazy"></div>')
        else:
            cap = it["caption"] if isinstance(it, dict) else it
            out.append(f'    <div class="{cls}">{esc(cap)}</div>')
    return '  <div class="frames">\n' + "\n".join(out) + "\n  </div>"

def items(block):
    out = []
    for it in block["items"]:
        price = f'<span class="p">{esc(it["price"])}</span>' if it.get("price") else ""
        out.append(f'  <article class="item"><h3>{esc(it["name"])}{price}</h3>'
                   f'<p>{esc(it["note"])}</p></article>')
    return "\n".join(out)

def prose(block):
    return '  <div class="prose">\n' + "\n".join(
        f'    <p>{esc(p)}</p>' for p in block["items"]) + "\n  </div>"

def cta(block):
    return (f'  <a class="cta" href="{esc(block["href"])}">'
            f'<span class="t">{esc(block["title"])}</span>'
            f'<span class="d">{esc(block["note"])}</span></a>')

RENDER = {"facts": facts, "frames": frames, "items": items, "prose": prose, "cta": cta}

def build(brief):
    parts = []
    for sec in brief["sections"]:
        inner = RENDER[sec["kind"]](sec)
        head = f'    <h2>{esc(sec["heading"])}</h2>\n' if sec.get("heading") else ""
        parts.append(f'  <section class="rise">\n{head}{inner}\n  </section>')
    notes = "\n".join(f'    <p>{esc(n)}</p>' for n in brief.get("footer_notes", []))
    return PAGE.format(
        title=esc(brief["title"]), brand=esc(brief["brand"]),
        headline=brief["headline"], subhead=esc(brief["subhead"]),
        accent_light=brief["accent"]["light"], accent_dark=brief["accent"]["dark"],
        accent_soft_light=brief["accent"]["soft_light"],
        accent_soft_dark=brief["accent"]["soft_dark"],
        sections="\n".join(parts), footer_notes=notes,
        fine=brief["fine"].replace("\n", "<br>\n      "))

def main():
    OUT.mkdir(exist_ok=True)
    briefs = sorted((ROOT / "clients").glob("*.json"))
    if not briefs:
        print("no briefs in clients/"); return 1
    for b in briefs:
        brief = json.loads(b.read_text())
        dest = OUT / (b.stem + ".html")
        dest.write_text(build(brief))
        blanks = sum(1 for s in brief["sections"] if s["kind"] == "facts"
                     for i in s["items"] if not i.get("value", "").strip())
        print(f"{dest.relative_to(ROOT)}  ({blanks} blank fact(s) awaiting the owner)")
    return 0

if __name__ == "__main__":
    sys.exit(main())
