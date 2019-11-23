import React from 'react';
import { css, cx } from 'emotion';

import { headline } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';

import { QuoteIcon } from '@root/src/web/components/QuoteIcon';
import { Kicker } from '@root/src/web/components/Kicker';

const fontStyles = (size: SmallHeadlineSize) => css`
    ${headline[size]()};
`;

const textDecorationUnderline = css`
    text-decoration: underline;
`;

const underlinedStyles = (size: SmallHeadlineSize) => {
    function generateUnderlinedCss(baseSize: number) {
        return css`
            display: inline;
            background-image: linear-gradient(
                to bottom,
                transparent,
                transparent ${baseSize - 1}px,
                rgba(199, 0, 0, 0.5)
            );
            line-height: ${baseSize}px;
            background-size: 1px ${baseSize}px;
            background-origin: content-box;
            background-clip: content-box;
        `;
    }
    switch (size) {
        case 'tiny':
            return generateUnderlinedCss(20);
        case 'xxsmall':
            return generateUnderlinedCss(23);
        case 'xsmall':
            return generateUnderlinedCss(28);
        default:
            return generateUnderlinedCss(23);
    }
};

const colourStyles = (colour: string) => css`
    color: ${colour};
`;

const linkStyles = css`
    position: relative;

    color: inherit;

    text-decoration: none;
    :hover {
        text-decoration: underline;
    }
`;

const visitedStyles = (visitedColour: string) => css`
    :visited {
        color: ${visitedColour};
    }
`;

export const SmallHeadline = ({
    headlineString,
    pillar,
    underlined = false,
    showUnderline = false,
    kicker,
    showQuotes = false,
    size = 'xxsmall',
    coloured = false,
    link,
}: SmallHeadlineType) => {
    // Compose object with attributes that are only relevant when rendering a link tag
    const linkAttrs: { href?: string; tabIndex?: number } = {};

    // Determine whether to render a link tag or a span
    const Headline = link && link.to ? 'a' : 'span';

    // Require a 'to' property set on link for the remaining attributes to be considered
    if (link && link.to) {
        linkAttrs.href = link.to;

        if (link.preventFocus) {
            linkAttrs.tabIndex = -1;
        }
    }

    return (
        <h4 className={fontStyles(size)}>
            {kicker && (
                <Kicker
                    text={kicker.text}
                    pillar={kicker.pillar}
                    showPulsingDot={kicker.showPulsingDot}
                    showSlash={kicker.showSlash}
                />
            )}
            {showQuotes && (
                <QuoteIcon colour={palette[pillar].main} size={size} />
            )}
            <Headline
                className={cx(
                    // Composed styles - order matters for colours
                    link && link.to && linkStyles,
                    underlined && underlinedStyles(size),
                    showUnderline && textDecorationUnderline,
                    coloured && colourStyles(palette[pillar].dark),
                    link &&
                        link.to &&
                        link.visitedColour &&
                        visitedStyles(link.visitedColour),
                )}
                {...linkAttrs}
            >
                {headlineString}
            </Headline>
        </h4>
    );
};
