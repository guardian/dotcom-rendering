import { expect, test } from '@playwright/test';
import { puzzlesBranding } from '../../fixtures/manual/puzzlesBranding';
import { createPuzzlesPage } from '../../fixtures/manual/puzzlesPage';
import type { EditionId } from '../../src/lib/edition';
import { disableCMP } from '../lib/cmp';
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
