// ----- Imports ----- //

import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { brandAltBackground, neutral } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { MatchStatusKind, TeamLocation } from 'football';
import type { MatchStatus } from 'football';
import React, { FC } from 'react';
import { FootballTeam } from '@guardian/apps-rendering-api-models/footballTeam';
interface TeamProps {
    team: FootballTeam;
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
    position: absolute;
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
            {team.scorers.map(scorer => <li>{scorer.player} {scorer.timeInMinutes}' {scorer.additionalInfo}</li>)}
        </ul>
    </section>

interface MatchStatusIconProps {
    status: MatchStatus;
}

const matchStatusIconStyles = (status: MatchStatusKind) => css`
    ${textSans.small({ fontWeight: 'bold' })}
    border: 1px dotted ${neutral[0]};
    border-radius: 100%;
    display: inline-block;
    width: 3rem;
    height: 3rem;
    padding-top: 0.75rem;
    box-sizing: border-box;

    ${status === MatchStatusKind.KickOff ? 'font-weight: normal;' : ''}
`;

const MatchStatusIcon: FC<MatchStatusIconProps> = ({ status }) => {
    switch (status.kind) {
        case MatchStatusKind.KickOff:
            return <span css={matchStatusIconStyles(status.kind)}>{status.time}</span>;
        case MatchStatusKind.FirstHalf:
            return <span css={matchStatusIconStyles(status.kind)}>1st</span>;
        case MatchStatusKind.HalfTime:
            return <span css={matchStatusIconStyles(status.kind)}>HT</span>;
        case MatchStatusKind.SecondHalf:
            return <span css={matchStatusIconStyles(status.kind)}>2nd</span>;
        case MatchStatusKind.FullTime:
            return <span css={matchStatusIconStyles(status.kind)}>FT</span>;
        case MatchStatusKind.ExtraTime:
            return <span css={matchStatusIconStyles(status.kind)}>ET</span>;
        case MatchStatusKind.Penalties:
            return <span css={matchStatusIconStyles(status.kind)}>PT</span>;
        case MatchStatusKind.Suspended:
        default:
            return <span css={matchStatusIconStyles(status.kind)}>S</span>;
    }
}

// ----- Component ----- //

interface Props {
    league: string,
    stadium: string,
    status: MatchStatus,
    homeTeam: FootballTeam,
    awayTeam: FootballTeam
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

const FootballScores: FC<Props> = ({ league, stadium, homeTeam, awayTeam, status }) =>
    <section css={styles}>
        <h2 css={css`text-indent: -10000px; position: absolute; margin: 0;`}>Scores</h2>
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

// ----- Exports ----- //

export { MatchStatusKind };

export default FootballScores;
