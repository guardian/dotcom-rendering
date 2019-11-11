import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { textSans, headline } from '@guardian/src-foundations/typography';
import { until } from '@guardian/src-foundations/mq';
import { BigNumber } from '@root/src/web/components/BigNumber/BigNumber';
import { PulsingDot } from '@root/src/web/components/PulsingDot';
import { QuoteIcon } from '@root/src/web/components/QuoteIcon';
import ClockIcon from '@frontend/static/icons/clock.svg';

import { TrailType } from './MostViewed';

const gridItem = (position: number) => css`
    position: relative;

    ${until.leftCol} {
        /* Below leftCol always set top border */
        border-top: 1px solid ${palette.neutral[86]};
    }
    /* Above leftCol, don't apply a top border on the 1st and 6th
       items to prevent double borders */
    border-top: ${position !== 1 &&
        position !== 6 &&
        `1px solid ${palette.neutral[86]}`};

    /* The left border is set on the container */
    border-right: 1px solid ${palette.neutral[86]};
    min-height: 3.25rem;

    &:hover {
        cursor: pointer;
    }

    &:hover,
    :focus {
        background: ${palette.neutral[97]};
    }
`;

const bigNumber = css`
    position: absolute;
    top: 0.375rem;
    left: 0.625rem;
    fill: ${palette.neutral[7]};
`;

const headlineHeader = css`
    padding: 0.1875rem 0.625rem 1.125rem 4.6875rem;
    word-wrap: break-word;
    overflow: hidden;
`;

const headlineLink = css`
    text-decoration: none;
    color: ${palette.neutral[7]};
    font-weight: 500;
    ${headline.tiny()};
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
    return palette[pillar].main;
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
    ${textSans.xsmall()}
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
        <li
            className={gridItem(position)}
            data-link-name={`${position} | text`}
        >
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
