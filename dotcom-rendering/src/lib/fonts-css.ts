type FontFamily =
	| 'GH Guardian Headline'
	| 'Guardian Egyptian Web' // Legacy of GH Guardian Headline
	| 'GuardianTextEgyptian'
	| 'Guardian Text Egyptian Web' // Legacy of GuardianTextEgyptian
	| 'GuardianTextSans'
	| 'Guardian Text Sans Web'; // Legacy of GuardianTextSans

type FontStyle = 'normal' | 'italic';

interface FontDisplay {
	family: FontFamily;
	woff2: string;
	woff: string;
	ttf: string;
	weight: number;
	style: FontStyle;
	uniqueName: string;
}

export const fontList: FontDisplay[] = [
	// GH Guardian Headline, with legacy family name of Guardian Egyptian Web
	{
		family: 'GH Guardian Headline',
		woff2: 'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Light.woff2',
		woff: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-Light.woff',
		ttf: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-Light.ttf',
		weight: 300,
		style: 'normal',
		uniqueName: 'GHGuardianHeadline-Light',
	},
	{
		family: 'Guardian Egyptian Web',
		woff2: 'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Light.woff2',
		woff: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-Light.woff',
		ttf: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-Light.ttf',
		weight: 300,
		style: 'normal',
		uniqueName: 'GuardianEgyptian-Light',
	},
	{
		family: 'GH Guardian Headline',
		woff2: 'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-LightItalic.woff2',
		woff: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-LightItalic.woff',
		ttf: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-LightItalic.ttf',
		weight: 300,
		style: 'italic',
		uniqueName: 'GHGuardianHeadline-LightItalic',
	},
	{
		family: 'Guardian Egyptian Web',
		woff2: 'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-LightItalic.woff2',
		woff: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-LightItalic.woff',
		ttf: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-LightItalic.ttf',
		weight: 300,
		style: 'italic',
		uniqueName: 'GuardianEgyptian-LightItalic',
	},
	{
		family: 'GH Guardian Headline',
		woff2: 'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Medium.woff2',
		woff: 'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Medium.woff',
		ttf: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-Medium.ttf',
		weight: 500,
		style: 'normal',
		uniqueName: 'GHGuardianHeadline-Medium',
	},
	{
		family: 'Guardian Egyptian Web',
		woff2: 'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Medium.woff2',
		woff: 'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Medium.woff',
		ttf: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-Medium.ttf',
		weight: 500,
		style: 'normal',
		uniqueName: 'GuardianEgyptian-Medium',
	},
	{
		family: 'GH Guardian Headline',
		woff2: 'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-MediumItalic.woff2',
		woff: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-MediumItalic.woff',
		ttf: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-MediumItalic.ttf',
		weight: 500,
		style: 'italic',
		uniqueName: 'GHGuardianHeadline-MediumItalic',
	},
	{
		family: 'Guardian Egyptian Web',
		woff2: 'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-MediumItalic.woff2',
		woff: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-MediumItalic.woff',
		ttf: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-MediumItalic.ttf',
		weight: 500,
		style: 'italic',
		uniqueName: 'GuardianEgyptian-MediumItalic',
	},
	{
		family: 'GH Guardian Headline',
		woff2: 'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Bold.woff2',
		woff: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-Bold.woff',
		ttf: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-Bold.ttf',
		weight: 700,
		style: 'normal',
		uniqueName: 'GHGuardianHeadline-Bold',
	},
	{
		family: 'Guardian Egyptian Web',
		woff2: 'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Bold.woff2',
		woff: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-Bold.woff',
		ttf: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-Bold.ttf',
		weight: 700,
		style: 'normal',
		uniqueName: 'GuardianEgyptian-Bold',
	},
	{
		family: 'GH Guardian Headline',
		woff2: 'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-BoldItalic.woff2',
		woff: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-BoldItalic.woff',
		ttf: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-BoldItalic.ttf',
		weight: 700,
		style: 'italic',
		uniqueName: 'GHGuardianHeadline-BoldItalic',
	},
	{
		family: 'Guardian Egyptian Web',
		woff2: 'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-BoldItalic.woff2',
		woff: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-BoldItalic.woff',
		ttf: 'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-BoldItalic.ttf',
		weight: 700,
		style: 'italic',
		uniqueName: 'GuardianEgyptian-BoldItalic',
	},
	// GuardianTextEgyptian, with legacy family name of Guardian Text Egyptian Web
	{
		family: 'GuardianTextEgyptian',
		woff2: 'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Regular.woff2',
		woff: 'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Regular.woff',
		ttf: 'fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-Regular.ttf',
		weight: 400,
		style: 'normal',
		uniqueName: 'GuardianTextEgyptian-Regular',
	},
	{
		family: 'Guardian Text Egyptian Web',
		woff2: 'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Regular.woff2',
		woff: 'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Regular.woff',
		ttf: 'fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-Regular.ttf',
		weight: 400,
		style: 'normal',
		uniqueName: 'GuardianTextEgyptianWeb-Regular',
	},
	{
		family: 'GuardianTextEgyptian',
		woff2: 'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-RegularItalic.woff2',
		woff: 'fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-RegularItalic.woff',
		ttf: 'fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-RegularItalic.ttf',
		weight: 400,
		style: 'italic',
		uniqueName: 'GuardianTextEgyptian-RegularItalic',
	},
	{
		family: 'Guardian Text Egyptian Web',
		woff2: 'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-RegularItalic.woff2',
		woff: 'fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-RegularItalic.woff',
		ttf: 'fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-RegularItalic.ttf',
		weight: 400,
		style: 'italic',
		uniqueName: 'GuardianTextEgyptianWeb-RegularItalic',
	},
	{
		family: 'GuardianTextEgyptian',
		woff2: 'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Bold.woff2',
		woff: 'fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-Bold.woff',
		ttf: 'fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-Bold.ttf',
		weight: 700,
		style: 'normal',
		uniqueName: 'GuardianTextEgyptian-Bold',
	},
	{
		family: 'Guardian Text Egyptian Web',
		woff2: 'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Bold.woff2',
		woff: 'fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-Bold.woff',
		ttf: 'fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-Bold.ttf',
		weight: 700,
		style: 'normal',
		uniqueName: 'GuardianTextEgyptianWeb-Bold',
	},
	{
		family: 'GuardianTextEgyptian',
		woff2: 'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-BoldItalic.woff2',
		woff: 'fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-BoldItalic.woff',
		ttf: 'fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-BoldItalic.ttf',
		weight: 700,
		style: 'italic',
		uniqueName: 'GuardianTextEgyptian-BoldItalic',
	},
	{
		family: 'Guardian Text Egyptian Web',
		woff2: 'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-BoldItalic.woff2',
		woff: 'fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-BoldItalic.woff',
		ttf: 'fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-BoldItalic.ttf',
		weight: 700,
		style: 'italic',
		uniqueName: 'GuardianTextEgyptianWeb-BoldItalic',
	},
	// GuardianTextSans, with legacy family name of Guardian Text Sans Web
	{
		family: 'GuardianTextSans',
		woff2: 'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Regular.woff2',
		woff: 'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Regular.woff',
		ttf: 'fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-Regular.ttf',
		weight: 400,
		style: 'normal',
		uniqueName: 'GuardianTextSans-Regular',
	},
	{
		family: 'Guardian Text Sans Web',
		woff2: 'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Regular.woff2',
		woff: 'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Regular.woff',
		ttf: 'fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-Regular.ttf',
		weight: 400,
		style: 'normal',
		uniqueName: 'GuardianTextSansWeb-Regular',
	},
	{
		family: 'GuardianTextSans',
		woff2: 'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-RegularItalic.woff2',
		woff: 'fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-RegularItalic.woff',
		ttf: 'fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-RegularItalic.ttf',
		weight: 400,
		style: 'italic',
		uniqueName: 'GuardianTextSans-RegularItalic',
	},
	{
		family: 'Guardian Text Sans Web',
		woff2: 'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-RegularItalic.woff2',
		woff: 'fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-RegularItalic.woff',
		ttf: 'fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-RegularItalic.ttf',
		weight: 400,
		style: 'italic',
		uniqueName: 'GuardianTextSansWeb-RegularItalic',
	},
	{
		family: 'GuardianTextSans',
		woff2: 'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Bold.woff2',
		woff: 'fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-Bold.woff',
		ttf: 'fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-Bold.ttf',
		weight: 700,
		style: 'normal',
		uniqueName: 'GuardianTextSans-Bold',
	},
	{
		family: 'Guardian Text Sans Web',
		woff2: 'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Bold.woff2',
		woff: 'fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-Bold.woff',
		ttf: 'fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-Bold.ttf',
		weight: 700,
		style: 'normal',
		uniqueName: 'GuardianTextSansWeb-Bold',
	},
	{
		family: 'GuardianTextSans',
		woff2: 'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-BoldItalic.woff2',
		woff: 'fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-BoldItalic.woff',
		ttf: 'fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-BoldItalic.ttf',
		weight: 700,
		style: 'italic',
		uniqueName: 'GuardianTextSans-BoldItalic',
	},
	{
		family: 'Guardian Text Sans Web',
		woff2: 'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-BoldItalic.woff2',
		woff: 'fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-BoldItalic.woff',
		ttf: 'fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-BoldItalic.ttf',
		weight: 700,
		style: 'italic',
		uniqueName: 'GuardianTextSansWeb-BoldItalic',
	},
];

const getFontUrl = (filePath: string): string =>
	`https://assets.guim.co.uk/static/frontend/${filePath}`;

const getFontFaceCss = (font: FontDisplay): string => `@font-face {
	font-family: "${font.family}";
	src: url(${getFontUrl(font.woff2)}) format("woff2"),
			url(${getFontUrl(font.woff)}) format("woff"),
			url(${getFontUrl(font.ttf)}) format("truetype");
	font-weight: ${font.weight};
	font-style: ${font.style};
	font-display: swap;
}`;

export const rawFontsCss = fontList.map(getFontFaceCss).join('\n');

export const rawFontsCssWithClassNames = fontList
	.map((font) => {
		return `
		${getFontFaceCss(font)}
		.${font.uniqueName} {
			font-family: "${font.family}";
			font-weight: ${font.weight};
			font-style: ${font.style};
		}`;
	})
	.join('\n');
