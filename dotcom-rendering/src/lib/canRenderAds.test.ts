import { Standard } from '../../fixtures/generated/fe-articles/Standard';
import { enhanceArticleType } from '../types/article';
import { canRenderAds } from './canRenderAds';

const standardPage = enhanceArticleType(Standard, 'Web');

describe('canRenderAds', () => {
	it('shows ads by default', () => {
		expect(canRenderAds(standardPage.frontendData)).toBe(true);
	});

	it('does not show ads if user is ad-free', () => {
		const adFreePage = Object.assign({}, standardPage.frontendData);
		adFreePage.isAdFreeUser = true;

		expect(canRenderAds(adFreePage)).toBe(false);
	});

	it('does not show ads if page should not display them', () => {
		const adFreePage = Object.assign({}, standardPage.frontendData);
		adFreePage.shouldHideAds = true;

		expect(canRenderAds(adFreePage)).toBe(false);
	});
});
