/* eslint-disable mocha/no-setup-in-describe */
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';
import { cmpIframe } from '../../lib/cmpIframe';
import { privacySettingsIframe } from '../../lib/privacySettingsIframe';
import { storage } from '@guardian/libs';

const firstPage =
	'https://www.theguardian.com/environment/2020/aug/01/plan-to-curb-englands-most-polluted-spot-divides-residents';

const secondPage =
	'https://www.theguardian.com/environment/2020/nov/19/blue-whale-sightings-off-south-georgia-raise-hopes-of-recovery';

describe('Consent tests', function () {
	beforeEach(function () {
		setLocalBaseUrl();
		storage.local.set('gu.geo.override', 'GB');
	});

	it('should make calls to Google Analytics after the reader consents', function () {
		cy.visit(`Article?url=${firstPage}`);
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
		// TODO: handle unhandled promise rejection
		cy.on('uncaught:exception', (err, runnable, promise) => {
			// return false to prevent the error from failing this test
			if (promise) {
				console.log(err);
				return false;
			}
		});
		cy.visit(`Article?url=${firstPage}`);
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
		// We force window.ga to be null on consent rejection to prevent subsequent requests
		cy.waitUntil(() => cy.window().then((win) => win.ga === null), {
			errorMsg: 'Error waiting for window.ga to be null',
		});
	});
});
