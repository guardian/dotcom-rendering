import React from 'react';
import { css, cx } from 'emotion';

import { headline } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';

import { QuoteIcon } from '@root/src/web/components/QuoteIcon';
import { Kicker } from '@root/src/web/components/Kicker';

const fontStyles = (size: SmallHeadlineSize) => css`
    ${headline[size]()};
`;

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
        case 'xxxsmall':
            return generateUnderlinedCss(21);
        case 'xxsmall':
            return generateUnderlinedCss(24);
        case 'xsmall':
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
        case 'Analysis':
        case 'Article':
        case 'Media':
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
    designType,
    pillar,
    showQuotes,
    kicker,
    size = 'xxsmall',
}: CardHeadlineType) => (
    <h4
        className={cx(
            fontStyles(size),
            designType === 'Analysis' && underlinedStyles(size),
        )}
    >
        {kicker && (
            <Kicker
                text={kicker.text}
                pillar={pillar}
                showPulsingDot={kicker.showPulsingDot}
                showSlash={kicker.showSlash}
            />
        )}
        {showQuotes && <QuoteIcon colour={palette[pillar].main} size={size} />}

        <span className={headlineStyles(designType, pillar, size)}>
            {headlineText}
        </span>
    </h4>
);
