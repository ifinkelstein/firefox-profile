# 🦊 firefox-profile

Opinionated Firefox `user.js` + `userChrome.css` for macOS. Twin goals: **kill the nags** and **harden security**.

## Install

```bash
git clone https://github.com/ifinkelstein/firefox-profile.git
cd firefox-profile
./install.sh          # interactive profile picker
./update.sh           # re-apply after pulling changes
./uninstall.sh        # remove from profiles
```

## What it does

**Nags removed:** telemetry, Pocket, AI sidebar, sponsored suggestions, new tab clutter, studies/experiments, health reports, crash dialogs, recommendations, weather widget.

**Security hardened:** first-party isolation, tracking protection, HTTPS-first, fingerprinting resistance, WebRTC disabled, third-party cookies blocked, DNS prefetch off, strict cert pinning, GPC enabled, saved passwords disabled.

**UI cleaned up** (`userChrome.css`): compact square tabs, find bar at top, tight bookmarks, no URL bar zoom animation.

## Caveats

Some prefs break things. Check the comments in `user.js` — the likely culprits are `privacy.resistFingerprinting`, `media.peerconnection.enabled` (WebRTC/video calls), and `privacy.firstparty.isolate`.

## Acknowledgments

Standing on the shoulders of [equk/ffox_profile_tools](https://github.com/equk/ffox_profile_tools), [arkenfox/user.js](https://github.com/arkenfox/user.js), and [PrivacyGuides](https://www.privacyguides.org/en/desktop-browsers/#firefox).

## License

MIT
