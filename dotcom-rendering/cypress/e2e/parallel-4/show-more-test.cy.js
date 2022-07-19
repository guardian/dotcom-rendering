/* eslint-disable no-undef */
/* eslint-disable func-names */
import { disableCMP } from '../../lib/disableCMP';
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';

import showMoreRequestBody from '../../fixtures/manual/science-show-more-req.json';
import scienceFrontJson from '../../fixtures/manual/science-front.json';

/**
 * This tests both the '/Cards' endpoint, and the client-side 'Show More'
 * interaction that fetches and displays extra cards for a container.
 * It mocks the responses from Frontend in order to keep the contents stable.
 * This is partly to allow for testing properties like the URLs of the rendered
 * cards, but also partly with a view to adding visual regression testing in the
 * near future.
 * nb. the mock data is taken from CODE, because the necessary Fronts haven't
 * been pressed in PROD yet (todo).
 */

describe('Show More button', function () {
	beforeEach(function () {
		disableCMP();
		setLocalBaseUrl();
	});

	it('should insert markup for extra cards into container element', function () {
		const frontUrl = 'https://www.theguardian.com/science';
		/**
		 * Cards are fetched by an AJAX call when the user activates the
		 * 'More __' button. Cards are fetched for the specific container, matched
		 * on `collectionId`.
		 *
		 * In production, once the user clicks the 'More ___' button, the flow
		 * goes:

		 	```mermaid
		  		graph LR
					Client -- GET `show-more/` --> Frontend
					Frontend -- POST `Cards/` --> DCR
					DCR -- markup in a json object --> Frontend
					Frontend -- markup in a json object --> Client
		 	```
		 *
		 * For this test, we make the POST request to DCR `Cards/` directly,
		 * using a fixture to replicate the payload that Frontend normally sends.
		 * Once we've received the html markup from `Cards/`, we use this to mock
		 * the response to the client's AJAX call to Frontend `show-more`.
		 * We also mock the initial call to Frontend to get the front json.
		 * Using fixtures here allows us to test:
		  	a) the rendering that occurs in the `Cards/` endpoint, and
			b) the operations which insert and remove markup received from the
			`show-more` endpoint.
		 * This removes the dependency on Frontend during the test, and also
		 * gives us a 'fixed target' to test against (important because live fronts
		 * typically change regularly).
		 */
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
			// Normally this call is made to Frontend, which then calls DCR's `Cards/`
			// endpoint. We've already called Cards/ directly, so we can use that
			// response as a mock of the Frontend response.
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

			// there is some logic in `Cards/` to calculate the right index
			// for data-link-name, so we test that here
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

			// clicking the button again should remove the extra cards from the DOM
			cy.get(`[data-cy=${dataAttrValue}]`).click();
			cy.get(`[data-show-more-placeholder=${collectionId}]`, {
				timeout: 2000,
			})
				.children('ul')
				.should('have.length', 0);
		});
	});
});
