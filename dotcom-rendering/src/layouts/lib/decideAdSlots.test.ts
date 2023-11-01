import {
	decideFrontsBannerAdSlot,
	decideMerchHighAndMobileAdSlots,
} from './decideAdSlots';

describe('decideMerchHighAndMobileAdSlots', () => {
	// default parameters
	const index = 4;
	const collectionCount = 10;
	const isPaidContent = false;
	const mobileAdPositions: number[] = [];
	const hasPageSkin = false;

	it("should return null if we shouldn't render ads", () => {
		const result = decideMerchHighAndMobileAdSlots(
			false,
			index,
			collectionCount,
			isPaidContent,
			mobileAdPositions,
			hasPageSkin,
		);

		expect(result).toBeNull();
	});
});

describe('decideFrontsBannerAdSlot', () => {
	// default parameters
	const renderAds = true;
	const hasPageSkin = false;
	const index = 2;
	const desktopAdPositions = [2, 5];

	it("should return null if we shouldn't render ads", () => {
		const result = decideFrontsBannerAdSlot(
			false,
			hasPageSkin,
			index,
			desktopAdPositions,
		);

		expect(result).toBeNull();
	});

	it("should return null if there's a pageskin", () => {
		const result = decideFrontsBannerAdSlot(
			renderAds,
			true,
			index,
			desktopAdPositions,
		);

		expect(result).toBeNull();
	});

	test.each([
		[[2, 5], 3],
		[[2, 5], 0],
		[[], 1],
	])(
		'should return null if desktopAdPositions %p does NOT contain index %i',
		(adPositions, i) => {
			const result = decideFrontsBannerAdSlot(
				renderAds,
				hasPageSkin,
				i,
				adPositions,
			);

			expect(result).toBeNull();
		},
	);

	test.each([
		[[2, 5], 2],
		[[2, 5], 5],
		[[1], 1],
	])(
		'should NOT return null if desktopAdPositions %p contains index %i',
		(adPositions, i) => {
			const result = decideFrontsBannerAdSlot(
				renderAds,
				hasPageSkin,
				i,
				adPositions,
			);

			expect(result).not.toBeNull();
		},
	);
});
