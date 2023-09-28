/* eslint-disable no-undef */
/* eslint-disable func-names */
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.mjs';
import { disableCMP } from '../../lib/disableCMP.mjs';

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

const quizAtomUrl =
	'https://www.theguardian.com/lifeandstyle/2022/jan/22/kids-quiz-wombats-square-poos-smallest-dog';

const atomExpandableTests = (type, url) => {
	describe(type, function () {
		beforeEach(function () {
			disableCMP();
			setLocalBaseUrl();
		});

		it('should render', function () {
			cy.visit(`/Article/${url}`);
			cy.get(`[data-snippet-type=${type}]`).should('be.visible');
		});

		it('should expand on click', function () {
			cy.visit(`/Article/${url}`);
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
			cy.visit(`/Article/${url}`);
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
			cy.visit(`/Article/${url}`);
			cy.get(`[data-snippet-type=${type}]`).click();
			cy.get('[data-testid="like"]').click();
			cy.get('[data-testid="feedback"]').should('be.visible');
		});

		it('should show feedback message when dislike is clicked', function () {
			cy.visit(`/Article/${url}`);
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
			cy.visit(`/Article/${url}`);
			cy.get(`[data-snippet-type=${type}]`).should('be.visible');
		});
	});
};
atomExpandableTests('qanda', qandaUrl);
atomExpandableTests('guide', guideUrl);
atomExpandableTests('profile', profileUrl);
atomExpandableTests('timeline', timelineUrl);
atomGenericTests('chart', chartUrl);

describe('Why do wombats do square poos?', function () {
	beforeEach(function () {
		disableCMP();
		setLocalBaseUrl();
	});

	it('when I get the answer wrong, it should display the right answer when I click Reveal', function () {
		cy.visit(`/Article/${quizAtomUrl}`);
		// Wait for hydration
		cy.get('gu-island[name=KnowledgeQuizAtomWrapper]')
			.first()
			.should('have.attr', 'data-island-status', 'hydrated');
		// Establish that the elements showing the results are not present
		cy.get('[data-atom-type=knowledgequiz] fieldset')
			.first()
			.get('[data-answer-type=non-selected-correct-answer]')
			.should('not.exist');
		cy.get('[data-atom-type=knowledgequiz] fieldset')
			.first()
			.get('[data-answer-type=non-incorrect-answer]')
			.should('not.exist');
		// Click an incorrect answer
		cy.contains('Because they have square bottoms').click();
		// Click Reveal to show the results
		cy.get('[data-atom-type=knowledgequiz]').contains('Reveal').click();
		// We got the question wrong!
		// Our choice is shown as wrong (red) and the actual correct answer is shown in green
		cy.get('[data-answer-type=incorrect-answer]').should('exist');
		cy.get('[data-answer-type=non-selected-correct-answer]', {
			timeout: 30000,
		}).should('exist');
	});

	it('when I get the answer right, it should commend my skills when I click Reveal', function () {
		cy.visit(`/Article/${quizAtomUrl}`);
		// Wait for hydration
		cy.get('gu-island[name=KnowledgeQuizAtomWrapper]')
			.first()
			.should('have.attr', 'data-island-status', 'hydrated');
		// Establish that the elements showing the results are not present
		cy.get('[data-atom-type=knowledgequiz] fieldset')
			.first()
			.get('[data-answer-type=non-correct-selected-answer]')
			.should('not.exist');
		// Click the correct answer
		cy.contains('So that their poos don’t roll away').click();
		// Click Reveal to show the results
		cy.get('[data-atom-type=knowledgequiz]').contains('Reveal').click();
		// We were right!
		cy.get('[data-answer-type=correct-selected-answer]', {
			timeout: 30000,
		}).should('exist');
	});
});
