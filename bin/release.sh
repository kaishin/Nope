#!/usr/bin/env bash

GIT_RELEASE_VERSION=$(git describe --tags --always --abbrev=0)
COMMITS=$(git rev-list HEAD | wc -l)
COMMITS=$(($COMMITS))
UPDATES_FILE="updates.plist"
RELEASES=2
KEY="Extension\\ Updates"
UPDATE_URL="https://github.com/kaishin/Nope/releases/download/${GIT_RELEASE_VERSION}/Nope.safariextz"

/usr/libexec/PlistBuddy -c "Copy ${KEY}:0 ${KEY}:${RELEASES}" "${UPDATES_FILE}"
/usr/libexec/PlistBuddy -c "Set ${KEY}:${RELEASES}:CFBundleVersion ${COMMITS}" "${UPDATES_FILE}"
/usr/libexec/PlistBuddy -c "Set ${KEY}:${RELEASES}:CFBundleShortVersionString ${GIT_RELEASE_VERSION#*v}" "${UPDATES_FILE}"
/usr/libexec/PlistBuddy -c "Set ${KEY}:${RELEASES}:URL ${UPDATE_URL}" "${UPDATES_FILE}"
