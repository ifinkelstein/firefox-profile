# 🦊 firefox-profile

Opinionated Firefox `user.js` + `userChrome.css` for macOS. Twin goals: **kill the nags** and **harden security**.

Tested on Firefox 148+. Audited against [arkenfox/user.js](https://github.com/arkenfox/user.js) v140.

## Install

```bash
git clone https://github.com/ifinkelstein/firefox-profile.git
cd firefox-profile
./install.sh          # interactive profile picker
./update.sh           # re-apply after pulling changes
./uninstall.sh        # remove from profiles
```

## What it does

**Nags killed:** telemetry, Pocket, AI sidebar, sponsored suggestions, new tab clutter, studies/experiments, health reports, crash dialogs, recommendations, weather widget, PiP toggle, smart tab grouping.

**Security hardened:** Total Cookie Protection (dFPI), Enhanced Tracking Protection, HTTPS-first, GPC, strict cert pinning, CRLite, WebRTC disabled, saved passwords disabled, speculative connections off.

**Downloads:** all files and PDFs save to disk automatically — no open/save dialogs.

**UI cleaned up** (`userChrome.css`): compact square tabs, find bar at top, tight bookmarks, no URL bar zoom.

## What it deliberately does NOT do

- **`privacy.resistFingerprinting`** — too aggressive for daily use (forces GMT, light theme, canvas prompts). Moved to optional section. Modern Firefox uses FPP (fingerprintingProtection) in ETP Strict instead.
- **`privacy.firstparty.isolate`** — deprecated. Enabling it *disables* the newer Total Cookie Protection. Removed per arkenfox guidance.
- **Do Not Track header** — a fingerprinting signal that does more harm than good. ETP handles tracking.
- **Referrer spoofing / cross-origin policy** — breaks CSRF protections and many sites.
- **Clipboard event blocking** — breaks copy/paste on too many sites.

## Caveats

`media.peerconnection.enabled` is `false` (disables WebRTC). Set to `true` if you use browser-based video calls.

## Acknowledgments

[arkenfox/user.js](https://github.com/arkenfox/user.js), [equk/ffox_profile_tools](https://github.com/equk/ffox_profile_tools), [PrivacyGuides](https://www.privacyguides.org/en/desktop-browsers/#firefox).

## License

MIT
