#!/usr/bin/env bash
# uninstall.sh — Remove hardened user.js & userChrome.css from a profile

set -euo pipefail

blue="\033[1;34m"
green="\033[1;32m"
red="\033[1;31m"
bold="\033[1;37m"
dim="\033[0;37m"
reset="\033[0m"

info()  { echo -e "${blue}▸${reset} $*"; }
ok()    { echo -e "${green}✓${reset} $*"; }
warn()  { echo -e "${red}✗${reset} $*"; }

FFOX_DIR="$HOME/Library/Application Support/Firefox"

echo ""
echo -e "${bold}Profiles with hardened user.js:${reset}"
echo ""

PROFILES=()
for profile_dir in "$FFOX_DIR"/Profiles/*/; do
    [[ -d "$profile_dir" ]] || continue
    if [[ -f "$profile_dir/user.js" ]] && head -3 "$profile_dir/user.js" | grep -q "Firefox Hardened Profile"; then
        name=$(basename "$profile_dir")
        PROFILES+=("$profile_dir")
        idx=${#PROFILES[@]}
        echo -e "  ${idx}) $name"
    fi
done

if [[ ${#PROFILES[@]} -eq 0 ]]; then
    info "No profiles found with this project's user.js."
    exit 0
fi

echo ""
read -rp "Select profile to uninstall from (or 'a' for all): " choice

if [[ "$choice" == "a" ]]; then
    for dir in "${PROFILES[@]}"; do
        rm -f "$dir/user.js"
        rm -f "$dir/chrome/userChrome.css"
        ok "Cleaned: $(basename "$dir")"
    done
else
    idx=$((choice - 1))
    if [[ $idx -lt 0 || $idx -ge ${#PROFILES[@]} ]]; then
        warn "Invalid selection"
        exit 1
    fi
    dir="${PROFILES[$idx]}"
    rm -f "$dir/user.js"
    rm -f "$dir/chrome/userChrome.css"
    ok "Cleaned: $(basename "$dir")"
fi

echo ""
ok "Done. Restart Firefox for changes to take effect."
echo -e "${dim}Note: Some prefs may persist in prefs.js until manually reset via about:config.${reset}"
