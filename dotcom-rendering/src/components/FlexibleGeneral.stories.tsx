import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import {
	audioTrails,
	galleryTrails,
	getSublinks,
	loopVideoCard,
	opinionTrails,
	slideshowCard,
	trails,
	videoTrails,
} from '../../fixtures/manual/trails';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { customMockFetch } from '../lib/mockRESTCalls';
import type { BoostLevel } from '../types/content';
import type {
	DCRContainerPalette,
	DCRFrontCard,
	DCRGroupedTrails,
	DCRSupportingContent,
} from '../types/front';
import { FlexibleGeneral } from './FlexibleGeneral';
import { FrontSection } from './FrontSection';

const emptyGroupedTrails: DCRGroupedTrails = {
	huge: [],
	veryBig: [],
	big: [],
	standard: [],
	snap: [],
	splash: [],
};

const [splash, ...standards] = trails;

const splashCard = {
	...splash,
	trailText: 'Trail text for splash card',
	kickerText: 'Kicker for splash card',
};

/**
 * This creates a list of 8 standard cards which contain:
 * - a card with sublinks
 * - a media card
 * - a boosted card
 * - a mega boosted card
 */
const standardCards = standards.map((card, index) => {
	/** Helper function to override props for a card */
	const enhanceCardFields = (fields: Partial<DCRFrontCard>): DCRFrontCard =>
		({
			...card,
			trailText: `Trail text for card ${index + 1}`,
			kickerText: `Kicker for card ${index + 1}`,
			...fields,
		}) satisfies DCRFrontCard;

	switch (index + 1) {
		case 2:
			return enhanceCardFields({
				supportingContent: getSublinks(2),
			});
		case 3:
			return enhanceCardFields({
				boostLevel: 'boost',
				supportingContent: getSublinks(1),
			});
		case 5:
			return enhanceCardFields({
				boostLevel: 'megaboost',
				supportingContent: getSublinks(2),
			});
		default:
			return enhanceCardFields({});
	}
}) satisfies DCRFrontCard[];

const mockLatestLinksReqFetch = customMockFetch([
	{
		mockedMethod: 'GET',
		mockedUrl:
			'https://api.nextgen.guardianapps.co.uk/football/live/2023/aug/20/spain-v-england-womens-world-cup-final-live.json?rendered=false',
		mockedStatus: 200,
		mockedBody: {
			blocks: [
				{
					id: '64e135df8f08af8aaccf033b',
					title: null,
					publishedDateTime: 1692525060000,
					lastUpdatedDateTime: 1692525060000,
					body: '',
				},
				{
					id: '64e1342b8f08af8aaccf0332',
					title: null,
					publishedDateTime: 1692524961000,
					lastUpdatedDateTime: 1692524961000,
					body: 'Whatever happens in today’s final it is safe to say that Mary Earps is one of, if not the best goalkeeper in the world. Her story is an interesting and inspirational one, you can read it:',
				},
				{
					id: '64e1e0cf8f08111b4b7862b2',
					title: null,
					publishedDateTime: 1692524819000,
					lastUpdatedDateTime: 1692524819000,
					body: 'Adam has emailed and said: “For -- sadly -- the final time of this tournament, a very good morning to you. No snacks this early in the USA, but we’re edging towards eggs on toast when the time becomes slightly more socially acceptable. What have you got on today? I feel deeply conflicted about this final. I desperately want England to win as an England fan, and I also desperately do not want Jorge Vilda to win. It’s nothing against the Spanish players; far from it. The current generation of Spanish footballers is incredibly talented, plays beautiful football, and I hope they do win major honours -- I just don’t want them to win whilst Vilda is manager. If they do, I worry the RFEF will double down and maybe offer him a new contract, whereas if Spain loses, the RFEF may be forced to sack him. I feel badly wishing ill on Vilda in that way, it’s just that the tension is palpable, it doesn’t appear that he’s helping the situation, and I feel for the Spanish players for having to put up with it. Do you (or indeed any other readers) feel the same/similar?” I think Vilda will stay in his role regardless of the result, getting to a World Cup final is impressive and so the federation may be reluctant to let him go.',
				},
				{
					id: '64e1e0008f08af8aaccf05cd',
					title: null,
					publishedDateTime: 1692524597000,
					lastUpdatedDateTime: 1692524597000,
					body: 'Sign up for our free weekly newsletter on women’s football, Moving the Goalposts, by entering your email below. It’s that simple!',
				},
				{
					id: '64e1dfa28f08af8aaccf05c6',
					title: null,
					publishedDateTime: 1692524551000,
					lastUpdatedDateTime: 1692525013000,
					body: 'The closing ceremony are showing highlights from the tournament, yes it is making me emotional. What a World Cup we have been treated to. So many icons on the stage for the last time with Marta, Rapinoe and Sinclair likely to have bowed out.',
				},
				{
					id: '64e1df398f08111b4b7862a6',
					title: null,
					publishedDateTime: 1692524378000,
					lastUpdatedDateTime: 1692524377000,
					body: 'The closing ceremony has begun, the stadium is bathed in colour! I shall update you with any highlights.',
				},
			],
			refreshStatus: true,
		},
	},
]);

type FlexibleGeneralArgsAndCustomArgs = React.ComponentProps<
	typeof FlexibleGeneral
> & { frontSectionTitle: string };

const meta = {
	component: FlexibleGeneral,
	title: 'Front Containers/FlexibleGeneral',
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
		frontSectionTitle: 'Flexible general',
		groupedTrails: emptyGroupedTrails,
		showAge: true,
		absoluteServerTimes: true,
		imageLoading: 'eager',
		aspectRatio: '5:4',
		collectionId: 1,
	},
	render: ({ frontSectionTitle, ...args }) => (
		<FrontSection
			title={frontSectionTitle}
			discussionApiUrl={discussionApiUrl}
			editionId="UK"
			showTopBorder={true}
		>
			<FlexibleGeneral {...args} />
		</FrontSection>
	),
} satisfies Meta<FlexibleGeneralArgsAndCustomArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SplashWithStandards: Story = {
	name: 'Splash with big and standard cards',
	args: {
		frontSectionTitle: 'Splash with standards',
		groupedTrails: {
			...emptyGroupedTrails,
			splash: [{ ...splashCard, supportingContent: [] }],
			standard: standardCards.map((card, index) => ({
				...card,
				isBoosted: index === 0,
				boostLevel: index === 0 ? 'boost' : 'default',
			})),
		},
	},
};

export const SplashWithSublinks: Story = {
	name: 'Standard splash with sublinks',
	args: {
		groupedTrails: {
			...emptyGroupedTrails,
			splash: [{ ...splashCard, image: undefined }],
		},
	},
	render: (args) => {
		const Section = ({
			title,
			supportingContent,
		}: {
			title: string;
			supportingContent?: DCRSupportingContent[];
		}) => (
			<FrontSection
				title={title}
				discussionApiUrl={discussionApiUrl}
				editionId="UK"
				showTopBorder={true}
			>
				<FlexibleGeneral
					{...args}
					groupedTrails={{
						...emptyGroupedTrails,
						splash: [{ ...splashCard, supportingContent }],
					}}
				/>
			</FrontSection>
		);

		return (
			<>
				<Section
					title="One sublink"
					supportingContent={getSublinks(1)}
				/>
				<Section
					title="Two sublinks"
					supportingContent={getSublinks(2)}
				/>
				<Section
					title="Four sublinks"
					supportingContent={getSublinks(4)}
				/>
			</>
		);
	},
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
	supportingContent: getSublinks(4, {
		theme: Pillar.Sport,
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
	}),
	isImmersive: false,
} satisfies DCRFrontCard;

export const SplashBoostLevels: Story = {
	name: 'Splash boost levels',
	args: {
		groupedTrails: {
			...emptyGroupedTrails,
			splash: [{ ...splashCard, image: undefined }],
		},
	},
	render: (args) => {
		const Section = ({
			title,
			boostLevel,
		}: {
			title: string;
			boostLevel?: BoostLevel;
		}) => (
			<FrontSection
				title={title}
				discussionApiUrl={discussionApiUrl}
				editionId="UK"
				showTopBorder={true}
			>
				<FlexibleGeneral
					{...args}
					groupedTrails={{
						...emptyGroupedTrails,
						splash: [
							{
								...splashCard,
								boostLevel,
								supportingContent: getSublinks(4),
							},
						],
					}}
				/>
			</FrontSection>
		);

		return (
			<>
				<Section title="Boosted" boostLevel="boost" />
				<Section title="Mega boosted" boostLevel="megaboost" />
				<Section title="Giga boosted" boostLevel="gigaboost" />
			</>
		);
	},
};

export const SplashWithImageSupression: Story = {
	name: 'Splash with image supression',
	args: {
		groupedTrails: {
			...emptyGroupedTrails,
			splash: [{ ...splashCard, image: undefined }],
		},
	},
	render: (args) => {
		const Section = ({
			title,
			boostLevel,
		}: {
			title: string;
			boostLevel?: BoostLevel;
		}) => (
			<FrontSection
				title={title}
				discussionApiUrl={discussionApiUrl}
				editionId="UK"
				showTopBorder={true}
			>
				<FlexibleGeneral
					{...args}
					groupedTrails={{
						...emptyGroupedTrails,
						splash: [
							{ ...splashCard, boostLevel, image: undefined },
						],
					}}
				/>
			</FrontSection>
		);

		return (
			<>
				<Section title="Default" boostLevel={undefined} />
				<Section title="Boosted" boostLevel="boost" />
				<Section title="Mega boosted" boostLevel="megaboost" />
				<Section title="Giga boosted" boostLevel="gigaboost" />
			</>
		);
	},
};

export const SplashWithLiveUpdates: Story = {
	name: 'Splash with live updates',
	render: (args) => {
		global.fetch = mockLatestLinksReqFetch;
		const Section = ({
			title,
			boostLevel,
		}: {
			title: string;
			boostLevel?: BoostLevel;
		}) => (
			<FrontSection
				title={title}
				discussionApiUrl={discussionApiUrl}
				editionId="UK"
				showTopBorder={true}
			>
				<FlexibleGeneral
					{...args}
					groupedTrails={{
						...emptyGroupedTrails,
						splash: [{ ...liveUpdatesCard, boostLevel }],
					}}
				/>
			</FrontSection>
		);

		return (
			<>
				<Section title="Default" boostLevel={undefined} />
				<Section title="Boosted" boostLevel="boost" />
				<Section title="Mega boosted" boostLevel="megaboost" />
				<Section title="Giga boosted" boostLevel="gigaboost" />
			</>
		);
	},
};

export const StandardBoostedWithLiveUpdates: Story = {
	name: 'Standard boosted with live updates',
	render: (args) => {
		global.fetch = mockLatestLinksReqFetch;
		const Section = ({
			title,
			boostLevel,
		}: {
			title: string;
			boostLevel: BoostLevel;
		}) => (
			<FrontSection
				title={title}
				discussionApiUrl={discussionApiUrl}
				editionId="UK"
				showTopBorder={true}
			>
				<FlexibleGeneral
					{...args}
					groupedTrails={{
						...emptyGroupedTrails,
						standard: [{ ...liveUpdatesCard, boostLevel }],
					}}
				/>
			</FrontSection>
		);

		return (
			<>
				<Section title="Boosted" boostLevel="boost" />
				<Section title="Megaboosted" boostLevel="megaboost" />
			</>
		);
	},
};

export const StandardCards: Story = {
	name: 'Standard cards',
	args: {
		frontSectionTitle: 'Standard cards',
		groupedTrails: {
			...emptyGroupedTrails,
			standard: [
				...trails.slice(0, 4),
				...opinionTrails.slice(0, 2),
				...audioTrails.slice(0, 2),
				...galleryTrails.slice(0, 2),
				...videoTrails.slice(0, 2),
			],
		},
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
] as const satisfies readonly DCRContainerPalette[];

export const WithSpecialPaletteVariations = {
	name: 'With special palette variations',
	args: {
		groupedTrails: {
			...emptyGroupedTrails,
			splash: [
				{
					...splashCard,
					supportingContent: getSublinks(4),
				},
			],
			standard: standardCards.slice(0, 2),
		},
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
					<FlexibleGeneral
						containerPalette={containerPalette}
						{...args}
					/>
				</FrontSection>
			))}
		</>
	),
} satisfies Story;

export const SecondaryContainerStandardCards: Story = {
	name: 'Secondary container with standard cards',
	args: {
		frontSectionTitle: 'Secondary container with standard cards',
		containerLevel: 'Secondary',
		groupedTrails: {
			...emptyGroupedTrails,
			standard: standardCards.slice(0, 4),
		},
	},
};

export const ImmersiveCardsSplashAndStandard: Story = {
	name: 'Immersive cards splash and standard',
	args: {
		frontSectionTitle: 'Immersive cards',
		groupedTrails: {
			...emptyGroupedTrails,
			splash: [
				{ ...splashCard, isImmersive: true, supportingContent: [] },
			],
			standard: [{ ...trails[0], isImmersive: true }],
		},
	},
};

export const LoopVideoCards: Story = {
	name: 'Looping video cards',
	args: {
		frontSectionTitle: 'Loop video cards',
		groupedTrails: {
			...emptyGroupedTrails,
			splash: [loopVideoCard],
			standard: [loopVideoCard], // Loop video is disabled at standard card size
		},
	},
};

export const StandardBoostedMediaCardWithSublinks: Story = {
	name: 'Standard boosted media card with sublinks',
	args: {
		frontSectionTitle: 'Standard boosted media card with sublinks',
		groupedTrails: {
			...emptyGroupedTrails,
			standard: [trails[1]].map((card) => ({
				...card,
				boostLevel: 'boost',
				supportingContent: getSublinks(2),
			})),
		},
	},
};

// All splash boost levels support slideshows.
export const SplashWithSlideshow: Story = {
	name: 'Splash with a slideshow',
	args: {
		frontSectionTitle: 'Flexible General Splash card with a slideshow',
		groupedTrails: {
			...emptyGroupedTrails,
			splash: [
				{
					...slideshowCard,
					boostLevel: 'default',
					headline: 'Default splash card with a slideshow',
				},
			],
		},
		collectionId: 1,
	},
};

export const StandardCardWithSlideshow: Story = {
	name: 'Standard card with a slideshow',
	args: {
		frontSectionTitle:
			'Flexible General standard card with a slideshow at each boost level',
		groupedTrails: {
			...emptyGroupedTrails,
			standard: [
				{
					...slideshowCard,
					boostLevel: 'default',
					headline:
						'Image fallback - default card is too small for a slideshow',
				},
				{
					...slideshowCard,
					boostLevel: 'boost',
					headline: 'Boosted card with a slideshow',
				},
				{
					...slideshowCard,
					boostLevel: 'megaboost',
					headline: 'MegaBoosted card with a slideshow',
				},
			],
		},
		collectionId: 1,
	},
};
