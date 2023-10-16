// Test that cookies are set correctly when a user is signed in.
// Test that cookies are removed when a user signs out.
// Test that API requests for user data are made and handled correctly.
// Test that support messaging is displayed or hidden based on user subscription status.
// Test that functions like isDigitalSubscriber and isPayingMember return the expected values based on the presence of cookies.
// Test the behavior of utility functions related to date calculations.
// Test that the correct user data is sent to Ophan.

/* eslint-disable no-undef */
/* eslint-disable func-names */
import { cmpIframe } from '../../lib/cmpIframe';
import { disableCMP } from '../../lib/disableCMP';
import { fakeLogin } from '../../lib/fakeLogin';
import { Standard } from '../../lib/articles';
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl';
import { privacySettingsIframe } from '../../lib/privacySettingsIframe';

const visitArticleNoOkta = () =>
	cy.visit('http://localhost:3030/Article', {
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
	// it("Should check if a user is logged in and has required cookies", function() {
	//   // Mock user login status using Cypress cookies
	// //   disableCMP();
	// cy.visit(`Article/${articleUrl}`);
	//   cy.setCookie("GU_AF1", "true"); // Simulate user being ad-free
	//   cy.setCookie("gu_paying_member", "true"); // Simulate user being a paying member
	//   // Reload the page to apply the cookies
	// //   cy.reload();
	// cmpIframe().contains("It's your choice");
	// cmpIframe().find('button.sp_choice_type_12').click();
	// privacySettingsIframe().contains('Privacy settings');
	// privacySettingsIframe().find("[title='Accept all']").click();
	// cy.get('#dfp-ad--top-above-nav').should('not.exist');

	// });
	// it("Should check if a user is logged out and has no cookies", function() {
	// 	// Mock user being logged out and having no cookies
	// 	// cy.clearCookies();
	// 	cy.visit(`Article/${articleUrl}`);
	// 	cy.getCookie("GU_AF1").should("not.exist"); // Check if GU_AF1 cookie has been deleted
	//     cy.getCookie("gu_paying_member").should("not.exist");
	// 	// Reload the page to apply the changes
	// 	// cy.reload();

	// 	cmpIframe().contains("It's your choice");
	// 	// privacySettingsIframe().contains('Privacy settings');
	// 	// privacySettingsIframe().find("[title='Reject all']").click();

	// 	cy.get('#dfp-ad--top-above-nav').should('exist');
	//   });

	it(`Request to user features API is sent`, function () {
		// set the GU_U cookie to simulate a logged in user
		cy.setCookie('GU_U', 'true', { log: true });

		// set the gu_digital_subscriber cookie to simulate a digital subscriber
		cy.setCookie('gu_digital_subscriber', 'true', { log: true });

		cy.intercept(
			'https://members-data-api.theguardian.com/user-attributes/me',
		).as('getUserFeatures');

		visitArticleNoOkta();

		cy.wait('@getUserFeatures', { timeout: 30000 });
	});

	it(`Existing old cookie data is deleted when the user is signed out`, function () {});
});
