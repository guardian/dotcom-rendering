import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import {
	loopVideoCard,
	opinionTrails,
	trails,
} from '../../fixtures/manual/trails';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type {
	DCRContainerPalette,
	DCRFrontCard,
	DCRGroupedTrails,
} from '../types/front';
import { FlexibleSpecial } from './FlexibleSpecial';
import { FrontSection } from './FrontSection';

type FlexibleSpecialArgsAndCustomArgs = React.ComponentProps<
	typeof FlexibleSpecial
> & { frontSectionTitle: string };

const emptyGroupedTrails: DCRGroupedTrails = {
	huge: [],
	veryBig: [],
	big: [],
	standard: [],
	snap: [],
	splash: [],
};

const liveUpdatesCard = {
	url: '/football/live/2023/aug/20/spain-v-england-womens-world-cup-final-live',
	headline:
		'Spain 1-0 England: Women’s World Cup 2023 final – as it happened',
	showByline: false,
	byline: 'Sarah Rendell (the match) and James Wallace (reaction)',
	trailText:
		'<p>La Roja won their first Women’s World Cup after Olga Carmona’s first-half strike, with Mary Earps’ penalty save proving to be in vain</p>',
	image: {
		src: 'https://i.guim.co.uk/img/media/d7b100ce3d052d66bfc6c0de8f777901c774fede/0_214_5118_3072/master/5118.jpg',
		altText: 'Spain celebrate with the trophy.',
	},
	webPublicationDate: '2023-08-20T16:09:23.000Z',
	format: {
		theme: Pillar.Sport,
		design: ArticleDesign.LiveBlog,
		display: ArticleDisplay.Standard,
	},
	showQuotedHeadline: false,
	dataLinkName: 'news | group-0 | card-@1',
	mainMedia: {
		type: 'Video',
		id: 'fd00c892-407f-4d99-adfb-a8d12eada25f',
		videoId: '04lLgC1NioA',
		height: 300,
		width: 500,
		origin: '',
		title: 'Spain fans celebrate at final whistle as England fans left heartbroken – video',
		duration: 0,
		expired: false,
		image: 'https://media.guim.co.uk/68333e95233d9c68b32b56c12205c5ded94dfbf8/0_117_4791_2696/4791.jpg',
	},
	isExternalLink: false,
	discussionApiUrl,
	showLivePlayable: true,
	isImmersive: false,
} satisfies DCRFrontCard;

const meta = {
	component: FlexibleSpecial,
	title: 'Components/FlexibleSpecial',
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
		groupedTrails: emptyGroupedTrails,
		showAge: true,
		absoluteServerTimes: true,
		imageLoading: 'eager',
		aspectRatio: '5:4',
		frontSectionTitle: 'Flexible special',
	},
	render: ({ frontSectionTitle, ...args }) => (
		<FrontSection
			title={frontSectionTitle}
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
			showTopBorder={true}
		>
			<FlexibleSpecial {...args} />
		</FrontSection>
	),
} satisfies Meta<FlexibleSpecialArgsAndCustomArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const One: Story = {
	name: 'With one splash card',
	args: {
		groupedTrails: {
			...emptyGroupedTrails,
			snap: [],
			standard: trails.slice(0, 1),
		},
		collectionId: 1,
	},
};
export const Two: Story = {
	name: 'With one splash card and one standard card',
	args: {
		groupedTrails: {
			...emptyGroupedTrails,
			snap: [],
			standard: trails.slice(0, 2),
		},
		collectionId: 1,
	},
};
export const Three: Story = {
	name: 'With one splash card and two standard cards',
	args: {
		groupedTrails: {
			...emptyGroupedTrails,
			snap: [],
			standard: trails.slice(0, 3),
		},
		collectionId: 1,
	},
};
export const Four: Story = {
	name: 'With one splash card and three standard cards',
	args: {
		groupedTrails: {
			...emptyGroupedTrails,
			snap: [],
			standard: trails.slice(0, 4),
		},
		collectionId: 1,
	},
};
export const Five: Story = {
	name: 'With one splash card and four standard cards',
	args: {
		groupedTrails: {
			...emptyGroupedTrails,
			snap: [],
			standard: trails.slice(0, 5),
		},
		collectionId: 1,
	},
};

export const OpinionStandardCards: Story = {
	name: 'With one splash card and two standard opinion cards',
	args: {
		frontSectionTitle: 'Opinion standard cards',
		groupedTrails: {
			...emptyGroupedTrails,
			snap: [],
			standard: [...trails.slice(0, 1), ...opinionTrails.slice(0, 2)],
		},
		collectionId: 1,
	},
};

export const DefaultSplashWithImageSupression: Story = {
	name: 'Standard splash with image supression',
	args: {
		frontSectionTitle: 'Standard splash with image supression',
		groupedTrails: {
			...emptyGroupedTrails,
			snap: [],
			standard: [{ ...trails[0], image: undefined }],
		},
		collectionId: 1,
	},
};

export const BoostedSplashWithImageSupression: Story = {
	name: 'Boosted splash with image supression',
	args: {
		frontSectionTitle: 'Boosted splash',
		groupedTrails: {
			...emptyGroupedTrails,
			snap: [],
			standard: [{ ...trails[0], boostLevel: 'boost', image: undefined }],
		},
		collectionId: 1,
	},
};

export const MegaBoostedSplashWithImageSupression: Story = {
	name: 'Mega boosted splash with image supression',
	args: {
		frontSectionTitle: 'Mega boosted splash',
		groupedTrails: {
			...emptyGroupedTrails,
			snap: [],
			standard: [
				{ ...trails[0], boostLevel: 'megaboost', image: undefined },
			],
		},
		collectionId: 1,
	},
};

export const GigaBoostedSplashWithImageSupression: Story = {
	name: 'Giga boosted splash with image supression',
	args: {
		frontSectionTitle: 'Giga boosted splash',
		groupedTrails: {
			...emptyGroupedTrails,
			snap: [],
			standard: [
				{ ...trails[0], boostLevel: 'gigaboost', image: undefined },
			],
		},
		collectionId: 1,
	},
};

export const DefaultSplashWithLiveUpdates: Story = {
	name: 'Standard splash with live updates',
	args: {
		frontSectionTitle: 'Standard splash',
		groupedTrails: {
			...emptyGroupedTrails,
			snap: [],
			standard: [{ ...liveUpdatesCard }],
		},
		collectionId: 1,
	},
};

export const BoostedSplashWithLiveUpdates: Story = {
	name: 'Boosted splash with live updates',
	args: {
		frontSectionTitle: 'Boosted splash',
		groupedTrails: {
			...emptyGroupedTrails,
			snap: [],
			standard: [{ ...liveUpdatesCard, boostLevel: 'boost' }],
		},
		collectionId: 1,
	},
};

export const MegaBoostedSplashWithLiveUpdates: Story = {
	name: 'Mega boosted splash with live updates',
	args: {
		frontSectionTitle: 'Mega boosted splash',
		groupedTrails: {
			...emptyGroupedTrails,
			snap: [],
			standard: [{ ...liveUpdatesCard, boostLevel: 'megaboost' }],
		},
		collectionId: 1,
	},
};

export const GigaBoostedSplashWithLiveUpdates: Story = {
	name: 'Giga boosted splash with live updates',
	args: {
		frontSectionTitle: 'Giga boosted splash',
		groupedTrails: {
			...emptyGroupedTrails,
			snap: [],
			standard: [{ ...liveUpdatesCard, boostLevel: 'gigaboost' }],
		},
		collectionId: 1,
	},
};

export const LoopVideoCards: Story = {
	name: 'Looping video cards',
	args: {
		frontSectionTitle: 'Looping video',
		groupedTrails: {
			...emptyGroupedTrails,
			snap: [loopVideoCard],
			standard: [loopVideoCard],
		},
		collectionId: 1,
	},
};

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
	name: 'With special palette variations',
	args: {
		groupedTrails: {
			...emptyGroupedTrails,
			snap: [],
			standard: trails.slice(0, 5),
		},
		collectionId: 1,
	},
	render: (args) => (
		<>
			{containerPalettes.map((containerPalette) => (
				<FrontSection
					discussionApiUrl={discussionApiUrl}
					editionId={'UK'}
					showTopBorder={true}
					containerPalette={containerPalette}
					key={containerPalette}
					title={containerPalette}
				>
					<FlexibleSpecial
						containerPalette={containerPalette}
						{...args}
					/>
				</FrontSection>
			))}
		</>
	),
} satisfies Story;
