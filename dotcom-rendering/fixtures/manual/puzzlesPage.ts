import type {
	FEPuzzlesPageType,
	PuzzlesLayoutType,
} from '../../src/types/puzzlesPage';
import { Standard } from '../generated/fe-articles/Standard';

export const minimalPuzzlesLayout: PuzzlesLayoutType = {
	containers: [],
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
	webTitle: 'Puzzles & Games',
	description: 'Play the Guardian’s daily puzzles and games.',
	config: {
		...Standard.config,
		contentType: 'Puzzles',
		serverSideABTests: {},
	},
	nav: Standard.nav,
	pageFooter: Standard.pageFooter,
	commercialProperties: Standard.commercialProperties,
	isAdFreeUser: false,
	canonicalUrl: 'https://www.theguardian.com/puzzles',
	layout: minimalPuzzlesLayout,
	...overrides,
});
