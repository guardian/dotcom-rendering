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
	stadium: string;
}

const styles = css`
	background-color: ${brandAltBackground.primary};
	padding: ${remSpace[3]};

	${from.tablet} {
		width: ${tabletContentWidth + 1}px;
		padding-right: 0;
	}

	${from.desktop} {
		width: ${wideContentWidth + 1}px;
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

const stadiumStyles = css`
	${textSans.medium({ fontStyle: 'normal' })}
`;

const FootballScores: FC<Props> = ({ league, homeTeam, awayTeam, stadium }) => (
	<section css={styles}>
		<div>
			<nav css={leagueStyles}>{league}</nav>
			<address css={stadiumStyles}>{stadium}</address>
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
