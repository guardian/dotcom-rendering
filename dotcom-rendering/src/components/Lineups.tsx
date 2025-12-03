import { css } from '@emotion/react';
import {
	palette as sourcePalette,
	space,
	textSans15,
	textSansBold14,
} from '@guardian/source/foundations';
import { type FootballTeam } from '../footballMatch';
import { palette } from '../palette';
import Union from '../static/icons/Union.svg';
import type { EventType } from '../types/sport';

type Props = {
	home: FootballTeam;
	away: FootballTeam;
};

const sectionStyles = css`
	border: 1px solid ${sourcePalette.neutral[86]};
	margin: ${space[2]}px;
	border-radius: 6px;
`;

const lineupSectionGridStyles = css`
	display: grid;
	grid-template-columns: [home-start] 1fr [home-end away-start] 1fr [away-end];
	column-gap: 20px;

	padding: 6px 10px;
`;

const homeStyles = css`
	grid-column: home-start / home-end;
`;

const awayStyles = css`
	grid-column: away-start / away-end;
	position: relative;
	&::before {
		content: '';
		position: absolute;
		left: -10px;
		top: 0;
		bottom: 0;
		width: 1px;
		background-color: ${sourcePalette.neutral[86]};
	}
`;

const shirtNumber = (color: string) => css`
	display: inline-block;
	width: 20px;
	${textSansBold14}
	color: ${color};
`;

const listItem = css`
	padding-top: ${space[2]}px;
	display: flex;
	align-items: center;
`;

const playerName = css`
	${textSans15}
	color: ${palette('--match-nav-text')};
`;

export const Lineups = ({ home, away }: Props) => {
	return (
		<div>
			<section css={sectionStyles}>
				<section css={lineupSectionGridStyles}>
					<h3
						css={css`
							border-bottom: 1px solid
								${sourcePalette.neutral[86]};
							grid-column: home-start / away-end;
							padding-bottom: ${space[1]}px;
							${textSansBold14}
						`}
					>
						Lineups
					</h3>
					<ul css={homeStyles}>
						{home.players
							.filter((player) => !player.substitute)
							.map((player) => (
								<li key={player.id} css={listItem}>
									<strong css={shirtNumber(home.colours)}>
										{player.shirtNumber}
									</strong>
									<span css={playerName}>
										{player.name.charAt(0).toUpperCase()}.{' '}
										{player.lastName}
									</span>
									{player.events.map((event: EventType) => (
										<Event
											key={
												event.eventTime +
												event.eventType
											}
											type={event.eventType}
											time={event.eventTime}
										/>
									))}
								</li>
							))}
					</ul>
					<ul css={awayStyles}>
						{away.players
							.filter((player) => !player.substitute)
							.map((player) => (
								<li key={player.id} css={listItem}>
									<strong css={shirtNumber(away.colours)}>
										{player.shirtNumber}
									</strong>
									<span css={playerName}>
										{player.name.charAt(0).toUpperCase()}.{' '}
										{player.lastName}
									</span>
									{player.events.map((event: EventType) => (
										<Event
											key={
												event.eventTime +
												event.eventType
											}
											type={event.eventType}
											time={event.eventTime}
										/>
									))}
								</li>
							))}
					</ul>
				</section>
				<section css={lineupSectionGridStyles}>
					<h3
						css={css`
							border-bottom: 1px solid
								${sourcePalette.neutral[86]};
							grid-column: home-start / away-end;
							padding-bottom: ${space[1]}px;
							padding-top: ${space[3]}px;
							${textSansBold14}
						`}
					>
						Substitutes
					</h3>
					<ul css={homeStyles}>
						{home.players
							.filter((player) => player.substitute)
							.map((player) => (
								<li key={player.id} css={listItem}>
									<strong css={shirtNumber(home.colours)}>
										{player.shirtNumber}
									</strong>
									<span css={playerName}>
										{player.name.charAt(0).toUpperCase()}.{' '}
										{player.lastName}
									</span>
									{player.events.map((event: EventType) => (
										<Event
											key={
												event.eventTime +
												event.eventType
											}
											type={event.eventType}
											time={event.eventTime}
										/>
									))}
								</li>
							))}
					</ul>
					<ul css={awayStyles}>
						{away.players
							.filter((player) => player.substitute)
							.map((player) => (
								<li key={player.id} css={listItem}>
									<strong css={shirtNumber(away.colours)}>
										{player.shirtNumber}
									</strong>
									<span css={playerName}>
										{player.name.charAt(0).toUpperCase()}.{' '}
										{player.lastName}
									</span>
									{player.events.map((event: EventType) => (
										<Event
											key={
												event.eventTime +
												event.eventType
											}
											type={event.eventType}
											time={event.eventTime}
										/>
									))}
								</li>
							))}
					</ul>
				</section>
			</section>
		</div>
	);
};

const BackgroundRed = '#cc2b12';

const BackgroundYellow = '#FFD900';

const rectangle = (color: string) => css`
	display: inline-block;
	width: ${space[3]}px;
	height: ${space[4]}px;
	border-radius: ${space[0]}px;
	margin-left: ${space[1]}px;
	background-color: ${color};
`;

const Event = ({
	type,
	time,
}: {
	type: 'substitution' | 'dismissal' | 'booking';
	time: string;
}) => {
	switch (type) {
		case 'dismissal':
			return (
				<span
					css={rectangle(BackgroundRed)}
					aria-label="Red Card"
					aria-hidden="false"
				/>
			);
		case 'booking':
			return (
				<span
					css={rectangle(BackgroundYellow)}
					aria-label="Yellow Card"
					aria-hidden="false"
				/>
			);
		case 'substitution':
			return (
				<span>
					<Union />
				</span>
			);
	}
};
