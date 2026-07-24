# Legends Ranch — Developer Verification and Fix Instructions

These instructions are designed for the Fish and Hunt USA / WordPress developer. Verify first; only apply a fix after reproducing the defect.

## 1. Homepage Vimeo verification

### Browser test

1. Open Chrome Incognito.
2. Open DevTools → Network.
3. Enable Preserve log and Disable cache.
4. Filter by vimeo, player, iframe, and video.
5. Load https://legendsranch.com/.
6. Scroll to Why hunt at Legends Ranch?.
7. Click Watch the Film.
8. Record:
   - iframe src
   - Vimeo numeric video ID
   - HTTP status of player.vimeo.com/video/{ID}
   - status of Vimeo config/player API requests
   - exact Console error text
   - screenshot before and after clicking

### DOM test in Console

Paste:

```js
[...document.querySelectorAll('iframe, video, source')].map(el => ({
  tag: el.tagName,
  src: el.src || el.getAttribute('src'),
  title: el.getAttribute('title'),
  outerHTML: el.outerHTML
}));
```

### WordPress location

Because the active theme is reported as fish-and-hunt-usa, inspect in this order:

1. WordPress Admin → Pages → Home → Edit
2. Check native blocks, Elementor/WPBakery modules, ACF flexible-content fields, or a custom "video/film" module.
3. If not stored in page content, inspect the active theme/template files:
   - wp-content/themes/fish-and-hunt-usa/front-page.php
   - wp-content/themes/fish-and-hunt-usa/home.php
   - wp-content/themes/fish-and-hunt-usa/page-home.php
   - wp-content/themes/fish-and-hunt-usa/template-parts/
   - relevant ACF field group assigned to the homepage
4. Search source for:
   - player.vimeo.com
   - vimeo
   - Why hunt at Legends Ranch
   - Watch the Film

### Apply only the matching fix

- **404 / deleted Vimeo ID:** replace the numeric video ID with the owner-approved live Vimeo asset.
- **Private video:** Vimeo → video settings → Privacy → permit embedding on legendsranch.com and www.legendsranch.com.
- **Domain restriction:** add both apex and www hostnames to Vimeo's allowed domains.
- **CSP block:** update the site/server CSP to permit at minimum:

```text
frame-src 'self' https://player.vimeo.com;
script-src 'self' https://player.vimeo.com https://f.vimeocdn.com;
connect-src 'self' https://*.vimeo.com https://*.vimeocdn.com;
img-src 'self' data: https://*.vimeocdn.com;
media-src 'self' blob: https://*.vimeocdn.com;
```

Merge these into the existing policy; do not replace the entire CSP blindly.

- **Lazy-load conflict:** exclude the Vimeo iframe and its wrapper from iframe/video delay in the active cache/performance plugin. Common controls are "Delay JavaScript," "LazyLoad iframes," and "Replace YouTube/Vimeo iframe with preview image." Purge all caches afterward.
- **Overlay/button JS error:** inspect the click handler and modal selector. Confirm the trigger targets the existing modal ID and that the Vimeo iframe is inserted before playback is called.
- **Mixed content:** replace every http://player.vimeo.com/... reference with https://player.vimeo.com/....

## 2. Run the complete read-only crawl

From a machine with unrestricted outbound HTTPS:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install playwright
playwright install chromium
python audit.py
```

The supplied audit.py is configured for the requested URLs, desktop/mobile viewports, resource status capture, iframe/image/link extraction, console logging, screenshots, and performance entries.

For production-quality Core Web Vitals, run Lighthouse separately for every URL:

```bash
npx lighthouse https://legendsranch.com/hunts/presidential/ \
  --output=json \
  --output-path=./presidential-mobile.json \
  --form-factor=mobile \
  --throttling-method=simulate \
  --chrome-flags='--headless --no-sandbox'

npx lighthouse https://legendsranch.com/hunts/presidential/ \
  --output=json \
  --output-path=./presidential-desktop.json \
  --preset=desktop \
  --chrome-flags='--headless --no-sandbox'
```

Repeat for all pages in scope. Record the measured LCP, CLS, and TBT. Do not substitute estimates.

## 3. Contact form end-to-end test

A true delivery test changes production data and sends email, so obtain owner approval first.

1. Open https://legendsranch.com/contact/ in Incognito.
2. DevTools → Network → filter xhr, fetch, admin-ajax, gform, and wp-json.
3. Submit an explicitly labeled test inquiry:
   - Name: Website Audit Test — Delete
   - Email: an owner-approved controlled address
   - Phone: an owner-approved test number
   - Message: Authorized website form delivery test. Please delete.
4. Confirm all four stages:
   - visible browser success confirmation
   - request returns HTTP 200/2xx
   - entry appears in the form plugin's Entries screen
   - notification reaches legends@legendsranch.com
5. Verify reply-to points to the visitor email, not the WordPress server address.
6. Delete the test entry after confirmation.

Likely admin locations:

- Gravity Forms: Forms → Forms → Entries / Settings → Notifications
- WPForms: WPForms → Entries / Settings → Notifications
- Contact Form 7: Contact → Contact Forms → Mail; add Flamingo if entries are not stored

The exact plugin is unverified and must be identified before editing.

## 4. Mobile phone CTA test

For each hunt page, emulate a 390 × 844 viewport and run:

```js
[...document.querySelectorAll('a[href^="tel:"]')].map(a => {
  const r = a.getBoundingClientRect();
  return {
    text: a.innerText.trim(),
    href: a.href,
    top: r.top,
    visibleAboveFold: r.width > 0 && r.height > 0 && r.top >= 0 && r.bottom <= innerHeight
  };
});
```

Required pages:

- /hunts/presidential/
- /hunts/rut-hunt/
- /hunts/post-rut-hunt/
- /hunts/turkey-hunt/
- /hunts/youth-challenge/
- /hunts/purple-heart/

If no above-fold tap target exists, add this inside the mobile hunt-page hero CTA group:

```html
<a class="hunt-hero__phone" href="tel:+12317458000">Call the Ranch: 231-745-8000</a>
```

Do not render a phone number as plain text only.

## 5. Legacy .html redirect mapping

Do not guess legacy URLs. Build the source list from:

1. Google Search Console → Pages → Not found (404)
2. GA4 landing pages containing .html
3. Server access logs returning 404
4. XML/HTML sitemap archives
5. Backlink export from the site's SEO tool

For every legacy URL with a clear current equivalent, add an exact 301. Example only, pending verification:

```apache
Redirect 301 /video-legends-hunting-ranch-michigan-trophy-deer-hunts.html /gallery/video-gallery/
```

The target above is unverified. Confirm the closest equivalent page before deployment.

Preferred WordPress options:

- Server-level redirect in Apache/Nginx configuration
- Redirection plugin → Tools → Redirection
- SEO plugin redirect manager, if already licensed and active

Avoid wildcard redirects that send unrelated legacy pages to the homepage.

## 6. Deployment verification

After any approved change:

1. Purge WordPress/cache plugin cache.
2. Purge CDN cache.
3. Retest in Incognito on desktop and mobile.
4. Confirm no new Console errors.
5. Confirm video, CTA, and form behavior.
6. Record before/after screenshots and network logs.
7. Check that no page title, canonical URL, schema, or analytics tag changed unexpectedly.
