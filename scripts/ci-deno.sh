#!/bin/bash

deno run \
	--no-check=remote \
	--allow-net=www.theguardian.com,api.github.com \
	--allow-env="GITHUB_TOKEN" \
	scripts/deno/ophan-components.ts

deno run \
	--no-check=remote \
	--allow-net \
	--allow-env="GITHUB_TOKEN" \
	scripts/deno/thrasher-tracker.ts
