#!/usr/bin/env bash

set -e

PROJECT=dotcom:rendering

if [[ -z $BUILD_NUMBER ]]; then
  BUILD_NUMBER=0
fi

if [[ -z $BUILD_VCS_NUMBER ]]; then
  BUILD_VCS_NUMBER=unknown
fi

if [[ -z $BRANCH_NAME ]]; then
  BRANCH_NAME=unknown
fi

aws s3 cp --acl bucket-owner-full-control --region=eu-west-1 --recursive target s3://riffraff-artifact/$PROJECT/$BUILD_NUMBER
aws s3 cp --acl bucket-owner-full-control --region=eu-west-1 target/build.json s3://riffraff-builds/$PROJECT/$BUILD_NUMBER/build.json

echo "Finished uploading build $BUILD_NUMBER for project $PROJECT to riff-raff s3 buckets"
