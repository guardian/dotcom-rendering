import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import type { ReactNode } from 'react';
import type {
	PuzzlesLayoutType,
	PuzzlesSupportingContent,
} from '../types/puzzlesPage';
import { PuzzlesSupporting } from './PuzzlesSupporting';

jest.mock('./AdSlot.web', () => ({
	AdSlot: () => <div data-testid="mostpop-ad" />,
}));
jest.mock('./Island', () => ({
	Island: ({ children }: { children: ReactNode }) => children,
}));
jest.mock('./NewsletterSignupCard', () => ({
	NewsletterSignupCard: ({
		children,
		name,
	}: {
		children: ReactNode;
		name: string;
	}) => <aside aria-label={`newsletter-${name}`}>{children}</aside>,
}));
jest.mock('./NewsletterSignupForm.island', () => ({
	NewsletterSignupForm: ({ newsletterId }: { newsletterId: string }) => (
		<div data-testid={`newsletter-form-${newsletterId}`} />
	),
}));

const layout: PuzzlesLayoutType = {
	containers: [
		{
			id: 'games',
			title: 'Games',
			content: {
				items: [
					[
						{
							id: 'quick',
							title: 'Quick',
							type: 'crossword',
							set: 'quick',
							cardVariant: 'primary',
							cadence: 'Daily',
							url: '/puzzles-and-games/crosswords/quick/1',
						},
						{
							id: 'wordiply',
							title: 'Wordiply',
							type: 'wordiply',
							set: 'all',
							cardVariant: 'primary',
							cadence: 'Daily',
							url: 'https://www.wordiply.com/',
							slug: 'word-games/wordiply',
							variant: 'iframe-page',
							date: '2026-09-16',
						},
					],
				],
				nestedContainers: [],
			},
		},
	],
};

const supporting: PuzzlesSupportingContent = {
	usefulLinksTitle: 'Useful links',
	usefulLinks: [
		{
			title: 'Crossword archive',
			url: '/puzzles-and-games/crosswords/archive',
		},
		{ title: 'Crossword blog', url: 'https://example.com/blog' },
	],
	newsletter: {
		identityName: 'saturday-edition',
		name: 'Saturday Edition',
		frequency: 'Weekly',
		description: 'The best of the Guardian every Saturday.',
	},
	popularTitle: 'Most popular puzzles',
	popularGroups: [
		{ title: 'Most played', itemIds: ['quick', 'wordiply'] },
		{ title: 'Most comments', itemIds: ['wordiply', 'missing'] },
	],
};

describe('PuzzlesSupporting', () => {
	it('shows only useful links by default, even when ads are enabled', () => {
		render(
			<PuzzlesSupporting
				id="puzzles-supporting"
				adSlot="mostpop"
				layout={layout}
				renderAds={true}
				supporting={{
					...supporting,
					usefulLinks: [
						{
							title: 'Support the Guardian',
							url: 'https://support.theguardian.com',
						},
						{
							title: 'Help Centre',
							url: 'https://help.theguardian.com',
						},
					],
				}}
			/>,
		);
		expect(
			screen.getByRole('heading', { name: 'Useful links' }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('link', { name: 'Support the Guardian' }),
		).toHaveAttribute('href', 'https://support.theguardian.com');
		expect(
			screen.getByRole('link', { name: 'Help Centre' }),
		).toHaveAttribute('href', 'https://help.theguardian.com');
		expect(screen.getAllByRole('link')).toHaveLength(2);
		expect(
			screen.queryByTestId('newsletter-form-saturday-edition'),
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole('heading', { name: 'Most popular puzzles' }),
		).not.toBeInTheDocument();
		expect(screen.queryByTestId('mostpop-ad')).not.toBeInTheDocument();
	});

	it('renders configured links, newsletter and ranked puzzle groups', () => {
		render(
			<PuzzlesSupporting
				id="puzzles-supporting"
				layout={layout}
				showNewsletter={true}
				showPopular={true}
				renderAds={false}
				supporting={supporting}
			/>,
		);

		expect(
			screen.getByRole('link', { name: 'Crossword archive' }),
		).toHaveAttribute('href', '/puzzles-and-games/crosswords/archive');
		expect(
			screen.getByRole('link', { name: 'Crossword blog' }),
		).toHaveAttribute('target', '_blank');
		expect(
			screen.getByTestId('newsletter-form-saturday-edition'),
		).toBeInTheDocument();
		const played = screen.getByRole('heading', {
			name: 'Most played',
		}).parentElement;
		expect(played).not.toBeNull();
		expect(within(played!).getAllByRole('listitem')).toHaveLength(2);
		for (const link of screen.getAllByRole('link', {
			name: 'Wordiply Daily',
		})) {
			expect(link).toHaveAttribute(
				'href',
				'/puzzles-and-games/word-games/wordiply/2026-09-16',
			);
		}
		expect(screen.queryByText('missing')).not.toBeInTheDocument();
	});

	it('renders the configured most-popular ad only for ad-enabled users', () => {
		const { rerender } = render(
			<PuzzlesSupporting
				id="puzzles-supporting"
				adSlot="mostpop"
				layout={layout}
				renderAds={false}
				showPopular={true}
				supporting={supporting}
			/>,
		);
		expect(screen.queryByTestId('mostpop-ad')).not.toBeInTheDocument();
		rerender(
			<PuzzlesSupporting
				id="puzzles-supporting"
				adSlot="mostpop"
				layout={layout}
				renderAds={true}
				showPopular={true}
				supporting={supporting}
			/>,
		);
		expect(screen.getByTestId('mostpop-ad')).toBeInTheDocument();
	});
});
