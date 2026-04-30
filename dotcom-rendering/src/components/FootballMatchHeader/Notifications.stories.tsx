import { gridContainerDecorator } from '../../../.storybook/decorators/gridDecorators';
import preview from '../../../.storybook/preview';
import { palette } from '../../palette';
import { fn, mocked } from 'storybook/test';
import { getMatchNotificationsClient } from '../../lib/bridgetApi';
import { NotificationsToggle } from '../NotificationsToggle.stories';
import { background } from './colours';
import { FixtureWeb } from './FootballMatchHeader.stories';
import { Notifications } from './Notifications';

const meta = preview.meta({
	component: Notifications,
});

export const Fixture = meta.story({
	args: {
		match: FixtureWeb.input.args.initialData.match,
		edition: 'UK',
		notificationsClient: NotificationsToggle.args.notificationsClient,
	},
	decorators: [gridContainerDecorator],
	beforeEach() {
		mocked(getMatchNotificationsClient).mockReturnValue({
			isAvailable: fn(() => Promise.resolve({ isAvailable: true })),
		} as ReturnType<typeof getMatchNotificationsClient>);
	},
	parameters: {
		colourSchemeBackground: {
			light: palette(background('Fixture')),
			dark: palette(background('Fixture')),
		},
		config: {
			renderingTarget: 'Apps',
		},
	},
});

export const Live = Fixture.extend({
	args: {
		edition: 'AU',
		match: {
			...Fixture.input.args.match,
			kind: 'Live',
			status: 'HT',
			homeTeam: {
				...Fixture.input.args.match.homeTeam,
				score: 1,
				scorers: [],
			},
			awayTeam: {
				...Fixture.input.args.match.awayTeam,
				score: 0,
				scorers: [],
			},
			comment: undefined,
		},
	},
	parameters: {
		colourSchemeBackground: {
			light: palette(background('Live')),
			dark: palette(background('Live')),
		},
	},
});

/**
 * This should be blank. You can't sign up for notifications once a match is
 * over.
 */
export const Result = Live.extend({
	args: {
		edition: 'US',
		match: {
			...Live.input.args.match,
			kind: 'Result',
		},
	},
});

/**
 * When the user already has team notifications for one of the teams, the app
 * returns `isAvailable: false` so we show a message instead of the toggle.
 */
export const Unavailable = Fixture.extend({
	beforeEach() {
		mocked(getMatchNotificationsClient).mockReturnValue({
			isAvailable: fn(() =>
				Promise.resolve({
					isAvailable: false,
					unavailableReason:
						'You have already signed up for Arsenal notifications',
				}),
			),
		} as ReturnType<typeof getMatchNotificationsClient>);
	},
});
