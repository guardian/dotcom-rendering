# Use Percy/Cypress for integration-style visual regression testing

## Status: Deprecated

We intended to run a proof of concept on DCR but with other competing priorities we never got to that stage. Commercial implemented Percy into their CI but decided to drop it due to cost reasons which will only be more acute for DCR.

## Context

Percy is a service which takes snapshots and allows for visual regression
testing. A recent [Spike
PR](https://github.com/guardian/dotcom-rendering/pull/5256) shows that it can be
integrated with Cypress (which we are already using in the codebase) and with CI
via Github Actions.

We are currently using Storybook and Chromatic to run visual regression testing
on a component level. The proposal to use Percy with Cypress is not that we
replace the testing already done with Chromatic, but rather that we supplement
Chromatic testing with Percy testing in cases where Storybook is not so
well-suited.

### Pros

The following benefits or use cases have been raised by members of the
department.

-   Cypress uses a headless browser to query our own server, which avoids the
    difficulties of setting more complex configurations in Storybook.
    -   Example use-case: [Testing image
        rendering](https://github.com/guardian/dotcom-rendering/issues/5131#issuecomment-1154034615),
        which depends on a salt value set in `.env`.
-   Cypress makes it easier to test a larger slice of the rendering flow.
    -   Example use-case: Changes to the `enhance` methods like
        [`enhanceCollections`](https://github.com/guardian/dotcom-rendering/blob/1b37daa385aa348d3ac666d81ba0f666f56bf577/dotcom-rendering/src/model/enhanceCollections.ts#L4)
        can have a significant visual impact, because they control which props
        are forwarded to the React components which render collections. Because
        many of the props are optional, none of the existing tests or type
        checks will catch these changes, and contributors may not expect their
        edit to have visual impacts because `enhance` is one step removed from
        the actual rendering functions. But currently our Storybook tests [will
        not
        catch](https://github.com/guardian/dotcom-rendering/pull/5119#issuecomment-1147538238)
        this kind of change.
-   Because Cypress can easily do integration tests, this should in theory make
    it easier to visually test states which result from user interaction,
    without needing to write separate stories for each state.
-   Because Percy is part of Browserstack, it should enable us to make use of
    cross-browser testing.
-   The commercial-dev team have also [expressed
    interest](https://github.com/guardian/dotcom-rendering/pull/5256). They want
    to snapshot the page to verify ad placement but need the page loaded by a
    real browser to be sure they are capturing a realistic experience.

### Cons

-   Even though the code footprint of Percy when it's being added to Cypress is
    fairly light, this would nevertheless introduce dependency on a new service
    and set of packages.
-   Percy seems to be a relatively new service, and the documentation is not
    currently as detailed as one might hope (although it does seem to have
    [solid
    backing](https://www.browserstack.com/blog/browserstack-has-acquired-percy/),
    at the time of writing.
-   Cost impact is unknown.
-   Time to execute. This is an unknown quantity at this stage but if the
    execution time for Percy is too long it could delay deployments

### Other considerations

-   Cypress lists [a number of other
    packages](https://docs.cypress.io/guides/tooling/visual-testing#Tooling)
    which can complement Cypress to add visual regression testing. How much do
    we know about the alternatives to Percy?
-   Can we do more with Storybook to cover the use-cases outline above?

## Decision

-   We will use Percy, via the Cypress integration, to add visual regression
    tests for DCR. This will generally complement the existing visual regression
    tests that we're already running with Storybook and Chromatic, but some
    existing tests will be moved from Chromatic to Percy if the latter is a
    significantly better fit (e.g. layouts).

-   The unknowns (cost, execution time) should be revisited once we have a
    clearer sense of how we will use Percy in practice.
