.PHONY: flow-typed install dev build clean-dist start stop monitor clear

# these means you can run the binaries in node_modules
# like with npm scripts
export PATH := node_modules/.bin:$(PATH)
export SHELL := /usr/bin/env bash

define log
    @node packages/guui/lib/log $(1)
endef

flow-typed: yarn.lock
	@rm -rf flow-typed/npm
	@cd sites/dotcom && ../../node_modules/.bin/flow-typed install -p ../../
	@cd packages/guui && ../../node_modules/.bin/flow-typed install -p ../../
	@cd packages/pasteup && ../../node_modules/.bin/flow-typed install -p ../../
	@flow-typed install

# Installs deps if yarn.lock or package.json has changed
install: package.json yarn.lock
	@yarn install

dev: clear install clean-dist
	@NODE_ENV=development node dev-server

build: install clean-dist
	@NODE_ENV=production webpack --config webpack --color --progress

clean-dist:
	@rm -rf dist
	@rm -rf target

start: #stop build
ifndef site
	$(call log, "You must provide an app to run e.g. make start site=xyz")
else
	@NODE_ENV=production pm2 start dist/$(site).server.js
	@echo '' # just a spacer
	$(call log, "PROD server is running at http://localhost:9000")
endif


stop:
	@pm2 kill

monitor:
	@pm2 monit

clear: # private
	@clear
