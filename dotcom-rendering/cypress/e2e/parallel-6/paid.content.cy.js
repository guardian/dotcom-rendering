/* eslint-disable mocha/no-setup-in-describe */
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';
import { cmpIframe } from '../../lib/cmpIframe';
import { privacySettingsIframe } from '../../lib/privacySettingsIframe';
import { storage } from '@guardian/libs';

const paidContentPage =
	'https://www.theguardian.com/make-work-work/2022/dec/01/tools-tech-and-etiquette-best-practice-of-hybrid-working-for-small-businesses';

describe('Paid content tests', function () {
	beforeEach(function () {
		setLocalBaseUrl();
		storage.local.set('gu.geo.override', 'GB');
	});

	it('should send Google Analytics message on click of sponsor logo in metadata', function () {
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
			expect(requestURL).to.include('el=microsoft');
		});
	});

	it('should send Google Analytics message on click of sponsor logo in onwards section', function () {
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

		cy.get('gu-island[name=OnwardsUpper]').scrollIntoView({
			duration: 300,
		});

		cy.get('gu-island[name=OnwardsUpper]', { timeout: 30000 }).should(
			'have.attr',
			'data-gu-ready',
			'true',
		);

		cy.get('[data-cy=card-branding-logo]').should('be.visible');
		cy.get('[data-cy=card-branding-logo]').first().click();

		// Make sure the call to Google Analytics contains the info we want
		cy.wait('@gaRequest').then((interception) => {
			let requestURL = interception.request.url;
			expect(requestURL).to.include('ec=click');
			expect(requestURL).to.include('ea=sponsor%20logo');
			expect(requestURL).to.include('el=microsoft');
		});
	});
});
