# AMP

## Context

We have an established aim of rendering content in Dotcom Rendering. This will dramatically improve the developer experience (measured in time to new features, time on maintenance).

AMP is a good candidate for early migration to the new platform:

-   It is simpler than ‘full’ content types
-   It is a discrete piece of functionality
-   It receives a large volume of traffic, which will help validate the performance of our new platform
-   It receives relatively little development outside of the Dotcom team, reducing risk during the migration period

There are also some downsides. In particular:

-   It is relatively ‘static’ (rarely developed on) so the developer experience benefits are likely less than for some non-AMP content, such as articles or liveblogs

It is quite possible though that Google will weight AMP more heavily going forward, pushing us to develop the platform more than we have done so in the past.

## Decision

To implement AMP using dotcom rendering.

## Status

Approved
