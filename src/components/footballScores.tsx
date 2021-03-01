// ----- Imports ----- //

import { css } from '@emotion/core';
import type { FootballTeam } from '@guardian/apps-rendering-api-models/footballTeam';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { brandAltBackground } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { MatchStatusIcon } from 'components/matchStatusIcon';
import { TeamScore } from 'components/teamScore';
import { MatchStatusKind, TeamLocation } from 'football';
import type { MatchStatus } from 'football';
import type { FC } from 'react';
import React from 'react';

// ----- Component ----- //

interface Props {
	league: string;
	stadium: string;
	status: MatchStatus;
	homeTeam: FootballTeam;
	awayTeam: FootballTeam;
}

const styles = css`
	background-color: ${brandAltBackground.primary};
	padding: ${remSpace[2]};
`;

const matchInfoStyles = css`
	display: grid;
	grid-template-columns: auto 1fr;

	${from.phablet} {
		grid-template-columns: 1fr 1fr 1fr;
	}
`;

const matchStatusStyles = css`
	grid-column: 1;
	grid-row: 1;
	text-align: center;
	margin-right: ${remSpace[2]};

	${from.phablet} {
		grid-column: 2;
		margin-right: 0;
	}
`;

const otherMatchStyles = css`
	grid-column: 2;

	${from.phablet} {
		grid-column: 1;
	}
`;

const leagueStyles = css`
	${textSans.medium({ fontWeight: 'bold' })}
`;

const stadiumStyles = css`
	${textSans.medium({ fontStyle: 'normal' })}
`;

const FootballScores: FC<Props> = ({
	league,
	stadium,
	homeTeam,
	awayTeam,
	status,
}) => (
	<section css={styles}>
		<h2
			css={css`
				text-indent: -10000px;
				position: absolute;
				margin: 0;
			`}
		>
			Scores
		</h2>
		<div css={matchInfoStyles}>
			<div css={matchStatusStyles}>
				<MatchStatusIcon status={status} />
			</div>
			<div css={otherMatchStyles}>
				<nav css={leagueStyles}>{league}</nav>
				<address css={stadiumStyles}>{stadium}</address>
			</div>
		</div>
		<TeamScore location={TeamLocation.Home} team={homeTeam} />
		<TeamScore location={TeamLocation.Away} team={awayTeam} />
	</section>
);

// ----- Exports ----- //

export { MatchStatusKind };

export default FootballScores;
