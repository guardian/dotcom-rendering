/* eslint-disable no-undef */
/* eslint-disable func-names */
import { disableCMP } from '../../lib/disableCMP';
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';

const articleUrl =
	'https://www.theguardian.com/commentisfree/2020/dec/11/brexit-conservative-rule-breaking-eu';

const profileResponse =
	'{"status":"ok","userProfile":{"userId":"102309223","displayName":"Guardian User","webUrl":"https://profile.theguardian.com/user/id/102309223","apiUrl":"https://discussion.guardianapis.com/discussion-api/profile/102309223","avatar":"https://avatar.guim.co.uk/user/102309223","secureAvatarUrl":"https://avatar.guim.co.uk/user/102309223","badge":[],"privateFields":{"canPostComment":true,"isPremoderated":false,"hasCommented":false}}}';

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
		// Mock call to 'profile/me'
		cy.intercept('GET', '**/profile/me', profileResponse);
		cy.visit(`Article?url=${articleUrl}`);
		// This text is shown in the header for signed in users
		cy.contains('My account');
	});

	it('should not display signed in texts when users are not signed in', function () {
		cy.visit(`Article?url=${articleUrl}`);
		// Check that the page is showing the reader as signed out
		cy.contains('sign in or create');
	});
});
