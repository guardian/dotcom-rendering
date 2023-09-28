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
