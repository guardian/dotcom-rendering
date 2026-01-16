import type { OphanComponentType } from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
	BannerArticleCount,
	BannerBody,
	BannerChoiceCards,
	BannerCloseButton,
	BannerComponent,
	BannerContent,
	BannerCtas,
	BannerHeader,
	BannerLogo,
	BannerReminder,
	BannerTicker,
	BannerVisual,
} from '../index';

const meta: Meta<typeof BannerComponent> = {
	title: 'Components/Marketing/DesignableBannerV2',
	component: BannerComponent,
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;

type Story = StoryObj<typeof BannerComponent>;

const hex = (r: string, g: string, b: string) => ({
	r,
	g,
	b,
	kind: 'hex' as const,
});

const stringToHexColour = (hexStr: string) => {
	const r = hexStr.substring(0, 2);
	const g = hexStr.substring(2, 4);
	const b = hexStr.substring(4, 6);
	return hex(r, g, b);
};

const design = {
	colours: {
		basic: {
			background: hex('F1', 'F8', 'FC'),
			bodyText: hex('00', '00', '00'),
			headerText: hex('00', '00', '00'),
			articleCountText: hex('00', '00', '00'),
			logo: hex('00', '00', '00'),
		},
		primaryCta: {
			default: {
				background: hex('FF', 'E5', '00'),
				text: hex('05', '29', '62'),
			},
		},
		secondaryCta: {
			default: {
				background: hex('F1', 'F8', 'FC'),
				text: hex('00', '00', '00'),
				border: hex('00', '00', '00'),
			},
		},
		highlightedText: {
			text: hex('00', '00', '00'),
			highlight: hex('FF', 'E5', '00'),
		},
		closeButton: {
			default: {
				background: hex('E6', 'EC', 'EF'),
				text: hex('00', '00', '00'),
				border: hex('E6', 'EC', 'EF'),
			},
		},
		ticker: {
			filledProgress: hex('05', '29', '62'),
			progressBarBackground: hex('cc', 'cc', 'cc'),
			headlineColour: hex('05', '29', '62'),
			totalColour: hex('05', '29', '62'),
			goalColour: hex('05', '29', '62'),
		},
	},
	fonts: {
		heading: {
			size: 'medium' as const,
		},
	},
};

const content = {
	mainContent: {
		heading: <span>Show your support for reader-funded journalism</span>,
		paragraphs: [
			<span key="1">
				Fearless, investigative reporting shapes a fairer world. At the
				Guardian, our independence allows us to chase the truth wherever
				it takes us. <strong>We have no shareholders.</strong> No vested
				interests. Just the determination and passion to bring readers
				quality reporting, including groundbreaking investigations.
			</span>,
			<span key="2">
				We do not shy away. And we provide all this for free, for
				everyone.
			</span>,
		],
		highlightedText: (
			<span>
				Show your support today from just £1, or sustain us long term
				with a little more. Thank you.
			</span>
		),
		primaryCta: {
			ctaText: 'Support once',
			ctaUrl: 'https://support.theguardian.com/contribute/one-off',
		},
		secondaryCta: {
			type: 'Custom' as const,
			cta: {
				ctaText: 'Support monthly',
				ctaUrl: 'https://support.theguardian.com/contribute/recurring',
			},
		},
	},
	mobileContent: {
		heading: <span>Show your support for reader-funded journalism</span>,
		paragraphs: [
			<span key="1">
				Fearless, investigative reporting shapes a fairer world. At the
				Guardian, our independence allows us to chase the truth wherever
				it takes us. <strong>We have no shareholders.</strong> No vested
				interests. Just the determination and passion to bring readers
				quality reporting, including groundbreaking investigations.
			</span>,
			<span key="2">
				We do not shy away. And we provide all this for free, for
				everyone.
			</span>,
		],
		highlightedText: (
			<span>
				Show your support today from just £1, or sustain us long term
				with a little more. Thank you.
			</span>
		),
		primaryCta: {
			ctaText: 'Support us',
			ctaUrl: 'https://support.theguardian.com/contribute/one-off',
		},
		secondaryCta: {
			type: 'Custom' as const,
			cta: {
				ctaText: 'Learn more',
				ctaUrl: 'https://support.theguardian.com/contribute/recurring',
			},
		},
	},
};

const tracking = {
	ophanPageId: 'kbluzw2csbf83eabedel',
	componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER' as OphanComponentType,
	platformId: 'GUARDIAN_WEB',
	referrerUrl: 'http://localhost:3030/Article',
	abTestName: 'UsEoyAppealBannerSupporters',
	abTestVariant: 'control',
	campaignCode: 'UsEoyAppealBanner_control',
	products: [],
};

const tickerSettings = {
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
};

const headerImage = {
	mobileUrl:
		'https://i.guim.co.uk/img/media/036510bc15ecdba97355f464006e3db5fbde9129/0_0_620_180/master/620.jpg?width=310&height=90&quality=100&s=01c604815a2f9980a1227c0d91ffa6b1',
	tabletUrl:
		'https://i.guim.co.uk/img/media/7030f9d98e368d6e5c7a34c643c76d7d1f5ac63c/0_0_1056_366/master/1056.jpg?width=528&height=183&quality=100&s=f0c02cddda84dfaf4ef261d91bd26159',
	desktopUrl:
		'https://i.guim.co.uk/img/media/3c1cb611785d3dccc2674636a6f692da1e2fcdb6/0_0_1392_366/master/1392.jpg?width=696&height=183&quality=100&s=5935c1ae5e8cbc5d9ed616bbadb3b09e',
	altText: "Guardian: Our Planet can't Speak for itself",
};

const regularImage = {
	kind: 'Image' as const,
	mobileUrl:
		'https://i.guim.co.uk/img/media/630a3735c02e195be89ab06fd1b8192959e282ab/0_0_1172_560/500.png?width=500&quality=75&s=937595b3f471d6591475955335c7c023',
	tabletUrl:
		'https://i.guim.co.uk/img/media/20cc6e0fa146574bb9c4ed410ac1a089fab02ce0/0_0_1428_1344/500.png?width=500&quality=75&s=fe64f647f74a3cb671f8035a473b895f',
	desktopUrl:
		'https://i.guim.co.uk/img/media/6c933a058d1ce37a5ad17f79895906150812dfee/0_0_1768_1420/500.png?width=500&quality=75&s=9277532ddf184a308e14218e3576543b',
	altText: 'Example alt text',
};

const choiceCardsSettings = {
	choiceCards: [
		{
			product: {
				supportTier: 'Contribution' as const,
				ratePlan: 'Monthly' as const,
			},
			label: 'Support £5/month',
			isDefault: false,
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
			benefitsLabel:
				'Unlock <strong>All-access digital</strong> benefits:',
			benefits: [
				{
					copy: '<strong>Unlimited</strong> access to the Guardian app',
				},
				{ copy: 'Unlimited access to our new Feast App' },
				{ copy: 'Ad-free reading on all your devices' },
				{
					copy: 'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
				},
				{ copy: 'Far fewer asks for support' },
			],
			pill: {
				copy: 'Recommended',
			},
		},
		{
			product: {
				supportTier: 'OneOff' as const,
			},
			label: `Support with another amount`,
			isDefault: false,
			benefits: [
				{
					copy: 'We welcome support of any size, any time',
				},
			],
		},
	],
	mobileChoiceCards: [
		{
			product: {
				supportTier: 'Contribution' as const,
				ratePlan: 'Monthly' as const,
			},
			label: 'Support £5/month',
			isDefault: false,
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
			benefitsLabel: 'Unlock All-access digital benefits:',
			benefits: [
				{ copy: 'Unlimited access to the Guardian app' },
				{ copy: 'Unlimited access to our new Feast App' },
			],
			pill: {
				copy: 'Recommended',
			},
		},
		{
			product: {
				supportTier: 'OneOff' as const,
			},
			label: `Support with another amount`,
			isDefault: false,
			benefits: [
				{
					copy: 'We welcome support of any size, any time',
				},
			],
		},
	],
};

const choiceCardsWithMixedDestinations = {
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
};

const contentNoHeading = {
	...content,
	mainContent: {
		...content.mainContent,
		heading: null,
	},
	mobileContent: {
		...content.mobileContent,
		heading: null,
	},
};

const contentWithReminder = {
	...content,
	mainContent: {
		...content.mainContent,
		secondaryCta: {
			type: 'ContributionsReminder' as const,
		},
	},
};

export const Default: Story = {
	name: 'Basic DesignableBanner',
	render: (args) => (
		<BannerComponent {...args}>
			<BannerLogo />
			<BannerContent>
				<BannerHeader />
				<BannerBody />
			</BannerContent>
			<BannerCtas />
			<BannerVisual />
			<BannerCloseButton />
		</BannerComponent>
	),
	args: {
		design: design as any,
		content: content as any,
		tracking,
		articleCounts: {
			forTargetedWeeks: 12,
			for52Weeks: 12,
		},
		submitComponentEvent: () => Promise.resolve(),
		onCloseClick: () => {
			/* close */
		},
		onCollapseClick: () => {
			/* collapse */
		},
		onExpandClick: () => {
			/* expand */
		},
		onCtaClick: () => {
			/* cta */
		},
		onSecondaryCtaClick: () => {
			/* secondary cta */
		},
		onNotNowClick: () => {
			/* not now */
		},
		reminderTracking: {
			onReminderCtaClick: () => {
				/* reminder cta */
			},
			onReminderSetClick: () => {
				/* reminder set */
			},
			onReminderCloseClick: () => {
				/* reminder close */
			},
		},
		bannerChannel: 'contributions' as const,
	},
};

export const WithThreeTierChoiceCards: Story = {
	name: 'With three tier choice cards',
	render: (args) => (
		<BannerComponent {...args}>
			<BannerLogo />
			<BannerContent>
				<BannerHeader />
				<BannerBody />
			</BannerContent>
			<BannerChoiceCards />
			<BannerCtas />
			<BannerCloseButton />
		</BannerComponent>
	),
	args: {
		...Default.args,
		design: {
			...design,
			visual: {
				kind: 'ChoiceCards',
				buttonColour: stringToHexColour('F1F8FC'),
			},
		} as any,
		tracking: {
			...tracking,
			abTestVariant: 'THREE_TIER_CHOICE_CARDS',
		},
		choiceCardsSettings: choiceCardsSettings as any,
	},
};

export const ThreeTierChoiceCardsWithHeaderImageAndCopy: Story = {
	name: 'With three tier choice cards + header image + header copy',
	render: (args) => (
		<BannerComponent {...args}>
			<BannerLogo />
			<BannerContent>
				<BannerHeader />
				<BannerBody />
			</BannerContent>
			<BannerChoiceCards />
			<BannerCtas />
			<BannerCloseButton />
		</BannerComponent>
	),
	args: {
		...WithThreeTierChoiceCards.args,
		design: {
			...design,
			headerImage,
			visual: {
				kind: 'ChoiceCards',
				buttonColour: stringToHexColour('F1F8FC'),
			},
		} as any,
	},
};

export const HeaderImageOnly: Story = {
	name: 'With header image and no header copy',
	render: (args) => (
		<BannerComponent {...args}>
			<BannerLogo />
			<BannerContent>
				<BannerHeader />
				<BannerBody />
			</BannerContent>
			<BannerChoiceCards />
			<BannerCtas />
			<BannerCloseButton />
		</BannerComponent>
	),
	args: {
		...WithThreeTierChoiceCards.args,
		content: contentNoHeading as any,
		design: {
			...design,
			headerImage,
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
		} as any,
	},
};

export const MainImage: Story = {
	name: 'With main image',
	render: (args) => (
		<BannerComponent {...args}>
			<BannerLogo />
			<BannerContent>
				<BannerHeader />
				<BannerBody />
			</BannerContent>
			<BannerCtas />
			<BannerVisual />
			<BannerCloseButton />
		</BannerComponent>
	),
	args: {
		...Default.args,
		design: {
			...design,
			visual: regularImage,
		} as any,
		tracking: {
			...tracking,
			abTestVariant: 'MAIN_IMAGE',
		},
	},
};

export const WithTickerAndThreeTierChoiceCards: Story = {
	name: 'With ticker + three tier choice cards',
	render: (args) => (
		<BannerComponent {...args}>
			<BannerLogo />
			<BannerContent>
				<BannerHeader />
				<BannerTicker />
				<BannerBody />
			</BannerContent>
			<BannerChoiceCards />
			<BannerCtas />
			<BannerCloseButton />
		</BannerComponent>
	),
	args: {
		...WithThreeTierChoiceCards.args,
		tickerSettings: tickerSettings as any,
	},
};

export const WithThreeTierChoiceCardsAndArticleCount: Story = {
	name: 'With article count + three tier choice cards',
	render: (args) => (
		<BannerComponent {...args}>
			<BannerLogo />
			<BannerContent>
				<BannerHeader />
				<BannerArticleCount />
				<BannerBody />
			</BannerContent>
			<BannerChoiceCards />
			<BannerCtas />
			<BannerCloseButton />
		</BannerComponent>
	),
	args: {
		...WithThreeTierChoiceCards.args,
		separateArticleCountSettings: {
			type: 'above',
		} as any,
	},
};

export const NoChoiceCardOrImage: Story = {
	name: 'With no choice cards or image',
	render: (args) => (
		<BannerComponent {...args}>
			<BannerLogo />
			<BannerContent>
				<BannerHeader />
				<BannerBody />
			</BannerContent>
			<BannerCtas />
			<BannerCloseButton />
		</BannerComponent>
	),
	args: {
		...Default.args,
		design: {
			...design,
			visual: undefined,
		} as any,
	},
};

export const CollapsableWithThreeTierChoiceCards: Story = {
	name: 'Collapsable with three tier choice cards',
	render: (args) => (
		<BannerComponent {...args}>
			<BannerLogo />
			<BannerContent>
				<BannerHeader />
				<BannerTicker />
				<BannerArticleCount />
				<BannerBody />
			</BannerContent>
			<BannerChoiceCards />
			<BannerCtas />
			<BannerCloseButton />
		</BannerComponent>
	),
	args: {
		...WithThreeTierChoiceCards.args,
		tickerSettings: tickerSettings as any,
		separateArticleCountSettings: {
			type: 'above',
		} as any,
		isCollapsible: true,
	},
};

export const CollapsableWithMainImage: Story = {
	name: 'Collapsable with main image',
	render: (args) => (
		<BannerComponent {...args}>
			<BannerLogo />
			<BannerContent>
				<BannerHeader />
				<BannerBody />
			</BannerContent>
			<BannerCtas />
			<BannerVisual />
			<BannerCloseButton />
		</BannerComponent>
	),
	args: {
		...MainImage.args,
		isCollapsible: true,
	},
};

export const WithReminder: Story = {
	name: 'With contributions reminder',
	render: (args) => (
		<BannerComponent {...args}>
			<BannerLogo />
			<BannerContent>
				<BannerHeader />
				<BannerBody />
				<BannerReminder />
			</BannerContent>
			<BannerCtas />
			<BannerVisual />
			<BannerCloseButton />
		</BannerComponent>
	),
	args: {
		...Default.args,
		content: contentWithReminder as any,
	},
};

export const CollapsableMaybeLaterVariant: Story = {
	name: 'Collapsable - Maybe later variant',
	render: (args) => (
		<BannerComponent {...args}>
			<BannerLogo />
			<BannerContent>
				<BannerHeader />
				<BannerBody />
			</BannerContent>
			<BannerCtas />
			<BannerVisual />
			<BannerCloseButton />
		</BannerComponent>
	),
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
	render: (args) => (
		<BannerComponent {...args}>
			<BannerLogo />
			<BannerContent>
				<BannerHeader />
				<BannerTicker />
				<BannerArticleCount />
				<BannerBody />
			</BannerContent>
			<BannerChoiceCards />
			<BannerCtas />
			<BannerCloseButton />
		</BannerComponent>
	),
	args: {
		...CollapsableWithThreeTierChoiceCards.args,
		tracking: {
			...tracking,
			abTestVariant: 'COLLAPSABLE_V2_MAYBE_LATER',
		},
	},
};

export const WithMixedDestinations: Story = {
	name: 'With destinationUrl on all choice cards',
	render: (args) => (
		<BannerComponent {...args}>
			<BannerLogo />
			<BannerContent>
				<BannerHeader />
				<BannerBody />
			</BannerContent>
			<BannerChoiceCards />
			<BannerCtas />
			<BannerCloseButton />
		</BannerComponent>
	),
	args: {
		...WithThreeTierChoiceCards.args,
		choiceCardsSettings: choiceCardsWithMixedDestinations as any,
	},
};

export const DesignThreeAnimatedHeaderImage: Story = {
	name: 'With animated header image',
	render: (args) => (
		<BannerComponent {...args}>
			<BannerLogo />
			<BannerContent>
				<BannerHeader />
				<BannerBody />
			</BannerContent>
			<BannerChoiceCards />
			<BannerCtas />
			<BannerCloseButton />
		</BannerComponent>
	),
	args: {
		...WithThreeTierChoiceCards.args,
		content: contentNoHeading as any,
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
		} as any,
	},
};
