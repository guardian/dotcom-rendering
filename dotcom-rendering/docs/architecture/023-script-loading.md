# Script Loading

**Module / Nomodule and Preloading**

## Context

When splitting our Javascript to use dynamic imports, we also needed to review our use of module/nomodule. You can see more context in the write-up below.

## Decision

-   Move from script elements to dynamically loaded scripts
-   Use preload for high-priority scripts to ensure we get benefits of the preparser but let low priority scripts load with script injection
    -   "Use the link tag and place it after the resource that will insert the preloaded resource"
-   Preload our main media image (can we do this?), then fonts, then the high priority Javascript (Our critical path)
-   For **dynamic imports**, implement a mechanism for **high priority** components or scripts that preloads these
-   For all other dynamic imports, rely on fetching after parsing

## Status

In progress

# Write up

Dotcom Rendering uses the Module/Nomodule method to load modern JS to modern browsers and legacy JS to older browsers.

Here's a write up of the approach: <https://philipwalton.com/articles/deploying-es2015-code-in-production-today/>

An the canonical post by Jason Miller: <https://jasonformat.com/modern-script-loading/>

As we [understood at the time](https://github.com/guardian/dotcom-rendering/pull/1151#issuecomment-584687516), we were looking at [double fetching of our scripts](https://gist.github.com/jakub-g/5fc11af85a061ca29cc84892f1059fec) in some browsers, which was less than ideal.

## Preloading of high-priority scripts

As I began to look at conditionally loading our Javascript while also preloading, I came across a [double-download issue](https://developers.google.com/web/updates/2017/12/modulepreload) using type=module and rel=preload.

> There are several credentials modes for resources, and in order to get a cache hit they must match, otherwise you end up fetching the resource twice.

It's possible to work around, and technically the solution is to use modulepreload but modulepreload is poorly supported in our popular browsers. It was shut down as an option [in Next.js](https://github.com/vercel/next.js/issues/8438).

We can use preload as is, but as per Jason's post: "This may have performance drawbacks, since classic script preloading doesn't spread parsing work out over time as well as modulepreload." We need to be careful with what we're going to preload - but we know this - high priority modules.

However, I wondered whether, as we're now looking at preloading priority scripts, we should be reviewing the module/nomodule approach as described in Jason's post for Dynamic loading. He elaborates on the idea in the [Next.JS discussion](https://github.com/vercel/next.js/discussions/7563#discussioncomment-22180). It sounds pretty positive - eliminate the double download issue, while still benefiting from the preload link.

> The trade-off here is that you lose out on the ability for the preload scanner to detect and start fetching resources while the HTML document is being streamed.
>
> However, I believe Next might be in a position where this doesn't matter, since it already generates <link rel=preload> tags for every script resource places them in <head>.
>
> The preload scanner will find and fetch these, which means the corresponding <script> tags aren't necessary to get the benefit of early resource discovery.

One thing to note is that Next.js went with a [script tag route](https://github.com/janicklas-ralph/next.js/blob/canary/packages/next/pages/_document.tsx#L558) in [Next.js 9.1](https://nextjs.org/blog/next-9-1#module--nomodule), not a dynamically loaded script route. Looking in the BBC's source, they do the same.

The question then becomes, what is the browser support for preload link? We lose script tags for the pre-parser, so preload becomes very important. Unfortunately preload is disabled by default [in Firefox](https://caniuse.com/?search=preload), roughly 2.5% of our audience, though it does [seem to be on the verge of being turned on by default](https://bugzilla.mozilla.org/show_bug.cgi?id=1626997) - on 16th Dec FF84 came out and it was rumoured to be a part of that (even stating that it was in the [year-in-review](https://blog.mozilla.org/performance/2020/12/15/2020-year-in-review/)), but it doesn't appear to be, so FF85 in January should contain it.

The FF upgrade path is fairly good, 80% ish of FF users are on the latest, so by late January the support for `preload` by default will be well covered.

## Defer and Async scripts

Some things to note, we current load high priority scripts in the head with `defer` and low priority scripts after the body with `async`.

-   "The `defer` attribute tells the browser not to wait for the script. Instead, the browser will continue to process the HTML, build DOM. The script loads “in the background”, and then runs when the DOM is fully built."
-   "Module scripts behave like `defer` by default – there's no way to make a module script block the HTML parser while it fetches."
-   "In other words, `async` scripts load in the background and run when ready. The DOM and other scripts don’t wait for them, and they don’t wait for anything. A fully independent script that runs when loaded. "

[Source](https://javascript.info/script-async-defer), [Source](https://jakearchibald.com/2017/es-modules-in-browsers/)

In reality, because of the semantics of `defer` and `async` it's often the case that the 'low priority' scripts are parsed earlier than the 'high prirority'.

That said, the semantics of `type="module"` override both, and force them to be `defer`. I believe we should add for our [high-priority scripts](https://github.com/guardian/dotcom-rendering/blob/f406f112c6780e84a3b457ba0320d96a3cdeb6bb/src/web/server/document.tsx#L86), when dynamically loaded, `preload` links including high-priority components and our [low-priority scripts](https://github.com/guardian/dotcom-rendering/blob/f406f112c6780e84a3b457ba0320d96a3cdeb6bb/src/web/server/document.tsx#L105) should be added to the page without preload links so that the semantics of high and low priority are followed.

## Preloading and The Critical Path

If we then rely on preloading for our scripts then we need to think of the strategy for preloading. This is [a great article](https://medium.com/reloading/a-link-rel-preload-analysis-from-the-chrome-data-saver-team-5edf54b08715) on the _critical path_.

> In the context of first contentful paint, we can loosely view the critical path as the set of resources required to reach first contentful paint.

The **critical path** towards First Contentful Paint, is different depending on what elements are in the cache. This isn't a _huge_ issue for us, as we're very good server rendering and therefore our First Contentful Paint relies on the **html** response from the server (and not Javascript), though for things like main media, which is our Largest Contentful Paint - we don't want to block the request for the image with requests for components that are lower priority (almost all, we don't have any interactivity that is more important than the main media image).

That in mind, what is our critical path:

-   Main Media image (Unlikely to be in the cache)
-   Fonts (Likely to be in the cache)
-   Above fold components with Javascript interactivity

I hope that preloading these items in order, gives us the biggest bang for our buck on preloading, without congesting the pipeline.

## Recommendation

My recommendation then is this:

-   Move from script elements to dynamically loaded scripts
-   Use preload for high-priority scripts to ensure we get benefits of the preparser but let low priority scripts load with script injection
    -   "Use the link tag and place it after the resource that will insert the preloaded resource"
-   Preload our main media image (can we do this?), then fonts, then the high priority Javascript (Our critical path)
-   For **dynamic imports**, implement a mechanism for **high priority** components or scripts that preloads these
-   For all other dynamic imports, rely on fetching after parsing
