.PHONY: install dev dev-legacy build clean-dist start stop monitor clear

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

cdk-synth:
	@yarn cdk:synth

riffraff-bundle: clean-dist build cdk-synth
	$(call log, "creating riffraff bundle")
	@node ./scripts/deploy/build-riffraff-bundle.mjs

riffraff-publish: riffraff-bundle
	$(call log, "publishing riff-raff bundle")
	@./scripts/deploy/publish-assets.sh

deploy:
	@env ./scripts/deploy/build-riffraff-artifact.sh

# prod #########################################

build: clean-dist install
	$(call log, "building production bundles")
	@NODE_ENV=production webpack --config ./scripts/webpack/webpack.config.js --progress
	$(call log, "generating Islands report card")
	@node ./scripts/islands/island-descriptions.mjs


build-ci: clean-dist install
	$(call log, "building production bundles")
	@NODE_ENV=production webpack --config ./scripts/webpack/webpack.config.js

start-ci: install
	$(call log, "starting PROD server...")
	@NODE_ENV=production DISABLE_LOGGING_AND_METRICS=true node dist/server.js

start: install
	$(call log, "starting PROD server...")
	@echo '' # just a spacer
	NODE_ENV=production pm2 start dist/server.js -i max
	@echo '' # just a spacer
	$(call log, "PROD server is running")
	@NODE_ENV=production pm2 logs

# Used in cloudformation.yml which specifically:
# - Launches pm2 from /usr/local/node rather than /node_modules
# - Does not run 'install' task as its not needed & adds time to startup
start-prod:
	$(call log, "starting PROD server...")
	@echo '' # just a spacer
	NODE_ENV=production /usr/local/node/pm2 start dist/server.js -i max
	@echo '' # just a spacer
	$(call log, "PROD server is running")

stop:
	@pm2 kill

monitor:
	@pm2 monit

logs:
	@pm2 logs

run: stop build start

run-ci: stop build-ci start-ci


# dev #########################################

dev: clear clean-dist install
	$(call log, "starting DEV server")
	@NODE_ENV=development webpack serve --config ./scripts/webpack/webpack.config.js

dev-variant: clear clean-dist install
	$(call log, "starting DEV server")
	@NODE_ENV=development BUILD_VARIANT=true webpack serve --config ./scripts/webpack/webpack.config.js

dev-legacy: clear clean-dist install
	$(call log, "starting DEV server")
	@NODE_ENV=development BUILD_LEGACY=true webpack serve --config ./scripts/webpack/webpack.config.js

dev-debug: clear clean-dist install
	$(call log, "starting DEV server and debugger")
	$(call log, "Open chrome://inspect in Chrome to attach to the debugger")
	@NODE_ENV=development NODE_OPTIONS="--inspect" webpack serve --config ./scripts/webpack/webpack.config.js

# storybook #########################################

storybook-dev: clear clean-dist install
	$(call log, "starting Storybook DEV server")
	yarn storybook

# tests #####################################

cypress: clear clean-dist install build
	$(call log, "starting PROD server for Cypress")
	@NODE_ENV=production NODE_OPTIONS="--max-old-space-size=8192" DISABLE_LOGGING_AND_METRICS=true start-server-and-test 'node dist/server.js' 9000 'cypress run --spec "cypress/e2e/**/*"'

cypress-open: clear clean-dist install build
	$(call log, "starting PROD server and opening Cypress")
	@NODE_ENV=production DISABLE_LOGGING_AND_METRICS=true start-server-and-test 'node dist/server.js' 9000 'cypress open --e2e --browser electron'

ampValidation: clean-dist install
	$(call log, "starting AMP Validation test")
	@node scripts/test/amp-validation.js

buildCheck:
	$(call log, "checking build files")
	@node ./scripts/test/build-check.js

# quality #########################################

tsc: clean-dist install
	$(call log, "checking for type errors")
	@tsc

fix: clear clean-dist install
	$(call log, "attempting to fix lint errors")
	@yarn lint:fix
	@yarn prettier:fix

snapshot: clear clean-dist install
	$(call log, "taking snapshots")
	yarn chromatic

lint: clean-dist install
	$(call log, "checking for lint errors")
	@yarn lint

lint-project:
	$(call log, "linting project")
	@node ../scripts/check-node-versions.mjs

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
	@yarn --silent --frozen-lockfile

reinstall: clear clean-deps install
	$(call log, "dependencies have been reinstalled ♻️")

validate-build: # private
	$(call log, "checking bundling")
	@rm -rf dist
	@NODE_ENV=production webpack --config ./scripts/webpack/webpack.config.js

check-env: # private
	$(call log, "checking environment")
	@node scripts/env/check-node.js
	@node scripts/env/check-yarn.js
	@node scripts/env/check-deps.js

clear: # private
	@clear

check-schema:
	$(call log, "Checking schemas")
	@node scripts/json-schema/check-schema.js

gen-schema:
	$(call log, "Generating new schemas")
	@node scripts/json-schema/gen-schema.js
	@git add src/model/article-schema.json
	@git add src/model/front-schema.json
	@git add src/model/block-schema.json
	@git add src/model/tag-front-schema.json

check-stories:
	$(call log, "Checking Storybook stories")
	@node scripts/gen-stories/check-stories.js

gen-stories:
	$(call log, "Generating new Storybook stories")
	@node scripts/gen-stories/gen-stories.js
	@git add stories/generated

gen-fixtures:
	$(call log, "Generating new article fixture data")
	@node scripts/test-data/gen-fixtures.js

perf-test:
	@node scripts/perf/perf-test.js

# Because Snyk finds vulnerabilities snyk test command exits with error code 1 and make picks it up.
# Adding - at the beginning of the command ignores the error and we're getting:
# make: [snyk] Error 1 (ignored)
# See docs: https://www.gnu.org/software/make/manual/html_node/Errors.html#:~:text=To%20ignore%20errors%20in%20a,to%20the%20shell%20for%20execution.&text=This%20causes%20make%20to%20continue,unable%20to%20remove%20a%20file

snyk:
	-@snyk test --severity-threshold=high --file="../package.json"

snyk-dcr:
	-@snyk test --severity-threshold=high --file=package.json

snyk-ar:
	-@snyk test --severity-threshold=high --file=../apps-rendering/package.json

snyk-storybooks:
	-@snyk test --severity-threshold=high --file=../storybooks/package.json
