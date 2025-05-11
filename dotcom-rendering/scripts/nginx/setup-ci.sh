#!/usr/bin/env bash

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

dev-nginx setup-app ${DIR}/nginx-mappings-ci.yaml
echo "🌎 Successfully installed CI config. https://r.thegulocal.com is now setup."
