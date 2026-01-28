import { css } from '@emotion/react';
import {
	headlineBold17,
	space,
	textSans14,
	textSansBold14,
} from '@guardian/source/foundations';
import { palette } from '../palette';

const containerCss = css`
	display: flex;
	flex-direction: column;
	gap: ${space[2]}px;
	padding: 6px 10px 10px;
	color: ${palette('--football-match-stat-text')};
	background-color: ${palette('--football-pre-match-background')};
	border: 1px solid ${palette('--football-match-stat-border')};
	border-radius: 6px;
`;

const headingCss = css`
	${textSansBold14}
	padding-bottom: ${space[1]}px;
	border-bottom: 1px solid ${palette('--football-match-stat-border')};
`;

const detailsCss = css`
	${textSans14}
	display: flex;
	flex-direction: column;
	gap: ${space[1]}px;
`;

const kickOffCss = css`
	${headlineBold17}
	color: ${palette('--football-pre-match-kickoff')};
`;

type PreMatchProps = {
	homeTeam: string;
	awayTeam: string;
	league: string;
	venue: string;
};

export const FootballPreMatchDetails = ({
	homeTeam,
	awayTeam,
	league,
	venue,
}: PreMatchProps) => {
	return (
		<div css={containerCss}>
			<h3 css={headingCss}>
				{homeTeam} vs. {awayTeam}
			</h3>
			<div css={detailsCss}>
				<span>{league}</span>
				<span>{venue}</span>
				<time css={kickOffCss}>Today, 8:30pm</time>
			</div>
			<a href="/football/fixtures">Today's fixtures</a>
		</div>
	);
};
