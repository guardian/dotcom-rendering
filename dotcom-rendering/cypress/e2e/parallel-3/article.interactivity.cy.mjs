/* eslint-disable no-undef */
/* eslint-disable func-names */
import { mockApi } from '../../lib/mocks';
import { disableCMP } from '../../lib/disableCMP';
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.mjs';

const READER_REVENUE_TITLE_TEXT = 'Support the';
const articleUrl =
	'https://www.theguardian.com/politics/2019/oct/29/tories-restore-party-whip-to-10-mps-who-sought-to-block-no-deal-brexit';

describe('Interactivity', function () {
	beforeEach(function () {
		disableCMP();
		setLocalBaseUrl();
	});

	describe('Verify elements have been hydrated', function () {
		it('should open the edition dropdown menu when clicked and hide when expected', function () {
			cy.visit(`/Article/${articleUrl}`);
			cy.get('[data-cy=dropdown-options]').should('not.be.visible');
			// Open it
			cy.get('[data-cy=dropdown-button]').click();
			cy.get('[data-cy=dropdown-options]').should('be.visible');
			// Pressing esc hides it
			cy.get('body').type('{esc}', { force: true });
			cy.get('[data-cy=dropdown-options]').should('not.be.visible');
			// Open it again
			cy.get('[data-cy=dropdown-button]').click();
			cy.get('[data-cy=dropdown-options]').should('be.visible');
			// Clicking elsewhere in the document hides it
			cy.get('h1').click();
			cy.get('[data-cy=dropdown-options]').should('not.be.visible');
		});
		// eslint-disable-next-line mocha/no-skipped-tests
		it.skip('should display the share count for an article', function () {
			cy.visit(`/Article/${articleUrl}`);
			cy.get('[data-cy=share-counts]').should('exist');
		});
		it('loads the discussion when you click the comment count', function () {
			cy.visit(
				`/Article/https://www.theguardian.com/commentisfree/2022/jan/20/uk-government-yemen-war-saudi-arabia-westminster`,
			);
			cy.get('[data-cy=comment-counts]').should('exist');
			// The discusion is not yet loaded
			cy.get('[data-cy=discussion]').should('not.exist');
			// Click the comment count
			cy.get('[data-cy=comment-counts]').click();
			cy.get('[data-cy=discussion]').should('exist');
		});
		it('loads the discussion immediately when you use a url ending in #comments', function () {
			cy.visit(
				`/Article/https://www.theguardian.com/commentisfree/2022/jan/20/uk-government-yemen-war-saudi-arabia-westminster#comments`,
			);
			cy.get('[data-cy=discussion]').should('exist');
		});
		// eslint-disable-next-line mocha/no-skipped-tests
		it('loads the discussion immediately when you use a permalink', function () {
			// The permalink feature is not currently working but once it does we want this test ready to go
			cy.visit(
				`/Article/https://www.theguardian.com/commentisfree/2022/jan/20/uk-government-yemen-war-saudi-arabia-westminster#comment-154433663`,
			);
			cy.get('gu-island[name=DiscussionContainer]').should(
				'have.attr',
				'data-island-status',
				'rendered',
			);
			cy.get('[id=comment-154433663]').should('be.visible');
		});
		it('loads the most viwed list only after starting to scroll the page', function () {
			cy.visit(`/Article/${articleUrl}`);
			cy.get('[data-component=geo-most-popular]').should('not.exist');
			cy.scrollTo('center', { duration: 300 });
			cy.get('[data-component=geo-most-popular]').should('exist');
		});
		it('should display and hydrate all the rich links for an article', function () {
			cy.visit(`/Article/${articleUrl}`);
			// Verify two links were server rendered
			cy.get('[data-component=rich-link]')
				.should('exist')
				.its('length')
				.should('eq', 2);
			// Verify hydration
			cy.get('img[alt="Michael Barnier and the EU flag"]').should(
				'be.visible',
			);
		});
		describe('When most viewed is mocked', function () {
			beforeEach(mockApi);
			it('should change the list of most viewed items when a tab is clicked', function () {
				cy.visit(`/Article/${articleUrl}`);
				cy.contains('Lifestyle');
				// Make sure the most viewed html isn't even in the dom yet
				cy.get('[data-cy=mostviewed-footer]').should('not.exist');
				// Scroll to bottom to trigger hydration
				cy.scrollTo('bottom', { duration: 300 });
				// We need this second call to fix flakiness where content loads in pushing the page
				// down and preventing the scroll request to actually reach the bottom. We will fix
				// this later when we've defined fixed heights for these containers, preventing CLS
				cy.scrollTo('bottom', { duration: 300 });
				// Wait for hydration
				cy.get('gu-island[name=MostViewedFooterData]')
					.last()
					.should('have.attr', 'data-island-status', 'rendered');
				cy.wait('@getMostRead');
				cy.wait('@getMostReadGeo');
				cy.get('[data-cy=mostviewed-footer]').should('exist');
				cy.get('[data-cy=tab-body-0]').should('be.visible');
				cy.get('[data-cy=tab-body-1]').should('not.be.visible');
				cy.get('[data-cy=tab-heading-1]').click();
				cy.get('[data-cy=tab-body-0]').should('not.be.visible');
				cy.get('[data-cy=tab-body-1]').should('be.visible');
			});
		});
		it('should render the reader revenue links in the header', function () {
			cy.visit(`/Article/${articleUrl}`);
			cy.scrollTo('bottom', { duration: 300 });
			cy.get('header')
				.contains(READER_REVENUE_TITLE_TEXT)
				.should('be.visible');
		});
	});

	describe('Navigating the pillar menu', function () {
		it('should expand and close the desktop pillar menu when More is clicked', function () {
			cy.visit(`/Article/${articleUrl}`);
			cy.get('[data-cy=nav-show-more-button]').click();
			cy.get('[data-cy=expanded-menu]').within(() => {
				cy.contains('Columnists').should('be.visible');
			});
			// Assert first item is highlighted
			cy.get('[data-cy="newsLinks"] > li')
				.eq(1)
				.within(() => {
					cy.get('a').should('have.focus');
				});
			// check focus is on menu button on close
			cy.focused().type('{esc}');
			cy.focused().should('have.attr', 'data-cy', 'nav-show-more-button');

			// TODO: should also include assertion to select menu item when AD z-index fixed
			// See: https://trello.com/c/y8CyFKJm/1524-top-nav-ad-and-nav-z-index-issue
		});

		describe('On mobile', function () {
			it('should expand the mobile pillar menu when the VeggieBurger is clicked', function () {
				cy.viewport('iphone-x');
				cy.visit(`/Article/${articleUrl}`);
				cy.get('[data-cy=veggie-burger]').click();
				cy.contains('Crosswords');
				cy.get('[data-cy=column-collapse-Opinion]').click();
				cy.contains('Columnists').should('be.visible');
				// this input element is not visible and typing into it will cause Cypress to fail to type - so force override
				// https://docs.cypress.io/guides/references/error-messages#cy-failed-because-the-element-cannot-be-interacted-with
				cy.focused().type('{esc}', { force: true });
				// check focus is on veggie burger menu button on close
				cy.focused().should('have.attr', 'data-cy', 'veggie-burger');
			});

			it('should transfer focus to the sub nav when tabbing from the veggie burger without opening the menu', function () {
				cy.viewport('iphone-x');
				cy.visit(`/Article/${articleUrl}`);
				cy.get('[data-cy=veggie-burger]').focus().tab();
				cy.get('[data-cy=sub-nav] a').first().should('have.focus');
			});

			it('should immediately focus on the News menu item when the menu first opens', function () {
				cy.viewport('iphone-x');
				cy.visit(`/Article/${articleUrl}`);
				cy.get('[data-cy=veggie-burger]').click();
				cy.get('[data-cy=column-collapse-News]').should('have.focus');
			});

			it('should transfer focus to sub menu items when tabbing from section header', function () {
				cy.viewport('iphone-x');
				cy.visit(`/Article/${articleUrl}`);
				cy.get('[data-cy=veggie-burger]').click();
				cy.focused().type('{enter}').tab();
				// get the first column (news column)
				cy.get('[data-cy="nav-menu-columns"] li')
					.first()
					.within(() => {
						// get the first element in that column
						cy.get('ul > li > a').first().should('have.focus');
					});
			});

			it('should let reader traverse section titles using keyboard', function () {
				cy.viewport('iphone-x');
				cy.visit(`/Article/${articleUrl}`);
				cy.get('[data-cy=veggie-burger]').type('{enter}');
				// Close the news menu
				cy.focused().type('{enter}').tab();
				cy.focused().should(
					'have.attr',
					'data-cy',
					'column-collapse-Opinion',
				);
				// Open the opinion menu
				cy.focused().type('{enter}').tab();
				cy.focused().should(
					'have.attr',
					'data-cy',
					'column-collapse-sublink-Opinion',
				);
			});

			it('should expand the subnav when "More" is clicked', function () {
				cy.viewport('iphone-x');
				cy.visit(`/Article/${articleUrl}`);
				// Wait for hydration
				cy.get('gu-island[name=SubNav]')
					.first()
					.should('have.attr', 'data-island-status', 'hydrated');
				// Both subnav buttons show 'More'
				cy.get('[data-cy=subnav-toggle]').first().contains('More');
				cy.get('[data-cy=subnav-toggle]').last().contains('More');
				// Click Show more in the first sub nav
				cy.get('[data-cy=subnav-toggle]').first().click();
				// The first button now shows 'Less'
				cy.get('[data-cy=subnav-toggle]').first().contains('Less');
				// Scroll to bottom to trigger hydration
				cy.scrollTo('bottom', { duration: 300 });
				// We need this second call to fix flakiness where content loads in pushing the page
				// down and preventing the scroll request to actually reach the bottom. We will fix
				// this later when we've defined fixed heights for these containers, preventing CLS
				cy.scrollTo('bottom', { duration: 300 });
				// Wait for hydration
				cy.get('gu-island[name=SubNav]')
					.last()
					.should('have.attr', 'data-island-status', 'hydrated');
				// The other subnav still shows 'More'
				cy.get('[data-cy=subnav-toggle]').last().contains('More');
				// Click Show more on the last sub nav
				cy.get('[data-cy=subnav-toggle]').last().click();
				// Both subnav buttons show 'Less'
				cy.get('[data-cy=subnav-toggle]').first().contains('Less');
				cy.get('[data-cy=subnav-toggle]').last().contains('Less');
			});
		});
	});
});
