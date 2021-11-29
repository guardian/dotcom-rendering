/* eslint-disable mocha/no-setup-in-describe */
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';
import { cmpIframe } from '../../lib/cmpIframe';
import { privacySettingsIframe } from '../../lib/privacySettingsIframe';
import { storage } from '@guardian/libs';

const firstPage =
	'https://www.theguardian.com/uk-news/2021/jun/04/police-flabbergasted-at-time-it-took-london-bridge-terrorist-to-die-inquest-hears';

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
		cy.reload();
		// Wait for a call to Google Analytics to be made - we expect this to happen
		cy.intercept('POST', 'https://www.google-analytics.com/**');
	});
});
