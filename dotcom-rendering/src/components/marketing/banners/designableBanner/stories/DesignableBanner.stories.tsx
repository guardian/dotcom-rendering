import { SecondaryCtaType } from '@guardian/support-dotcom-components';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import lzstring from 'lz-string';
import { choiceCardsSettings } from '../../../lib/storybook';
import { design, stringToHexColour, tracking } from '../../utils/storybook';
import { DesignableBannerUnvalidated as DesignableBanner } from '../DesignableBanner';

type WithJsonProps<T> = T & { json?: string };
type Props = WithJsonProps<React.ComponentProps<typeof DesignableBanner>>;

const meta: Meta<Props> = {
	component: DesignableBanner,
	title: 'Components/marketing/DesignableBanner',
	args: {
		bannerChannel: 'contributions',
		isSupporter: false,
		countryCode: 'GB',
		tracking,
		content: {
			heading: 'Show your support for reader-funded journalism',
			paragraphs: [
				'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. <strong>We have no shareholders.</strong> No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations.',
				'We do not shy away. And we provide all this for free, for everyone.',
			],
			highlightedText:
				'Show your support today from just £1, or sustain us long term with a little more. Thank you.',
			cta: {
				text: 'Support once',
				baseUrl: 'https://support.theguardian.com/contribute/one-off',
			},
			secondaryCta: {
				type: SecondaryCtaType.Custom,
				cta: {
					text: 'Support monthly',
					baseUrl:
						'https://support.theguardian.com/contribute/recurring',
				},
			},
		},
		mobileContent: {
			heading: 'Show your support for reader-funded journalism',
			paragraphs: [
				'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. <strong>We have no shareholders.</strong> No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations.',
				'We do not shy away. And we provide all this for free, for everyone.',
			],
			highlightedText:
				'Show your support today from just £1, or sustain us long term with a little more. Thank you.',
			cta: {
				text: 'Support us',
				baseUrl: 'https://support.theguardian.com/contribute/one-off',
			},
			secondaryCta: {
				type: SecondaryCtaType.Custom,
				cta: {
					text: 'Learn more',
					baseUrl:
						'https://support.theguardian.com/contribute/recurring',
				},
			},
		},
		articleCounts: {
			for52Weeks: 12,
			forTargetedWeeks: 12,
		},
		design,
		json: '',
	},
	render: ({ json, ...args }) => {
		const jsonProps = json
			? JSON.parse(lzstring.decompressFromEncodedURIComponent(json))
			: {};

		return (
			<div>
				<DesignableBanner {...args} {...jsonProps} />
			</div>
		);
	},
};

export default meta;

type Story = StoryObj<Props>;

// Base content objects to avoid undefined issues
const baseContent = {
	heading: 'Show your support for reader-funded journalism',
	paragraphs: [
		'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. <strong>We have no shareholders.</strong> No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations.',
		'We do not shy away. And we provide all this for free, for everyone.',
	],
	highlightedText:
		'Show your support today from just £1, or sustain us long term with a little more. Thank you.',
	cta: {
		text: 'Support once',
		baseUrl: 'https://support.theguardian.com/contribute/one-off',
	},
	secondaryCta: {
		type: SecondaryCtaType.Custom,
		cta: {
			text: 'Support monthly',
			baseUrl: 'https://support.theguardian.com/contribute/recurring',
		},
	},
};

const baseMobileContent = {
	heading: 'Show your support for reader-funded journalism',
	paragraphs: [
		'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. <strong>We have no shareholders.</strong> No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations.',
		'We do not shy away. And we provide all this for free, for everyone.',
	],
	highlightedText:
		'Show your support today from just £1, or sustain us long term with a little more. Thank you.',
	cta: {
		text: 'Support us',
		baseUrl: 'https://support.theguardian.com/contribute/one-off',
	},
	secondaryCta: {
		type: SecondaryCtaType.Custom,
		cta: {
			text: 'Learn more',
			baseUrl: 'https://support.theguardian.com/contribute/recurring',
		},
	},
};

export const Default: Story = {
	name: 'Basic DesignableBanner',
	args: {
		...meta.args,
		content: {
			heading: 'Show your support for reader-funded journalism',
			paragraphs: [
				'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. <strong>We have no shareholders.</strong> No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations.',
				'We do not shy away. And we provide all this for free, for everyone.',
			],
			highlightedText:
				'Show your support today from just £1, or sustain us long term with a little more. Thank you.',
			cta: {
				text: 'Support once',
				baseUrl: 'https://support.theguardian.com/contribute/one-off',
			},
			secondaryCta: {
				type: SecondaryCtaType.Custom,
				cta: {
					text: 'Support monthly',
					baseUrl:
						'https://support.theguardian.com/contribute/recurring',
				},
			},
		},
		mobileContent: {
			heading: 'Show your support for reader-funded journalism',
			paragraphs: [
				'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. <strong>We have no shareholders.</strong> No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations.',
				'We do not shy away. And we provide all this for free, for everyone.',
			],
			highlightedText:
				'Show your support today from just £1, or sustain us long term with a little more. Thank you.',
			cta: {
				text: 'Support us',
				baseUrl: 'https://support.theguardian.com/contribute/one-off',
			},
			secondaryCta: {
				type: SecondaryCtaType.Custom,
				cta: {
					text: 'Learn more',
					baseUrl:
						'https://support.theguardian.com/contribute/recurring',
				},
			},
		},
		tracking: {
			...tracking,
			componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER' as any,
		},
		articleCounts: {
			forTargetedWeeks: 12,
			for52Weeks: 12,
		},
		bannerChannel: 'contributions' as const,
	},
};

export const WithThreeTierChoiceCards: Story = {
	name: 'With three tier choice cards',
	args: {
		...Default.args,
		design: {
			...design,
			visual: {
				kind: 'ChoiceCards',
				buttonColour: stringToHexColour('F1F8FC'),
			},
		},
		tracking: {
			...tracking,
			abTestVariant: 'THREE_TIER_CHOICE_CARDS',
		},
		choiceCardsSettings,
	},
};

export const ThreeTierChoiceCardsWithHeaderImageAndCopy: Story = {
	name: 'With three tier choice cards + header image + header copy',
	args: {
		...WithThreeTierChoiceCards.args,
		design: {
			...design,
			headerImage: {
				mobileUrl:
					'https://i.guim.co.uk/img/media/036510bc15ecdba97355f464006e3db5fbde9129/0_0_620_180/master/620.jpg?width=310&height=90&quality=100&s=01c604815a2f9980a1227c0d91ffa6b1',
				tabletUrl:
					'https://i.guim.co.uk/img/media/7030f9d98e368d6e5c7a34c643c76d7d1f5ac63c/0_0_1056_366/master/1056.jpg?width=528&height=183&quality=100&s=f0c02cddda84dfaf4ef261d91bd26159',
				desktopUrl:
					'https://i.guim.co.uk/img/media/3c1cb611785d3dccc2674636a6f692da1e2fcdb6/0_0_1392_366/master/1392.jpg?width=696&height=183&quality=100&s=5935c1ae5e8cbc5d9ed616bbadb3b09e',
				altText: "Guardian: Our Planet can't Speak for itself",
			},
			visual: {
				kind: 'ChoiceCards',
				buttonColour: stringToHexColour('F1F8FC'),
			},
		},
	},
};

export const HeaderImageOnly: Story = {
	name: 'With header image and no header copy',
	args: {
		...WithThreeTierChoiceCards.args,
		content: {
			...baseContent,
			heading: undefined,
		},
		mobileContent: {
			...baseMobileContent,
			heading: undefined,
		},
		design: {
			...design,
			headerImage: {
				mobileUrl:
					'https://i.guim.co.uk/img/media/036510bc15ecdba97355f464006e3db5fbde9129/0_0_620_180/master/620.jpg?width=310&height=90&quality=100&s=01c604815a2f9980a1227c0d91ffa6b1',
				tabletUrl:
					'https://i.guim.co.uk/img/media/7030f9d98e368d6e5c7a34c643c76d7d1f5ac63c/0_0_1056_366/master/1056.jpg?width=528&height=183&quality=100&s=f0c02cddda84dfaf4ef261d91bd26159',
				desktopUrl:
					'https://i.guim.co.uk/img/media/3c1cb611785d3dccc2674636a6f692da1e2fcdb6/0_0_1392_366/master/1392.jpg?width=696&height=183&quality=100&s=5935c1ae5e8cbc5d9ed616bbadb3b09e',
				altText: "Guardian: Our Planet can't Speak for itself",
			},
			visual: {
				kind: 'ChoiceCards',
				buttonColour: stringToHexColour('FFFFFF'),
			},
			colours: {
				...design.colours,
				basic: {
					...design.colours.basic,
					background: stringToHexColour('FFFFFF'),
				},
			},
		},
	},
};

export const MainImage: Story = {
	name: 'With main image',
	args: {
		...Default.args,
		design: {
			...design,
			visual: {
				kind: 'Image' as const,
				mobileUrl:
					'https://i.guim.co.uk/img/media/630a3735c02e195be89ab06fd1b8192959e282ab/0_0_1172_560/500.png?width=500&quality=75&s=937595b3f471d6591475955335c7c023',
				tabletUrl:
					'https://i.guim.co.uk/img/media/20cc6e0fa146574bb9c4ed410ac1a089fab02ce0/0_0_1428_1344/500.png?width=500&quality=75&s=fe64f647f74a3cb671f8035a473b895f',
				desktopUrl:
					'https://i.guim.co.uk/img/media/6c933a058d1ce37a5ad17f79895906150812dfee/0_0_1768_1420/500.png?width=500&quality=75&s=9277532ddf184a308e14218e3576543b',
				altText: 'Example alt text',
			},
		},
		tracking: {
			...tracking,
			abTestVariant: 'MAIN_IMAGE',
		},
	},
};

export const DesignThreeAnimatedHeaderImage: Story = {
	name: 'With animated header image',
	args: {
		...WithThreeTierChoiceCards.args,
		content: {
			...baseContent,
			heading: undefined,
		},
		mobileContent: {
			...baseMobileContent,
			heading: undefined,
		},
		design: {
			...design,
			headerImage: {
				mobileUrl:
					'https://uploads.guim.co.uk/2024/05/13/GuardianLogo.svg',
				tabletUrl:
					'https://uploads.guim.co.uk/2024/05/13/GuardianLogo.svg',
				desktopUrl:
					'https://uploads.guim.co.uk/2024/05/13/GuardianLogo.svg',
				altText: 'Guardian: News provider of the year',
			},
			visual: {
				kind: 'ChoiceCards',
				buttonColour: stringToHexColour('FFFFFF'),
			},
			colours: {
				...design.colours,
				basic: {
					...design.colours.basic,
					background: stringToHexColour('FFFFFF'),
				},
			},
		},
	},
};

export const WithTickerAndThreeTierChoiceCards: Story = {
	name: 'With ticker + three tier choice cards',
	args: {
		...WithThreeTierChoiceCards.args,
		tickerSettings: {
			currencySymbol: '£',
			copy: {
				countLabel: '',
				goalCopy: 'Goal',
			},
			tickerData: {
				total: 500000,
				goal: 1000000,
			},
			name: 'US' as const,
		},
	},
};

export const WithThreeTierChoiceCardsAndArticleCount: Story = {
	name: 'With article count + three tier choice cards',
	args: {
		...WithThreeTierChoiceCards.args,
		separateArticleCountSettings: {
			type: 'above',
		},
	},
};

export const NoChoiceCardOrImage: Story = {
	name: 'With no choice cards or image',
	args: {
		...Default.args,
		design: {
			...design,
			visual: undefined,
		},
	},
};

export const WithMixedDestinations: Story = {
	name: 'With destinationUrl on all choice cards',
	args: {
		...WithThreeTierChoiceCards.args,
		choiceCardsSettings: {
			choiceCards: [
				{
					product: {
						supportTier: 'Contribution' as const,
						ratePlan: 'Monthly' as const,
					},
					label: 'Support £5/month',
					isDefault: false,
					destination: 'LandingPage' as const,
					benefits: [
						{
							copy: 'Give to the Guardian every month with Support',
						},
					],
				},
				{
					product: {
						supportTier: 'SupporterPlus' as const,
						ratePlan: 'Monthly' as const,
					},
					label: 'Support £12/month',
					isDefault: true,
					destination: 'Checkout' as const,
					benefitsLabel:
						'Unlock <strong>All-access digital</strong> benefits:',
					benefits: [
						{
							copy: '<strong>Unlimited</strong> access to the Guardian app',
						},
						{ copy: 'Unlimited access to our new Feast App' },
						{ copy: 'Ad-free reading on all your devices' },
						{
							copy: 'Exclusive newsletters for subscribers',
						},
					],
				},
				{
					product: {
						supportTier: 'OneOff' as const,
					},
					label: 'One-time support',
					isDefault: false,
					destination: 'Checkout' as const,
					benefits: [
						{
							copy: 'Support the Guardian with a one-time contribution',
						},
					],
				},
			],
		},
	},
};

export const CollapsableWithThreeTierChoiceCards: Story = {
	name: 'Collapsable with three tier choice cards',
	args: {
		...WithThreeTierChoiceCards.args,
		tickerSettings: {
			currencySymbol: '£',
			copy: {
				countLabel: '',
				goalCopy: 'Goal',
			},
			tickerData: {
				total: 500000,
				goal: 1000000,
			},
			name: 'US' as const,
		},
		separateArticleCountSettings: {
			type: 'above',
		},
		isCollapsible: true,
	},
};

export const CollapsableWithMainImage: Story = {
	name: 'Collapsable with main image',
	args: {
		...MainImage.args,
		isCollapsible: true,
	},
};

export const CollapsableMaybeLaterVariant: Story = {
	name: 'Collapsable - Maybe later variant',
	args: {
		...CollapsableWithMainImage.args,
		tracking: {
			...tracking,
			abTestVariant: 'COLLAPSABLE_V2_MAYBE_LATER',
		},
	},
};

export const CollapsableWithThreeTierChoiceCardsMaybeLaterVariant: Story = {
	name: 'Collapsable with three tier choice cards - Maybe later variant',
	args: {
		...CollapsableWithThreeTierChoiceCards.args,
		tracking: {
			...tracking,
			abTestVariant: 'COLLAPSABLE_V2_MAYBE_LATER',
		},
	},
};

export const WithReminder: Story = {
	name: 'With contributions reminder',
	args: {
		...Default.args,
		content: {
			...baseContent,
			heading: undefined,
		},
		mobileContent: baseMobileContent,
	},
};
