# 🦊 firefox-profile

Hardened Firefox profile for macOS — privacy & security preferences pre-set, clean UI via `userChrome.css`.

Inspired by [equk/ffox_profile_tools](https://github.com/equk/ffox_profile_tools) and [arkenfox/user.js](https://github.com/arkenfox/user.js).

## What It Does

Installs a `user.js` and `userChrome.css` into a Firefox profile. Firefox reads `user.js` on every startup and applies the preferences to `prefs.js`, enforcing the hardened settings.

### Privacy & Security

- Disable all telemetry, health reports, crash reporting, Normandy studies
- Block third-party cookies, enable first-party isolation
- Enable tracking protection, Do Not Track, Global Privacy Control (GPC)
- HTTPS-first mode everywhere
- Disable prefetching, DNS prefetch, speculative connections
- Resist fingerprinting (standardized locale, disabled WebRTC/network API)
- Strict certificate pinning, CRLite, OCSP required
- Disable saved passwords and form autofill

### Disabled Features

- Pocket, AI chat/sidebar, smart tab grouping
- Search suggestions and sponsored suggestions
- Geolocation, Picture-in-Picture toggle
- Firefox Safe Browsing remote lookups (local lists still work)
- New tab activity stream (blank new tab)

### Performance

- RAM cache instead of disk cache
- Hardware acceleration forced on

### UI Tweaks (`userChrome.css`)

- Compact square tabs with blue accent indicator
- Find bar moved to top of page
- Tighter bookmark bar spacing
- Fixed URL bar zoom animation
- Cleaner context menus (removed clutter items)

## Quick Start

```bash
git clone https://github.com/ifinkelstein/firefox-profile.git
cd firefox-profile
./install.sh
```

The installer lists your Firefox profiles and lets you pick one interactively.

## Usage

### Install into a profile

```bash
# Interactive picker
./install.sh

# Create a new profile and install
./install.sh --new hardened

# Install into a specific profile directory
./install.sh "abc123.default-release"
```

### Update all installed profiles

After pulling new changes:

```bash
git pull
./update.sh
```

### Uninstall

```bash
./uninstall.sh
```

## Files

| File | Purpose |
|------|---------|
| `user.js` | Hardened Firefox preferences (privacy, security, performance) |
| `chrome/userChrome.css` | UI customizations (compact tabs, clean menus) |
| `install.sh` | Interactive installer for macOS |
| `update.sh` | Update all profiles that have this user.js installed |
| `uninstall.sh` | Remove user.js and userChrome.css from profiles |

## Customization

Edit `user.js` to taste. Each section is clearly commented. Some prefs that may break sites:

| Pref | Effect | If it breaks things |
|------|--------|---------------------|
| `privacy.resistFingerprinting` | Standardizes many browser APIs | Comment out |
| `media.peerconnection.enabled` | Disables WebRTC (breaks video calls) | Set to `true` |
| `dom.event.clipboardevents.enabled` | Blocks clipboard detection | Set to `true` |
| `privacy.firstparty.isolate` | Isolates cookies per domain | Comment out |

Optional prefs (uncomment in `user.js` if wanted):

```js
// Force HTTPS-only (breaks HTTP sites completely)
user_pref("dom.security.https_only_mode", true);

// Dark mode
user_pref("ui.systemUsesDarkTheme", 1);
user_pref("devtools.theme", "dark");

// DNS-over-HTTPS
user_pref("network.trr.mode", 3);
user_pref("network.trr.uri", "https://dns.quad9.net/dns-query");

// Disable WebGL (extra fingerprinting protection)
user_pref("webgl.disabled", true);
```

## How It Works

Firefox has a specific load order for preferences:

1. **`user.js`** — Read on every startup, values written into `prefs.js`
2. **`prefs.js`** — The live preferences database (don't edit directly)
3. **`about:config`** — UI for `prefs.js`; changes persist but `user.js` wins on restart

The `user.js` approach means preferences are enforced on every startup. To change a setting, edit `user.js` — not `about:config`.

## macOS Notes

- Firefox profiles live in `~/Library/Application Support/Firefox/Profiles/`
- The `profiles.ini` file maps profile names to directories
- `userChrome.css` requires `toolkit.legacyUserProfileCustomizations.stylesheets` = `true` (already set in `user.js`)

## License

MIT
