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

riffraff-bundle: clean-dist build
	$(call log, "creating riffraff bundle")
	@node ./scripts/deploy/build-riffraff-bundle.js

riffraff-publish: riffraff-bundle
	$(call log, "publishing riff-raff bundle")
	@./scripts/deploy/publish-assets.sh

deploy:
	@env ./scripts/deploy/build-riffraff-artifact.sh

# prod #########################################

build: export NODE_ENV=production
build: clean-dist install
	$(call log, "building production bundles")
	@webpack --config ./scripts/webpack/webpack.config.js --progress

build-ci: export NODE_ENV=production
build-ci: clean-dist install
	$(call log, "building production bundles")
	@SKIP_LEGACY=true webpack --config ./scripts/webpack/webpack.config.js

start-ci: export NODE_ENV=production
start-ci: install gen-dotenv-ci
	$(call log, "starting PROD server...")
	@DISABLE_LOGGING_AND_METRICS=true node dist/frontend.server.js

start: export NODE_ENV=production
start: install gen-dotenv
	$(call log, "starting PROD server...")
	@echo '' # just a spacer
	pm2 start dist/frontend.server.js
	@echo '' # just a spacer
	$(call log, "PROD server is running")
	@pm2 logs

# Used in cloudformation.yml which specifically:
# - Launches pm2 from /usr/local/node rather than /node_modules
# - Does not run 'install' task as its not needed & adds time to startup
start-prod: export NODE_ENV=production
start-prod: gen-dotenv
	$(call log, "starting PROD server...")
	@echo '' # just a spacer
	/usr/local/node/pm2 start --uid dotcom-rendering --gid frontend dist/frontend.server.js
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

dev: export NODE_ENV=development
dev: clear clean-dist install gen-dotenv
	$(call log, "starting DEV server")
	@SKIP_LEGACY=true webpack serve --config ./scripts/webpack/webpack.config.js

dev-legacy: export NODE_ENV=development
dev-legacy: clear clean-dist install gen-dotenv
	$(call log, "starting DEV server")
	@NODE_ENV=development webpack serve --config ./scripts/webpack/webpack.config.js

# tests #####################################

cypress: export NODE_ENV=production
cypress: clear clean-dist install build
	$(call log, "starting frontend PROD server for Cypress")
	@DISABLE_LOGGING_AND_METRICS=true start-server-and-test 'node dist/frontend.server.js' 9000 'cypress run --spec "cypress/e2e/**/*"'

ampValidation: export NODE_ENV=production
ampValidation: clean-dist install build
	$(call log, "starting frontend PROD server for AMP Validation")
	@DISABLE_LOGGING_AND_METRICS=true start-server-and-test 'node dist/frontend.server.js' 9000 'node scripts/test/amp-validation.js'

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

gen-dotenv:
	$(call log, "Generating .env file")
	@node scripts/dotenv/gen-dotenv.js
gen-dotenv-ci:
	$(call log, "Generating .env file")
	@CI_ENV=true node scripts/dotenv/gen-dotenv.js


perf-test:
	@node scripts/perf/perf-test.js

arch-diagram:
	@npx arkit

snyk:
	@snyk wizard
