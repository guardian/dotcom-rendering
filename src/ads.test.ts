import { insertAdPlaceholders } from './ads';
import { ReactNode } from 'react';
import { Block, renderAll } from 'block';
import { ElementType } from 'capiThriftModels';
import { JSDOM } from 'jsdom';
import { Pillar } from 'pillar';
import { compose } from 'lib';

const textBlock = (nodes: string[]): Block =>
    ({
        kind: ElementType.TEXT,
        doc: JSDOM.fragment(nodes.join('')),
    });

const generateParas = (paras: number): Block =>
    textBlock(Array(paras).fill('<p>foo</p>'));

const render = (textBlock: Block): ReactNode[] =>
    renderAll('dummySalt')(Pillar.news, [textBlock]);

const renderParagraphs = compose(render, generateParas);

const renderTextBlock = compose(render, textBlock);

describe('Adds the correct number of ad placeholders', () => {
    test('Adds no placeholders for 2 paragraphs', () => {
        const twoParagraphs = renderParagraphs(2)
        const twoParagraphsAndNoAds = insertAdPlaceholders(twoParagraphs);
        expect(twoParagraphsAndNoAds.length).toBe(2)
    });

    test('Adds one placeholder for 5 paragraphs', () => {
        const fiveParagraphs = renderParagraphs(5)
        const fiveParagraphsAndOneAd = insertAdPlaceholders(fiveParagraphs);
        expect(fiveParagraphsAndOneAd.length).toBe(6)
    });

    test('Adds two placeholders for 9 paragraphs', () => {
        const nineParagraphs = renderParagraphs(9)
        const nineParagraphsAndTwoAds = insertAdPlaceholders(nineParagraphs);
        expect(nineParagraphsAndTwoAds.length).toBe(11)
    });

    test('Adds two placeholders for 50 paragraphs', () => {
        const fiftyParagraphs = renderParagraphs(50)
        const fiftyParagraphsAndTwoAd = insertAdPlaceholders(fiftyParagraphs);
        expect(fiftyParagraphsAndTwoAd.length).toBe(52)
    });
});

describe('Adds placholders at the correct indexes', () => {
    test('Adds first placeholder after 3rd paragraph', () => {
        const fiveParagraphs = renderParagraphs(5)
        const fiveParagraphsAndOneAd: any = insertAdPlaceholders(fiveParagraphs);
        expect(fiveParagraphsAndOneAd[3].type).toBe('aside');
    });

    test('Adds second placeholder after 9th paragraph', () => {
        const tenParagraphs = renderParagraphs(10)
        const tenParagraphsAndTwoAds: any = insertAdPlaceholders(tenParagraphs);
        expect(tenParagraphsAndTwoAds[10].type).toBe('aside');
    });
});

describe('Adds short classname correctly', () => {
    test('Adds short classname for articles with less than 15 paragraphs', () => {
        const fourteenParagraphs = renderParagraphs(14)
        const fourteenParagraphsAndTwoAds: any = insertAdPlaceholders(fourteenParagraphs);
        expect(fourteenParagraphsAndTwoAds[3].props.className).toBe('ad-placeholder short');
        expect(fourteenParagraphsAndTwoAds[10].props.className).toBe('ad-placeholder short');
    });

    test('Does not add short classnames for articles with 15 paragraphs', () => {
        const fifteenParagrpahs = renderParagraphs(15)
        const fifteenParagrpahsAndTwoAds: any = insertAdPlaceholders(fifteenParagrpahs);
        expect(fifteenParagrpahsAndTwoAds[3].props.className).toBe('ad-placeholder');
        expect(fifteenParagrpahsAndTwoAds[10].props.className).toBe('ad-placeholder');
    });
});

describe('Handles different DOM structures', () => {
    test('Does not count other tag types', () => {
        const text = renderTextBlock([
            '<p></p>',
            '<p></p>',
            '<div></div>',
            '<div></div>',
            '<div></div>',
            '<div></div>',
        ]);

        const sixTagsWithNoAds = insertAdPlaceholders(text);
        expect(sixTagsWithNoAds.length).toBe(6);
    });

    test('Inserts placeholders at correct positions with other types of tags', () => {
        const text = renderTextBlock([
            '<p></p>',
            '<p></p>',
            '<span></span>',
            '<p></p>',
            '<p></p>',
            '<a href="foo"></a>',
        ]);

        const sixTagsWithOneAd: any = insertAdPlaceholders(text);
        expect(sixTagsWithOneAd.length).toBe(7);
        expect(sixTagsWithOneAd[5].props.className === 'ad-placeholder short');
    });
});
