import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Standard } from '../../fixtures/generated/fe-articles/Standard';
import { enhanceArticleType } from '../types/article';
import { canRenderAds } from './canRenderAds';

const standardPage = enhanceArticleType(Standard, 'Web');

void describe('canRenderAds', () => {
	void it('shows ads by default', () => {
		assert.equal(canRenderAds(standardPage.frontendData), true);
	});

	void it('does not show ads if user is ad-free', () => {
		const adFreePage = Object.assign({}, standardPage.frontendData);
		adFreePage.isAdFreeUser = true;

		assert.equal(canRenderAds(adFreePage), false);
	});

	void it('does not show ads if page should not display them', () => {
		const adFreePage = Object.assign({}, standardPage.frontendData);
		adFreePage.shouldHideAds = true;

		assert.equal(canRenderAds(adFreePage), false);
	});
});
