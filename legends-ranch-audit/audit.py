#!/usr/bin/env python3
"""Read-only crawl of legendsranch.com for the site audit.

Run from a machine with normal outbound HTTPS (see FIX-INSTRUCTIONS.md §2):

    python3 -m venv .venv && source .venv/bin/activate
    pip install playwright && playwright install chromium
    python audit.py

Writes per-page JSON records to ./crawl-results/ and screenshots to
./screenshots/. Read-only: performs GET navigation only, never submits
forms or logs in. Crawl is rate-limited — this is a live business site.
"""

import json
import time
from pathlib import Path
from urllib.parse import urljoin

from playwright.sync_api import sync_playwright

BASE = "https://legendsranch.com"
PATHS = [
    "/", "/about/", "/lodge/", "/wildlife-center/", "/studio/", "/grounds/",
    "/the-hunts/", "/hunts/presidential/", "/hunts/rut-hunt/",
    "/hunts/post-rut-hunt/", "/hunts/turkey-hunt/", "/hunts/youth-challenge/",
    "/hunts/purple-heart/", "/corporate/", "/getting-here/", "/gallery/",
    "/testimonials/", "/contact/",
    # legacy .html spot-check (expected 404 candidates; add more from GSC/logs)
    "/video-legends-hunting-ranch-michigan-trophy-deer-hunts.html",
]
VIEWPORTS = {
    "desktop": {"width": 1366, "height": 900},
    "mobile": {"width": 390, "height": 844},
}
DELAY_SECONDS = 3  # pause between page loads — do not hammer production

OUT = Path("crawl-results")
SHOTS = Path("screenshots")
OUT.mkdir(exist_ok=True)
SHOTS.mkdir(exist_ok=True)


def slug(path: str, viewport: str) -> str:
    s = path.strip("/").replace("/", "_").replace(".", "_") or "home"
    return f"{s}--{viewport}"


def crawl_page(context, path: str, viewport: str) -> dict:
    page = context.new_page()
    record = {
        "url": urljoin(BASE, path),
        "viewport": viewport,
        "console_errors": [],
        "failed_requests": [],
        "responses": [],
    }
    page.on(
        "console",
        lambda msg: record["console_errors"].append(msg.text)
        if msg.type == "error"
        else None,
    )
    page.on(
        "requestfailed",
        lambda req: record["failed_requests"].append(
            {"url": req.url, "error": req.failure}
        ),
    )
    page.on(
        "response",
        lambda resp: record["responses"].append(
            {"url": resp.url, "status": resp.status}
        )
        if resp.status >= 400
        else None,
    )

    try:
        resp = page.goto(record["url"], timeout=45000, wait_until="networkidle")
        record["status"] = resp.status if resp else None
        record["redirect_chain"] = []
        req = resp.request if resp else None
        while req and req.redirected_from:
            req = req.redirected_from
            record["redirect_chain"].insert(0, req.url)

        record["title"] = page.title()
        record["meta_description"] = page.evaluate(
            "document.querySelector('meta[name=description]')?.content ?? null"
        )
        record["embeds"] = page.evaluate(
            """[...document.querySelectorAll('iframe, video, source')].map(el => ({
                tag: el.tagName,
                src: el.src || el.getAttribute('src'),
                title: el.getAttribute('title'),
            }))"""
        )
        record["images_missing_alt"] = page.evaluate(
            """[...document.querySelectorAll('img')]
                .filter(i => !i.alt || !i.alt.trim())
                .map(i => i.currentSrc || i.src)"""
        )
        record["links"] = page.evaluate(
            "[...document.querySelectorAll('a[href]')].map(a => a.href)"
        )
        record["tel_links_above_fold"] = page.evaluate(
            """[...document.querySelectorAll('a[href^="tel:"]')].map(a => {
                const r = a.getBoundingClientRect();
                return {
                    text: a.innerText.trim(),
                    href: a.href,
                    visibleAboveFold: r.width > 0 && r.height > 0 &&
                        r.top >= 0 && r.bottom <= innerHeight,
                };
            })"""
        )
        record["page_weight_bytes"] = page.evaluate(
            """performance.getEntriesByType('resource')
                .reduce((sum, e) => sum + (e.transferSize || 0), 0)"""
        )
        record["heaviest_assets"] = page.evaluate(
            """performance.getEntriesByType('resource')
                .map(e => ({url: e.name, bytes: e.transferSize || 0}))
                .sort((a, b) => b.bytes - a.bytes)
                .slice(0, 5)"""
        )
        record["mixed_content"] = page.evaluate(
            """performance.getEntriesByType('resource')
                .map(e => e.name)
                .filter(u => u.startsWith('http://'))"""
        )
        page.screenshot(
            path=str(SHOTS / f"{slug(path, viewport)}.png"), full_page=True
        )
    except Exception as exc:  # navigation failure is itself a finding
        record["error"] = str(exc)
    finally:
        page.close()
    return record


def main() -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for viewport_name, viewport in VIEWPORTS.items():
            context = browser.new_context(
                viewport=viewport,
                user_agent=(
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/126.0 Safari/537.36"
                )
                if viewport_name == "desktop"
                else None,
            )
            for path in PATHS:
                print(f"[{viewport_name}] {path}")
                record = crawl_page(context, path, viewport_name)
                out_file = OUT / f"{slug(path, viewport_name)}.json"
                out_file.write_text(json.dumps(record, indent=2))
                time.sleep(DELAY_SECONDS)
            context.close()
        browser.close()
    print(f"Done. Results in {OUT}/, screenshots in {SHOTS}/")


if __name__ == "__main__":
    main()
