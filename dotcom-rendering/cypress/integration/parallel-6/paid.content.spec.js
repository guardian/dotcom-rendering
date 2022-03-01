/* eslint-disable mocha/no-setup-in-describe */
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';
import { cmpIframe } from '../../lib/cmpIframe';
import { privacySettingsIframe } from '../../lib/privacySettingsIframe';
import { storage } from '@guardian/libs';

// It is important to use this article for this test because its commercialProperties
// coming from the CAPI object are the same for all editions. This way we are making sure
// the Branding island the test expects will be in the DOM. If an article with different
// commercialProperties across editions were to be used, the test would have different
// outcome when running locally (UK edition) and when running in CI. For example,
// it could be US edition if the CI server runs in US. The best way to deal with
// this would be to control the edition in the test whether by setting the GU_EDITION
// cookie or by selecting the edition in the UI. Unfortunately, this is not possible
// at this point of the migration.
const paidContentPage =
	'https://www.theguardian.com/welcome-to-ontario/2022/jan/20/bracing-boat-trips-dinosaurs-and-cherry-pie-the-best-things-to-do-with-kids-in-ontario';

describe('Paid content tests', function () {
	beforeEach(function () {
		setLocalBaseUrl();
		storage.local.set('gu.geo.override', 'GB');
	});

	it('should send Google Analytics message on click of sponsor logo', function () {
		cy.visit(`Article?url=${paidContentPage}`);

		// Open the Privacy setting dialogue
		cmpIframe().contains("It's your choice");
		cmpIframe().find("[title='Manage my cookies']").click();

		// Accept tracking cookies
		privacySettingsIframe().contains('Privacy settings');
		privacySettingsIframe().find("[title='Accept all']").click();

		cy.window().its('ga').should('exist');

		// Wait for a call to Google Analytics to be made - we expect this to happen
		cy.intercept(
			'GET',
			'https://www.google-analytics.com/collect?v=1**',
		).as('gaRequest');

		cy.get('gu-island[name=Branding]').scrollIntoView({
			duration: 300,
		});

		cy.get('gu-island[name=Branding]', { timeout: 30000 }).should(
			'have.attr',
			'data-gu-ready',
			'true',
		);

		cy.get('[data-cy=branding-logo]').should('be.visible');
		cy.get('[data-cy=branding-logo]').click();

		// Make sure the call to Google Analytics contains the info we want
		cy.wait('@gaRequest').then((interception) => {
			let requestURL = interception.request.url;
			expect(requestURL).to.include('ec=click');
			expect(requestURL).to.include('ea=sponsor%20logo');
			expect(requestURL).to.include('el=destination%20ontario');
		});
	});
});
