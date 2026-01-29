import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { allModes } from '../../.storybook/modes';
import { table } from '../../fixtures/manual/footballTable';
import { matchStats } from '../../fixtures/manual/matchStats';
import { FootballMatchInfoPage as FootballMatchInfoPageComponent } from './FootballMatchInfoPage';

const meta = {
	title: 'Components/Football Match Info Page',
	component: FootballMatchInfoPageComponent,
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
			},
		},
	},
} satisfies Meta<typeof FootballMatchInfoPageComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FootballMatchInfoPage = {
	args: {
		matchStats,
		table,
	},
} satisfies Story;
