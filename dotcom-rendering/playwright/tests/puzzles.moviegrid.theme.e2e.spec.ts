import { expect, test } from '@playwright/test';
import { createPuzzlePage } from '../../fixtures/manual/puzzlePage';
import { disableCMP } from '../lib/cmp';
import { loadPage } from '../lib/load-page';

for (const width of [375, 1280]) {
	for (const colorScheme of ['light', 'dark'] as const) {
		test(`matches existing puzzle page styling at ${width}px in ${colorScheme} mode`, async ({
			context,
			page,
		}) => {
			await disableCMP(context);
			await page.setViewportSize({ width, height: 900 });
			await page.emulateMedia({ colorScheme });
			await page.route('**/*', (route) => {
				if (
					route.request().isNavigationRequest() &&
					route.request().frame().parentFrame()
				) {
					return route.fulfill({
						contentType: 'text/html',
						body: '',
					});
				}
				return route.continue();
			});

			let referenceStyles: unknown;
			for (const slug of [
				'word-wheel',
				'sudoku-easy',
				'film-reveal',
				'on-the-ball',
			]) {
				await loadPage({
					page,
					path: `/PuzzlePage/https://www.theguardian.com/${slug}`,
					overrides: {
						feFixture: createPuzzlePage(slug, {
							isAdFreeUser: true,
						}),
						configOverrides: {
							serverSideABTests: {
								'puzzles-new-hub-v1': 'variant',
								'puzzles-new-hub-v2': 'variant',
								'webx-dark-mode-web': 'enable',
							},
						},
					},
				});
				const styles = await page.locator('main').evaluate((main) => {
					const headline = getComputedStyle(
						main.querySelector('h1')!,
					);
					const iframe = getComputedStyle(
						main.querySelector('iframe')!,
					);
					return {
						font: headline.fontFamily,
						weight: headline.fontWeight,
						size: headline.fontSize,
						background: getComputedStyle(
							main.querySelector('article')!,
						).backgroundColor,
						iframeBorder: iframe.border,
						lines: [...main.querySelectorAll('svg[stroke]')].map(
							(svg) => getComputedStyle(svg).stroke,
						),
						linkFonts: [
							...main.querySelectorAll(
								'[data-component="series"], [data-component="section"]',
							),
						].map((link) => getComputedStyle(link).fontFamily),
					};
				});
				if (slug === 'word-wheel') {
					referenceStyles = styles;
				} else {
					expect(
						styles,
						`${slug} matches Word wheel styling`,
					).toEqual(referenceStyles);
				}
			}
		});
	}
}

for (const [slug, title] of [
	['film-reveal', 'Film reveal'],
	['on-the-ball', 'On the ball'],
] as const) {
	for (const width of [375, 1280]) {
		for (const mode of [
			'light',
			'dark',
			'dark-disabled',
			'explicit-light',
		] as const) {
			test(`${title} uses puzzle typography and background at ${width}px in ${mode} mode`, async ({
				context,
				page,
			}) => {
				await disableCMP(context);
				await page.setViewportSize({ width, height: 900 });
				await page.emulateMedia({
					colorScheme: mode === 'light' ? 'light' : 'dark',
				});
				await page.route('https://example.com/moviegrid/**', (route) =>
					route.fulfill({ contentType: 'text/html', body: '' }),
				);
				await loadPage({
					page,
					path: `/PuzzlePage/https://www.theguardian.com/puzzles-and-games/trivia-and-quizzes/${slug}/2026-09-11`,
					overrides: {
						feFixture: createPuzzlePage(slug, {
							isAdFreeUser: true,
						}),
						configOverrides: {
							serverSideABTests: {
								'puzzles-new-hub-v1': 'variant',
								'puzzles-new-hub-v2': 'variant',
								'webx-dark-mode-web':
									mode === 'dark-disabled'
										? 'control'
										: 'enable',
							},
						},
					},
				});
				if (mode === 'explicit-light') {
					await page.evaluate(() => {
						document.documentElement.dataset.colorScheme = 'light';
					});
				}

				const headline = page.getByRole('heading', {
					name: title,
					level: 1,
				});
				await expect(headline).toHaveCSS(
					'font-family',
					/GH Guardian Headline/,
				);
				await expect(headline).toHaveCSS('font-weight', '500');
				const themeColour =
					mode === 'dark'
						? 'rgb(168, 227, 223)'
						: 'rgb(12, 122, 115)';
				for (const component of ['series', 'section']) {
					const link = page.locator(
						`[data-component="${component}"]`,
					);
					await expect(link).toHaveCSS(
						'font-family',
						/GH Guardian Headline/,
					);
					await expect(link).toHaveCSS('color', themeColour);
				}
				await expect(page.locator('main > article')).toHaveCSS(
					'background-color',
					mode === 'dark' ? 'rgb(26, 26, 26)' : 'rgb(255, 255, 255)',
				);
				const borderColour =
					mode === 'dark' ? 'rgb(51, 51, 51)' : 'rgb(220, 220, 220)';
				for (const edge of ['top', 'right', 'bottom', 'left']) {
					await expect(page.locator('main iframe')).toHaveCSS(
						`border-${edge}-color`,
						borderColour,
					);
				}
				for (const colour of [
					'--article-meta-lines',
					'--straight-lines',
				]) {
					await expect(
						page
							.locator(`main svg[stroke="var(${colour})"]`)
							.first(),
					).toHaveCSS('stroke', borderColour);
				}
				await expect(
					page.getByText('Share', { exact: true }),
				).toHaveCSS('color', themeColour);
				await expect(
					page.getByRole('link', {
						name: 'Prefer the Guardian on Google',
						exact: true,
					}),
				).toBeVisible();
			});
		}
	}
}
