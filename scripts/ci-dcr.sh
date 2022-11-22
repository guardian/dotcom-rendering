#!/bin/bash

# exit when any command fails
set -e

git fetch origin main

gitBranches="$(git branch -r)"
echo "git branches: $gitBranches"

currentBranch="$(git rev-parse --abbrev-ref HEAD)"
echo "current branch: $currentBranch"

# files that were changed between current branch and main
files="$(git diff --name-only $currentBranch origin/main)"
echo "files: $files"

# files that are not within apps-rendering sub directory
filteredFiles="$(echo "$files" | { grep -v 'apps-rendering' || :; })"
echo "filteredFiles: $filteredFiles"

# Github actions sets this by default but we also want this variable set in TeamCity
export CI=true

# run the ci steps if either of the followings is true
# - filteredFiles is empty (all changes were in apps-rendering)
# - we are in the main branch
if [[ $currentBranch != "main" ]] && [ -z "$filteredFiles" ]
then
    printf "Skipping DCR ci build because DCR file changes is empty and branch is $currentBranch\n\n"
else
    printf "Running DCR ci build because DCR file changes contains $filteredFiles and branch is $currentBranch\n\n"

    source ~/.nvm/nvm.sh
    nvm install
    nvm use

	npm i -g yarn@1.x
    yarn --silent

    cd dotcom-rendering

	if [ $currentBranch == "main" ]
	then
		#Code Validation
		make validate-ci

		# Generate .env file
		make gen-dotenv-ci

		# Cypress Tests
		# see https://docs.cypress.io/guides/guides/continuous-integration.html#Advanced-setup
		# apt-get install xvfb libgtk-3-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2
		make cypress-arm64
	else
		#Run bundle size?
		make bundlesize

		printf "Skipping code checks when not on main"
	fi

    #RiffRaff publish
    make riffraff-publish
fi

