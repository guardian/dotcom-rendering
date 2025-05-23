#!/usr/bin/env bash

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

brew bundle --file=${DIR}/Brewfile
dev-nginx setup-app ${DIR}/nginx-mappings.yaml
dev-nginx setup-cert "profile.thegulocal.com"
dev-nginx link-config ${DIR}/nginx-profile-ci.conf
dev-nginx restart
echo "🌎 Successfully installed local config. https://r.thegulocal.com is now setup."
