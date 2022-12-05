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
		.get('gu-island[deferUntil=visible]')
		.each((el) => {
			cy.wrap(el)
				.log(`Scrolling to ${el.attr('name')}`)
				.scrollIntoView({ duration: 100, timeout: 10000 })
				.should('have.attr', 'data-gu-ready', 'true', {
					timeout: 30000,
				});
		})
		.then(() => {
			cy.scrollTo('top');
			// Additional wait to ensure layout shift has completed post hydration
			// Is there a deterministic way to do this?
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(5000);
		});
});
