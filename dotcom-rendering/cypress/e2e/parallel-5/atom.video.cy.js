import { cmpIframe } from '../../lib/cmpIframe';
import { privacySettingsIframe } from '../../lib/privacySettingsIframe';
import { storage } from '@guardian/libs';

const interceptPlayEvent = ({ id, times = 1 }) => {
	return cy.intercept(
		{
			url: 'http://ophan.theguardian.com/img/2?**',
			query: {
				video: /(.*)eventType\":\"video:content:play(.*)/,
			},
			times,
		},
		function (req) {
			const url = new URL(req.url);
			const videoValue = url.searchParams.get('video');
			expect(JSON.parse(videoValue)).to.deep.equal({
				id,
				eventType: 'video:content:play',
			});
		},
	);
};

const interceptYouTubeEmbed = ({
	videoId,
	adUnit,
	pageUrl,
	rejectAll,
	times = 1,
}) => {
	return cy.intercept(
		{
			url: `https://www.youtube.com/embed/${videoId}?**`,
			times,
		},
		function (req) {
			// https://guardian.github.io/commercial-request-parser/ is useful to parse YouTube requests
			const url = new URL(req.url);
			const embedConfig = JSON.parse(
				url.searchParams.get('embed_config'),
			);
			const adsConfig = embedConfig.adsConfig;
			const adTagParameters = adsConfig.adTagParameters;
			// cust_params is double encoded
			const custParams = new URLSearchParams(
				decodeURIComponent(adTagParameters.cust_params),
			);
			// check consent related properties
			// cmpGdpr = consentState.tcfv2.gdprApplies
			expect(adTagParameters.cmpGdpr, 'check GDPR applies').to.equal(1);
			// cmpVcd = consentState.tcfv2.tcString
			expect(adTagParameters.cmpVcd, 'check TCFV2 tcString').to.not.be
				.undefined;
			if (rejectAll) {
				// user has not given consent for any purpose
				expect(
					adsConfig.nonPersonalizedAd,
					'check nonPersonalisation is TRUE',
				).to.equal(true);
				// cmpGvcd = consentState.tcfv2.addtlConsent
				expect(
					adTagParameters.cmpGvcd,
					'check TCFV2 additional consent',
				).to.equal('1~');
			} else {
				// user has consented to all purposes
				expect(
					adsConfig.nonPersonalizedAd,
					'check nonPersonalisation is FALSE',
				).to.equal(false);
				// cmpGvcd = consentState.tcfv2.addtlConsent
				expect(
					adTagParameters.cmpGvcd,
					'check TCFV2 additional consent',
				).to.not.be.undefined;
			}
			// check adunit
			expect(adTagParameters.iu, 'check adUnit').to.equal(adUnit);
			// check url to check custParams is present
			expect(custParams.get('url'), 'check url').to.equal(pageUrl);
		},
	);
};

describe('YouTube Atom', function () {
	beforeEach(function () {
		storage.local.set('gu.geo.override', 'GB');
	});

	it('plays main media videos', function () {
		cy.visit(
			'/Article?url=https://www.theguardian.com/uk-news/2020/dec/04/edinburgh-hit-by-thundersnow-as-sonic-boom-wakes-residents',
		);
		cmpIframe().contains("It's your choice");
		cmpIframe().find("[title='Manage my cookies']").click();
		privacySettingsIframe().contains('Privacy settings');
		privacySettingsIframe()
			.find("[title='Accept all']", { timeout: 12000 })
			.click();

		// Wait for hydration
		cy.get('[data-component=youtube-atom]')
			.parent()
			.should('have.attr', 'data-gu-ready', 'true');

		// Make sure overlay is displayed
		const overlaySelector = `[data-cy^="youtube-overlay-S0CE1n-R3OY"]`;
		cy.get(overlaySelector).should('be.visible');

		// YouTube has not initialised
		cy.window().its('onYouTubeIframeAPIReady').should('not.exist');

		// Listen for the ophan call made when the video is played
		interceptPlayEvent({
			id: 'gu-video-youtube-2b33a7b7-e639-4232-9ecd-0fb920fa8147',
		}).as('ophanCall');

		// Listen for the YouTube embed call made when the video is played
		interceptYouTubeEmbed({
			videoId: 'S0CE1n-R3OY',
			adUnit: '/59666047/theguardian.com/uk-news/article/ng',
			pageUrl:
				'/uk-news/2020/dec/04/edinburgh-hit-by-thundersnow-as-sonic-boom-wakes-residents',
			rejectAll: false,
		}).as('youtubeEmbed');

		// Play video
		cy.get(overlaySelector).click();

		cy.wait('@ophanCall', { timeout: 30000 });

		cy.wait('@youtubeEmbed', { timeout: 30000 });

		// Video is playing, overlay is gone
		cy.get(overlaySelector).should('not.exist');
	});

	it('plays in body videos', function () {
		cy.visit(
			'/Article?url=https://www.theguardian.com/environment/2021/oct/05/volcanoes-are-life-how-the-ocean-is-enriched-by-eruptions-devastating-on-land',
		);
		cmpIframe().contains("It's your choice");
		cmpIframe().find("[title='Manage my cookies']").click();
		privacySettingsIframe().contains('Privacy settings');
		privacySettingsIframe()
			.find("[title='Accept all']", { timeout: 12000 })
			.click();

		// Wait for hydration
		cy.get('[data-component=youtube-atom]')
			.parent()
			.should('have.attr', 'data-gu-ready', 'true');

		// Make sure overlay is displayed
		const overlaySelector = `[data-cy^="youtube-overlay-NtN-a6inr1E"]`;
		cy.get(overlaySelector).should('be.visible');

		// Listen for the ophan call made when the video is played
		interceptPlayEvent({
			id: 'gu-video-youtube-2bc6f709-865e-49ae-b01b-8fc38eb4e9a7',
		}).as('ophanCall');

		// Listen for the YouTube embed call made when the video is played
		interceptYouTubeEmbed({
			videoId: 'NtN-a6inr1E',
			adUnit: '/59666047/theguardian.com/environment/article/ng',
			pageUrl:
				'/environment/2021/oct/05/volcanoes-are-life-how-the-ocean-is-enriched-by-eruptions-devastating-on-land',
			rejectAll: false,
		}).as('youtubeEmbed');

		// Play video
		cy.get(overlaySelector).click();

		cy.wait('@ophanCall', { timeout: 30000 });

		cy.wait('@youtubeEmbed', { timeout: 30000 });

		// Video is playing, overlay is gone
		cy.get(overlaySelector).should('not.exist');
	});

	it('plays when the same video exists both in body and in main media of the blog', function () {
		cy.visit(
			'/Article?url=https://www.theguardian.com/world/live/2022/mar/28/russia-ukraine-war-latest-news-zelenskiy-putin-live-updates?dcr=true',
		);
		cmpIframe().contains("It's your choice");
		cmpIframe().find("[title='Manage my cookies']").click();
		privacySettingsIframe().contains('Privacy settings');
		privacySettingsIframe()
			.find("[title='Accept all']", { timeout: 12000 })
			.click();

		// Wait for hydration
		cy.get('[data-component=youtube-atom]')
			.should('have.length', 3)
			.each((item) => {
				cy.wrap(item)
					.parent()
					.should('have.attr', 'data-gu-ready', 'true');
			});

		// Make sure overlays for both videos are displayed
		const mediaDiv = 'div[data-gu-name="media"]';
		const bodyDiv = 'div[data-gu-name="body"]';
		const overlaySelectorforMultipleVideos = `[data-cy^="youtube-overlay-qkC9z-dSAOE"]`;

		cy.get(mediaDiv)
			.within(() => {
				cy.get(overlaySelectorforMultipleVideos);
			})
			.should('have.length', 1)
			.and('be.visible');

		cy.get(bodyDiv)
			.within(() => {
				cy.get(overlaySelectorforMultipleVideos);
			})
			.should('have.length', 1)
			.and('be.visible');

		/**
		 * Main media video
		 */

		// Listen for the ophan call made when the video is played
		interceptPlayEvent({
			id: 'gu-video-youtube-1e89d5bd-489e-470a-857e-4f30e85b5aec',
		}).as('ophanCall1');

		// Listen for the YouTube embed call made when the video is played
		interceptYouTubeEmbed({
			videoId: 'qkC9z-dSAOE',
			adUnit: '/59666047/theguardian.com/world/liveblog/ng',
			pageUrl:
				'/world/live/2022/mar/28/russia-ukraine-war-latest-news-zelenskiy-putin-live-updates',
			rejectAll: false,
		}).as('youtubeEmbed1');

		// Play main media video
		cy.get(mediaDiv).within(() => {
			cy.get(overlaySelectorforMultipleVideos).click();
		});

		// check if the main media video overplay is gone
		cy.get(mediaDiv).within(() => {
			cy.get(overlaySelectorforMultipleVideos).should('not.exist');
		});

		// check if the ophan call and YouTube embed call were made
		cy.wait('@ophanCall1', { timeout: 30000 });
		cy.wait('@youtubeEmbed1', { timeout: 30000 });

		/**
		 * Body video
		 */

		// Listen for the ophan call made when the video is played
		interceptPlayEvent({
			id: 'gu-video-youtube-1e89d5bd-489e-470a-857e-4f30e85b5aec',
		}).as('ophanCall2');

		// Listen for the YouTube embed call made when the video is played
		interceptYouTubeEmbed({
			videoId: 'qkC9z-dSAOE',
			adUnit: '/59666047/theguardian.com/world/liveblog/ng',
			pageUrl:
				'/world/live/2022/mar/28/russia-ukraine-war-latest-news-zelenskiy-putin-live-updates',
			rejectAll: false,
		}).as('youtubeEmbed2');

		// Play body video
		cy.get(bodyDiv).within(() => {
			cy.get(overlaySelectorforMultipleVideos).click();
		});

		// check if the body video overplay is gone
		cy.get(bodyDiv).within(() => {
			cy.get(overlaySelectorforMultipleVideos).should('not.exist');
		});

		// check if the ophan call and YouTube embed call were made
		cy.wait('@ophanCall2', { timeout: 30000 });
		cy.wait('@youtubeEmbed2', { timeout: 30000 });
	});

	it('plays the video if the reader rejects consent', function () {
		cy.visit(
			'/Article?url=https://www.theguardian.com/environment/2021/oct/05/volcanoes-are-life-how-the-ocean-is-enriched-by-eruptions-devastating-on-land',
		);
		cmpIframe().contains("It's your choice");
		cmpIframe().find("[title='Manage my cookies']").click();
		privacySettingsIframe().contains('Privacy settings');
		privacySettingsIframe()
			.find("[title='Reject all']", { timeout: 12000 })
			.click();

		// Wait for hydration
		cy.get('[data-component=youtube-atom]')
			.parent()
			.should('have.attr', 'data-gu-ready', 'true');

		// Make sure overlay is displayed
		const overlaySelector = `[data-cy^="youtube-overlay-NtN-a6inr1E"]`;
		cy.get(overlaySelector).should('be.visible');

		// Listen for the ophan call made when the video is played
		interceptPlayEvent({
			id: 'gu-video-youtube-2bc6f709-865e-49ae-b01b-8fc38eb4e9a7',
		}).as('ophanCall');

		// Listen for the YouTube embed call made when the video is played
		interceptYouTubeEmbed({
			videoId: 'NtN-a6inr1E',
			adUnit: '/59666047/theguardian.com/environment/article/ng',
			pageUrl:
				'/environment/2021/oct/05/volcanoes-are-life-how-the-ocean-is-enriched-by-eruptions-devastating-on-land',
			rejectAll: true,
		}).as('youtubeEmbed');

		// Play video
		cy.get(overlaySelector).click();

		cy.wait('@ophanCall', { timeout: 30000 });

		cy.wait('@youtubeEmbed', { timeout: 30000 });

		// Video is playing, overlay is gone
		cy.get(overlaySelector).should('not.exist');
	});

	it('video is sticky when the user plays a video then scrolls the video out of the viewport', function () {
		cy.visit(
			'/Article?url=https://www.theguardian.com/world/live/2022/mar/28/russia-ukraine-war-latest-news-zelenskiy-putin-live-updates?dcr=true',
		);
		cmpIframe().contains("It's your choice");
		cmpIframe().find("[title='Manage my cookies']").click();
		privacySettingsIframe().contains('Privacy settings');
		privacySettingsIframe()
			.find("[title='Accept all']", { timeout: 12000 })
			.click();

		// Wait for hydration
		cy.get('[data-component=youtube-atom]')
			.should('have.length', 3)
			.each((item) => {
				cy.wrap(item)
					.parent()
					.should('have.attr', 'data-gu-ready', 'true');
			});

		const mediaDiv = 'div[data-gu-name="media"]';
		const overlaySelectorforMultipleVideos = `[data-cy^="youtube-overlay-qkC9z-dSAOE"]`;
		const stickySelector = '[data-cy^="youtube-sticky-qkC9z-dSAOE"]';
		const stickyCloseSelector =
			'[data-cy^="youtube-sticky-close-qkC9z-dSAOE"]';

		/**
		 * Main media video
		 */

		// Scroll to main media video
		cy.get(mediaDiv).scrollIntoView();

		// Play main media video
		cy.get(mediaDiv).within(() => {
			cy.get(overlaySelectorforMultipleVideos).click();
		});

		// Scroll past the main media video to the third block
		cy.get('.block')
			.eq(2)
			.scrollIntoView({ duration: 1000, timeout: 10000 });

		// Main media video should now be sticky
		cy.get(mediaDiv).within(() => {
			cy.get(stickySelector).should(
				'have.attr',
				'data-is-sticky',
				'true',
			);
		});

		// Scroll to main media video
		cy.get(mediaDiv).scrollIntoView({ duration: 1000, timeout: 10000 });

		// Main media video should NOT be sticky
		// Attributes set with a value of 'false' are removed from the DOM
		cy.get(mediaDiv).within(() => {
			cy.get(stickySelector).should('not.have.attr', 'data-is-sticky');
		});

		// Scroll past the main media video to the third block
		cy.get('.block')
			.eq(2)
			.scrollIntoView({ duration: 1000, timeout: 10000 });

		cy.get(mediaDiv).within(() => {
			// video is sticky again
			cy.get(stickySelector).should(
				'have.attr',
				'data-is-sticky',
				'true',
			);
			// close the video
			// TODO find a way to hover and make the close button visible rather than forcing
			cy.get(stickyCloseSelector).click({ force: true });
			// video is NOT sticky
			cy.get(stickySelector).should('not.have.attr', 'data-is-sticky');
		});
	});
});
