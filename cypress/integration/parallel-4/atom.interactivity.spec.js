/* eslint-disable no-undef */
/* eslint-disable func-names */
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';
import { disableCMP } from '../../lib/disableCMP.js';

const qandaUrl =
	'https://www.theguardian.com/technology/2018/sep/19/time-to-regulate-bitcoin-says-treasury-committee-report';

const guideUrl =
	'https://www.theguardian.com/environment/2020/aug/01/plan-to-curb-englands-most-polluted-spot-divides-residents';

const profileUrl =
	'https://www.theguardian.com/business/2020/may/11/richard-branson-to-sell-500m-worth-of-virgin-galactic-shares';

const timelineUrl =
	'https://www.theguardian.com/sport/blog/2020/jul/09/why-chris-froome-and-team-ineos-parting-of-the-ways-cycling';
const chartUrl =
	'https://www.theguardian.com/technology/2020/aug/19/apple-becomes-wall-streets-first-2tn-company';

const atomExpandableTests = (type, url) => {
	describe(type, function () {
		beforeEach(function () {
			disableCMP();
			setLocalBaseUrl();
		});

		it('should render', function () {
			cy.visit(`/Article?url=${url}`);
			cy.get(`[data-snippet-type=${type}]`).should('be.visible');
		});

		it('should expand on click', function () {
			cy.visit(`/Article?url=${url}`);
			cy.get(`[data-snippet-type=${type}]`).should('be.visible');
			cy.get(`[data-snippet-type=${type}]`)
				.contains('Show')
				.should('not.be.null');
			cy.get(`[data-snippet-type=${type}]`).click();
			cy.get(`[data-snippet-type=${type}]`)
				.contains('Hide')
				.should('not.be.null');
		});

		it('should expand then contract on second click', function () {
			cy.visit(`/Article?url=${url}`);
			cy.get(`[data-snippet-type=${type}]`).should('be.visible');
			cy.get(`[data-snippet-type=${type}]`)
				.contains('Show')
				.should('not.be.null');
			cy.get(`[data-snippet-type=${type}]`).click();
			cy.get(`[data-snippet-type=${type}]`)
				.contains('Hide')
				.should('not.be.null');
			cy.get(`[data-snippet-type=${type}]`).click();
			cy.get(`[data-snippet-type=${type}]`)
				.contains('Show')
				.should('not.be.null');
		});

		it('should show feedback message when like is clicked', function () {
			cy.visit(`/Article?url=${url}`);
			cy.get(`[data-snippet-type=${type}]`).click();
			cy.get('[data-testid="like"]').click();
			cy.get('[data-testid="feedback"]').should('be.visible');
		});

		it('should show feedback message when dislike is clicked', function () {
			cy.visit(`/Article?url=${url}`);
			cy.get(`[data-snippet-type=${type}]`).click();
			cy.get('[data-testid="dislike"]').click();
			cy.get('[data-testid="feedback"]').should('be.visible');
		});
	});
};

const atomGenericTests = (type, url) => {
	describe(type, function () {
		beforeEach(function () {
			setLocalBaseUrl();
		});

		it('should render', function () {
			cy.visit(`/Article?url=${url}`);
			cy.get(`[data-snippet-type=${type}]`).should('be.visible');
		});
	});
};
atomExpandableTests('qanda', qandaUrl);
atomExpandableTests('guide', guideUrl);
atomExpandableTests('profile', profileUrl);
atomExpandableTests('timeline', timelineUrl);
atomGenericTests('chart', chartUrl);
