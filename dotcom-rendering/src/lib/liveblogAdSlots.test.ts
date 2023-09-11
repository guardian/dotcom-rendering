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
		describe('desktop', () => {
			it('should return zero when there are zero elements', () => {
				expect(calculateApproximateBlockHeight([], false)).toEqual(0);
			});
		});
		describe('mobile', () => {
			it('should return zero when there are zero elements', () => {
				expect(calculateApproximateBlockHeight([], true)).toEqual(0);
			});
		});
	});

	describe('text block elements', () => {
		describe('desktop', () => {
			const textLineHeight = 23.8;
			const margin = 14;

			it('should return the correct height for varying line length', () => {
				expect(
					calculateApproximateBlockHeight(
						textElementOneLineDesktop,
						false,
					),
				).toEqual(textLineHeight + margin + defaultBlockSpacing);
				expect(
					calculateApproximateBlockHeight(
						textElementTwoLinesDestkop,
						false,
					),
				).toEqual(2 * textLineHeight + margin + defaultBlockSpacing);
			});

			it('should return the correct height when there are multiple elements', () => {
				expect(
					calculateApproximateBlockHeight(
						multipleTextElements,
						false,
					),
				).toEqual(
					2 * textLineHeight + 2 * margin + defaultBlockSpacing,
				);
			});
		});

		describe('mobile', () => {
			const textLineHeight = 23.8;
			const margin = 14;

			it('should return the correct height for varying line length', () => {
				expect(
					calculateApproximateBlockHeight(
						textElementOneLineMobile,
						true,
					),
				).toEqual(textLineHeight + margin + defaultBlockSpacing);
				expect(
					calculateApproximateBlockHeight(
						textElementTwoLinesMobile,
						true,
					),
				).toEqual(2 * textLineHeight + margin + defaultBlockSpacing);
			});

			it('should return the correct height when there are multiple elements', () => {
				expect(
					calculateApproximateBlockHeight(multipleTextElements, true),
				).toEqual(
					2 * textLineHeight + 2 * margin + defaultBlockSpacing,
				);
			});
		});
	});

	describe('youtube block elements', () => {
		describe('desktop', () => {
			it('should return the correct height', () => {
				const heightExcludingText = 350;
				const margin = 12;

				expect(
					calculateApproximateBlockHeight(youtubeElement, false),
				).toEqual(heightExcludingText + margin + defaultBlockSpacing);
			});
		});
		describe('mobile', () => {
			it('should return the correct height', () => {
				const heightExcludingText = 195;
				const margin = 12;

				expect(
					calculateApproximateBlockHeight(youtubeElement, true),
				).toEqual(heightExcludingText + margin + defaultBlockSpacing);
			});
		});
	});
});

describe('shouldDisplayAd', () => {
	it('should NOT display an ad if this is the final block', () => {
		const block = 5;
		const totalBlocks = 5;
		const numAdsInserted = 1;
		const numPixelsWithoutAdvert = 5000;

		const result = shouldDisplayAd(
			block,
			totalBlocks,
			numAdsInserted,
			numPixelsWithoutAdvert,
			false,
		);

		expect(result).toBeFalsy();
	});

	it('should NOT insert another ad slot if we have reached the limit.', () => {
		const block = 5;
		const totalBlocks = 10;
		const numAdsInserted = 8;
		const numPixelsWithoutAdvert = 5000;

		const resultDesktop = shouldDisplayAd(
			block,
			totalBlocks,
			numAdsInserted,
			numPixelsWithoutAdvert,
			false,
		);
		const resultMobile = shouldDisplayAd(
			block,
			totalBlocks,
			numAdsInserted,
			numPixelsWithoutAdvert,
			true,
		);

		expect(resultDesktop).toBeFalsy();
		expect(resultMobile).toBeFalsy();
	});

	describe('inserting the first ad slot', () => {
		it('should display ad if this is the first block', () => {
			const block = 1;
			const totalBlocks = 10;
			const numAdsInserted = 0;
			const numPixelsWithoutAdvert = 550;

			const resultDesktop = shouldDisplayAd(
				block,
				totalBlocks,
				numAdsInserted,
				numPixelsWithoutAdvert,
				false,
			);
			const resultMobile = shouldDisplayAd(
				block,
				totalBlocks,
				numAdsInserted,
				numPixelsWithoutAdvert,
				false,
			);

			expect(resultDesktop).toBeTruthy();
			expect(resultMobile).toBeTruthy();
		});
	});

	describe('inserting further ad slots', () => {
		describe('desktop', () => {
			it('should display ad if number of pixels without an ad is more than 1500', () => {
				const block = 5;
				const totalBlocks = 10;
				const numAdsInserted = 1;
				const numPixelsWithoutAdvert = 1550;

				const result = shouldDisplayAd(
					block,
					totalBlocks,
					numAdsInserted,
					numPixelsWithoutAdvert,
					false,
				);

				expect(result).toBeTruthy();
			});

			it('should NOT display ad if number of pixels without an ad is less than 1500', () => {
				const block = 5;
				const totalBlocks = 10;
				const numAdsInserted = 1;
				const numPixelsWithoutAdvert = 1450;

				const result = shouldDisplayAd(
					block,
					totalBlocks,
					numAdsInserted,
					numPixelsWithoutAdvert,
					false,
				);

				expect(result).toBeFalsy();
			});
		});
		describe('mobile', () => {
			it('should display ad if number of pixels without an ad is more than 1200', () => {
				const block = 5;
				const totalBlocks = 10;
				const numAdsInserted = 1;
				const numPixelsWithoutAdvert = 1250;

				const result = shouldDisplayAd(
					block,
					totalBlocks,
					numAdsInserted,
					numPixelsWithoutAdvert,
					true,
				);

				expect(result).toBeTruthy();
			});

			it('should NOT display ad if number of pixels without an ad is less than 1200', () => {
				const block = 5;
				const totalBlocks = 10;
				const numAdsInserted = 1;
				const numPixelsWithoutAdvert = 1150;

				const result = shouldDisplayAd(
					block,
					totalBlocks,
					numAdsInserted,
					numPixelsWithoutAdvert,
					true,
				);

				expect(result).toBeFalsy();
			});
		});
	});
});
