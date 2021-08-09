# New dotcom-rendering models for elements

## Context

The frontend project currently parses capi block elements into a list of BodyBlock objects as part of the
frontend model. This is currently used (in frontend) by the liveblog, and we also forward this structure to
dotcom rendering.

## Decision

We have created a duplicate set of models in frontend to be used only by the dotcom rendering datamodel.

Doing this will allow us to iterate on the dotcom rendering models more quickly and make enhancements such
as better image support, without the potential to impact liveblogs.

## Consequences

This change adds technical debt to the frontend repository because we now have a duplicated set of models that
do essentially the same thing. At some point in the future, we will need to address this technical debt by
refactoring liveblogs to use the dotcom rendering models, and then remove the old models.

## Status

Approved/Merged
