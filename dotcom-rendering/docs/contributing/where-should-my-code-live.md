# Where should my code live?

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- Automatically created with yarn run createtoc and on push hook -->

- [Scripts](#scripts)
  - [Low priority scripts](#low-priority-scripts)
  - [High priority scripts](#high-priority-scripts)
- [Data extraction](#data-extraction)
  - [Axiom 1](#axiom-1)
  - [Axiom 2](#axiom-2)
  - [Axiom 3](#axiom-3)
  - [Architecture Decision Records](#architecture-decision-records)
- [Components](#components)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Scripts

Externally hosted third party scripts should always be loaded asynchronously. If possible, they should be loaded conditionally using JavaScript by injecting a script element into the head of the document.

If a third party script needs to be loaded on every page, there are two ways it could be categorised: **low priority** or **high priority**.

### Low priority scripts

In the first instance, consider adding the script as a low priority script. These scripts are added to the bottom of the document `<body>` and loaded asynchronously. They will probably run after the main application JavaScript bundle, _but this is not guaranteed._

An example is the [Google Analytics tracking script](https://developers.google.com/analytics/devguides/collection/analyticsjs/).

They can be added to the `lowPriorityScripts` array in the [`src/web/document.tsx`](https://github.com/guardian/dotcom-rendering/blob/main/src/web/document.tsx) module.

### High priority scripts

High priority scripts are injected by JavaScript running in the `<head>` of the document. They are loaded asynchronously and executed in the order they are requested.

Examples include the [polyfill.io](https://polyfill.io) response and the main application JavaScript bundles.

⚠️ **High priority scripts have a considerable impact on site performance and should be added sparingly. Please get approval from at least 2 members of the dotcom platform team before adding a new script here.**

They can be added to the `priorityScripts` array in the [`src/web/document.tsx`](https://github.com/guardian/dotcom-rendering/blob/main/src/web/document.tsx) module.

## Data extraction

`dotcom-rendering` receives most of its data from CAPI, via the [`DotcomponentsDataModel`](https://github.com/guardian/frontend/blob/main/article/app/model/dotcomponents/DotcomponentsDataModel.scala) in `frontend`.

The data received from CAPI is probably not in an immediately useful form, and some data extraction or parsing logic is needed. When contemplating where to put this logic, consider the following axioms, in order of importance.

### Axiom 1

**If CAPI data needs to be parsed or extracted for presentation, this logic should live in `frontend`**

Since `dotcom-rendering` shares content data with `frontend`, it makes sense for `frontend` to be the source of truth for content data. The parsed data should be added to the `DotcomponentsDataModel` and sent to `dotcom-rendering`.

### Axiom 2

**Favour computation on the rendering server over computation on the client**

Sometimes data extraction logic does not need to be shared between `frontend` and `dotcom-rendering`. If logic needs to be executed in `dotcom-rendering`, it is preferable to execute this on the server, in `src/model`. Logic on the server is heavily cached by Fastly, reducing the burden on the client.

**Note:** Not all logic can be cached on the server, for instance logic involving geolocation or user data. Take care not to split the cache without due consideration.

### Axiom 3

**Minimise data over the wire**

Data is passed between `frontend` and `dotcom-rendering` via a network request, adding latency to the application. It follows that reducing data reduces latency. If executing some data extraction logic on `frontend` significantly increases the amount of data sent over the wire, consider sending the unprocessed data and moving the logic to `dotcom-rendering`.

### Architecture Decision Records

-   [New elements models in frontend](../architecture/013-new-elements-models-in-frontend.md)
-   [Client side computation](../architecture/016-client-side-computation.md)

## Components

Frontend-specific components live in `src`.

Note that [Frontend Web](../../src/web) and [Frontend AMP](../../src/amp) are separate applications that do not share code, including components. If you build a new component for the web, consider whether you need to build an analogous component for AMP too.
