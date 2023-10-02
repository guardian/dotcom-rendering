/* eslint-disable no-undef */
/* eslint-disable func-names */
import { disableCMP } from '../../lib/disableCMP';
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';
import { Standard } from '../../../fixtures/generated/articles/Standard';

const articleUrl =
	'https://www.theguardian.com/commentisfree/2020/dec/11/brexit-conservative-rule-breaking-eu';

const profileResponse =
	'{"status":"ok","userProfile":{"userId":"102309223","displayName":"Guardian User","webUrl":"https://profile.theguardian.com/user/id/102309223","apiUrl":"https://discussion.guardianapis.com/discussion-api/profile/102309223","avatar":"https://avatar.guim.co.uk/user/102309223","secureAvatarUrl":"https://avatar.guim.co.uk/user/102309223","badge":[],"privateFields":{"canPostComment":true,"isPremoderated":false,"hasCommented":false}}}';

const idapiIdentifiersResponse = `{ "id": "000000000", "brazeUuid": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", "puzzleUuid": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "googleTagId": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" }`;

const visitArticle = () =>
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
				},
			},
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});

describe('Signed in readers', function () {
	beforeEach(function () {
		disableCMP();
		setLocalBaseUrl();
	});

	it('should display the correct page state for signed in users', function () {
		cy.setCookie('GU_U', 'true', {
			log: true,
		});
		cy.on('uncaught:exception', (err, runnable) => {
			// When we set the `GU_U` cookie this is causing the commercial bundle to try and do
			// something with the url which is failing in Cypress with a malformed URI error
			expect(err.message).to.include('URI malformed');
			// This error is unrelated to the test in question so return  false to prevent
			// this commercial error from failing this test
			return false;
		});
		cy.intercept('GET', '**/user/me/identifiers', idapiIdentifiersResponse);
		// Mock call to 'profile/me'
		cy.intercept(
			'GET',
			'**/profile/me?strict_sanctions_check=false',
			profileResponse,
		).as('profileMe');
		visitArticle();
		cy.wait('@profileMe');
		// This text is shown in the header for signed in users
		cy.contains('My account');
	});

	// eslint-disable-next-line mocha/no-skipped-tests -- to reinstate after the  top bar header nav is no long behind a feature switch
	it('should have the correct urls for the header links', function () {
		cy.setCookie('GU_U', 'true', {
			log: true,
		});
		cy.setCookie('gu_hide_support_messaging', 'true', {
			log: true,
		});
		// Mock call to 'profile/me'
		cy.intercept(
			'GET',
			'**/profile/me?strict_sanctions_check=false',
			profileResponse,
		).as('profileMe');
		visitArticle();
		cy.wait('@profileMe');

		cy.get('a[data-link-name="nav3 : topbar : printsubs"]')
			.should('have.attr', 'href')
			.and('contain', 'support.theguardian.com/subscribe');

		cy.get('a[data-link-name="nav3 : job-cta"]').should(
			'have.attr',
			'href',
			'https://jobs.theguardian.com',
		);
		cy.get('button[data-link-name="nav3 : topbar : my account"]');
		cy.get('a[data-link-name="nav3 : search"]').should(
			'have.attr',
			'href',
			'https://www.google.co.uk/advanced_search?q=site:www.theguardian.com',
		);
	});

	it('should not display signed in texts when users are not signed in', function () {
		visitArticle();
		cy.scrollTo('bottom', { duration: 300 });
		// We need this second call to fix flakiness where content loads in pushing the page
		// down and preventing the scroll request to actually reach the bottom. We will fix
		// this later when we've defined fixed heights for these containers, preventing CLS
		cy.scrollTo('bottom', { duration: 300 });
		// Wait for the discussion to be loaded
		cy.get('gu-island[name=DiscussionContainer]').should(
			'have.attr',
			'data-island-status',
			'hydrated',
		);
		// Check that the page is showing the reader as signed out
		cy.contains('Sign in or create');
	});
});
