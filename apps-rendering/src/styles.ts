import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import {
	background,
	from,
	neutral,
	remSpace,
} from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { map, none, some, withDefault } from '@guardian/types';
import { pipe } from 'lib';
import { fill } from 'palette';

export const sidePadding = css`
	padding-left: ${remSpace[3]};
	padding-right: ${remSpace[3]};

	${from.wide} {
		padding-left: 0;
		padding-right: 0;
	}
`;

export const liveblogPhabletSidePadding = css`
	${from.phablet} {
		padding-left: ${remSpace[5]};
		padding-right: ${remSpace[4]};
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

export const liveblogWidthStyles: SerializedStyles = css`
	${articleWidthStyles}
	${from.desktop} {
		margin: 0 auto;
	}
`;

export const lineStyles = (format: ArticleFormat): SerializedStyles => css`
	display: block;

	${from.wide} {
		width: ${wideContentWidth}px;
		margin-left: auto;
		margin-right: auto;
	}

	${darkModeCss`
		// Straight, Dashed, Squiggly
		&[stroke], defs pattern[stroke], defs pattern g[stroke] {
			stroke: ${fill.linesDark(format)};
		}

		// Dotted
		defs pattern circle[fill]  {
			fill: ${fill.linesDark(format)};
		}
    `}
`;

export const onwardStyles: SerializedStyles = css`
	background: ${neutral[97]};

	${darkModeCss`
        background: ${background.inverse};
    `};

	${from.wide} {
		width: 1300px;
		margin-left: auto;
		margin-right: auto;
	}
`;

export const backgroundColor = (format: ArticleFormat): string =>
	format.design === ArticleDesign.Comment ||
	format.design === ArticleDesign.Letter ||
	format.design === ArticleDesign.Editorial
		? neutral[86]
		: neutral[97];

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
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Regular.ttf',
	)}
    ${fontFace(
		'Guardian Text Egyptian Web',
		some(400),
		some('italic'),
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-RegularItalic.ttf',
	)}
    ${fontFace(
		'Guardian Text Egyptian Web',
		some(700),
		none,
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Bold.ttf',
	)}
    ${fontFace(
		'Guardian Text Egyptian Web',
		some(700),
		some('italic'),
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-BoldItalic.ttf',
	)}
    ${fontFace(
		'Guardian Text Egyptian Web',
		some('bold'),
		none,
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Bold.ttf',
	)}
    ${fontFace(
		'Guardian Text Egyptian Web',
		some('bold'),
		some('italic'),
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-BoldItalic.ttf',
	)}

    ${fontFace(
		'Guardian Text Sans Web',
		some(400),
		none,
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Regular.ttf',
	)}
    ${fontFace(
		'Guardian Text Sans Web',
		some(400),
		some('italic'),
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-RegularItalic.ttf',
	)}
    ${fontFace(
		'Guardian Text Sans Web',
		some(700),
		none,
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Bold.ttf',
	)}
    ${fontFace(
		'Guardian Text Sans Web',
		some(700),
		some('italic'),
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-BoldItalic.ttf',
	)}

    ${fontFace(
		'GH Guardian Headline',
		some(300),
		none,
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Light.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(300),
		some('italic'),
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-LightItalic.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(400),
		none,
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Regular.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(400),
		some('italic'),
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-RegularItalic.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(500),
		none,
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Medium.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(500),
		some('italic'),
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-MediumItalic.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(600),
		none,
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Semibold.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(600),
		some('italic'),
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-SemiboldItalic.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(700),
		none,
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Bold.ttf',
	)}
    ${fontFace(
		'GH Guardian Headline',
		some(700),
		some('italic'),
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-BoldItalic.ttf',
	)}

`;

export const editionsDevFonts = `
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
