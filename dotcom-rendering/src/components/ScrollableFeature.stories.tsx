import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { DCRContainerPalette, DCRFrontCard } from '../types/front';
import { FrontSection } from './FrontSection';
import { ScrollableFeature } from './ScrollableFeature.importable';

const imageUrls = [
	'https://media.guim.co.uk/2d214bdf3ed8e014360e8fde41b471973e4bad44/948_2222_2703_3378/800.jpg',
	'https://media.guim.co.uk/ebdbdcf43ae69f4e8e85cd94f8cb67faeaef5d4a/1087_735_988_1235/800.jpg',
	'https://media.guim.co.uk/9bd0b0432950315837ba204e5d5b2250b3e75744/204_838_4422_5524/801.jpg',
	'https://media.guim.co.uk/f30ec00394386361d3b4b278984f27b32dab4d42/328_2337_5032_6290/800.jpg',
	'https://media.guim.co.uk/1a99dd52b89bc67ee384b337d8793f1303080010/154_958_2405_3006/800.jpg',
	'https://media.guim.co.uk/49e438dd362c146523d6006b4054e8b5a9ffb44b/2077_322_3325_4157/800.jpg',
];

const frontCard = {
	url: '',
	format: {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	},
	headline: 'HeadlineText',
	kickerText: 'Kicker',
	webPublicationDate: new Date(Date.now() - 60 * 60 * 1000).toString(),
	image: {
		src: 'https://media.guim.co.uk/6537e163c9164d25ec6102641f6a04fa5ba76560/0_210_5472_3283/master/5472.jpg',
		altText: 'alt text',
	},
	showQuotedHeadline: false,
	showLivePlayable: false,
	isExternalLink: false,
	discussionApiUrl: 'https://discussion.theguardian.com/discussion-api/',
	byline: 'Byline text',
	showByline: true,
	dataLinkName: 'data-link-name',
} satisfies DCRFrontCard;

const trails = new Array(6)
	.fill(frontCard)
	.map((trail: DCRFrontCard, idx: number) => ({
		...trail,
		image: {
			src: imageUrls[idx] as string,
			altText: '',
		},
		format: {
			...frontCard.format,
			theme: idx, // Uses index to cycle through each theme enum value
		},
	}));

const meta = {
	title: 'Components/ScrollableFeature',
	component: ScrollableFeature,
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
	args: {
		trails,
		containerPalette: undefined,
		absoluteServerTimes: true,
		imageLoading: 'eager',
	},
	render: (args) => (
		<FrontSection
			title="Scrollable feature"
			discussionApiUrl={discussionApiUrl}
			editionId="UK"
			showTopBorder={false}
		>
			<ScrollableFeature {...args} />
		</FrontSection>
	),
} satisfies Meta<typeof ScrollableFeature>;

export default meta;

type Story = StoryObj<typeof ScrollableFeature>;

export const Default = {} satisfies Story;

const containerPalettes = [
	'InvestigationPalette',
	'LongRunningPalette',
	'SombrePalette',
	'BreakingPalette',
	'EventPalette',
	'EventAltPalette',
	'LongRunningAltPalette',
	'SombreAltPalette',
	'SpecialReportAltPalette',
	'Branded',
] as const satisfies readonly Omit<
	DCRContainerPalette,
	'MediaPalette' | 'PodcastPalette'
>[];

export const WithSpecialPaletteVariations = {
	parameters: {
		chromatic: { viewports: [breakpoints.desktop] },
	},
	render: (args) => (
		<>
			{containerPalettes.map((containerPalette) => (
				<FrontSection
					title="Scrollable feature"
					discussionApiUrl={discussionApiUrl}
					editionId="UK"
					showTopBorder={false}
					key={containerPalette}
					containerPalette={containerPalette}
				>
					<ScrollableFeature
						{...args}
						containerPalette={containerPalette}
					/>
				</FrontSection>
			))}
		</>
	),
} satisfies Story;
