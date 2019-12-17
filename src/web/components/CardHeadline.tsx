import React from 'react';
import { css, cx } from 'emotion';

import { headline } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';
import { until } from '@guardian/src-foundations/mq';

import { QuoteIcon } from '@root/src/web/components/QuoteIcon';
import { Kicker } from '@root/src/web/components/Kicker';
import { Byline } from '@root/src/web/components/Byline';

const fontStyles = (size: SmallHeadlineSize) => {
    switch (size) {
        case 'large':
            return css`
                ${headline.xsmall()};
                ${until.desktop} {
                    ${headline.xxsmall()};
                }
            `;
        case 'medium':
            return css`
                ${headline.xxsmall()};
                ${until.desktop} {
                    ${headline.xxxsmall()};
                }
            `;
        case 'small':
            return css`
                ${headline.xxxsmall()};
            `;
        case 'tiny':
            return css`
                ${headline.xxxsmall()};
                font-size: 14px;
            `;
    }
};

const underlinedStyles = (size: SmallHeadlineSize) => {
    function generateUnderlinedCss(baseSize: number) {
        return css`
            background-image: linear-gradient(
                to bottom,
                transparent,
                transparent ${baseSize - 1}px,
                rgba(199, 0, 0, 0.5)
            );
            line-height: ${baseSize - 1}px;
            background-size: 1px ${baseSize}px;
            background-origin: content-box;
            background-clip: content-box;
            margin-right: -5px;
        `;
    }
    switch (size) {
        case 'small':
            return generateUnderlinedCss(21);
        case 'medium':
            return generateUnderlinedCss(24);
        case 'large':
            return generateUnderlinedCss(28);
        default:
            return generateUnderlinedCss(23);
    }
};

const colourStyles = (colour: string) => css`
    color: ${colour};
`;

const headlineStyles = (
    designType: DesignType,
    pillar: Pillar,
    size: SmallHeadlineSize,
) => {
    switch (designType) {
        case 'Feature':
        case 'Interview':
            return colourStyles(palette[pillar].dark);
        case 'Media':
            return colourStyles(palette.neutral[97]);
        case 'Analysis':
        case 'Article':
        case 'Review':
        case 'Live':
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
            return;
    }
};

export const CardHeadline = ({
    headlineText,
    designType = 'Article',
    pillar,
    showQuotes,
    kickerText,
    showPulsingDot,
    showSlash,
    size = 'medium',
    byline,
}: CardHeadlineType) => (
    <>
        <h4
            className={cx(
                fontStyles(size),
                designType === 'Analysis' && underlinedStyles(size),
            )}
        >
            {kickerText && (
                <Kicker
                    text={kickerText}
                    pillar={pillar}
                    showPulsingDot={showPulsingDot}
                    showSlash={showSlash}
                />
            )}
            {showQuotes && (
                <QuoteIcon colour={palette[pillar].main} size={size} />
            )}

            <span className={headlineStyles(designType, pillar, size)}>
                {headlineText}
            </span>
        </h4>
        {byline && (
            <Byline
                text={byline}
                designType={designType}
                pillar={pillar}
                size={size}
            />
        )}
    </>
);
