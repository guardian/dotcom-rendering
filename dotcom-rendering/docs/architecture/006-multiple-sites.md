# Multiple sites

## Context

There are several sites across the Guardian (identity-frontend, membership-frontend) that started life with a developer experience that emulated the dotcom frontend, before diverging. The duplication of effort required to keep these codebases in step with frontend was presumably too large an investment, and as a result the developer experience deteriorated and the consistency was lost.

One way we could prevent this happening again is to allow teams to build their own sites in the dotcom-rendering repo. They would share the same toolchain, code style config, bundling configuration and developer experience. This would reduce duplication and help maintain consistency and best practices across projects.

## Decision

We will allow teams to build their own websites under the `sites/` directory.

## Consequences

Only projects that agree to share dotcom-rendering's tools, code style and bundling configuration will be accepted. Sites will be responsible for their own deployment.

This will introduce a certain amount of complexity that we hope to contain within the bundling and deployment configuration and the `rendering` package (the Express application).

If this complexity cannot be contained, or if it adds too much friction to dotcom's frontend development, we should reconsider this decision.

## Status

Superseded by
[007-multiple-sites-revisited.md](007-multiple-sites-revisited.md).
