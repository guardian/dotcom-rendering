import { getPolyfill } from '../../lib/polyfill';
import { fetchPolyfill } from '../../lib/config';

describe('Commercial E2E tests', function () {
    before(getPolyfill);

    const url =
        'https://www.theguardian.com/environment/2020/oct/13/maverick-rewilders-endangered-species-extinction-conservation-uk-wildlife';

    it('should render', function () {
        cy.log(`Opening A long read`);
        cy.visit(url, fetchPolyfill);

        cy.scrollTo('bottom', { duration: 500 });

        cy.get(`Manage my cookies`, 'Manage my cookies').click();
        // cy.get(`[data-link-name=privacy-settings]`).click();
    });
});
