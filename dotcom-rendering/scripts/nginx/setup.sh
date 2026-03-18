#!/usr/bin/env bash

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

brew bundle --file=${DIR}/Brewfile

dev-nginx setup-app ${DIR}/nginx-mappings.yaml

echo "🌎 Successfully installed config. https://r.thegulocal.com & https://storybook.thegulocal.com is now setup."
