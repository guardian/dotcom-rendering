# Componentisation

## Context

Currently, our CSS is bundled in such a way that often 95% of loaded CSS is not used on a page.

Our CSS is fragile. It’s really difficult to work out the extent to which a change changes things, because it’s easy to reuse classes inappropriately.

Frontend can be hard to work with in part as a consequence of the markup, logic and styling being separate

It can be difficult to:

- reason about how these concerns intersect
- find styles that apply to specific markup

If you change or delete some styles, it’s difficult to know the extent to which this changes the website

## Decision

The componentisation approach ensures that only CSS that is used on a page is generated and included in the resultant HTML. This large reduction in CSS ensures:

- critical resources reach the browser faster
- can be parsed quicker
- render tree constructed earlier
- content displayed much sooner

With componentisation, all CSS is scoped to a particular component. Nothing leaks out into the wider application. 

A componentisation approach allows us to colocate markup, styles and logic in the same file. It becomes easier for developers to find the code they are looking for.

It’s easier to see how a component works because everything needed to understand the component, from a presentational point of view, is all in one place.

Because components are self-contained, developers can be clearer about the consequences of changing some code. Nothing leaks out into the wider application.

If we annotate our logic with types, it’s easy to understand components from a data presentation perspective too.

## Status

Approved
