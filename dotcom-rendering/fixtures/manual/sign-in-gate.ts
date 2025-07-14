export const mockAuxiaResponseDismissible = {
	status: true,
	data: {
		userTreatment: {
			treatmentId: 'auxia-treatment-001',
			treatmentTrackingId: 'tracking-001',
			surface: 'signin-gate',
			treatmentContent: JSON.stringify({
				title: 'Register for free and continue reading',
				subtitle: "It's still free to read – this is not a paywall",
				body: "We're committed to keeping our quality reporting open. By registering and providing us with insight into your preferences, you're helping us to engage with you more deeply.",
				first_cta_name: 'Register for free',
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
			surface: 'signin-gate',
			treatmentContent: JSON.stringify({
				title: 'Complete registration to continue reading',
				subtitle: 'Registration is required to access this content',
				body: 'To continue reading this article and access our quality journalism, please complete your registration.',
				first_cta_name: 'Complete registration',
				first_cta_link: 'https://profile.theguardian.com/register',
				second_cta_name: '', // Empty makes it non-dismissible
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
			surface: 'signin-gate',
			treatmentContent: JSON.stringify({
				title: 'Register to continue reading',
				subtitle: '',
				body: '',
				first_cta_name: 'Register',
				first_cta_link: 'https://profile.theguardian.com/register',
				second_cta_name: 'Not now',
			}),
		},
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
