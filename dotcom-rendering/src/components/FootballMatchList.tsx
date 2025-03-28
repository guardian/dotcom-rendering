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
import type {
	FootballMatch,
	FootballMatches,
	FootballMatchKind,
} from '../footballMatches';
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
	guardianBaseUrl: string;
	getMoreDays?: () => Promise<Result<'failed', FootballMatches>>;
	now: string;
};

const REMOVE_TRAILING_DOTS_REGEX = /\.+$/;

const removeTrailingDots = (str: string): string => {
	return str.replace(REMOVE_TRAILING_DOTS_REGEX, '');
};

const footballMatchesGridStyles = css`
	display: grid;
	grid-template-columns: [centre-column-start] repeat(4, 1fr) [centre-column-end];
	column-gap: 10px;
	${from.mobileLandscape} {
		column-gap: 20px;
	}

	${from.tablet} {
		grid-template-columns: [centre-column-start] repeat(12, 40px) [centre-column-end];
	}

	${from.desktop} {
		grid-template-columns: [centre-column-start] repeat(8, 60px) [centre-column-end];
	}

	${from.leftCol} {
		grid-template-columns:
			[left-column-start] repeat(2, 60px)
			[left-column-end centre-column-start] repeat(8, 60px)
			[centre-column-end];
	}

	${from.wide} {
		grid-template-columns:
			[left-column-start] repeat(3, 60px)
			[left-column-end centre-column-start] repeat(8, 60px)
			[centre-column-end];
	}
`;

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
			grid-column: centre-column-start / centre-column-end;
			border-top: 1px solid ${palette('--football-list-border')};
			padding-top: ${space[2]}px;

			${from.leftCol} {
				padding-bottom: ${space[6]}px;
				grid-column: left-column-start / centre-column-end;
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
			grid-column: centre-column-start / centre-column-end;
			color: ${palette('--football-competition-text')};
			border-top: 1px solid ${palette('--football-top-border')};
			padding: ${space[2]}px;
			background-color: ${palette('--football-match-list-background')};
			margin-top: ${space[9]}px;

			${from.leftCol} {
				border-top-color: ${palette('--football-list-border')};
				background-color: transparent;
				margin-top: 0;
				padding: ${space[1]}px 0 0;
				grid-column: left-column-start / left-column-end;
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
			grid-column: centre-column-start / centre-column-end;

			${from.leftCol} {
				padding-bottom: ${space[9]}px;
			}
		`}
	/>
);

const matchStatusStyles = css`
	width: 5rem;
	color: ${palette('--football-sub-text')};

	${until.mobileMedium} {
		flex-basis: 100%;
	}
`;

const MatchStatus = ({
	match,
	timeFormatter,
}: {
	match: FootballMatch;
	timeFormatter: Intl.DateTimeFormat;
}) => {
	switch (match.kind) {
		case 'Result':
			return <span css={matchStatusStyles}>FT</span>;
		case 'Live':
			return (
				<span
					css={[
						matchStatusStyles,
						css`
							color: ${palette(
								'--football-match-list-live-status',
							)};
						`,
					]}
				>
					{match.status}
				</span>
			);
		case 'Fixture':
			return (
				<time
					css={matchStatusStyles}
					dateTime={match.dateTimeISOString}
				>
					{timeFormatter.format(new Date(match.dateTimeISOString))}
				</time>
			);
	}
};

export const shouldRenderMatchLink = (matchDateTime: Date, now: Date) =>
	matchDateTime.getTime() - now.getTime() <= 72 * 60 * 60 * 1000;

const matchListItemStyles = css`
	background-color: ${palette('--football-match-list-background')};
	border: 1px solid ${palette('--football-list-border')};

	${from.leftCol} {
		&:first-of-type {
			border-top-color: ${palette('--football-top-border')};
		}
	}
`;

const matchStyles = (matchKind: FootballMatchKind) => css`
	${textSans14}

	${matchKind === 'Live' ? 'font-weight: bold;' : undefined}

	display: flex;
	flex-wrap: wrap;
	padding: ${space[2]}px;
`;

const MatchWrapper = ({
	match,
	now,
	children,
}: {
	match: FootballMatch;
	now: string;
	children: ReactNode;
}) => {
	if (
		shouldRenderMatchLink(new Date(match.dateTimeISOString), new Date(now))
	) {
		return (
			<li css={matchListItemStyles}>
				<a
					href={`https://football.theguardian.com/match-redirect/${match.paId}`}
					css={[
						matchStyles(match.kind),
						css`
							text-decoration: none;
							color: inherit;
							:hover {
								background-color: ${palette(
									'--football-match-hover',
								)};
							}
						`,
					]}
				>
					{children}
				</a>
			</li>
		);
	}

	return (
		<li css={[matchListItemStyles, matchStyles(match.kind)]}>{children}</li>
	);
};

const Match = ({
	match,
	timeFormatter,
	now,
}: {
	match: FootballMatch;
	timeFormatter: Intl.DateTimeFormat;
	now: string;
}) => (
	<MatchWrapper match={match} now={now}>
		<MatchStatus match={match} timeFormatter={timeFormatter} />
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
							color: ${palette('--football-sub-text')};
							flex-basis: 100%;
							text-align: center;
							padding-top: ${space[2]}px;
							${from.mobileMedium} {
								padding-left: 5rem;
							}
						`}
					>
						{removeTrailingDots(match.comment)}
					</small>
				)}
			</>
		)}
	</MatchWrapper>
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
			color: ${palette('--football-sub-text')};
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
	homeScore?: number;
	awayScore?: number;
}) => (
	<span
		css={css`
			width: 3rem;
			display: flex;
			color: ${palette('--football-sub-text')};
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
	guardianBaseUrl,
	initialDays,
	getMoreDays,
	now,
}: Props) => {
	const dateFormatter = getDateFormatter(edition);
	const timeFormatter = getTimeFormatter(edition);

	const [days, setDays] = useState(initialDays);
	const [isError, setIsError] = useState<boolean>(false);
	return (
		<>
			{days.map((day) => (
				<section
					css={footballMatchesGridStyles}
					key={day.dateISOString}
				>
					<Day>
						{dateFormatter.format(new Date(day.dateISOString))}
					</Day>
					{day.competitions.map((competition) => (
						<Fragment key={competition.id}>
							<CompetitionName>
								<a
									href={`${guardianBaseUrl}/${competition.tag}`}
									css={css`
										text-decoration: none;
										color: inherit;
										:hover {
											text-decoration: underline;
										}
									`}
								>
									{competition.name}
								</a>
							</CompetitionName>
							<Matches>
								{competition.matches.map((match) => (
									<Match
										key={match.paId}
										match={match}
										timeFormatter={timeFormatter}
										now={now}
									/>
								))}
							</Matches>
						</Fragment>
					))}
				</section>
			))}

			{getMoreDays === undefined ? null : (
				<div css={footballMatchesGridStyles}>
					<div
						css={css`
							grid-column: centre-column-start / centre-column-end;

							${until.leftCol} {
								padding-top: ${space[10]}px;
							}
						`}
					>
						<Button
							theme={{
								textPrimary: palette('--button-text-primary'),
								backgroundPrimary: palette(
									'--button-background-primary',
								),
								backgroundPrimaryHover: palette(
									'--button-background-primary-hover',
								),
							}}
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
								Could not get more matches. Please try again
								later!
							</InlineError>
						) : null}
					</div>
				</div>
			)}
		</>
	);
};
