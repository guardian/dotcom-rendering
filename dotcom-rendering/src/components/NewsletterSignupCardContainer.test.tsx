import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { submitComponentEvent } from '../client/ophan/ophan';
import { NEWSLETTER_SIGNUP_COMPONENT_ID } from '../lib/newsletterSignupTracking';
import { NewsletterSignupCardContainer } from './NewsletterSignupCardContainer';

jest.mock('../client/ophan/ophan', () => ({
	submitComponentEvent: jest.fn(() => Promise.resolve()),
}));

const defaultProps = {
	identityName: 'morning-briefing',
	category: 'fronts-based' as const,
	exampleUrl: '/world/newsletters/morning-mail',
	renderingTarget: 'Web' as const,
	theme: 'news',
	name: 'Morning Briefing',
	frequency: 'Every weekday',
	description: 'Start your day with top stories.',
};

const renderContainer = (props = {}) =>
	render(
		<NewsletterSignupCardContainer {...defaultProps} {...props}>
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

describe('NewsletterSignupCardContainer', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('closes preview modal when Escape is pressed', async () => {
		renderContainer();

		fireEvent.click(screen.getByRole('button', { name: 'Preview latest' }));

		const dialog = screen.getByRole('dialog');
		expect(dialog).toBeInTheDocument();

		fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });

		await waitFor(() => {
			expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
		});
	});

	describe('preview tracking', () => {
		it('fires an EXPAND event with the variant component id when the preview is opened', () => {
			renderContainer();

			fireEvent.click(
				screen.getByRole('button', { name: 'Preview latest' }),
			);

			expect(submitComponentEvent).toHaveBeenCalledWith(
				expect.objectContaining({
					component: {
						componentType: 'NEWSLETTER_SUBSCRIPTION',
						id: NEWSLETTER_SIGNUP_COMPONENT_ID.variant(
							defaultProps.identityName,
						),
					},
					action: 'EXPAND',
					value: expect.stringContaining(
						'"eventDescription":"preview-open"',
					),
				}),
				defaultProps.renderingTarget,
			);
		});

		it('fires a CLOSE event with the variant component id when the preview is closed', async () => {
			renderContainer();

			fireEvent.click(
				screen.getByRole('button', { name: 'Preview latest' }),
			);
			jest.clearAllMocks();

			const dialog = screen.getByRole('dialog');
			fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });

			await waitFor(() => {
				expect(submitComponentEvent).toHaveBeenCalledWith(
					expect.objectContaining({
						component: {
							componentType: 'NEWSLETTER_SUBSCRIPTION',
							id: NEWSLETTER_SIGNUP_COMPONENT_ID.variant(
								defaultProps.identityName,
							),
						},
						action: 'CLOSE',
						value: expect.stringContaining(
							'"eventDescription":"preview-close"',
						),
					}),
					defaultProps.renderingTarget,
				);
			});
		});

		it('does not fire a second EXPAND event if the preview is already open', () => {
			renderContainer();

			fireEvent.click(
				screen.getByRole('button', { name: 'Preview latest' }),
			);
			const firstCallCount = (submitComponentEvent as jest.Mock).mock
				.calls.length;

			fireEvent.click(
				screen.getByRole('button', { name: 'Preview latest' }),
			);

			expect((submitComponentEvent as jest.Mock).mock.calls.length).toBe(
				firstCallCount,
			);
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
					id: NEWSLETTER_SIGNUP_COMPONENT_ID.variant(
						defaultProps.identityName,
					),
				}),
			}),
			'Apps',
		);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});
});
