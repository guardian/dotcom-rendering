.PHONY: install dev build clean-dist clear

# these means you can run the binaries in node_modules
# like with npm scripts
export PATH := node_modules/.bin:../node_modules/.bin:$(PATH)
export SHELL := /usr/bin/env bash

# messaging #########################################

define log
    @node ../scripts/log $(1)
endef

define warn
    @node ../scripts/log $(1) warn
endef

# deployment #########################################

# https://www.npmjs.com/package/aws-cdk#cdk-synthesize
cdk-synth:
	@pnpm cdk synth --path-metadata false --version-reporting false

# https://www.npmjs.com/package/aws-cdk#cdk-diff
cdk-diff:
	@pnpm cdk diff --path-metadata false --version-reporting false --profile frontend

riffraff-bundle: clean-dist build cdk-synth
	$(call log, "creating riffraff bundle")
	@node ./scripts/deploy/build-riffraff-bundle.mjs

# prod #########################################

build: clean-dist install
	$(call log, "building production bundles")
	@NODE_ENV=production webpack --config ./webpack/webpack.config.js --progress
	$(call log, "generating Islands report card")
	@node ./scripts/islands/island-descriptions.mjs

prod:
	@echo 'starting PROD server...'
	@echo '' # just a spacer
	NODE_ENV=production node dist/server.js

ci: export DISABLE_LOGGING_AND_METRICS = true
ci: prod

# dev #########################################

dev: clear clean-dist install
	$(call log, "starting DEV server")
	@NODE_ENV=development webpack serve --config ./webpack/webpack.config.js

dev-variant: clear clean-dist install
	$(call log, "starting DEV server")
	@NODE_ENV=development BUILD_VARIANT=true webpack serve --config ./webpack/webpack.config.js

dev-debug: clear clean-dist install
	$(call log, "starting DEV server and debugger")
	$(call log, "Open chrome://inspect in Chrome to attach to the debugger")
	@NODE_ENV=development NODE_OPTIONS="--inspect" webpack serve --config ./webpack/webpack.config.js

# storybook #########################################

storybook-dev: clear clean-dist install
	$(call log, "starting Storybook DEV server")
	@pnpm storybook

storybook: storybook-dev

# tests #####################################

playwright-run:
	$(call log, "starting DEV server and running Playwright tests")
	@pnpm playwright:run

playwright-open: clear clean-dist install build
	$(call log, "starting DEV server and opening Playwright UI")
	@pnpm playwright:open

buildCheck:
	$(call log, "checking build files")
	@node ./scripts/test/build-check.js

# quality #########################################

tsc: clean-dist install
	$(call log, "checking for type errors")
	@tsc

lint-fix:
	$(call log, "attempting to fix lint errors")
	@pnpm lint:fix

prettier:
	$(call log, "attempting to fix prettier errors")
	@cd .. && pnpm prettier:write

fix: clear clean-dist install lint-fix prettier
	$(call log, "everything fixed")

snapshot: clear clean-dist install
	$(call log, "taking snapshots")
	@pnpm chromatic

lint: clean-dist install
	$(call log, "checking for lint errors")
	@pnpm lint:check

lint-project: check-env
	$(call log, "linting project")
	@node scripts/check-node-versions.mjs
	@node scripts/env/check-deps.js
	@node scripts/env/check-files.js

stylelint: clean-dist install
	$(call log, "checking for style lint errors")
	@stylelint "src/**/*.ts{,x}"

test: clean-dist install
	$(call log, "running tests")
	@pnpm test:ci --verbose
	$(call log, "everything seems 👌")

test-ci: clear clean-dist install
	$(call log, "running tests")
	@pnpm test:ci --verbose --collectCoverage --coverageReporters=lcov

validate: clean-dist install lint-project tsc lint stylelint test validate-build
	$(call log, "everything seems 👌")

validate-ci: install lint-project tsc lint stylelint test-ci
	$(call log, "everything seems 👌")

# helpers #########################################

clean-dist:
	@rm -rf dist
	@rm -rf target

clean-deps:
	$(call log, "trashing dependencies")
	@rm -rf node_modules

install: check-env
	$(call log, "refreshing dependencies")
	@cd .. && pnpm install --frozen-lockfile

reinstall: clear clean-deps install
	$(call log, "dependencies have been reinstalled ♻️")

validate-build: # private
	$(call log, "checking bundling")
	@rm -rf dist
	@NODE_ENV=production webpack --config ./webpack/webpack.config.js

check-env: # private
	$(call log, "checking environment")
	@cd .. && scripts/env/check-node
	@cd .. && scripts/env/check-package-manager

clear: # private
	@clear

check-schemas:
	$(call log, "Checking schemas")
	@node scripts/jsonSchema/checkSchemas.mjs

gen-schemas:
	$(call log, "Generating new schemas")
	@node scripts/jsonSchema/genSchemas.mjs

check-stories:
	$(call log, "Checking Storybook stories")
	@node scripts/gen-stories/check-stories.mjs

gen-stories:
	$(call log, "Generating new Storybook stories")
	@node scripts/gen-stories/gen-stories.mjs
	@git add stories/generated

gen-fixtures:
	$(call log, "Generating new fixture data")
	@pnpm tsx scripts/test-data/gen-fixtures.js

audit: clean-dist install
	$(call log, "auditing dependencies")
	@pnpm audit
