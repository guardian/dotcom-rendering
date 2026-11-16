import { fireEvent, render, screen } from '@testing-library/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { ShareButton } from './ShareButton.island';

jest.mock('../lib/useMatchMedia', () => ({ useMatchMedia: () => false }));
const descriptors = new Map(
	['share', 'canShare', 'clipboard'].map((name) => [
		name,
		Object.getOwnPropertyDescriptor(navigator, name),
	]),
);
const setNavigator = (name: string, value: unknown) =>
	Object.defineProperty(navigator, name, { configurable: true, value });
const format = {
	design: ArticleDesign.Crossword,
	display: ArticleDisplay.Standard,
	theme: Pillar.Lifestyle,
};
const shareUrl =
	'https://www.theguardian.com/crosswords/quick/17599?CMP=share_btn_url';

const button = (overrides: Partial<Parameters<typeof ShareButton>[0]> = {}) => (
	<ShareButton
		pageId="crosswords/quick/17599"
		webTitle="Quick crossword"
		format={format}
		context="ArticleMeta"
		{...overrides}
	/>
);

describe('puzzle sharing', () => {
	beforeEach(() => {
		for (const name of descriptors.keys()) {
			Reflect.deleteProperty(navigator, name);
		}
	});
	afterEach(() => {
		for (const [name, descriptor] of descriptors) {
			if (descriptor) Object.defineProperty(navigator, name, descriptor);
			else Reflect.deleteProperty(navigator, name);
		}
		jest.restoreAllMocks();
		jest.resetAllMocks();
	});

	it.each(['native', 'copy', 'email'] as const)(
		'attributes %s share attempts',
		async (method) => {
			const share = jest.fn().mockResolvedValue(undefined);
			if (method === 'native') {
				setNavigator('share', share);
				setNavigator('canShare', () => true);
			} else if (method === 'copy') {
				setNavigator('clipboard', { writeText: share });
			}
			render(button({ puzzleTrackingSource: 'crossword-page' }));
			const control = screen.getByRole(
				method === 'email' ? 'link' : 'button',
				{ name: 'Share' },
			);
			expect(control).toHaveAttribute(
				'data-link-name',
				`puzzles | share-attempt | ${method} | ArticleMeta`,
			);
			if (method === 'email') {
				expect(control).toHaveAttribute(
					'href',
					`mailto:?subject=Quick crossword&body=${shareUrl}`,
				);
			} else {
				fireEvent.click(control);
				expect(share).toHaveBeenCalledWith(
					method === 'copy'
						? shareUrl
						: {
								title: 'Quick crossword',
								text: 'Quick crossword',
								url: shareUrl,
							},
				);
				if (method === 'copy') {
					await screen.findByRole('button', { name: 'Link copied' });
				}
			}
		},
	);

	it.each(['article', 'crossword'] as const)(
		'does not add puzzle analytics to an unconfigured %s',
		async (kind) => {
			const writeText = jest.fn().mockResolvedValue(undefined);
			setNavigator('clipboard', { writeText });
			render(
				button(
					kind === 'article'
						? {
								format: {
									...format,
									design: ArticleDesign.Standard,
								},
							}
						: {},
				),
			);
			const share = screen.getByRole('button', { name: 'Share' });
			expect(share).not.toHaveAttribute('data-link-name');
			fireEvent.click(share);
			await screen.findByRole('button', { name: 'Link copied' });
		},
	);
});
