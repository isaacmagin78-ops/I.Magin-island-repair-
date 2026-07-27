/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { existsSync } from "node:fs";
import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(enableTailwind);

// Sandboxed/CI containers may block downloading Remotion's own headless
// Chrome. If a pre-installed Chromium/Chrome is present at this well-known
// path (or via REMOTION_BROWSER_EXECUTABLE), use it instead. On a normal
// machine (e.g. a local Mac) neither will exist and Remotion downloads and
// uses its own headless shell automatically — no action needed.
const fallbackBrowserPath =
  "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
const browserExecutable =
  process.env.REMOTION_BROWSER_EXECUTABLE ??
  (existsSync(fallbackBrowserPath) ? fallbackBrowserPath : undefined);

if (browserExecutable) {
  Config.setBrowserExecutable(browserExecutable);
}
