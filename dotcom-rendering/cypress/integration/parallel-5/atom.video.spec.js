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

		// Play video
		cy.get(overlaySelector).click();

		cy.wait('@ophanCall', { timeout: 30000 });

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

		// Play video
		cy.get(overlaySelector).click();

		cy.wait('@ophanCall', { timeout: 30000 });

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

		// Play video
		cy.get(overlaySelector).click();

		cy.wait('@ophanCall', { timeout: 30000 });

		// Video is playing, overlay is gone
		cy.get(overlaySelector).should('not.exist');
	});
});
