import type { Inline1Variant } from '@guardian/support-dotcom-components/dist/shared/types';
import type { Inline1Props } from '@guardian/support-dotcom-components/dist/shared/types/props/inline1';

const supportVariant = {
	name: 'CONTROL',
	message: {
		type: 'Inline1SupportMessage' as const,
		heading: 'Headline - 48 characters, including spaces and punctuation.',
		body: 'Lorem ipsum dolor sit amet. Supporting copy  should be 136 characters, including spaces and punctuation.',
		primaryCta: {
			text: 'Try Feast app',
			baseUrl:
				'https://www.theguardian.com/info/2025/jan/02/feast-the-app-to-avoid-boring-cooking',
		},
		image: {
			mobileUrl:
				'https://i.guim.co.uk/img/media/d5fd46298bb30b3f4779a625df0a1c1054431474/68_428_3058_3819/master/3058.jpg?width=210&dpr=2&s=none',
			tabletUrl:
				'https://i.guim.co.uk/img/media/d5fd46298bb30b3f4779a625df0a1c1054431474/68_428_3058_3819/master/3058.jpg?width=157&dpr=2&s=none',
			desktopUrl:
				'https://i.guim.co.uk/img/media/d5fd46298bb30b3f4779a625df0a1c1054431474/68_428_3058_3819/master/3058.jpg?width=157&dpr=2&s=none',
			altText: 'Feast app download',
		},
	},
};

const newsletterVariant: Inline1Variant = {
	name: 'Inline1NewsletterMessage',
	message: {
		type: 'Inline1NewsletterMessage' as const,
		newsletterName: 'Saturday Edition',
		newsletterListId: 6031,
		newsletterId: 'saturday-edition',
		frequency: 'Weekly',
		heading:
			'Sign up to the Saturday Edition, our free weekend news roundup',
		body: 'An exclusive look at the week’s best Guardian journalism from the editor-in-chief, Katharine Viner',
		imageUrl:
			'https://uploads.guim.co.uk/2023/11/01/SaturdayEdition_-_5-3.jpg',
	},
};

export const tracking = {
	abTestName: '',
	abTestVariant: '',
	campaignCode: '',
	componentType: 'ACQUISITIONS_OTHER' as const,
	ophanPageId: '',
	platformId: '',
	referrerUrl: '',
};

export const supportProps: Inline1Props = {
	variant: supportVariant,
	tracking,
};

export const newsletterProps: Inline1Props = {
	variant: newsletterVariant,
	tracking,
};
