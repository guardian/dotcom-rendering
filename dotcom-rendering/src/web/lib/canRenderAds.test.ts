import { Standard as standardPage } from '../../../fixtures/generated/articles/Standard';
import { canRenderAds } from './canRenderAds';

describe('canRenderAds', () => {
	it('shows ads by default', () => {
		expect(canRenderAds(standardPage)).toBe(true);
	});

	it('does not show ads if user is ad-free', () => {
		const adFreePage = Object.assign({}, standardPage);
		adFreePage.isAdFreeUser = true;

		expect(canRenderAds(adFreePage)).toBe(false);
	});

	it('does not show ads if page should not display them', () => {
		const adFreePage = Object.assign({}, standardPage);
		adFreePage.shouldHideAds = true;

		expect(canRenderAds(adFreePage)).toBe(false);
	});

	it('does not show ads if user is in the PDC test variant', () => {
		const adFreePage = Object.assign({}, standardPage);
		adFreePage.config.abTests.poorDeviceConnectivityVariant = 'variant';

		expect(canRenderAds(adFreePage)).toBe(false);
	});
});
