# Remove monorepo

## Context

We used to have a monorepo with multiple packages, including `guui` and `design`. However, once these packages were migrated to `src-foundation` we were left with a monorepo with only one package.

## Decision

Remove the use of Yarn Workspaces which was being used for the monorepo. Restore a basic yarn package, merging dependencies.

## Status

Approved
