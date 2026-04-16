import type { Breakpoint } from '@guardian/source/foundations';
import { useNewsletterSubscription } from '../lib/useNewsletterSubscription';
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
	/** Illustration image URL (square crop) for the NewsletterSignupCard variant */
	illustrationSquare?: string;
	idApiUrl: string;
	/** You should only set this to true if the privacy message will be shown elsewhere on the page */
	hidePrivacyMessage?: boolean;
	/** Feature flag to enable hiding newsletter signup for already subscribed users */
	hideNewsletterSignupComponentForSubscribers?: boolean;
	/** Feature flag to show the new NewsletterSignupCard design instead of EmailSignup */
	showNewNewsletterSignupCard?: boolean;
	successDescription: string;
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
	idApiUrl,
	hideNewsletterSignupComponentForSubscribers = false,
	showNewNewsletterSignupCard = false,
	...emailSignUpProps
}: EmailSignUpWrapperProps) => {
	const shouldCheckSubscription =
		hideNewsletterSignupComponentForSubscribers &&
		!showNewNewsletterSignupCard;
	const isSubscribed = useNewsletterSubscription(
		listId,
		idApiUrl,
		shouldCheckSubscription,
	);

	// When the new card design is enabled, always show it regardless of subscription status
	if (showNewNewsletterSignupCard) {
		return (
			<InlineSkipToWrapper
				id={`EmailSignup-skip-link-${index}`}
				blockDescription="newsletter promotion"
			>
				<NewsletterSignupCardContainer
					name={emailSignUpProps.name}
					frequency={emailSignUpProps.frequency}
					description={emailSignUpProps.description}
					illustrationSquare={emailSignUpProps.illustrationSquare}
				>
					<Island priority="feature" defer={{ until: 'visible' }}>
						<SecureSignup
							newsletterId={emailSignUpProps.identityName}
							successDescription={
								emailSignUpProps.successDescription
							}
						/>
					</Island>
					{!emailSignUpProps.hidePrivacyMessage && (
						<NewsletterPrivacyMessage />
					)}
				</NewsletterSignupCardContainer>
			</InlineSkipToWrapper>
		);
	}

	// When the new card design is enabled, always show it regardless of subscription status
	if (true) {
		return (
			<InlineSkipToWrapper
				id={`EmailSignup-skip-link-${index}`}
				blockDescription="newsletter promotion"
			>
				<NewsletterSignupCard {...emailSignUpProps}>
					<Island priority="feature" defer={{ until: 'visible' }}>
						<NewsletterSignupForm
							newsletterId={emailSignUpProps.identityName}
							successDescription={emailSignUpProps.description}
						/>
					</Island>
					{!emailSignUpProps.hidePrivacyMessage && (
						<NewsletterPrivacyMessage />
					)}
				</NewsletterSignupCard>
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
			<EmailSignup {...emailSignUpProps}>
				<Island priority="feature" defer={{ until: 'visible' }}>
					<SecureSignup
						newsletterId={emailSignUpProps.identityName}
						successDescription={emailSignUpProps.description}
					/>
				</Island>
				{!emailSignUpProps.hidePrivacyMessage && (
					<NewsletterPrivacyMessage />
				)}
			</EmailSignup>
		</InlineSkipToWrapper>
	);
};
