import { useState } from 'react';
import { useNewsletterSubscription } from '../lib/useNewsletterSubscription';
import type { EmailSignUpProps } from './EmailSignup';
import { EmailSignup } from './EmailSignup';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { Island } from './Island';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { SecureSignup } from './SecureSignup.importable';

interface EmailSignUpWrapperProps extends EmailSignUpProps {
	index: number;
	listId: number;
	identityName: string;
	successDescription: string;
	/** You should only set this to true if the privacy message will be shown elsewhere on the page */
	hidePrivacyMessage?: boolean;
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
	...emailSignUpProps
}: EmailSignUpWrapperProps) => {
	const [idApiUrl] = useState(() => {
		if (typeof window === 'undefined') return undefined;
		return window.guardian?.config?.page?.idApiUrl ?? undefined;
	});
	const isSubscribed = useNewsletterSubscription(listId, idApiUrl);

	// Don't render if user is signed in and already subscribed
	if (isSubscribed === true) {
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
