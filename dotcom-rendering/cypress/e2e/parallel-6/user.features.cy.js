import { Standard } from '../../fixtures/manual/standard-article';
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';

const visitArticleNoOkta = () => {
	setLocalBaseUrl();
	cy.visit('/Article', {
		method: 'POST',
		body: JSON.stringify({
			...Standard,
			config: {
				...Standard.config,
				switches: {
					...Standard.config.switches,
					/**
					 * We want to continue using cookies for signed in features
					 * until we figure out how to use Okta in Cypress.
					 * See https://github.com/guardian/dotcom-rendering/issues/8758
					 */
					okta: false,
					idCookieRefresh: false,
					userFeaturesDcr: true,
				},
			},
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

describe('User cookies tests', function () {
	it(`Request to user features API is sent when no user features expiry cookie`, function () {
		cy.setCookie('GU_U', 'true', { log: true });

		cy.intercept(
			'https://members-data-api.theguardian.com/user-attributes/me',
		).as('getUserFeatures');

		visitArticleNoOkta();

		cy.wait('@getUserFeatures', { timeout: 30000 });
		cy.getCookie('GU_U').should('exist');
	});

	it(`Request to user features API is sent when user features cookie has expired`, function () {
		cy.setCookie('GU_U', 'true', { log: true });

		const currentTimestamp = new Date().getTime();
		cy.clock(currentTimestamp); // Freeze time at a specific date
		const expirationTimestamp = currentTimestamp - 24 * 60 * 60 * 1000; // 24 hours ago from now (frozen time)

		cy.setCookie('gu_user_features_expiry', expirationTimestamp.toString());

		cy.intercept(
			'https://members-data-api.theguardian.com/user-attributes/me',
		).as('getUserFeatures');

		visitArticleNoOkta();

		cy.wait('@getUserFeatures', { timeout: 30000 });
	});

	it(`Existing old cookie data is deleted when the user is signed out`, function () {
		cy.setCookie('GU_U', 'true', { log: true });

		// Setting various cookies to simulate deletion process
		cy.clearCookie('GU_U', { log: true });

		cy.setCookie('gu_user_features_expiry', 'true', { log: true });
		cy.setCookie('GU_AF1', 'true', { log: true });
		cy.setCookie('gu_paying_member', 'true', { log: true });
		cy.setCookie('gu_digital_subscriber', 'true', { log: true });

		cy.intercept(
			'https://members-data-api.theguardian.com/user-attributes/me',
		).as('getUserFeatures');

		visitArticleNoOkta();

		cy.getCookie('gu_user_features_expiry').should('not.exist');
		cy.getCookie('GU_AF1').should('not.exist');
		cy.getCookie('gu_paying_member').should('not.exist');
		cy.getCookie('gu_digital_subscriber').should('not.exist');
	});
});
