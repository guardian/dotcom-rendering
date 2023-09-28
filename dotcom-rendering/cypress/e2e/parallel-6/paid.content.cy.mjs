/* eslint-disable mocha/no-setup-in-describe */
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.mjs';
import { cmpIframe } from '../../lib/cmpIframe.mjs';
import { privacySettingsIframe } from '../../lib/privacySettingsIframe.mjs';
import { storage } from '@guardian/libs';

const handleCommercialErrors = () => {
	cy.on('uncaught:exception', (err, runnable) => {
		// When we set the `GU_U` cookie this is causing the commercial bundle to try and do
		// something with the url which is failing in Cypress with a malformed URI error
		if (err.message.includes('URI malformed')) {
			// This error is unrelated to the test in question so return  false to prevent
			// this commercial error from failing this test
			return false;
		}
		if (
			err.message.includes(
				"Cannot read properties of undefined (reading 'map')",
			)
		) {
			// This error is unrelated to the test in question so return  false to prevent
			// this commercial error from failing this test
			return false;
		}
	});
};

const paidContentPage =
	'https://www.theguardian.com/the-future-of-sustainable-entrepreneurship/2023/jun/01/take-your-sustainable-business-to-the-next-level-win-your-own-retail-space-at-one-of-londons-westfield-centres';

/**
 * This test relies on labs campaigns, where the content is often taken down one the campaign is complete.
 * If this happens you'll need to find a new labs article with a brand badge, you can often find these here:
 * https://www.theguardian.com/tone/advertisement-features
 * You need to edit the link as well as the expected requestURL to include the new brand in the code below, where it states `expect(requestURL).to.include('el=<logo goes here>');`.
 * You can grab the required info in the dev tools network tab on the page itself.
 */
describe('Paid content tests', function () {
	beforeEach(function () {
		handleCommercialErrors();
		setLocalBaseUrl();
		storage.local.set('gu.geo.override', 'GB');
	});

	it('should send Google Analytics message on click of sponsor logo in metadata', function () {
		cy.visit(`Article/${paidContentPage}`);

		// Open the Privacy setting dialogue
		cmpIframe().contains("It's your choice");
		cmpIframe().find('button.sp_choice_type_12').click();

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
			'data-island-status',
			'hydrated',
		);

		cy.get('[data-cy=branding-logo]').should('be.visible');
		cy.get('[data-cy=branding-logo]').click();

		// Make sure the call to Google Analytics contains the info we want
		cy.wait('@gaRequest').then((interception) => {
			let requestURL = interception.request.url;
			expect(requestURL).to.include('ec=click');
			expect(requestURL).to.include('ea=sponsor%20logo');
			expect(requestURL).to.include('el=westfield');
		});
	});

	it('should send Google Analytics message on click of sponsor logo in onwards section', function () {
		cy.visit(`Article/${paidContentPage}`);

		// Open the Privacy setting dialogue
		cmpIframe().contains("It's your choice");
		cmpIframe().find('button.sp_choice_type_12').click();

		// Accept tracking cookies
		privacySettingsIframe().contains('Privacy settings');
		privacySettingsIframe().find("[title='Accept all']").click();

		cy.window().its('ga').should('exist');

		// Wait for a call to Google Analytics to be made - we expect this to happen
		cy.intercept(
			'GET',
			'https://www.google-analytics.com/collect?v=1**',
		).as('gaRequest');

		cy.get('gu-island[name=OnwardsUpper]').scrollIntoView({
			duration: 300,
		});

		cy.get('gu-island[name=OnwardsUpper]', { timeout: 30000 }).should(
			'have.attr',
			'data-island-status',
			'rendered',
		);

		cy.get('[data-cy=card-branding-logo]').should('be.visible');
		cy.get('[data-cy=card-branding-logo]').first().click();

		// Make sure the call to Google Analytics contains the info we want
		cy.wait('@gaRequest').then((interception) => {
			let requestURL = interception.request.url;
			expect(requestURL).to.include('ec=click');
			expect(requestURL).to.include('ea=sponsor%20logo');
			expect(requestURL).to.include('el=westfield');
		});
	});
});
