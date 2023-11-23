import { disableCMP } from '../../lib/disableCMP.js';
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';

describe('The web document renders with the correct meta and analytics elements and attributes', function () {
	beforeEach(function () {
		disableCMP();
		setLocalBaseUrl();
	});

	it(`The page is structured as expected`, function () {
		cy.visit(
			`/Article/https://www.theguardian.com/lifeandstyle/2021/jan/21/never-conduct-any-business-naked-how-to-work-from-bed-without-getting-sacked`,
		);

		cy.get(`head`).should('have.length', 1);

		// Required meta SEO fields exist
		[
			{
				name: 'description',
				value: 'From warming up your voice to avoiding spillages, here are some tips for keeping up professional appearances',
			},
			{
				name: 'viewport',
				value: 'width=device-width,minimum-scale=1,initial-scale=1',
			},
		].map((meta) =>
			cy
				.get(`head meta[name="${meta.name}"]`)
				.should('have.attr', 'content', meta.value),
		);

		// the most important opengraph meta tags exist
		cy.get(`head meta[property="og:url"]`).should('have.length', 1);
		cy.get(`head meta[property="og:description"]`).should('have.length', 1);
		cy.get(`head meta[property="og:title"]`).should('have.length', 1);
		cy.get(`head meta[property="og:type"]`).should('have.length', 1);
		cy.get(`head meta[property="og:image"]`).should('have.length', 1);
		cy.get(`head meta[property="article:author"]`).should('have.length', 1);

		// the most important twitter meta tags exist
		cy.get(`head meta[name="twitter:card"]`).should('have.length', 1);
		cy.get(`head meta[name="twitter:image"]`).should('have.length', 1);
		cy.get(`head meta[name="twitter:site"]`).should('have.length', 1);

		// all the required links exist
		cy.get(`head link[rel="amphtml"]`).should('have.length', 1);
	});

	it('Subnav links exists with correct values', function () {
		cy.visit(
			`/Article/https://www.theguardian.com/lifeandstyle/2021/jan/21/never-conduct-any-business-naked-how-to-work-from-bed-without-getting-sacked`,
		);
		// Pillar ophan data-link-name exists with correct value
		cy.get(`a[data-link-name="nav3 : primary : Opinion"]`).should(
			'have.length',
			1,
		);
		// Only the top subnav is initially rendered so the count here is one
		cy.get(`a[data-link-name="nav2 : subnav : Pensions"]`).should(
			'be.visible',
		);
	});

	it('Meta ophan data-attributes exist, content and attributes are correct', function () {
		cy.visit(
			`/Article/https://www.theguardian.com/lifeandstyle/2021/jan/21/never-conduct-any-business-naked-how-to-work-from-bed-without-getting-sacked`,
		);
		cy.get(`address[data-component="meta-byline"]`).should(
			'have.length',
			1,
		);

		cy.get(`address[data-link-name="byline"]`).should('have.length', 1);

		cy.get(`a[rel="author"]`)
			.contains('Zoe Williams')
			.should(
				'have.attr',
				'href',
				'https://www.theguardian.com/profile/zoewilliams',
			);
	});

	it('Section, Footer and Series ophan data-attributes exist', function () {
		cy.visit(
			`/Article/https://www.theguardian.com/lifeandstyle/2021/jan/21/never-conduct-any-business-naked-how-to-work-from-bed-without-getting-sacked`,
		);
		cy.get(`[data-component="section"]`).should('have.length', 1);

		cy.get(`[data-link-name="article section"]`).should('have.length', 1);

		cy.get(`a[data-component="series"]`).should('have.length', 1);

		cy.get(`a[data-link-name="article series"]`).should('have.length', 1);
		cy.get(`[data-component="footer"]`).should('have.length', 1);

		cy.get(`[data-link-name="footer"]`).should('have.length', 1);

		cy.get(`[data-link-name="footer : primary : Opinion"]`).should(
			'have.length',
			1,
		);
	});
});
