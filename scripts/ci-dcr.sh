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

# TeamCity is going away soon, and having a completely different
# build step for main that takes over twice as long prevents getting
# any meaningful estimates from TeamCity.
# Cypress is also run by our GitHub Actions, where their flakiness
# is not as problematic, because they can be re-run independently.
#
# At the time of writing this, Aug 16 2023, 75% of main runs in TC
# failed over a 24h period.
export SKIP_CYPRESS=true

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
		make validate-ci
		# If $SKIP_CYPRESS is not set, run the Cypress tests
		if [ -z $SKIP_CYPRESS ]; then
			make cypress
			cypressExitCode=$?
			if [ $cypressExitCode -ne 0 ]; then
				echo "Cypress failed. If you're trying to release something urgently, set \$SKIP_CYPRESS to any non-empty value\n\n"
			fi
		fi
	else
		printf "Skipping code checks when not on main"
	fi

    make riffraff-publish
fi

