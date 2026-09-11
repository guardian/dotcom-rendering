import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import { Standard } from '../../fixtures/generated/fe-articles/Standard';
import { enhanceArticleType } from '../types/article';
import { canRenderAds } from './canRenderAds';

const standardPage = enhanceArticleType(Standard, 'Web');

void nodeDescribe('canRenderAds', () => {
	void nodeIt('shows ads by default', () => {
		assert.equal(canRenderAds(standardPage.frontendData), true);
	});

	void nodeIt('does not show ads if user is ad-free', () => {
		const adFreePage = Object.assign({}, standardPage.frontendData);
		adFreePage.isAdFreeUser = true;

		assert.equal(canRenderAds(adFreePage), false);
	});

	void nodeIt('does not show ads if page should not display them', () => {
		const adFreePage = Object.assign({}, standardPage.frontendData);
		adFreePage.shouldHideAds = true;

		assert.equal(canRenderAds(adFreePage), false);
	});
});
