import React from 'react';
import { css, cx } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { between } from '@guardian/src-foundations/mq';

import CommentIcon from '@frontend/static/icons/comment.svg';
import { decidePillarLight } from '@frontend/web/components/lib/decidePillarLight';

type Props = {
    designType: DesignType;
    pillar: Pillar;
    short: string;
    long: string;
};

const containerStyles = css`
    display: flex;
    flex-direction: row;
    ${textSans.xsmall()};
    padding-left: 5px;
    padding-right: 5px;
`;

const svgStyles = css`
    svg {
        margin-bottom: -5px;
        height: 14px;
        width: 14px;
        margin-right: 2px;
    }
`;

const longStyles = css`
    display: block;

    ${between.leftCol.and.wide} {
        display: none;
    }
`;

const shortStyles = css`
    display: none;

    ${between.leftCol.and.wide} {
        display: block;
    }
`;

const mediaStyles = (pillar: Pillar) => css`
    /* Below we force the colour to be bright if the pillar is news (because it looks better) */
    color: ${pillar === 'news' ? palette[pillar].bright : palette[pillar].main};

    svg {
        fill: ${pillar === 'news'
            ? palette[pillar].bright
            : palette[pillar].main};
    }
`;

const colourStyles = (designType: DesignType, pillar: Pillar) => {
    switch (designType) {
        case 'Live':
            return css`
                color: ${decidePillarLight(pillar)};
                svg {
                    fill: ${decidePillarLight(pillar)};
                }
            `;
        case 'Feature':
        case 'Interview':
        case 'Media':
        case 'Analysis':
        case 'Article':
        case 'Review':
        case 'SpecialReport':
        case 'Recipe':
        case 'MatchReport':
        case 'GuardianView':
        case 'GuardianLabs':
        case 'Quiz':
        case 'AdvertisementFeature':
        case 'Comment':
        case 'Immersive':
        default:
            return css`
                color: ${palette.neutral[60]};
                svg {
                    fill: ${palette.neutral[60]};
                }
            `;
    }
};

export const CardCommentCount = ({
    designType,
    pillar,
    short,
    long,
}: Props) => {
    return (
        <div
            className={cx(
                containerStyles,
                designType === 'Media'
                    ? mediaStyles(pillar)
                    : colourStyles(designType, pillar),
            )}
            aria-label={`${short} Comments`}
        >
            <div className={svgStyles}>
                <CommentIcon />
            </div>
            <div className={longStyles} aria-hidden="true">
                {long}
            </div>
            <div className={shortStyles} aria-hidden="true">
                {short}
            </div>
        </div>
    );
};
