# Support for frontend only

## Context

Multiple 'sites' are supported in the codebase but at the cost of
significant added complexity.

A site is a distinct project within the repository, with it's own
dependencies, build and deployment. Sites cannot share code, other
than through non-site packages, but do share boiler-plate tasks like
linting, type-checking, and artifact-building.

There are advantages to sites:

-   helps others bootstrap their projects quicker due to easy set up
    (i.e. all the webpack, linting, etc. is built-in)
-   helps promote common standards for the same reason as above
-   single repo makes sharing code easier (no need for publishing
    packages)

However, there are also cons:

-   distracts from our mvp/core aim of serving the article page
-   adds a fair bit of complexity/overhead
-   confuses the separation of concerns and introduces significant
    coupling

The question of whether to keep sites has been raised before but the
cost has become more apparent since that discussion - as feature work
has been slowed by having to consider sites-related functionality.

It has also become clearer that no teams plan on using
sites in the near future. Neither do we want to expend effort
supporting teams through this process.

## Decision

Given these factors, and the general concern to remove unused code, we
will remove all sites functionality.

## Consequences

Other teams will not be able to use dotcom-rendering to build their
own sites.

## Status

Approved
