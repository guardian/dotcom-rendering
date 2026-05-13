import { css } from '@emotion/react';
import {
	from,
	headlineMedium14,
	neutral,
	sport,
	textSans12,
	textSans15,
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
	matches: FootballMatches;
	competitionId: string;
	guardianBaseUrl: string;
	edition: EditionId;
};

export const FootballMatchDay = ({
	matches,
	competitionId,
	guardianBaseUrl,
	edition,
}: Props) => (
	<section
		css={css`
			${textSans12}
		`}
	>
		<ul
			css={css`
				list-style: none;
				margin: 0;
				padding: 0;
			`}
		>
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
		<a
			href={`${guardianBaseUrl}football/${competitionId}/overview`}
			css={fixtureLinkCss}
		>
			See all fixtures <SvgChevronRightSingleSmall size="xsmall" />
		</a>
	</section>
);

const fixtureLinkCss = css`
	${textSans15}
	display: inline-flex;
	align-items: center;
	float: right;
	margin-top: 12px;
	color: inherit;
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
	<li css={matchCss}>
		<a href="/" css={wrapperCss}>
			<span css={statusCss}>
				<MatchStatus match={match} edition={edition} />
			</span>
			<span css={teamCss}>
				{match.homeTeam.name}
				<Crest teamId={match.homeTeam.id} />
			</span>
			<span css={scoreCss}>v</span>
			<span css={[teamCss, awayTeamCss]}>
				<Crest teamId={match.awayTeam.id} />
				{match.awayTeam.name}
			</span>
			<SvgChevronRightSingleSmall size="xsmall" />
			{(match.kind === 'Live' || match.kind === 'Result') &&
				!!match.comment && (
					<span css={commentCss}>{match.comment}</span>
				)}
		</a>
	</li>
);

const matchCss = css`
	color: ${neutral[7]};
	background-color: ${sport[800]};
	& + & {
		border-top: 1px dashed ${neutral[86]};
	}
`;

// const matchLiveCss = css`
// 	background-color: ${sport[800]};
// `;

// const matchResultCss = css`
// 	color: ${neutral[97]};
// 	background-color: ${sport[300]};
// `;

const wrapperCss = css`
	display: grid;
	grid-template-columns: 1fr auto 1fr;
	grid-template-areas:
		'status  status  status'
		'home    score   away'
		'comment comment comment';
	align-items: center;
	padding: 6px;
	color: inherit;
	text-decoration: none;

	svg {
		grid-area: away;
		justify-self: end;
	}
`;

const statusCss = css`
	grid-area: status;
	display: flex;
	align-items: center;
	gap: 4px;
	${from.phablet} {
		grid-area: home;
	}
`;

const teamCss = css`
	${headlineMedium14}
	grid-area: home;
	justify-self: end;
	display: flex;
	align-items: center;
	gap: 4px;
`;

const awayTeamCss = css`
	grid-area: away;
	justify-self: start;
	padding-right: 16px;
`;

const scoreCss = css`
	grid-area: score;
	min-width: 36px;
	text-align: center;
	padding: 4px;
`;

// const liveCss = css`
// 	${textSansBold14}
// 	position: relative;
// 	color: ${sport[300]};
// 	&::before {
// 		display: inline-block;
// 		content: '';
// 		width: 11px;
// 		height: 11px;
// 		margin-right: 2px;
// 		border-radius: 100%;
// 		background-color: currentColor;
// 	}
// `;

const commentCss = css`
	${textSansItalic12}
	grid-area: comment;
	text-align: center;
	color: ${neutral[86]};
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
			return kickOffFormatterForEdition(edition).format(
				new Date(match.dateTimeISOString),
			);
		case 'Live':
			return match.status;
		case 'Result':
			return 'FT';
	}
};

const Crest = ({ teamId }: { teamId: string }) => (
	<picture
		css={css`
			display: flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
			width: 24px;
			height: 24px;
			padding: 2px;
			border-radius: 100%;
			background-color: ${neutral[100]};
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
