export const serif = {
    headline: ['GH Guardian Headline', 'Georgia', 'serif'].join(','),
    body: ['GuardianTextEgyptian', 'Georgia', 'serif'].join(','),
};

export const sans = {
    body: [
        'GuardianTextSans',
        'Helvetica Neue',
        'Helvetica',
        'Arial',
        'Lucida Grande',
        'sans-serif',
    ].join(','),
};

const fontScaleMapping: any = {
    headline: {
        1: { fontSize: 14, lineHeight: 18 },
        2: { fontSize: 16, lineHeight: 20 },
        3: { fontSize: 20, lineHeight: 24 },
        4: { fontSize: 24, lineHeight: 28 },
        5: { fontSize: 28, lineHeight: 32 },
        6: { fontSize: 32, lineHeight: 36 },
        7: { fontSize: 36, lineHeight: 40 },
        8: { fontSize: 40, lineHeight: 44 },
        9: { fontSize: 44, lineHeight: 48 },
    },
    body: {
        1: { fontSize: 14, lineHeight: 20 },
        2: { fontSize: 16, lineHeight: 24 },
        3: { fontSize: 18, lineHeight: 28 },
    },
    textSans: {
        1: { fontSize: 12, lineHeight: 16 },
        2: { fontSize: 13, lineHeight: 18 },
        3: { fontSize: 14, lineHeight: 20 },
        4: { fontSize: 14, lineHeight: 22 },
        5: { fontSize: 16, lineHeight: 22 },
        6: { fontSize: 18, lineHeight: 18 },
    },
};

export const fontSize = (typex: string, level: number) =>
    fontScaleMapping[typex][level].fontSize.toString();

export const lineHeight = (typex: string, level: number) =>
    fontScaleMapping[typex][level].lineHeight.toString();

// (font-size: 14, line-height: 18)
export const fontScale = (typex: string, level: number): string =>
    `
font-size: ${fontScaleMapping[typex][level].fontSize}, 
line-height: ${fontScaleMapping[typex][level].lineHeight}`;
