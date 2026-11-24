import '@testing-library/jest-dom';
import type { Inline1Props } from '@guardian/support-dotcom-components/dist/shared/types/props/inline1';
import { fireEvent, render, screen } from '@testing-library/react';
import { Puzzles } from './Puzzles';
import { tracking } from './utils/storybook';

describe('Puzzles CTA', () => {
	it('links to the puzzles hub with campaign and page-view IDs and records clicks', () => {
		const page = window.guardian.config
			.page as typeof window.guardian.config.page & {
			tones: string;
			pillar: string;
		};
		page.tones = 'Features';
		page.pillar = 'News';

		const submitComponentEvent = jest.fn(() => Promise.resolve());
		const props: Inline1Props = {
			tracking: {
				...tracking,
				campaignCode: 'inline1 puzzles & games',
				ophanPageId: 'page-view-id',
			},
			submitComponentEvent,
			variant: {
				name: 'control',
				message: { type: 'Inline1PuzzlesMessage' },
			},
		};
		const { rerender } = render(<Puzzles {...props} />);

		const link = screen.getByRole('link', {
			name: 'Visit the Guardian puzzles and games hub.',
		});
		const url = new URL(link.getAttribute('href') ?? '');
		expect(url.origin).toBe('https://www.theguardian.com');
		expect(url.pathname).toBe('/puzzles-and-games');
		expect(url.searchParams.get('INTCMP')).toBe('inline1 puzzles & games');
		expect(url.searchParams.get('REFPVID')).toBe('page-view-id');
		expect([...url.searchParams.keys()]).toEqual(['INTCMP', 'REFPVID']);

		link.addEventListener('click', (event) => event.preventDefault());
		fireEvent.click(link);
		expect(submitComponentEvent).toHaveBeenCalledWith(
			expect.objectContaining({
				action: 'CLICK',
				component: expect.objectContaining({
					id: 'inline1 puzzles & games : cta',
				}),
			}),
		);

		rerender(
			<Puzzles
				{...props}
				tracking={{ ...props.tracking, ophanPageId: '' }}
			/>,
		);
		const fallbackUrl = new URL(
			screen
				.getByRole('link', {
					name: 'Visit the Guardian puzzles and games hub.',
				})
				.getAttribute('href') ?? '',
		);
		expect(fallbackUrl.searchParams.get('REFPVID')).toBe('not_found');
	});
});
