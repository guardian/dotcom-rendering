import type {
	FEPuzzlesPageType,
	PuzzleContainer,
	PuzzlesLayoutType,
} from '../../src/types/puzzlesPage';
import { Standard } from '../generated/fe-articles/Standard';

export const minimalPuzzlesLayout: PuzzlesLayoutType = {
	containers: [],
};

export const triviaPuzzlesContainer: PuzzleContainer = {
	id: 'trivia-and-quizzes',
	title: 'Trivia & quizzes',
	variant: 'standard',
	content: {
		items: [
			[
				{
					id: 'film-reveal-daily',
					title: 'Film reveal',
					type: 'film-reveal',
					set: 'all',
					cardVariant: 'primary',
					cadence: 'Daily',
					date: '2026-10-28',
					slug: 'trivia-and-quizzes/film-reveal',
					variant: 'iframe-page',
					image: 'https://i.guim.co.uk/img/uploads/2026/10/28/film-reveal-standard.png?width=440&dpr=2&s=none',
					imageAlt: 'Film reveal illustration',
				},
				{
					id: 'on-the-ball-daily',
					title: 'On the ball',
					type: 'on-the-ball',
					set: 'all',
					cardVariant: 'primary',
					cadence: 'Daily',
					date: '2026-10-28',
					slug: 'trivia-and-quizzes/on-the-ball',
					variant: 'iframe-page',
					image: 'https://i.guim.co.uk/img/uploads/2026/10/28/on-the-ball-standard.png?width=440&dpr=2&s=none',
					imageAlt: 'On the ball illustration',
				},
			],
		],
		nestedContainers: [],
	},
};

export const featuredTriviaPuzzlesContainer: PuzzleContainer = {
	...triviaPuzzlesContainer,
	id: 'featured-moviegrid',
	title: 'Featured today',
	variant: 'featured',
	content: {
		items: triviaPuzzlesContainer.content.items.map((row) =>
			row.map((item) => ({
				...item,
				cardVariant: 'large' as const,
				image:
					item.type === 'film-reveal'
						? 'https://i.guim.co.uk/img/uploads/2026/10/28/film-reveal-featured.png?width=440&dpr=2&s=none'
						: 'https://i.guim.co.uk/img/uploads/2026/10/28/on-the-ball-featured.png?width=440&dpr=2&s=none',
			})),
		),
		nestedContainers: [],
	},
};

export const fullPuzzlesLayout: PuzzlesLayoutType = {
	containers: [
		{
			id: 'word-games',
			title: 'Word games',
			variant: 'standard',
			content: {
				items: [
					[
						{
							id: 'wordiply-daily',
							title: 'Wordiply',
							type: 'wordiply',
							set: 'all',
							cardVariant: 'primary',
							cadence: 'Daily',
							slug: 'wordiply',
							url: 'https://www.wordiply.com/',
							variant: 'iframe-page',
							backgroundColour: '#f9d4e8',
						},
					],
				],
				nestedContainers: [
					{
						id: 'word-wheel',
						title: 'Word wheel',
						desktopSpan: 6,
						content: {
							items: [
								[
									{
										id: 'word-wheel-daily',
										title: 'Word wheel',
										type: 'word-wheel',
										set: 'all',
										cardVariant: 'compact',
										cadence: 'Daily',
										index: 1,
									},
								],
							],
							nestedContainers: [],
						},
					},
				],
			},
		},
	],
};

export const createPuzzlesPage = (
	overrides: Partial<FEPuzzlesPageType> = {},
): FEPuzzlesPageType => ({
	id: 'puzzles',
	editionId: Standard.editionId,
	editionLongForm: Standard.editionLongForm,
	contributionsServiceUrl: Standard.contributionsServiceUrl,
	webTitle: 'Puzzles & games | The Guardian',
	description:
		"The Guardian's puzzles & games page, where you can play free online daily crosswords, word games, logic puzzles and more",

	config: {
		...Standard.config,
		contentType: 'Puzzles',
		serverSideABTests: {},
	},
	nav: Standard.nav,
	pageFooter: Standard.pageFooter,
	commercialProperties: Standard.commercialProperties,
	isAdFreeUser: false,
	canonicalUrl: 'https://www.theguardian.com/puzzles-and-games',
	layout: minimalPuzzlesLayout,
	...overrides,
});
