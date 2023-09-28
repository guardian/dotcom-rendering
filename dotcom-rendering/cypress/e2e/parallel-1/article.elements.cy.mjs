import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.mjs';
import { disableCMP } from '../../lib/disableCMP.mjs';

describe('Elements', function () {
	beforeEach(function () {
		disableCMP();
		setLocalBaseUrl();
	});

	describe('AMP', function () {
		// Based on examples from this blog post about working with iframes in Cypress
		// https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/
		const getAmpIframeBody = (iframeSelector) => {
			// get the iframe > document > body
			// and retry until the body element is not empty
			return (
				cy
					.get(iframeSelector, { timeout: 30000 })
					.its('0.contentDocument.body')
					.should('not.be.empty')
					// wraps "body" DOM element to allow
					// chaining more Cypress commands, like ".find(...)"
					// https://on.cypress.io/wrap
					.then(cy.wrap)
			);
		};

		it('should render the corona interactive atom embed', function () {
			cy.visit(
				'/AMPArticle/https://www.theguardian.com/world/2020/apr/24/new-mother-dies-of-coronavirus-six-days-after-giving-birth',
			);

			getAmpIframeBody('amp-iframe[data-cy="atom-embed-url"] > iframe', {
				timeout: 30000,
			}).contains('Daily cases');
		});

		it('should render the counted interactive embed', function () {
			cy.visit(
				'/AMPArticle/https://www.theguardian.com/us-news/2015/nov/05/police-tasers-deaths-the-counted',
			);

			const ampIframeSelector =
				'amp-iframe[src="https://interactive.guim.co.uk/embed/2015/10/2015-10-counted-table/"]';

			cy.get(ampIframeSelector).scrollIntoView({
				duration: 300,
				offset: { top: -100, left: 0 },
			});

			getAmpIframeBody(`${ampIframeSelector} > iframe`).contains(
				'Deaths after Taser use: the findings',
			);
		});
	});

	describe('WEB', function () {
		it('should render the page as expected', function () {
			cy.viewport('iphone-x');
			const iphoneXWidth = 375;
			let hasElementTooWide = false;

			cy.visit(
				'/Article/https://www.theguardian.com/politics/2022/jan/21/blackmail-allegations-need-to-be-investigated-says-kwasi-kwarteng',
			);

			const pageHasXOverflow = (docWidth) => {
				return cy.get('*').each(($el) => {
					if (
						!$el.is('script') && // Remove script elements from check...
						$el.is(':visible') &&
						$el.outerWidth() > docWidth
					) {
						// This is brittle but if we're in here then we're trouble anyway
						// hopefully it shows some context for where the problem comes from
						// but you probably are going to want to be running Cypress locally
						cy.log(
							`At ${$el.outerWidth()}, ${
								$el[0].classList[0]
							} in parent ${
								$el[0].parentElement.classList[0]
							} is wider than ${docWidth}`,
						);
						hasElementTooWide = true;
					}
				});
			};

			cy.wrap(null).then(() =>
				pageHasXOverflow(iphoneXWidth).then(
					() => expect(hasElementTooWide).to.be.false,
				),
			);
		});

		it('should render the click to view overlay revealing the embed when clicked', function () {
			const getIframeBody = () => {
				return cy
					.get('div[data-cy="embed-block"] > div > iframe', {
						timeout: 30000,
					})
					.its('0.contentDocument.body')
					.should('not.be.empty')
					.then(cy.wrap);
			};

			cy.visit(
				'/Article/https://www.theguardian.com/sport/blog/2015/dec/02/the-joy-of-six-sports-radio-documentaries',
			);

			cy.scrollTo(0, 4500);

			// Wait for hydration
			cy.get('gu-island[name=EmbedBlockComponent]')
				.first({ timeout: 30000 })
				.should('have.attr', 'data-island-status', 'hydrated');

			cy.contains('hosted on wnyc.org');

			cy.get('button[data-cy="click-to-view-button"]').click();

			getIframeBody().contains('Radiolab');
		});

		it('should render the interactive using a boot.js', function () {
			const getIframeBody = () => {
				return cy
					.get(
						'[data-cypress="interactive-element-LA%20Rams%20dead%20cap%20numbers"]',
					)
					.scrollIntoView({
						duration: 300,
						offset: { top: -100, left: 0 },
					})
					.get(
						'[data-cypress="interactive-element-LA%20Rams%20dead%20cap%20numbers"] > iframe',
					)
					.its('0.contentDocument.body')
					.should('not.be.empty')
					.then(cy.wrap);
			};

			cy.visit(
				'/Article/https://www.theguardian.com/sport/2019/nov/15/forget-a-super-bowl-slump-the-la-rams-have-a-jared-goff-problem',
			);

			getIframeBody().contains('The Rams’ dead cap numbers for 2020');
		});

		it('should render the interactive using a non-boot.js', function () {
			cy.on('uncaught:exception', (err) => {
				if (err.message.includes('window.require')) {
					// This error is unrelated to the test in question so return  false to prevent
					// this error from failing this test
					return false;
				}
			});

			const getIframeBody = () => {
				return cy
					.get(
						'[data-cypress="interactive-element-pa%20county%20by%20county"]',
					)
					.scrollIntoView({
						duration: 300,
						offset: { top: -100, left: 0 },
					})
					.get(
						'[data-cypress="interactive-element-pa%20county%20by%20county"] > iframe',
					)
					.its('0.contentDocument.body')
					.should('not.be.empty')
					.then(cy.wrap);
			};

			cy.visit(
				'/Article/https://www.theguardian.com/us-news/2017/jan/17/donald-trump-america-great-again-northampton-county-pennsylvania',
			);
			getIframeBody().contains('Switching parties');
		});

		it('should render the soundcloud embed', function () {
			const getIframeBody = () => {
				return cy
					.get('div[data-cy="soundcloud-embed"] > iframe')
					.its('0.contentDocument.body')
					.should('not.be.empty')
					.then(cy.wrap);
			};
			cy.visit(
				'/Article/https://www.theguardian.com/music/2020/jan/31/elon-musk-edm-artist-first-track-dont-doubt-ur-vibe',
			);

			getIframeBody();
		});

		it('should render the football embed', function () {
			const getBody = () => {
				return cy
					.get('div[data-cy="football-table-embed"]')
					.should('not.be.empty')
					.then(cy.wrap);
			};
			cy.visit(
				'/Article/https://www.theguardian.com/football/2020/jun/10/premier-league-restart-preview-no-5-burnley',
			);

			getBody().contains('Liverpool');
		});

		it('should render the affiliate disclaimer block', function () {
			const getBody = () => {
				return cy
					.get('[data-cy="affiliate-disclaimer"]')
					.should('not.be.empty')
					.then(cy.wrap);
			};
			cy.visit(
				'/Article/https://www.theguardian.com/music/2020/jun/15/pet-shop-boys-where-to-start-in-their-back-catalogue',
			);

			getBody().contains('affiliate links');
		});
	});
});
