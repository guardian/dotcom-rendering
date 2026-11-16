import { expect, test } from '@playwright/test';
import { createPuzzlePage } from '../../fixtures/manual/puzzlePage';
import { loadPage } from '../lib/load-page';

// Keep third-party commercial code from changing the slot state under test.
test.use({ javaScriptEnabled: false });

for (const width of [375, 768, 1280]) {
	for (const fluid of [false, true]) {
		test(`Wordiply merchandising spacing and label policy at ${width}px (fluid: ${fluid})`, async ({
			page,
		}) => {
			await page.setViewportSize({ width, height: 900 });
			await loadPage({
				page,
				path: '/PuzzlePage/https://www.theguardian.com/puzzles-and-games/word-games/wordiply/2026-11-10',
				overrides: {
					feFixture: createPuzzlePage('wordiply'),
					configOverrides: {
						serverSideABTests: { 'puzzles-new-hub-v1': 'variant' },
					},
				},
			});
			const slot = page.locator('#dfp-ad--merchandising-high');
			await expect(slot).toBeAttached();
			const labelContent = () =>
				slot.evaluate(
					(element) => getComputedStyle(element, '::before').content,
				);
			await expect.poll(labelContent).toBe('none');
			await expect(slot).toHaveCSS('border-top-width', '0px');

			await slot.evaluate((element, isFluid) => {
				element.classList.toggle('ad-slot--fluid', isFluid);
				element.classList.add('ad-slot--rendered');
				const creative = document.createElement('div');
				creative.className = 'ad-slot__content';
				creative.style.height = '300px';
				element.appendChild(creative);
			}, fluid);

			// Commercial deliberately leaves the label unset for excluded Labs templates.
			await expect(slot).not.toHaveAttribute('data-label-show');
			await expect.poll(labelContent).toBe('none');
			await expect(slot).toHaveCSS('padding-bottom', '24px');
			await expect(slot).toHaveCSS('border-top-width', '1px');
			await expect(slot).toHaveCSS('border-top-style', 'solid');
			await expect(slot).toHaveCSS(
				'border-top-color',
				'rgb(220, 220, 220)',
			);

			if (width === 768 && !fluid) {
				// The shared slot styles hide fixed-size ads between phablet and desktop.
				await expect(slot).toBeHidden();
				return;
			}
			const gapBelowCreative = await slot.evaluate((element) => {
				const creative = element.querySelector('.ad-slot__content')!;
				return (
					element.getBoundingClientRect().bottom -
					creative.getBoundingClientRect().bottom
				);
			});
			expect(gapBelowCreative).toBe(24);

			await slot.evaluate((element) => {
				element.setAttribute('data-label', 'false');
			});
			await expect.poll(labelContent).toBe('none');

			await slot.evaluate((element) => {
				element.removeAttribute('data-label');
				element.setAttribute('data-label-show', 'true');
				element.setAttribute(
					'ad-label-text',
					'Advertisement [adtest=example]',
				);
			});
			await expect
				.poll(labelContent)
				.toBe('"Advertisement [adtest=example]"');
			await expect(slot).toHaveCSS('padding-bottom', '24px');
			await expect(slot).toHaveCSS('border-top-width', '0px');
			await expect
				.poll(() =>
					slot.evaluate(
						(element) =>
							getComputedStyle(element, '::before')
								.borderTopWidth,
					),
				)
				.toBe('1px');

			await slot.evaluate((element) => {
				element.setAttribute('data-label-show', 'false');
			});
			await expect.poll(labelContent).toBe('none');
			await expect(slot).toHaveCSS('border-top-width', '1px');

			await slot.evaluate((element) =>
				element.classList.add('ad-slot--collapse'),
			);
			await expect(slot).toBeHidden();
			expect(
				await slot.evaluate(
					(element) => element.getBoundingClientRect().height,
				),
			).toBe(0);
		});
	}
}
