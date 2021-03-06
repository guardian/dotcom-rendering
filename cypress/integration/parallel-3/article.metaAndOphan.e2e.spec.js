import { disableCMP } from '../../lib/disableCMP.js';
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';

describe('The web document renders with the correct meta and analytics elements and attributes', function () {
	beforeEach(function () {
		disableCMP();
		setLocalBaseUrl();
	});

	const getExists = (selector) => cy.get(selector).should('have.length', 1);

	it(`Has a head element`, function () {
		cy.visit(
			`/Article?url=https://www.theguardian.com/lifeandstyle/2021/jan/21/never-conduct-any-business-naked-how-to-work-from-bed-without-getting-sacked`,
		);
		// cy.get(`head`).should('have.length', 1);
		getExists(`head`);
	});
	it(`Required meta SEO fields exist`, function () {
		const metaTags = [
			{
				name: 'description',
				value:
					'From warming up your voice to avoiding spillages, here are some tips for keeping up professional appearances',
			},
			{
				name: 'viewport',
				value: 'width=device-width,minimum-scale=1,initial-scale=1',
			},
		];

		metaTags.map((meta) =>
			cy
				.get(`head meta[name="${meta.name}"]`)
				.should('have.attr', 'content', meta.value),
		);
	});

	it('that the most important opengraph meta tags exist', function () {
		const names = [
			'og:url',
			'og:description',
			'og:title',
			'og:type',
			'og:image',
			'article:author',
		];

		names.map((name) => getExists(`head meta[property="${name}"]`));
	});

	it('that the most important twitter meta tags exist', function () {
		const names = ['card', 'image', 'site'];

		names.map((name) => getExists(`head meta[name="twitter:${name}"]`));
	});

	it('that all the required links exist', function () {
		const names = ['amphtml'];

		names.map((name) => getExists(`head link[rel="${name}"]`));
	});

	it('Pillar ophan data-link-name exists with correct value', function () {
		getExists(`a[data-link-name="nav2 : primary : Opinion"]`);
	});

	it('Subnav ophan data-link-name exists with correct value', function () {
		cy.get(`a[data-link-name="nav2 : subnav : money/pensions"]`).should(
			'have.length',
			2,
		); // Top and bottom pillar nav

		cy.get(`a[data-link-name="nav2 : subnav : /money/pensions"]`).should(
			'have.length',
			0,
		); // Ensure we don't parse in an accidental slash
	});

	it('Meta ophan data-attributes exist, content and attributes are correct', function () {
		getExists(`address[data-component="meta-byline"]`);

		getExists(`address[data-link-name="byline"]`);

		cy.get(`a[rel="author"]`)
			.contains('Zoe Williams')
			.should(
				'have.attr',
				'href',
				'//www.theguardian.com/profile/zoewilliams',
			);
	});

	it('Section and Series ophan data-attributes exist', function () {
		getExists(`[data-component="section"]`);
		getExists(`[data-link-name="article section"]`);

		getExists(`[data-component="series"]`);
		getExists(`[data-link-name="article series"]`);
	});

	it('Footer ophan data-attributes exist', function () {
		getExists(`[data-component="footer"]`);
		getExists(`[data-link-name="footer"]`);
		getExists(`[data-link-name="footer : primary : Opinion"]`);
	});

	it('Sample of script tags have the correct attributes', function () {
		getExists(`script[type="module"][src="/assets/react.js"]`);
		getExists(`script[defer][nomodule][src="/assets/react.legacy.js"]`);
		getExists(`script[type="module"][src="/assets/ophan.js"]`);
		getExists(`script[defer][nomodule][src="/assets/ophan.legacy.js"]`);
	});
});
