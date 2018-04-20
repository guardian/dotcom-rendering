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
	$(call log, "copying assets into riffraff bundle")
	@node ./lib/build-riffraff-bundle.js

riffraff-publish: riffraff-bundle
	$(call log, "publishing riff-raff bundle")
	@./lib/publish-assets.sh

deploy:
	@env ./lib/build-riffraff-artifact.sh

# prod #########################################

build: install clean-dist
	@NODE_ENV=production webpack --config webpack --color --progress

start:
ifndef site
	$(call warn, "You need to specifiy which app to run e.g. make start site=xyz")
else
	@make stop build
	@NODE_ENV=production pm2 start dist/$(site).server.js
	@echo '' # just a spacer
	$(call log, "PROD server is running at http://localhost:9000")
endif

stop:
	@pm2 kill

monitor:
	@pm2 monit

# dev #########################################

dev: install clear clean-dist
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
	$(call log, "deleting old artefacts")
	@rm -rf dist
	@rm -rf target

clean-deps:
	$(call log, "trashing dependencies")
	@rm -rf node_modules

install: check-env
	$(call log, "refreshing dependencies")
	@yarn >/dev/null

reinstall: clear clean-deps install
	$(call log, "dependencies have been reinstalled ♻️")

validate-build: # private
	$(call log, "checking bundling")
	@rm -rf dist
	@CI=true NODE_ENV=production webpack --config webpack >/dev/null

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
