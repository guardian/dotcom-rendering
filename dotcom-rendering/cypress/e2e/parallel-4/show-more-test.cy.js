/* eslint-disable no-undef */
/* eslint-disable func-names */
import { disableCMP } from '../../lib/disableCMP';
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';

import showMoreRequestBody from '../../fixtures/manual/science-show-more-req.json';
import scienceFrontJson from '../../fixtures/manual/science-front.json';

/**
 * This tests both the '/Cards' endpoint, and the client-side 'Show More' i
 * interaction that fetches and displays extra cards for a container.
 * It mocks the responses from Frontend in order to keep the contents stable.
 * This is partly to allow for testing properties like the URLs of the rendered
 * cards, but also partly with a view to adding visual regression testing in the
 * near future.
 * nb. the mock data is taken from CODE, because the necessary Fronts haven't
 * been pressed in PROD yet.
 */

describe('Show More button', function () {
	beforeEach(function () {
		disableCMP();
		setLocalBaseUrl();
	});

	it('should insert markup for extra cards into container element', function () {
		const frontUrl = 'https://www.theguardian.com/science';
		const collectionId = 'e9c7-cf23-23b1-363b';
		const showMoreUrlFragment = `/science/show-more/${collectionId}.json?dcr=true`;
		const dataAttrValue = `show-more-button-${collectionId}`;
		const firstCardUrl =
			'/football/live/2022/jul/06/womens-euro-2022-england-prepare-to-kick-off-tournament-against-austria-live';
		const firstCardCardIndex = 7;
		const lastCardUrl =
			'/environment/2016/apr/09/chance-show-truth-into-heart-of-chernobyl-nuclear-disaster';
		const lastCardCardIndex = 20;
		cy.request('POST', 'Cards', showMoreRequestBody).then((response) => {
			cy.intercept('GET', frontUrl, scienceFrontJson);
			cy.intercept('GET', showMoreUrlFragment, response.body).as(
				'getCards',
			);
			cy.visit(`Front?url=${frontUrl}`);
			cy.get(`[data-cy=${dataAttrValue}]`).click();
			cy.wait('@getCards');
			cy.get(`[data-show-more-placeholder=${collectionId}] ul`, {
				timeout: 2000,
			}).as('cardList');

			cy.get('@cardList').children('li').should('have.length', 14);
			cy.get('@cardList').within(() => {
				cy.get(`[href="${firstCardUrl}"]`)
					.invoke('data', 'link-name')
					.then((dataLinkName) => {
						cy.expect(dataLinkName).to.include(
							`card-@${firstCardCardIndex}`,
						);
					});
			});
			cy.get('@cardList').within(() => {
				cy.get(`[href="${lastCardUrl}"]`)
					.invoke('data', 'link-name')
					.then((dataLinkName) => {
						cy.expect(dataLinkName).to.include(
							`card-@${lastCardCardIndex}`,
						);
					});
			});

			/**
			 * @TODO Add Percy snapshot here?
			 * */

			cy.get(`[data-cy=${dataAttrValue}]`).click();
			cy.get(`[data-show-more-placeholder=${collectionId}]`, {
				timeout: 2000,
			})
				.children('ul')
				.should('have.length', 0);
		});
	});
});
