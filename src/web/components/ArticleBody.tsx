import React from 'react';
import { css, cx } from 'emotion';

import { text, neutral, border } from '@guardian/src-foundations/palette';
import { textSans, headline } from '@guardian/src-foundations/typography';
import { from, between } from '@guardian/src-foundations/mq';
import { pillarMap, pillarPalette } from '@root/src/lib/pillars';
import { ArticleRenderer } from '@root/src/web/lib/ArticleRenderer';

type Props = {
    pillar: Pillar;
    isImmersive: boolean;
    blocks: Block[];
    designType: DesignType;
    adTargeting: AdTargeting;
};

const pillarColours = pillarMap(
    pillar =>
        css`
            color: ${pillar === 'opinion' || pillar === 'culture'
                ? pillarPalette[pillar].dark
                : pillarPalette[pillar].main};
        `,
);

// TODO refactor  to use in Caption.tsx
// const pillarFigCaptionIconColor = pillarMap(
//     pillar =>
//         css`
//             figcaption {
//                 &::before {
//                     border-color: transparent transparent
//                         ${pillarPalette[pillar].main} transparent;
//                 }
//             }
//         `,
// );

const captionFont = css`
    ${textSans.xsmall()};
    color: ${text.supporting};
`;

const bodyStyle = css`
    ${between.tablet.and.desktop} {
        padding-right: 80px;
    }

    h2 {
        ${headline.xxsmall({ fontWeight: 'bold' })};
    }

    strong {
        font-weight: bold;
    }

    img {
        width: 100%;
        height: auto;
    }

    figcaption {
        ${captionFont};
    }

    figure {
        margin-top: 16px;
        margin-bottom: 12px;
    }

    ul {
        margin-bottom: 12px;
    }

    ${from.tablet} {
        ul {
            margin-bottom: 16px;
        }
    }

    li {
        ${textSans.medium()};
        margin-bottom: 6px;
        padding-left: 20px;

        p {
            display: inline;
        }
    }

    li:before {
        display: inline-block;
        content: '';
        border-radius: 6px;
        height: 12px;
        width: 12px;
        margin-right: 8px;
        background-color: ${neutral[86]};
        margin-left: -20px;
    }
`;

const immersiveBodyStyle = css`
    h2 {
        ${headline.medium()};
        font-weight: 200;
    }
`;

const linkColour = pillarMap(
    pillar => css`
        a {
            text-decoration: none;
            border-bottom: 1px solid ${border.secondary};
            ${pillarColours[pillar]};

            :hover {
                border-bottom: 1px solid ${pillarPalette[pillar].main};
            }
        }
    `,
);

export const ArticleBody = ({
    pillar,
    isImmersive,
    blocks,
    designType,
    adTargeting,
}: Props) => {
    return (
        <div
            className={cx(bodyStyle, linkColour[pillar], {
                [immersiveBodyStyle]: isImmersive,
            })}
        >
            <ArticleRenderer
                elements={blocks[0] ? blocks[0].elements : []}
                pillar={pillar}
                designType={designType}
                adTargeting={adTargeting}
            />
        </div>
    );
};
