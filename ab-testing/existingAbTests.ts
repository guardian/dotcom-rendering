import { ABTest } from './types.ts';

export const serverSide: ABTest[] = [
	{
		name: 'webex-sign-in-gate-main-control',
		description:
			'Control audience for the sign in gate to 9% audience. Will never see the sign in gate.',
		owners: [],
		expirationDate: new Date('2025-12-01'),
		type: 'server',
		highImpact: false,
		status: 'ON',
		audienceSize: 9 / 100,
		groups: ['control'],
		audienceSpace: 'A',
	},
	{
		name: 'webex-sign-in-gate-main-variant',
		description:
			'Show sign in gate to 90% of users on 3rd article view, variant/full audience',
		owners: [],
		expirationDate: new Date('2025-12-01'),
		type: 'server',
		highImpact: false,
		status: 'ON',
		audienceSize: 90 / 100,
		audienceOffset: 9,
		groups: ['variant'],
		audienceSpace: 'A',
	},
	{
		name: 'webex-auxia-sign-in-gate',
		description:
			'Experimental use of Auxia to drive the client-side SignIn gate',
		owners: ['growth@guardian.co.uk'],
		expirationDate: new Date('2026-01-30'),
		type: 'server',
		highImpact: false,
		status: 'ON',
		audienceSize: 35 / 100,
		audienceSpace: 'B',
		groups: ['variant'],
	},
	{
		name: 'commercial-prebid-multibid',
		description: 'Test re-enabling the multibid feature in Prebid.js',
		owners: ['commercial.dev@theguardian.com'],
		expirationDate: new Date('2025-07-15'),
		type: 'server',
		highImpact: false,
		status: 'ON',
		audienceSize: 10 / 100,
		groups: [],
	},
];
