import { default as minifyCssString } from 'minify-css-string';
import assets from './assets';

type FontFamily =
    | 'GH Guardian Headline'
    | 'GuardianTextEgyptian'
    | 'GuardianTextSans';

type FontStyle = 'normal' | 'italic';

interface FontDisplay {
    family: FontFamily;
    woff2: string;
    woff: string;
    ttf: string;
    weight: number;
    style: FontStyle;
}

const fontList: FontDisplay[] = [
    {
        family: 'GH Guardian Headline',
        woff2:
            'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Light.woff2',
        woff:
            'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-Light.woff',
        ttf:
            'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-Light.ttf',
        weight: 300,
        style: 'normal',
    },
    {
        family: 'GH Guardian Headline',
        woff2:
            'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-LightItalic.woff2',
        woff:
            'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-LightItalic.woff',
        ttf:
            'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-LightItalic.ttf',
        weight: 300,
        style: 'italic',
    },
    {
        family: 'GH Guardian Headline',
        woff2:
            'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Medium.woff2',
        woff:
            'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Medium.woff',
        ttf:
            'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-Medium.ttf',
        weight: 500,
        style: 'normal',
    },
    {
        family: 'GH Guardian Headline',
        woff2:
            'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-MediumItalic.woff2',
        woff:
            'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-MediumItalic.woff',
        ttf:
            'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-MediumItalic.ttf',
        weight: 500,
        style: 'italic',
    },
    {
        family: 'GH Guardian Headline',
        woff2:
            'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Bold.woff2',
        woff:
            'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-Bold.woff',
        ttf:
            'fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-Bold.ttf',
        weight: 700,
        style: 'normal',
    },
    {
        family: 'GuardianTextEgyptian',
        woff2:
            'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Regular.woff2',
        woff:
            'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Regular.woff',
        ttf:
            'fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-Regular.ttf',
        weight: 400,
        style: 'normal',
    },
    {
        family: 'GuardianTextEgyptian',
        woff2:
            'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-RegularItalic.woff2',
        woff:
            'fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-RegularItalic.woff',
        ttf:
            'fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-RegularItalic.ttf',
        weight: 400,
        style: 'italic',
    },
    {
        family: 'GuardianTextEgyptian',
        woff2:
            'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Bold.woff2',
        woff:
            'fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-Bold.woff',
        ttf:
            'fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-Bold.ttf',
        weight: 700,
        style: 'normal',
    },
    {
        family: 'GuardianTextSans',
        woff2:
            'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Regular.woff2',
        woff:
            'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Regular.woff',
        ttf:
            'fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-Regular.ttf',
        weight: 400,
        style: 'normal',
    },
    {
        family: 'GuardianTextSans',
        woff2:
            'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-RegularItalic.woff2',
        woff:
            'fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-RegularItalic.woff',
        ttf:
            'fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-RegularItalic.ttf',
        weight: 400,
        style: 'italic',
    },
    {
        family: 'GuardianTextSans',
        woff2:
            'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Bold.woff2',
        woff:
            'fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-Bold.woff',
        ttf:
            'fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-Bold.ttf',
        weight: 700,
        style: 'normal',
    },
];

const template: (_: FontDisplay) => string = ({
    family,
    woff2,
    woff,
    ttf,
    weight,
    style,
}) => `
    @font-face {
        font-family: "${family}";
        src: url(${assets.static(woff2)}) format("woff2"),
                url(${assets.static(woff)}) format("woff"),
                url(${assets.static(ttf)}) format("truetype");
        font-weight: ${weight};
        font-style: ${style};
        font-display: swap;
    }
`;

const getStyleString: () => string = () => {
    return fontList.reduce(
        (styleString, font) => `${styleString}${template(font)}`,
        '',
    );
};

export default minifyCssString(getStyleString());
