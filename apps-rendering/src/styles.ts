import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import { from, until } from '@guardian/src-foundations/mq';
import {
	brandAltBackground,
	neutral,
} from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import type { Format, Option } from '@guardian/types';
import { Design, map, none, some, withDefault } from '@guardian/types';
import { pipe } from 'lib';

export const sidePadding = css`
	padding-left: ${remSpace[3]};
	padding-right: ${remSpace[3]};

	${from.wide} {
		padding-left: 0;
		padding-right: 0;
	}
`;

export const darkModeCss = (
	styles: TemplateStringsArray,
	...placeholders: string[]
): SerializedStyles => {
	const darkStyles = styles
		.map((style, i) => `${style}${placeholders[i] ? placeholders[i] : ''}`)
		.join('');
	return css`
		@media (prefers-color-scheme: dark) {
			${darkStyles}
		}
	`;
};

export const darkModeStyles = (
	styles: TemplateStringsArray,
	...placeholders: string[]
): string => darkModeCss(styles, ...placeholders).styles;

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
`;

export const wideContentWidth = 620;
export const wideColumnWidth = 220;

export const articleWidthStyles: SerializedStyles = css`
	${sidePadding}
	${from.wide} {
		margin: 0 auto;
	}

	${from.phablet} {
		width: ${wideContentWidth}px;
	}
`;

export const lineStyles = css`
	${from.wide} {
		width: ${wideContentWidth}px;
		margin-left: auto;
		margin-right: auto;
	}
	div {
		${darkModeCss`
        background-image: repeating-linear-gradient(
            to bottom,
            ${neutral[20]},
            ${neutral[20]} 1px,
            transparent 1px,
            transparent 3px
            );
    `}
	}
`;

const adHeight = '258px';

export const backgroundColor = (format: Format): string =>
	format.design === Design.Comment ||
	format.design === Design.Letter ||
	format.design === Design.Editorial
		? neutral[86]
		: neutral[97];

export const adStyles = (format: Format): SerializedStyles => {
	return css`
		.ad-placeholder {
			margin: ${remSpace[4]} 0;

			&.hidden {
				display: none;
			}

			color: ${neutral[20]};
			background: ${backgroundColor(format)};

			${darkModeCss`
            background-color: ${neutral[20]};
        `}

			clear: both;

			.ad-labels {
				${textSans.xsmall()}
				padding: ${remSpace[3]};
				float: left;
				width: calc(100% - ${remSpace[3]} - ${remSpace[3]});

				h1 {
					margin: 0;
					float: left;
					font-size: 16px;
					font-weight: 400;

					${darkModeCss`
                    color: ${neutral[60]};
                `}
				}
			}

			.ad-slot {
				clear: both;
				padding-bottom: ${adHeight};
			}

			.ad-slot-square {
				height: 344px;
				width: 320px;
				margin-left: auto;
				margin-right: auto;
				padding-bottom: 0;
			}

			.upgrade-banner {
				padding: ${remSpace[3]};
				background-color: ${brandAltBackground.primary};

				h1 {
					${headline.xxxsmall()};
					margin-top: 0;
				}

				${darkModeCss`
                background-color: ${brandAltBackground.ctaSecondary};
            `}
			}

			${until.phablet} {
				margin: 1em -${remSpace[3]};
			}

			${from.desktop} {
				position: absolute;
				margin-left: calc(${wideContentWidth}px + ${remSpace[4]});
				min-width: 300px;
				margin-bottom: ${remSpace[6]};
			}
		}

		.ad-placeholder.short:nth-of-type(1) {
			${from.desktop} {
				top: 0;
			}
		}
	`;
};

export const fontFace = (
	family: string,
	weight: Option<number | string>,
	style: Option<string>,
	url: string,
): string => `
  @font-face {
    font-family: ${family};
    ${pipe(
		style,
		map((s: string) => `font-style: ${s};`),
		withDefault(''),
	)}
    ${pipe(
		weight,
		map((w: number | string) => `font-weight: ${w};`),
		withDefault(''),
	)}
    src: url('${url}');
  }
`;

export const pageFonts = `
    ${fontFace(
		'Guardian Text Egyptian Web',
		some(400),
		none,
		'/assets/fonts/GuardianTextEgyptian-Reg.ttf',
	)}
    ${fontFace(
		'Guardian Text Egyptian Web',
		some(400),
		some('italic'),
		'/assets/fonts/GuardianTextEgyptian-RegItalic.ttf',
	)}
    ${fontFace(
		'Guardian Text Egyptian Web',
		some(700),
		none,
		'/assets/fonts/GuardianTextEgyptian-Bold.ttf',
	)}
    ${fontFace(
		'Guardian Text Egyptian Web',
		some(700),
		some('italic'),
		'/assets/fonts/GuardianTextEgyptian-BoldItalic.ttf',
	)}
    ${fontFace(
		'Guardian Text Egyptian Web',
		some('bold'),
		none,
		'/assets/fonts/GuardianTextEgyptian-Bold.ttf',
	)}
    ${fontFace(
		'Guardian Text Egyptian Web',
		some('bold'),
		some('italic'),
		'/assets/fonts/GuardianTextEgyptian-BoldItalic.ttf',
	)}

    ${fontFace(
		'Guardian Text Sans Web',
		some(400),
		none,
		'/assets/fonts/GuardianTextSans-Regular.ttf',
	)}
    ${fontFace(
		'Guardian Text Sans Web',
		some(400),
		some('italic'),
		'/assets/fonts/GuardianTextSans-RegularItalic.ttf',
	)}
    ${fontFace(
		'Guardian Text Sans Web',
		some(700),
		none,
		'/assets/fonts/GuardianTextSans-Bold.ttf',
	)}
    ${fontFace(
		'Guardian Text Sans Web',
		some(700),
		some('italic'),
		'/assets/fonts/GuardianTextSans-BoldItalic.ttf',
	)}

    ${fontFace(
		'GH Guardian Headline',
		some(300),
		none,
		'/assets/fonts/GHGuardianHeadline-Light.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(300),
		some('italic'),
		'/assets/fonts/GHGuardianHeadline-LightItalic.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(400),
		none,
		'/assets/fonts/GHGuardianHeadline-Regular.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(400),
		some('italic'),
		'/assets/fonts/GHGuardianHeadline-RegularItalic.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(500),
		none,
		'/assets/fonts/GHGuardianHeadline-Medium.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(500),
		some('italic'),
		'/assets/fonts/GHGuardianHeadline-MediumItalic.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(600),
		none,
		'/assets/fonts/GHGuardianHeadline-Semibold.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(600),
		some('italic'),
		'/assets/fonts/GHGuardianHeadline-SemiboldItalic.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(700),
		none,
		'/assets/fonts/GHGuardianHeadline-Bold.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(700),
		some('italic'),
		'/assets/fonts/GHGuardianHeadline-BoldItalic.ttf',
	)}

`;

export const editionsPageFonts = `
    ${fontFace(
		'Guardian Text Egyptian Web',
		some(400),
		none,
		'assets/fonts/GuardianTextEgyptian-Reg.ttf',
	)}
    ${fontFace(
		'Guardian Text Egyptian Web',
		some(400),
		some('italic'),
		'assets/fonts/GuardianTextEgyptian-RegIt.ttf',
	)}
    ${fontFace(
		'Guardian Text Egyptian Web',
		some(700),
		none,
		'assets/fonts/GuardianTextEgyptian-Bold.ttf',
	)}
    ${fontFace(
		'Guardian Text Egyptian Web',
		some(700),
		some('italic'),
		'assets/fonts/GuardianTextEgyptian-BoldItalic.ttf',
	)}
    ${fontFace(
		'Guardian Text Egyptian Web',
		some('bold'),
		none,
		'assets/fonts/GuardianTextEgyptian-Bold.ttf',
	)}
    ${fontFace(
		'Guardian Text Egyptian Web',
		some('bold'),
		some('italic'),
		'assets/fonts/GuardianTextEgyptian-BoldItalic.ttf',
	)}

    ${fontFace(
		'Guardian Text Sans Web',
		some(400),
		none,
		'assets/fonts/GuardianTextSans-Regular.ttf',
	)}
    ${fontFace(
		'Guardian Text Sans Web',
		some(400),
		some('italic'),
		'assets/fonts/GuardianTextSans-RegularIt.ttf',
	)}
    ${fontFace(
		'Guardian Text Sans Web',
		some(700),
		none,
		'assets/fonts/GuardianTextSans-Bold.ttf',
	)}
    ${fontFace(
		'Guardian Text Sans Web',
		some(700),
		some('italic'),
		'assets/fonts/GuardianTextSans-BoldItalic.ttf',
	)}

    ${fontFace(
		'GH Guardian Headline',
		some(300),
		none,
		'assets/fonts/GHGuardianHeadline-Light.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(300),
		some('italic'),
		'assets/fonts/GHGuardianHeadline-LightItalic.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(400),
		none,
		'assets/fonts/GHGuardianHeadline-Regular.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(400),
		some('italic'),
		'assets/fonts/GHGuardianHeadline-RegularItalic.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(500),
		none,
		'assets/fonts/GHGuardianHeadline-Medium.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(500),
		some('italic'),
		'assets/fonts/GHGuardianHeadline-MediumItalic.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(600),
		none,
		'assets/fonts/GHGuardianHeadline-Semibold.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(600),
		some('italic'),
		'assets/fonts/GHGuardianHeadline-SemiboldItalic.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(700),
		none,
		'assets/fonts/GHGuardianHeadline-Bold.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(700),
		some('italic'),
		'assets/fonts/GHGuardianHeadline-BoldItalic.ttf',
	)}
`;

export const editionsPreviewFonts = (s3Path: string): string => `
    ${fontFace(
		'Guardian Text Egyptian Web',
		some(400),
		none,
		`${s3Path}/assets/fonts/GuardianTextEgyptian-Reg.ttf`,
	)}
    ${fontFace(
		'Guardian Text Egyptian Web',
		some(400),
		some('italic'),
		`${s3Path}/assets/fonts/GuardianTextEgyptian-RegIt.ttf`,
	)}
    ${fontFace(
		'Guardian Text Egyptian Web',
		some(700),
		none,
		`${s3Path}/assets/fonts/GuardianTextEgyptian-Bold.ttf`,
	)}
    ${fontFace(
		'Guardian Text Egyptian Web',
		some(700),
		some('italic'),
		`${s3Path}/assets/fonts/GuardianTextEgyptian-BoldItalic.ttf`,
	)}
    ${fontFace(
		'Guardian Text Egyptian Web',
		some('bold'),
		none,
		`${s3Path}/assets/fonts/GuardianTextEgyptian-Bold.ttf`,
	)}
    ${fontFace(
		'Guardian Text Egyptian Web',
		some('bold'),
		some('italic'),
		`${s3Path}/assets/fonts/GuardianTextEgyptian-BoldItalic.ttf`,
	)}

    ${fontFace(
		'Guardian Text Sans Web',
		some(400),
		none,
		`${s3Path}/assets/fonts/GuardianTextSans-Regular.ttf`,
	)}
    ${fontFace(
		'Guardian Text Sans Web',
		some(400),
		some('italic'),
		`${s3Path}/assets/fonts/GuardianTextSans-RegularIt.ttf`,
	)}
    ${fontFace(
		'Guardian Text Sans Web',
		some(700),
		none,
		`${s3Path}/assets/fonts/GuardianTextSans-Bold.ttf`,
	)}
    ${fontFace(
		'Guardian Text Sans Web',
		some(700),
		some('italic'),
		`${s3Path}/assets/fonts/GuardianTextSans-BoldItalic.ttf`,
	)}

    ${fontFace(
		'GH Guardian Headline',
		some(300),
		none,
		`${s3Path}/assets/fonts/GHGuardianHeadline-Light.ttf`,
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(300),
		some('italic'),
		`${s3Path}/assets/fonts/GHGuardianHeadline-LightItalic.ttf`,
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(400),
		none,
		`${s3Path}/assets/fonts/GHGuardianHeadline-Regular.ttf`,
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(400),
		some('italic'),
		`${s3Path}/assets/fonts/GHGuardianHeadline-RegularItalic.ttf`,
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(500),
		none,
		`${s3Path}/assets/fonts/GHGuardianHeadline-Medium.ttf`,
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(500),
		some('italic'),
		`${s3Path}/assets/fonts/GHGuardianHeadline-MediumItalic.ttf`,
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(600),
		none,
		`${s3Path}/assets/fonts/GHGuardianHeadline-Semibold.ttf`,
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(600),
		some('italic'),
		`${s3Path}/assets/fonts/GHGuardianHeadline-SemiboldItalic.ttf`,
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(700),
		none,
		`${s3Path}/assets/fonts/GHGuardianHeadline-Bold.ttf`,
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(700),
		some('italic'),
		`${s3Path}/assets/fonts/GHGuardianHeadline-BoldItalic.ttf`,
	)}
`;
