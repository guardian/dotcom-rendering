import type { AuxiaAPIResponseDataUserTreatment } from '../../src/components/SignInGate/types';

export const mockAuxiaResponseDismissible = {
	status: true,
	data: {
		userTreatment: {
			treatmentId: 'auxia-treatment-001',
			treatmentTrackingId: 'tracking-001',
			treatmentType: 'DISMISSABLE_SIGN_IN_GATE',
			rank: '1',
			contentLanguageCode: 'en-GB',
			surface: 'signin-gate',
			treatmentContent: JSON.stringify({
				title: 'Like uninterrupted reading?\nSo do we. Sign in.',
				subtitle:
					"Sign in to keep reading.\n\nIt's free, and we'll bring you right back here in under a minute.",
				body: '',
				first_cta_name: 'Create a free account',
				first_cta_link: 'https://profile.theguardian.com/register',
				second_cta_name: "I'll do it later",
			}),
		} as AuxiaAPIResponseDataUserTreatment,
	},
};

export const mockAuxiaResponseDismissibleV2 = {
	status: true,
	data: {
		userTreatment: {
			treatmentId: 'auxia-treatment-001',
			treatmentTrackingId: 'tracking-001',
			surface: 'signin-gate',
			treatmentContent: JSON.stringify({
				title: 'A small step for great Journalism. Sign in.',
				subtitle: '',
				body: "It's free and only takes 30 seconds.",
				first_cta_name: 'Create account',
				first_cta_link: 'https://profile.theguardian.com/register',
				second_cta_name: "I'll do it later",
			}),
		},
	},
};

export const mockAuxiaResponseNonDismissible = {
	status: true,
	data: {
		userTreatment: {
			treatmentId: 'auxia-treatment-002',
			treatmentTrackingId: 'tracking-002',
			treatmentType: 'NONDISMISSIBLE_SIGN_IN_GATE',
			rank: '1',
			contentLanguageCode: 'en-GB',
			surface: 'signin-gate',
			treatmentContent: JSON.stringify({
				title: 'Like uninterrupted reading?\nSo do we. Sign in.',
				subtitle:
					"Sign in to keep reading. It's free, and we'll bring you right back here in under a minute.",
				body: '',
				first_cta_name: 'Create a free account',
				first_cta_link: 'https://profile.theguardian.com/register',
				second_cta_name: '', // Empty makes it non-dismissible
			}),
		} as AuxiaAPIResponseDataUserTreatment,
	},
};

export const mockAuxiaResponseNonDismissibleV2 = {
	status: true,
	data: {
		userTreatment: {
			treatmentId: 'auxia-treatment-002',
			treatmentTrackingId: 'tracking-002',
			surface: 'signin-gate',
			treatmentContent: JSON.stringify({
				title: 'Sorry for the interruption. We believe in free, independent journalism for all. Sign in or register to keep reading.',
				subtitle:
					"Once you are signed in, we'll bring you back here shortly.",
				body: '',
				first_cta_name: 'Create account',
				first_cta_link: 'https://profile.theguardian.com/register',
				second_cta_name: '',
			}),
		},
	},
};

export const mockAuxiaResponseLegacy = {
	status: true,
	data: {
		userTreatment: {
			treatmentId: 'default-treatment-id', // This triggers legacy gate
			treatmentTrackingId: 'legacy-tracking',
			treatmentType: 'DISMISSABLE_SIGN_IN_GATE',
			rank: '1',
			contentLanguageCode: 'en-GB',
			surface: 'signin-gate',
			treatmentContent: JSON.stringify({
				title: 'Like uninterrupted reading?\nSo do we. Sign in.',
				subtitle: '',
				body: '',
				first_cta_name: 'Create a free account',
				first_cta_link: 'https://profile.theguardian.com/register',
				second_cta_name: 'Not now',
			}),
		} as AuxiaAPIResponseDataUserTreatment,
	},
};

export const mockAuxiaResponseNoTreatment = {
	status: false,
	data: undefined,
};

export const getAuxiaMock = (payload: string): unknown => {
	const body = JSON.parse(payload) as Record<string, unknown>;

	const mocks = {
		v1: {
			dismissable: mockAuxiaResponseDismissible,
			'non-dismissable': mockAuxiaResponseNonDismissible,
			legacy: mockAuxiaResponseLegacy,
			'no-treatment': mockAuxiaResponseNoTreatment,
		},
		v2: {
			dismissable: mockAuxiaResponseDismissibleV2,
			'non-dismissable': mockAuxiaResponseNonDismissibleV2,
			legacy: mockAuxiaResponseLegacy,
			'no-treatment': mockAuxiaResponseNoTreatment,
		},
	};

	const key = body.sectionId as keyof (typeof mocks)[keyof typeof mocks];
	const version = (body.articleIdentifier as string).includes('v2')
		? 'v2'
		: 'v1';
	const mock: unknown = mocks[version][key];

	return mock ?? mockAuxiaResponseNoTreatment;
};
