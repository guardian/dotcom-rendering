# this means you can run the binaries in node_modules
# like so: `env BINARY_NAME`
export PATH := node_modules/.bin:$(PATH)

define log
    @node __tasks__/log.js $(1)
endef

# app #########################################

build: clear install
	$(call log, "building production bundles")
	@echo '' # just a spacer
	@rm -rf dist
	@NODE_ENV=production webpack --bail --color --config __config__/webpack/webpack.config.js

dev: clear install
	$(call log, "starting DEV server...")
	@NODE_ENV=development node __server__/dev-server.js

start: stop
	@NODE_ENV=production pm2 start __server__/index.js

stop:
	@./node_modules/.bin/pm2 kill

# quality #########################################

flow: install
	$(call log, "checking for type errors")
	@env flow >/dev/null # we'll still get errors

fix: clear install
	$(call log, "attempting to fix lint errors")
	@env eslint . --fix --quiet

lint: install
	$(call log, "checking for lint errors")
	@env eslint . --quiet

test: clear install
	$(call log, "there are no tests!")

validate: clear install flow lint test validate-build
	$(call log, "everything seems 👌")

validate-ci: clear install flow lint test
	$(call log, "everything seems 👌")

# helpers #########################################

install: check-env
	$(call log, "refreshing dependencies")
	@yarn >/dev/null

clean:
	$(call log, "trashing dependencies")
	@rm -rf node_modules

reinstall: clear clean install
	$(call log, "dependencies have been reinstalled ♻️")

validate-build: # private
	$(call log, "checking bundling")
	@rm -rf dist
	@CI=true NODE_ENV=production webpack --config __config__/webpack/webpack.config.js >/dev/null

check-env: # private
	$(call log, "checking environment")
	@node __tasks__/check-node.js
	@node __tasks__/check-yarn.js

clear: # private
	clear
