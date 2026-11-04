import type { Inline1Variant } from '@guardian/support-dotcom-components/dist/shared/types';
import type { Inline1Props } from '@guardian/support-dotcom-components/dist/shared/types/props/inline1';

const variant = {
	name: 'Inline1SupportMessage',
	message: {
		type: 'Inline1SupportMessage' as const,
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

const newsletterVariant: Inline1Variant = {
	name: 'Inline1NewsletterMessage',
	message: {
		type: 'Inline1NewsletterMessage' as const,
		newsletterId: 'saturday-edition',
		frequency: 'Weekly',
		heading:
			'Sign up to the Saturday Edition, our free weekend news roundup',
		body: 'An exclusive look at the week’s best Guardian journalism from the editor-in-chief, Katharine Viner',
		imageUrl:
			'https://uploads.guim.co.uk/2023/11/01/SaturdayEdition_-_5-3.jpg',
	},
};

const tracking = {
	abTestName: '',
	abTestVariant: '',
	campaignCode: '',
	componentType: 'ACQUISITIONS_OTHER' as const,
	ophanPageId: '',
	platformId: '',
	referrerUrl: '',
};

export const props: Inline1Props = {
	variant,
	tracking,
};

export const newsletterProps: Inline1Props = {
	variant: newsletterVariant,
	tracking,
};
