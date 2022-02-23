import { cmpIframe } from '../../lib/cmpIframe';
import { privacySettingsIframe } from '../../lib/privacySettingsIframe';
import { storage } from '@guardian/libs';

const interceptPlayEvent = (id) => {
	return cy.intercept(
		{
			url: 'http://ophan.theguardian.com/img/2?**',
			query: {
				video: /(.*)eventType\":\"video:content:play(.*)/,
			},
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

const parseCustParams = (custParamsString) => {
	const custParams = decodeURIComponent(custParamsString);
	const custParamsItems = custParams.split('&');
	return custParamsItems.reduce((newParams, cpi) => {
		const [key, value] = cpi.split('=');
		if (value.includes(',')) {
			newParams[key] = value.split(',').map(decodeURIComponent);
		} else {
			newParams[key] = decodeURIComponent(value);
		}
		return newParams;
	}, {});
};

const interceptYouTubeEmbed = ({ videoId, adUnit, pageUrl, rejectAll }) => {
	return cy.intercept(
		{
			url: `https://www.youtube.com/embed/${videoId}?**`,
		},
		function (req) {
			// https://guardian.github.io/commercial-request-parser/ is useful to parse YouTube requests
			const url = new URL(req.url);
			const embedConfig = JSON.parse(
				url.searchParams.get('embed_config'),
			);
			const adsConfig = embedConfig.adsConfig;
			const adTagParameters = adsConfig.adTagParameters;
			const custParams = parseCustParams(adTagParameters.cust_params);
			// check consent related properties
			// cmpGdpr = consentState.tcfv2.gdprApplies
			expect(adTagParameters.cmpGdpr, 'check GDPR applies').to.equal(1);
			// cmpVcd = consentState.tcfv2.tcString
			expect(adTagParameters.cmpVcd, 'check TCFV2 tcString').to.not.be
				.undefined;
			if (rejectAll) {
				// user has NOT consented to all purposes
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
			expect(custParams.url, 'check url').to.equal(pageUrl);
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
		const overlaySelector = `[data-cy="youtube-overlay-S0CE1n-R3OY"]`;
		cy.get(overlaySelector).should('be.visible');

		// YouTube has not initialised
		cy.window().its('onYouTubeIframeAPIReady').should('not.exist');

		// Listen for the ophan call made when the video is played
		interceptPlayEvent(
			'gu-video-youtube-2b33a7b7-e639-4232-9ecd-0fb920fa8147',
		).as('ophanCall');

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
		// cy.intercept('**youtube**').as('callToYouTube');
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
		const overlaySelector = `[data-cy="youtube-overlay-NtN-a6inr1E"]`;
		cy.get(overlaySelector).should('be.visible');

		// Listen for the ophan call made when the video is played
		interceptPlayEvent(
			'gu-video-youtube-2bc6f709-865e-49ae-b01b-8fc38eb4e9a7',
		).as('ophanCall');

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

		// // Video is playing, overlay is gone
		cy.get(overlaySelector).should('not.exist');
	});

	it('still plays the video if the reader rejects consent', function () {
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
		const overlaySelector = `[data-cy="youtube-overlay-NtN-a6inr1E"]`;
		cy.get(overlaySelector).should('be.visible');

		// Listen for the ophan call made when the video is played
		interceptPlayEvent(
			'gu-video-youtube-2bc6f709-865e-49ae-b01b-8fc38eb4e9a7',
		).as('ophanCall');

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
});
