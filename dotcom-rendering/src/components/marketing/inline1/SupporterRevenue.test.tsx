import '@testing-library/jest-dom';
import type { Inline1Props } from '@guardian/support-dotcom-components/dist/shared/types/props/inline1';
import { render, screen } from '@testing-library/react';
import { SupporterRevenue } from './SupporterRevenue';
import { tracking } from './utils/storybook';

const makeProps = (baseUrl: string): Inline1Props => ({
	countryCode: 'GB',
	tracking: {
		...tracking,
		abTestName: 'inline-test',
		abTestVariant: 'control',
		campaignCode: 'inline-campaign',
		ophanPageId: 'page-id',
		platformId: 'WEB',
		referrerUrl: 'https://www.theguardian.com/article',
	},
	variant: {
		name: 'control',
		message: {
			type: 'Inline1SupportMessage',
			heading: 'Support the Guardian',
			body: 'Help us keep reporting',
			primaryCta: { text: 'Support us', baseUrl },
		},
	},
});

describe('SupporterRevenue CTA', () => {
	it('adds acquisition tracking and region to a support link', () => {
		render(
			<SupporterRevenue
				{...makeProps(
					'https://support.theguardian.com/contribute?offer=monthly',
				)}
			/>,
		);

		const href = screen
			.getByRole('link', { name: 'Support us' })
			.getAttribute('href');
		const url = new URL(href ?? '');
		expect(url.pathname).toBe('/uk/contribute');
		expect(url.searchParams.get('offer')).toBe('monthly');
		expect(url.searchParams.get('REFPVID')).toBe('page-id');
		expect(url.searchParams.get('INTCMP')).toBe('inline-campaign');
		expect(
			JSON.parse(url.searchParams.get('acquisitionData') ?? ''),
		).toEqual(
			expect.objectContaining({
				source: 'WEB',
				componentId: 'inline-campaign',
				componentType: 'ACQUISITIONS_OTHER',
				campaignCode: 'inline-campaign',
				abTests: [{ name: 'inline-test', variant: 'control' }],
				referrerPageviewId: 'page-id',
				referrerUrl: 'https://www.theguardian.com/article',
			}),
		);
	});

	it('leaves non-support links unchanged', () => {
		const baseUrl = 'https://www.theguardian.com/info/feast?offer=monthly';
		render(<SupporterRevenue {...makeProps(baseUrl)} />);

		expect(
			screen.getByRole('link', { name: 'Support us' }),
		).toHaveAttribute('href', baseUrl);
	});
});
