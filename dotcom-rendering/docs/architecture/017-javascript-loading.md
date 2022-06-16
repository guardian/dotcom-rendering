# Javascript loading

## Context

The existing site (Frontend) includes Javascript in a variety of ways:

-   inline
-   script tags
-   dynamically added script tags

There is a single (universal) boot process which conditionally loads additional
JS as required based on page metadata.

For Dotcom Rendering we want to simplify things so that it is easy for a
developer to know where to add a script/functionality. We also want an approach
that helps ensure good performance and, related, which is less monolithic.

## Decision

-   Load scripts in the head as deferred, or as async at the bottom of the HTML
    body section
-   All other script loading (other than for commercial third-party code) is
    prohibited
-   We will not use a universal 'boot' JS file, but load scripts which have a
    unique purpose and which are self-contained aside from a few shared helpers

Fuller discussion of this approach can be found here:
https://docs.google.com/document/d/1EnkowJ7BFumrqkpkRacRl-gSkiJs9fUgRCixQTLxBvo/edit#.

## Status

Approved
