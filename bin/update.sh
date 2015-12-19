#!/usr/bin/env bash

node Nope.safariextension/rules/fetch.js

GIT_RELEASE_VERSION=$(git describe --tags --always --abbrev=0)
COMMITS=$(git rev-list HEAD | wc -l)
COMMITS=$(($COMMITS))
INFOPLIST_FILE="Nope.safariextension/Info.plist"

/usr/libexec/PlistBuddy -c "Set :CFBundleVersion ${COMMITS}" "${INFOPLIST_FILE}"
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString ${GIT_RELEASE_VERSION#*v}" "${INFOPLIST_FILE}"
