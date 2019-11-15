import React from 'react';
import { css, cx } from 'emotion';

import { headline } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';

import { PulsingDot } from '@root/src/web/components/PulsingDot';
import { QuoteIcon } from '@root/src/web/components/QuoteIcon';

const fontStyles = (size: HeadlineLinkSize) => css`
    ${headline[size]()};
`;

const textDecorationUnderline = css`
    text-decoration: underline;
`;

const underlinedStyles = (size: HeadlineLinkSize) => {
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

const visitedStyles = (colour: string) => css`
    :visited {
        color: ${colour};
    }
`;

const prefixStyles = (colour: string) => css`
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

const linkStyles = (expanded: boolean = false) => css`
    color: inherit;

    text-decoration: none;
    :hover {
        text-decoration: underline;
    }

    ${!expanded &&
        css`
            position: relative;
        `}

    ${expanded &&
        css`
            ::before {
                content: ' ';
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                z-index: 2;
            }
        `}
`;

type HeadlineLinkSize = 'tiny' | 'xxsmall' | 'xsmall';

type HeadlineLink = {
    to: string; // the href for the anchor tag
    visitedColour?: string; // a custom colour for the :visited state
    expanded?: boolean; // if true, renders an absolutely positioned pseudo selector, enabling the anchor tag to cover the boundaries of the closest ancestor with position: relative
};

type Props = {
    headlineString: string; // The text shown
    pillar: Pillar; // Used to colour the headline (dark) and the prefix (main)
    underlined?: boolean; // Some headlines have an underlined style
    showUnderline?: boolean; // Some headlines have text-decoration underlined when hovered
    prefix?: HeadlinePrefix;
    showQuotes?: boolean; // When true the QuoteIcon is shown
    size?: HeadlineLinkSize;
    coloured?: boolean; // When coloured, the headline takes the dark pillar colour
    link?: HeadlineLink; // An optional link object tells the component to render the headline using an anchor tag
};

export const SmallHeadline = ({
    headlineString,
    pillar,
    underlined = false,
    showUnderline = false,
    prefix,
    showQuotes = false,
    size = 'xxsmall',
    coloured = false,
    link,
}: Props) => {
    const Headline = link && link.to ? 'a' : 'span';

    return (
        <h4 className={fontStyles(size)}>
            {prefix && (
                <Prefix
                    text={prefix.text}
                    pillar={prefix.pillar}
                    showPulsingDot={prefix.showPulsingDot}
                    showSlash={prefix.showSlash}
                />
            )}
            {showQuotes && (
                <QuoteIcon colour={palette[pillar].main} size={size} />
            )}
            <Headline
                href={link && link.to ? link.to : undefined}
                className={cx(
                    // Composed styles - order matters for colours
                    link && link.to && linkStyles(link && link.expanded),
                    underlined && underlinedStyles(size),
                    showUnderline && textDecorationUnderline,
                    coloured && colourStyles(palette[pillar].dark),
                    link &&
                        link.to &&
                        link.visitedColour &&
                        visitedStyles(link.visitedColour),
                )}
            >
                {headlineString}
            </Headline>
        </h4>
    );
};

const Prefix = ({
    text,
    pillar = 'news',
    showPulsingDot,
    showSlash = true,
}: HeadlinePrefix) => {
    const prefixColour = palette[pillar].main;
    return (
        <span className={prefixStyles(prefixColour)}>
            {showPulsingDot && <PulsingDot colour={prefixColour} />}
            <span className={cx(showSlash && slashStyles)}>{text}</span>
        </span>
    );
};
