import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { FEElement } from '../types/content';
import {
	calculateApproximateBlockHeight,
	shouldDisplayAd,
} from './liveblogAdSlots';

void describe('calculateApproximateBlockHeight', () => {
	const textElementOneLineDesktop: FEElement[] = [
		{
			elementId: '1',
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: `<p>${'a'.repeat(72)}</p>`,
		},
	];

	const textElementTwoLinesDestkop: FEElement[] = [
		{
			elementId: '1',
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: `<p>${'a'.repeat(73)}</p>`,
		},
	];

	const textElementOneLineMobile: FEElement[] = [
		{
			elementId: '1',
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: `<p>${'a'.repeat(39)}</p>`,
		},
	];

	const textElementTwoLinesMobile: FEElement[] = [
		{
			elementId: '1',
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: `<p>${'a'.repeat(40)}</p>`,
		},
	];

	const multipleTextElements: FEElement[] = [
		{
			elementId: '1',
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: `<p>${'a'.repeat(38)}</p>`,
		},
		{
			elementId: '2',
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: `<p>${'a'.repeat(38)}</p>`,
		},
	];

	const youtubeElement: FEElement[] = [
		{
			_type: 'model.dotcomrendering.pageElements.YoutubeBlockElement',
			id: '1',
			elementId: '2',
			assetId: '',
			expired: false,
			mediaTitle: '',
		},
	];

	const defaultBlockSpacing = 75;

	void describe('zero elements', () => {
		for (const screenSize of ['mobile', 'desktop']) {
			void it(`should return zero when there are zero elements on ${screenSize}`, () => {
				const isMobile = screenSize === 'mobile';
				assert.deepEqual(
					calculateApproximateBlockHeight([], isMobile),
					0,
				);
			});
		}
	});

	void describe('text block elements', () => {
		const textLineHeight = 23.8;
		const margin = 14;

		for (const [screenSize, textElementOneLine, textElementTwoLines] of [
			['mobile', textElementOneLineMobile, textElementTwoLinesMobile],
			['desktop', textElementOneLineDesktop, textElementTwoLinesDestkop],
		] as const) {
			void it(`should return the correct height for varying line length on ${screenSize}`, () => {
				const isMobile = screenSize === 'mobile';

				assert.deepEqual(
					calculateApproximateBlockHeight(
						textElementOneLine,
						isMobile,
					),
					textLineHeight + margin + defaultBlockSpacing,
				);
				assert.deepEqual(
					calculateApproximateBlockHeight(
						textElementTwoLines,
						isMobile,
					),
					2 * textLineHeight + margin + defaultBlockSpacing,
				);
			});
		}

		for (const screenSize of ['mobile', 'desktop']) {
			void it(`should return the correct height when there are multiple elements on ${screenSize}`, () => {
				const isMobile = screenSize === 'mobile';

				assert.deepEqual(
					calculateApproximateBlockHeight(
						multipleTextElements,
						isMobile,
					),
					2 * textLineHeight + 2 * margin + defaultBlockSpacing,
				);
			});
		}
	});

	void describe('youtube block elements', () => {
		for (const [screenSize, heightExcludingText] of [
			['mobile', 195],
			['desktop', 350],
		] as const) {
			void it(`should return the correct height on ${screenSize}`, () => {
				const isMobile = screenSize === 'mobile';
				const margin = 12;

				assert.deepEqual(
					calculateApproximateBlockHeight(youtubeElement, isMobile),
					heightExcludingText + margin + defaultBlockSpacing,
				);
			});
		}
	});
});

void describe('shouldDisplayAd', () => {
	void describe('The final block of content', () => {
		for (const screenSize of ['mobile', 'desktop']) {
			void it(`should NOT display an ad if this is the final block on ${screenSize}`, () => {
				const isMobile = screenSize === 'mobile';

				const block = 5;
				const totalBlocks = 5;
				const numAdsInserted = 1;
				const numPixelsWithoutAdvert = 5000;

				const result = shouldDisplayAd(
					block,
					totalBlocks,
					numAdsInserted,
					numPixelsWithoutAdvert,
					isMobile,
				);

				assert(!result);
			});
		}
	});

	void describe('Reaching the ad limit', () => {
		for (const screenSize of ['mobile', 'desktop']) {
			void it(`should NOT insert another ad slot if we have reached the limit on ${screenSize}.`, () => {
				const isMobile = screenSize === 'mobile';
				const block = 5;
				const totalBlocks = 10;
				const numAdsInserted = 8;
				const numPixelsWithoutAdvert = 5000;

				const result = shouldDisplayAd(
					block,
					totalBlocks,
					numAdsInserted,
					numPixelsWithoutAdvert,
					isMobile,
				);

				assert(!result);
			});
		}
	});

	void describe('inserting the first ad slot', () => {
		for (const screenSize of ['mobile', 'desktop']) {
			void it(`should display ad if this is the first block on ${screenSize}.`, () => {
				const isMobile = screenSize === 'mobile';
				const block = 1;
				const totalBlocks = 10;
				const numAdsInserted = 0;
				const numPixelsWithoutAdvert = 550;

				const result = shouldDisplayAd(
					block,
					totalBlocks,
					numAdsInserted,
					numPixelsWithoutAdvert,
					isMobile,
				);

				assert(result);
			});
		}
	});

	void describe('inserting further ad slots', () => {
		for (const [pixels, screenSize] of [
			[1200, 'mobile'],
			[1500, 'desktop'],
		] as const) {
			void it(`should display ad if number of pixels without an ad is more than ${pixels} on ${screenSize}`, () => {
				const isMobile = screenSize === 'mobile';
				const block = 5;
				const totalBlocks = 10;
				const numAdsInserted = 1;
				const numPixelsWithoutAdvert = pixels + 50;

				const result = shouldDisplayAd(
					block,
					totalBlocks,
					numAdsInserted,
					numPixelsWithoutAdvert,
					isMobile,
				);

				assert(result);
			});
		}

		for (const [pixels, screenSize] of [
			[1200, 'mobile'],
			[1500, 'desktop'],
		] as const) {
			void it(`should NOT display ad if number of pixels without an ad is less than ${pixels} on ${screenSize}`, () => {
				const isMobile = screenSize === 'mobile';
				const block = 5;
				const totalBlocks = 10;
				const numAdsInserted = 1;
				const numPixelsWithoutAdvert = pixels - 50;

				const result = shouldDisplayAd(
					block,
					totalBlocks,
					numAdsInserted,
					numPixelsWithoutAdvert,
					isMobile,
				);

				assert(!result);
			});
		}
	});
});
