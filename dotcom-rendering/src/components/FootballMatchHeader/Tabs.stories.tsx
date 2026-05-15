import { gridContainerDecorator } from '../../../.storybook/decorators/gridDecorators';
import preview from '../../../.storybook/preview';
import { palette } from '../../palette';
import { Tabs } from './Tabs';

const meta = preview.meta({
	component: Tabs,
});

export const MatchInfoWhenFixture = meta.story({
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
});

export const LiveWhenLive = meta.story({
	...MatchInfoWhenFixture.input,
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
});

export const ReportWhenResult = meta.story({
	...MatchInfoWhenFixture.input,
	args: {
		selected: 'report',
		matchKind: 'Result',
		liveURL: new URL(
			'https://www.theguardian.com/football/live/2025/nov/26/arsenal-v-bayern-munich-champions-league-live',
		),
		infoURL: LiveWhenLive.input.args.infoURL,
	},
});
