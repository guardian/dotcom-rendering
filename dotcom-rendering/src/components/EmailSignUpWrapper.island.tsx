import { useEffect, useRef } from 'react';
import {
	isWithoutPreviewVariant,
	NEWSLETTER_PREVIEW_AB_TEST_NAME,
	resolveNewsletterPreviewAbTest,
} from '../lib/newsletterSignupAbTest';
import {
	NEWSLETTER_SIGNUP_COMPONENT_ID,
	sendNewsletterSignupEvent,
} from '../lib/newsletterSignupTracking';
import { useAB } from '../lib/useAB';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { useNewsletterSubscription } from '../lib/useNewsletterSubscription';
import { useConfig } from './ConfigContext';
import type { EmailSignUpProps } from './EmailSignup';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { Island } from './Island';
import { NewsletterSignupCardContainer } from './NewsletterSignupCardContainer';
import { NewsletterSignupForm } from './NewsletterSignupForm.island';

/**
 * How long to wait for the AB framework to resolve before firing the VIEW
 * event without test metadata. Ensures newsletter view tracking still fires
 * even if the AB framework never initialises.
 */
const AB_RESOLUTION_TIMEOUT_MS = 2000;

interface EmailSignUpWrapperProps extends EmailSignUpProps {
	index: number;
	listId: number;
	identityName: string;
	category?: string;
	/** Illustration image URL (square crop) for the NewsletterSignupCard */
	illustrationSquare?: string;
	idApiUrl: string;
	exampleUrl?: string;
}

/**
 * EmailSignUpWrapper as an island component.
 *
 * This component needs to be hydrated client-side because it uses
 * client-side hooks for auth status and tracking.
 */
export const EmailSignUpWrapper = ({
	index,
	listId,
	identityName,
	category,
	idApiUrl,
	exampleUrl,
	name,
	description,
	illustrationSquare,
	frequency,
	theme,
}: EmailSignUpWrapperProps) => {
	const { renderingTarget } = useConfig();
	const abTests = useAB();
	const isSignedIn = useIsSignedIn();
	const isSubscribed = useNewsletterSubscription(listId, idApiUrl);
	const isABResolved = abTests !== undefined;
	const previewVariant =
		abTests?.getParticipations()[NEWSLETTER_PREVIEW_AB_TEST_NAME];
	const abTest = resolveNewsletterPreviewAbTest(previewVariant);
	const enablePreview = !isWithoutPreviewVariant(previewVariant);

	const componentId =
		NEWSLETTER_SIGNUP_COMPONENT_ID.inArticleSignupForm(identityName);

	const viewFiredRef = useRef(false);

	useEffect(() => {
		// Wait for subscription status — we only want to track a view of the
		// actual signup form, not a loading state or success message.
		if (isSubscribed === undefined) {
			return;
		}
		// Don't fire if the user is already subscribed.
		if (isSubscribed) {
			return;
		}
		if (viewFiredRef.current) {
			return;
		}

		const fireView = () => {
			if (viewFiredRef.current) {
				return;
			}
			viewFiredRef.current = true;
			sendNewsletterSignupEvent({
				action: 'VIEW',
				identityName,
				componentId,
				renderingTarget,
				abTest,
				value: {
					eventDescription: 'newsletter-signup-viewed',
				},
			});
		};

		// When the AB framework has resolved, fire immediately with the test
		// metadata attached. Otherwise wait briefly for it to resolve so we can
		// attribute the view to the correct arm — but never block the VIEW event
		// indefinitely: the AB framework can fail to initialise, and newsletter
		// tracking must continue to work regardless.
		if (isABResolved) {
			fireView();
			return;
		}

		const timeoutId = setTimeout(fireView, AB_RESOLUTION_TIMEOUT_MS);
		return () => clearTimeout(timeoutId);
	}, [
		abTest,
		componentId,
		identityName,
		isABResolved,
		isSubscribed,
		renderingTarget,
	]);

	return (
		<InlineSkipToWrapper
			id={`EmailSignup-skip-link-${index}`}
			blockDescription="newsletter promotion"
		>
			<NewsletterSignupCardContainer
				name={name}
				description={description}
				illustrationSquare={illustrationSquare}
				frequency={frequency}
				theme={theme}
				identityName={identityName}
				category={category}
				exampleUrl={exampleUrl}
				renderingTarget={renderingTarget}
				abTest={abTest}
				enablePreview={enablePreview}
				isSignedIn={isSignedIn}
			>
				{(previewAction) => (
					<Island priority="feature" defer={{ until: 'visible' }}>
						<NewsletterSignupForm
							newsletterId={identityName}
							newsletterName={name}
							frequency={frequency}
							previewAction={previewAction}
							componentId={componentId}
							abTest={abTest}
							isAlreadySubscribed={isSubscribed}
						/>
					</Island>
				)}
			</NewsletterSignupCardContainer>
		</InlineSkipToWrapper>
	);
};
