import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';
import { overrideGeo } from '../../lib/overrideGeo';
import { hasCurrentBrazeUser } from '../../lib/hasCurrentBrazeUser';

const idapiIdentifiersResponse = `{ "id": "000000000", "brazeUuid": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", "puzzleUuid": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "googleTagId": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" }`;

const handleGuCookieError = () => {
	cy.on('uncaught:exception', (err, runnable) => {
		// When we set the `GU_U` cookie this is causing the commercial bundle to try and do
		// something with the url which is failing in Cypress with a malformed URI error
		if (err.message.includes('URI malformed')) {
			// This error is unrelated to the test in question so return  false to prevent
			// this commercial error from failing this test
			return false;
		}
	});
};

describe('Braze messaging', function () {
	beforeEach(function () {
		cy.clearLocalStorage();
		handleGuCookieError();
		setLocalBaseUrl();
	});

	const url =
		'https://theguardian.com/games/2018/aug/23/nier-automata-yoko-taro-interview';
	const visitArticle = () => {
		return cy.visit(`/Article?url=${url}`);
	};

	const cmpIframe = () => {
		return cy
			.get('iframe[id^="sp_message_iframe"]')
			.its('0.contentDocument.body')
			.should('not.be.empty')
			.then(cy.wrap);
	};

	const acceptConsents = () => {
		return visitArticle().then(() => {
			// Open the Privacy setting dialogue
			cmpIframe().contains("It's your choice");
			return cmpIframe().find(`[title="Yes, I’m happy"]`).click();
		});
	};

	const enableBraze = () => {
		window.guardian = {
			config: {
				switches: {
					brazeSwitch: true,
				},
				page: {
					brazeApiKey: 'xxxxx',
				},
			},
		};
	};

	const becomeLoggedIn = () => {
		cy.setCookie('GU_U', 'true', {
			log: true,
		});
		cy.setCookie('gu_hide_support_messaging', 'true', {
			log: true,
		});
		cy.intercept('GET', '**/user/me/identifiers', idapiIdentifiersResponse);
	};

	const becomeLoggedOut = () => {
		// User no longer logged in
		cy.clearCookie('GU_U');
		cy.intercept('GET', '**/user/me/identifiers', { statusCode: 403 });
	};

	const setCountry = () => {
		const countryCode = 'GB';
		overrideGeo(countryCode);
	};

	it('records in local storage that the Braze SDK was loaded', function () {
		enableBraze();
		becomeLoggedIn();

		cy.setCookie('bwid', 'myBrowserId');

		setCountry();
		acceptConsents()
			.then(visitArticle)
			.then(() => {
				cy.waitUntil(() => hasCurrentBrazeUser() === true, {
					errorMsg: 'hasCurrentBrazeUser assertion failed',
				});
			});
	});

	it('clears Braze data when a user logs out', function () {
		enableBraze();
		becomeLoggedIn();

		cy.setCookie('bwid', 'myBrowserId');

		setCountry();
		acceptConsents()
			.then(visitArticle)
			.then(() => {
				return cy.waitUntil(() => hasCurrentBrazeUser() === true, {
					errorMsg: 'hasCurrentBrazeUser assertion failed',
				});
			})
			.then(() => {
				// Set cache data in localStorage so we can check it's cleared below
				localStorage.setItem('gu.brazeMessageCache.EndOfArticle', '[]');
				localStorage.setItem('gu.brazeMessageCache.Banner', '[]');
			})
			.then(becomeLoggedOut)
			.then(visitArticle)
			.then(() => {
				return cy.waitUntil(() => hasCurrentBrazeUser() === false, {
					errorMsg: 'hasCurrentBrazeUser assertion failed',
				});
			})
			.then(() => {
				expect(
					localStorage.getItem('gu.brazeMessageCache.EndOfArticle'),
				).to.be.equal(null);
				expect(
					localStorage.getItem('gu.brazeMessageCache.Banner'),
				).to.be.equal(null);
			});
	});
});
