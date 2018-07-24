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

build: clear clean-dist install
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

dev: clear clean-dist install
	$(call log, "starting DEV server")
	@NODE_ENV=development node dev-server $(site)

# quality #########################################

flow: clean-dist install
	$(call log, "checking for type errors")
	@flow stop --quiet
	@flow --quiet

fix: clear clean-dist install
	$(call log, "attempting to fix lint errors")
	@eslint . --fix --quiet

lint: clean-dist install
	$(call log, "checking for lint errors")
	@eslint . --quiet

test: clear clean-dist install
	$(call log, "there are no tests!")

validate: clear clean-dist install flow lint test validate-build
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
	@cd sites/frontend && ../../node_modules/.bin/flow-typed install -p ../../
	@cd packages/guui && ../../node_modules/.bin/flow-typed install -p ../../
	@cd packages/pasteup && ../../node_modules/.bin/flow-typed install -p ../../
	@flow-typed install

# packages #########################################

clean-guui:
	# @rm -rf packages/guui/dist packages/guui/tmp

pre-publish-guui:
	$(call log, "building guui")
	# @mkdir packages/guui/tmp
	# @mkdir packages/guui/tmp/lib
	# @mkdir packages/guui/tmp/components	
	@NODE_ENV=production webpack --config webpack/guui
	# @mv packages/guui/*.js packages/guui/src
	# @mv packages/guui/dist/*.js packages/guui
	# @mv packages/guui/lib/*.js packages/guui/src/lib
	# @mv packages/guui/dist/lib/*.js packages/guui/lib
	# @mv packages/guui/components/* packages/guui/src/components
	# @mv packages/guui/dist/components/*.js packages/guui/components

post-publish-guui:
	# $(call log, "clean up after publishing guui")
	# @mv packages/guui/tmp/*.js packages/guui
	# @mv packages/guui/tmp/lib/*.js packages/guui/lib
	# @rm -rf packages/guui/components/*
	# @mv packages/guui/tmp/components/* packages/guui/components

publish-guui: clear clean-guui install
	$(call log, "publishing guui")
	# @cd packages/guui && yarn pack