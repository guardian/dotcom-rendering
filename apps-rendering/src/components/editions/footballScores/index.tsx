// ----- Imports ----- //

import { css } from '@emotion/react';
import type { FootballTeam } from '@guardian/apps-rendering-api-models/footballTeam';
import {
	brandAltBackground,
	from,
	remSpace,
	textSansBold17,
	textSans17,
} from '@guardian/source-foundations';
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
	${textSansBold17}
`;

const stadiumStyles = css`
	${textSans17};
	/**
	 * @TODO (2) Typography preset styles should not be overridden.
	 * Please speak to your team's designer and update this to use a more appropriate preset.
	*/
	font-style: normal;
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
