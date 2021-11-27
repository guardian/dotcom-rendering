.PHONY: install dev build clean-dist start stop monitor clear

# these means you can run the binaries in node_modules
# like with npm scripts
export PATH := node_modules/.bin:../node_modules/.bin:$(PATH)
export SHELL := /usr/bin/env bash

# messaging #########################################

define log
    @node scripts/env/log $(1)
endef

define warn
    @node scripts/env/log $(1) warn
endef

# deployment #########################################

riffraff-bundle: clean-dist build
	$(call log, "creating riffraff bundle")
	@node ./scripts/deploy/build-riffraff-bundle.js

riffraff-publish: riffraff-bundle
	$(call log, "publishing riff-raff bundle")
	@./scripts/deploy/publish-assets.sh

deploy:
	@env ./scripts/deploy/build-riffraff-artifact.sh

# prod #########################################

build: clean-dist install
	$(call log, "building production bundles")
	@NODE_ENV=production webpack --config ./scripts/webpack/frontend.js

start: install
	@NODE_ENV=production node dist/frontend.server.js

start-ci:
	NODE_ENV=production DISABLE_LOGGING_AND_METRICS=true node dist/frontend.server.js

# dev #########################################

dev: clear clean-dist install
	$(call log, "starting frontend DEV server")
	@NODE_ENV=development nodemon scripts/frontend/dev-server -- --max-old-space-size=7168

# tests #####################################

percy: clear clean-dist install

cypress: clear clean-dist install
	$(call log, "starting frontend DEV server for Cypress")
	@NODE_ENV=development start-server-and-test 'node scripts/frontend/dev-server' 3030 'cypress run --spec "cypress/integration/**/*"'

ampValidation: clean-dist install
	$(call log, "starting frontend DEV server for AMP Validation")
	@NODE_ENV=development start-server-and-test 'node scripts/frontend/dev-server' 3030 'node scripts/test/amp-validation.js'

buildCheck:
	$(call log, "checking build files")
	@node ./scripts/test/build-check.js

# quality #########################################

tsc: clean-dist install
	$(call log, "checking for type errors")
	@tsc

fix: clear clean-dist install
	$(call log, "attempting to fix lint errors")
	@yarn lint --fix
	@yarn prettier:fix

snapshot: clear clean-dist install
	$(call log, "taking snapshots")
	yarn chromatic

lint: clean-dist install
	$(call log, "checking for lint errors")
	@yarn lint

stylelint: clean-dist install
	$(call log, "checking for style lint errors")
	@stylelint "src/**/*.ts{,x}"

test: clean-dist install
	$(call log, "running tests")
	@yarn test:ci --verbose
	$(call log, "everything seems 👌")

test-ci: clear clean-dist install
	$(call log, "running tests")
	@yarn test:ci --verbose --collectCoverage --coverageReporters=lcov

bundlesize: clear clean-dist install build
	@bundlesize

validate: clean-dist install tsc lint stylelint test validate-build
	$(call log, "everything seems 👌")

validate-prepush:
	@run-p tsc prettier:check lint-staged "test:ci -- --verbose --onlyChanged"

validate-ci: install tsc lint stylelint test-ci bundlesize
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
	@yarn --silent

reinstall: clear clean-deps install
	$(call log, "dependencies have been reinstalled ♻️")

validate-build: # private
	$(call log, "checking bundling")
	@rm -rf dist
	@NODE_ENV=production webpack --config ./scripts/webpack/frontend.js

check-env: # private
	$(call log, "checking environment")
	@node scripts/env/check-node.js
	@node scripts/env/check-yarn.js

clear: # private
	@clear

gen-schema:
	$(call log, "Generating new schema")
	@node scripts/json-schema/gen-schema.js
	@git add src/model/json-schema.json

gen-fixtures:
	$(call log, "Generating new article fixture data")
	@node scripts/test-data/gen-fixtures.js

perf-test:
	@node scripts/perf/perf-test.js

arch-diagram:
	@npx arkit

snyk:
	@snyk wizard
