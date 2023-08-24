import type { FEElement } from '../types/content';
import {
	calculateApproximateBlockHeight,
	shouldDisplayAd,
} from './liveblogAdSlots';

describe('calculateApproximateBlockHeight', () => {
	const textElementOneLine: FEElement[] = [
		{
			elementId: '1',
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: `<p>${'a'.repeat(39)}</p>`,
		},
	];

	const textElementTwoLines: FEElement[] = [
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
			html: `<p>${'a'.repeat(70)}</p>`,
		},
		{
			elementId: '2',
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: `<p>${'a'.repeat(70)}</p>`,
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
	const defaultElementSpacing = 12;

	describe('zero elements', () => {
		it('should return zero when there are zero elements', () => {
			expect(calculateApproximateBlockHeight([], false)).toEqual(0);
		});
	});

	describe('text block elements', () => {
		const textLineHeight = 25.5;

		it('should return the correct height for varying line length', () => {
			expect(
				calculateApproximateBlockHeight(textElementOneLine, false),
			).toEqual(
				textLineHeight + defaultBlockSpacing + defaultElementSpacing,
			);
			expect(
				calculateApproximateBlockHeight(textElementTwoLines, false),
			).toEqual(
				2 * textLineHeight +
					defaultBlockSpacing +
					defaultElementSpacing,
			);
		});

		it('should return the correct height when there are multiple elements', () => {
			expect(
				calculateApproximateBlockHeight(multipleTextElements, false),
			).toEqual(201);
		});
	});

	describe('youtube block elements', () => {
		it('should return the correct height', () => {
			expect(
				calculateApproximateBlockHeight(youtubeElement, false),
			).toEqual(239 + defaultBlockSpacing + defaultElementSpacing);
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

		const result = shouldDisplayAd(
			block,
			totalBlocks,
			numAdsInserted,
			numPixelsWithoutAdvert,
			false,
		);

		expect(result).toBeFalsy();
	});

	describe('inserting the first ad slot', () => {
		it('should display ad if this is the first block', () => {
			const block = 1;
			const totalBlocks = 10;
			const numAdsInserted = 0;
			const numPixelsWithoutAdvert = 550;

			const result = shouldDisplayAd(
				block,
				totalBlocks,
				numAdsInserted,
				numPixelsWithoutAdvert,
				false,
			);

			expect(result).toBeTruthy();
		});
	});

	describe('inserting further ad slots', () => {
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
});
