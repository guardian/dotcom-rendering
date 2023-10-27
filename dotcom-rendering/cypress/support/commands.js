import 'cypress-wait-until';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('hydrate', () => {
	return cy
		.get('gu-island')
		.each((el) => {
			const deferuntil = el.attr('deferuntil');
			const name = el.attr('name');
			const islandMeta = `island: ${name} defer: ${deferuntil}`;

			if (['idle', 'visible', undefined].includes(deferuntil)) {
				const action = !!el.attr('clientOnly')
					? 'rendered'
					: 'hydrated';
				cy.log(`Scrolling to ${islandMeta}`);
				cy.wrap(el)
					.scrollIntoView({ duration: 1000, timeout: 30000 })
					.should('have.attr', 'data-island-status', action, {
						timeout: 30000,
					});
				// Additional wait to ensure island defer=visible has triggered
				// eslint-disable-next-line cypress/no-unnecessary-waiting
				cy.wait(1000);
			} else {
				cy.log(`Skipping ${islandMeta}`);
			}
		})
		.then(() => {
			cy.scrollTo('top');
			// Additional wait to ensure layout shift has completed post hydration
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(5000);
		});
});

// Further support for hydrate command in user-features.cy.js

const MANAGE_MY_COOKIES_BUTTON = 'button.sp_choice_type_12';
const REJECT_ALL_BUTTON = 'button.sp_choice_type_REJECT_ALL';
const ACCEPT_BUTTON = 'button.sp_choice_type_11';

Cypress.Commands.add('rejectAllConsent', () => {
	cy.getIframeBody('sp_message_iframe_')
		.find(MANAGE_MY_COOKIES_BUTTON)
		.click();

	cy.getIframeBody('iframe[title="SP Consent Message"]')
		.find(REJECT_ALL_BUTTON, { timeout: 30000 })
		.click()
		.then(() => {
			cy.get('#dfp-ad--top-above-nav').should('not.exist');
		});
});

// Cypress.Commands.add('allowAllConsent', () => {
// 	cy.getIframeBody('sp_message_iframe_')
// 		.find(ACCEPT_BUTTON, { timeout: 30000 })
// 		.click()
// 		.then(() => {
// 			cy.get('#dfp-ad--top-above-nav').should('not.exist');
// 		});
// });

Cypress.Commands.add('getIframeBody', (selector) => {
	// get the iframe > document > body
	// and retry until the body element is not empty
	return (
		// wraps "body" DOM element to allow
		// chaining more Cypress commands, like ".find(...)"
		// https://on.cypress.io/wrap
		cy
			.get(
				selector.startsWith('iframe')
					? selector
					: `iframe[id^="${selector}"`,
				{
					timeout: 10000,
				},
			)
			.its('0.contentDocument.body')
			.should('not.be.empty').then <
		Element >
		cy.wrap
	);
});
