# Client Side Computation

## Context

When preparing data for the rendering components we currently have up to three possible locations to do so: (1) the frontend Scala backend, (2) the dotcom rendering backend and (3) the end user's client side.

In the interest of the user, we should avoid postponing computation to the client side and precompute data and state on either of the two backends whenever possible.

## Decision

-   Favour computation in frontend over computation in dotcom-rendering
-   Favour computation on dotcom-rendering server than computation on the client

## Status

Approved
