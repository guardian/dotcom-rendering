import { palette } from '@guardian/src-foundations';
import { from, until, between } from '@guardian/src-foundations/mq';
import { css, SerializedStyles } from '@emotion/core'
import { PillarStyles } from 'types/Pillar';

const BASE_PADDING = 8;

export const baseMultiply = (value: number): number => value * BASE_PADDING;

export const basePx = (...values: Array<number>): string => values.map(baseMultiply).join("px ") + "px";

export const sidePadding = css`
    padding-left: ${basePx(1)};
    padding-right: ${basePx(1)};

    ${from.wide} {
        padding-left: 0;
        padding-right: 0;
    }`;

export const bulletStyles = (kicker: string, opacity = 1): string => `
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
): SerializedStyles => css`
    @media (prefers-color-scheme: dark) {
        ${styles
        .map((style, i) => `${style}${placeholders[i] ? placeholders[i] : ''}`)
        .join('')
    }
    }
`;

// Styles shared across article types
export const commonArticleStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    a {
        color: ${kicker};
    }

    .image img {
        width: 100%; 
    }

    .image {
        ${between.phablet.and.wide} {
            padding-left: ${basePx(1)};
            padding-right: ${basePx(1)};
        }
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

        ${until.phablet} {
            padding-left: ${basePx(1)};
            padding-right: ${basePx(1)};
        }
    }

    .rich-link,
    .element-membership {
        background: ${palette.neutral[97]};
        padding: ${basePx(1)};

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
        overflow-wrap: break-word;
    }

    ${until.wide} {
        .twitter-tweet {
            clear: both;
        }
    }

    ${bulletStyles(kicker)}
`;

export const wideContentWidth = 620;
export const wideColumnWidth = 220;

export const articleWidthStyles = css`
    ${from.wide} {
        margin: 0 auto;
    }

    ${from.phablet} {
        width: ${wideContentWidth}px;
    }
`;

const adHeight = '250px';

export const adStyles = css`
    .ad-placeholder {
        color: ${palette.neutral[20]};
        background: ${palette.neutral[97]};
        clear: both;

        .ad-labels {
            ${textSans}
            padding: ${basePx(1)};
            padding-bottom: ${adHeight};

            h1 {
                margin: 0;
                float: left;
            }

            .ad-hide {
                float: right;
                background: none;
                border: none;
                font-size: 16px;
                color: ${palette.neutral[20]};
                margin-top: -4px;

                &::after {
                    padding-left: ${basePx(1)};
                    ${icons}
                    content: "\\e04F";
                    font-size: 16px;
                }

                &:focus {
                    text-decoration: underline;
                }
            }
        }

        ${until.phablet} {
            margin: 1em ${basePx(-1)};
        }

        ${from.desktop} {
            position: absolute;
            margin-left: calc(${wideContentWidth}px + ${basePx(2)});
            min-width: 300px;
        }
    }

    .ad-placeholder.short:nth-of-type(1) {
        ${from.desktop} {
        top: 0;
        }
    }

    .ad-placeholder.short:nth-of-type(2) {
        ${from.desktop} {
        top: 300px;
        }
    }
`
