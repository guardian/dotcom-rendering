import { expect, test } from '@playwright/test';
import { disableCMP } from '../../lib/cmp';
import { waitForIsland } from '../../lib/islands';
import { loadPage } from '../../lib/load-page';
import {
	expectLocatorToNotExist,
	expectToBeVisible,
	expectToExist,
} from '../../lib/locators';

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

const expandableTests = [
	{ type: 'qanda', url: qandaUrl },
	{ type: 'guide', url: guideUrl },
	{ type: 'profile', url: profileUrl },
	{ type: 'timeline', url: timelineUrl },
];

const genericTests = [{ type: 'chart', url: chartUrl }];

for (const { type, url } of expandableTests) {
	test.describe(type, () => {
		test('should render, expand on click, contract on second click', async ({
			context,
			page,
		}) => {
			await disableCMP(context);
			await loadPage(page, `/Article/${url}`);

			await expectToBeVisible(page, `[data-snippet-type=${type}]`);
			await expect(
				page
					.locator(`[data-snippet-type=${type}]`)
					.getByText('Show', { exact: true }),
			).toBeVisible();

			// Click Show to expand
			await page
				.locator(`[data-snippet-type=${type}]`)
				.getByText('Show', { exact: true })
				.click({ delay: 200 });

			await expectLocatorToNotExist(
				page,
				page
					.locator(`[data-snippet-type=${type}]`)
					.getByText('Show', { exact: true }),
			);
			await expect(
				page
					.locator(`[data-snippet-type=${type}]`)
					.getByText('Hide', { exact: true }),
			).toBeVisible();

			// Click Hide to contract
			await page
				.locator(`[data-snippet-type=${type}]`)
				.getByText('Hide', { exact: true })
				.click({ delay: 200 });

			await expect(
				page
					.locator(`[data-snippet-type=${type}]`)
					.getByText('Show', { exact: true }),
			).toBeVisible();
			await expectLocatorToNotExist(
				page,
				page
					.locator(`[data-snippet-type=${type}]`)
					.getByText('Hide', { exact: true }),
			);
		});

		test('should show feedback message when like is clicked', async ({
			context,
			page,
		}) => {
			await disableCMP(context);
			await loadPage(page, `/Article/${url}`);
			await page.locator(`[data-snippet-type=${type}]`).click();
			await page.locator('[data-testid="like"]').click();
			await expectToBeVisible(page, '[data-testid="feedback"]');
		});

		test('should show feedback message when dislike is clicked', async ({
			context,
			page,
		}) => {
			await disableCMP(context);
			await loadPage(page, `/Article/${url}`);
			await page.locator(`[data-snippet-type=${type}]`).click();
			await page.locator('[data-testid="dislike"]').click();
			await expectToBeVisible(page, '[data-testid="feedback"]');
		});
	});
}

for (const { type, url } of genericTests) {
	test.describe(type, () => {
		test('should render', async ({ context, page }) => {
			await disableCMP(context);
			await loadPage(page, `/Article/${url}`);
			await expectToBeVisible(page, `[data-snippet-type=${type}]`);
		});
	});
}

test.describe('Why do wombats do square poos?', () => {
	test('when I get the answer wrong, it should display the right answer when I click Reveal', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		await loadPage(page, `/Article/${quizAtomUrl}`);

		await waitForIsland(page, 'KnowledgeQuizAtom', {
			status: 'hydrated',
		});

		// Establish that the elements showing the results are not present
		await expectLocatorToNotExist(
			page,
			page
				.locator('[data-atom-type=knowledgequiz] fieldset')
				.first()
				.filter({
					has: page.locator(
						'[data-answer-type=non-selected-correct-answer]',
					),
				}),
		);
		await expectLocatorToNotExist(
			page,
			page
				.locator('[data-atom-type=knowledgequiz] fieldset')
				.first()
				.filter({
					has: page.locator(
						'[data-answer-type=non-incorrect-answer]',
					),
				}),
		);

		// Click an incorrect answer
		await page.getByText('Because they have square bottoms').click();
		// Click Reveal to show the results
		await page
			.locator('[data-atom-type=knowledgequiz]')
			.getByText('Reveal')
			.first()
			.click();

		// We got the question wrong!
		// Our choice is shown as wrong (red) and the actual correct answer is shown in green
		await expectToExist(page, '[data-answer-type=incorrect-answer]');
		await expectToExist(
			page,
			'[data-answer-type=non-selected-correct-answer]',
		);
	});

	test('when I get the answer right, it should commend my skills when I click Reveal', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		await loadPage(page, `/Article/${quizAtomUrl}`);

		await waitForIsland(page, 'KnowledgeQuizAtom', {
			status: 'hydrated',
		});

		// Establish that the elements showing the results are not present
		await expectLocatorToNotExist(
			page,
			page
				.locator('[data-atom-type=knowledgequiz] fieldset')
				.first()
				.filter({
					has: page.locator(
						'[data-answer-type=non-selected-correct-answer]',
					),
				}),
		);

		// Click the correct answer
		await page.getByText('So that their poos don’t roll away').click();

		// Click Reveal to show the results
		await page
			.locator('[data-atom-type=knowledgequiz]')
			.getByText('Reveal')
			.first()
			.click();

		// We were right!
		await expectToExist(page, '[data-answer-type=correct-selected-answer]');
	});
});
