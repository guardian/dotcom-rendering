import type { FEElement } from '../types/content';
import {
	calculateApproximateBlockHeight,
	shouldDisplayAd,
} from './liveblogAdSlots';

describe('calculateApproximateBlockHeight', () => {
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
			assetId: '',
			elementId: '1',
			expired: false,
			mediaTitle: '',
		},
	];

	const defaultBlockSpacing = 75;

	describe('zero elements', () => {
		it.each(['mobile', 'desktop'])(
			'should return zero when there are zero elements on %s',
			(screenSize) => {
				const isMobile = screenSize === 'mobile';
				expect(calculateApproximateBlockHeight([], isMobile)).toEqual(
					0,
				);
			},
		);
	});

	describe('text block elements', () => {
		const textLineHeight = 23.8;
		const margin = 14;

		it.each([
			['mobile', textElementOneLineMobile, textElementTwoLinesMobile],
			['desktop', textElementOneLineDesktop, textElementTwoLinesDestkop],
		])(
			'should return the correct height for varying line length on %s',
			(screenSize, textElementOneLine, textElementTwoLines) => {
				const isMobile = screenSize === 'mobile';

				expect(
					calculateApproximateBlockHeight(
						textElementOneLine,
						isMobile,
					),
				).toEqual(textLineHeight + margin + defaultBlockSpacing);
				expect(
					calculateApproximateBlockHeight(
						textElementTwoLines,
						isMobile,
					),
				).toEqual(2 * textLineHeight + margin + defaultBlockSpacing);
			},
		);

		it.each(['mobile', 'desktop'])(
			'should return the correct height when there are multiple elements on %s',
			(screenSize) => {
				const isMobile = screenSize === 'mobile';

				expect(
					calculateApproximateBlockHeight(
						multipleTextElements,
						isMobile,
					),
				).toEqual(
					2 * textLineHeight + 2 * margin + defaultBlockSpacing,
				);
			},
		);
	});

	describe('youtube block elements', () => {
		it.each([
			['mobile', 195],
			['desktop', 350],
		])(
			'should return the correct height on %s',
			(screenSize, heightExcludingText) => {
				const isMobile = screenSize === 'mobile';
				const margin = 12;

				expect(
					calculateApproximateBlockHeight(youtubeElement, isMobile),
				).toEqual(heightExcludingText + margin + defaultBlockSpacing);
			},
		);
	});
});

describe('shouldDisplayAd', () => {
	describe('The final block of content', () => {
		it.each(['mobile', 'desktop'])(
			'should NOT display an ad if this is the final block on %s',
			(screenSize) => {
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

				expect(result).toBeFalsy();
			},
		);
	});

	describe('Reaching the ad limit', () => {
		it.each(['mobile', 'desktop'])(
			'should NOT insert another ad slot if we have reached the limit on %s.',
			(screenSize) => {
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

				expect(result).toBeFalsy();
			},
		);
	});

	describe('inserting the first ad slot', () => {
		it.each(['mobile', 'desktop'])(
			'should display ad if this is the first block on %s.',
			(screenSize) => {
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

				expect(result).toBeTruthy();
			},
		);
	});

	describe('inserting further ad slots', () => {
		it.each([
			[1200, 'mobile'],
			[1500, 'desktop'],
		])(
			'should display ad if number of pixels without an ad is more than %s on %s',
			(pixels, screenSize) => {
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

				expect(result).toBeTruthy();
			},
		);

		it.each([
			[1200, 'mobile'],
			[1500, 'desktop'],
		])(
			'should NOT display ad if number of pixels without an ad is less than %s on %s',
			(pixels, screenSize) => {
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

				expect(result).toBeFalsy();
			},
		);
	});
});
