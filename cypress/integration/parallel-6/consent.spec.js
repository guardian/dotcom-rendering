/* eslint-disable mocha/no-setup-in-describe */
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';
import { skipOn } from '@cypress/skip-test';

const firstPage =
	'https://www.theguardian.com/environment/2020/oct/13/maverick-rewilders-endangered-species-extinction-conservation-uk-wildlife';

const secondPage =
	'https://www.theguardian.com/environment/2020/nov/19/blue-whale-sightings-off-south-georgia-raise-hopes-of-recovery';

describe('Consent tests', function () {
	const cmpIframe = () => {
		return cy
			.get('iframe[id^="sp_message_iframe"]')
			.its('0.contentDocument.body')
			.should('not.be.empty')
			.then(cy.wrap);
	};

	const privacySettingsIframe = () => {
		return cy
			.get('[src*="https://cdn.privacy-mgmt.com/privacy-manager"]')
			.its('0.contentDocument.body')
			.should('not.be.empty')
			.then(cy.wrap);
	};

	const waitForAnalyticsToInit = () => {
		// Waiting is sad but we need to ensure the init script has executed which occurs
		// after the pageLoadEvent has fired
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(300);
	};

	beforeEach(function () {
		setLocalBaseUrl();
	});

	// Skipping only on CI because, these tests work fine locally but can fail on CI is the server
	// being used is in the US
	skipOn(
		Cypress.env('TEAMCITY') === 'true' ||
			Cypress.env('GITHUB_ACTIONS') === 'true',
		() => {
			it('should make calls to Google Analytics after the reader consents', function () {
				cy.visit(`Article?url=${firstPage}`);
				waitForAnalyticsToInit();
				cy.window().its('ga').should('not.exist');
				// Open the Privacy setting dialogue
				cmpIframe().contains("It's your choice");
				cmpIframe().find("[title='Manage my cookies']").click();
				// Accept tracking cookies
				privacySettingsIframe().contains('Privacy settings');
				privacySettingsIframe().find("[title='Accept all']").click();
				// Make a second page load now that we have the CMP cookies set to accept tracking
				cy.visit(`Article?url=${secondPage}`);
				// Wait for a call to Google Analytics to be made - we expect this to happen
				cy.intercept('POST', 'https://www.google-analytics.com/**');
			});

			it('should not add GA tracking scripts onto the window object after the reader rejects consent', function () {
				cy.visit(`Article?url=${firstPage}`);
				waitForAnalyticsToInit();
				cy.window().its('ga').should('not.exist');
				// Open the Privacy setting dialogue
				cmpIframe().contains("It's your choice");
				cmpIframe().find("[title='Manage my cookies']").click();
				// Reject tracking cookies
				privacySettingsIframe().contains('Privacy settings');
				privacySettingsIframe().find("[title='Reject all']").click();
				// Make a second page load now that we have the CMP cookies set to reject tracking and check
				// to see if the ga property was set by Google on the window object
				cy.visit(`Article?url=${secondPage}`);
				waitForAnalyticsToInit();
				// We force window.ga to be null on consent rejection to prevent subsequent requests
				cy.window().its('ga').should('equal', null);
			});

			it('should add GA tracking scripts onto the window object after the reader accepts consent', function () {
				cy.visit(`Article?url=${firstPage}`);
				waitForAnalyticsToInit();
				cy.window().its('ga').should('not.exist');
				// Open the Privacy setting dialogue
				cmpIframe().contains("It's your choice");
				cmpIframe().find("[title='Manage my cookies']").click();
				// Reject tracking cookies
				privacySettingsIframe().contains('Privacy settings');
				privacySettingsIframe().find("[title='Accept all']").click();
				// Make a second page load now that we have the CMP cookies set to reject tracking and check
				// to see if the ga property was set by Google on the window object
				cy.visit(`Article?url=${secondPage}`);
				waitForAnalyticsToInit();
				cy.window().its('ga').should('exist');
			});
		},
	);
});
