# Legends Ranch website audit harness

Diagnostic audit of https://legendsranch.com (read-only, no CMS access).
Deliverables when complete: REPORT.md, FIX-INSTRUCTIONS.md, SUMMARY.txt,
screenshots/ — see the task brief in the session that runs this.

Status: BLOCKED in the original session — that environment's network
policy denied egress to legendsranch.com (proxy CONNECT 403 for curl,
WebFetch, and Playwright alike). Playwright + Chromium launch was
verified working; only the network path was missing.

To resume in a session with network access to legendsranch.com:
  cd legends-ranch-audit && npm install && node test_nav.mjs
If that prints STATUS 200 (or any HTTP status), the path is clear —
proceed with the full crawl per the brief.

Chromium note: launch with
executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
(or whatever version dir exists under /opt/pw-browsers).
