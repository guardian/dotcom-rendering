/* eslint-disable no-undef */
/* eslint-disable func-names */
import { Standard } from '../../lib/articles';

const visitArticleNoOkta = () =>
	cy.visit('http://localhost:3030/Article/', {
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
				},
			},
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});

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

// cy.setCookie('GU_U', 'true', { log: true }): This sets the 'GU_U' cookie with the value 'true'. The { log: true } option is just for logging the action.

// cy.intercept('https://members-data-api.theguardian.com/user-attributes/me').as('getUserFeatures'): You intercept any request to the specified URL. This means that if your application makes a request to this URL, it will be intercepted instead of going to the actual URL. The intercepted request doesn't reach the original endpoint.

// visitArticleNoOkta(): You then visit a page using the cy.visit command. If this page triggers a request to 'https://members-data-api.theguardian.com/user-attributes/me', it will be intercepted.

// cy.wait('@getUserFeatures', { timeout: 30000 }): You wait for the '@getUserFeatures' alias (the intercepted request) to complete. This command will wait for the intercept to resolve or for the specified timeout (30 seconds in this case). The response for the intercepted request is expected to be handled during this waiting period.

// cy.getCookie('GU_U').should('exist'): After waiting for the intercept to complete, you check if the 'GU_U' cookie exists.

// In your test, the purpose of the cy.intercept command is to intercept HTTP requests to the specified URL (in your case, https://members-data-api.theguardian.com/user-attributes/me). This interception allows you to control the behavior of the request and response without making an actual network request to the external server.

// While your specific test code for intercepting the URL doesn't define a custom response, the primary purpose of this interception, in this context, is to block the real network request from being made during the test. By doing so, you can isolate your test from external dependencies, making it more predictable and consistent.

// That's correct. In your test scenario, where the request to https://members-data-api.theguardian.com/user-attributes/me is blocked by cy.intercept, none of the code within the persistResponse function is executed because there is no response from the server to persist.
// Exactly. The control in your test is that the request to https://members-data-api.theguardian.com/user-attributes/me is blocked, which means no new data (cookies) is being set in the browser during the test. This allows you to isolate the specific functionality that depends on the response from this API endpoint without making real network requests and affecting the state of your browser's cookies. It's a controlled testing environment.
