import type { Inline1Props } from '@guardian/support-dotcom-components/dist/src/shared/types/props/inline1';

const variant = {
	name: 'Inline1SupportMessage',
	message: {
		type: 'Inline1SupportMessage',
		heading: 'Not for sale',
		body: 'The Guardian’s expert news coverage is funded by people like you, not a billionaire owner. Will you help us keep our independent journalism free and open to all today?',
		primaryCta: {
			baseUrl: '#',
			text: 'Support us',
		},
		image: {
			mainUrl:
				'https://uploads.guim.co.uk/2025/06/12/not_for_sale_bg_scaled.svg',
			mobileUrl:
				'https://uploads.guim.co.uk/2025/06/12/not_for_sale_bg_scaled.svg',
			tabletUrl:
				'https://uploads.guim.co.uk/2025/06/12/not_for_sale_bg_scaled.svg',
			desktopUrl:
				'https://uploads.guim.co.uk/2025/06/12/not_for_sale_bg_scaled.svg',
			altText: 'Not for sale',
		},
	},
};

export const props: Inline1Props = {
	variant,
};
