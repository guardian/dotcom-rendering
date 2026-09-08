import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import type {
	PuzzleContainer,
	PuzzleItem,
	PuzzlesLayoutType,
} from '../types/puzzlesPage';
import { getPuzzleUrl, PuzzlesDirectory } from './PuzzlesDirectory';

jest.mock('./AdSlot.web', () => ({
	AdSlot: ({ index }: { index: number }) => (
		<div data-testid={`ad-${index}`} />
	),
}));
jest.mock('./Island', () => ({
	Island: ({ children }: { children: ReactNode }) => children,
}));

const item = (overrides: Partial<PuzzleItem> = {}): PuzzleItem => ({
	id: 'daily-puzzle',
	title: 'Daily puzzle',
	type: 'word-game',
	set: 'all',
	cardVariant: 'primary',
	cadence: 'Daily',
	...overrides,
});

const section = (
	overrides: Partial<PuzzleContainer> = {},
): PuzzleContainer => ({
	id: 'word-games',
	title: 'Word games',
	variant: 'standard',
	content: { items: [[item()]], nestedContainers: [] },
	...overrides,
});

describe('PuzzlesDirectory', () => {
	it('uses JSON ordering, rows, variants, cadence and configured spans', () => {
		const nested = section({
			id: 'nested',
			title: 'Nested',
			desktopSpan: 6,
			content: {
				items: [
					[
						item({
							id: 'compact',
							title: 'Compact',
							cardVariant: 'compact',
							cadence: 'Bi-monthly',
						}),
					],
				],
				nestedContainers: [],
			},
		});
		const layout: PuzzlesLayoutType = {
			containers: [
				section({ id: 'first', title: 'First' }),
				section({
					id: 'second',
					title: 'Second',
					content: {
						items: [[item({ id: 'large', cardVariant: 'large' })]],
						nestedContainers: [nested],
					},
				}),
			],
		};
		render(<PuzzlesDirectory layout={layout} renderAds={false} />);
		expect(
			screen
				.getAllByRole('heading', { level: 2 })
				.map(({ textContent }) => textContent),
		).toEqual(['First', 'Second']);
		expect(screen.getByText('Bi-monthly')).toBeInTheDocument();
		expect(
			screen.getByText('Compact').closest('article'),
		).toBeInTheDocument();
	});

	it('resolves internal and external URLs safely and never emits a hash fallback', () => {
		expect(
			getPuzzleUrl(item({ slug: 'word-wheel', variant: 'iframe-page' })),
		).toBe('/puzzles/word-wheel');
		expect(
			getPuzzleUrl(item({ slug: 'word-wheel', variant: 'archive-page' })),
		).toBe('/puzzles/word-wheel/archive');
		expect(getPuzzleUrl(item({ url: 'https://example.com/play' }))).toBe(
			'https://example.com/play',
		);
		expect(getPuzzleUrl(item({ url: '/legacy' }))).toBeUndefined();

		render(
			<PuzzlesDirectory
				layout={{
					containers: [
						section({
							content: {
								items: [
									[
										item({ id: 'missing' }),
										item({
											id: 'external',
											title: 'External',
											url: 'https://example.com',
										}),
									],
								],
								nestedContainers: [],
							},
						}),
					],
				}}
				renderAds={false}
			/>,
		);
		expect(screen.getByText('Daily puzzle').closest('a')).toBeNull();
		expect(screen.getByRole('link', { name: /External/ })).toHaveAttribute(
			'rel',
			'noopener noreferrer',
		);
		expect(document.querySelector('a[href="#"]')).not.toBeInTheDocument();
	});

	it('omits missing images and empty sections, and follows the ad-free flag', () => {
		const layout: PuzzlesLayoutType = {
			containers: [
				section(),
				section({
					id: 'empty',
					title: 'Empty',
					content: { items: [], nestedContainers: [] },
				}),
				section({
					id: 'ad',
					title: '',
					variant: 'ad',
					adSlot: 'inline2',
					content: { items: [], nestedContainers: [] },
				}),
			],
		};
		const { rerender } = render(
			<PuzzlesDirectory layout={layout} renderAds={false} />,
		);
		expect(
			screen.queryByRole('heading', { name: 'Empty' }),
		).not.toBeInTheDocument();
		expect(document.querySelector('img')).not.toBeInTheDocument();
		expect(screen.queryByTestId('ad-2')).not.toBeInTheDocument();
		rerender(<PuzzlesDirectory layout={layout} renderAds={true} />);
		expect(screen.getByTestId('ad-2')).toBeInTheDocument();
	});

	it('renders the archive dropdown and closes it with Escape or an outside click', async () => {
		const archives = [
			item({
				id: 'archive-a',
				title: 'Archive A',
				cardVariant: 'archive',
				cadence: undefined,
				url: '/puzzles/a',
			}),
			item({
				id: 'archive-b',
				title: 'Archive B',
				cardVariant: 'archive',
				cadence: undefined,
				url: '/puzzles/b',
			}),
		];
		render(
			<PuzzlesDirectory
				layout={{
					containers: [
						section({
							id: 'multiple',
							title: 'Multiple',
							content: {
								items: [[item({ id: 'multiple-card' })]],
								nestedContainers: [],
								archiveChoices: archives,
							},
						}),
					],
				}}
				renderAds={false}
			/>,
		);
		const summary = screen.getByText('Multiple archive').closest('summary');
		expect(summary).not.toBeNull();
		fireEvent.click(summary!);
		await waitFor(() =>
			expect(summary!.closest('details')).toHaveAttribute('open'),
		);
		fireEvent.keyDown(document, { key: 'Escape' });
		await waitFor(() =>
			expect(summary!.closest('details')).not.toHaveAttribute('open'),
		);
		fireEvent.click(summary!);
		fireEvent.mouseDown(document.body);
		await waitFor(() =>
			expect(summary!.closest('details')).not.toHaveAttribute('open'),
		);
	});
});
