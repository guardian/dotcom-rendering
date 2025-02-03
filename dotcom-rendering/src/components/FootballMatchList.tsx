import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	from,
	headlineBold17,
	space,
	textSans14,
	textSansBold14,
	until,
} from '@guardian/source/foundations';
import {
	Button,
	InlineError,
	SvgPlus,
} from '@guardian/source/react-components';
import { Fragment, type ReactNode, useState } from 'react';
import type { FootballMatch, FootballMatches } from '../footballMatches';
import { grid } from '../grid';
import {
	type EditionId,
	getLocaleFromEdition,
	getTimeZoneFromEdition,
} from '../lib/edition';
import type { Result } from '../lib/result';
import { palette } from '../palette';

type Props = {
	initialDays: FootballMatches;
	edition: EditionId;
	getMoreDays: () => Promise<Result<'failed', FootballMatches>>;
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

const Match = ({
	match,
	timeFormatter,
}: {
	match: FootballMatch;
	timeFormatter: Intl.DateTimeFormat;
}) => (
	<li
		css={css`
			${textSans14}
			background-color: ${palette('--football-match-list-background')};
			padding: ${space[2]}px;
			display: flex;
			border: 1px solid ${palette('--football-match-list-border')};
			flex-wrap: wrap;

			${from.leftCol} {
				&:first-of-type {
					border-top-color: ${palette(
						'--football-match-list-top-border',
					)};
				}
			}
		`}
	>
		{match.kind === 'Result' ? (
			<span css={matchLeftStyle}>FT</span>
		) : (
			<MatchTime dateTime={match.dateTime.toISOString()}>
				{timeFormatter.format(match.dateTime)}
			</MatchTime>
		)}
		{match.kind === 'Fixture' ? (
			<>
				<HomeTeam>{match.homeTeam}</HomeTeam>

				<Versus />
				<AwayTeam>{match.awayTeam}</AwayTeam>
			</>
		) : (
			<>
				<HomeTeam>{match.homeTeam.name}</HomeTeam>

				<Scores
					homeScore={match.homeTeam.score}
					awayScore={match.awayTeam.score}
				/>
				<AwayTeam>{match.awayTeam.name}</AwayTeam>
				{isUndefined(match.comment) ? null : (
					<small
						css={css`
							color: ${palette('--football-match-list-sub-text')};
							flex-basis: 100%;
							text-align: center;
							padding-top: ${space[2]}px;
							${from.mobileMedium} {
								padding-left: 5rem;
							}
						`}
					>
						{match.comment}
					</small>
				)}
			</>
		)}
	</li>
);

const matchLeftStyle = css`
	width: 5rem;
	color: ${palette('--football-match-list-sub-text')};

	${until.mobileMedium} {
		flex-basis: 100%;
	}
`;

const MatchTime = (props: { children: ReactNode; dateTime: string }) => (
	<time {...props} css={matchLeftStyle} />
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

const Versus = () => (
	<span
		css={css`
			color: ${palette('--football-match-list-sub-text')};
			width: 3rem;
			display: block;
			padding: 0 4px;
			text-align: center;
		`}
	>
		v
	</span>
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
			color: ${palette('--football-match-list-sub-text')};
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

export const FootballMatchList = ({
	edition,
	initialDays,
	getMoreDays,
}: Props) => {
	const dateFormatter = getDateFormatter(edition);
	const timeFormatter = getTimeFormatter(edition);

	const [days, setDays] = useState(initialDays);
	const [isError, setIsError] = useState<boolean>(false);

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
									<Match
										key={match.paId}
										match={match}
										timeFormatter={timeFormatter}
									/>
								))}
							</Matches>
						</Fragment>
					))}
				</section>
			))}

			<div css={css(grid.container)}>
				<div
					css={css`
						${grid.column.centre}
						padding-top: ${space[10]}px;
					`}
				>
					<Button
						icon={<SvgPlus />}
						size="xsmall"
						onClick={() => {
							void getMoreDays().then((moreDays) => {
								if (moreDays.kind === 'ok') {
									setIsError(false);
									setDays(days.concat(moreDays.value));
								} else {
									setIsError(true);
								}
							});
						}}
					>
						More
					</Button>
					{isError ? (
						<InlineError
							cssOverrides={css`
								padding-top: ${space[4]}px;
								color: ${palette(
									'--football-match-list-error',
								)};
							`}
						>
							Could not get more matches. Please try again later!
						</InlineError>
					) : null}
				</div>
			</div>
		</>
	);
};
