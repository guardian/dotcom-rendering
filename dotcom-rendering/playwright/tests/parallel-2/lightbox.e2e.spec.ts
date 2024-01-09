import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { disableCMP } from 'playwright/lib/cmp';
import { loadPageWithOverrides } from 'playwright/lib/load-page';
import {
	expectToBeVisible,
	expectToNotBeVisible,
} from 'playwright/lib/locators';
import { Live as LiveBlog } from '../../../fixtures/generated/articles/Live';
import { PhotoEssay as photoEssayArticle } from '../../../fixtures/generated/articles/PhotoEssay';

// LIGHTBOX RL notes
// reload pops an open lightbox out of fullscreen
// reload reopens the lightbox if it was open
// reload shows a flash of the article before the lightbox opens
// pressing left and right sometimes causes the multiple images to skip

/**
 * Waiting is needed because the url is updated by JS and not immediately by a page load
 */
const waitForUrlToContain = async (page: Page, value: string) => {
	return page.waitForFunction(
		(args) => {
			const url = window.location.href;
			return url.includes(args.value);
		},
		{ value },
		{ polling: 250, timeout: 30_000 },
	);
};

/**
 * Wait for an element to have an attribute value
 */
const waitForAttribute = async ({
	page,
	selector,
	attributeName,
	attributeValue,
}: {
	page: Page;
	selector: string;
	attributeName: string;
	attributeValue: string;
}) => {
	return page.waitForFunction(
		(args) => {
			const elem = document.querySelector(args.selector);
			return (
				elem?.getAttribute(args.attributeName) === args.attributeValue
			);
		},
		{ selector, attributeName, attributeValue },
		{ polling: 250, timeout: 30_000 },
	);
};

/**
 * Playwright believes image slides are visible even when off screen
 * So instead of using expectToBeVisible check if it is in the viewport
 */
const expectToBeInViewport = async (page: Page, selector: string) => {
	return expect(page.locator(selector)).toBeInViewport();
};

/**
 * Playwright believes image slides are visible even when off screen
 * So instead of using expectToNotBeVisible check if it is NOT in the viewport
 */
const expectToNotBeInViewport = async (page: Page, selector: string) => {
	return expect(page.locator(selector)).not.toBeInViewport();
};

test.describe('Lightbox', () => {
	test('should open the lightbox when an expand button is clicked', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		await loadPageWithOverrides(page, photoEssayArticle, {
			configOverrides: { abTests: { lightboxVariant: 'variant' } },
		});

		await expectToNotBeVisible(page, '#gu-lightbox');

		// Open lightbox using the second button on the page (the first is main media)
		await page.locator('button.open-lightbox').nth(1).click();

		await expectToBeVisible(page, '#gu-lightbox');
		// We expect the second image to be showing because the first is the main media
		// which doesn't have a button in this case because it's an immersive article.
		await expect(
			page.locator('nav [data-testid="lightbox-selected"]'),
		).toContainText('2/23');
		await expectToBeVisible(page, 'li[data-index="2"] img');
	});

	test('should open the lightbox when an image is clicked', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		await loadPageWithOverrides(page, photoEssayArticle, {
			configOverrides: {
				abTests: { lightboxVariant: 'variant' },
			},
		});

		await expectToNotBeVisible(page, '#gu-lightbox');

		// Open lightbox by clicking on the fourth image within the article body
		// Lightbox should open at the fifth image as the first image is the main media image
		await page.locator('article img').nth(3).click({ force: true });

		await expectToBeVisible(page, '#gu-lightbox');

		await expect(
			page.locator('nav [data-testid="lightbox-selected"]'),
		).toContainText('5/23');
		await expectToBeVisible(page, 'li[data-index="5"] img');
	});

	test('should trap focus', async ({ context, page }) => {
		await disableCMP(context);
		await loadPageWithOverrides(page, photoEssayArticle, {
			configOverrides: {
				abTests: { lightboxVariant: 'variant' },
			},
		});

		await page.locator('article img').first().click({ force: true });
		await expectToBeVisible(page, '#gu-lightbox');

		await page.keyboard.press('Tab');
		await expect(page.locator('button.close')).toBeFocused();
		await expect(page.locator('button.next')).not.toBeFocused();

		await page.keyboard.press('Tab');
		await expect(page.locator('button.next')).toBeFocused();

		await page.keyboard.press('Tab');
		await page.keyboard.press('Tab');
		await expect(page.locator('button.info')).toBeFocused();

		// Focus should wrap back
		await page.keyboard.press('Tab');
		await expect(page.locator('button.info')).not.toBeFocused();
		await expect(page.locator('button.close')).toBeFocused();

		await page.keyboard.press('Tab');
		await expect(page.locator('button.next')).toBeFocused();

		await page.keyboard.press('Tab');
		await expect(page.locator('button.previous')).toBeFocused();

		await page.keyboard.press('Tab');
		await expect(page.locator('button.info')).toBeFocused();

		await page.keyboard.press('Tab');
		await expect(page.locator('button.close')).toBeFocused();

		await page.keyboard.press('Tab');
		await expect(page.locator('button.next')).toBeFocused();

		await page.keyboard.press('Tab');
		await expect(page.locator('button.previous')).toBeFocused();
	});

	test('should respond to keyboard shortcuts and image clicks', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		await loadPageWithOverrides(page, photoEssayArticle, {
			configOverrides: {
				abTests: { lightboxVariant: 'variant' },
			},
		});

		await expectToNotBeVisible(page, '#gu-lightbox');

		// Open lightbox using the second button on the page (the first is main media)
		await page.locator('button.open-lightbox').nth(1).click();
		await expectToBeVisible(page, '#gu-lightbox');

		// Close lightbox using q key
		await page.keyboard.press('q');
		await expectToNotBeVisible(page, '#gu-lightbox');

		// TODO check the visibility checks are doing the right thing
		// Should add waits to ensure the images to be visible?

		// We should be able to navigate using arrow keys
		await page.locator('button.open-lightbox').nth(1).click();
		await expectToNotBeInViewport(page, 'li[data-index="3"]');
		await page.keyboard.press('ArrowRight');
		await expectToBeInViewport(page, 'li[data-index="3"]');
		await page.keyboard.press('ArrowRight');
		await expectToNotBeInViewport(page, 'li[data-index="3"]');
		await expectToBeInViewport(page, 'li[data-index="4"]');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		await expectToBeInViewport(page, 'li[data-index="7"]');
		await page.keyboard.press('ArrowLeft');
		await expectToBeInViewport(page, 'li[data-index="6"]');

		// Going further back from position 1 should take us
		// round to the end and vice versa
		await page.keyboard.press('ArrowLeft');
		await page.keyboard.press('ArrowLeft');
		await page.keyboard.press('ArrowLeft');
		await page.keyboard.press('ArrowLeft');
		await page.keyboard.press('ArrowLeft');
		await page.keyboard.press('ArrowLeft');
		await expectToNotBeInViewport(page, 'li[data-index="1"]');
		await expectToBeInViewport(page, 'li[data-index="23"]');
		await page.keyboard.press('ArrowRight');
		await expectToNotBeInViewport(page, 'li[data-index="23"]');
		await expectToBeInViewport(page, 'li[data-index="1"]');

		// Showing and hiding the info caption using 'i'
		await expectToBeVisible(page, 'li[data-index="1"] aside');
		await page.keyboard.press('i');
		await expectToNotBeVisible(page, 'li[data-index="1"] aside');
		await page.keyboard.press('i');
		await expectToBeVisible(page, 'li[data-index="1"] aside');

		// Showing and hiding the caption by clicking
		await page.locator('li[data-index="1"] img').click();
		await expectToNotBeVisible(page, 'li[data-index="1"] aside');
		await page.locator('li[data-index="1"] picture').click();
		await expectToBeVisible(page, 'li[data-index="1"] aside');

		// Showing and hiding using arrow keys
		await page.keyboard.press('ArrowDown');
		await expectToNotBeVisible(page, 'li[data-index="1"] aside');
		await page.keyboard.press('ArrowUp');
		await expectToBeVisible(page, 'li[data-index="1"] aside');

		// Closing the lightbox using escape
		await page.keyboard.press('Escape');
		await expectToNotBeVisible(page, '#gu-lightbox');
	});

	test('should download adjacent images before they are viewed', async ({
		context,
		page,
	}) => {
		function getImage(nth: number) {
			return page.locator(`li[data-index="${nth}"] img`);
		}

		async function imageHasLoadingValue(nth: number, loadingValue: string) {
			// TODO check if waiting for the attribute to be set is correct vs an immediate check
			return waitForAttribute({
				page,
				selector: `li[data-index="${nth}"] img`,
				attributeName: 'loading',
				attributeValue: loadingValue,
			});
		}

		await disableCMP(context);
		await loadPageWithOverrides(page, photoEssayArticle, {
			configOverrides: {
				abTests: { lightboxVariant: 'variant' },
			},
		});

		// eq(6) here means the 7th button is clicked (base zero)
		await page.locator('button.open-lightbox').nth(6).click();

		// We validate that adjacent images get downloaded early by checking the
		// value of the `loading` attribute
		await imageHasLoadingValue(5, 'lazy');
		await imageHasLoadingValue(6, 'eager');
		await expect(getImage(7)).toBeVisible();

		await imageHasLoadingValue(8, 'eager');
		await imageHasLoadingValue(9, 'lazy');

		// Move to the next image - position 8
		await page.keyboard.press('ArrowRight');
		await imageHasLoadingValue(6, 'eager');
		await imageHasLoadingValue(7, 'eager');
		await expect(getImage(8)).toBeVisible();
		await imageHasLoadingValue(9, 'eager');
		await imageHasLoadingValue(10, 'lazy');

		// Move to the next image - position 9
		await page.keyboard.press('ArrowRight');
		await imageHasLoadingValue(10, 'eager');
		await imageHasLoadingValue(11, 'lazy');

		// Move to the next image - position 10
		await page.keyboard.press('ArrowRight');
		await imageHasLoadingValue(11, 'eager');
		await imageHasLoadingValue(12, 'lazy');
	});

	test('should remember my preference for showing the caption', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		await loadPageWithOverrides(page, photoEssayArticle, {
			configOverrides: {
				abTests: { lightboxVariant: 'variant' },
			},
		});

		await page.locator('button.open-lightbox').nth(1).click();
		await expectToBeVisible(page, 'li[data-index="2"] aside');

		// Clicking an image toggles the caption
		await page.locator('li[data-index="2"] img').click();
		await expectToNotBeVisible(page, 'li[data-index="2"] aside');

		// Close lightbox
		await page.keyboard.press('Escape');

		// Re-open lightbox to see if the info aside element is now open
		await page.locator('button.open-lightbox').nth(1).click();
		await expectToNotBeVisible(page, 'li[data-index="2"] aside');

		// Close lightbox
		await page.keyboard.press('Escape');

		// Reload the page to see if my preference for having the caption hidden
		// has been preserved
		await page.reload();
		await page.locator('button.open-lightbox').nth(1).click();
		await expectToBeVisible(page, '#gu-lightbox');
		await expectToNotBeVisible(page, 'li[data-index="2"] aside');

		// Turn the info aside back off and then reload once more to check the
		// caption is again showing by default
		await page.keyboard.press('i');
		await page.reload();
		// TODO: this assertion is failing because the lightbox reopens on page reload
		// double check this is the required behaviour and the test assertion is incorrect
		// await page.locator('button.open-lightbox').nth(1).click();
		await expectToBeVisible(page, 'li[data-index="2"] aside');
	});

	test('should be possible to navigate by scrolling', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		await loadPageWithOverrides(page, photoEssayArticle, {
			configOverrides: {
				abTests: { lightboxVariant: 'variant' },
			},
		});

		await page.locator('button.open-lightbox').nth(1).click();
		await expectToBeVisible(page, 'li[data-index="2"] img');

		// Scroll the 5th image into view

		// Playwright's scrollIntoViewIfNeeded method doesn't work in this case because it believes
		// element is already in view. We use a regular scrollIntoView() instead.
		await page.evaluate(
			(args) => {
				window.document.querySelector(args.selector)?.scrollIntoView();
			},
			{ selector: 'li[data-index="5"] img' },
		);
		await expectToNotBeInViewport(page, 'li[data-index="2"] img');
		await expectToBeVisible(page, 'li[data-index="5"] img');

		await expect(
			page.locator('nav [data-testid="lightbox-selected"]'),
		).toContainText('5/23');

		// Scroll the 1st image into view
		await page.evaluate(
			(args) => {
				window.document.querySelector(args.selector)?.scrollIntoView();
			},
			{ selector: 'li[data-index="1"] img' },
		);
		await expectToBeVisible(page, 'li[data-index="1"] img');
		await expect(
			page.locator('nav [data-testid="lightbox-selected"]'),
		).toContainText('1/23');
	});

	// TODO fix this test
	test.skip('should navigate to the original block when clicking links in captions', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		await loadPageWithOverrides(page, LiveBlog, {
			configOverrides: {
				abTests: { lightboxVariant: 'variant' },
			},
		});

		await page.locator('button.open-lightbox').nth(1).click();
		await expectToBeVisible(page, '#gu-lightbox');

		// The info aside is visible by default
		await expectToBeVisible(page, 'li[data-index="2"] aside');

		// TODO this caption link url is invalid in Playwright
		// Click the caption link
		await page.locator('li[data-index="2"] aside a').click({ force: true });

		// await page
		// 	.locator('li[data-index="2"] aside a')
		// 	.dispatchEvent('click', { force: true });

		await waitForUrlToContain(
			page,
			'?page=with:block-603007c48f08c3cb92a5ca74#block-603007c48f08c3cb92a5ca74',
		);
	});

	test('should use the url to maintain lightbox position', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		await loadPageWithOverrides(page, photoEssayArticle, {
			configOverrides: {
				abTests: { lightboxVariant: 'variant' },
			},
		});

		await page.locator('button.open-lightbox').nth(1).click();
		await expect(
			page.locator('nav [data-testid="lightbox-selected"]'),
		).toContainText('2/23');
		await waitForUrlToContain(page, '#img-2');

		await page.keyboard.press('ArrowRight');
		await waitForUrlToContain(page, '#img-3');

		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		await waitForUrlToContain(page, '#img-6');

		// It should load the lightbox at page load if the url contains an img hash
		await page.reload();
		await expectToBeVisible(page, '#gu-lightbox');
		await expect(
			page.locator('nav [data-testid="lightbox-selected"]'),
		).toContainText('6/23');
	});

	test('should trigger the lightbox to close or open if the user navigates back and forward', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		await loadPageWithOverrides(page, photoEssayArticle, {
			configOverrides: {
				abTests: { lightboxVariant: 'variant' },
			},
		});

		await expectToNotBeVisible(page, '#gu-lightbox');
		// Open lightbox using the second button on the page (the first is main media)
		await page.locator('button.open-lightbox').nth(1).click();
		await expect(
			page.locator('nav [data-testid="lightbox-selected"]'),
		).toContainText('2/23');
		expect(page.url()).toContain('#img-2');

		await page.goBack();
		await expectToNotBeVisible(page, '#gu-lightbox');
		expect(page.url()).not.toContain('#img-2');

		await page.goForward();
		await expectToBeVisible(page, '#gu-lightbox');
		expect(page.url()).toContain('#img-2');
	});
});
