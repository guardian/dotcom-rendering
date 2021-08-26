#!/bin/bash

git fetch origin main

gitBranches="$(git branch -r)"
echo "git branches: $gitBranches"

currentBranch="$(git rev-parse --abbrev-ref HEAD)"
echo "current branch: $currentBranch"

# files that were changed between current branch and main
files="$(git diff --name-only $currentBranch origin/main)"
echo "files: $files"

# files that are not within apps-rendering sub directory
filteredFiles="$(echo "$files" | grep -v 'apps-rendering')"
echo "filteredFiles: $filteredFiles"

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

