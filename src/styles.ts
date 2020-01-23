import { palette } from '@guardian/src-foundations';
import { from, until } from '@guardian/src-foundations/mq';
import { css, SerializedStyles } from '@emotion/core'
import { Option } from 'types/option';

const BASE_PADDING = 8;

export const baseMultiply = (value: number): number => value * BASE_PADDING;

export const basePx = (...values: Array<number>): string => values.map(baseMultiply).join("px ") + "px";

export const headlineFontStyles = css`
    font-size: 2.8rem;
    line-height: 3.2rem;
    margin: 0;
`;

export const sidePadding = css`
    padding-left: ${basePx(1)};
    padding-right: ${basePx(1)};

    ${from.wide} {
        padding-left: 0;
        padding-right: 0;
    }`;

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

export const linkStyle = (kicker: string): string => `
    a {
        color: ${kicker};
        text-decoration: none;
        padding-bottom: 0.15em;
        background-image: linear-gradient(${kicker} 0%, ${kicker} 100%);
        background-repeat: repeat-x;
        background-size: 1px 1px;
        background-position: 0 bottom;
    }
`

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

        ${darkModeCss`
            color: ${palette.neutral[86]};
            background: black;
        `}

        clear: both;

        .ad-labels {
            ${textSans}
            padding: ${basePx(1)};
            float: left;
            width: calc(100% - ${basePx(2)});

            h1 {
                margin: 0;
                float: left;
                font-size: 16px;
                font-weight: 400;
            }

            .ad-hide {
                float: right;
                background: none;
                border: none;
                font-size: 16px;
                color: ${palette.neutral[20]};
                position: relative;
                margin: 0;

                span {
                    position: absolute;
                    right: 20px;
                    top: 3px;
                }

                &::after {
                    padding-left: ${basePx(1)};
                    ${icons}
                    content: "\\e04F";
                    font-size: 16px;
                    position: absolute;
                    right: 0px;
                    top: 1px;
                }

                &:focus {
                    text-decoration: underline;
                }

                ${darkModeCss`color: ${palette.neutral[86]};`}
            }
        }

        .ad-slot {
            clear: both;
            padding-bottom: ${adHeight};
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

export const fontFace = (
    family: string,
    weight: Option<number | string>,
    style: Option<string>,
    url: string
): SerializedStyles => css`
  @font-face {
    font-family: ${family};
    ${style.fmap((s: string) => `font-style: ${s};`).withDefault('')}
    ${weight.fmap((w: number | string) => `font-weight: ${w};`).withDefault('')}
    src: url('${url}');
  }
`;
