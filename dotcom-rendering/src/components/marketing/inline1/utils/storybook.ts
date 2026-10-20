import type { Inline1Props, Inline1Variant } from '../SupporterRevenue';

const variant: Inline1Variant = {
	name: 'Inline1SupportMessage',
	type: 'Inline1SupportMessage',
	heading: 'Not for sale',
	body: 'The Guardian’s expert news coverage is funded by people like you, not a billionaire owner. Will you help us keep our independent journalism free and open to all today?',
	primaryCta: {
		baseUrl: 'https://support.theguardian.com/contribute',
		text: 'Support us',
	},
	image: {
		mobileUrl:
			'https://uploads.guim.co.uk/2025/06/12/not_for_sale_bg_scaled.svg',
		tabletUrl:
			'https://uploads.guim.co.uk/2025/06/12/not_for_sale_bg_scaled.svg',
		desktopUrl:
			'https://uploads.guim.co.uk/2025/06/12/not_for_sale_bg_scaled.svg',
		altText: 'Not for sale',
	},
};

export const props: Inline1Props = {
	variant,
};
