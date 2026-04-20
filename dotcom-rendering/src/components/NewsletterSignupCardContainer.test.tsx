import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NewsletterSignupCardContainer } from './NewsletterSignupCardContainer';

jest.mock('../client/ophan/ophan', () => ({
	submitComponentEvent: jest.fn(() => Promise.resolve()),
}));

describe('NewsletterSignupCardContainer', () => {
	it('closes preview modal when Escape is pressed', async () => {
		render(
			<NewsletterSignupCardContainer
				identityName="morning-briefing"
				category="fronts-based"
				exampleUrl="/world/newsletters/morning-mail"
				renderingTarget="Web"
				theme="news"
				name="Morning Briefing"
				frequency="Every weekday"
				description="Start your day with top stories."
			/>,
		);

		fireEvent.click(screen.getByRole('button', { name: 'Preview latest' }));

		const dialog = screen.getByRole('dialog');
		expect(dialog).toBeInTheDocument();

		fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });

		await waitFor(() => {
			expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
		});
	});
});
