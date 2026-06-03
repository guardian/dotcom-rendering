import { css } from '@emotion/react';
import {
	brandAlt,
	from,
	headlineMedium14,
	neutral,
	space,
	sport,
	textSans12,
	textSans15,
	textSansBold12,
	textSansBold14,
	textSansItalic12,
} from '@guardian/source/foundations';
import { SvgChevronRightSingleSmall } from '@guardian/source/react-components';
import type { FootballMatch, FootballMatches } from '../footballMatches';
import {
	type EditionId,
	getLocaleFromEdition,
	getTimeZoneFromEdition,
} from '../lib/edition';
import { FootballCrest } from './FootballCrest';

type Props = {
	competitionTag: string;
	matches: FootballMatches;
	guardianBaseUrl: string;
	edition: EditionId;
};

export const FootballMatchDay = ({
	competitionTag,
	matches,
	guardianBaseUrl,
	edition,
}: Props) => (
	<section css={containerCss}>
		{matches[0]?.competitions[0]?.name && (
			<h3 css={kickerCss}>{matches[0].competitions[0].name} matchday</h3>
		)}
		{matches.length > 0 ? (
			<ul css={matchesCss}>
				{matches.map(
					(day) =>
						day.competitions[0]?.matches.map((match) => (
							<Match
								key={match.paId}
								match={match}
								edition={edition}
							/>
						)),
				)}
			</ul>
		) : (
			<p css={noMatchesCss}>No matches today</p>
		)}
		<a
			href={`${guardianBaseUrl}/football/${competitionTag}/overview`}
			css={fixtureLinkCss}
		>
			See all fixtures{' '}
			<SvgChevronRightSingleSmall
				size="xsmall"
				theme={{ fill: 'currentColor' }}
			/>
		</a>
	</section>
);

/**
 * Note: this component does not use the global colour palette declarations as
 * it is currently rendered in isolation via a dedicated endpoint where these
 * are unavailable. (And it would be undesirable to output the full palette.)
 */

const containerCss = css`
	--match-day-text: ${neutral[7]};
	--match-day-text-live: ${neutral[7]};
	--match-day-text-result: ${neutral[97]};
	--match-day-background: ${sport[800]};
	--match-day-background-live: ${brandAlt[400]};
	--match-day-background-result: ${sport[300]};
	--match-day-comment: ${neutral[86]};
	--match-day-comment-live: ${neutral[10]};
	--match-day-live: ${sport[300]};
	--match-day-kicker: ${sport[400]};
	--match-day-border: ${neutral[86]};
	--match-day-crest: ${neutral[100]};

	display: flex;
	flex-direction: column;
	gap: ${space[2]}px;

	.ios,
	.android {
		@media (prefers-color-scheme: dark) {
			--match-day-text: ${neutral[86]};
			--match-day-text-live: ${neutral[7]};
			--match-day-text-result: ${neutral[97]};
			--match-day-background: ${neutral[20]};
			--match-day-background-live: ${brandAlt[200]};
			--match-day-background-result: ${sport[100]};
			--match-day-comment: ${neutral[86]};
			--match-day-comment-live: ${neutral[10]};
			--match-day-live: ${sport[100]};
			--match-day-kicker: ${sport[500]};
		}
	}
`;

const kickerCss = css`
	${textSans15}
	color: var(--match-day-kicker);
	margin: 0;
`;

const matchesCss = css`
	${textSans12}
	list-style: none;
	margin: 0;
	padding: 0;
`;

const noMatchesCss = css`
	${headlineMedium14}
	margin: 0;
	padding: 11px ${space[2]}px;
	text-align: center;
	color: var(--match-day-text);
	background-color: var(--match-day-background);
`;

const fixtureLinkCss = css`
	${textSans15}
	display: flex;
	align-items: center;
	align-self: flex-end;
	color: var(--match-day-text);
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`;

const Match = ({
	match,
	edition,
}: {
	match: FootballMatch;
	edition: EditionId;
}) => (
	<li css={matchCss(match.kind)}>
		<a
			href={`https://football.theguardian.com/match-redirect/${match.paId}`}
			css={wrapperCss}
		>
			<MatchStatus match={match} edition={edition} />
			<Team name={match.homeTeam.name} id={match.homeTeam.id} />
			<Score match={match} />
			<Team
				name={match.awayTeam.name}
				id={match.awayTeam.id}
				location="away"
			/>
			<SvgChevronRightSingleSmall
				size="xsmall"
				theme={{ fill: 'currentColor' }}
			/>
			<Comment match={match} />
		</a>
	</li>
);

const matchTextColour = (matchKind: FootballMatch['kind']): string => {
	switch (matchKind) {
		case 'Fixture':
			return 'var(--match-day-text)';
		case 'Live':
			return 'var(--match-day-text-live)';
		case 'Result':
			return 'var(--match-day-text-result)';
	}
};

const matchBackgroundColour = (matchKind: FootballMatch['kind']): string => {
	switch (matchKind) {
		case 'Fixture':
			return 'var(--match-day-background)';
		case 'Live':
			return 'var(--match-day-background-live)';
		case 'Result':
			return 'var(--match-day-background-result)';
	}
};

const matchCss = (matchKind: FootballMatch['kind']) => css`
	color: ${matchTextColour(matchKind)};
	background-color: ${matchBackgroundColour(matchKind)};
	:not(:first-of-type) {
		border-top: 1px dashed var(--match-day-border);
	}
`;

const wrapperCss = css`
	display: grid;
	grid-template-columns: 1fr auto 1fr;
	grid-template-areas:
		'status  status  status'
		'home    score   away'
		'comment comment comment';
	align-items: center;
	padding: 6px ${space[2]}px;
	color: inherit;
	text-decoration: none;

	svg {
		grid-area: away;
		justify-self: end;
	}

	&:hover {
		text-decoration: none;
	}
`;

const kickOffFormatterForEdition = (edition: EditionId): Intl.DateTimeFormat =>
	new Intl.DateTimeFormat(getLocaleFromEdition(edition), {
		hour: '2-digit',
		minute: '2-digit',
		timeZoneName: 'short',
		hour12: false,
		timeZone: getTimeZoneFromEdition(edition),
	});

const MatchStatus = ({
	match,
	edition,
}: {
	match: FootballMatch;
	edition: EditionId;
}) => {
	switch (match.kind) {
		case 'Fixture':
			return (
				<time css={statusCss} dateTime={match.dateTimeISOString}>
					{kickOffFormatterForEdition(edition).format(
						new Date(match.dateTimeISOString),
					)}
				</time>
			);
		case 'Live':
			return (
				<span css={statusCss}>
					<span css={liveCss}>Live</span>
					{match.status}
				</span>
			);
		case 'Result':
			return (
				<span
					css={[
						statusCss,
						css`
							${textSansBold12}
						`,
					]}
				>
					FT
				</span>
			);
	}
};

const statusCss = css`
	grid-area: status;
	display: flex;
	align-items: center;
	gap: ${space[1]}px;
	${from.phablet} {
		grid-area: home;
	}
`;

const liveCss = css`
	${textSansBold14}
	position: relative;
	color: var(--match-day-live);
	&::before {
		display: inline-block;
		content: '';
		width: 11px;
		height: 11px;
		margin-right: 2px;
		border-radius: 100%;
		background-color: currentColor;
	}
`;

const Team = ({
	name,
	id,
	location = 'home',
}: {
	name: string;
	id: string;
	location?: 'home' | 'away';
}) => (
	<span css={[teamCss, location === 'away' && awayTeamCss]}>
		{name}
		<Crest teamId={id} />
	</span>
);

const teamCss = css`
	${headlineMedium14}
	grid-area: home;
	justify-self: end;
	display: flex;
	align-items: center;
	gap: ${space[1]}px;
`;

const awayTeamCss = css`
	grid-area: away;
	flex-direction: row-reverse;
	justify-self: start;
	padding-right: ${space[4]}px;
`;

const Score = ({ match }: { match: FootballMatch }) => {
	if (match.kind === 'Live' || match.kind === 'Result') {
		return (
			<span
				css={[
					scoreCss,
					css`
						${textSansBold12}
					`,
				]}
			>
				{match.homeTeam.score} - {match.awayTeam.score}
			</span>
		);
	}
	return <span css={scoreCss}>v</span>;
};

const scoreCss = css`
	grid-area: score;
	min-width: ${space[9]}px;
	text-align: center;
	padding: ${space[1]}px;
`;

const Crest = ({ teamId }: { teamId: string }) => (
	<picture
		css={css`
			display: flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
			width: ${space[5]}px;
			height: ${space[5]}px;
			padding: ${space[1]}px;
			border-radius: 100%;
			background-color: var(--match-day-crest);
		`}
	>
		<FootballCrest
			teamId={teamId}
			altText=""
			width={20}
			css={css`
				max-width: 100%;
				max-height: 100%;
				object-fit: contain;
			`}
		/>
	</picture>
);

const Comment = ({ match }: { match: FootballMatch }) => {
	if (match.kind === 'Fixture' || !match.comment) {
		return null;
	}

	return <small css={commentCss(match.kind)}>{match.comment}</small>;
};

const commentCss = (matchKind: FootballMatch['kind']) => css`
	${textSansItalic12}
	grid-area: comment;
	text-align: center;
	color: ${matchKind === 'Live'
		? 'var(--match-day-comment-live)'
		: 'var(--match-day-comment)'};
`;
