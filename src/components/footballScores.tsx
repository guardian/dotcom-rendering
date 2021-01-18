// ----- Imports ----- //

import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { brandAltBackground, neutral } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import React, { FC } from 'react';

// ----- Types ----- //

interface Team {
    name: string;
    score: number;
    scorers: string[];
}

const enum TeamLocation {
    Home,
    Away,
}

const enum MatchStatusKind {
    FT,
    HT,
    KickOff,
}

type MatchStatus = {
    kind: MatchStatusKind.FT;
} | {
    kind: MatchStatusKind.HT;
} | {
    kind: MatchStatusKind.KickOff;
    time: string;
};

// ----- Subcomponents ----- //

interface TeamProps {
    team: Team;
    location: TeamLocation;
}

const teamScoreStyles = (location: TeamLocation) => css`
    display: grid;
    grid-template-columns: auto 1fr;
    border-top: 1px dotted ${neutral[0]};
    padding-top: ${remSpace[1]};
    margin-top: ${remSpace[3]};
    box-sizing: border-box;
    
    ${from.phablet} {
        display: inline-grid;
        width: 50%;
        vertical-align: top;
        grid-template-columns: 1fr auto;

        ${location === TeamLocation.Home ? `border-right: 1px dotted ${neutral[0]};` : ''};
    }
`;

const teamNameStyles = (location: TeamLocation) => css`
    ${headline.xxsmall({ fontWeight: 'bold' })}
    margin: 0;
    grid-column: 2;
    grid-row: 1;

    ${from.phablet} {
        ${location === TeamLocation.Home ? 'grid-column: 1;' : ''}
    }
`;

const scoreStyles = (location: TeamLocation) => css`
    ${headline.large({ fontWeight: 'bold' })}
    grid-column: 1;
    grid-row: 1 / 3;
    margin-right: ${remSpace[4]};

    ${from.phablet} {
        ${location === TeamLocation.Home ? 'grid-column: 2;' : ''}
        ${location === TeamLocation.Away ? `margin-left: ${remSpace[4]};` : ''}
    }
`;
    
const scoreNumberStyles = css`
    border: 1px solid ${neutral[0]};
    border-radius: 100%;
    display: block;
    width: 1.5em;
    height: 1.5em;
    position: relative;
`;

const scoreInlineStyles = css`
    top: 7%;
    left: 29%;
`;

const scorerStyles = (location: TeamLocation) => css`
    ${textSans.small()}
    list-style: none;
    margin: 0;
    padding: 0;
    grid-column: 2;
    grid-row: 2;

    ${from.phablet} {
        ${location === TeamLocation.Home ? 'grid-column: 1;' : ''}
    }
`;

const TeamScore: FC<TeamProps> = ({ team, location }) =>
    <section css={teamScoreStyles(location)}>
        <h3 css={teamNameStyles(location)}>{team.name}</h3>
        <div css={scoreStyles(location)}>
            <div css={scoreNumberStyles}>
                <span css={scoreInlineStyles}>{team.score}</span>
            </div>
        </div>
        <ul css={scorerStyles(location)}>
            {team.scorers.map(scorer => <li>{scorer}</li>)}
        </ul>
    </section>

// ----- Component ----- //

interface Props {
    league: string;
    stadium: string;
    homeTeam: Team;
    awayTeam: Team;
    status: MatchStatus;
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

    ${from.phablet} {
        grid-column: 2;
        text-align: center;
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

const FootballScores: FC<Props> = ({ league, stadium, homeTeam, awayTeam }) =>
    <section css={styles}>
        <h2>Scores</h2>
        <div css={matchInfoStyles}>
            <div css={matchStatusStyles}>FT</div>
            <div css={otherMatchStyles}>
                <nav css={leagueStyles}>{league}</nav>
                <address css={stadiumStyles}>{stadium}</address>
            </div>
        </div>
        <TeamScore location={TeamLocation.Home} team={homeTeam} />
        <TeamScore location={TeamLocation.Away} team={awayTeam} />
    </section>

// ----- Exports ----- //

export { MatchStatusKind };

export default FootballScores;
