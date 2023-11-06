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
	const showBannerAds = true;
	const index = 2;
	const desktopAdPositions = [2, 5];

	it("should return null if we shouldn't render ads", () => {
		const result = decideFrontsBannerAdSlot(
			false,
			hasPageSkin,
			showBannerAds,
			index,
			desktopAdPositions,
		);

		expect(result).toBeNull();
	});

	it("should return null if there's a pageskin", () => {
		const result = decideFrontsBannerAdSlot(
			renderAds,
			true,
			showBannerAds,
			index,
			desktopAdPositions,
		);

		expect(result).toBeNull();
	});

	it('should return null if the frontsBannerDcr feature switch is OFF', () => {
		const result = decideFrontsBannerAdSlot(
			renderAds,
			hasPageSkin,
			false,
			index,
			desktopAdPositions,
		);

		expect(result).toBeNull();
	});

	it('should NOT return null if the frontsBannerDcr feature switch is ON', () => {
		const result = decideFrontsBannerAdSlot(
			renderAds,
			hasPageSkin,
			true,
			index,
			desktopAdPositions,
		);

		expect(result).not.toBeNull();
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
				showBannerAds,
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
				showBannerAds,
				i,
				adPositions,
			);

			expect(result).not.toBeNull();
		},
	);
});
