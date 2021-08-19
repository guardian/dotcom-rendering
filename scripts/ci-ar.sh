#!/bin/bash

source ~/.nvm/nvm.sh
nvm install
nvm use

cd apps-rendering

npm ci
npm run test
npm run build:client:prod
npm run build:server:prod
npm run copy-manifest
npm run copy-fonts
npm run upload