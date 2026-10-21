import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { createPuzzlePage } from '../../fixtures/manual/puzzlePage';
import {
	puzzlesHubV1Experiment,
	puzzlesHubV1Participation,
} from '../lib/puzzlesHubVersionExperiment';
import { extractNAV } from '../model/extract-nav';
import { getPuzzleConfig } from '../model/puzzles/puzzleConfigs';
import { puzzlePageFormat, PuzzlePageLayout } from './PuzzlePageLayout';

const puzzlePage = createPuzzlePage('word-wheel');
const puzzleConfig = getPuzzleConfig('word-wheel');
if (!puzzleConfig) throw new Error('Missing Word wheel configuration');
const storyPuzzleConfig = {
	...puzzleConfig,
	iframe: { provider: 'wordiply', baseUrl: 'about:blank' },
} as const;

const meta = {
	title: 'Layouts/Puzzle Page',
	component: PuzzlePageLayout,
	args: {
		puzzlePage: { ...puzzlePage, puzzleConfig: storyPuzzleConfig },
		NAV: extractNAV(puzzlePage.nav),
		darkModeAvailable: false,
	},
	parameters: {
		formats: [puzzlePageFormat],
		chromatic: {
			viewports: [breakpoints.mobileMedium, breakpoints.wide],
		},
	},
} satisfies Meta<typeof PuzzlePageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAds = {} satisfies Story;

export const AdFree = {
	args: {
		puzzlePage: {
			...puzzlePage,
			puzzleConfig: storyPuzzleConfig,
			isAdFreeUser: true,
		},
	},
} satisfies Story;

// Production Saturday Edition data, standing in for the Cluesletter (which has no exampleUrl yet).
const saturdayEdition = {
	identityName: 'saturday-edition',
	name: 'Saturday Edition',
	frequency: 'Weekly',
	description:
		'An exclusive look at the week’s best Guardian journalism from the editor-in-chief, Katharine Viner',
	illustrationSquare:
		'https://media.guim.co.uk/efd4be7a85fd7fb5118c712b7087c758bbf45e6b/0_0_1000_1000/500.jpg',
	exampleUrl: '/news/series/saturday-edition/latest',
};

const v1Config = {
	...puzzlePage.config,
	serverSideABTests: puzzlesHubV1Participation(
		puzzlesHubV1Experiment.variant,
	),
};

export const WithNewsletter = {
	args: {
		puzzlePage: {
			...puzzlePage,
			config: v1Config,
			puzzleConfig: storyPuzzleConfig,
			instance: {
				...puzzlePage.instance,
				puzzlesSupporting: {
					usefulLinks: [],
					newsletter: saturdayEdition,
				},
			},
		},
	},
} satisfies Story;

export const WithUsefulLinksAndNewsletter = {
	args: {
		puzzlePage: {
			...puzzlePage,
			config: v1Config,
			puzzleConfig: storyPuzzleConfig,
			instance: {
				...puzzlePage.instance,
				puzzlesSupporting: {
					usefulLinks: [
						{
							title: 'Crossword setter A-Z',
							url: 'https://www.theguardian.com/crosswords/search',
						},
						{
							title: 'Crossword blog',
							url: 'https://www.theguardian.com/crosswords/crossword-blog',
						},
					],
					newsletter: saturdayEdition,
				},
			},
		},
	},
} satisfies Story;
