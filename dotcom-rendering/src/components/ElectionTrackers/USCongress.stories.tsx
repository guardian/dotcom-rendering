import { allModes } from '../../../.storybook/modes';
import preview from '../../../.storybook/preview';
import { palette } from '../../palette';
import { USCongress } from './USCongress';

/**
 * Results from 2024:
 * https://www.theguardian.com/us-news/ng-interactive/2024/nov/14/us-house-senate-and-governor-elections-2024-results-from-all-50-states
 */
const meta = preview.meta({
	title: 'Components/Election Trackers/US Congress',
	component: USCongress,
	parameters: {
		colourSchemeBackground: {
			light: palette('--article-background'),
			dark: palette('--article-background'),
		},
		chromatic: {
			modes: {
				'vertical mobile': allModes['vertical mobileMedium'],
				'vertical tablet': allModes['vertical tablet'],
				'vertical wide': allModes['vertical tablet'],
			},
		},
	},
});

export const Empty = meta.story({
	args: {
		house: {
			total: 435,
			democrats: {
				value: 0,
				change: 0,
			},
			republicans: {
				value: 0,
				change: 0,
			},
		},
		senate: {
			total: 34,
			democrats: {
				value: 0,
				change: 0,
				holdovers: 28,
			},
			republicans: {
				value: 0,
				change: 0,
				holdovers: 38,
			},
		},
		link: new URL('https://www.theguardian.com'),
		linkText: 'Full results',
	},
});

export const Final = Empty.extend({
	args: {
		house: {
			total: Empty.composed.args.house.total,
			democrats: {
				value: 215,
				change: 1,
			},
			republicans: {
				value: 220,
				change: -1,
			},
		},
		senate: {
			total: Empty.composed.args.senate.total,
			democrats: {
				value: 19,
				change: -4,
				holdovers: Empty.composed.args.senate.democrats.holdovers,
			},
			republicans: {
				value: 15,
				change: 4,
				holdovers: Empty.composed.args.senate.republicans.holdovers,
			},
		},
	},
});
