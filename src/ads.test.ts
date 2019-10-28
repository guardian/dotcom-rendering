import { insertAdPlaceholders } from './ads';
import React from 'react';

const h = React.createElement;

function createParagraphs(num: number): any {
    const paragraphs = Array(num).fill(h('p', null, null))
    return [...paragraphs];
}

describe('Adds the correct number of ad placeholders', () => {
    test('Adds no placeholders for 2 paragraphs', () => {
        const twoParagraphs = createParagraphs(2)
        const twoParagraphsAndNoAds = insertAdPlaceholders(twoParagraphs);
        expect(twoParagraphsAndNoAds.length).toBe(2)
    });

    test('Adds one placeholder for 5 paragraphs', () => {
        const fiveParagraphs = createParagraphs(5)
        const fiveParagraphsAndOneAd = insertAdPlaceholders(fiveParagraphs);
        expect(fiveParagraphsAndOneAd.length).toBe(6)
    });

    test('Adds one placeholders for 9 paragraphs', () => {
        const nineParagraphs = createParagraphs(9)
        const nineParagraphsAndOneAd = insertAdPlaceholders(nineParagraphs);
        expect(nineParagraphsAndOneAd.length).toBe(10)
    });

    test('Adds two placeholders for 10 paragraphs', () => {
        const tenParagraphs = createParagraphs(10)
        const tenParagraphsAndTwoAd = insertAdPlaceholders(tenParagraphs);
        expect(tenParagraphsAndTwoAd.length).toBe(12)
    });

    test('Adds two placeholders for 50 paragraphs', () => {
        const fiftyParagraphs = createParagraphs(50)
        const fiftyParagraphsAndTwoAd = insertAdPlaceholders(fiftyParagraphs);
        expect(fiftyParagraphsAndTwoAd.length).toBe(52)
    });
});

describe('Adds placholders at the correct indexes', () => {
    test('Adds first placeholder after 3rd paragraph', () => {
        const fiveParagraphs = createParagraphs(5)
        const fiveParagraphsAndOneAd: any = insertAdPlaceholders(fiveParagraphs);
        expect(fiveParagraphsAndOneAd[3].type).toBe('div');
    });

    test('Adds second placeholder after 9th paragraph', () => {
        const tenParagraphs = createParagraphs(10)
        const tenParagraphsAndTwoAds: any = insertAdPlaceholders(tenParagraphs);
        expect(tenParagraphsAndTwoAds[10].type).toBe('div');
    });
});

describe('Adds short classname correctly', () => {
    test('Adds short classname for articles with less than 15 paragraphs', () => {
        const fourteenParagraphs = createParagraphs(14)
        const fourteenParagraphsAndTwoAds: any = insertAdPlaceholders(fourteenParagraphs);
        expect(fourteenParagraphsAndTwoAds[3].props.className).toBe('ad-placeholder short');
        expect(fourteenParagraphsAndTwoAds[10].props.className).toBe('ad-placeholder short');
    });

    test('Does not add short classnames for articles with 15 paragraphs', () => {
        const fifteenParagrpahs = createParagraphs(15)
        const fifteenParagrpahsAndTwoAds: any = insertAdPlaceholders(fifteenParagrpahs);
        expect(fifteenParagrpahsAndTwoAds[3].props.className).toBe('ad-placeholder');
        expect(fifteenParagrpahsAndTwoAds[10].props.className).toBe('ad-placeholder');
    });
});
