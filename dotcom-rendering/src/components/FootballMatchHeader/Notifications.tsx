import { css } from '@emotion/react';
import { log } from '@guardian/libs';
import {
	space,
	textSans14,
	textSans14Object,
} from '@guardian/source/foundations';
import { useEffect, useMemo, useState } from 'react';
import type { FootballMatch } from '../../footballMatchV2';
import { grid } from '../../grid';
import type { NotificationsClient } from '../../lib/bridgetApi';
import { getMatchNotificationsClient } from '../../lib/bridgetApi';
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

		void getMatchNotificationsClient()
			.isAvailable({
				homeTeam: {
					id: props.match.homeTeam.paID,
					name: props.match.homeTeam.name,
				},
				awayTeam: {
					id: props.match.awayTeam.paID,
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
				// Treat errors as available to avoid silently hiding the button
				setIsAvailable(true);
			});
	}, [
		renderingTarget,
		props.match.kind,
		props.match.homeTeam.paID,
		props.match.homeTeam.name,
		props.match.awayTeam.paID,
		props.match.awayTeam.name,
	]);

	if (renderingTarget !== 'Apps' || props.match.kind === 'Result') {
		return null;
	}

	return (
		<>
			<Hr borderStyle="solid" borderColour={border(props.match.kind)} />
			{isAvailable === false ? (
				<p
					css={[
						textSans14,
						css({
							'&': css(grid.column.centre),
							paddingTop: space[2],
							paddingBottom: space[3],
							paddingLeft: 6,
							paddingRight: 6,
						}),
					]}
					style={{
						color: palette(primaryText(props.match.kind)),
					}}
				>
					{unavailableReason ??
						'Notifications for this match are on because you are following a team. Turn off anytime in Settings > Notifications'}
				</p>
			) : (
				<>
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
						Be notified about the lineup, kick-off time, goals,
						half-time and full time scores
					</p>
					{isAvailable === true && (
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
					)}
				</>
			)}
		</>
	);
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
