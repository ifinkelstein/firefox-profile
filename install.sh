#!/usr/bin/env bash
# install.sh — Install hardened Firefox profile on macOS
#
# Usage:
#   ./install.sh              # interactive — picks from existing profiles
#   ./install.sh <profile>    # install into a specific profile directory name
#   ./install.sh --new NAME   # create a brand-new profile and install into it

set -euo pipefail

# ── Colors ──────────────────────────────────────────────────────────────────

blue="\033[1;34m"
green="\033[1;32m"
red="\033[1;31m"
bold="\033[1;37m"
dim="\033[0;37m"
reset="\033[0m"

info()  { echo -e "${blue}▸${reset} $*"; }
ok()    { echo -e "${green}✓${reset} $*"; }
warn()  { echo -e "${red}✗${reset} $*"; }

# ── Paths ───────────────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
FFOX_DIR="$HOME/Library/Application Support/Firefox"
PROFILES_INI="$FFOX_DIR/profiles.ini"
FFOX_BIN="/Applications/Firefox.app/Contents/MacOS/firefox"

if [[ ! -d "$FFOX_DIR" ]]; then
    warn "Firefox directory not found at $FFOX_DIR"
    warn "Is Firefox installed?"
    exit 1
fi

# ── Resolve target profile ─────────────────────────────────────────────────

TARGET_PROFILE=""

if [[ "${1:-}" == "--new" ]]; then
    # Create a new profile
    PROFILE_NAME="${2:?Usage: $0 --new PROFILE_NAME}"
    info "Creating new Firefox profile: ${bold}$PROFILE_NAME${reset}"
    "$FFOX_BIN" -CreateProfile "$PROFILE_NAME" 2>/dev/null || true
    # Re-read profiles.ini to find the new profile path
    TARGET_PROFILE=$(grep -A5 "Name=$PROFILE_NAME" "$PROFILES_INI" | grep "^Path=" | head -1 | cut -d= -f2)
    if [[ -z "$TARGET_PROFILE" ]]; then
        warn "Failed to create profile $PROFILE_NAME"
        exit 1
    fi
    TARGET_DIR="$FFOX_DIR/$TARGET_PROFILE"
elif [[ -n "${1:-}" ]]; then
    # Direct profile dir name
    TARGET_DIR="$FFOX_DIR/Profiles/$1"
    if [[ ! -d "$TARGET_DIR" ]]; then
        # Try without Profiles/ prefix
        TARGET_DIR="$FFOX_DIR/$1"
    fi
    if [[ ! -d "$TARGET_DIR" ]]; then
        warn "Profile directory not found: $1"
        exit 1
    fi
else
    # Interactive — list profiles
    echo ""
    echo -e "${bold}Available Firefox profiles:${reset}"
    echo ""

    PROFILES=()
    while IFS= read -r dir; do
        name=$(basename "$dir")
        PROFILES+=("$dir")
        idx=${#PROFILES[@]}
        # Check if user.js already exists
        if [[ -f "$dir/user.js" ]]; then
            echo -e "  ${dim}${idx})${reset} $name ${dim}(user.js exists)${reset}"
        else
            echo -e "  ${idx}) $name"
        fi
    done < <(find "$FFOX_DIR/Profiles" -maxdepth 1 -mindepth 1 -type d 2>/dev/null | sort)

    if [[ ${#PROFILES[@]} -eq 0 ]]; then
        warn "No profiles found. Run Firefox at least once first."
        exit 1
    fi

    echo ""
    read -rp "Select profile number: " choice
    idx=$((choice - 1))

    if [[ $idx -lt 0 || $idx -ge ${#PROFILES[@]} ]]; then
        warn "Invalid selection"
        exit 1
    fi

    TARGET_DIR="${PROFILES[$idx]}"
fi

# ── Confirm ─────────────────────────────────────────────────────────────────

PROFILE_NAME=$(basename "$TARGET_DIR")
echo ""
info "Target profile: ${bold}$PROFILE_NAME${reset}"
info "Directory: $TARGET_DIR"
echo ""

if [[ -f "$TARGET_DIR/user.js" ]]; then
    warn "user.js already exists in this profile!"
    read -rp "Overwrite? (y/N) " confirm
    if [[ "$confirm" != [yY] ]]; then
        info "Aborted."
        exit 0
    fi
fi

# ── Install ─────────────────────────────────────────────────────────────────

# Copy user.js
cp "$SCRIPT_DIR/user.js" "$TARGET_DIR/user.js"
ok "Installed user.js"

# Copy userChrome.css
mkdir -p "$TARGET_DIR/chrome"
cp "$SCRIPT_DIR/chrome/userChrome.css" "$TARGET_DIR/chrome/userChrome.css"
ok "Installed chrome/userChrome.css"

echo ""
ok "Done! Restart Firefox for changes to take effect."
echo ""
echo -e "${dim}To undo: delete user.js and chrome/userChrome.css from the profile directory.${reset}"
