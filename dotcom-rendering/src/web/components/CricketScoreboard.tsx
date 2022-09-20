import { css } from '@emotion/react';
import { between, space, textSans, until } from '@guardian/source-foundations';
import type { Palette } from '../../types/palette';
import { decidePalette } from '../lib/decidePalette';

const ALL_OUT_WICKETS = 10;

type Props = {
	scorecardUrl: string;
	match: CricketMatch;
	format: ArticleFormat;
};

const screenReaderOnlyStyle = css`
	border: 0;
	clip: rect(0 0 0 0);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	width: 1px;
`;

const containerStyle = css`
	${until.mobileLandscape} {
		padding: 10px 10px 0 10px;
	}
	${between.mobileLandscape.and.desktop} {
		padding: 10px 20px 0 20px;
	}
`;

const tableStyle = css`
	width: 100%;
	${textSans.xsmall()}
`;

const captionStyle = (palette: Palette) => css`
	text-align: left;
	font-weight: bold;
	border-top: 1px solid ${palette.border.cricketScoreboardTop};
	border-collapse: inherit;
	padding-top: ${space[2]}px;
	padding-bottom: ${space[2]}px;
`;

const rowStyle = (palette: Palette) => css`
	border-top: 1px solid ${palette.border.cricketScoreboardDivider};
`;

const cellStyle = css`
	padding-top: ${space[3]}px;
	padding-bottom: ${space[3]}px;
`;

const boldStlye = css`
	font-weight: bold;
`;

const linkPaddingStlye = css`
	padding-top: ${space[3]}px;
	padding-bottom: ${space[2]}px;
`;

const linkStyle = (palette: Palette) => css`
	color: ${palette.text.cricketScoreboardLink};
	text-decoration: none;

	:hover {
		color: ${palette.text.cricketScoreboardLink};
		text-decoration: underline;
	}
`;

export const cricketScore = ({
	innings,
	short,
}: {
	innings: CricketInnings;
	short?: boolean;
}): string => {
	if (innings.declared) {
		return `${innings.runsScored} - ${innings.fallOfWicket.length} declared`;
	}
	if (innings.forfeited) {
		return `${innings.runsScored} - ${innings.fallOfWicket.length} forfeited`;
	}
	if (innings.fallOfWicket.length === ALL_OUT_WICKETS) {
		return short ? innings.runsScored : `${innings.runsScored} all out`;
	}
	return `${innings.runsScored} - ${innings.fallOfWicket.length}`;
};

export const CricketInnings = ({
	match,
	home,
}: {
	match: CricketMatch;
	home: boolean;
}) => {
	const teamName = match.teams.find((team) => team.home === home)?.name;
	const teamInnings = match.innings.filter(
		(innings) => innings.battingTeam === teamName,
	);

	// There can be up to 2 innings per team in a cricket match
	switch (teamInnings.length) {
		case 1:
			return (
				<p>
					{cricketScore({ innings: teamInnings[0] })} (
					{teamInnings[0].overs} overs)
				</p>
			);
		case 2:
			return (
				<p>
					{cricketScore({ innings: teamInnings[0], short: true })}
					{' & '}
					{cricketScore({ innings: teamInnings[1] })} (
					{teamInnings[1].overs} overs)
				</p>
			);
		default:
			return <p>Yet to bat</p>;
	}
};

export const CricketScoreboard = ({ scorecardUrl, match, format }: Props) => {
	const palette = decidePalette(format);
	const date = new Date(match.gameDate);
	return (
		<div css={containerStyle}>
			<h2 css={screenReaderOnlyStyle}>
				<time dateTime={date.toISOString()}>{date.toDateString()}</time>
				{match.competitionName}, {match.venueName}
			</h2>
			<table css={tableStyle}>
				<thead css={screenReaderOnlyStyle}>
					<tr>
						<td>Team name</td>
						<td>Score</td>
					</tr>
				</thead>
				<tbody>
					{/* Home team */}
					<tr css={rowStyle(palette)}>
						<td css={[cellStyle, boldStlye]}>
							{match.teams.find((team) => !!team.home)?.name}
						</td>
						<td css={cellStyle}>
							<CricketInnings match={match} home={true} />
						</td>
					</tr>
					{/* Away team */}
					<tr css={rowStyle(palette)}>
						<td css={[cellStyle, boldStlye]}>
							{match.teams.find((team) => !team.home)?.name}
						</td>
						<td css={cellStyle}>
							<CricketInnings match={match} home={false} />
						</td>
					</tr>
				</tbody>
				<caption css={captionStyle(palette)}>
					{match.competitionName}, {match.venueName}
				</caption>
				<tfoot>
					<tr css={rowStyle(palette)}>
						<td css={linkPaddingStlye} colSpan={2}>
							<a css={linkStyle(palette)} href={scorecardUrl}>
								View full scorecard
							</a>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};
