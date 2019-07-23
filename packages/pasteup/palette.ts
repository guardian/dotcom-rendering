export type colour = string;

export interface PillarColours {
    dark: colour;
    main: colour;
    bright: colour;
    pastel: colour;
    faded: colour;
    neutral: NeutralTheme;
}
export interface NeutralTheme {
    border: colour;
}
export interface AllPillarColours {
    news: PillarColours;
    opinion: PillarColours;
    sport: PillarColours;
    culture: PillarColours;
    lifestyle: PillarColours;
    labs: PillarColours;
}
export interface OtherColours {
    highlight: { main: colour; dark: colour };
    neutral: {
        7: colour;
        20: colour;
        46: colour;
        60: colour;
        85: colour;
        86: colour;
        93: colour;
        97: colour;
        100: colour;
    };
    state: { success: colour; error: colour };
    specialReport: { dark: colour };
    labs: { dark: colour; main: colour };
    green: { dark: colour; main: colour };
    brand: { dark: colour; main: colour; pastel: colour };
}

export interface Appearances {
    contrasts: {
        darkOnLight: { background: colour; foreground: colour; border: colour };
        lightOnDark: { background: colour; foreground: colour; border: colour };
        lightOnBrand: {
            background: colour;
            foreground: colour;
            border: colour;
        };
    };
}

const green = {
    dark: '#185E36',
    main: '#22874D',
};

const red = {
    dark: '#ab0613',
    main: '#c70000',
};

const brand = {
    dark: '#041f4a',
    main: '#052962',
    pastel: '#506991',
};

const state = {
    success: green.main,
    error: red.main,
};

const highlight = {
    main: '#ffe500',
    dark: '#ffbb50',
};

const neutral = {
    7: '#121212',
    20: '#333333',
    46: '#767676',
    60: '#999999',
    85: '#d9d9d9',
    86: '#dcdcdc',
    93: '#ededed',
    97: '#f6f6f6',
    100: '#ffffff',
};

const lightTheme: NeutralTheme = {
    border: neutral[86],
};

const darkTheme: NeutralTheme = {
    border: neutral[60],
};

const news: PillarColours = {
    dark: red.dark,
    main: red.main,
    bright: '#ff4e36',
    pastel: '#ffbac8',
    faded: '#fff4f2',
    neutral: lightTheme,
};

const opinion: PillarColours = {
    dark: '#bd5318',
    main: '#e05e00',
    bright: '#ff7f0f',
    pastel: '#f9b376',
    faded: '#fef9f5',
    neutral: lightTheme,
};

const sport: PillarColours = {
    dark: '#005689',
    main: '#0084c6',
    bright: '#00b2ff',
    pastel: '#90dcff',
    faded: '#f1f8fc',
    neutral: lightTheme,
};

const culture: PillarColours = {
    dark: '#6b5840',
    main: '#a1845c',
    bright: '#eacca0',
    pastel: '#e7d4b9',
    faded: '#fbf6ef',
    neutral: lightTheme,
};

const lifestyle: PillarColours = {
    dark: '#7d0068',
    main: '#bb3b80',
    bright: '#ffabdb',
    pastel: '#fec8d3',
    faded: '#feeef7',
    neutral: lightTheme,
};

const labs: PillarColours = {
    dark: neutral[7],
    main: neutral[7],
    bright: '#69d1ca', // bright teal
    pastel: '', // TODO
    faded: '#65a897', // dark teal
    neutral: darkTheme,
};

const specialReport = { dark: '#3f464a' };

const contrasts = {
    darkOnLight: {
        background: neutral[100],
        foreground: neutral[7],
        border: neutral[86],
    },
    lightOnDark: {
        background: neutral[7],
        foreground: neutral[100],
        border: neutral[20],
    },
    lightOnBrand: {
        background: brand.main,
        foreground: neutral[100],
        border: brand.pastel,
    },
};

export const palette: AllPillarColours & OtherColours & Appearances = {
    news,
    opinion,
    sport,
    culture,
    lifestyle,
    labs,
    highlight,
    neutral,
    specialReport,
    green,
    brand,
    state,
    contrasts,
};
