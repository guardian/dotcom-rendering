import { palette } from '@guardian/src-foundations';
import { css, SerializedStyles } from '@emotion/core'

const BASE_PADDING = 8;

const baseMultiply = (value: number): number => value * BASE_PADDING;

export const basePx = (...values: Array<number>): string => values.map(baseMultiply).join("px ") + "px";

export const sidePadding = {
    paddingLeft: basePx(1),
    paddingRight: basePx(1)
}

export type PillarId = 'pillar/news'|'pillar/opinion'|'pillar/sport'|'pillar/arts'|'pillar/lifestyle';

export interface PillarStyles {
    kicker: string;
    featureHeadline: string;
    soft: string;
    inverted: string;
    liveblogBackground: string;
}

interface PillarColours {
    [pillar: string]: PillarStyles;
}

export const pillarColours: PillarColours = {
    news: {
        kicker: palette.news.main,
        featureHeadline: palette.news.dark,
        soft: palette.neutral[97],
        inverted: palette.news.bright,
        liveblogBackground: palette.news.dark
    },
    opinion: {
        kicker: palette.opinion.main,
        featureHeadline: palette.opinion.dark,
        soft: palette.opinion.faded,
        inverted: palette.opinion.bright,
        liveblogBackground: palette.opinion.dark
    },
    sport: {
        kicker: palette.sport.main,
        featureHeadline: palette.sport.dark,
        soft: palette.sport.faded,
        inverted: palette.sport.bright,
        liveblogBackground: palette.sport.dark
    },
    arts: {
        kicker: palette.culture.main,
        featureHeadline: palette.culture.dark,
        soft: palette.culture.faded,
        inverted: palette.culture.bright,
        liveblogBackground: palette.culture.dark
    },
    lifestyle: {
        kicker: palette.lifestyle.main,
        featureHeadline: palette.lifestyle.dark,
        soft: palette.lifestyle.faded,
        inverted: palette.lifestyle.bright,
        liveblogBackground: palette.lifestyle.dark
    }
}

export function getPillarStyles(pillarId: PillarId): PillarStyles {
    const pillar = pillarId.replace('pillar/', '');
    return pillarColours[pillar];
}

export const bulletStyles = (kicker: string, opacity = 1): string =>  `
    .bullet {
        color: transparent;

        &::before {
            content: '';
            background-color: ${kicker};
            width: 1rem;
            height: 1rem;
            border-radius: .5rem;
            display: inline-block;
        }
    }

    ul {
        list-style: none;
        padding-left: 0;

        > li {
            padding-left: 2rem;
            line-height: 2.2rem;

            &::before {
                display: inline-block;
                content: '';
                border-radius: 0.5rem;
                height: 1rem;
                width: 1rem;
                margin-right: 1rem;
                background-color: ${palette.neutral[86]};
                margin-left: -2rem;
                opacity: ${opacity}
            }

            > p:first-of-type {
                display: inline;
            }
        }
    }`

export const textSans = "font-family: 'Guardian Text Sans Web';";

export const headlineFont = "font-family: 'Guardian Headline';";

export const icons = "font-family: 'Guardian Icons';";

export const darkModeCss = (
    styles: TemplateStringsArray,
    ...placeholders: string[]
): SerializedStyles =>
    css`
        @media (prefers-color-scheme: dark) {
            ${styles.map((style, index) => `${style}${placeholders[index]}`)
                .filter(Boolean)
                .join('')}
        }
    `

// Styles shared across article types
export const commonArticleStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    a {
        color: ${kicker};
    }

    .image img {
        width: calc(100% + 16px);
        margin: 0 -8px;
    }

    blockquote {
        font-weight: 200;
        font-size: 2.2rem;
        line-height: 1.3;
        color: ${kicker};
        ${headlineFont}
        margin: 0;

        p {
            margin: 1em 0;

            &::before {
                ${icons}
                font-size: 2.2rem;
                content: '\\e11c';
                display: inline-block;
                margin-right: 8px;
            }
        }

        footer {
            font-size: 1.8rem;
            margin-top: 4px;

            cite {
                font-style: normal;
            }
        }
    }

    figcaption {
        font-size: 1.4rem;
        line-height: 1.8rem;
        color: ${palette.neutral[46]};
        ${textSans}
    }

    .rich-link,
    .element-membership {
        background: ${palette.neutral[97]};
        padding: 8px;

        h1 {
            margin: 0;
        }

        p {
            margin: 8px 0;
        }

        span {
            display: none;
        }

        a {
            text-decoration: none;
        }
    }

    h2 {
        font-size: 1.8rem;
        line-height: 2.2rem;
        margin: 8px 0;
        font-weight: 500;

        & + p {
            margin-top: 0;
        }
    }

    .element-video {
        iframe {
            width: 100%
        }
    }

    p {
        hyphens: auto;
        overflow-wrap: break-word;
    }

    ${bulletStyles(kicker)}
    ${sidePadding}
`;