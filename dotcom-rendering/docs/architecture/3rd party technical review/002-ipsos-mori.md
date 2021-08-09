# Ipsos Mori tagging

## Metadata

-   Date: 24/09/2020 (Updated 27/11/2020)
-   Author: Jon Soul
-   Platform concerned: Web & AMP

## Context

The Publishers Audience Measurement Company (PAMCo), is the governing body which oversees audience measurement for the published media industry. They are responsible for the new joint industry currency (JIC) called PAMCo – Audience Measurement for Publishers in place of NRS data. They have recently made the decision to change their digital measurement partner from Comscore to Ipsos Mori, hence why we need to make the change. This measurement is important to commercial and comms. It's what allows us to state we are the most read quality news brand in the UK. Without it, our reputation and revenue would be severely diminished.

Their tagging technology partner is called Fistnet d.o.o. who provide a tagging system called Dotmetrics to capture and analyse site data.

[Dotmetrics technical documentation on tagging](https://drive.google.com/file/d/1mdCThbv6eWgTh8U76CcefaNnR9Ef9Yyt/view?usp=sharing)
[Ipsos Iris general guide to tagging and publisher structure](https://docs.google.com/presentation/d/1fSp-2qsPp5ztdMS30fKkXZjqaWe7iUa-p_agdYGN7T8/edit?usp=sharing)

## Data privacy engineering review

The tag being used is the Dotmetrics tag, which is hosted on AWS EC2. No documented configuration is available, however if you inspect their script it appears that some features may be disabled.

When used the tracker send the following information to the server:

-   `id`: this is the ID of the tag, which is used to identify the type of content (e.g. Sport)
-   `url`: The URL of page being viewed
-   `dom`: The domain of the page being viewed
-   `r`: The timestamp of the event (page view)
-   `pvs`: Integer to indicate whether the event corresponds to a single page view or multiple (i.e. if the page is embedded)
-   `pvid`: Randomly generated string to identify the page view

Subsequent requests are also fired off with similar fields, but also a large number of other data points that enable device fingerprinting that is done on the server by dotmetrics. These data points are not sent on every page view, but are presumably refreshed from time to time.

Standard HTTP headers and other data from the request will also be sent. This includes referrer, user agent and IP address. IP address in particular carries more significance both as an identifier and as a geolocator. Dotmetrics have said that IP address is used to filter out requests that do not originate from the UK, although we should seek reassurance that it is not used for anything beyond that.

Cookies are also dropped and sent with each request:

-   `Dotmetrics.UniqueUserIdentityCookie` containing a user identifier, a creation date and a global identifier. It is not clear what the global identifier is for.
-   `DotMetrics.DeviceKey` containing a device ID which appears to be unusued on web.

The `url` field for the Guardian does not usually contain personal information, but sometimes it may as the previous page URL may contain an identifier. This is not only theoretical and there is [good documentation about privacy concerns of referrer](https://developer.mozilla.org/en-US/docs/Web/Security/Referer_header:_privacy_and_security_concerns). It is a reminder to always follow good security practice on our website (i.e. no identifiers in URLs) and to never include these trackers on unnecessary pages (e.g. identity) where the risk of PII leakage may be higher.

While none of the other fields individually contains information [that relates to an identified or identifiable individual](https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/key-definitions/what-is-personal-data/), it is worth mentioning that by using a combination of those fields it may be possible to recreate a session identifier. It is difficult to estimate if there will be enough information to potentially identify an individual.

### Recommended mitigations

1.  Reduce the number of fields being sent to only ones that will be used
2.  Switch to a server side architecture enabling IP addresses of readers to not be shared
3.  Either reduce the scope of what is tracked (i.e. remove user identifiers) or seek user consent before tracking

### Initially implemented mitigations

1.  We are not currently able to control which fields are sent directly, but have requested such changes from ipsos/dotmetrics for the future
2.  We have requested the ability to integrate server side, but it is not yet possible
3.  User consent is needed before we load any dotmetrics tag on the site

## Security engineering review

### Web

Adding a third-party script with access to the main window involve several risks:

-   Ability for the third-party script to modify content of the page
-   Ability for the third-party script to access cookies and local storage
-   Ability for the third-party script to redirect user to a different page and domain
-   Ability for the third-party script to fingerprint users
-   Ability for the third-party script to send/retrieve data over the network

Unfortunately our current security control are not enough to prevent most of those behaviours:

-   Our CSP is allowing `unsafe-eval` and `unsafe-inline`
-   We are not loading each third-party scripts in an iframe with reduced capabilities.
-   We are not using [subresource intregrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to ensure content of script is not changing.

Additionally loading a third-party script from a storage not controlled by us, allows the content of the script to be modified from its original purpose for malicious activities. This may be slightly complicated further for Dotmetrics which uses the initial script to load further scripts from their servers.

#### Recommended mitigations

Should the events be sent client-side:

1.  Audit the current version of the script ensuring it only does what is expected and create a hash of it. This is particularly complicated for Ipsos because its tag fetches further scripts
2.  Add [subresource intregrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) so the script could not be modified maliciously

#### Initially implemented mitigations

1.  We have examined the current version of the script
2.  We are currently working with ipsos/dotmetrics to enable subresource integrity because it is not yet possible

### AMP

Similar security and data privacy considerations are applicable also for AMP. The implementation is similar and our CSP is the same.

## Perfomance engineering review

Adding another tracker sending regularly will have a negative impact on performance. The Dotmetrics script on web loads additional scripts which total around 31kB in an initial experiment. The main script loaded in particular is 28kB on its own, which for comparison is larger than google analytics and 15x the size of comscore.

The most time consuming part of the requests made by Dotmetrics scripts is the DNS lookup and initial connection. This could be optimised by adding prefetch/preconnect hints for these domains, although if this tag was to be behind consent then that may raise additional privacy concerns - and optimising loading of this script will not be particularly advantageous.

The Dotmetrics documentation mentions that script tags should be placed close to the page header. This implies that they suggest execution should be made as early as possible, but that it may not be absolutely critical and we therefore may take the decision to delay execution. I suggest we take that strategy to avoid blocking the loading of critical content at all.

#### Recommended mitigations

There are 4 areas than can be investigated to ensure our performances are less degraded:

1.  Deprioritise the loading of the initial script or the subsequent scripts it loads via an alternate loading strategy
2.  Only load the tag on UK page views
3.  Preconnect to optimise DNS lookup and initial connection
4.  Do not send the events client-side but server-side. This approach has several benefits:
    a. Do not require sending custom events in both apps and web platforms
    b. Ensure better privacy by design by not sharing any PII information such as IP addresses

#### Initially implemented mitigations

1.  Script loading is done via a callback from the CMP, and so it is low priority
2.  The tag is only loaded on UK page views
3.  Preconnect is probably not efficient since we are only loading on UK pages
4.  We have asked ipsos/dotmetrics for this ability in the future
