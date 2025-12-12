import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
	textSans14,
	textSans15,
	textSansBold12,
	textSansBold14,
} from '@guardian/source/foundations';
import type { FootballTeam } from '../footballMatch';
import { palette } from '../palette';
import Union from '../static/icons/Union.svg';
import type { EventType } from '../types/sport';

type Props = {
	home: FootballTeam;
	away: FootballTeam;
};

const lineupSectionId = 'lineups';
const substitutesSectionId = 'substitutes';

export const Lineups = ({ home, away }: Props) => {
	return (
		<section css={sectionStyles} aria-label="Team Lineups and Substitutes">
			<section
				css={playerListSectionGridStyles}
				aria-labelledby={lineupSectionId}
			>
				<Title text="Lineups" id={lineupSectionId} />
				<PlayerList team={home} isSubstitute={false} isHome={true} />
				<PlayerList team={away} isSubstitute={false} isHome={false} />
			</section>
			<section
				css={playerListSectionGridStyles}
				aria-labelledby={substitutesSectionId}
			>
				<Title text="Substitutes" id={substitutesSectionId} />
				<PlayerList team={home} isSubstitute={true} isHome={true} />
				<PlayerList team={away} isSubstitute={true} isHome={false} />
			</section>
		</section>
	);
};

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
				<span
					aria-label={`Substitution in ${time} minute`}
					css={substitute}
				>
					<Union />
					{time}
				</span>
			);
	}
};

const Title = ({ text, id }: { text: string; id: string }) => (
	<h3
		id={id}
		css={css`
			border-bottom: 1px solid ${palette('--football-match-stat-border')};
			color: ${palette('--football-match-stat-text')};
			grid-column: home-start / away-end;
			padding-bottom: ${space[1]}px;
			${textSansBold14}
		`}
	>
		{text}
	</h3>
);

const PlayerList = ({
	team,
	isSubstitute,
	isHome,
}: {
	team: FootballTeam;
	isSubstitute: boolean;
	isHome: boolean;
}) => {
	return (
		<ul css={isHome ? homeStyles : awayStyles}>
			{team.players
				.filter((player) => player.substitute === isSubstitute)
				.map((player) => (
					<li key={player.id} css={listItem}>
						<strong css={shirtNumber(team.colours)}>
							{player.shirtNumber}
						</strong>
						<span css={playerName}>
							{player.name.charAt(0).toUpperCase()}.{' '}
							{player.lastName}
						</span>
						{player.events.map((event: EventType) => (
							<Event
								key={event.eventTime + event.eventType}
								type={event.eventType}
								time={event.eventTime}
							/>
						))}
					</li>
				))}
		</ul>
	);
};

const sectionStyles = css`
	border: 1px solid ${palette('--football-match-stat-border')};
	margin: ${space[2]}px;
	border-radius: 6px;

	padding-top: 6px;

	background-color: ${palette('--football-match-info-background')};
`;

const playerListSectionGridStyles = css`
	display: grid;
	grid-template-columns: [home-start] 1fr [home-end away-start] 1fr [away-end];
	column-gap: 20px;

	padding: 0px 10px 10px 10px;
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
		background-color: ${palette('--football-match-stat-border')};
	}
`;

const shirtNumber = (color: string) => css`
	display: inline-block;
	width: ${space[5]}px;
	${textSansBold14}
	color: ${color};
`;

const listItem = css`
	padding-top: ${space[2]}px;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: ${space[1]}px;

	&:last-child {
		padding-bottom: ${space[0]}px;
	}
`;

const playerName = css`
	${textSans14}
	${from.tablet} {
		${textSans15}
	}
	color: ${palette('--football-match-stat-text')};
`;

const BackgroundRed = sourcePalette.news[400];

const BackgroundYellow = sourcePalette.brandAlt[300];

const rectangle = (color: string) => css`
	display: inline-block;
	width: ${space[3]}px;
	height: ${space[4]}px;
	border-radius: ${space[0]}px;
	margin-left: ${space[1]}px;
	background-color: ${color};
`;

const substitute = css`
	${textSansBold12}
	border: 1px solid rgba(18, 18, 18, 0.20);
	border-radius: ${space[8]}px;
	padding: 0.5px ${space[1]}px 1.5px ${space[1]}px;
	display: flex;
	align-items: center;
	color: ${palette('--football-match-stat-text')};
	opacity: 0.6;
	gap: ${space[0]}px;

	svg {
		fill: ${palette('--football-match-substitution-icon')};
	}
`;
