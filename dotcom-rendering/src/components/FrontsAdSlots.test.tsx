import { render } from '@testing-library/react';
import {
	FrontsBannerAdSlot,
	MerchHighAdSlot,
	MobileAdSlot,
} from './FrontsAdSlots';

describe('MobileAdSlot', () => {
	it("should return null if we shouldn't render ads", () => {
		const { container } = render(
			<MobileAdSlot renderAds={false} adSlotIndex={4} />,
		);

		expect(container.innerHTML).toBe('');
	});

	it('should render ad slot if renderAds is true', () => {
		const { container } = render(
			<MobileAdSlot renderAds={true} adSlotIndex={4} />,
		);

		expect(container.innerHTML).not.toBe('');
		expect(container.innerHTML).toMatch('ad slot inline');
	});
});

describe('MerchHighAdSlot', () => {
	it("should return null if we shouldn't render ads", () => {
		const { container } = render(
			<MerchHighAdSlot
				renderAds={false}
				hasPageSkin={false}
				isPaidContent={false}
				collectionCount={4}
			/>,
		);

		expect(container.innerHTML).toBe('');
	});

	it('should return null if there is a page skin', () => {
		const { container } = render(
			<MerchHighAdSlot
				renderAds={true}
				hasPageSkin={true}
				isPaidContent={false}
				collectionCount={4}
			/>,
		);

		expect(container.innerHTML).toBe('');
	});

	it('should return null if front has 2 or fewer containers', () => {
		const { container } = render(
			<MerchHighAdSlot
				renderAds={true}
				hasPageSkin={false}
				isPaidContent={false}
				collectionCount={2}
			/>,
		);

		expect(container.innerHTML).toBe('');
	});

	it('should return null if it is paid content and front has 1 or fewer containers', () => {
		const { container } = render(
			<MerchHighAdSlot
				renderAds={true}
				hasPageSkin={false}
				isPaidContent={true}
				collectionCount={1}
			/>,
		);

		expect(container.innerHTML).toBe('');
	});

	it('should render the merch high slot if more than 2 containers', () => {
		const { container } = render(
			<MerchHighAdSlot
				renderAds={true}
				hasPageSkin={false}
				isPaidContent={false}
				collectionCount={4}
			/>,
		);

		expect(container.innerHTML).not.toBe('');
		expect(container.innerHTML).toMatch('ad slot merchandising-high');
	});
});

describe('FrontsBannerAdSlot', () => {
	it("should return null if we shouldn't render ads", () => {
		const { container } = render(
			<FrontsBannerAdSlot
				renderAds={false}
				hasPageSkin={false}
				adSlotIndex={2}
			/>,
		);

		expect(container.innerHTML).toBe('');
	});

	it("should return null if there's a pageskin", () => {
		const { container } = render(
			<FrontsBannerAdSlot
				renderAds={true}
				hasPageSkin={true}
				adSlotIndex={2}
			/>,
		);

		expect(container.innerHTML).toBe('');
	});

	it('should render ad slot if there is no page skin and renderAds is true', () => {
		const { container } = render(
			<FrontsBannerAdSlot
				renderAds={true}
				hasPageSkin={false}
				adSlotIndex={2}
			/>,
		);

		expect(container.innerHTML).not.toBe('');
		expect(container.innerHTML).toMatch('ad slot fronts-banner');
	});
});
