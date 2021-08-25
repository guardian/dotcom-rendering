#!/bin/bash

currentBranch="$(git branch --show-current)"
echo "current branch: $currentBranch"

# files that were changed between current branch and main
files="$(git diff --name-only origin/main)"
echo "files: $files"

# files that are not within apps-rendering sub directory
filteredFiles="$(echo "$files" | grep -v 'apps-rendering')"
echo "filteredFiles: $filteredFiles"

# run the ci steps if either of the followings is true
# - filteredFiles is empty (all changes were in apps-rendering)
# - we are in the main branch
if [[ $currentBranch != "main" ]] && [ -z "$filteredFiles" ] 
then
    printf "Skipping DCR ci build because \nDCR file changes is empty \nand branch is $currentBranch"
else
    printf "Running DCR ci build because \nDCR file changes contains $filteredFiles \nand branch is $currentBranch"

    source ~/.nvm/nvm.sh
    nvm install
    nvm use

    cd dotcom-rendering

    #Code Validation
    echo bundlesize token $BUNDLESIZE_GITHUB_TOKEN
    make validate-ci

    #Cypress Tests
    # see https://docs.cypress.io/guides/guides/continuous-integration.html#Advanced-setup
    # apt-get install xvfb libgtk-3-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2
    make cypress

    #RiffRaff publish
    make riffraff-publish
fi

