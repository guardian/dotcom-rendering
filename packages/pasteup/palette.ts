export type colour = string;
export interface PillarColours {
    dark: colour;
    main: colour;
    bright: colour;
    pastel: colour;
    faded: colour;
}
export interface AllPillarColours {
    news: PillarColours;
    opinion: PillarColours;
    sport: PillarColours;
    culture: PillarColours;
    lifestyle: PillarColours;
}
export interface OtherColours {
    highlight: { main: colour; dark: colour };
    neutral: {
        7: colour;
        20: colour;
        46: colour;
        60: colour;
        86: colour;
        93: colour;
        97: colour;
        100: colour;
    };
    specialReport: { dark: colour };
    labs: { dark: colour; main: colour };
    green: { dark: colour; main: colour };
}

export const palette: AllPillarColours & OtherColours = {
    news: {
        dark: '#ab0613',
        main: '#c70000',
        bright: '#ff4e36',
        pastel: '#ffbac8',
        faded: '#fff4f2',
    },
    opinion: {
        dark: '#bd5318',
        main: '#e05e00',
        bright: '#ff7f0f',
        pastel: '#f9b376',
        faded: '#fef9f5',
    },
    sport: {
        dark: '#005689',
        main: '#0084c6',
        bright: '#00b2ff',
        pastel: '#90dcff',
        faded: '#f1f8fc',
    },
    culture: {
        dark: '#6b5840',
        main: '#a1845c',
        bright: '#eacca0',
        pastel: '#e7d4b9',
        faded: '#fbf6ef',
    },
    lifestyle: {
        dark: '#7d0068',
        main: '#bb3b80',
        bright: '#ffabdb',
        pastel: '#fec8d3',
        faded: '#feeef7',
    },
    highlight: {
        main: '#ffe500',
        dark: '#ffbb50',
    },
    neutral: {
        7: '#121212',
        20: '#333333',
        46: '#767676',
        60: '#999999',
        86: '#dcdcdc',
        93: '#ededed',
        97: '#f6f6f6',
        100: '#ffffff',
    },
    specialReport: { dark: '#3f464a' },
    labs: {
        dark: '#65a897',
        main: '#69d1ca',
    },
    green: { dark: '#236925', main: '#3db540' },
};
