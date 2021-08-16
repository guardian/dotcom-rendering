#!/bin/bash

source ~/.nvm/nvm.sh
nvm install
nvm use

#Code Validation
echo bundlesize token $BUNDLESIZE_GITHUB_TOKEN
make validate-ci

#Cypress Tests
# see https://docs.cypress.io/guides/guides/continuous-integration.html#Advanced-setup
# apt-get install xvfb libgtk-3-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2
make cypress

#RiffRaff publish
make riffraff-publish
