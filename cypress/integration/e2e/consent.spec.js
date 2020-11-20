import { getPolyfill } from '../../lib/polyfill';
import { fetchPolyfill } from '../../lib/config';

const firstPage =
    'https://www.theguardian.com/environment/2020/oct/13/maverick-rewilders-endangered-species-extinction-conservation-uk-wildlife';

const secondPage =
    'https://www.theguardian.com/environment/2020/nov/19/blue-whale-sightings-off-south-georgia-raise-hopes-of-recovery';

describe('Consent tests', function () {
    before(getPolyfill);

    const cmpIframe = () => {
        return cy
            .get('iframe[id*="sp_message_iframe"]')
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .then(cy.wrap);
    };

    const privacySettingsIframe = () => {
        return cy
            .get('[src*="https://cdn.privacy-mgmt.com/privacy-manager"]')
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .then(cy.wrap);
    };

    beforeEach(function () {
        // Reset CMP cookies before each test
        cy.clearCookie('consentUUID');
        cy.clearCookie('euconsent-v2');
        // Setup a listener for calls to Google Analytics
        cy.server();
        cy.route({
            method: 'POST',
            url: 'https://www.google-analytics.com/**',
        }).as('theCallToGoogle');
    });

    const checkGoogleIsNotCalled = () => {
        // This check is not ideal, it's fundamentally flakey and subject to failure if network
        // conditions change. The problem is we want to assert that an event did _not_ happen but it's
        // hard to verify the absence of an action. However, given GA is a thrid party lib over
        // which we have no control, there's no obvious, better way to do this.
        cy.on('fail', (err, runnable) => {
            // We can end up here for three possible reasons:
            // 1. No request ever occured. This is our success path as we were not expecting one
            // 2. If the request DID happen then we throw the error 'Unexpected call to Google'
            // 3. There was another failure in the test
            //
            // We use the assertion below to genuinely fail the test in the event it wasn't point 1
            expect(err.message).to.include('No request ever occurred.');
        });
        // Wait to see if a call is made to Google. We expect this wait to timeout and we capture
        // this fail event using the cy.on('fail') function above
        cy.wait('@theCallToGoogle', { timeout: 2000 }).then((xhr) => {
            // We don't expect this call to be made so if it IS then we want to fail the test
            throw new Error(
                'We called Google even after the Reject All action!',
            );
        });
    };

    it('should not call Google Analytics if the reader rejects consent', function () {
        cy.visit(`Article?url=${firstPage}`, fetchPolyfill);
        // Open the Privacy setting dialogue
        cmpIframe().contains("It's your choice");
        cmpIframe().find("[title='Manage my cookies']").click();
        // Reject tracking cookies
        privacySettingsIframe().contains('Privacy settings');
        privacySettingsIframe().find("[title='Reject all']").click();
        // Make a second page load now that we have the CMP cookies set to reject tracking
        cy.visit(`Article?url=${secondPage}`, fetchPolyfill);
        checkGoogleIsNotCalled();
    });

    it('should not call Google Analytics if the reader has yet to make a choice about consent', function () {
        cy.visit(`Article?url=${firstPage}`, fetchPolyfill);
        checkGoogleIsNotCalled();
    });

    it('should make calls Google Analytics after the reader consents', function () {
        cy.visit(`Article?url=${firstPage}`, fetchPolyfill);
        // Open the Privacy setting dialogue
        cmpIframe().contains("It's your choice");
        cmpIframe().find("[title='Manage my cookies']").click();
        // Accept tracking cookies
        privacySettingsIframe().contains('Privacy settings');
        privacySettingsIframe().find("[title='Accept all']").click();
        // Make a second page load now that we have the CMP cookies set to accept tracking
        cy.visit(`Article?url=${secondPage}`, fetchPolyfill);
        // Wait for a call to Google Analytics to be made - we expect this to happen
        cy.wait('@theCallToGoogle', { timeout: 3000 });
    });
});
