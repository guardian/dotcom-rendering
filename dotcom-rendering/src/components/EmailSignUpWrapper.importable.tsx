import type { Breakpoint } from '@guardian/source/foundations';
import { useNewsletterSubscription } from '../lib/useNewsletterSubscription';
import type { EmailSignUpProps } from './EmailSignup';
import { EmailSignup } from './EmailSignup';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { Island } from './Island';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { Placeholder } from './Placeholder';
import { SecureSignup } from './SecureSignup.importable';

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
	successDescription: string;
	idApiUrl: string;
	/** You should only set this to true if the privacy message will be shown elsewhere on the page */
	hidePrivacyMessage?: boolean;
	/** Feature flag to enable hiding newsletter signup for already subscribed users */
	hideNewsletterSignupComponentForSubscribers?: boolean;
}

/**
 * EmailSignUpWrapper as an importable island component.
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
	...emailSignUpProps
}: EmailSignUpWrapperProps) => {
	const isSubscribed = useNewsletterSubscription(
		listId,
		idApiUrl,
		hideNewsletterSignupComponentForSubscribers,
	);

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
