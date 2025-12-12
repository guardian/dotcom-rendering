import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { allModes } from '../../.storybook/modes';
import { matchStats } from '../../fixtures/manual/matchStats';
import { FootballMatchInfo as FootballMatchInfoComponent } from './FootballMatchInfo';

const meta = {
	title: 'Components/Football Match Info',
	component: FootballMatchInfoComponent,
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
			},
		},
	},
} satisfies Meta<typeof FootballMatchInfoComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FootballMatchSummary = {
	args: {
		match: matchStats,
	},
} satisfies Story;
