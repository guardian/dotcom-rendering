import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { gridContainerDecorator } from '../../../.storybook/decorators/gridDecorators';
import { palette } from '../../palette';
import { Tabs } from './Tabs';

const meta = {
	component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MatchInfoWhenFixture = {
	args: {
		selected: 'info',
		matchKind: 'Fixture',
	},
	parameters: {
		colourSchemeBackground: {
			light: palette('--football-match-header-fixture-result-background'),
			dark: palette('--football-match-header-fixture-result-background'),
		},
	},
	decorators: [gridContainerDecorator],
} satisfies Story;

export const LiveWhenLive = {
	...MatchInfoWhenFixture,
	args: {
		selected: 'live',
		matchKind: 'Live',
		infoURL: new URL(
			'https://www.theguardian.com/football/match/2025/nov/26/arsenal-v-bayernmunich',
		),
	},
	parameters: {
		colourSchemeBackground: {
			light: palette('--football-match-header-live-background'),
			dark: palette('--football-match-header-live-background'),
		},
	},
} satisfies Story;

export const ReportWhenResult = {
	...MatchInfoWhenFixture,
	args: {
		selected: 'report',
		matchKind: 'Result',
		liveURL: new URL(
			'https://www.theguardian.com/football/live/2025/nov/26/arsenal-v-bayern-munich-champions-league-live',
		),
		infoURL: LiveWhenLive.args.infoURL,
	},
} satisfies Story;
