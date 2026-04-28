import type { Breakpoint } from '@guardian/source/foundations';
import { useEffect } from 'react';
import {
	AB_TEST_NAME,
	NEWSLETTER_SIGNUP_COMPONENT_ID,
	sendNewsletterSignupEvent,
} from '../lib/newsletterSignupTracking';
import { useBetaAB } from '../lib/useAB';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { useNewsletterSubscription } from '../lib/useNewsletterSubscription';
import { useConfig } from './ConfigContext';
import type { EmailSignUpProps } from './EmailSignup';
import { EmailSignup } from './EmailSignup';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { Island } from './Island';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { NewsletterSignupCardContainer } from './NewsletterSignupCardContainer';
import { NewsletterSignupForm } from './NewsletterSignupForm.island';
import { Placeholder } from './Placeholder';
import { SecureSignup } from './SecureSignup.island';

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
	successDescription: string;
	/** Illustration image URL (square crop) for the NewsletterSignupCard variant */
	illustrationSquare?: string;
	idApiUrl: string;
	exampleUrl?: string;
	/** You should only set this to true if the privacy message will be shown elsewhere on the page */
	hidePrivacyMessage?: boolean;
	/** Feature flag to enable hiding newsletter signup for already subscribed users */
	hideNewsletterSignupComponentForSubscribers?: boolean;
	/** Feature flag to show the new NewsletterSignupCard design instead of EmailSignup */
	showNewNewsletterSignupCard?: boolean;
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
	successDescription,
	hidePrivacyMessage,
	hideNewsletterSignupComponentForSubscribers = false,
	showNewNewsletterSignupCard = false,
}: EmailSignUpWrapperProps) => {
	const { renderingTarget } = useConfig();
	const abTests = useBetaAB();
	// `abTests` is undefined before the AB client has hydrated — treat that as
	// "not yet resolved" rather than "in control", so we don't fire premature
	// tracking events.
	const abResolved = abTests !== undefined;
	const isInVariantGroup =
		abTests?.isUserInTestGroup(AB_TEST_NAME, 'variant') ?? false;
	const isSubscribed = useNewsletterSubscription(
		listId,
		idApiUrl,
		hideNewsletterSignupComponentForSubscribers,
	);
	const isSignedIn = useIsSignedIn();

	const isVariant = showNewNewsletterSignupCard && isInVariantGroup;

	const abVariant = isVariant ? 'variant' : 'control';

	useEffect(() => {
		if (!abResolved) return;
		// For the control path, don't fire while subscription status is still
		// loading — we'd be tracking a view of the placeholder, not the form.
		if (!isVariant && isSubscribed === undefined) return;
		sendNewsletterSignupEvent({
			action: 'VIEW',
			identityName,
			componentId: isVariant
				? NEWSLETTER_SIGNUP_COMPONENT_ID.variant(identityName)
				: NEWSLETTER_SIGNUP_COMPONENT_ID.control(identityName),
			renderingTarget,
			value: {
				eventDescription: 'newsletter-signup-viewed',
				// Included so analysts can normalise conversion rates between
				// branches: the variant always renders regardless of subscription
				// status, whereas the control hides for subscribed users.
				isAlreadySubscribed: isSubscribed === true,
			},
			// Use the standard Ophan abTest field so Ophan can join events
			// to the A/B test — not strings encoded inside value.
			abTest: { name: AB_TEST_NAME, variant: abVariant },
		});
	}, [
		abResolved,
		abVariant,
		identityName,
		isSubscribed,
		isVariant,
		renderingTarget,
	]);

	if (isVariant) {
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
					{(openPreview) => (
						<Island priority="feature" defer={{ until: 'visible' }}>
							<NewsletterSignupForm
								newsletterId={identityName}
								newsletterName={name}
								frequency={frequency}
								hidePrivacyMessage={isSignedIn === true}
								onPreviewClick={openPreview}
								isAlreadySubscribed={isSubscribed === true}
								abTest={{
									name: AB_TEST_NAME,
									variant: abVariant,
								}}
							/>
						</Island>
					)}
				</NewsletterSignupCardContainer>
			</InlineSkipToWrapper>
		);
	}

	// Show placeholder while subscription status is being determined
	// This prevents layout shift in both subscribed and non-subscribed cases
	if (isSubscribed === undefined) {
		return <Placeholder heights={PLACEHOLDER_HEIGHTS} />;
	}

	// Don't render if user is signed in and already subscribed
	if (isSubscribed) {
		return null;
	}

	return (
		<InlineSkipToWrapper
			id={`EmailSignup-skip-link-${index}`}
			blockDescription="newsletter promotion"
		>
			<EmailSignup
				name={name}
				description={description}
				frequency={frequency}
				theme={theme}
			>
				<Island priority="feature" defer={{ until: 'visible' }}>
					<SecureSignup
						newsletterId={identityName}
						successDescription={successDescription}
						abTest={{ name: AB_TEST_NAME, variant: abVariant }}
					/>
				</Island>
				{!hidePrivacyMessage && <NewsletterPrivacyMessage />}
			</EmailSignup>
		</InlineSkipToWrapper>
	);
};
