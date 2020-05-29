import { neutral } from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import { remSpace } from '@guardian/src-foundations';
import { css, SerializedStyles } from '@emotion/core'
import { Option, Some, None } from 'types/option';
import { textSans } from '@guardian/src-foundations/typography';

const BASE_PADDING = 8;

export const baseMultiply = (value: number): number => value * BASE_PADDING;

export const basePx = (...values: Array<number>): string => values.map(baseMultiply).join("px ") + "px";


export const sidePadding = css`
    padding-left: ${remSpace[2]};
    padding-right: ${remSpace[2]};

    ${from.wide} {
        padding-left: 0;
        padding-right: 0;
    }`;

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
    ${sidePadding}
    ${from.wide} {
        margin: 0 auto;
    }

    ${from.phablet} {
        width: ${wideContentWidth}px;
    }
`;

const adHeight = '258px';

export const adStyles = css`
    .ad-placeholder {
        &.hidden {
            display: none;
        }

        color: ${neutral[20]};
        background: ${neutral[97]};

        ${darkModeCss`
            color: ${neutral[60]};
            background-color: ${neutral[20]};
        `}

        clear: both;

        .ad-labels {
            ${textSans.xsmall()}
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
                color: ${neutral[20]};
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

                ${darkModeCss`
                    color: ${neutral[60]};
                `}
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
            margin-bottom: ${remSpace[6]}
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
): string => `
  @font-face {
    font-family: ${family};
    ${style.fmap((s: string) => `font-style: ${s};`).withDefault('')}
    ${weight.fmap((w: number | string) => `font-weight: ${w};`).withDefault('')}
    src: url('${url}');
  }
`;

export const pageFonts = `
    ${fontFace("Guardian Text Egyptian Web", new Some(400), new None, "/assets/fonts/GuardianTextEgyptian-Reg.ttf")}
    ${fontFace("Guardian Text Egyptian Web", new Some(400), new Some("italic"), "/assets/fonts/GuardianTextEgyptian-RegItalic.ttf")}
    ${fontFace("Guardian Text Egyptian Web", new Some(700), new None, "/assets/fonts/GuardianTextEgyptian-Bold.ttf")}
    ${fontFace("Guardian Text Egyptian Web", new Some(700), new Some("italic"), "/assets/fonts/GuardianTextEgyptian-BoldItalic.ttf")}
    ${fontFace("Guardian Text Egyptian Web", new Some("bold"), new None, "/assets/fonts/GuardianTextEgyptian-Bold.ttf")}
    ${fontFace("Guardian Text Egyptian Web", new Some("bold"), new Some("italic"), "/assets/fonts/GuardianTextEgyptian-BoldItalic.ttf")}

    ${fontFace("Guardian Text Sans Web", new Some(400), new None, "/assets/fonts/GuardianTextSans-Regular.ttf")}
    ${fontFace("Guardian Text Sans Web", new Some(400), new Some("italic"), "/assets/fonts/GuardianTextSans-RegularItalic.ttf")}
    ${fontFace("Guardian Text Sans Web", new Some(700), new None, "/assets/fonts/GuardianTextSans-Bold.ttf")}
    ${fontFace("Guardian Text Sans Web", new Some(700), new Some("italic"), "/assets/fonts/GuardianTextSans-BoldItalic.ttf")}

    ${fontFace("GH Guardian Headline", new Some(300), new None, "/assets/fonts/GHGuardianHeadline-Light.ttf")}
    ${fontFace("GH Guardian Headline", new Some(300), new Some("italic"), "/assets/fonts/GHGuardianHeadline-LightItalic.ttf")}
    ${fontFace("GH Guardian Headline", new Some(400), new None, "/assets/fonts/GHGuardianHeadline-Regular.ttf")}
    ${fontFace("GH Guardian Headline", new Some(400), new Some("italic"), "/assets/fonts/GHGuardianHeadline-RegularItalic.ttf")}
    ${fontFace("GH Guardian Headline", new Some(500), new None,  "/assets/fonts/GHGuardianHeadline-Medium.ttf")}
    ${fontFace("GH Guardian Headline", new Some(500), new Some("italic"),  "/assets/fonts/GHGuardianHeadline-MediumItalic.ttf")}
    ${fontFace("GH Guardian Headline", new Some(600), new None,  "/assets/fonts/GHGuardianHeadline-Semibold.ttf")}
    ${fontFace("GH Guardian Headline", new Some(600), new Some("italic"),  "/assets/fonts/GHGuardianHeadline-SemiboldItalic.ttf")}
    ${fontFace("GH Guardian Headline", new Some(700), new None, "/assets/fonts/GHGuardianHeadline-Bold.ttf")}
    ${fontFace("GH Guardian Headline", new Some(700), new Some("italic"), "/assets/fonts/GHGuardianHeadline-BoldItalic.ttf")}

    ${fontFace("Guardian Icons", new None, new None, "/assets/fonts/icons.otf")}
`;
