import React from 'react';
import { css } from 'emotion';

import { brandYellow, background } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { until } from '@guardian/src-foundations/mq';

import { Score } from '@frontend/web/components/Score';

type Props = {
    homeTeam: TeamType;
    awayTeam: TeamType;
    comments?: string;
};

const Row = ({ children }: { children: React.ReactNode }) => (
    <div
        className={css`
            display: flex;
            flex-direction: row;
        `}
    >
        {children}
    </div>
);

const CrestRow = ({ children }: { children: React.ReactNode }) => (
    <div
        className={css`
            display: flex;
            flex-direction: row;
            align-items: flex-end;
        `}
    >
        {children}
    </div>
);

const StretchBackground = ({ children }: { children: React.ReactNode }) => (
    <div
        className={css`
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            padding: ${space[2]}px;
            background-color: ${brandYellow.main};

            :before {
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                width: 100vw;
                left: -100vw;
                ${until.desktop} {
                    left: calc((100vw - 46rem) / -2);
                }
                background-color: ${brandYellow.main};
                z-index: -1;
            }
        `}
    >
        {children}
    </div>
);

const Column = ({ children }: { children: React.ReactNode }) => (
    <div
        className={css`
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        `}
    >
        {children}
    </div>
);

const TeamName = ({ name }: { name: string }) => (
    <h2
        className={css`
            ${headline.xxsmall({ fontWeight: 'bold' })}
        `}
    >
        {name}
    </h2>
);

const Scorers = ({ scorers }: { scorers: string[] }) => (
    <ul
        className={css`
            margin-top: ${space[1]}px;
            margin-bottom: ${space[3]}px;
        `}
    >
        {scorers.map(player => (
            <li
                className={css`
                    ${textSans.small()}
                `}
            >
                {player}
            </li>
        ))}
    </ul>
);

const Crest = ({ crest }: { crest: string }) => (
    <div
        className={css`
            position: relative;
            width: 3.75rem;
            height: 3.75rem;
            border-radius: 1.875rem;
            background-color: ${background.primary};
            z-index: 1;
        `}
    >
        <img
            className={css`
                position: absolute;
                left: 0.5rem;
                right: 0.5rem;
                bottom: 0.5rem;
                top: 0.5rem;
                max-width: calc(100% - 1rem);
                max-height: calc(100% - 1rem);
                margin: auto;
                display: block;
            `}
            src={crest}
            alt=""
        />
    </div>
);

const TeamNav = ({
    name,
    score,
    crest,
    scorers,
}: {
    name: string;
    score: number;
    crest: string;
    scorers: string[];
}) => (
    <div
        className={css`
            display: flex;
            flex-grow: 1;
        `}
    >
        <Column>
            <div
                className={css`
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                `}
            >
                <TeamName name={name} />
                <Scorers scorers={scorers} />
            </div>
            <CrestRow>
                <Crest crest={crest} />
                <div
                    className={css`
                        margin-left: -${space[2]}px;
                    `}
                >
                    <Score score={score} />
                </div>
            </CrestRow>
        </Column>
    </div>
);

const Comments = ({ comments }: { comments: string }) => (
    <div
        className={css`
            ${textSans.small()}
            margin-top: ${space[2]}px;
            padding-top: ${space[1]}px;
            font-style: italic;
            /* stylelint-disable-next-line color-no-hex */
            border-top: 1px solid #d0bb04;
        `}
    >
        {comments}
    </div>
);

const Border = () => (
    <div
        className={css`
            /* stylelint-disable-next-line color-no-hex */
            border-left: 1px solid #d0bb04;
            margin-left: ${space[1]}px;
            width: ${space[2]}px;
        `}
    />
);

export const MatchNav = ({ homeTeam, awayTeam, comments }: Props) => (
    <StretchBackground>
        <Row>
            <TeamNav
                name={homeTeam.name}
                score={homeTeam.score}
                crest={homeTeam.crest}
                scorers={homeTeam.scorers}
            />
            <Border />
            <TeamNav
                name={awayTeam.name}
                score={awayTeam.score}
                crest={awayTeam.crest}
                scorers={awayTeam.scorers}
            />
        </Row>
        {comments && <Comments comments={comments} />}
    </StretchBackground>
);
