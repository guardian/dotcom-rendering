#!/usr/bin/env bash

set -e

TARGET=packages/gap/dist
aws s3 cp --profile frontend --acl public-read --region=eu-west-1 --recursive $TARGET s3://com-gu-gap/v0/
echo GAP core and extensions uploaded!
