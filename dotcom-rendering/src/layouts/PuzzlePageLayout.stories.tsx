import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { createPuzzlePage } from '../../fixtures/manual/puzzlePage';
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
