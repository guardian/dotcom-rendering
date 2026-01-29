import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { allModes } from '../../.storybook/modes';
import { DirectoryPageNav } from './DirectoryPageNav';

const meta = {
	component: DirectoryPageNav,
	title: 'Components/Directory Page Nav',
	argTypes: {
		selected: {
			options: ['fixtures', 'tables', 'none'],
			control: { type: 'select' },
		},
	},
	parameters: {
		chromatic: {
			modes: {
				'light mobileMedium': allModes['light mobileMedium'],
				'light desktop': allModes['light desktop'],
				'light leftCol': allModes['light leftCol'],
			},
		},
	},
} satisfies Meta<typeof DirectoryPageNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WomensEuro2025 = {
	args: {
		selected: 'fixtures',
		pageId: 'football/women-s-euro-2025/table',
	},
} satisfies Story;

export const OtherCompetition = {
	args: {
		selected: 'none',
		pageId: 'football/premierleague/table',
	},
} satisfies Story;
