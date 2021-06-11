import { disableCMP } from '../../lib/disableCMP.js';

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
	describe('Main media youtube video', function () {
		beforeEach(function () {
			disableCMP();
		});
		it('should render', function () {
			cy.visit(`/Article?url=${mainMediaVideo}`);
			cy.get(`[daya-cy="youtube-overlay"]`).should('be.visible');
		});

		it('should dispatch play to server', function () {
			cy.get(`[daya-cy="youtube-overlay"]`).click();
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

			cy.wait('@ophanCall');
		});

		it('should no longer display overlay', function () {
			cy.get(`[daya-cy="youtube-overlay"]`).should('not.be.visible');
		});
	});

	describe('Embed youtube video', function () {
		beforeEach(function () {
			disableCMP();
		});
		it('should render', function () {
			cy.visit(`/Article?url=${embedMediaVideo}`);
			cy.get(`[daya-cy="youtube-overlay"]`).scrollIntoView();
			cy.get(`[daya-cy="youtube-overlay"]`).should('be.visible');
		});

		it('should dispatch play to server', function () {
			cy.get(`[daya-cy="youtube-overlay"]`).click();
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

			cy.wait('@ophanCall');
		});

		it('should no longer display overlay', function () {
			cy.get(`[daya-cy="youtube-overlay"]`).should('not.be.visible');
		});
	});
});
