import { fn } from 'storybook/test';
import { gridContainerDecorator } from '../../../.storybook/decorators/gridDecorators';
import preview from '../../../.storybook/preview';
import type {
	LiveActivitiesClient,
	MatchNotificationsClient,
} from '../../lib/bridgetApi';
import { palette } from '../../palette';
import { NotificationsToggle } from '../NotificationsToggle.stories';
import { background } from './colours';
import { FixtureWeb } from './FootballMatchHeader.stories';
import { Notifications } from './Notifications';

const meta = preview.meta({
	component: Notifications,
});

const mockLiveActivitiesClient = (
	initFollowing: boolean,
	isAvailable: boolean,
): LiveActivitiesClient => {
	let following = initFollowing;

	return {
		isAvailable: fn(() => {
			return Promise.resolve(isAvailable);
		}),

		follow: fn(() => {
			following = true;
			return Promise.resolve(true);
		}),

		unfollow: fn(() => {
			following = false;
			return Promise.resolve(true);
		}),

		isFollowing: fn(() => {
			return Promise.resolve(following);
		}),
	};
};

export const FixtureLiveActivity = meta.story({
	args: {
		match: FixtureWeb.input.args.initialData.match,
		edition: 'UK',
		notificationsClient: NotificationsToggle.args.notificationsClient,
		matchNotificationsClient:
			FixtureWeb.input.args.matchNotificationsClient,
		environmentClient: FixtureWeb.input.args.environmentClient,
		liveActivitiesClient: mockLiveActivitiesClient(false, true),
	},
	decorators: [gridContainerDecorator],
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

export const FixtureNotifications = FixtureLiveActivity.extend({
	args: {
		liveActivitiesClient: mockLiveActivitiesClient(false, false),
	},
});

export const LiveLiveActivity = FixtureLiveActivity.extend({
	args: {
		edition: 'AU',
		match: {
			...FixtureLiveActivity.input.args.match,
			kind: 'Live',
			status: 'HT',
			homeTeam: {
				...FixtureLiveActivity.input.args.match.homeTeam,
				score: 1,
				scorers: [],
			},
			awayTeam: {
				...FixtureLiveActivity.input.args.match.awayTeam,
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

export const LiveNotifications = LiveLiveActivity.extend({
	args: {
		liveActivitiesClient: mockLiveActivitiesClient(false, false),
	},
});

/**
 * This should be blank. You can't sign up for live activities once a match is
 * over.
 */
export const ResultLiveActivity = LiveLiveActivity.extend({
	args: {
		edition: 'US',
		match: {
			...LiveLiveActivity.input.args.match,
			kind: 'Result',
		},
	},
});

/**
 * This should be blank. You can't sign up for notifications once a match is
 * over.
 */
export const ResultNotifications = ResultLiveActivity.extend({
	args: {
		liveActivitiesClient: mockLiveActivitiesClient(false, false),
	},
});

/**
 * Even if a user is following a team, we should allow them to control the live
 * activity here.
 */
export const FollowingTeamLiveActivity = FixtureLiveActivity.extend({
	args: {
		matchNotificationsClient: {
			isAvailable: () =>
				Promise.resolve({
					isAvailable: false,
					unavailableReason:
						'Notifications for this match are on because you follow Arsenal. Turn off anytime in Settings > Notifications',
				}),
		} satisfies MatchNotificationsClient,
	},
});

/**
 * When the user already has team notifications for one of the teams, the app
 * returns `isAvailable: false` so we show a message instead of the toggle.
 */
export const FollowingTeamNotifications = FixtureNotifications.extend({
	args: {
		matchNotificationsClient:
			FollowingTeamLiveActivity.input.args.matchNotificationsClient,
	},
});
