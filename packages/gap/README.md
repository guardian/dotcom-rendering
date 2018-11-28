# GAP

## Design goals

Guardian Accelerated Pages (GAP) is an AMP-inspired system to manage client-side
performance.

It has slightly different design goals from AMP though:

* designed to meet current Guardian requirements
* extensions can be used without being accepted as official
* not-mobile specific

So it's a bit more relaxed than AMP, which should make it a better fit for existing news-sites, which often have requirements that don't fit within AMP. The downside is it is easier to mess up performance/do the wrong thing in GAP.

Like AMP, Gap is a combination of HTML-guidelines/restrictions, and a Javascript runtime ('gap-core') augmented by custom elements ('extensions').

## How to use

As a minimum, include gap-core in your page. This must be loaded *before*
extensions. `defer` is a good way to achieve this. E.g. in your page head:

    <script defer src="https://s3-eu-west-1.amazonaws.com/com-gu-gap/v0/gap-core.js" />
    .. // some extensions
