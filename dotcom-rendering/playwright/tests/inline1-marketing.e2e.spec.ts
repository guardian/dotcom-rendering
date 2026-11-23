import type { Inline1Props } from '@guardian/support-dotcom-components/dist/shared/types';
import { test } from '@playwright/test';
import {
	inline1NewsletterMessageProps,
	inline1PuzzlesMessageProps,
	inline1SupportMessageProps,
} from '../fixtures/inline1-sdc';
import { cmpAcceptAll } from '../lib/cmp';
import { loadPage } from '../lib/load-page';
import { expectToExist } from '../lib/locators';

const inline1Tests = {
	puzzles: inline1PuzzlesMessageProps as Inline1Props,
	newsletter: inline1NewsletterMessageProps as Inline1Props,
	support: inline1SupportMessageProps as Inline1Props,
} satisfies Record<string, Inline1Props>;

test.describe('Inline1 Marketing E2E tests', () => {
	for (const [type, inline1Props] of Object.entries(inline1Tests)) {
		test(`Renders a preview ${type} message when receiving an event from commercial`, async ({
			page,
		}) => {
			await loadPage({
				page,
				path: `/Article/https://www.theguardian.com/environment/2020/oct/13/maverick-rewilders-endangered-species-extinction-conservation-uk-wildlife`,
			});

			await cmpAcceptAll(page);

			/**
			 * We're stubbing the SDC response and commercial logic to ensure the DCR rendering logic is tested here.
			 * This allows us to use the tests set up in RRCP CODE, regardless of the environment DCR and commercial run in.
			 */
			await page.evaluate((props: Inline1Props) => {
				// Stubbed response from SDC for the inline1 request, which happens in the commercial bundle
				window.guardian.commercial ??= {};
				window.guardian.commercial.sdc ??= {};
				window.guardian.commercial.sdc.inline1 = {
					props,
					slotId: 'dfp-ad--inline1',
				};
				// Stubbed custom event from the commercial bundle to trigger the DCR rendering response
				window.document
					.getElementById('dfp-ad--inline1')
					?.dispatchEvent(
						new CustomEvent('commercial.sdc-render', {
							detail: { props },
							bubbles: true,
						}),
					);
			}, inline1Props);

			const inline1Slot = page.locator('#dfp-ad--inline1');
			await inline1Slot.scrollIntoViewIfNeeded();

			await expectToExist(
				page,
				`#dfp-ad--inline1 > [data-message-type="${inline1Props.variant.message.type}"]`,
			);
		});
	}
});
