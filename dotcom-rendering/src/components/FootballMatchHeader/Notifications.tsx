import { css } from '@emotion/react';
import { log } from '@guardian/libs';
import { space, textSans14Object } from '@guardian/source/foundations';
import { useEffect, useMemo, useState } from 'react';
import type { FootballMatch } from '../../footballMatchV2';
import { grid } from '../../grid';
import type {
	EnvironmentClient,
	LiveActivitiesClient,
	MatchNotificationsClient,
	NotificationsClient,
} from '../../lib/bridgetApi';
import {
	type EditionId,
	getLocaleFromEdition,
	getTimeZoneFromEdition,
} from '../../lib/edition';
import { hasMinimumBridgetVersionWithClient } from '../../lib/useIsBridgetCompatible';
import { palette } from '../../palette';
import type { RenderingTarget } from '../../types/renderingTarget';
import { useConfig } from '../ConfigContext';
import { LiveActivitiesToggle } from '../LiveActivitiesToggle';
import { NotificationsToggle } from '../NotificationsToggle';
import { background, border, primaryText } from './colours';
import { Hr } from './Hr';

type Props = {
	match: FootballMatch;
	edition: EditionId;
	notificationsClient: NotificationsClient;
	matchNotificationsClient: MatchNotificationsClient;
	environmentClient: EnvironmentClient;
	liveActivitiesClient: LiveActivitiesClient;
};

export const Notifications = (props: Props) => {
	const { renderingTarget } = useConfig();
	const availability = useAvailability(
		renderingTarget,
		props.match,
		props.environmentClient,
		props.liveActivitiesClient,
		props.matchNotificationsClient,
	);

	switch (availability.kind) {
		case 'liveActivities':
			return (
				<LiveActivities
					match={props.match}
					client={props.liveActivitiesClient}
				/>
			);
		case 'matchNotifications':
			return (
				<MatchNotifications
					match={props.match}
					client={props.notificationsClient}
					edition={props.edition}
				/>
			);
		case 'noneWithReason':
			return (
				<NoneWithReason
					matchKind={props.match.kind}
					reason={availability.reason}
				/>
			);
		case 'none':
			return null;
	}
};

const useAvailability = (
	renderingTarget: RenderingTarget,
	match: FootballMatch,
	environment: EnvironmentClient,
	liveActivities: LiveActivitiesClient,
	matchNotifications: MatchNotificationsClient,
): Availability => {
	const [availability, setAvailability] = useState<Availability>({
		kind: 'none',
	});

	useEffect(() => {
		getAvailability(
			renderingTarget,
			match,
			environment,
			liveActivities,
			matchNotifications,
		)
			.then(setAvailability)
			.catch((error: unknown) => {
				window.guardian.modules.sentry.reportError(
					error instanceof Error ? error : new Error(String(error)),
					'bridget-getMatchNotificationsClient-isAvailable-error',
				);
				log(
					'dotcom',
					'Bridget getMatchNotificationsClient.isAvailable Error:',
					error,
				);
				// Hide the button on error as we can't confirm notifications
				// are available and the button may not work
				setAvailability({ kind: 'none' });
			});
	}, [
		renderingTarget,
		match,
		environment,
		liveActivities,
		matchNotifications,
	]);

	return availability;
};

const getAvailability = async (
	renderingTarget: RenderingTarget,
	match: FootballMatch,
	environment: EnvironmentClient,
	liveActivities: LiveActivitiesClient,
	matchNotifications: MatchNotificationsClient,
): Promise<Availability> => {
	if (renderingTarget !== 'Apps' || match.kind === 'Result') {
		return { kind: 'none' };
	}

	if (
		(await hasLiveActivitiesSupport(environment)) &&
		(await liveActivities.isAvailable('football-match', match.paId))
	) {
		return { kind: 'liveActivities' };
	}

	const notificationsAvailability = await matchNotifications.isAvailable({
		homeTeam: {
			paId: match.homeTeam.paID,
			name: match.homeTeam.name,
		},
		awayTeam: {
			paId: match.awayTeam.paID,
			name: match.awayTeam.name,
		},
	});

	if (notificationsAvailability.isAvailable) {
		return { kind: 'matchNotifications' };
	}

	if (notificationsAvailability.unavailableReason !== undefined) {
		return {
			kind: 'noneWithReason',
			reason: notificationsAvailability.unavailableReason,
		};
	}

	return { kind: 'none' };
};

/**
 * If the app supports live activities, and a particular live activity is
 * available for this match, we want to allow the user to turn it on or off.
 * If not, we want to check if match notifications are available instead, and
 * show a button for that. If these aren't available either, the app might tell
 * us the reason why (e.g. the user has already subscribed to notifications by
 * following a team), and we show that information to the user. If none of these
 * features are available, or we're not in the app at all, we show nothing.
 */
type Availability =
	| {
			kind: 'liveActivities';
	  }
	| {
			kind: 'matchNotifications';
	  }
	| {
			kind: 'noneWithReason';
			reason: string;
	  }
	| {
			kind: 'none';
	  };

const hasLiveActivitiesSupport = hasMinimumBridgetVersionWithClient('8.13.0');

/**
 * Exported for the tests.
 */
export const notificationDisplayName =
	(edition: EditionId) =>
	(match: FootballMatch): string => {
		const homeTeam = match.homeTeam.name;
		const awayTeam = match.awayTeam.name;
		const date = matchDayFormatterForEdition(edition).format(match.kickOff);

		return `${homeTeam} vs ${awayTeam} (${date})`;
	};

const matchDayFormatterForEdition = (edition: EditionId): Intl.DateTimeFormat =>
	new Intl.DateTimeFormat(getLocaleFromEdition(edition), {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
		timeZoneName: 'short',
		timeZone: getTimeZoneFromEdition(edition),
	});

const LiveActivities = (props: {
	match: FootballMatch;
	client: LiveActivitiesClient;
}) => (
	<>
		<Hr borderStyle="solid" borderColour={border(props.match.kind)} />
		<LiveActivityDescription matchKind={props.match.kind} />
		<LiveActivitiesToggle
			id={props.match.paId}
			activityType="football-match"
			liveActivitiesClient={props.client}
			colour={primaryText(props.match.kind)}
			backgroundColour={background(props.match.kind)}
			iconColour={primaryText(props.match.kind)}
			css={{
				'&': css(grid.column.centre),
				paddingLeft: 6,
				paddingRight: 6,
				paddingBottom: space[4],
			}}
		/>
	</>
);

const MatchNotifications = (props: {
	match: FootballMatch;
	client: NotificationsClient;
	edition: EditionId;
}) => {
	// useMemo to limit constructions of `Intl.DateTimeFormat`
	const displayName = useMemo(
		() => notificationDisplayName(props.edition),
		[props.edition],
	);

	return (
		<>
			<Hr borderStyle="solid" borderColour={border(props.match.kind)} />
			<Description matchKind={props.match.kind}>
				Be notified about the lineup, kick-off time, goals, half-time
				and full time scores
			</Description>
			<NotificationsToggle
				displayName={displayName(props.match)}
				id={props.match.paId}
				notificationType="football-match"
				notificationsClient={props.client}
				colour={primaryText(props.match.kind)}
				backgroundColour={background(props.match.kind)}
				iconColour={primaryText(props.match.kind)}
				css={{
					'&': css(grid.column.centre),
					paddingLeft: 6,
					paddingRight: 6,
					paddingBottom: space[4],
				}}
			/>
		</>
	);
};

const NoneWithReason = (props: {
	matchKind: FootballMatch['kind'];
	reason: string;
}) => (
	<>
		<Hr borderStyle="solid" borderColour={border(props.matchKind)} />
		<Description matchKind={props.matchKind}>{props.reason}</Description>
	</>
);

const LiveActivityDescription = (props: {
	matchKind: FootballMatch['kind'];
}) => {
	switch (props.matchKind) {
		case 'Fixture':
			return (
				<Description matchKind={props.matchKind}>
					Get match updates on your lock screen including kick-off
					time, lineups, goals, half-time and full-time scores.
				</Description>
			);
		case 'Live':
			return (
				<Description matchKind={props.matchKind}>
					Get live updates on your lock screen throughout the match
				</Description>
			);
		case 'Result':
			return null;
	}
};

const Description = (props: {
	children: string | undefined;
	matchKind: FootballMatch['kind'];
}) =>
	props.children === undefined ? null : (
		<p
			css={{
				...textSans14Object,
				'&': css(grid.column.centre),
				paddingTop: space[2],
				paddingBottom: space[3],
				paddingLeft: 6,
				paddingRight: 6,
			}}
			style={{
				color: palette(primaryText(props.matchKind)),
			}}
		>
			{props.children}
		</p>
	);
