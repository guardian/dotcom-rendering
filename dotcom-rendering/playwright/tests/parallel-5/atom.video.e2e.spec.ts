import { isUndefined } from '@guardian/libs';
import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { expectToBeVisible, expectToNotExist } from 'playwright/lib/locators';
import { cmpAcceptAll, cmpRejectAll } from '../../lib/cmp';
import { waitForIsland } from '../../lib/islands';
import { loadPage } from '../../lib/load-page';

type YouTubeEmbedConfig = {
	adsConfig: {
		nonPersonalizedAd: boolean;
		adTagParameters: {
			cmpGdpr: number;
			cmpGvcd: string;
			cmpVcd: string;
			cust_params: string;
			iu: string;
		};
	};
};

const interceptOphanPlayEvent = ({ page, id }: { page: Page; id: string }) => {
	return page.waitForRequest((request) => {
		const matchUrl = request
			.url()
			.startsWith('http://ophan.theguardian.com/img/2?');
		const searchParams = new URLSearchParams(request.url());
		const videoSearchParam = searchParams.get('video');
		const expectedVideoSearchParam = JSON.stringify({
			id,
			eventType: 'video:content:play',
		});
		return matchUrl && videoSearchParam === expectedVideoSearchParam;
	});
};

const interceptYouTubeEmbed = ({
	page,
	videoId,
	adUnit,
	pageUrl,
	rejectAll,
}: {
	page: Page;
	videoId: string;
	adUnit: string;
	pageUrl: string;
	rejectAll: boolean;
}) => {
	return page.waitForRequest((request) => {
		const matchUrl = request
			.url()
			.startsWith(`https://www.youtube.com/embed/${videoId}?`);
		if (!matchUrl) {
			return false;
		}
		const searchParams = new URLSearchParams(request.url());
		const rawEmbedConfig = searchParams.get('embed_config');
		if (!rawEmbedConfig) {
			return false;
		}
		const embedConfig = JSON.parse(rawEmbedConfig) as YouTubeEmbedConfig;
		const adsConfig = embedConfig.adsConfig;
		const adTagParameters = adsConfig.adTagParameters;
		// cust_params is double encoded
		const custParams = new URLSearchParams(
			decodeURIComponent(adTagParameters.cust_params),
		);
		// check adunit
		const adUnitMatch = adTagParameters.iu === adUnit;
		// check url to check custParams is present
		const urlCustParamMatch = custParams.get('url') === pageUrl;

		// check consent related properties
		// cmpGdpr = consentState.tcfv2.gdprApplies
		const cmpGdprMatch = adTagParameters.cmpGdpr === 1;
		// cmpVcd = consentState.tcfv2.tcString
		const cmpVcdMatch = !isUndefined(adTagParameters.cmpVcd);
		let nonPersonalizedAdMatch = false;
		let cmpGvcdMatch = false;
		if (rejectAll) {
			// user has not given consent for any purpose
			nonPersonalizedAdMatch = adsConfig.nonPersonalizedAd;
			// cmpGvcd = consentState.tcfv2.addtlConsent
			cmpGvcdMatch = adTagParameters.cmpGvcd === '1~';
		} else {
			// user has not given consent for any purpose
			nonPersonalizedAdMatch = !adsConfig.nonPersonalizedAd;
			// cmpGvcd = consentState.tcfv2.addtlConsent
			cmpGvcdMatch = !isUndefined(adTagParameters.cmpGvcd);
		}
		return (
			adUnitMatch &&
			urlCustParamMatch &&
			cmpGdprMatch &&
			cmpVcdMatch &&
			nonPersonalizedAdMatch &&
			cmpGvcdMatch
		);
	});
};

/**
 * Mutes the YouTube player at the given iframe
 *
 * Muting one player will mute all other players so it is sufficient to
 * mute one video on a page with multiple videos.
 */
const muteYouTube = async (page: Page, iframeSelector: string) => {
	const muteButton = page
		.frameLocator(iframeSelector)
		.locator('.ytp-mute-button');
	const muteButtonTitle = await muteButton.getAttribute(
		'data-title-no-tooltip',
	);
	// the mute button is a toggle so check if muting is possible
	if (muteButtonTitle?.startsWith('Mute')) {
		await muteButton.click();
	}
};

test.describe('YouTube Atom', () => {
	test('plays main media video', async ({ page }) => {
		await loadPage(
			page,
			'/Article/https://www.theguardian.com/uk-news/2020/dec/04/edinburgh-hit-by-thundersnow-as-sonic-boom-wakes-residents',
		);
		await cmpAcceptAll(page);

		await waitForIsland(page, 'YoutubeBlockComponent');

		// Make sure overlay is displayed
		const overlaySelector = `[data-testid^="youtube-overlay-S0CE1n-R3OY"]`;
		await expectToBeVisible(page, overlaySelector);

		// YouTube has not initialised
		const hasYouTubeIframeApi = await page.evaluate(() => {
			return !!window.onYouTubeIframeAPIReady;
		});
		expect(hasYouTubeIframeApi).toBeFalsy();

		// Listen for the ophan call made when the video is played
		const ophanPlayEventPromise = interceptOphanPlayEvent({
			page,
			id: 'gu-video-youtube-2b33a7b7-e639-4232-9ecd-0fb920fa8147',
		});

		// Listen for the YouTube embed call made when the video is played
		const youTubeEmbedPromise = interceptYouTubeEmbed({
			page,
			videoId: 'S0CE1n-R3OY',
			adUnit: '/59666047/theguardian.com/uk-news/article/ng',
			pageUrl:
				'/uk-news/2020/dec/04/edinburgh-hit-by-thundersnow-as-sonic-boom-wakes-residents',
			rejectAll: false,
		});

		// Play video
		await page.locator(overlaySelector).click();

		// Mute video
		await muteYouTube(page, `iframe[id^="youtube-video-S0CE1n-R3OY"]`);

		await ophanPlayEventPromise;

		await youTubeEmbedPromise;

		// Video is playing, overlay is gone
		await expectToNotExist(page, overlaySelector);
	});

	test('plays in body video', async ({ page }) => {
		await loadPage(
			page,
			'/Article/https://www.theguardian.com/environment/2021/oct/05/volcanoes-are-life-how-the-ocean-is-enriched-by-eruptions-devastating-on-land',
		);
		await cmpAcceptAll(page);

		await waitForIsland(page, 'YoutubeBlockComponent');

		// Make sure overlay is displayed
		const overlaySelector = `[data-testid^="youtube-overlay-NtN-a6inr1E"]`;
		await expectToBeVisible(page, overlaySelector);

		// YouTube has not initialised
		const hasYouTubeIframeApi = await page.evaluate(() => {
			return !!window.onYouTubeIframeAPIReady;
		});
		expect(hasYouTubeIframeApi).toBeFalsy();

		// Listen for the ophan call made when the video is played
		const ophanPlayEventPromise = interceptOphanPlayEvent({
			page,
			id: 'gu-video-youtube-2bc6f709-865e-49ae-b01b-8fc38eb4e9a7',
		});

		// Listen for the YouTube embed call made when the video is played
		const youTubeEmbedPromise = interceptYouTubeEmbed({
			page,
			videoId: 'NtN-a6inr1E',
			adUnit: '/59666047/theguardian.com/environment/article/ng',
			pageUrl:
				'/environment/2021/oct/05/volcanoes-are-life-how-the-ocean-is-enriched-by-eruptions-devastating-on-land',
			rejectAll: false,
		});

		// Play video
		await page.locator(overlaySelector).click();

		// Mute video
		await muteYouTube(page, `iframe[id^="youtube-video-NtN-a6inr1E"]`);

		await ophanPlayEventPromise;

		await youTubeEmbedPromise;

		// Video is playing, overlay is gone
		await expectToNotExist(page, overlaySelector);
	});

	test('plays when the same video exists both in body and in main media of a blog', async ({
		page,
	}) => {
		await loadPage(
			page,
			'/Article/https://www.theguardian.com/world/live/2022/mar/28/russia-ukraine-war-latest-news-zelenskiy-putin-live-updates?dcr=true',
		);
		await cmpAcceptAll(page);

		// Wait for hydration of all videos
		await waitForIsland(page, 'YoutubeBlockComponent', { nth: 0 });
		await waitForIsland(page, 'YoutubeBlockComponent', { nth: 1 });
		await waitForIsland(page, 'YoutubeBlockComponent', { nth: 2 });

		// Make sure overlays for both videos are displayed
		const mediaDiv = 'div[data-gu-name="media"]';
		const bodyDiv = 'div[data-gu-name="body"]';
		const overlaySelectorforMultipleVideos = `[data-testid^="youtube-overlay-qkC9z-dSAOE"]`;

		await expectToBeVisible(
			page,
			`${mediaDiv} ${overlaySelectorforMultipleVideos}`,
		);

		await expectToBeVisible(
			page,
			`${bodyDiv} ${overlaySelectorforMultipleVideos}`,
		);

		/**
		 * Main media video
		 */

		// Listen for the ophan call made when the video is played
		const ophanPlayEventPromise = interceptOphanPlayEvent({
			page,
			id: 'gu-video-youtube-1e89d5bd-489e-470a-857e-4f30e85b5aec',
		});

		// Listen for the YouTube embed call made when the video is played
		const youTubeEmbedPromise = interceptYouTubeEmbed({
			page,
			videoId: 'qkC9z-dSAOE',
			adUnit: '/59666047/theguardian.com/world/liveblog/ng',
			pageUrl:
				'/world/live/2022/mar/28/russia-ukraine-war-latest-news-zelenskiy-putin-live-updates',
			rejectAll: false,
		});

		// Play main media video
		await page
			.locator(`${mediaDiv} ${overlaySelectorforMultipleVideos}`)
			.click();

		await muteYouTube(
			page,
			`${mediaDiv} iframe[id^="youtube-video-qkC9z-dSAOE"]`,
		);

		// check if the main media video overplay is gone
		await expectToNotExist(
			page,
			`${mediaDiv} ${overlaySelectorforMultipleVideos}`,
		);

		// check if the ophan call and YouTube embed call were made
		await ophanPlayEventPromise;
		await youTubeEmbedPromise;

		/**
		 * Body video
		 */

		// Listen for the ophan call made when the video is played
		const ophanPlayEventPromise2 = interceptOphanPlayEvent({
			page,
			id: 'gu-video-youtube-1e89d5bd-489e-470a-857e-4f30e85b5aec',
		});

		// Listen for the YouTube embed call made when the video is played
		const youTubeEmbedPromise2 = interceptYouTubeEmbed({
			page,
			videoId: 'qkC9z-dSAOE',
			adUnit: '/59666047/theguardian.com/world/liveblog/ng',
			pageUrl:
				'/world/live/2022/mar/28/russia-ukraine-war-latest-news-zelenskiy-putin-live-updates',
			rejectAll: false,
		});

		// Play body video
		await page
			.locator(`${bodyDiv} ${overlaySelectorforMultipleVideos}`)
			.click();

		// check if the body video overplay is gone
		await expectToNotExist(
			page,
			`${bodyDiv} ${overlaySelectorforMultipleVideos}`,
		);

		// check if the ophan call and YouTube embed call were made
		await ophanPlayEventPromise2;
		await youTubeEmbedPromise2;
	});

	test('plays the video if the reader rejects consent', async ({ page }) => {
		await loadPage(
			page,
			'/Article/https://www.theguardian.com/environment/2021/oct/05/volcanoes-are-life-how-the-ocean-is-enriched-by-eruptions-devastating-on-land',
		);
		await cmpRejectAll(page);

		await waitForIsland(page, 'YoutubeBlockComponent');

		// Make sure overlay is displayed
		const overlaySelector = `[data-testid^="youtube-overlay-NtN-a6inr1E"]`;
		await expectToBeVisible(page, overlaySelector);

		// YouTube has not initialised
		const hasYouTubeIframeApi = await page.evaluate(() => {
			return !!window.onYouTubeIframeAPIReady;
		});
		expect(hasYouTubeIframeApi).toBeFalsy();

		// Listen for the ophan call made when the video is played
		const ophanPlayEventPromise = interceptOphanPlayEvent({
			page,
			id: 'gu-video-youtube-2bc6f709-865e-49ae-b01b-8fc38eb4e9a7',
		});

		// Listen for the YouTube embed call made when the video is played
		const youTubeEmbedPromise = interceptYouTubeEmbed({
			page,
			videoId: 'NtN-a6inr1E',
			adUnit: '/59666047/theguardian.com/environment/article/ng',
			pageUrl:
				'/environment/2021/oct/05/volcanoes-are-life-how-the-ocean-is-enriched-by-eruptions-devastating-on-land',
			rejectAll: true,
		});

		// Play video
		await page.locator(overlaySelector).click();

		// Mute video
		await muteYouTube(page, `iframe[id^="youtube-video-NtN-a6inr1E"]`);

		await ophanPlayEventPromise;

		await youTubeEmbedPromise;

		// Video is playing, overlay is gone
		await expectToNotExist(page, overlaySelector);
	});

	test('video is sticky when the user plays a video then scrolls the video out of the viewport', async ({
		page,
	}) => {
		await loadPage(
			page,
			'/Article/https://www.theguardian.com/world/live/2022/mar/28/russia-ukraine-war-latest-news-zelenskiy-putin-live-updates?dcr=true',
		);
		await cmpAcceptAll(page);

		// Wait for hydration of all videos
		await waitForIsland(page, 'YoutubeBlockComponent', { nth: 0 });
		await waitForIsland(page, 'YoutubeBlockComponent', { nth: 1 });
		await waitForIsland(page, 'YoutubeBlockComponent', { nth: 2 });

		const mediaDiv = 'div[data-gu-name="media"]';
		const overlaySelectorforMultipleVideos = `[data-testid^="youtube-overlay-qkC9z-dSAOE"]`;
		const stickySelector = '[data-testid^="youtube-sticky-qkC9z-dSAOE"]';
		const stickyCloseSelector =
			'[data-testid^="youtube-sticky-close-qkC9z-dSAOE"]';

		/**
		 * Main media video
		 */

		// Scroll to main media video
		await page.locator(mediaDiv).scrollIntoViewIfNeeded();

		// Listen for the ophan call made when the video is played
		const ophanPlayEventPromise = interceptOphanPlayEvent({
			page,
			id: 'gu-video-youtube-1e89d5bd-489e-470a-857e-4f30e85b5aec',
		});

		// Play main media video
		await page
			.locator(`${mediaDiv} ${overlaySelectorforMultipleVideos}`)
			.click();

		await ophanPlayEventPromise;

		await muteYouTube(
			page,
			`${mediaDiv} iframe[id^="youtube-video-qkC9z-dSAOE"]`,
		);

		// Scroll past the main media video to the third block
		await page.locator('.block').nth(2).scrollIntoViewIfNeeded();

		// Main media video should be sticky
		await page
			.locator(`${mediaDiv} ${stickySelector}[data-is-sticky="true"]`)
			.waitFor({ state: 'attached', timeout: 10_000 });

		// Scroll to main media video
		await page.locator(mediaDiv).scrollIntoViewIfNeeded();

		// Main media video should NOT be sticky
		await page
			.locator(`${mediaDiv} ${stickySelector}[data-is-sticky="false"]`)
			.waitFor({ state: 'attached', timeout: 10_000 });

		// Scroll past the main media video to the third block
		await page.locator('.block').nth(2).scrollIntoViewIfNeeded();

		// Main media video should be sticky
		await page
			.locator(`${mediaDiv} ${stickySelector}[data-is-sticky="true"]`)
			.waitFor({ state: 'attached', timeout: 10_000 });

		// Close the sticky video
		// A regular click does not work here as the sticky close button requires a hover first
		// to make it visible. Even when using hover() Playwright sees the button as invisible and
		// Playwright (like Cypress) does not allow clicking on invisible elements. Instead we
		// dispatch a click event directly on the element.
		await page
			.locator(`${stickyCloseSelector}`)
			.dispatchEvent('click', { force: true });

		// Main media video should NOT be sticky
		await page
			.locator(`${mediaDiv} ${stickySelector}[data-is-sticky="false"]`)
			.waitFor({ state: 'attached', timeout: 10_000 });
	});
});
