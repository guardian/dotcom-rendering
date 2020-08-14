// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-plugin-tab';

// Remove the consent iframe before the tests run
// eslint-disable-next-line mocha/no-top-level-hooks
before(function () {
    cy.setCookie('consentUUID', '9c1d1bdd-3322-416a-ad9f-33773423e17c', {
        log: true,
    });
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
