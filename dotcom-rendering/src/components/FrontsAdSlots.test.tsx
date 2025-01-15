import { render } from '@testing-library/react';
import { FrontsBannerAdSlot, MerchHighOrMobileAdSlot } from './FrontsAdSlots';

describe('MerchHighOrMobileAdSlot', () => {
	it("should return null if we shouldn't render ads", () => {
		const { container } = render(
			<MerchHighOrMobileAdSlot
				renderAds={false}
				index={4}
				collectionCount={10}
				isPaidContent={false}
				mobileAdPositions={[]}
				hasPageSkin={false}
			/>,
		);

		expect(container.innerHTML).toBe('');
	});
});

describe('FrontsBannerAdSlot', () => {
	it("should return null if we shouldn't render ads", () => {
		const { container } = render(
			<FrontsBannerAdSlot
				renderAds={false}
				hasPageSkin={false}
				index={2}
				desktopAdPositions={[2, 5]}
			/>,
		);

		expect(container.innerHTML).toBe('');
	});

	it("should return null if there's a pageskin", () => {
		const { container } = render(
			<FrontsBannerAdSlot
				renderAds={true}
				hasPageSkin={true}
				index={2}
				desktopAdPositions={[2, 5]}
			/>,
		);

		expect(container.innerHTML).toBe('');
	});

	test.each([
		[[2, 5], 3],
		[[2, 5], 0],
		[[], 1],
	])(
		'should return null if desktopAdPositions %p does NOT contain index %i',
		(adPositions, i) => {
			const { container } = render(
				<FrontsBannerAdSlot
					renderAds={true}
					hasPageSkin={false}
					index={i}
					desktopAdPositions={adPositions}
				/>,
			);

			expect(container.innerHTML).toBe('');
		},
	);

	test.each([
		[[2, 5], 2],
		[[2, 5], 5],
		[[1], 1],
	])(
		'should NOT return null if desktopAdPositions %p contains index %i',
		(adPositions, i) => {
			const { container } = render(
				<FrontsBannerAdSlot
					renderAds={true}
					hasPageSkin={false}
					index={i}
					desktopAdPositions={adPositions}
				/>,
			);

			expect(container.innerHTML).not.toBe('');
			expect(container.innerHTML).toMatch('ad-slot-container');
		},
	);
});
