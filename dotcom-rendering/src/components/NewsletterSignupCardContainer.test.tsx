import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { submitComponentEvent } from '../client/ophan/ophan';
import {
	NEWSLETTER_PREVIEW_AB_TEST_NAME,
	NEWSLETTER_PREVIEW_VARIANT,
} from '../lib/newsletterSignupAbTest';
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
		<NewsletterSignupCardContainer
			{...defaultProps}
			isSignedIn={true}
			{...props}
		>
			{(previewAction) =>
				previewAction?.behaviour === 'modal' ? (
					<button type="button" onClick={previewAction.onClick}>
						Preview latest
					</button>
				) : null
			}
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
			renderContainer({
				abTest: {
					name: NEWSLETTER_PREVIEW_AB_TEST_NAME,
					variant: NEWSLETTER_PREVIEW_VARIANT.illustrated,
				},
			});

			fireEvent.click(
				screen.getByRole('button', { name: 'Preview latest' }),
			);

			expect(submitComponentEvent).toHaveBeenCalledWith(
				expect.objectContaining({
					component: {
						componentType: 'NEWSLETTER_SUBSCRIPTION',
						id: NEWSLETTER_SIGNUP_COMPONENT_ID.inArticleSignupForm(
							defaultProps.identityName,
						),
					},
					action: 'EXPAND',
					abTest: {
						name: NEWSLETTER_PREVIEW_AB_TEST_NAME,
						variant: NEWSLETTER_PREVIEW_VARIANT.illustrated,
					},
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
							id: NEWSLETTER_SIGNUP_COMPONENT_ID.inArticleSignupForm(
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

		it('does not render any preview trigger when preview is disabled', () => {
			renderContainer({ enablePreview: false });

			expect(
				screen.queryByRole('button', { name: 'Preview latest' }),
			).not.toBeInTheDocument();
			expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
			expect(submitComponentEvent).not.toHaveBeenCalled();
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
				isSignedIn={true}
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
					id: NEWSLETTER_SIGNUP_COMPONENT_ID.inArticleSignupForm(
						defaultProps.identityName,
					),
				}),
			}),
			'Apps',
		);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('does not render a preview link for apps when preview is disabled', () => {
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
				isSignedIn={true}
				enablePreview={false}
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

		expect(
			screen.queryByRole('link', { name: 'Preview latest' }),
		).not.toBeInTheDocument();
		expect(submitComponentEvent).not.toHaveBeenCalled();
	});
});
