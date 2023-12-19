import { disableCMP } from '../../lib/disableCMP';
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';
import { Standard } from '../../../fixtures/generated/articles/Standard';
import { Labs } from '../../../fixtures/generated/articles/Labs';
import { MorningDate, AfternoonDate } from '../../lib/mockDate';
import {
	SUBSCRIPTION_HEADER,
	SIGN_IN_PROMPT,
	SIGN_IN_INCENTIVES_DIGITAL,
	COMPLETE_REGISTRATION_BUTTON,
} from '../../../src/lib/signInAfterCheckOutText';
/* eslint-disable no-undef */
/* eslint-disable func-names */

describe('Sign In Gate Tests', function () {
	beforeEach(function () {
		setLocalBaseUrl();
	});

	const setArticleCount = (n) => {
		// set article count for today to be n
		localStorage.setItem(
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
		cy.setCookie('GU_mvt_id', str, {
			log: true,
		});
	};

	const setGuCOCompleteCookie = (userType, productType) => {
		cy.setCookie(
			'GU_CO_COMPLETE',
			encodeURIComponent(
				`{"userType":"${userType}","product":"${productType}"}`,
			),
		);
	};

	const GATE_HEADER = 'Register: it’s quick and easy';
	// helper method over the cypress visit method to avoid having to repeat the same url by setting a default
	// can override the parameter if required

	const postArticle = ({ fixture, switchOverride }) => {
		const articleJson = {
			...fixture,
			config: {
				...fixture.config,
				switches: {
					...fixture.switches,
					...switchOverride,
					okta: false,
					idCookieRefresh: false,
				},
			},
		};
		cy.visit(`/Article`, {
			method: 'POST',
			body: JSON.stringify(articleJson),
			headers: {
				'Content-Type': 'application/json',
			},
		});
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
		fixture = Standard,
		roughPosition,
	} = {}) => {
		postArticle({ fixture });
		scrollToGateForLazyLoading(roughPosition);
	};

	const postArticleAndScrollToGateForLazyLoad = ({
		roughPosition,
		switchOverride = {},
	} = {}) => {
		postArticle({ fixture: Standard, switchOverride });
		scrollToGateForLazyLoading(roughPosition);
	};

	describe('SignInGateMain', function () {
		beforeEach(function () {
			disableCMP();
			// sign in gate main runs from 0-900000 MVT IDs, so 400 forces user into test
			setMvtCookie('400000');

			// set article count to be min number to view gate
			setArticleCount(3);
		});
		it('should load the sign in gate', function () {
			visitArticleAndScrollToGateForLazyLoad();

			cy.get('[data-testid=sign-in-gate-main]').should('be.visible');
			cy.get('[data-testid=sign-in-gate-main]').contains(GATE_HEADER);

			cy.get('[data-testid=sign-in-gate-main_register]')
				.should('have.attr', 'href')
				.and('contains', '/register?returnUrl=')
				.and('contains', 'SignInGateMain');
		});

		it('should not load the sign in gate if the user has not read at least 3 article in a day', function () {
			setArticleCount(1);

			visitArticleAndScrollToGateForLazyLoad();

			cy.get('[data-testid=sign-in-gate-main]').should('not.exist');
		});

		describe('AB Test -> Test varying sign in gate frequency by page view time of day', function () {
			beforeEach(function () {
				// Putting user into the second half of the audience segment where this
				// test is running
				setMvtCookie('850000');
			});

			it('should load the gate on every article view if user is reading in the morning', function () {
				setArticleCount(1);

				cy.visit(
					'/Article/https://www.theguardian.com/games/2018/aug/23/nier-automata-yoko-taro-interview',
					{
						onBeforeLoad: (win) => {
							win.Date = MorningDate;
						},
					},
				);

				scrollToGateForLazyLoading();

				cy.get('[data-testid=sign-in-gate-main]').should('be.visible');
				cy.get('[data-testid=sign-in-gate-main_register]')
					.should('have.attr', 'href')
					.and('contains', 'abTestName%3DSignInGateTimesOfDay');
			});

			it('should not load the gate on every article view if user is reading in the afternoon', function () {
				setArticleCount(1);

				cy.visit(
					'/Article/https://www.theguardian.com/games/2018/aug/23/nier-automata-yoko-taro-interview',
					{
						onBeforeLoad: (win) => {
							win.Date = AfternoonDate;
						},
					},
				);

				scrollToGateForLazyLoading();

				cy.get('[data-testid=sign-in-gate-main]').should('not.exist');
			});

			it('should load the gate on every third article view if user is reading at a time other than morning', function () {
				setArticleCount(3);

				cy.visit(
					'/Article/https://www.theguardian.com/games/2018/aug/23/nier-automata-yoko-taro-interview',
					{
						onBeforeLoad: (win) => {
							win.Date = AfternoonDate;
						},
					},
				);

				scrollToGateForLazyLoading();

				cy.get('[data-testid=sign-in-gate-main]').should('be.visible');
				cy.get('[data-testid=sign-in-gate-main_register]')
					.should('have.attr', 'href')
					.and('contains', 'abTestName%3DSignInGateTimesOfDay');
			});
		});

		it('should not load the sign in gate if the user is signed in', function () {
			// use GU_U cookie to determine if user is signed in
			cy.setCookie(
				'GU_U',
				'MCwCFHbDHWevL_GqgH0CcbeDWp4N9kR5AhQ2lD3zMjjbKJAgC7FUDtc18Ac8BA',
				{ log: true },
			);

			visitArticleAndScrollToGateForLazyLoad();

			cy.get('[data-testid=sign-in-gate-main]').should('not.exist');
		});

		it('should not load the sign in gate if the user has already dismissed the gate', function () {
			localStorage.setItem(
				'gu.prefs.sign-in-gate',
				`{
                    "value": {
                        "SignInGateMain-main-variant-5": "2020-07-22T08:25:05.567Z",
                        "gate-dismissed-count-SignInGateMain-main-variant-5": 6
                    }
                }`,
			);

			visitArticleAndScrollToGateForLazyLoad();

			cy.get('[data-testid=sign-in-gate-main]').should('not.exist');
		});

		it('should not load the sign in gate if the article is not a valid section (membership)', function () {
			visitArticleAndScrollToGateForLazyLoad({
				fixture: {
					...Standard,
					config: {
						...Standard.config,
						section: 'membership',
					},
				},
			});

			cy.get('[data-testid=sign-in-gate-main]').should('not.exist');
		});

		it('should not load the sign in gate if the article is a paid article', function () {
			cy.on('uncaught:exception', (err) => {
				if (err.message.includes('window.require')) {
					// This error is unrelated to the test in question so return  false to prevent
					// this error from failing this test
					return false;
				}
			});
			visitArticleAndScrollToGateForLazyLoad({ fixture: Labs });

			cy.get('[data-testid=sign-in-gate-main]').should('not.exist');
		});

		it('should not load the sign in gate on a device with an ios9 user agent string', function () {
			// can't use visitArticleAndScrollToGateForLazyLoad for this method as overriding user agent
			cy.visit(
				'/Article/https://www.theguardian.com/games/2018/aug/23/nier-automata-yoko-taro-interview',
				{
					onBeforeLoad: (win) => {
						Object.defineProperty(win.navigator, 'userAgent', {
							value: 'Mozilla/5.0 (iPad; CPU OS 9_0 like Mac OS X) AppleWebKit/601.1.17 (KHTML, like Gecko) Version/8.0 Mobile/13A175 Safari/600.1.4',
						});
					},
				},
			);
			scrollToGateForLazyLoading();

			cy.get('[data-testid=sign-in-gate-main]').should('not.exist');
		});

		it('should remove gate when the dismiss button is clicked', function () {
			visitArticleAndScrollToGateForLazyLoad();

			cy.get('[data-testid=sign-in-gate-main]').should('be.visible');

			cy.get('[data-testid=sign-in-gate-main_dismiss]').click();

			cy.get('[data-testid=sign-in-gate-main]').should('not.exist');
		});

		it('register CTA button should contain correct profile.theguardian.com href', function () {
			visitArticleAndScrollToGateForLazyLoad();

			cy.get('[data-testid=sign-in-gate-main]').should('be.visible');

			cy.get('[data-testid=sign-in-gate-main_register]')
				.invoke('attr', 'href')
				.should('contains', 'profile.theguardian.com/register');
		});

		it('sign in link should contain correct profile.theguardian.com href', function () {
			visitArticleAndScrollToGateForLazyLoad();

			cy.get('[data-testid=sign-in-gate-main]').should('be.visible');

			cy.get('[data-testid=sign-in-gate-main_signin]')
				.invoke('attr', 'href')
				.should('contains', 'profile.theguardian.com/signin');
		});

		it('should show cmp ui when privacy settings link is clicked', function () {
			visitArticleAndScrollToGateForLazyLoad();

			cy.get('[data-testid=sign-in-gate-main]').should('be.visible');

			cy.get('[data-testid=sign-in-gate-main_privacy]').click();

			cy.contains('privacy settings');
		});

		describe('Sign in gate should personalise based on the GU_CO_COMPLETE cookie', function () {
			it('should show the main sign in gate if GU_CO_COMPLETE if not present', function () {
				postArticleAndScrollToGateForLazyLoad({
					switchOverride: {
						personaliseSignInGateAfterCheckout: true,
					},
				});

				cy.get('[data-testid=sign-in-gate-main]').should('be.visible');
				cy.get('[data-testid=sign-in-gate-main]').contains(GATE_HEADER);
				cy.get('[data-testid=sign-in-gate-main]').contains(
					'It’s still free to read – this is not a paywall',
				);
				cy.get('[data-testid=sign-in-gate-main]').contains(
					'We’re committed to keeping our quality reporting open.',
				);
				cy.get('[data-testid=sign-in-gate-main_register]').contains(
					'Register for free',
				);
			});

			it('should show the main sign in gate if GU_CO_COMPLETE is present but flag is false', function () {
				setGuCOCompleteCookie('new', 'SupporterPlus');

				postArticleAndScrollToGateForLazyLoad({
					switchOverride: {
						personaliseSignInGateAfterCheckout: false,
					},
				});

				cy.get('[data-testid=sign-in-gate-main]').should('be.visible');
				cy.get('[data-testid=sign-in-gate-main]').contains(GATE_HEADER);
				cy.get('[data-testid=sign-in-gate-main_register]')
					.should('have.attr', 'href')
					.and('contains', '/register?returnUrl=')
					.and('contains', 'main_variant_')
					.and('not.contains', 'personalised_new_SupporterPlus');
			});

			it('should show personalised copy when a user has the relevant cookie', function () {
				setGuCOCompleteCookie('new', 'SupporterPlus');

				postArticleAndScrollToGateForLazyLoad({
					switchOverride: {
						personaliseSignInGateAfterCheckout: true,
					},
				});

				cy.get('[data-testid=sign-in-gate-main]').should('be.visible');
				cy.get('[data-testid=sign-in-gate-main]').contains(
					SUBSCRIPTION_HEADER,
				);
				cy.get('[data-testid=sign-in-gate-main]').contains(
					SIGN_IN_PROMPT,
				);
				SIGN_IN_INCENTIVES_DIGITAL.forEach((item) => {
					cy.get('[data-testid=sign-in-gate-main]').contains(item);
				});
				cy.get('[data-testid=sign-in-gate-main_register]').contains(
					COMPLETE_REGISTRATION_BUTTON,
				);
				cy.get('[data-testid=sign-in-gate-main_register]')
					.should('have.attr', 'href')
					.and('contains', '/register?returnUrl=')
					.and('contains', 'personalised_new_SupporterPlus');
			});

			it('should show the main sign in gate when GU_CO_COMPLETE is present but with invalid contents', function () {
				setGuCOCompleteCookie('invalid', 'Contribution');

				postArticleAndScrollToGateForLazyLoad({
					switchOverride: {
						personaliseSignInGateAfterCheckout: true,
					},
				});

				cy.get('[data-testid=sign-in-gate-main]').should('be.visible');
				cy.get('[data-testid=sign-in-gate-main]').contains(GATE_HEADER);
				cy.get('[data-testid=sign-in-gate-main_register]')
					.should('have.attr', 'href')
					.and('contains', '/register?returnUrl=')
					.and('not.contains', 'personalised');
			});
		});
	});
});
