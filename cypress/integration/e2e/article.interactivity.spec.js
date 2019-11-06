import { getPolyfill } from '../../lib/polyfill';
import { mockApi } from '../../lib/mocks';
import { fetchPolyfill } from '../../lib/config';

const READER_REVENUE_TITLE_TEXT = 'Support The';
const articleUrl =
    'https://www.theguardian.com/politics/2019/oct/29/tories-restore-party-whip-to-10-mps-who-sought-to-block-no-deal-brexit';

describe('Interactivity', function() {
    describe('Verify elements have been hydrated', function() {
        it('should open the edition dropdown menu when clicked', function() {
            cy.visit(`/Article?url=${articleUrl}`);
            cy.contains('Australian').should('not.be.visible');
            cy.contains('edition').click();
            cy.contains('Australian')
                .parents('ul')
                .should('be.visible');
        });

        it('should display the expanded pillar menu when More is clicked', function() {
            cy.visit(`/Article?url=${articleUrl}`);
            cy.contains('Crosswords').should('not.exist');
            cy.contains('More').click();
            cy.contains('Crosswords').should('be.visible');
        });

        it('should display the share count for an article', function() {
            cy.visit(`/Article?url=${articleUrl}`);
            cy.get('[data-cy=share-count]').should('exist');
        });

        it('should display all the rich links for an article', function() {
            cy.visit(`/Article?url=${articleUrl}`);
            cy.get('[data-link-name=rich-link]')
                .should('exist')
                .its('length')
                // This count of rich links is dependent on the article that we're testing not changing
                // If this assertion fails then it could be because a link was added or removed in
                // which case this check should be updated
                .should('be', 2);
        });

        describe('When most viewed is mocked', function() {
            beforeEach(getPolyfill);
            beforeEach(mockApi);
            it('should change the list of most viewed items when a tab is clicked', function() {
                cy.visit(`/Article?url=${articleUrl}`, fetchPolyfill);
                cy.get('[data-cy=tab-body-0]').should('be.visible');
                cy.get('[data-cy=tab-body-1]').should('not.be.visible');
                cy.get('[data-cy=tab-heading-1]').click();
                cy.get('[data-cy=tab-body-0]').should('not.be.visible');
                cy.get('[data-cy=tab-body-1]').should('be.visible');
            });
        });

        it('should render the reader revenue links in the header and footer', function() {
            cy.visit(`/Article?url=${articleUrl}`);
            cy.get('header')
                .contains(READER_REVENUE_TITLE_TEXT)
                .should('be.visible');
            cy.get('footer')
                .contains(READER_REVENUE_TITLE_TEXT)
                .should('be.visible');
        });
    });
});
