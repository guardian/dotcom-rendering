import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { gridContainerDecorator } from '../../../.storybook/decorators/gridDecorators';
import { palette } from '../../palette';
import { Tabs } from './Tabs';

const meta = {
	component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MatchInfoWhileFixture = {
	args: {
		selected: 'info',
	},
	parameters: {
		colourSchemeBackground: {
			light: palette('--football-match-header-fixture-result-background'),
			dark: palette('--football-match-header-fixture-result-background'),
		},
	},
	decorators: [gridContainerDecorator],
} satisfies Story;

export const LiveWhileLive = {
	...MatchInfoWhileFixture,
	args: {
		selected: 'live',
		infoURL: new URL(
			'https://www.theguardian.com/football/match/2025/nov/26/arsenal-v-bayernmunich',
		),
	},
} satisfies Story;

export const ReportWhileResult = {
	...MatchInfoWhileFixture,
	args: {
		selected: 'report',
		liveURL: new URL(
			'https://www.theguardian.com/football/live/2025/nov/26/arsenal-v-bayern-munich-champions-league-live',
		),
		infoURL: LiveWhileLive.args.infoURL,
	},
} satisfies Story;
