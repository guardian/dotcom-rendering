import { getAdPlaceholderInserter } from './ads';
import { ReactNode } from 'react';
import { renderAll } from 'renderer';
import { JSDOM } from 'jsdom';
import {
	ArticlePillar,
	ArticleFormat,
	ArticleDesign,
	ArticleDisplay,
} from '@guardian/libs';
import { compose } from 'lib';
import { BodyElement, flattenTextElement } from 'bodyElement';
import AdSlot from 'adSlot';

const shouldHideAdverts = false;
const insertAdPlaceholders = getAdPlaceholderInserter(shouldHideAdverts);
const mockFormat: ArticleFormat = {
	theme: ArticlePillar.News,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
};

const textElement = (nodes: string[]): BodyElement[] => {
	const frag = JSDOM.fragment(nodes.join(''));
	return flattenTextElement(frag);
};

const generateParas = (paras: number): BodyElement[] => {
	const frag = JSDOM.fragment(Array(paras).fill('<p>foo</p>').join(''));
	return flattenTextElement(frag);
};

const render = (elements: BodyElement[]): ReactNode[] =>
	renderAll(mockFormat, elements);

const renderParagraphs = compose(render, generateParas);

const renderTextElement = compose(render, textElement);

describe('Adds the correct number of ad placeholders', () => {
	test('Adds no placeholders for 2 paragraphs', () => {
		const twoParagraphs = renderParagraphs(2);
		const twoParagraphsAndNoAds = insertAdPlaceholders(
			twoParagraphs,
			mockFormat,
		);
		expect(twoParagraphsAndNoAds.length).toBe(2);
	});

	test('Adds one placeholder for 5 paragraphs', () => {
		const fiveParagraphs = renderParagraphs(5);
		const fiveParagraphsAndOneAd = insertAdPlaceholders(
			fiveParagraphs,
			mockFormat,
		);
		expect(fiveParagraphsAndOneAd.length).toBe(6);
	});

	test('Adds two placeholders for 9 paragraphs', () => {
		const nineParagraphs = renderParagraphs(9);
		const nineParagraphsAndTwoAds = insertAdPlaceholders(
			nineParagraphs,
			mockFormat,
		);
		expect(nineParagraphsAndTwoAds.length).toBe(11);
	});

	test('Adds eight placeholders for 50 paragraphs', () => {
		const fiftyParagraphs = renderParagraphs(50);
		const fiftyParagraphsAndEightAds = insertAdPlaceholders(
			fiftyParagraphs,
			mockFormat,
		);
		expect(fiftyParagraphsAndEightAds.length).toBe(58);
	});

	test('Adds fifteen placeholders for 90 paragraphs', () => {
		const ninetyParagraphs = renderParagraphs(90);
		const ninetyParagraphsAndFifteenAds = insertAdPlaceholders(
			ninetyParagraphs,
			mockFormat,
		);
		expect(ninetyParagraphsAndFifteenAds.length).toBe(105);
	});

	test('Adds fifteen placeholders for 150 paragraphs', () => {
		const hundredFifty = renderParagraphs(150);
		const hundredFiftyAndFifteenAds = insertAdPlaceholders(
			hundredFifty,
			mockFormat,
		);
		expect(hundredFiftyAndFifteenAds.length).toBe(165);
	});
});

describe('Adds placholders at the correct indexes', () => {
	test('Adds first placeholder after 3rd paragraph', () => {
		const fiveParagraphs = renderParagraphs(5);
		const fiveParagraphsAndOneAd: any = insertAdPlaceholders(
			fiveParagraphs,
			mockFormat,
		);
		expect(fiveParagraphsAndOneAd[3].type).toBe(AdSlot);
	});

	test('Adds second placeholder after 9th paragraph', () => {
		const tenParagraphs = renderParagraphs(10);
		const tenParagraphsAndTwoAds: any = insertAdPlaceholders(
			tenParagraphs,
			mockFormat,
		);
		expect(tenParagraphsAndTwoAds[10].type).toBe(AdSlot);
	});
});

describe('Adds short classname correctly', () => {
	test('Adds short classname for articles with less than 15 paragraphs', () => {
		const fourteenParagraphs = renderParagraphs(14);
		const fourteenParagraphsAndTwoAds: any = insertAdPlaceholders(
			fourteenParagraphs,
			mockFormat,
		);
		expect(fourteenParagraphsAndTwoAds[3].props.className).toBe(
			'ad-placeholder hidden short',
		);
		expect(fourteenParagraphsAndTwoAds[10].props.className).toBe(
			'ad-placeholder hidden short',
		);
	});

	test('Does not add short classnames for articles with 15 paragraphs', () => {
		const fifteenParagraphs = renderParagraphs(15);
		const fifteenParagraphsAndTwoAds: any = insertAdPlaceholders(
			fifteenParagraphs,
			mockFormat,
		);
		expect(fifteenParagraphsAndTwoAds[3].props.className).toBe(
			'ad-placeholder hidden',
		);
		expect(fifteenParagraphsAndTwoAds[10].props.className).toBe(
			'ad-placeholder hidden',
		);
	});
});

describe('Handles different DOM structures', () => {
	test('Does not count other tag types', () => {
		const text = renderTextElement([
			'<p></p>',
			'<p></p>',
			'<div></div>',
			'<div></div>',
			'<div></div>',
			'<div></div>',
		]);

		const sixTagsWithNoAds = insertAdPlaceholders(text, mockFormat);
		expect(sixTagsWithNoAds.length).toBe(6);
	});

	test('Inserts placeholders at correct positions with other types of tags', () => {
		const text = renderTextElement([
			'<p></p>',
			'<p></p>',
			'<span></span>',
			'<p></p>',
			'<p></p>',
			'<a href="foo"></a>',
		]);

		const sixTagsWithOneAd: any = insertAdPlaceholders(text, mockFormat);
		expect(sixTagsWithOneAd.length).toBe(7);
		expect(
			sixTagsWithOneAd[5].props.className ===
				'ad-placeholder hidden short',
		);
	});
});
