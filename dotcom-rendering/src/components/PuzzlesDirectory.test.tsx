import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import type {
	PuzzleContainer,
	PuzzleItem,
	PuzzlesLayoutType,
} from '../types/puzzlesPage';
import { getPuzzleUrl, PuzzlesDirectory } from './PuzzlesDirectory';

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
	it.each([
		['crossword', '#fff4f2', '#ab0613'],
		['sudoku', '#f1f8fc', '#0077b6'],
		['wordiply', '#fef9f5', '#c74600'],
		['word-wheel', '#fef9f5', '#c74600'],
	])(
		'uses the %s type colours instead of legacy configured colours',
		(type, background, title) => {
			const { container } = render(
				<PuzzlesDirectory
					layout={{
						containers: [
							section({
								content: {
									items: [
										[
											item({
												type,
												backgroundColour: '#000000',
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
			expect(container.querySelector('article')).toHaveStyle({
				backgroundColor: background,
			});
			expect(container.querySelector('.puzzle-card-title')).toHaveStyle({
				color: title,
			});
		},
	);

	it('describes card artwork without adding it to screen-reader link names', () => {
		const { container } = render(
			<PuzzlesDirectory
				layout={{
					containers: [
						section({
							content: {
								items: [
									[
										item({
											image: '/word-wheel.png',
											imageAlt: 'Word wheel illustration',
											url: '/puzzles-and-games/word-wheel',
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
		const image = container.querySelector('img');
		expect(image).toHaveStyle({ width: '181px', height: '145px' });
		expect(
			screen.getByRole('link', { name: 'Daily puzzle Daily' }),
		).toHaveStyle({ height: '145px' });
		expect(image).toHaveAttribute('alt', 'Word wheel illustration');
		expect(image).toHaveAttribute('aria-hidden', 'true');
		expect(screen.queryByRole('img')).not.toBeInTheDocument();
		expect(
			screen.getByRole('link', { name: 'Daily puzzle Daily' }),
		).toBeInTheDocument();
	});

	it('provides fallback alt text and keeps compact cards text-only', () => {
		const { container } = render(
			<PuzzlesDirectory
				layout={{
					containers: [
						section({
							content: {
								items: [
									[item({ image: '/puzzle.png' })],
									[
										item({
											id: 'compact',
											cardVariant: 'compact',
											image: '/compact.png',
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
		expect(container.querySelectorAll('img')).toHaveLength(1);
		expect(container.querySelector('img')).toHaveAttribute(
			'alt',
			'Daily puzzle illustration',
		);
	});

	it('shows setters on crossword cards across variants but not on other puzzles', () => {
		render(
			<PuzzlesDirectory
				layout={{
					containers: [
						section({
							variant: 'featured',
							content: {
								items: [
									...(
										['large', 'primary', 'compact'] as const
									).map((cardVariant) => [
										item({
											id: cardVariant,
											type: 'crossword',
											cardVariant,
											setter: '  Example setter  ',
										}),
									]),
									[
										item({
											id: 'word-wheel',
											setter: 'Ignored setter',
										}),
									],
									[
										item({
											id: 'blank-setter',
											type: 'crossword',
											setter: '  ',
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
		expect(screen.getAllByText('By: Example setter')).toHaveLength(3);
		expect(
			screen.queryByText('By: Ignored setter'),
		).not.toBeInTheDocument();
		expect(screen.queryByText('By:')).not.toBeInTheDocument();
		expect(screen.queryByText('Played')).not.toBeInTheDocument();
	});
	it('renders unique desktop and mobile IDs for multiple blueprint slots', () => {
		const layout: PuzzlesLayoutType = {
			containers: ['inline1', 'inline2'].map((adSlot) =>
				section({
					id: adSlot,
					title: '',
					variant: 'ad',
					adSlot,
					content: { items: [], nestedContainers: [] },
				}),
			),
		};
		const { rerender } = render(
			<PuzzlesDirectory layout={layout} renderAds={true} />,
		);
		const ids = Array.from(
			document.querySelectorAll('.js-ad-slot'),
			({ id }) => id,
		);
		expect(ids).toEqual([
			'dfp-ad--fronts-banner-1',
			'dfp-ad--inline1--mobile',
			'dfp-ad--fronts-banner-2',
			'dfp-ad--inline2--mobile',
		]);
		expect(new Set(ids).size).toBe(ids.length);
		rerender(<PuzzlesDirectory layout={layout} renderAds={false} />);
		expect(document.querySelector('.js-ad-slot')).not.toBeInTheDocument();
	});

	it('does not render a disabled featured container', () => {
		render(
			<PuzzlesDirectory
				layout={{
					containers: [
						section({
							enabled: false,
							id: 'featured',
							title: 'Today’s featured puzzles',
							variant: 'featured',
						}),
					],
				}}
				renderAds={false}
			/>,
		);

		expect(
			screen.queryByRole('heading', { name: 'Today’s featured puzzles' }),
		).not.toBeInTheDocument();
	});

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
		expect(
			screen.queryByRole('heading', { name: 'Nested' }),
		).not.toBeInTheDocument();
	});

	it('resolves internal and external URLs safely and never emits a hash fallback', () => {
		expect(
			getPuzzleUrl(item({ slug: 'word-wheel', variant: 'iframe-page' })),
		).toBe('/puzzles-and-games/word-wheel');
		expect(
			getPuzzleUrl(item({ slug: 'word-wheel', variant: 'archive-page' })),
		).toBe('/puzzles-and-games/word-wheel/archive');
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
		expect(document.querySelector('.js-ad-slot')).not.toBeInTheDocument();
		rerender(<PuzzlesDirectory layout={layout} renderAds={true} />);
		// Desktop and mobile placements share the configured slot index.
		expect(screen.getAllByTestId('ad-2')).toHaveLength(2);
	});

	it('renders the archive dropdown and closes it with Escape or an outside click', async () => {
		const archives = [
			item({
				id: 'archive-a',
				title: 'Archive A',
				cardVariant: 'archive',
				cadence: undefined,
				url: '/crosswords/series/quick',
			}),
			item({
				id: 'archive-b',
				title: 'Archive B',
				cardVariant: 'archive',
				cadence: undefined,
				url: '/crosswords/series/cryptic',
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
		expect(screen.getByRole('link', { name: 'Archive A' })).toHaveAttribute(
			'href',
			'/crosswords/series/quick',
		);
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
