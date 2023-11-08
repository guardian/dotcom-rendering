# Where should my code live?

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- Automatically created with yarn run createtoc and on push hook -->

-   [Where should my code live?](#where-should-my-code-live)
    -   [File locations](#file-locations)
    -   [File naming schemes](#file-naming-schemes)
    -   [Scripts](#scripts)
    -   [Data Sources \& Extraction](#data-sources--extraction)
        -   [Articles](#articles)
        -   [Fronts](#fronts)
        -   [Other](#other)
        -   [Considerations](#considerations)
            -   [Favour computation on the rendering server over computation on the client](#favour-computation-on-the-rendering-server-over-computation-on-the-client)
            -   [Minimize data over the wire](#minimize-data-over-the-wire)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## File locations

Code for DCR lives in the `src` directory. Inside this directory we have a series of key sub-directories:

-   `server` - Home for server code related the request flow outside of the (p)react content, e.g handlers, html templates, data construction.
-   `client` - Home for client code outside of (p)react context, e.g islands setup, ophan, sentry, etc.
-   `components` - The home of all\* (P)react components, both server & client rendered
-   `lib` - Home for most helper code, anything shared, etc (Note: there is some TSX code in here, but mostly it's just typescript)
-   `layouts` - Home for 'layouts' of full pages including articles & fronts, along with code for deciding which are picked
-   `model` - Home of all 'transformation' code - anything that's taking one type and turning it into another, or 'enhancing' a type, generally called from the server directory.
-   `types` - Home of most type definitions, generally used for types that exist outside the context of any one file or piece of logic
-   `static` - Home for static content which is uploaded directly to S3 in the build process
-   `experiments` - Lib to store code directly related to experiments & a/b tests which are running

\*Excluding layouts & some libs

## File naming schemes

In DCR, we use file suffixes to help provide some context & information around files, this can generally be broken down into two categories:

**Rendering Target**

DCR supports rendering for different targets - web, apps & amp.
To mark code which is only to be used for specific rendering target, this should be added to the suffix of the file, e.g `MyComponent.apps.tsx`, `MyLib.amp.ts` or `MyLayout.web.tsx`.

These files all still live in the directories, and the suffixes are used to determine which target that code is for.
In the case that there's no suffix, it can generally be assumed this code can be shared across targets.

> Note: When this was set up, most web code stayed without suffixes, which means there's a chance it's not compatible with other targets, so be vigilant when using shared code on a new target for the first time.

> Note: Some un-suffixed code might be shared across apps & web, but not AMP, or some other combination, so keep an eye out to see if there's a platform specific version of the file you're working on!

**Islands / Client side (P)react**

We use Islands when we want to load (P)react code on the client:

```tsx
<Island ... >
	<MyComponent  someProp={...} />
</Island>
```

To support this in the build system, we require that the files for components which are used in an island are suffixed with `.importable.tsx`.
e.g `MyComponent.importable.tsx`. They also must always live in the `src/components` directory.

When we have different islands depending on the rendering target, the `.importable` should always come last, e.g `MyComponent.apps.importable.ts`.

## Scripts

Externally hosted third party scripts should always be loaded asynchronously. If possible, they should be loaded conditionally using JavaScript by injecting a script element into the head of the document.

When adding 3rd party that need to be on every page, you can do so by adding to the `generateScriptTags` call made in each `render.<type>.<target>.tsx` file.

If you need to add first party code, this can be done by setting up a new dynamically loaded entry in `src/client/main.web.ts`. This will then be loaded on every page.

## Data Sources & Extraction

### Articles

Data for Articles originates from CAPI, it's then transformed by Frontend via the via the [`DotcomponentsDataModel`](https://github.com/guardian/frontend/blob/main/article/app/model/dotcomponents/DotcomponentsDataModel.scala).

Once the data reaches DCR it's then 'enhanced' with steps that keep the existing types, but will break out some elements & expand the model. This code lives in the `src/,model` directory. In the past this enhancing was done in DCR for expediency, but more recently we've been looking to keep data-transformation in DCR in order to reduce dependency on Frontend's data-models, which are often based around old rendering code.

### Fronts

Data for Fronts is an amalgamation of mostly CAPI & Fronts API data in the format of a `PressedPage`, which originates from Frontend.
This data is then transformed in DCR in order get it to a rendering-friendly format. This is done in the `src/model` directory.

### Other

DCR also renders a few other smaller content types, as a general rule the 'enhance' or transformation function will be defined in the `index.<type>.<target>.ts` located in `src/server`, and any code related to the transformation lives in the `src/model` directory.

### Considerations

#### Favour computation on the rendering server over computation on the client

When data is transformed in DCR, it should always be done on the server where possible, avoiding having to burden the client with the resource use. Generally we want the client to receive as little data and have to do as little work as possible.

**Note:** Not all logic can be cached on the server, for instance logic involving geolocation or user data. Take care not to split the cache without due consideration.

#### Minimize data over the wire

We should be considerate that DCR is rendered by a network request, meaning that all data sent to DCR by Frontend must be parsed, sent by a network request & re-parsed by DCR, all of which can have an impact on performance.
