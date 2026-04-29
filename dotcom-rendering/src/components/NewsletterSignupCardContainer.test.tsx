import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { submitComponentEvent } from '../client/ophan/ophan';
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
			>
				{(previewAction) => (
					<button
						type="button"
						onClick={
							previewAction?.behaviour === 'modal'
								? previewAction.onClick
								: undefined
						}
					>
						Preview latest
					</button>
				)}
			</NewsletterSignupCardContainer>,
		);

		fireEvent.click(screen.getByRole('button', { name: 'Preview latest' }));

		const dialog = screen.getByRole('dialog');
		expect(dialog).toBeInTheDocument();

		fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });

		await waitFor(() => {
			expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
		});
	});

	it('renders a preview link for apps and tracks the open event', () => {
		render(
			<NewsletterSignupCardContainer
				identityName="morning-briefing"
				category="fronts-based"
				exampleUrl="/world/newsletters/morning-mail"
				renderingTarget="Apps"
				theme="news"
				name="Morning Briefing"
				frequency="Every weekday"
				description="Start your day with top stories."
			>
				{(previewAction) =>
					previewAction?.behaviour === 'link' ? (
						<a
							href={previewAction.href}
							onClick={previewAction.onClick}
						>
							Preview latest
						</a>
					) : null
				}
			</NewsletterSignupCardContainer>,
		);

		const previewLink = screen.getByRole('link', {
			name: 'Preview latest',
		});

		expect(previewLink).toHaveAttribute(
			'href',
			'https://email-rendering.guardianapis.com/fronts/world/newsletters/morning-mail?variant=persephone&readonly=true&embed=true',
		);

		fireEvent.click(previewLink);

		expect(submitComponentEvent).toHaveBeenCalledWith(
			expect.objectContaining({
				action: 'EXPAND',
				component: expect.objectContaining({
					id: 'DCR NewsletterPreview morning-briefing',
				}),
			}),
			'Apps',
		);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});
});
