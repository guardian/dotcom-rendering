# React Context API

## Context

We don't use any state management in dotcom at the moment and this means props have to be
explicitly passed around; this can lead to 'prop drilling'.
[This PR](https://github.com/guardian/dotcom-rendering/pull/801) was a spike to demonstrate using
the react context api to extract the `edition` property to prevent this.

## Decision

-   Our component tree is shallow so we shouldn't implement any 'magic' that
    steps away from having explicit props showing where and what data a component is using.
-   This decision should be revisited as the codebase grows.

## Status

Superceded by 028-react-context-api.md
