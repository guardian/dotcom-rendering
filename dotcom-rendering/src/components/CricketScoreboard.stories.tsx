import { breakpoints } from '@guardian/source/foundations';
import preview from '../../.storybook/preview';
import { match } from '../../fixtures/manual/cricket-scoreboard';
import { CricketScoreboard } from './CricketScoreboard';

const meta = preview.meta({
	component: CricketScoreboard,
	title: 'Components/CricketScoreboard',
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobileLandscape],
		},
	},
});

export const defaultStory = meta.story({
	name: 'Cricket Scoreboard',
	args: {
		match,
		scorecardUrl: '/test',
	},
});
