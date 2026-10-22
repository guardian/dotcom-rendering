import type { Inline1Props } from '@guardian/support-dotcom-components/dist/shared/types/props/inline1';

const variant = {
	name: 'Inline1SupportMessage',
	message: {
		type: 'Inline1SupportMessage',
		heading: 'Two-line headline for the primary messaging ',
		body: 'Lorem ipsum dolor sit amet consectetur adipiscing elit non autem quo est ullamco laboris consequat duis sunt et.',
		primaryCta: {
			baseUrl: '#',
			text: 'Primary md',
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
			altText: 'Optional img',
		},
	},
};

export const props: Inline1Props = {
	variant,
};
