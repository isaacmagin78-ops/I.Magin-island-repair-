# Troubleshooting

## "Received a status code of 403 while downloading ... Host not in allowlist: remotion.media"

Remotion tries to download its own headless Chrome from `remotion.media` the
first time it renders. In a network-restricted environment (sandboxed
container, locked-down CI) that host may be blocked by egress policy.

**Fix used in this project:** `remotion.config.ts` auto-detects a
pre-installed Chromium at:

```
/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
```

and calls `Config.setBrowserExecutable(...)` to use it instead, via
`existsSync()` — so it only activates when that path exists.

**On a machine without egress restrictions (a normal Mac/PC):** that path
won't exist, the check falls through, and Remotion downloads and manages its
own headless Chrome automatically — no action needed.

**If you're on a different restricted environment** with a different
Chrome/Chromium path, either:
- set the `REMOTION_BROWSER_EXECUTABLE` environment variable to the full
  path of a Chrome/Chromium/headless-shell binary before rendering, or
- edit the `fallbackBrowserPath` constant in `remotion.config.ts`.

## `npx create-video@latest` refuses to scaffold: "Something already exists"

`create-video` will not scaffold into a non-empty directory. If you need to
re-scaffold, run it into an empty temp directory and copy the files in:

```bash
npx create-video@latest --yes --blank --no-tailwind /tmp/video-scaffold
rm -rf /tmp/video-scaffold/.git   # important: don't copy a nested .git
cp -a /tmp/video-scaffold/. ./
```

Always verify no `.git` directory got copied into this project afterward
(`ls -la` — there should be none; this project is tracked by the parent
repo's git, not its own).

## TypeScript errors

Run:

```bash
npx tsc --noEmit
```

Fix reported errors before rendering — Remotion Studio will also surface
these in the browser, but `tsc` is faster to iterate against.

## Studio won't start / port already in use

```bash
npx remotion studio --port 3457
```

Pick a free port explicitly.

## Render succeeds but audio track sounds/looks wrong

Remotion always writes an audio track (silent by default if no `<Audio>` is
used in the composition). This is expected and not an error — `ffprobe` will
show an AAC stream even for a silent composition.

## How to verify a render

After any render, confirm the output is real and correct:

```bash
# 1. File exists and is a valid MP4
file out/<name>.mp4
ls -la out/<name>.mp4

# 2. Technical metadata (resolution, fps, duration, codecs)
ffprobe -v error -show_format -show_streams out/<name>.mp4

# 3. Visual spot-check: pull first/middle/last frames as PNGs
ffmpeg -y -i out/<name>.mp4 \
  -vf "select='eq(n,0)+eq(n,<middle_frame>)+eq(n,<last_frame>)'" \
  -vsync 0 /tmp/frame-check/frame_%02d.png
```

Then actually look at the extracted PNGs (e.g. via the Read tool) — don't
declare a render correct from ffprobe metadata alone.

## Chromium sandbox errors (`No usable sandbox`, `EPERM`)

Some containers run as `root` without user namespaces, which can break
Chrome's sandbox. If you see sandbox-related crashes, Remotion's Chrome mode
already runs without the sandbox in most containerized setups; if it
persists, check whether the environment allows `--no-sandbox` execution and
that `libnss3`, `libatk1.0-0`, `libgbm1`, `libasound2` and related shared
libraries are installed (`apt-get install` list is in `README.md`).

## Missing shared libraries for Chromium

If Chromium fails to launch with errors about missing `.so` files, install:

```bash
apt-get update && apt-get install -y \
  libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 \
  libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2t64 \
  libpango-1.0-0 libcairo2 fonts-liberation
```

(Package names may differ slightly on non-Debian/Ubuntu systems.)
