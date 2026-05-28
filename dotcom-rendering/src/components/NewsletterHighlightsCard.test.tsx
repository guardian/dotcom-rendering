import '@testing-library/jest-dom';
import { render, screen as testScreen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { NewsletterHighlightsCard } from './NewsletterHighlightsCard';

const defaultProps = {
	highlightCardTitle: 'Sign up to Saturday Edition',
	illustrationSquare: 'https://i.guim.co.uk/example.jpg',
	onClick: jest.fn(),
};

describe('NewsletterHighlightsCard', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders the label, title and illustration', () => {
		render(<NewsletterHighlightsCard {...defaultProps} />);

		expect(testScreen.getByText('Free newsletter')).toBeInTheDocument();
		expect(
			testScreen.getByText('Sign up to Saturday Edition'),
		).toBeInTheDocument();
		expect(testScreen.getByAltText('')).toHaveAttribute(
			'src',
			'https://i.guim.co.uk/example.jpg',
		);
	});

	it('calls onClick when the card is clicked', async () => {
		const userEvent = user.setup();
		render(<NewsletterHighlightsCard {...defaultProps} />);

		await userEvent.click(testScreen.getByRole('button'));

		expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
	});

	it('is keyboard accessible via Enter', async () => {
		const userEvent = user.setup();
		render(<NewsletterHighlightsCard {...defaultProps} />);

		const button = testScreen.getByRole('button');
		button.focus();
		await userEvent.keyboard('{Enter}');

		expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
	});

	it('does not render frequency or newsletter description on the card face', () => {
		render(
			<NewsletterHighlightsCard
				{...defaultProps}
				highlightCardTitle="Sign up to This is London"
			/>,
		);

		expect(testScreen.queryByText(/\|/)).toBeNull();
		expect(
			testScreen.queryByText(
				'A roundup of the best Guardian journalism.',
			),
		).toBeNull();
	});
});
