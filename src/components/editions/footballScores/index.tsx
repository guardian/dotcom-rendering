// ----- Imports ----- //

import { css } from '@emotion/core';
import type { FootballTeam } from '@guardian/apps-rendering-api-models/footballTeam';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { brandAltBackground } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { MatchStatusKind, TeamLocation } from 'football';
import type { FC } from 'react';
import { tabletContentWidth, wideContentWidth } from '../styles';
import { TeamScore } from '../teamScore';

// ----- Component ----- //

interface Props {
	league: string;
	homeTeam: FootballTeam;
	awayTeam: FootballTeam;
}

const styles = css`
	background-color: ${brandAltBackground.primary};
	padding: ${remSpace[2]};

	${from.tablet} {
		width: ${tabletContentWidth + 5}px;
		padding-right: 0;
	}

	${from.desktop} {
		width: ${wideContentWidth + 5}px;
	}
`;

const matchInfoStyles = css`
	display: grid;
	grid-template-columns: auto 1fr;

	${from.phablet} {
		grid-template-columns: 1fr 1fr 1fr;
	}
`;

const otherMatchStyles = css`
	grid-column: 2;

	${from.phablet} {
		grid-column: 1;
	}
`;

const scoreStyles = css`
	${from.phablet} {
		display: flex;
	}
`;

const leagueStyles = css`
	${textSans.medium({ fontWeight: 'bold' })}
`;

const titleStyles = css`
	text-indent: -10000px;
	position: absolute;
	margin: 0;
`;

const FootballScores: FC<Props> = ({ league, homeTeam, awayTeam }) => (
	<section css={styles}>
		<h2 css={titleStyles}>Scores</h2>
		<div css={matchInfoStyles}>
			<div css={otherMatchStyles}>
				<nav css={leagueStyles}>{league}</nav>
			</div>
		</div>
		<div css={scoreStyles}>
			<TeamScore location={TeamLocation.Home} team={homeTeam} />
			<TeamScore location={TeamLocation.Away} team={awayTeam} />
		</div>
	</section>
);

// ----- Exports ----- //

export { MatchStatusKind };

export default FootballScores;
