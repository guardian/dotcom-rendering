import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
	textSans14,
	textSans15,
	textSansBold12,
	textSansBold14,
	textSansBold15,
} from '@guardian/source/foundations';
import type {
	FootballMatchStats,
	FootballMatchTeamWithStats,
	PlayerEvent,
} from '../footballMatchStats';
import { palette } from '../palette';
import Union from '../static/icons/Union.svg';

type Props = {
	matchStats: FootballMatchStats;
};

const lineupSectionId = 'lineups';
const substitutesSectionId = 'substitutes';

export const Lineups = ({ matchStats }: Props) => {
	return (
		<section css={sectionStyles} aria-label="Team Lineups and Substitutes">
			<section
				css={playerListSectionGridStyles}
				aria-labelledby={lineupSectionId}
			>
				<Title text="Lineups" id={lineupSectionId} />
				<PlayerList
					team={matchStats.homeTeam}
					isSubstitute={false}
					isHome={true}
				/>
				<PlayerList
					team={matchStats.awayTeam}
					isSubstitute={false}
					isHome={false}
				/>
			</section>
			<section
				css={playerListSectionGridStyles}
				aria-labelledby={substitutesSectionId}
			>
				<Title text="Substitutes" id={substitutesSectionId} />
				<PlayerList
					team={matchStats.homeTeam}
					isSubstitute={true}
					isHome={true}
				/>
				<PlayerList
					team={matchStats.awayTeam}
					isSubstitute={true}
					isHome={false}
				/>
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
					role="img"
					aria-label="Red Card"
				/>
			);
		case 'booking':
			return (
				<span
					css={rectangle(BackgroundYellow)}
					role="img"
					aria-label="Yellow Card"
				/>
			);
		case 'substitution':
			return (
				<span
					role="img"
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
			${from.desktop} {
				${textSansBold15}
			}
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
	team: FootballMatchTeamWithStats;
	isSubstitute: boolean;
	isHome: boolean;
}) => {
	return (
		<ul css={isHome ? homeStyles : awayStyles}>
			{team.players
				.filter((player) => player.substitute === isSubstitute)
				.map((player) => (
					<li key={player.paID} css={listItem}>
						<strong css={shirtNumber}>{player.shirtNumber}</strong>
						<span css={playerName}>
							{player.name.charAt(0).toUpperCase()}. {player.name}
						</span>
						{player.events.map((event: PlayerEvent) => (
							<Event
								key={event.minute + event.kind}
								type={event.kind}
								time={event.minute.toString()}
							/>
						))}
					</li>
				))}
		</ul>
	);
};

const sectionStyles = css`
	border: 1px solid ${palette('--football-match-stat-border')};
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

const shirtNumber = css`
	display: inline-block;
	width: ${space[5]}px;
	${textSansBold14}
	color: ${palette('--football-match-stat-text')};
	${from.desktop} {
		${textSansBold15}
	}
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
	${from.desktop} {
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
