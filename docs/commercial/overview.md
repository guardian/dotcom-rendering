# Commercial overview

This document aims to describe the client-side commercial code in Dotcom
Rendering.

Commercial code relates to:

-   serving ads
-   tracking related to ads

We load a single commercial script ('commercial.js') as a high-priority item in
the head (preload). The script is generated from Frontend and performs
considerable logic and loads further third-party scripts, which in turn load
more. As a result, commercial.js is a key contributor to poor client-side
performance on the website.

What does the script do? It's not useful to give a comprehensive answer here,
but to give some examples:

-   consent management
-   place dynamic ad slots
-   populate ad slots (dynamic and static ones)
-   load tracking scripts (such as Lotame)

## Ad providers

To introduce some terms, we use:

-   [Prebid](https://prebid.org/overview/intro.html), a
    [header-bidding](https://digiday.com/media/wtf-header-bidding/) solution
-   [Google Ad Manager](https://en.wikipedia.org/wiki/Google_Ad_Manager)
-   [Ozone](https://www.ozoneproject.com/advertisers) which is an ad platform
    like GAM/DfP but launched by a consortium of UK newspapers including the
    Guardian

## Tracking

-   [Krux](https://www.salesforce.com/products/marketing-cloud/data-management), a
    Salesforce tracking and audience segmentation solution
-   [Lotame](https://www.lotame.com/)

Note, there are several more trackers on the site. A good way to visualise these is:

http://requestmap.webperf.tools/

## Ad slots and components

-   static ads (banner, top-right, most-viewed)
-   dynamic (in-body) ads
-   mechandising slots (such as masterclass below-content onward component)

## Verifying things are working

Unfortunately, the ad team have no checklist or direct tests around this. But
there are a few things to do:

-   check with D+I - the Data + Insight team can identify any widespread
    anomolies, but usually with a lag of a day or more
-   as a basic test, are the ad-slots and components loading correctly?
-   are there any obvious console errors?
-   is Lotame segmentation working? (check window..)
-   is Krux segmentation working? (check ..)
