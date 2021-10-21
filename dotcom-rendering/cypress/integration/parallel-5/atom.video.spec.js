/* eslint-disable mocha/no-setup-in-describe */
import { cmpIframe } from '../../lib/cmpIframe';
import { privacySettingsIframe } from '../../lib/privacySettingsIframe';
import { skipOn } from '@cypress/skip-test';

const mainMediaVideo =
	'https://www.theguardian.com/uk-news/2020/dec/04/edinburgh-hit-by-thundersnow-as-sonic-boom-wakes-residents';
const mainMediaPlayEvent = {
	id: 'gu-video-youtube-2b33a7b7-e639-4232-9ecd-0fb920fa8147',
	eventType: 'video:content:play',
};

const embedMediaVideo =
	'https://www.theguardian.com/us-news/2020/oct/29/lordstown-ohio-trump-gm-plant-election';
const embedPlayEvent = {
	id: 'gu-video-youtube-35f9a38f-c0c5-4bbd-9395-e338c9e97d30',
	eventType: 'video:content:play',
};

describe('Video', function () {

	// Skipping only on CI because, these tests work fine locally but can fail on CI is the server
	// being used is in the US
	skipOn(
		Cypress.env('TEAMCITY') === 'true' ||
			Cypress.env('GITHUB_ACTIONS') === 'true',
		() => {

		it('Main media youtube video', function () {

			cy.visit(`/Article?url=${mainMediaVideo}`);
			cmpIframe().contains("It's your choice");
			cmpIframe().find("[title='Manage my cookies']").click();
			privacySettingsIframe().contains('Privacy settings');
			privacySettingsIframe().find("[title='Accept all']").click();

			cy.intercept('https://www.youtube.com/embed/S0CE1n-R3OY?*').as('youtubePlayer');

			cy.intercept(
				{
					url: 'http://ophan.theguardian.com/img/2?*',
					query: {
						video: /(.*)eventType\":\"video:content:play(.*)/,
					},
				},
				function (req) {
					const url = new URL(req.url);
					const videoValue = url.searchParams.get('video');
					expect(JSON.parse(videoValue)).to.deep.equal(
						mainMediaPlayEvent,
					);
				},
			).as('ophanCall');

			cy.wait('@youtubePlayer');

			cy.get(`[daya-cy="youtube-overlay"]`).should('be.visible');

			cy.get(`[daya-cy="youtube-overlay"]`).click();

			cy.wait('@ophanCall');

			cy.get(`[daya-cy="youtube-overlay"]`).should('not.be.visible');
		});

		// eslint-disable-next-line mocha/no-exclusive-tests
		it('Embed youtube video', function () {

			cy.visit(`/Article?url=${embedMediaVideo}`);
			cmpIframe().contains("It's your choice");
			cmpIframe().find("[title='Manage my cookies']").click();
			privacySettingsIframe().contains('Privacy settings');
			privacySettingsIframe().find("[title='Accept all']").click();

			cy.intercept('https://www.youtube.com/embed/N9Cgy-ke5-s?*').as('youtubePlayer');

			cy.intercept(
				{
					url: 'http://ophan.theguardian.com/img/2?*',
					query: {
						video: /(.*)eventType\":\"video:content:play(.*)/,
					},
				},
				function (req) {
					const url = new URL(req.url);
					const videoValue = url.searchParams.get('video');
					expect(JSON.parse(videoValue)).to.deep.equal(
						embedPlayEvent,
					);
				},
			).as('ophanCall');

			cy.wait('@youtubePlayer');

			cy.get(`[daya-cy="youtube-overlay"]`).should('be.visible');

			cy.get(`[daya-cy="youtube-overlay"]`).click();

			cy.wait('@ophanCall');

			cy.get(`[daya-cy="youtube-overlay"]`).should('not.be.visible');
		});
	});
});
