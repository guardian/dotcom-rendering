# Performance budgets

We believe our journalism should be accessible to everyone. As internet connectivity and feature devices continue to become more affordable, we should aim to support users on lower spec devices with slower network speeds.

Performance budgets will ensure we are meeting this goal. These budgets will be strictly enforced where possible (the build will break), and will be monitored daily by the platform team. Where applicable, budgets will be measured across mobile 3G, 6x slower.

## First meaningful paint within 3 seconds

According to a Google Data analysis from March 2016, 53% of page views are abandoned if a page doesn't load within 3 seconds<sup>[[1]](#refs--google)</sup>. We aim to keep page load within this limit on slower networks and devices. We are using First Meaningful Paint as the guiding metric as, from a user perspective, a page isn't loaded until they are able to start engaging with the content.

## Time to interactive (consistently interactive) within 5 seconds

Google's Data analysis suggests that ensuring the page is interactive within 5 seconds provides significant improvement for a variety of websites in terms of:

-   bounce rates
-   page view per session
-   session length
-   viewability
-   ad revenue

We aim to ensure our pages are consistently interactive within 5 seconds of the initial request.

## Our critical JavaScript [bundle size](https://github.com/guardian/dotcom-rendering/blob/main/package.json#L13-L19) will not exceed 120KB

Alex Russell conducted analysis of real world JavaScript in 2017<sup>[[2]](#refs--alex-russell)</sup>. He concluded that to ensure a time to interactive of <= 5 seconds on first load, sites should serve between 130KB and 170KB of critical JavaScript. Since we don't have direct control over the size of all JavaScript, we will keep our critical JavaScript bundles below 120KB (minified and gzipped).

## References:

<a name="refs--google"></a>

-   [1](#refs--google) - [The need for mobile speed](http://g.co/mobilespeed)
    <a name="refs--alex-russell"></a>
-   [2](#refs--alex-russell) - [Can You Afford It?: Real-world Web Performance Budgets](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)
