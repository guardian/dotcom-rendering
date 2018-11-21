.PHONY: install dev build clean-dist start stop monitor clear

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
	@make stop
	$(call log, "starting PROD server...")
	@echo '' # just a spacer
	@NODE_ENV=production pm2 start dist/frontend.server.js
	@echo '' # just a spacer
	$(call log, "PROD server is running at http://localhost:9000")

stop:
	@pm2 kill

monitor:
	@pm2 monit

logs:
	@pm2 logs

# dev #########################################

dev: clear clean-dist install
	$(call log, "starting DEV server")
	@NODE_ENV=development node dev-server frontend

# quality #########################################

tsc: clean-dist install
	$(call log, "checking for type errors")
	@tsc

fix: clear clean-dist install
	$(call log, "attempting to fix lint errors")
	@yarn lint --fix

lint: clean-dist install
	$(call log, "checking for lint errors")
	@yarn lint

stylelint: clean-dist install
	$(call log, "checking for style lint errors")
	@stylelint "packages/guui/**/*.js" "frontend/**/*.js"

test: clear clean-dist install
	$(call log, "running tests")
	@yarn test --verbose  --runInBand

bundlesize: clear clean-dist install build
	@bundlesize

validate: clear clean-dist install tsc lint stylelint test validate-build
	$(call log, "everything seems 👌")

validate-ci: clear install tsc lint stylelint test bundlesize
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


# packages #########################################

clean-pasteup:
	@rm -rf packages/pasteup/dist packages/pasteup/tmp

pre-publish-pasteup:
	$(call log, "building pasteup")
	@mkdir packages/pasteup/tmp
	@NODE_ENV=production webpack --config webpack/pasteup
	@mv packages/pasteup/*.js packages/pasteup/tmp
	@mv packages/pasteup/dist/*.js packages/pasteup

post-publish-pasteup:
	$(call log, "clean up after publishing pasteup")
	@mv packages/pasteup/tmp/*.js packages/pasteup

publish-pasteup: clear clean-pasteup install
	$(call log, "publishing pasteup")
	@cd packages/pasteup && yarn publish
