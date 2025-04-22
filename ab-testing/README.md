# AB Testing

## Overview

This will be a central location for all AB tests running on the theguardian.com. The goal is to have a single source of truth for both client and server side tests.

The build and release CI steps will ensure that the tests are validated and serialized correctly before being uploaded to the Fastly dictionary API.

Example dictionary setup:

```
table mvt_ab_test_groups {
  // compound key of mvt id and test number
  "mvt0": "0=commercial-ad-block-ask:control,1=commercial-some-100-perc-test:control",
  "mvt1": "0=commercial-ad-block-ask:variant,1=commercial-some-100-perc-test:variant",
}

table active_ab_test_groups {
  "commercial-ad-block-ask:control": "exp=1745971200,type=client",
  "commercial-ad-block-ask:variant": "exp=1745971200,type=client",
  "commercial-some-100-perc-test:control": "exp=1745971200,type=server",
  "commercial-some-100-perc-test:variant": "exp=1745971200,type=server"
}
```

The `mvt_ab_test_groups` table will be used to determine which test a user is in, and the `active_ab_test_groups` table will be used to determine if a test is active and what type it is.

Having both client and server side tests managed here will allow us to use the same logic (within fastly) to determine which test a user is in regardless of if it is client or server side. [See the fiddle for more details](https://fiddle.fastly.dev/fiddle/47149485).

Our fastly vcl code will set a cookie that can be used by client or server code to determine which test a user is in. For server side tests it will additionally add to a header that the cache will be split on.

Opting in to a test will be done similarly to how we do it for server side tests now, by setting a cookie.

Test expirations are stored in the dictionary, and checked by fastly to determine if a test is still active, if a test is expired it won't be served to users.

0% tests are in the `active_ab_test_groups` table so we can still force ourselves into them, but they are not in the `mvt_ab_test_groups` table as they don't take up any mvt id space.

## Limitations

-   The dictionary API has a limit of 1000 items per dictionary, we won't get anywhere near this limit, but it's worth noting.
-   This setups reduces our mvt id space from 0-999999 to 0-99, this should be fine as we have rarely used decimal precision test sizes. This would only came up for example with a multi-variant test that doesn't divide evenly into the total test size, with the current config we sent the variant/group size explicitly so this won't be an issue.

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
		groups: [
			{ id: 'control', size: 5 / 100 },
			{ id: 'variant', size: 5 / 100 }
		],
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
		groups: [
			{ id: 'control', size: 5 / 100 },
			{ id: 'variant', size: 5 / 100 }
		],
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
		groups: [
			{ id: 'control', size: 50 / 100 },
			{ id: 'variant', size: 50 / 100 }
		],
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
		groups: [
			{ id: 'control', size: 50 / 100 },
			{ id: 'variant', size: 50 / 100 }
		],
		allowOverlap: true,
	},
```

Could result in the following key-values to be stored in the dictionary:
| key | value |
| -------- | ------- |
| mvt0 | 0=commercial-ad-block-ask:control,1=commercial-some-100-perc-test:control,2=webex-europe-beta-front:control |
| mvt1 | 0=commercial-ad-block-ask:variant,1=commercial-some-100-perc-test:variant,2=webex-europe-beta-front:variant |
| mvt2 | 0=commercial-ad-block-ask:control,1=commercial-some-100-perc-test:control,2=webex-europe-beta-front:control |
| mvt3 | 0=commercial-ad-block-ask:variant,1=commercial-some-100-perc-test:variant,2=webex-europe-beta-front:variant |
| mvt4 | 0=commercial-ad-block-ask:control,1=commercial-some-100-perc-test:control,2=webex-europe-beta-front:control |
| mvt5 | 0=commercial-ad-block-ask:variant,1=commercial-some-100-perc-test:variant,2=webex-europe-beta-front:variant |
| mvt6 | 0=commercial-ad-block-ask:control,1=commercial-some-100-perc-test:control,2=webex-europe-beta-front:control |
| mvt7 | 0=commercial-ad-block-ask:variant,1=commercial-some-100-perc-test:variant,2=webex-europe-beta-front:variant |
| mvt8 | 0=commercial-ad-block-ask:control,1=commercial-some-100-perc-test:control,2=webex-europe-beta-front:control |
| mvt9 | 0=commercial-ad-block-ask:variant,1=commercial-some-100-perc-test:variant,2=webex-europe-beta-front:variant |
| mvt10 | 0=commercial-some-other-test:control,1=commercial-some-100-perc-test:control,2=webex-europe-beta-front:control |
| mvt11 | 0=commercial-some-other-test:variant,1=commercial-some-100-perc-test:variant,2=webex-europe-beta-front:variant |
| mvt12 | 0=commercial-some-other-test:control,1=commercial-some-100-perc-test:control,2=webex-europe-beta-front:control |
| mvt13 | 0=commercial-some-other-test:variant,1=commercial-some-100-perc-test:variant,2=webex-europe-beta-front:variant |
| mvt14 | 0=commercial-some-other-test:control,1=commercial-some-100-perc-test:control,2=webex-europe-beta-front:control |
| mvt15 | 0=commercial-some-other-test:variant,1=commercial-some-100-perc-test:variant,2=webex-europe-beta-front:variant |
| mvt16 | 0=commercial-some-other-test:control,1=commercial-some-100-perc-test:control,2=webex-europe-beta-front:control |
| mvt17 | 0=commercial-some-other-test:variant,1=commercial-some-100-perc-test:variant,2=webex-europe-beta-front:variant |
| mvt18 | 0=commercial-some-other-test:control,1=commercial-some-100-perc-test:control,2=webex-europe-beta-front:control |
| mvt19 | 0=commercial-some-other-test:variant,1=commercial-some-100-perc-test:variant,2=webex-europe-beta-front:variant |
| mvt20 | 0=commercial-some-100-perc-test:control,1=webex-europe-beta-front:control |
| mvt21 | 0=commercial-some-100-perc-test:variant,1=webex-europe-beta-front:variant |
| mvt22 | 0=commercial-some-100-perc-test:control,1=webex-europe-beta-front:control |
| mvt23 | 0=commercial-some-100-perc-test:variant,1=webex-europe-beta-front:variant |
| ... | |
| mvt96 | 0=commercial-some-100-perc-test:control,1=webex-europe-beta-front:control |
| mvt97 | 0=commercial-some-100-perc-test:variant,1=webex-europe-beta-front:variant |
| mvt98 | 0=commercial-some-100-perc-test:control,1=webex-europe-beta-front:control |
| mvt99 | 0=commercial-some-100-perc-test:variant,1=webex-europe-beta-front:variant |
