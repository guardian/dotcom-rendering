import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { until } from '@guardian/src-foundations/mq';
import { BigNumber } from '@root/src/web/components/BigNumber/BigNumber';
import { PulsingDot } from '@root/src/web/components/PulsingDot';
import { QuoteIcon } from '@root/src/web/components/QuoteIcon';
import { AgeWarning } from '@root/src/web/components/AgeWarning';

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

const ageWarningStyles = css`
    padding-left: 4.6875rem;
    margin-top: -16px;
    margin-bottom: 16px;
`;

type Props = {
    trail: TrailType;
    position: number;
};

export const MostViewedGridItem = ({ trail, position }: Props) => {
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
                </a>
            </h2>
            {trail.ageWarning && (
                <div className={ageWarningStyles}>
                    <AgeWarning age={trail.ageWarning} size="small" />
                </div>
            )}
        </li>
    );
};
