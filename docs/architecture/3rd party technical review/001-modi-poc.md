# MoDI Proof of Concept

## Metadata

-   Date: 17/08/2020
-   Author: Mariot Chauvin
-   Platform concerned: AMP & Web (AMP only for proof of concept)
-	Current status 01/03/2021: Removed from AMP following proof of concept, next steps TBD)

## Context

MoDI is an initiative from [NLA](https://www.nlamediaaccess.com/) to build a new revenue stream for publishers. It will do so by meeting demand of PR industry for engagement metrics in our content by providing analytics tools utilising anonymised first party data owned by publisher.

The Proof of Concept scope consists of deploying the analytics capability on a single section on our primary publicatiom (The Guardian not our other brands).

[MoDI documentation about AMP tracker](https://docs.projectmodi.com/articles/how-to-install-the-amp-tracker/)
[MoDI documentation about Web tracker](https://docs.projectmodi.com/articles/how-to-install-the-javascript-tracker/)

## Data privacy engineering review

The tag being used is the [snowplow tracker](https://github.com/snowplow/snowplow-javascript-tracker) one which is hosted on a cloudfront CDN.
The tracker is configured to not store cookies or using similar storage through configuration of the `stateStorageStrategy` field to `none`.

When used the tracker send the following information to the server:

-   `e`: Event type (pv = page view)
-   `url`: The URL of page being viewed
-   `page`: The title of the page being viewed
-   `refr`: The referring page (if available)
-   `tv`: Tracker version
-   `tna`: The tracker name (sp = snowplow)
-   `aid`: App ID - unique ID for the site
-   `p`: Platform (web, app, mobile)
-   `tz`: User's timezone
-   `lang`: User's browser language
-   `cs`: Page character set
-   `f_pdf`, `f_qt`, `f_realp`, `f_wma`, `f_dir`, `f_fla`, `f_java`, `f_gears`, `f_ag`: Browser features enabled
-   `res`: Screen resolution
-   `cd`: Browser colour depth
-   `eid`: Event ID - unique ID for the event
-   `dtm`: Timestamp when the event occurred
-   `cx`: An encoded string containing the data schema definition, and the page view ID (used to tie the page pings to the page view)
    ({"schema":"iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0","data":[{"schema":"iglu:com.snowplowanalytics.snowplow/web_page/jsonschema/1-0-0","data":{"id":"9ae181be-b45f-4981-8529-ef89346cdd1d"}}]})
-   `vp`: Browser viewport width & height
-   `ds`: Web page width & height
-   `vid`: always '1' because no cookies
-   `sid`: Session ID - generated for each page view
-   `stm`: Timestamp when the event was sent by the browser to our server

The `refr` field do not usually contains personal information, but sometimes it may as the previous page URL may contain an identifier. This is not only theorical and there is [good documentation about privacy concerns of referrer](https://developer.mozilla.org/en-US/docs/Web/Security/Referer_header:_privacy_and_security_concerns).

While none of the other fields individually contains information [that relates to an identified or identifiable individual](https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/key-definitions/what-is-personal-data/), it is worth mentionning that by using a combination of those fields it may be possible to recreate a session identifier. It is difficult to estimate if there will be enough information to potentially identify an individual. However several fields are not used and could be removed from the data being sent:

-   `vp`
-   `vs`
-   `cd`
-   `res`
-   `f_pdf`, `f_qt`, `f_realp`, `f_wma`, `f_dir`, `f_fla`, `f_java`, `f_gears`, `f_ag`
-   `refr`

With the current architecture, it is worth mentionning that [IP adressess will be send](https://discourse.snowplowanalytics.com/t/running-snowplow-in-minimal-mode-for-gdpr/2391) to the collector. While the data will not be processed, the architecture need to be improved past the proof of concept to not leak those information.

### Recommended mitigations

-   Reduce the number of fields being sent to only ones that will be used.
-   Switch to a server side architecture enabling IP addresses of readers to not be shared

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

Additionaly loading a third-party script from a storage not controlled by us, allow the content of the script to be modified from its original purpose for malicious activities.

#### Recommended mitigations

Should the events being sent client-side:

-   Audit the current version of the script ensuring it only does what is expected and create a hash of it.
-   Add [subresource intregrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) so the script could not be modified on the CDN maliciously.

### AMP

TODO

## Perfomance engineering review

Adding another tracker sending regurlary will have a negative impact on performance.
However with the current scope no further analysis have been done.

#### Recommended mitigations

Outside of the proof of concept there are 2 options than can be investigated to ensure our performances are less degraded:

-   Use [idle-until-urgent pattern](https://philipwalton.com/articles/idle-until-urgent/) using a library like [idlize](https://github.com/GoogleChromeLabs/idlize)
-   Do not send the events client-side but server-side. This approach have several benefits:
    -   Do not require sending custom events in both apps and web platforms
    -   Ensure better privacy by design by not sharing any PII information such as IP addresses.
