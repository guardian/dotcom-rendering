import type { MutableRefObject } from 'react';
import {
	frontsBannerExcludedCollections,
	frontsBannerExcludedPages,
} from '../../lib/frontsBannerExclusions';
import {
	decideFrontsBannerAdSlot,
	decideMerchHighAndMobileAdSlots,
} from './decideAdSlots';

jest.mock('../../lib/getAdPositions', () => ({
	getMerchHighPosition: jest.fn(() => 4),
}));

describe('decideMerchHighAndMobileAdSlots', () => {
	// default parameters
	const index = 4;
	const collectionCount = 10;
	const isPaidContent = false;
	const mobileAdPositions: number[] = [];
	const hasPageSkin = false;
	const showBannerAds = true;

	it("should return null if we shouldn't render ads", () => {
		const result = decideMerchHighAndMobileAdSlots(
			false,
			index,
			collectionCount,
			isPaidContent,
			mobileAdPositions,
			hasPageSkin,
			showBannerAds,
		);

		expect(result).toBeNull();
	});
});

describe('decideFrontsBannerAdSlot', () => {
	const renderAds = true;
	const hasPageSkin = false;
	const numBannerAdsInserted: MutableRefObject<number> = {
		current: 0,
	};
	const showBannerAds = true;
	const index = 2;
	const pageId = 'uk';
	const collectionName = 'Sport';
	const isInFrontsBannerTest = false;
	const targetedCollections = [
		'Spotlight',
		'Opinion',
		'Sport',
		'Around the world',
		'Take part',
		'Explore',
		'In pictures',
	];

	it("should return null if we shouldn't render ads", () => {
		const result = decideFrontsBannerAdSlot(
			false,
			hasPageSkin,
			numBannerAdsInserted,
			showBannerAds,
			index,
			pageId,
			collectionName,
			isInFrontsBannerTest,
			targetedCollections,
		);

		expect(result).toBeNull();
	});

	it("should return null if there's a pageskin", () => {
		const result = decideFrontsBannerAdSlot(
			renderAds,
			true,
			numBannerAdsInserted,
			showBannerAds,
			index,
			pageId,
			collectionName,
			isInFrontsBannerTest,
			targetedCollections,
		);

		expect(result).toBeNull();
	});

	it('should NOT return null if the frontsBannerDcr feature switch is ON', () => {
		const result = decideFrontsBannerAdSlot(
			renderAds,
			hasPageSkin,
			numBannerAdsInserted,
			true,
			index,
			pageId,
			collectionName,
			isInFrontsBannerTest,
			targetedCollections,
		);

		expect(result).not.toBeNull();
	});

	it('should return null if the frontsBannerDcr feature switch is OFF', () => {
		const result = decideFrontsBannerAdSlot(
			renderAds,
			hasPageSkin,
			numBannerAdsInserted,
			false,
			index,
			pageId,
			collectionName,
			isInFrontsBannerTest,
			targetedCollections,
		);

		expect(result).toBeNull();
	});

	describe('the pageId is specified in frontsBannerAdCollections', () => {
		it('should NOT return null if there is a key value match between collection and page', () => {
			const result = decideFrontsBannerAdSlot(
				renderAds,
				hasPageSkin,
				numBannerAdsInserted,
				showBannerAds,
				index,
				pageId,
				'Sport',
				isInFrontsBannerTest,
				targetedCollections,
			);

			expect(result).not.toBeNull();
		});

		it('should return null if there is NOT a key value match between collection and page', () => {
			const result = decideFrontsBannerAdSlot(
				renderAds,
				hasPageSkin,
				numBannerAdsInserted,
				showBannerAds,
				index,
				pageId,
				'Not a collection',
				isInFrontsBannerTest,
				targetedCollections,
			);

			expect(result).toBeNull();
		});
	});

	describe('the pageId is NOT specified in frontsBannerAdCollections', () => {
		test.each([
			[2, false],
			[3, true],
			[4, true],
			[5, false],
		])(
			'it should only return null if the collection index + 1 is divisible by 3',
			(i, isNull) => {
				const result = decideFrontsBannerAdSlot(
					renderAds,
					hasPageSkin,
					numBannerAdsInserted,
					showBannerAds,
					i,
					'society',
					collectionName,
					isInFrontsBannerTest,
					targetedCollections,
				);

				if (isNull) {
					expect(result).toBeNull();
				} else {
					expect(result).not.toBeNull();
				}
			},
		);

		it('should return null if there is an exclusion for the pageId & collection', () => {
			frontsBannerExcludedCollections.myPage = ['Excluded collection'];

			const result = decideFrontsBannerAdSlot(
				renderAds,
				hasPageSkin,
				numBannerAdsInserted,
				showBannerAds,
				index,
				'myPage',
				'Excluded collection',
				isInFrontsBannerTest,
				[],
			);

			expect(result).toBeNull();
		});

		it('should return null if there is an exclusion for the page', () => {
			frontsBannerExcludedPages.push('Excluded page');

			const result = decideFrontsBannerAdSlot(
				renderAds,
				hasPageSkin,
				numBannerAdsInserted,
				showBannerAds,
				index,
				'Excluded page',
				collectionName,
				isInFrontsBannerTest,
				[],
			);

			expect(result).toBeNull();
		});

		it('should NOT return null if there is not an exclusion for the page', () => {
			frontsBannerExcludedPages.push('Excluded page');

			const result = decideFrontsBannerAdSlot(
				renderAds,
				hasPageSkin,
				numBannerAdsInserted,
				showBannerAds,
				index,
				'Included page',
				collectionName,
				isInFrontsBannerTest,
				[],
			);

			expect(result).not.toBeNull();
		});

		it('should return null if the maximum number of ads have been inserted', () => {
			const result = decideFrontsBannerAdSlot(
				renderAds,
				hasPageSkin,
				{ current: 6 },
				showBannerAds,
				index,
				'society',
				collectionName,
				isInFrontsBannerTest,
				targetedCollections,
			);

			expect(result).toBeNull();
		});

		it('should NOT return null if one less than the maximum number of ads have been inserted', () => {
			const result = decideFrontsBannerAdSlot(
				renderAds,
				hasPageSkin,
				{ current: 5 },
				showBannerAds,
				index,
				'society',
				collectionName,
				isInFrontsBannerTest,
				targetedCollections,
			);

			expect(result).not.toBeNull();
		});
	});
});
