# Componentisation

## Context

Currently, our CSS is bundled in such a way that often 95% of loaded CSS is not used on a page.

Our CSS is fragile. It’s really difficult to work out the extent to which a change changes things, because it’s easy to reuse classes inappropriately.

Frontend can be hard to work with in part as a consequence of the markup, logic and styling being separate

It can be difficult to:

-   reason about how these concerns intersect
-   find styles that apply to specific markup

If you change or delete some styles, it’s difficult to know the extent to which this changes the website

## Decision

We will build our rendering layer using components, ensuring that only CSS that is used on a page is generated and included in the resultant HTML.

We will colocate markup, styles and logic in the same file.

We will annotate our logic with types.

## Consequences

All CSS is scoped to a particular component. Nothing should leak out into the wider application.

It should be easy for developers to find the code they are looking for. Everything needed to understand the component will be all in one place. Developers will be clearer about the consequences of changing some code.

Types should to make it easy to understand components from a data presentation perspective.

## Status

Approved
