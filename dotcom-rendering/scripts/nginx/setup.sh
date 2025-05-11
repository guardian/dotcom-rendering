#!/usr/bin/env bash

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

brew bundle --file=${DIR}/Brewfile

if [ -n "$CI" ]; then
    dev-nginx setup-app ${DIR}/nginx-mappings-ci.yaml
    echo "🌎 Successfully installed CI config. https://r.thegulocal.com is now setup."
else
    dev-nginx setup-app ${DIR}/nginx-mappings.yaml
    echo "🌎 Successfully installed local config. https://r.thegulocal.com is now setup."
fi
