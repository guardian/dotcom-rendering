import { disableCMP } from '../../lib/disableCMP';
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';
import { skipOn } from '@cypress/skip-test';
import { isRunningInCI } from '../../lib/isRunningInCi';

/* eslint-disable no-undef */
/* eslint-disable func-names */

describe('Sign In Gate Tests', function () {
	beforeEach(function () {
		setLocalBaseUrl();
	});

	const findCmpIframe = () => {
		return cy
			.get('iframe[id^="sp_message_iframe"]')
			.its('0.contentDocument.body')
			.should('not.be.empty')
			.then(cy.wrap);
	};

	const setArticleCount = (n) => {
		cy.setLocalStorage(
			'gu.history.dailyArticleCount',
			JSON.stringify({
				value: [
					{
						day: Math.floor(Date.now() / 86400000),
						count: n,
					},
				],
			}),
		);
	};

	const setMvtCookie = (str) => {
		cy.setCookie('GU_mvt_id_local', str, {
			log: true,
		});
	};

	// helper method over the cypress visit method to avoid having to repeat the same url by setting a default
	// can override the parameter if required
	const visitArticle = (
		url = 'https://www.theguardian.com/games/2018/aug/23/nier-automata-yoko-taro-interview',
	) => {
		cy.visit(`/Article?url=${url}`);
	};

	// as the sign in gate is lazy loaded, we need to scroll to the rough position where it
	// will be inserted to make it visible
	// can override position if required
	const scrollToGateForLazyLoading = (roughPosition = 1000) => {
		cy.scrollTo(0, roughPosition, { duration: 500 });
	};

	// we call visit and scroll for most test, so this wrapper combines the two
	// while preserving the ability to set the parameters if required
	const visitArticleAndScrollToGateForLazyLoad = ({
		url,
		roughPosition,
	} = {}) => {
		visitArticle(url);
		scrollToGateForLazyLoading(roughPosition);
	};

	describe('SignInGateMain', function () {
		beforeEach(function () {
			disableCMP();
			// sign in gate main runs from 0-900000 MVT IDs, so 500 forces user into test
			setMvtCookie('500');

			// set article count to be min number to view gate
			setArticleCount(3);
		});

		it('should load the sign in gate', function () {
			visitArticleAndScrollToGateForLazyLoad();

			cy.get('[data-cy=sign-in-gate-main]').should('be.visible');
		});

		it('should not load the sign in gate if the user has not read at least 3 article in a day', function () {
			setArticleCount(1);

			visitArticleAndScrollToGateForLazyLoad();

			cy.get('[data-cy=sign-in-gate-main]').should('not.exist');
		});

		it('should not load the sign in gate if the user is signed in', function () {
			// use GU_U cookie to determine if user is signed in
			cy.setCookie(
				'GU_U',
				'MCwCFHbDHWevL_GqgH0CcbeDWp4N9kR5AhQ2lD3zMjjbKJAgC7FUDtc18Ac8BA',
				{ log: true },
			);

			visitArticleAndScrollToGateForLazyLoad();

			// when using GU_U cookie, there is an issue with the commercial.dcr.js bundle
			// causing a URI Malformed error in cypress
			// we use this uncaught exception in this test to catch this and continue the rest of the test
			cy.on('uncaught:exception', () => {
				done();
				return false;
			});

			cy.get('[data-cy=sign-in-gate-main]').should('not.exist');
		});

		it('should not load the sign in gate if the user has already dismissed the gate', function () {
			localStorage.setItem(
				'gu.prefs.sign-in-gate',
				`{
                    "value": {
                        "SignInGateMain-main-variant-3": "2020-07-22T08:25:05.567Z",
                        "gate-dismissed-count-SignInGateMain-main-variant-3": 6
                    }
                }`,
			);

			visitArticleAndScrollToGateForLazyLoad();

			cy.get('[data-cy=sign-in-gate-main]').should('not.exist');
		});

		it('should not load the sign in gate if the article is not a valid section (membership)', function () {
			visitArticleAndScrollToGateForLazyLoad({
				url:
					'https://www.theguardian.com/membership/2018/nov/15/support-guardian-readers-future-journalism',
			});

			cy.get('[data-cy=sign-in-gate-main]').should('not.exist');
		});

		it('should not load the sign in gate on a device with an ios9 user agent string', function () {
			// can't use visitArticleAndScrollToGateForLazyLoad for this method as overriding user agent
			cy.visit(
				'Article?url=https://www.theguardian.com/games/2018/aug/23/nier-automata-yoko-taro-interview',
				{
					onBeforeLoad: (win) => {
						Object.defineProperty(win.navigator, 'userAgent', {
							value:
								'Mozilla/5.0 (iPad; CPU OS 9_0 like Mac OS X) AppleWebKit/601.1.17 (KHTML, like Gecko) Version/8.0 Mobile/13A175 Safari/600.1.4',
						});
					},
				},
			);
			scrollToGateForLazyLoading();

			cy.get('[data-cy=sign-in-gate-main]').should('not.exist');
		});

		it('should remove gate when the dismiss button is clicked', function () {
			visitArticleAndScrollToGateForLazyLoad();

			cy.get('[data-cy=sign-in-gate-main]').should('be.visible');

			cy.get('[data-cy=sign-in-gate-main_dismiss]').click();

			cy.get('[data-cy=sign-in-gate-main]').should('not.exist');
		});

		it('register button should contain profile.theguardian.com href', function () {
			visitArticleAndScrollToGateForLazyLoad();

			cy.get('[data-cy=sign-in-gate-main]').should('be.visible');

			cy.get('[data-cy=sign-in-gate-main_register]')
				.invoke('attr', 'href')
				.should('contains', 'profile.theguardian.com');
		});

		it('sign in link should contain profile.theguardian.com href', function () {
			visitArticleAndScrollToGateForLazyLoad();

			cy.get('[data-cy=sign-in-gate-main]').should('be.visible');

			cy.get('[data-cy=sign-in-gate-main_signin]')
				.invoke('attr', 'href')
				.should('contains', 'profile.theguardian.com');
		});

		it('should show cmp ui when privacy settings link is clicked', function () {
			visitArticleAndScrollToGateForLazyLoad();

			cy.get('[data-cy=sign-in-gate-main]').should('be.visible');

			cy.get('[data-cy=sign-in-gate-main_privacy]').click();

			cy.contains('privacy settings');
		});
	});

	/* eslint-disable mocha/no-setup-in-describe */
	// Tests fail when running on US servers due to CMP banner
	skipOn(isRunningInCI(), () => {
		describe('Sign In Gate Mandatory', function () {
			it('not render the gate unless the user has consented to CMP banner for variant', function () {
				setMvtCookie('890001');
				visitArticleAndScrollToGateForLazyLoad();
				cy.get('[data-cy=sign-in-gate-mandatory]').should('not.exist');
			});

			it('not render the gate unless the user has consented to CMP banner for control', function () {
				setMvtCookie('890002');
				visitArticleAndScrollToGateForLazyLoad();
				cy.get('[data-cy=sign-in-gate-mandatory]').should('not.exist');
			});

			it('should render a gate without a dismiss button', function () {
				setMvtCookie('890001');
				visitArticleAndScrollToGateForLazyLoad();
				findCmpIframe().contains('Yes, I’m happy').click();
				setArticleCount(3);
				visitArticleAndScrollToGateForLazyLoad();

				cy.get('[data-cy=sign-in-gate-mandatory]').should('be.visible');
				cy.contains('I’ll do it later').should('not.exist');
			});

			it('should render a gate with a dismiss button for the control', function () {
				setMvtCookie('890002');
				visitArticleAndScrollToGateForLazyLoad();
				findCmpIframe().contains('Yes, I’m happy').click();
				setArticleCount(3);

				visitArticleAndScrollToGateForLazyLoad();

				cy.get('[data-cy=sign-in-gate-main]').should('be.visible');
				cy.contains('I’ll do it later').should('be.visible');
			});
		});
	});
});
