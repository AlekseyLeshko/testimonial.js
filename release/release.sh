#!/bin/bash
green='\e[0;32m'
red='\e[0;31m'
NC='\e[0m'

log() {
  echo -e ${red}[release]${NC} $1 ${NC}
}

bail() {
  log "$*"
  exit 1
}

IS_PUBLISH_VERSION=true
log "Chech config files"
IS_VALID_CONFIGS=$(node release/check-config-files.js)

if [[ $IS_VALID_CONFIGS == false ]] ; then
  bail "${red}Config files does not invalid"
fi
log "${green}Config files is valid"

node release/inc-version.js
PROJECT_NAME=$(node release/get-project-name.js)
VERSION=$(node release/get-version.js)

[ -n "$IS_PUBLISH_VERSION" ] || bail "ERROR: IS_PUBLISH_VERSION empty"
[ -n "$PROJECT_NAME" ] || bail "ERROR: PROJECT_NAME empty"
[ -n "$VERSION" ] || bail "ERROR: Could not determine version from package.json"
[ -z "`git tag -l v$VERSION`" ] || bail "ERROR: There is already a tag for: v$VERSION"

log $VERSION
log $IS_PUBLISH_VERSION

if [[ $IS_PUBLISH_VERSION == true ]] ; then
  log "Start publish $PROJECT_NAME v$VERSION"

  log "${green}$PROJECT_NAME v$VERSION is a published"
fi
