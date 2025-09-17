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
		dismissable: mockAuxiaResponseDismissible,
		'non-dismissable': mockAuxiaResponseNonDismissible,
		legacy: mockAuxiaResponseLegacy,
		'no-treatment': mockAuxiaResponseNoTreatment,
	};

	const key = body.sectionId as keyof typeof mocks;
	const mock: unknown = mocks[key];

	return mock ?? mockAuxiaResponseNoTreatment;
};
