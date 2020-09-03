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
beforeEach(function () {
    // Set the Consetn Cookies
    cy.setCookie('consentUUID', '9c1d1bdd-3322-416a-ad9f-33773423e17c', {
        log: true,
    });

    cy.setCookie(
        'euconsent-v2',
        'CO4RvfjO4RvfjAGABCENAzCgAP_AAGfAAAwIGStT_S9fb2-je_59d9t0eY1f9763tewjhgeMs-8NwRuW_J4WrmMyvB34JqAKGAgEujJBAQdlGGDcRQgAwIkFgTLMYk2MiwNKJrJEClIbc2dYGC1PnUVDuQCY7E--Pvrzvl-6-33_4GSEAGAAKAQACGAgIEihUIAEIQxIAAAACggAAgEkAAAgQLIoCOEAAABAYAIAAAAAggAIBAAIAAEBAAAAAAIAQARAIAAQACAEAAAAAEEABIgAAACAEhAAAAAKAAAUAAAIAgAAAAAR3wEhkAwAFQATABHACkAGWANQAcQA_ACMAJiATYAtEaACADMAx4RAUABUAFYARIApABlgDUAGyAOIAfgBGAClgGsAPkAhsBF4CRAE2AJ2AUiAuQQACAAcANoJAqAAWABUADIAHAAPAAgABUAD4AIgATIAqgCsAFgAN4Ac4BEAESAJoAUoAwwBlgDUAGyAOIAfEA-wD9AIwAYoA1gBtADcAHyAQ2AioBF4CRAExAJlATYAnYBSICxQFsALkCgAgAjgMeDQFgAVABWAESAKQAZYA0gBqADZAHEAPwAjABSwDWAHyAQ2Ai8BIgCbAE7AKRAXIAxgMADAAcANoA6gqAgACoAJgAjgBSADLAGoAOIAfgBGAClgJBATEAmwBcgC8wGRCgAYA2gCOAI9HQKAAFgAVAAuABkADgAIAAYgA-ACIAEyAKoArABYADEAG8AOYAiABNQCjAKUAaQA1ABswDfAOAAcUA-wD8AIwAXMAvIBigDcAHTAQ2AiIBF4CQQEiAJsATsAsWBbAFsgLkHgAwAjwMcAx0BkRCAqAAsADIAMQAmABVADeAI4AUgA1ABvgDiAH4ARgAxQCQQEiAJsAWKAtGBbAFsgLkIgAQGPEoCwACwALgAZAA4ADEAIgATAAqgBiADbAIgAiYBSAFKANIAbIA_ACMAGKANwAi8BIgCbAFikwAQARwGPFID4ACwAKgAXAAyABwAEAAMQAiABMACkAFUALAAYgA5gCIgFGAUoA0gBsgDigH2AfgBGAC8gG0ANwAi8BIgCbAE7ALFAWwAuQqAEAB8AEcBjwDIA.YAAAAAAAAAAA',
        {
            log: true,
        },
    );
});

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, runnable) => {
    // don't break our tests if sourcepoint code breaks
    if (/wrapperMessagingWithoutDetection/.test(err.stack)) {
        console.warn(err);
        return false;
    }

    return true;
});
