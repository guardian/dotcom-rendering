### Module / Nomodule

Dotcom Rendering uses the Module/Nomodule method to load modern JS to modern browsers and legacy JS to older browsers.

Here's a write up of the approach: <https://philipwalton.com/articles/deploying-es2015-code-in-production-today/>

An the canonical post by Jason Miller: <https://jasonformat.com/modern-script-loading/>

As we [understood at the time](https://github.com/guardian/dotcom-rendering/pull/1151#issuecomment-584687516), we were looking at [double fetching of our scripts](https://gist.github.com/jakub-g/5fc11af85a061ca29cc84892f1059fec) in some browsers, which was less than ideal.

As I began to look at conditionally loading our Javascript while also preloading, I came across a [double-download issue](https://developers.google.com/web/updates/2017/12/modulepreload) using type=module and rel=preload. It's possible to work around, and technically the solution is to use modulepreload but modulepreload is poorly supported in our popular browsers. It was shut down as an option [in Next.js](https://github.com/vercel/next.js/issues/8438).

We can use preload as is, but as per Jason's post: "This may have performance drawbacks, since classic script preloading doesn't spread parsing work out over time as well as modulepreload." We need to be careful with what we're going to preload - but we know this - high priority modules.

However, I wondered whether, as we're now looking at preloading priority scripts, we should be reviewing the module/nomodule approach as described in Jason's post for Dynamic loading. He elaborates on the idea in the [Next.JS discussion](https://github.com/vercel/next.js/discussions/7563#discussioncomment-22180) and released in [Next.js 9.1](https://nextjs.org/blog/next-9-1#module--nomodule). It sounds pretty positive - eliminate the double download issue, while still benefiting from the preload link.

The question then becomes, what is the browser support for preload link - we lose script tags for the pre-parser, so preload becomes very important. Unfortunately preload is disabled by default [in Firefox](https://caniuse.com/?search=preload), roughly 2.5% of our audience, though it does [seem to be on the verge of being turned on by default](https://bugzilla.mozilla.org/show_bug.cgi?id=1626997) so we may be able to visit this soon-ish.

It turns out though, that Next.js went with a [script tag route](https://github.com/janicklas-ralph/next.js/blob/canary/packages/next/pages/_document.tsx#L558), not a dynamically loaded script route. Looking in the BBC's source, they do the same.

So which is worse? Double downloading in some older browsers or losing pre-parser preloading in modern Firefox? Given that Firefox (just) pips the older browsers in pageviews, we should stick with the script tag route for the moment.

That said then we have a route - when we code split and dynamically import, we can use preload, there's no concern of double download. We can progressively enhance our main bundles with modulepreload - not well supported but in supported browsers (which make up a good chunk of our traffic) will give a speed boost. And we stick with the script tags, as we can't rely on preload alone over the pre-parser at this point.

-   Stick with script tags for module nomodule

-   Use preload on high-priority components split from app

-   Use modulepreload on the main bundles (not widely supported but progressive enhancement)

#### Side Note

We do not need to add the below workaround as Safari 10 is less than 0.15% of the audience. It still might be worth considering as it's fairly unobtrusive.

~~Safari 10 supports type=module but not the nomodule attribute, so will still load nomodule scripts.~~

~~The method in this Gist prevents loading of the nomodule script: <https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc>~~

~~This is used on the BBC: <https://www.bbc.co.uk/news/world-europe-54002880>~~
