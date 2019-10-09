import React from 'react';
import { css } from 'emotion';

import {
    desktop,
    tablet,
    textSans,
    headline,
    palette,
} from '@guardian/src-foundations';
import { BigNumber } from '@guardian/guui';
import { PulsingDot } from '@frontend/web/components/PulsingDot';
import { QuoteIcon } from '@frontend/web/components/QuoteIcon';
import ClockIcon from '@guardian/pasteup/icons/clock.svg';
import { pillarPalette } from '@frontend/lib/pillars';

import { TrailType } from './MostViewed';

const listItem = css`
    position: relative;
    box-sizing: border-box;
    padding-top: 4px;
    padding-bottom: 24px;

    &:before {
        position: absolute;
        top: 0;
        right: 10px;
        left: 0;
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: ${palette.neutral[86]};
    }

    :first-of-type {
        &:before {
            display: none;
        }
    }

    &:after {
        content: '';
        display: block;
        clear: both;
    }

    ${tablet} {
        padding-top: 3px;
        padding-bottom: 0;
        min-height: 72px;
    }

    ${desktop} {
        height: 100%;
        display: inline-block;
        width: 100%;

        :nth-of-type(6) {
            &:before {
                display: none;
            }
        }
    }
`;

const bigNumber = css`
    float: left;
    margin-top: 3px;
    fill: ${palette.neutral[7]};
`;

const headlineHeader = css`
    margin-top: -4px;
    margin-left: 70px;
    padding-top: 2px;
    padding-bottom: 2px;
    word-wrap: break-word;
    overflow: hidden;
`;

const headlineLink = css`
    text-decoration: none;
    color: ${palette.neutral[7]};
    font-weight: 500;
    ${headline({ level: 1 })};
`;

const liveKicker = (colour: string) => css`
    color: ${colour};
    font-weight: 700;

    &::after {
        content: '/';
        display: inline-block;
        font-weight: 900;
        margin: 0 4px;
    }
`;

function getColour(pillar: Pillar) {
    return pillarPalette[pillar].main;
}

const AgeWarning: React.FC<{
    ageWarning?: string;
}> = ({ ageWarning }) => {
    if (!ageWarning) {
        return <></>;
    }
    return (
        <div>
            <div className={oldArticleMessage}>
                <span className={oldClockWrapper}>
                    <ClockIcon />
                </span>
                This article is more than{' '}
                <span className="embolden">{ageWarning} old</span>
            </div>
        </div>
    );
};

const oldArticleMessage = css`
    ${textSans({ level: 1 })}
    background: ${palette.yellow.main};
    display: inline-block;
    color: ${palette.neutral[7]};
    margin: 4px 0 6px;
    padding: 3px 5px;

    svg {
        fill: currentColor;
    }

    .embolden {
        font-weight: bold;
    }
`;

const oldClockWrapper = css`
    margin-right: 3px;
`;

type Props = {
    trail: TrailType;
    position: number;
};

export const MostViewedItem = ({ trail, position }: Props) => {
    return (
        <li className={listItem} data-link-name={`${position} | text`}>
            <span className={bigNumber}>
                <BigNumber index={position} />
            </span>
            <h2 className={headlineHeader}>
                <a
                    className={headlineLink}
                    href={trail.url}
                    data-link-name={'article'}
                >
                    {trail.isLiveBlog && (
                        <span className={liveKicker(getColour(trail.pillar))}>
                            <PulsingDot colour={getColour(trail.pillar)} />
                            Live
                        </span>
                    )}
                    {trail.pillar === 'opinion' && (
                        <QuoteIcon colour={getColour(trail.pillar)} />
                    )}
                    {trail.linkText}
                    <AgeWarning ageWarning={trail.ageWarning} />
                </a>
            </h2>
        </li>
    );
};
