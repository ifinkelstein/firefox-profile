#!/usr/bin/env bash
# update.sh — Update user.js & userChrome.css in all installed profiles
#
# Finds all Firefox profiles that already have a user.js from this project
# and updates them with the latest version.

set -euo pipefail

blue="\033[1;34m"
green="\033[1;32m"
dim="\033[0;37m"
reset="\033[0m"

info()  { echo -e "${blue}▸${reset} $*"; }
ok()    { echo -e "${green}✓${reset} $*"; }

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
FFOX_DIR="$HOME/Library/Application Support/Firefox"

UPDATED=0

for profile_dir in "$FFOX_DIR"/Profiles/*/; do
    [[ -d "$profile_dir" ]] || continue

    if [[ -f "$profile_dir/user.js" ]]; then
        name=$(basename "$profile_dir")

        # Check if it's our user.js (has our header comment)
        if head -3 "$profile_dir/user.js" | grep -q "Firefox Hardened Profile"; then
            cp "$SCRIPT_DIR/user.js" "$profile_dir/user.js"
            mkdir -p "$profile_dir/chrome"
            cp "$SCRIPT_DIR/chrome/userChrome.css" "$profile_dir/chrome/userChrome.css"
            ok "Updated: $name"
            UPDATED=$((UPDATED + 1))
        fi
    fi
done

if [[ $UPDATED -eq 0 ]]; then
    info "No profiles found with this project's user.js installed."
    info "Run ./install.sh first."
else
    echo ""
    ok "Updated $UPDATED profile(s). Restart Firefox for changes to take effect."
fi
