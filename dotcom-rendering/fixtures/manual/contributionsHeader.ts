export const contributionsHeaderResponse = {
	data: {
		module: {
			url: `https://contributions.guardianapis.com/modules/v3/headers/Header.js`,
			name: 'Header',
			props: {
				content: {
					heading: 'Support the Guardian',
					subheading: 'SFD_HEADER | CONTROL',
					primaryCta: {
						text: 'Support the Guardian',
						baseUrl: 'https://support.theguardian.com/contribute',
					},
					secondaryCta: {
						text: 'Subscribe',
						baseUrl: 'https://support.theguardian.com/subscribe',
					},
				},
				mobileContent: {
					heading: '',
					subheading: '',
					primaryCta: {
						text: 'Subscribe',
						baseUrl: 'https://support.theguardian.com/subscribe',
					},
				},
				tracking: {
					ophanPageId: 'mockPageViewId',
					platformId: 'GUARDIAN_WEB',
					referrerUrl: 'https://www.theguardian.com/uk',
					clientName: 'dcr',
					abTestName: 'SINGLE_FRONT_DOOR__HEADER',
					abTestVariant: 'CONTROL',
					campaignCode:
						'header_support_SINGLE_FRONT_DOOR__HEADER_CONTROL',
					componentType: 'ACQUISITIONS_HEADER',
				},
				countryCode: 'GB',
			},
		},
		meta: {
			abTestName: 'SINGLE_FRONT_DOOR__HEADER',
			abTestVariant: 'CONTROL',
			campaignCode: 'header_support_SINGLE_FRONT_DOOR__HEADER_CONTROL',
			componentType: 'ACQUISITIONS_HEADER',
		},
	},
};

export const contributionsSignInPromptHeaderResponse = {
	data: {
		module: {
			url: `https://contributions.guardianapis.com/modules/v3/headers/SignInPromptHeader.js`,
			name: 'SignInPromptHeader',
			props: {
				content: {
					heading: 'Thank you for subscribing',
					subheading: 'Remember to sign in for a better experience',
					primaryCta: {
						baseUrl: 'https://profile.theguardian.com/register',
						text: 'Complete registration',
					},
					benefits: [
						'Ad free',
						'Fewer interruptions',
						'Newsletters and comments',
						'Ad free',
					],
				},
				mobileContent: {
					heading: '',
					subheading: '',
				},
				tracking: {
					ophanPageId: 'mockPageViewId',
					platformId: 'GUARDIAN_WEB',
					referrerUrl: 'https://www.theguardian.com/uk',
					clientName: 'dcr',
					abTestName: 'SINGLE_FRONT_DOOR__HEADER',
					abTestVariant: 'CONTROL',
					campaignCode:
						'header_support_SINGLE_FRONT_DOOR__HEADER_CONTROL',
					componentType: 'ACQUISITIONS_HEADER',
				},
				countryCode: 'GB',
			},
		},
		meta: {
			abTestName: 'SINGLE_FRONT_DOOR__HEADER',
			abTestVariant: 'CONTROL',
			campaignCode: 'header_support_SINGLE_FRONT_DOOR__HEADER_CONTROL',
			componentType: 'ACQUISITIONS_HEADER',
		},
	},
};
