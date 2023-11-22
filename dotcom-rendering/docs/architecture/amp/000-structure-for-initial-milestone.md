# AMP structure for initial milestone

## Context

There are significant differences between AMP and regular article rendering.
These include:

-   The markup is different
-   The HTML structure/limitations are different
-   AMP does not require (or support) client-side custom Javascript, which means
    webpack is likely a poor fit
-   From a project perspective, it seems that the two project change at different
    rates (historically at least)
-   The caching rules are different
-   Ads are very different

..and more.

Coupling things that are different (in terms of code, building, deployment, or
otherwise) can lead to brittle and complex solutions; it is generally better to
keep things separate and share only what is absolutely required.

From this context, the question arises: should we attempt to build AMP in the
same (node) package as articles, or separately?

## Decision

_For our initial milestone_ we will build AMP as simply a new page in the
existing frontend package. The advantage of this approach is to bootstrap
quickly while leaving room to separate things later if necessary.

Within this, we will adhere to a couple of rules:

-   no `if (amp)` - branching is not permitted other than the absolute top-level

There are many disadvantages to this kind of branching and it also would make it
difficult to separate the projects later on.

-   no divergence of data model

Instead, we will document pressures here and use any to bring forward
discussions around moving things into a separate project. So note, the
motivation here is not that branching of data model is bad at all, but that it
requires thought and possibly more significant changes.

## Status

Accepted
