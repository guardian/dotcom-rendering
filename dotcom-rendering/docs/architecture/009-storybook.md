# Storybook

## Context

GUUI intends to be, at some level, a library of components.

Dotcom rendering will require a mapping of CAPI element to React Component.

Storybook is a widely used library which allows a series of demos and examples to be easily constructed. It also has support for typescript.

## Decision

It is possible to envision a split in components:

-   those which form our design system
-   those which render individual elements of content from CAPI

Each of these should have an independant storybook, allowing the design system ones to express the variety of ways each component can and should be used. And allowing, as they are developed, each CAPI element rendering component to demonstrate the variety of content they can encapsulate.

## Consequences

Storybook must be installed and set up. All existing components must be added and adding a component to storybook will be required to launch one.

## Status

Proposed

_People are generally in favour, but there doesn't seem like an obvious time to implement it. This should be revisited before we have too many elements._
