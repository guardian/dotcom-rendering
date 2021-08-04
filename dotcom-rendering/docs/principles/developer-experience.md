# Developer experience principles

## No longer than 1 hour to get up and running on a cold machine

Although the average tenure for a developer at the Guardian is relatively high (~3.5 years), we frequently have new starters
who are unfamiliar with our platform and the technology it uses. We also have range of server-side, full-stack and client-side
devs, along with designers with some programming experience. We should aim to make the application as fast to get up and running
as possible, with no assumed prior knowledge of our tech stack.

## A platform for components, not a website

Rather than a hierarchical website, dotcom-rendering should feel like a platform for components. Components are
discrete units whose state does not leak into the wider application. It should be
easy to delete components when they are no longer needed.

We should provide a process to allow developers to work on their components in isolation. We should provide a clear
specification and contract for components (TODO)

## Fast feedback cycle

When developing components, changes should be reflected in the developer's browser within 5 seconds. Tests against relevant
(changed) components should run in less than 10 seconds.

## Contract over idiom

Code style is aggressively linted and type-checked. Contracts are enforced by the system, rather than by idiom, minimising
the effort required at code review.

## Verifiable performance targets

Performance targets should be discoverable and highly visible. If they are not met, developers should receive feedback at
the earliest opportunity.

-   [Speedcurve dashboard](https://speedcurve.com/guardian/favorite/?d=30&db=23315&de=1&ds=1)
-   [Bundle size](https://github.com/guardian/dotcom-rendering/blob/main/docs/principles/lines-in-the-sand.md#our-javascript-bundle-size-will-not-exceed-120kb)

## We only deliver the assets that the page needs

Developers should generally not be concerned about how assets will be bundled, split up and delivered. They can trust that the
system is only delivering assets that the page is using, and that unused code will be stripped out at build time.

## Content priorities

We have agreed, documented content priorities e.g. main content > supplemental content (atoms etc) > commercial (TODO)

## Independent development, deployment and hosting

It is possible to develop on dotcom-rendering without a network dependency (TODO) or any other dependent applications running on
the developer's host machine. The application is deployed independently under most circumstances. It is hosted on its own instances.

## An API that survives internal improvements/upgrades

The application provides a simple API that receives a configuration object and returns HTML. It validates the incoming request
body to ensure it meets the contract, and throws if the contract is not met.

## Full test suite

The application provides a full suite of unit, integration and end-to-end tests.

## Easily superseded

At end of life, the dotcom-rendering application (although not the components themselves) can be swapped out for another rendering
tier. It must be possible to migrate a single content type such as the article within 3 months.

## A component should do one thing only

> Components that only do one thing are easier to understand and use

## Sometimes Repeat Yourself

> Verbose code that is easy to move around, change and remove is preferred to elegant code that is prematurely abstracted and hard to change

Or, to put it another way: Do Repeat Yourself. Sometimes. The old maxim of Don't Repeat Yourself is probably the most quoted design principle of them all but its popularity can lead to it becoming less a principle and more of a habit. The above statement challenges the instinctive reflex we all have to pull things out into functions or components, asking us to first consider if the abstraction is useful.

## Explicit Props

> Explicit props help new developers quickly understand data flows; abstractions or optimisation patterns can hide where props come from, adding to the cognitive workload

When I see my component being called I want to be absolutely certain that all the props shown being passed in are _all_ the props being passed in. In DCR now, this is currently true in all cases and adds a substantial benefit when trying to reason about data flows

Many other codebases have abstraction patterns using HOCs, Context, Themes, etc. None of those things are wrong or bad, indeed they are excellent solutions to common issues, but - at this point in time - none of these technologies or patterns are considered necessary for DCR and we should only introduce them after team discussion

## Component First Development

> Components that are built to the standard where they're sharable are well documented and have good test coverage but sharing them before they are stable can make changes harder

As a principle, we should initially build all core components in isolation as though they were going to be shared, before connecting them into the App. Not because we want to share them but because the act of doing this results in better components

When you create components in Storybook you:

-   Consider the api
-   Think about the different ways the component could be used
-   Become the consumer of the component (when you write the stories)

This leads to cleaner components that are easier to understand which is useful for the immediate DCR team and then, if we decide to actually share the component later, to others outside DCR.

However, we should be wary of exposing apis to other teams too soon while we are still at a stage where things can be refactored.
