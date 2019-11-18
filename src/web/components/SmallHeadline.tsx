import React from 'react';
import { css, cx } from 'emotion';

import { headline } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';

import { PulsingDot } from '@root/src/web/components/PulsingDot';
import { QuoteIcon } from '@root/src/web/components/QuoteIcon';

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

const kickerStyles = (colour: string) => css`
    color: ${colour};
    font-weight: 700;
    margin-right: 4px;
`;

const slashStyles = css`
    &::after {
        content: '/';
        display: inline-block;
        margin-left: 4px;
    }
`;

const linkStyles = css`
    position: relative;

    color: inherit;

    text-decoration: none;
    :hover {
        text-decoration: underline;
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
    linkTo,
}: SmallHeadlineType) => {
    const Headline = linkTo ? 'a' : 'span';
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
                href={linkTo}
                className={cx(
                    // Composed styles - order matters for colours
                    linkTo && linkStyles,
                    underlined && underlinedStyles(size),
                    showUnderline && textDecorationUnderline,
                    coloured && colourStyles(palette[pillar].dark),
                )}
            >
                {headlineString}
            </Headline>
        </h4>
    );
};

const Kicker = ({
    text,
    pillar = 'news',
    showPulsingDot,
    showSlash = true,
}: KickerType) => {
    const kickerColour = palette[pillar].main;
    return (
        <span className={kickerStyles(kickerColour)}>
            {showPulsingDot && <PulsingDot colour={kickerColour} />}
            <span className={cx(showSlash && slashStyles)}>{text}</span>
        </span>
    );
};
