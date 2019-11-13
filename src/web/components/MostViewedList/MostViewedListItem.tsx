import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { PulsingDot } from '@root/src/web/components/PulsingDot';
import { QuoteIcon } from '@root/src/web/components/QuoteIcon';
import { AgeWarning } from '@root/src/web/components/AgeWarning';

import { TrailType } from './MostViewedList';

const listItemStyles = css`
    list-style: none;
    padding-top: 4px;
    margin-bottom: 12px;
    border-top: 1px solid ${palette.neutral[86]};

    &:first-child {
        padding-top: 0;
        border-top: none;
    }
`;

const linkTagStyles = css`
    text-decoration: none;
    font-weight: 500;
    ${headline.tiny()};

    &:link,
    &:active {
        color: ${palette.neutral[7]};
    }

    &:hover .linkText {
        text-decoration: underline;
    }

    &:visited .linkText {
        color: ${palette.neutral[46]};
    }
`;

const textWrapperStyles = css`
    display: flex;
`;

const imageWrapperStyles = css`
    width: 72px;
    min-height: 72px;
    padding-top: 3px;
    margin-right: 10px;
    overflow: hidden;
    position: relative;
    box-sizing: content-box;
    flex-grow: 0;
    flex-shrink: 0;
`;

const imageTagStyles = css`
    position: absolute;
    width: auto;
    height: 72px;
    left: -24px;
    clip-path: circle(36% at 50% 50%);
`;

const ageWarningStyles = css`
    margin-top: 8px;
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

type Props = {
    trail: TrailType;
    position: number;
};

export const MostViewedListItem = ({ trail, position }: Props) => (
    <li className={listItemStyles}>
        <a
            className={linkTagStyles}
            href={trail.url}
            data-link-name={'article'}
        >
            <div className={textWrapperStyles}>
                <div className={imageWrapperStyles}>
                    <img src={trail.image} alt="" className={imageTagStyles} />
                </div>
                <h4>
                    {trail.isLiveBlog && (
                        <span className={liveKicker(getColour(trail.pillar))}>
                            <PulsingDot colour={getColour(trail.pillar)} />
                            Live
                        </span>
                    )}
                    {trail.pillar === 'opinion' && (
                        <QuoteIcon colour={getColour(trail.pillar)} />
                    )}
                    <span className="linkText">{trail.linkText}</span>
                </h4>
            </div>
            {trail.ageWarning && (
                <div className={ageWarningStyles}>
                    <AgeWarning age={trail.ageWarning} size="small" />
                </div>
            )}
        </a>
    </li>
);
