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
		name: 'fronts-curation-europe-beta-front',
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
| mvt0 | 0=commercial-ad-block-ask:control,1=commercial-some-100-perc-test:control,2=fronts-curation-europe-beta-front:control |
| mvt1 | 0=commercial-ad-block-ask:variant,1=commercial-some-100-perc-test:variant,2=fronts-curation-europe-beta-front:variant |
| mvt2 | 0=commercial-ad-block-ask:control,1=commercial-some-100-perc-test:control,2=fronts-curation-europe-beta-front:control |
| mvt3 | 0=commercial-ad-block-ask:variant,1=commercial-some-100-perc-test:variant,2=fronts-curation-europe-beta-front:variant |
| mvt4 | 0=commercial-ad-block-ask:control,1=commercial-some-100-perc-test:control,2=fronts-curation-europe-beta-front:control |
| mvt5 | 0=commercial-ad-block-ask:variant,1=commercial-some-100-perc-test:variant,2=fronts-curation-europe-beta-front:variant |
| mvt6 | 0=commercial-ad-block-ask:control,1=commercial-some-100-perc-test:control,2=fronts-curation-europe-beta-front:control |
| mvt7 | 0=commercial-ad-block-ask:variant,1=commercial-some-100-perc-test:variant,2=fronts-curation-europe-beta-front:variant |
| mvt8 | 0=commercial-ad-block-ask:control,1=commercial-some-100-perc-test:control,2=fronts-curation-europe-beta-front:control |
| mvt9 | 0=commercial-ad-block-ask:variant,1=commercial-some-100-perc-test:variant,2=fronts-curation-europe-beta-front:variant |
| mvt10 | 0=commercial-some-other-test:control,1=commercial-some-100-perc-test:control,2=fronts-curation-europe-beta-front:control |
| mvt11 | 0=commercial-some-other-test:variant,1=commercial-some-100-perc-test:variant,2=fronts-curation-europe-beta-front:variant |
| mvt12 | 0=commercial-some-other-test:control,1=commercial-some-100-perc-test:control,2=fronts-curation-europe-beta-front:control |
| mvt13 | 0=commercial-some-other-test:variant,1=commercial-some-100-perc-test:variant,2=fronts-curation-europe-beta-front:variant |
| mvt14 | 0=commercial-some-other-test:control,1=commercial-some-100-perc-test:control,2=fronts-curation-europe-beta-front:control |
| mvt15 | 0=commercial-some-other-test:variant,1=commercial-some-100-perc-test:variant,2=fronts-curation-europe-beta-front:variant |
| mvt16 | 0=commercial-some-other-test:control,1=commercial-some-100-perc-test:control,2=fronts-curation-europe-beta-front:control |
| mvt17 | 0=commercial-some-other-test:variant,1=commercial-some-100-perc-test:variant,2=fronts-curation-europe-beta-front:variant |
| mvt18 | 0=commercial-some-other-test:control,1=commercial-some-100-perc-test:control,2=fronts-curation-europe-beta-front:control |
| mvt19 | 0=commercial-some-other-test:variant,1=commercial-some-100-perc-test:variant,2=fronts-curation-europe-beta-front:variant |
| mvt20 | 0=commercial-some-100-perc-test:control,1=fronts-curation-europe-beta-front:control |
| mvt21 | 0=commercial-some-100-perc-test:variant,1=fronts-curation-europe-beta-front:variant |
| mvt22 | 0=commercial-some-100-perc-test:control,1=fronts-curation-europe-beta-front:control |
| mvt23 | 0=commercial-some-100-perc-test:variant,1=fronts-curation-europe-beta-front:variant |
| ... | |
| mvt96 | 0=commercial-some-100-perc-test:control,1=fronts-curation-europe-beta-front:control |
| mvt97 | 0=commercial-some-100-perc-test:variant,1=fronts-curation-europe-beta-front:variant |
| mvt98 | 0=commercial-some-100-perc-test:control,1=fronts-curation-europe-beta-front:control |
| mvt99 | 0=commercial-some-100-perc-test:variant,1=fronts-curation-europe-beta-front:variant |
