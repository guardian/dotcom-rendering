# AB Testing

## Overview

This will be a central location for all AB tests running on the theguardian.com. The goal is to have a single source of truth for both client and server side tests.

The build and release CI steps will ensure that the tests are validated and serialized correctly before being uploaded to the Fastly dictionary.

Having both client and server side tests managed here will allow us to use the same logic (within fastly) to determine which test a user is in regardless of if it is client or server side.

Our fastly vcl code will set a cookie that can be used by client or server code to determine which test a user is in. For server side tests it will additionally add to a header that the cache will be split on. [Example implementation here](https://fiddle.fastly.dev/fiddle/96e30123)

## How build/CI step will work

### PR

-   Import the ab tests
-   Validate the ab tests
    -   Check if there's enough space, all test variant percentages need to add up to <=100%
    -   Check there aren't too many server side tests (to avoid splitting the cache too much, acceptable number TBD)
    -   Validate the test expiration date is in the future and on a weekday
-   Generate a visual representation of the tests and add it to the PR as a comment, with before/after?
-   Also update visual in a markdown file in the repo
-   Build/serialize the tests (to check it works)

### Release

-   Import and validate
-   Build/serialize the tests
    -   Build the keys and values for the dictionary
-   Uploads the key-values to the fastly dictionary
    -   Requries some work to interact with the [fastly dictionary API](https://www.fastly.com/documentation/reference/api/dictionaries/dictionary-item/)

## Build output example

This config:

```ts
	// Example client side AB test definition
	{
		name: 'commercial-ad-block-ask',
		description:
			'Show new ad block ask component in ad slots when we detect ad blocker usage',
		owners: ['commercial.dev@guardian.co.uk'],
		status: 'ON',
		expirationDate: new Date('2025-05-31'),
		type: 'client',
		highImpact: false,
		controlGroup: { id: 'control', size: 5 / 100 },
		variantGroups: [{ id: 'variant', size: 5 / 100 }],
	},
	{
		name: 'commercial-some-other-test',
		description:
			'',
		owners: ['commercial.dev@guardian.co.uk'],
		status: 'ON',
		expirationDate: new Date('2025-05-31'),
		type: 'client',
		highImpact: false,
		controlGroup: { id: 'control', size: 5 / 100 },
		variantGroups: [{ id: 'variant', size: 5 / 100 }],
	},
	{
		name: 'commercial-some-100-perc-test',
		description:
			'test all the things',
		owners: ['commercial.dev@guardian.co.uk'],
		status: 'ON',
		expirationDate: new Date('2025-05-31'),
		type: 'client',
		highImpact: false,
		controlGroup: { id: 'control', size: 50 / 100 },
		variantGroups: [{ id: 'variant', size: 50 / 100 }],
		allowOverlap: true,
	},
	// Example server side AB test definition
	{
		name: 'webex-europe-beta-front',
		description:
			'Allows viewing the beta version of the Europe network front',
		owners: [
			'project.fairground@theguardian.com',
			'dotcom.platform@theguardian.com',
		],
		status: 'ON',
		expirationDate: new Date('2025-04-02'),
		type: 'server',
		highImpact: false,
		controlGroup: { id: 'control', size: 50 / 100 },
		variantGroups: [{ id: 'variant', size: 50 / 100 }],
		allowOverlap: true,
	},
```

Could result in the following key-values to be stored in the dictionary:
| key | value |
| -------- | ------- |
| client-bucket-0 | commercial-ad-block-ask:control,commercial-some-100-perc-test:control |
| client-bucket-1 | commercial-ad-block-ask:variant,commercial-some-100-perc-test:variant |
| client-bucket-2 | commercial-ad-block-ask:control,commercial-some-100-perc-test:control |
| client-bucket-3 | commercial-ad-block-ask:variant,commercial-some-100-perc-test:variant |
| client-bucket-4 | commercial-ad-block-ask:control,commercial-some-100-perc-test:control |
| client-bucket-5 | commercial-ad-block-ask:variant,commercial-some-100-perc-test:variant |
| client-bucket-6 | commercial-ad-block-ask:control,commercial-some-100-perc-test:control |
| client-bucket-7 | commercial-ad-block-ask:variant,commercial-some-100-perc-test:variant |
| client-bucket-8 | commercial-ad-block-ask:control,commercial-some-100-perc-test:control |
| client-bucket-9 | commercial-ad-block-ask:variant,commercial-some-100-perc-test:variant |
| client-bucket-10 | commercial-some-other-test:control,commercial-some-100-perc-test:control |
| client-bucket-11 | commercial-some-other-test:variant,commercial-some-100-perc-test:variant |
| client-bucket-12 | commercial-some-other-test:control,commercial-some-100-perc-test:control |
| client-bucket-13 | commercial-some-other-test:variant,commercial-some-100-perc-test:variant |
| client-bucket-14 | commercial-some-other-test:control,commercial-some-100-perc-test:control |
| client-bucket-15 | commercial-some-other-test:variant,commercial-some-100-perc-test:variant |
| client-bucket-16 | commercial-some-other-test:control,commercial-some-100-perc-test:control |
| client-bucket-17 | commercial-some-other-test:variant,commercial-some-100-perc-test:variant |
| client-bucket-18 | commercial-some-other-test:control,commercial-some-100-perc-test:control |
| client-bucket-19 | commercial-some-other-test:variant,commercial-some-100-perc-test:variant |
| client-bucket-20 | commercial-some-100-perc-test:control |
| client-bucket-21 | commercial-some-100-perc-test:variant |
| client-bucket-22 | commercial-some-100-perc-test:control |
| client-bucket-23 | commercial-some-100-perc-test:variant |
| ... | |
| client-bucket-96 | commercial-some-100-perc-test:control |
| client-bucket-97 | commercial-some-100-perc-test:variant |
| client-bucket-98 | commercial-some-100-perc-test:control |
| client-bucket-99 | commercial-some-100-perc-test:variant |
| server-bucket-0 | webex-europe-beta-front:control |
| server-bucket-1 | webex-europe-beta-front:variant |
| server-bucket-2 | webex-europe-beta-front:control |
| server-bucket-3 | webex-europe-beta-front:variant |
| server-bucket-4 | webex-europe-beta-front:control |
| server-bucket-5 | webex-europe-beta-front:variant |
| server-bucket-6 | webex-europe-beta-front:control |
| server-bucket-7 | webex-europe-beta-front:variant |
| ... | |
| server-bucket-98 | webex-europe-beta-front:control |
| server-bucket-99 | webex-europe-beta-front:variant |
