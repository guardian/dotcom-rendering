import type { Breakpoint } from '@guardian/source/foundations';
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
import { Placeholder } from './Placeholder';
// When the next A/B experiment is added (e.g. preview-button test), import
// useAB and AB_TEST_NAME from their respective modules and thread them through
// sendNewsletterSignupEvent's `abTest` param and NewsletterSignupForm's `abTest` prop.

/**
 * Approximate heights of the EmailSignup component at different breakpoints.
 */
const PLACEHOLDER_HEIGHTS = new Map<Breakpoint, number>([
	['mobile', 220],
	['tablet', 180],
	['desktop', 180],
]);

interface EmailSignUpWrapperProps extends EmailSignUpProps {
	index: number;
	listId: number;
	identityName: string;
	category?: string;
	/** Illustration image URL (square crop) for the NewsletterSignupCard */
	illustrationSquare?: string;
	idApiUrl: string;
	exampleUrl?: string;
	/** Feature flag to enable hiding newsletter signup for already subscribed users */
	hideNewsletterSignupComponentForSubscribers?: boolean;
}

/**
 * EmailSignUpWrapper as an island component.
 *
 * This component needs to be hydrated client-side because it uses
 * the useNewsletterSubscription hook which depends on auth status
 * to determine if the user is already subscribed to the newsletter.
 *
 * If the user is signed in and already subscribed, this component
 * will return null (hide the signup form).
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
	hideNewsletterSignupComponentForSubscribers = false,
}: EmailSignUpWrapperProps) => {
	const { renderingTarget } = useConfig();

	const isSubscribed = useNewsletterSubscription(
		listId,
		idApiUrl,
		hideNewsletterSignupComponentForSubscribers,
	);
	const isSignedIn = useIsSignedIn();

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
		// Guard against double-firing (e.g. if deps change after the first fire)
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

	if (isSubscribed === undefined) {
		return <Placeholder heights={PLACEHOLDER_HEIGHTS} />;
	}

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
							isAlreadySubscribed={isSubscribed}
							componentId={componentId}
						/>
					</Island>
				)}
			</NewsletterSignupCardContainer>
		</InlineSkipToWrapper>
	);
};
