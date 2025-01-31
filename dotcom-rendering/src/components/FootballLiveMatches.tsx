import { css } from '@emotion/react';
import {
	from,
	headlineBold17,
	space,
	textSans14,
	textSansBold14,
	until,
} from '@guardian/source/foundations';
import { Fragment, type ReactNode } from 'react';
import type { FootballMatches } from '../footballMatches';
import { grid } from '../grid';
import {
	type EditionId,
	getLocaleFromEdition,
	getTimeZoneFromEdition,
} from '../lib/edition';
import { palette } from '../palette';

type Props = {
	days: FootballMatches;
	edition: EditionId;
};

const getDateFormatter = (edition: EditionId): Intl.DateTimeFormat =>
	new Intl.DateTimeFormat('en-GB', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: getTimeZoneFromEdition(edition),
	});

const getTimeFormatter = (edition: EditionId): Intl.DateTimeFormat =>
	new Intl.DateTimeFormat(getLocaleFromEdition(edition), {
		hour: '2-digit',
		minute: '2-digit',
		timeZoneName: 'short',
		hour12: false,
		timeZone: getTimeZoneFromEdition(edition),
	});

const Day = (props: { children: ReactNode }) => (
	<h2
		css={css`
			${textSansBold14}
			${grid.column.centre}
				border-top: 1px solid ${palette('--football-match-list-border')};
			padding-top: ${space[2]}px;

			${from.leftCol} {
				padding-bottom: ${space[6]}px;
				${grid.between('left-column-start', 'centre-column-end')}
			}
		`}
	>
		{props.children}
	</h2>
);

const CompetitionName = (props: { children: ReactNode }) => (
	<h3
		css={css`
			${textSansBold14}
			${grid.column.centre}
			color: ${palette('--football-match-list-competition-text')};
			border-top: 1px solid ${palette('--football-match-list-top-border')};
			padding: ${space[2]}px;
			background-color: ${palette('--football-match-list-background')};
			margin-top: ${space[9]}px;

			${from.leftCol} {
				border-top-color: ${palette('--football-match-list-border')};
				background-color: transparent;
				margin-top: 0;
				padding: ${space[1]}px 0 0;
				${grid.column.left}
				${headlineBold17}
			}
		`}
	>
		{props.children}
	</h3>
);

const Matches = (props: { children: ReactNode }) => (
	<ul
		{...props}
		css={css`
			${grid.column.centre}

			${from.leftCol} {
				padding-bottom: ${space[9]}px;
			}
		`}
	/>
);

const Match = (props: { children: ReactNode }) => (
	<li
		{...props}
		css={css`
			${textSans14}
			background-color: ${palette('--football-match-list-background')};
			padding: ${space[2]}px;
			display: flex;
			border: 1px solid ${palette('--football-match-list-border')};

			${until.mobileMedium} {
				flex-wrap: wrap;
			}

			${from.leftCol} {
				&:first-of-type {
					border-top-color: ${palette(
						'--football-match-list-top-border',
					)};
				}
			}
		`}
	/>
);

const MatchTime = (props: { children: ReactNode; dateTime: string }) => (
	<time
		{...props}
		css={css`
			width: 5rem;

			${until.mobileMedium} {
				flex-basis: 100%;
			}
		`}
	/>
);

const HomeTeam = (props: { children: ReactNode }) => (
	<span
		{...props}
		css={css`
			text-align: right;
			flex: 1 0 0;
			padding-right: 1rem;
		`}
	/>
);

const AwayTeam = (props: { children: ReactNode }) => (
	<span
		{...props}
		css={css`
			flex: 1 0 0;
			padding-left: 1rem;
		`}
	/>
);

const Battleline = () => (
	<span
		css={css`
			display: block;
			padding: 0 4px;

			&:before {
				content: '-';
			}
		`}
	/>
);

const Scores = ({
	homeScore,
	awayScore,
}: {
	homeScore: number;
	awayScore: number;
}) => (
	<span
		css={css`
			width: 3rem;
			display: flex;
		`}
	>
		<span
			css={css`
				text-align: right;
				flex: 1 0 0;
			`}
		>
			{homeScore}
		</span>
		<Battleline />
		<span
			css={css`
				text-align: left;
				flex: 1 0 0;
			`}
		>
			{awayScore}
		</span>
	</span>
);

export const FootballLiveMatches = ({ edition, days }: Props) => {
	const dateFormatter = getDateFormatter(edition);
	const timeFormatter = getTimeFormatter(edition);

	return (
		<>
			{days.map((day) => (
				<section css={css(grid.container)} key={day.date.toISOString()}>
					<Day>{dateFormatter.format(day.date)}</Day>
					{day.competitions.map((competition) => (
						<Fragment key={competition.competitionId}>
							<CompetitionName>
								{competition.name}
							</CompetitionName>
							<Matches>
								{competition.matches.map((match) => (
									<Match key={match.paId}>
										<MatchTime
											dateTime={match.dateTime.toISOString()}
										>
											{timeFormatter.format(
												match.dateTime,
											)}
										</MatchTime>
										<HomeTeam>
											{match.homeTeam.name}
										</HomeTeam>
										<Scores
											homeScore={match.homeTeam.score}
											awayScore={match.awayTeam.score}
										/>
										<AwayTeam>
											{match.awayTeam.name}
										</AwayTeam>
									</Match>
								))}
							</Matches>
						</Fragment>
					))}
				</section>
			))}
		</>
	);
};
