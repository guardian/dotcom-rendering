import { disableCMP } from '../../lib/disableCMP';
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';

describe('Commercial E2E tests', function () {
	beforeEach(function () {
		disableCMP();
		setLocalBaseUrl();
	});

	const longReadURL =
		'https://www.theguardian.com/environment/2020/oct/13/maverick-rewilders-endangered-species-extinction-conservation-uk-wildlife';

	const runLongReadTestFor = (url) => {
		cy.log(`Opening A long read`);
		cy.visit(url);

		cy.scrollTo('bottom', { duration: 500 });

		// We are excluding survey slot as it only appears via cypress tests and only on frontend.
		// Also, we are waiting *up to* 30 seconds here to give the ads time to load. In most
		// cases this check will pass much faster
		cy.get('.js-ad-slot:not([data-name="survey"]', {
			timeout: 30000,
		}).should('have.length.of.at.least', 14);

		Array(10)
			.fill()
			.forEach((item, i) => {
				cy.get(`[data-name="inline${i + 1}"]`).should('have.length', 1);
			});

		cy.get(`[data-name="right"]`).should('have.length', 1);
		cy.get(`[data-name="merchandising-high"]`).should('have.length', 1);
		cy.get(`[data-name="mostpop"]`).should('have.length', 1);
		cy.get(`[data-name="merchandising"]`).should('have.length', 1);
	};

	describe('Ad slot Parity between DCR and Frontend for a long read', function () {
		it(`It should check slots for a long article in DCR`, function () {
			runLongReadTestFor(`Article?url=${longReadURL}`);
		});

		it(`It should check slots for a long article in Frontend`, function () {
			Cypress.config('baseUrl', '');
			runLongReadTestFor(`${longReadURL}?dcr=false`);
		});
	});
});
