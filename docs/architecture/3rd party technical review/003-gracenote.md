# Gracenote Tag

## Metadata

-   Date: 26th April 2021
-   Author: Josh Buckland
-   Platform concerned: Web & AMP(?)

## Context
We are due to use a third party, Gracenote, to supply us the data for our Olympics coverage. This tag will have to be included on certain pages, meaning that we need to conduct a review of the tag to ensure we're uncovering any privacy or performance concerns.
- We will be using Gracenote for both the data and emebedded "core editorial content" around the Olympics. This frees up the visuals team from creating and supporting this content.
- These will be classed differently to "editorial embeds" since they are supplying core editorial content.

## Data privacy engineering review

- Google Tag Manager and google analytics included in tag script.
- `pixel.gif` request URL with minified query params sending a request to `https://widgets.sports.gracenote.com/` e.g.
	- `c`: 1422
	- `wid`: 1422-wintergames-medaltable-en_gb
	- `w`: default-medaltable
	- `t`: 1619445740490
- There seem to be no dropped cookies or use of local storage by the tag.

Standard HTTP headers and other data from the request will also be sent. This includes referrer, user agent and IP address.
IP address in particular carries more significance both as an identifier and as a geolocator. We should seek confirmation as to what this information will/will not be used for.
The `referer` field is unlikelt to contain personal information, but sometimes it may as the previous page URL may contain an identifier. As has been mentioned in previous 3rd party technical reviews, this is not only theoretical and there is [good documentation about privacy concerns of referrer](https://developer.mozilla.org/en-US/docs/Web/Security/Referer_header:_privacy_and_security_concerns). It is a reminder to always follow good security practice on our website (i.e. no identifiers in URLs) and we should ensure not to include the embeds on unnecessary pages e.g. identity (though this is admittedly _extremely_ unlikely) where the risk of PII leakage may be higher.

While none of the other fields individually contains information [that relates to an identified or identifiable individual](https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/key-definitions/what-is-personal-data/), it is worth mentioning that by using a combination of those fields it may be possible to recreate a session identifier. It is difficult to estimate if there will be enough information to potentially identify an individual.

There is a request to a script using https://www.instana.com/. The code suggests that this is for feature switches, but a confirmation on what Instana is, and what data is shared is required.
### Recommended mitigations
1. Request Google Analytics be removed from the script.
2. Remove the universal analytics script from `gns.widget.loader.js` and `gns.widget.initializer.js`
3. Confirm the usage of https://www.instana.com/
4. Find out what the `pixel.gif` request is doing and what information is being sent.
	- Identify how to minimise this.

### Initially implemented mitigations
1. Gracenote have confirmed they'll be dropping Google Analytics for the Olympics

## Security engineering review

### Web

**As per revious 3rd party reviews:**

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

Additionally loading a third-party script from a storage not controlled by us, allows the content of the script to be modified from its original purpose for malicious activities. This is slightly complicated further as the initial script is used to load further scripts.


#### Recommended mitigations

Should the events be sent client-side:

1.  Audit the current version of the script ensuring it only does what is expected and create a hash of it. This is particularly complicated because the tag fetches further scripts and so we can only check that initial script in this way.
2.  Add [subresource intregrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) so the script could not be modified maliciously

#### Initially implemented mitigations
1.  We have examined the [current version of the script](https://interactive.guim.co.uk/uploader/embed/2021/03/index-html-zip/giv-3902oQ13ly03QAja/)


## Performance engineering review

The initial Gracenote script is 25.3kB and this then loads in multiple other scripts, JSON file and SVGs. 

On the initial load, around 377kB are transferred taking 6.8s on an empty cache & fast 3G throttled network.

At least two of the scripts are >30kB with another being 181kB. There are then also around 30 SVGs loaded in which range ins  size from about 1kB to 19.8kB.

Finally, the script makes a regular call to update data every 10 seconds or so which are 1.5kB in size.

### Mitigations

- Remove `https://www.googletagmanager.com/gtag/js?id=UA-xxx` request for 35kb
- Remove `https://www.google-analytics.com/analytics.js`
- Some flag SVGs have a large file size. Reviewing a [specific example](https://images.sports.gracenote.com/images/lib/basic/geo/country/flag/SVG/2203.svg), we can use a lossless SVG  compressor, like https://vecta.io/nano, to remove 17.8% of the file size immediately.
- The SVGs loaded in are 750w x 500h but are used in 42w x 28h containers. There may be potential to reduce complexity of SVGs, and thus file size, for use in small image containers that don't need the high resolution.
- The CSS attempts to load several font-faces but the URL is defined as ` url("[object Module]#iefix")` in [the CSS](https://widgets.sports.gracenote.com/v2.6.43/widgets/default/medaltable.css). My assumption is that this is currently a bug, but if the widget loads in several fonts then there will be a major asset size increase. We should use system fonts where possible and avoid loading a number of large font assets.
- There is an object-assign polyfill included in /v2.6.43/widgets/default/medaltable.js that is unlikely to be needed as Object.Assign is widely supported in browsers. If it is required, it also seems to be included twice.
- The script loads react and react-dom 16. We've had success with Preact X and would recommend seeing if it would meet the needs of the widget for major file-size savings. 37kb+ vs 4kb minified + gzipped.




### Initially implemented mitigations



## Status
