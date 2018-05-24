.PHONY: flow-typed install dev build clean-dist start stop monitor clear

# these means you can run the binaries in node_modules
# like with npm scripts
export PATH := node_modules/.bin:$(PATH)
export SHELL := /usr/bin/env bash

# messaging #########################################

define log
    @node lib/log $(1)
endef

define warn
    @node lib/log $(1) warn
endef

# deployment #########################################

riffraff-bundle: clean-dist build
	$(call log, "creating riffraff bundle")
	@node ./lib/deploy/build-riffraff-bundle.js

riffraff-publish: riffraff-bundle
	$(call log, "publishing riff-raff bundle")
	@./lib/deploy/publish-assets.sh

deploy:
	@env ./lib/deploy/build-riffraff-artifact.sh

# prod #########################################

build: clear install clean-dist
	$(call log, "building production bundles")
	@NODE_ENV=production webpack --config webpack

start: install
ifndef site
	$(call warn, "You need to specifiy which app to run e.g. make start site=xyz")
else
	@make stop
	$(call log, "starting PROD server for $(site)...")
	@echo '' # just a spacer
	@NODE_ENV=production pm2 start dist/$(site).server.js
	@echo '' # just a spacer
	$(call log, "PROD server is running at http://localhost:9000")
endif

stop:
	@pm2 kill

monitor:
	@pm2 monit

# dev #########################################

dev: clear install clean-dist
	$(call log, "starting DEV server")
	@NODE_ENV=development node dev-server $(site)

# quality #########################################

flow: install
	$(call log, "checking for type errors")
	@flow >/dev/null # we'll still get errors

fix: clear install
	$(call log, "attempting to fix lint errors")
	@eslint . --fix --quiet

lint: install
	$(call log, "checking for lint errors")
	@eslint . --quiet

test: clear install
	$(call log, "there are no tests!")

validate: clear install flow lint test validate-build
	$(call log, "everything seems 👌")

validate-ci: clear install flow lint test
	$(call log, "everything seems 👌")

# helpers #########################################

clean-dist:
	@rm -rf dist
	@rm -rf target
	@rm -f guui.zip

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
	@HIDE_BUNDLES=true NODE_ENV=production webpack --config webpack

check-env: # private
	$(call log, "checking environment")
	@node lib/check-node.js
	@node lib/check-yarn.js

clear: # private
	@clear

flow-typed: yarn.lock
	@rm -rf flow-typed/npm
	@cd sites/dotcom && ../../node_modules/.bin/flow-typed install -p ../../
	@cd packages/guui && ../../node_modules/.bin/flow-typed install -p ../../
	@cd packages/pasteup && ../../node_modules/.bin/flow-typed install -p ../../
	@flow-typed install
