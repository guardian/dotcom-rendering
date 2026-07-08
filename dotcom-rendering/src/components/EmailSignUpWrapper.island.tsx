import { useEffect, useRef } from 'react';
import {
	NEWSLETTER_SIGNUP_COMPONENT_ID,
	sendNewsletterSignupEvent,
} from '../lib/newsletterSignupTracking';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { useNewsletterSubscription } from '../lib/useNewsletterSubscription';
import { useConfig } from './ConfigContext';
import type { EmailSignUpProps } from './EmailSignup';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { Island } from './Island';
import { NewsletterSignupCardContainer } from './NewsletterSignupCardContainer';
import { NewsletterSignupForm } from './NewsletterSignupForm.island';
// When the next A/B experiment is added (e.g. preview-button test), import
// useAB and AB_TEST_NAME from their respective modules and thread them through
// sendNewsletterSignupEvent's `abTest` param and NewsletterSignupForm's `abTest` prop.

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
	const isSignedIn = useIsSignedIn();
	const isSubscribed = useNewsletterSubscription(listId, idApiUrl);

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
		viewFiredRef.current = true;
		sendNewsletterSignupEvent({
			action: 'VIEW',
			identityName,
			componentId,
			renderingTarget,
			value: {
				eventDescription: 'newsletter-signup-viewed',
			},
		});
	}, [componentId, identityName, isSubscribed, renderingTarget]);

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
							isAlreadySubscribed={isSubscribed}
						/>
					</Island>
				)}
			</NewsletterSignupCardContainer>
		</InlineSkipToWrapper>
	);
};
