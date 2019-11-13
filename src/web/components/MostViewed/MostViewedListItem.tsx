import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { PulsingDot } from '@root/src/web/components/PulsingDot';
import { QuoteIcon } from '@root/src/web/components/QuoteIcon';

import { TrailType } from './MostViewed';

const listItemStyles = css`
    display: flex;
    list-style: none;
    padding-top: 4px;
    margin-bottom: 12px;
    border-top: 1px solid ${palette.neutral[86]};
    &:first-child {
        padding-top: 0;
        border-top: none;
    }
`;

const imageWrapperStyles = css`
    width: 72px;
    min-height: 75px;
    padding-top: 3px;
    margin-right: 10px;
    overflow: hidden;
    position: relative;
    flex-grow: 0;
    flex-shrink: 0;
`;

const imageStyles = css`
    border-radius: 50%;
    position: absolute;
    width: auto;
    height: 4.5rem;
    left: -1.5rem;
    clip-path: circle(36% at 50% 50%);
`;

const linkWrapperStyles = css``;

const articleHeadingStyles = css`
    word-wrap: break-word;
    overflow: hidden;
`;

const articleLinkStyles = css`
    text-decoration: none;
    color: ${palette.neutral[7]};
    font-weight: 500;
    ${headline.tiny()};

    &:hover {
        text-decoration: underline;
    }
`;

// const bylineStyles = css`
//     color: ${getColour()}
// `;

const getBylineStyles = (pillar: Pillar): string => css`
    display: block;
    color: ${getColour(pillar)};
`;

const liveKicker = (colour: string) => css`
    color: ${colour};
    font-weight: 700;

    $:hover {
        text-decoration: none;
    }

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

export const MostViewedListItem = ({ trail, position }: Props) => {
    console.log('=== TRAIL: ');
    console.log(trail);
    return (
        <li className={listItemStyles}>
            <div className={imageWrapperStyles}>
                <img src={trail.image} alt="" className={imageStyles} />
            </div>
            <div className={linkWrapperStyles}>
                <h4 className={articleHeadingStyles}>
                    <a
                        className={articleLinkStyles}
                        href={trail.url}
                        data-link-name={'article'}
                    >
                        {trail.isLiveBlog && (
                            <span
                                className={liveKicker(getColour(trail.pillar))}
                            >
                                <PulsingDot colour={getColour(trail.pillar)} />
                                Live
                            </span>
                        )}
                        {trail.pillar === 'opinion' && (
                            <QuoteIcon colour={getColour(trail.pillar)} />
                        )}
                        {trail.linkText}
                        {trail.showByline && (
                            <span className={getBylineStyles(trail.pillar)}>
                                {trail.byline}
                            </span>
                        )}
                    </a>
                </h4>
            </div>
        </li>
    );
};
