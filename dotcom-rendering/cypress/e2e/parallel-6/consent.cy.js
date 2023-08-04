/* eslint-disable mocha/no-setup-in-describe */
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';
import { cmpIframe } from '../../lib/cmpIframe.js';
import { privacySettingsIframe } from '../../lib/privacySettingsIframe.js';
import { storage } from '@guardian/libs';

const firstPage =
	'https://www.theguardian.com/uk-news/2021/jun/04/police-flabbergasted-at-time-it-took-london-bridge-terrorist-to-die-inquest-hears';

describe('Consent tests', function () {
	beforeEach(function () {
		setLocalBaseUrl();
		storage.local.set('gu.geo.override', 'GB');
	});

	it('should make calls to Google Analytics after the reader consents', function () {
		cy.visit(`/Article/${firstPage}`);
		cy.window().its('ga').should('not.exist');
		// Open the Privacy setting dialogue
		cmpIframe().contains("It's your choice");
		cmpIframe().find('button.sp_choice_type_12').click();
		// Accept tracking cookies
		privacySettingsIframe().contains('Privacy settings');
		privacySettingsIframe().find("[title='Accept all']").click();
		// Make a second page load now that we have the CMP cookies set to accept tracking
		cy.reload();
		// Wait for a call to Google Analytics to be made - we expect this to happen
		cy.intercept('POST', 'https://www.google-analytics.com/**');
	});

	it('should not add GA tracking scripts onto the window object after the reader rejects consent', function () {
		// TODO: handle unhandled promise rejection
		cy.on('uncaught:exception', (err, runnable, promise) => {
			// return false to prevent the error from failing this test
			if (promise) {
				return false;
			}
		});
		cy.visit(`/Article/${firstPage}`);
		cy.window().its('ga').should('not.exist');
		// Open the Privacy setting dialogue
		cmpIframe().contains("It's your choice");
		cmpIframe().find('button.sp_choice_type_12').click();
		// Reject tracking cookies
		privacySettingsIframe().contains('Privacy settings');
		privacySettingsIframe().find("[title='Reject all']").click();
		// We force window.ga to be null upon consent rejection to prevent subsequent requests
		cy.window().its('ga').should('be.null');
		// Make a second page load now that we have the CMP cookies set to reject tracking and check
		// to see if the ga property remains correctly unset
		cy.reload();
		cy.window().its('ga').should('be.null');
	});
});
