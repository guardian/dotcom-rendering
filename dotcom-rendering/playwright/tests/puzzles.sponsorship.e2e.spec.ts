import { expect, test } from '@playwright/test';
import { createPuzzlePage } from '../../fixtures/manual/puzzlePage';
import { puzzlesBranding } from '../../fixtures/manual/puzzlesBranding';
import {
	createPuzzlesPage,
	fullPuzzlesLayout,
} from '../../fixtures/manual/puzzlesPage';
import type { EditionId } from '../../src/lib/edition';
import { disableCMP } from '../lib/cmp';
import { waitForIsland } from '../lib/islands';
import { loadPage } from '../lib/load-page';
import { ADDITIONAL_REQUEST_PATH, interceptOphanRequest } from '../lib/ophan';

const path = '/PuzzlesPage/https://www.theguardian.com/puzzles-and-games';

// The hub returns a 404 outside this experiment's variant
const configOverrides = {
	serverSideABTests: { 'puzzles-new-hub-v1': 'variant' },
};

const puzzlesPage = (editionId: EditionId) =>
	createPuzzlesPage({
		editionId,
		commercialProperties: {
			AU: { adTargeting: [], branding: puzzlesBranding },
		},
	});

test.describe('Puzzles hub sponsorship', () => {
	test('shows the sponsor for a sponsored edition and sends an Ophan click event', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		await loadPage({
			page,
			path,
			overrides: { feFixture: puzzlesPage('AU'), configOverrides },
		});

		const sponsorLink = page.getByRole('link', {
			name: 'Visit the Example sponsor website',
		});
		await expect(sponsorLink).toBeVisible();
		await expect(
			page.getByRole('link', { name: 'About this content' }),
		).toHaveAttribute('href', 'https://example.com/about');

		const clickEvent = interceptOphanRequest({
			page,
			path: ADDITIONAL_REQUEST_PATH,
			searchParamMatcher: (searchParams) =>
				searchParams.get('clickComponent') ===
				'labs-logo | front-container-example-sponsor',
		});
		await sponsorLink.click();
		await clickEvent;
	});

	test('shows no sponsor for an unsponsored edition', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		await loadPage({
			page,
			path,
			overrides: { feFixture: puzzlesPage('UK'), configOverrides },
		});

		await expect(
			page.getByRole('heading', { level: 1, name: 'Puzzles & games' }),
		).toBeAttached();
		await expect(page.getByText('Supported by')).toHaveCount(0);
	});
});

test.describe('Puzzle game sponsorship', () => {
	for (const { editionId, isAdFreeUser, aboutThisLink } of [
		{
			editionId: 'AU',
			isAdFreeUser: false,
			aboutThisLink: 'https://example.com/about',
		},
		{
			editionId: 'UK',
			isAdFreeUser: false,
			aboutThisLink: 'https://example.com/about',
		},
		{ editionId: 'AU', isAdFreeUser: true, aboutThisLink: '' },
	] as const) {
		test(`renders resolved game sponsorship in ${editionId} (ad-free: ${isAdFreeUser})`, async ({
			context,
			page,
		}) => {
			await disableCMP(context);
			await loadPage({
				page,
				path: '/PuzzlePage/https://www.theguardian.com/puzzles-and-games/word-games/word-wheel/2026-09-11',
				overrides: {
					feFixture: createPuzzlePage('word-wheel', {
						editionId,
						isAdFreeUser,
						commercialProperties: {
							AU: {
								adTargeting: [],
								branding: { ...puzzlesBranding, aboutThisLink },
							},
						},
					}),
					configOverrides,
				},
			});
			const sponsorLink = page.getByRole('link', {
				name: 'Visit the Example sponsor website',
			});
			if (editionId === 'UK') {
				await expect(
					page.getByRole('heading', {
						level: 1,
						name: 'Word wheel',
						exact: true,
					}),
				).toBeVisible();
				await expect(sponsorLink).toHaveCount(0);
				await expect(page.getByText('Supported by')).toHaveCount(0);
				return;
			}
			await expect(sponsorLink).toBeVisible();
			await expect(sponsorLink.getByRole('img')).toHaveAttribute(
				'width',
				'140',
			);
			if (aboutThisLink) {
				await expect(
					page.getByRole('link', { name: 'About this content' }),
				).toHaveAttribute('href', aboutThisLink);
			} else {
				await expect(
					page.getByRole('link', { name: 'About this content' }),
				).toHaveCount(0);
			}
			if (isAdFreeUser) {
				await expect(page.locator('.js-ad-slot')).toHaveCount(0);
			}
			await waitForIsland(page, 'Branding');
			const clickEvent = interceptOphanRequest({
				page,
				path: ADDITIONAL_REQUEST_PATH,
				searchParamMatcher: (params) =>
					params.get('clickComponent') ===
					'labs-logo | article-meta-example-sponsor',
			});
			await sponsorLink.click();
			await clickEvent;
		});
	}
});

test.describe('Puzzles container sponsorship', () => {
	const wordGames = fullPuzzlesLayout.containers[0]!;
	const wordWheel = wordGames.content.nestedContainers[0]!;
	const layout = {
		containers: [
			{
				...wordGames,
				content: { ...wordGames.content, nestedContainers: [] },
				commercialProperties: {
					AU: { adTargeting: [], branding: puzzlesBranding },
				},
			},
			wordWheel,
		],
	};

	for (const { editionId, isAdFreeUser } of [
		{ editionId: 'AU', isAdFreeUser: false },
		{ editionId: 'UK', isAdFreeUser: false },
		{ editionId: 'AU', isAdFreeUser: true },
	] as const) {
		test(`targets only the sponsored container in ${editionId} (ad-free: ${isAdFreeUser})`, async ({
			context,
			page,
		}) => {
			await disableCMP(context);
			await loadPage({
				page,
				path,
				overrides: {
					feFixture: createPuzzlesPage({
						editionId,
						isAdFreeUser,
						layout,
						commercialProperties: {},
					}),
					configOverrides,
				},
			});

			const sponsoredContainer = page.getByRole('region', {
				name: 'Word games',
				exact: true,
			});
			await expect(sponsoredContainer).toBeVisible();
			await expect(
				page
					.getByRole('region', { name: 'Word wheel', exact: true })
					.getByText('Supported by'),
			).toHaveCount(0);
			await expect(
				page.locator('[data-component="puzzles-branding"]'),
			).toHaveCount(0);
			await expect(
				page.getByRole('link', { name: 'About this content' }),
			).toHaveCount(0);
			const sponsorLink = sponsoredContainer.getByRole('link', {
				name: 'Visit the Example sponsor website',
			});
			if (editionId === 'UK') {
				await expect(sponsorLink).toHaveCount(0);
				await expect(page.getByText('Supported by')).toHaveCount(0);
				return;
			}

			await expect(sponsorLink).toBeVisible();
			await expect(sponsorLink).toHaveAttribute(
				'href',
				'https://example.com',
			);
			await expect
				.poll(() =>
					sponsorLink
						.getByRole('img')
						.evaluate(
							(image: HTMLImageElement) => image.naturalWidth,
						),
				)
				.toBeGreaterThan(0);
			const clickEvent = interceptOphanRequest({
				page,
				path: ADDITIONAL_REQUEST_PATH,
				searchParamMatcher: (searchParams) =>
					searchParams.get('clickComponent') ===
					'labs-logo | front-container-example-sponsor',
			});
			await sponsorLink.click();
			await clickEvent;
		});
	}
});
