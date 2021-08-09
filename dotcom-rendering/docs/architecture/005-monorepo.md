# Componentisation solution as a monorepo

## Context

Our componentisation solution includes a framework for building components, a library of shared components and a service that generates HTML for the dotcom frontend (and maybe for other applications too). We can potentially pull out sharable code into their own repos, or keep all our componentisation code together in the same repo.

Having multiple repos expresses the intention that parts of our code can be used in different applications (e.g. the GUUI component library). However, it slows down development and adds complexity. It would become necessary to clone and symlink multiple codebases, for instance in order to work on a shared component, add some new colours to pasteup and then view it in the context of dotcom. There is also the problem of discoverability, and knowing how the various codebases link together.

## Decision

We will keep all the code for componentisation solution in one repo makes the dotcom frontend easy to setup. The code shares code style rules, keeping it consistent.

We will organise the code as a monorepo, expressing the intention that some of our code (GUUI and Pasteup) should remain decoupled from the dotcom frontend website. Changes to these libraries will be published separately.

## Status

Approved
