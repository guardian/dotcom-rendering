import { css } from '@emotion/react';
import { log } from '@guardian/libs';
import { space, textSans14Object } from '@guardian/source/foundations';
import { useEffect, useMemo, useState } from 'react';
import type { FootballMatch } from '../../footballMatchV2';
import { grid } from '../../grid';
import type {
	MatchNotificationsClient,
	NotificationsClient,
} from '../../lib/bridgetApi';
import {
	type EditionId,
	getLocaleFromEdition,
	getTimeZoneFromEdition,
} from '../../lib/edition';
import { palette } from '../../palette';
import { useConfig } from '../ConfigContext';
import { NotificationsToggle } from '../NotificationsToggle';
import { background, border, primaryText } from './colours';
import { Hr } from './Hr';

type Props = {
	match: FootballMatch;
	edition: EditionId;
	notificationsClient: NotificationsClient;
	matchNotificationsClient: MatchNotificationsClient;
};

export const Notifications = (props: Props) => {
	const { renderingTarget } = useConfig();
	const [isAvailable, setIsAvailable] = useState<boolean | undefined>(
		undefined,
	);
	const [unavailableReason, setUnavailableReason] = useState<
		string | undefined
	>(undefined);

	// useMemo to limit constructions of `Intl.DateTimeFormat`
	const displayName = useMemo(
		() => notificationDisplayName(props.edition),
		[props.edition],
	);

	useEffect(() => {
		if (renderingTarget !== 'Apps' || props.match.kind === 'Result') {
			return;
		}

		void props.matchNotificationsClient
			.isAvailable({
				homeTeam: {
					paId: props.match.homeTeam.paID,
					name: props.match.homeTeam.name,
				},
				awayTeam: {
					paId: props.match.awayTeam.paID,
					name: props.match.awayTeam.name,
				},
			})
			.then((availability) => {
				setIsAvailable(availability.isAvailable);
				setUnavailableReason(availability.unavailableReason);
			})
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
				setIsAvailable(false);
			});
	}, [
		renderingTarget,
		props.match.kind,
		props.match.homeTeam.paID,
		props.match.homeTeam.name,
		props.match.awayTeam.paID,
		props.match.awayTeam.name,
		props.matchNotificationsClient,
	]);

	if (renderingTarget !== 'Apps' || props.match.kind === 'Result') {
		return null;
	}

	const Description = ({ children }: { children: string | undefined }) =>
		children === undefined ? null : (
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
					color: palette(primaryText(props.match.kind)),
				}}
			>
				{children}
			</p>
		);

	switch (isAvailable) {
		case false:
			return (
				<>
					<Hr
						borderStyle="solid"
						borderColour={border(props.match.kind)}
					/>
					<Description>{unavailableReason}</Description>
				</>
			);
		case true:
			return (
				<>
					<Hr
						borderStyle="solid"
						borderColour={border(props.match.kind)}
					/>
					<Description>
						Be notified about the lineup, kick-off time, goals,
						half-time and full time scores
					</Description>
					<NotificationsToggle
						displayName={displayName(props.match)}
						id={props.match.paId}
						notificationType="football-match"
						notificationsClient={props.notificationsClient}
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
		case undefined:
			return (
				<>
					<Hr
						borderStyle="solid"
						borderColour={border(props.match.kind)}
					/>
					<Description>
						Be notified about the lineup, kick-off time, goals,
						half-time and full time scores
					</Description>
				</>
			);
	}
};

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
