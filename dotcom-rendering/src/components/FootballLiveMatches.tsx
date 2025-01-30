import { css } from '@emotion/react';
import {
	from,
	headlineBold17,
	space,
	textSans14,
	textSansBold14,
	until,
} from '@guardian/source/foundations';
import {
	Fragment,
	type HTMLAttributes,
	type LiHTMLAttributes,
	type TimeHTMLAttributes,
} from 'react';
import { grid } from '../grid';
import type { FootballMatches } from '../footballMatches';
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

const Day = (props: HTMLAttributes<HTMLHeadingElement>) => (
	<h2
		css={[
			textSansBold14,
			grid.column.centre,
			{
				borderTopWidth: 1,
				borderTopStyle: 'solid',
				borderTopColor: palette('--football-match-list-border'),
				paddingTop: space[2],
				[from.leftCol]: [
					{
						paddingBottom: space[6],
					},
					grid.between('left-column-start', 'centre-column-end'),
				],
			},
		]}
	>
		{props.children}
	</h2>
);

const CompetitionName = (props: HTMLAttributes<HTMLHeadingElement>) => (
	<h3
		css={[
			textSansBold14,
			grid.column.centre,
			{
				color: palette('--football-match-list-competition-text'),
				borderTopWidth: 1,
				borderTopStyle: 'solid',
				padding: space[2],
				backgroundColor: palette('--football-match-list-background'),
				borderTopColor: palette('--football-match-list-top-border'),
				marginTop: space[9],
				[from.leftCol]: [
					{
						borderTopColor: palette('--football-match-list-border'),
						backgroundColor: 'transparent',
						marginTop: 0,
						padding: 0,
						paddingTop: space[1],
					},
					grid.column.left,
					headlineBold17,
				],
			},
		]}
	>
		{props.children}
	</h3>
);

const Matches = (props: HTMLAttributes<HTMLUListElement>) => (
	<ul
		{...props}
		css={[
			grid.column.centre,
			{
				[from.leftCol]: {
					paddingBottom: space[9],
				},
			},
		]}
	/>
);

const Match = (props: LiHTMLAttributes<HTMLLIElement>) => (
	<li
		{...props}
		css={[
			textSans14,
			{
				backgroundColor: palette('--football-match-list-background'),
				padding: space[2],
				display: 'flex',
				borderTopWidth: 1,
				borderTopStyle: 'solid',
				borderTopColor: palette('--football-match-list-border'),
				[until.mobileMedium]: {
					flexWrap: 'wrap',
				},
				[from.leftCol]: {
					'&:first-of-type': {
						borderTopColor: palette(
							'--football-match-list-top-border',
						),
					},
				},
			},
		]}
	/>
);

const MatchTime = (props: TimeHTMLAttributes<HTMLTimeElement>) => (
	<time
		{...props}
		css={{
			width: '5rem',
			[until.mobileMedium]: {
				flexBasis: '100%',
			},
		}}
	/>
);

const HomeTeam = (props: HTMLAttributes<HTMLSpanElement>) => (
	<span
		{...props}
		css={{
			textAlign: 'right',
			flex: '1 0 0',
			paddingRight: '1rem',
		}}
	/>
);

const AwayTeam = (props: HTMLAttributes<HTMLSpanElement>) => (
	<span
		{...props}
		css={{
			flex: '1 0 0',
			paddingLeft: '1rem',
		}}
	/>
);

const Battleline = (props: HTMLAttributes<HTMLSpanElement>) => (
	<span
		{...props}
		css={{
			display: 'block',
			padding: '0 4px',
			'&:before': {
				content: '"-"',
			},
		}}
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
		css={{
			width: '3rem',
			display: 'flex',
		}}
	>
		<span
			css={{
				textAlign: 'right',
				flex: '1 0 0',
			}}
		>
			{homeScore}
		</span>
		<Battleline />
		<span
			css={{
				textAlign: 'left',
				flex: '1 0 0',
			}}
		>
			{awayScore}
		</span>
	</span>
);

export const FootballLiveMatches = ({ edition, days }: Props) => {
	const dateFormatter = getDateFormatter(edition);
	const timeFormatter = getTimeFormatter(edition);

	return (
		<section css={css(grid.container)}>
			{days.map((day) => (
				<Fragment key={day.date.toISOString()}>
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
				</Fragment>
			))}
		</section>
	);
};
