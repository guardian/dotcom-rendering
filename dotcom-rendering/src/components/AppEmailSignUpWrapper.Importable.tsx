import { useIsBridgetCompatible } from '../lib/useIsBridgetCompatible';
import type { EmailSignUpProps } from './EmailSignup';
import { EmailSignup } from './EmailSignup';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { SecureReCAPTCHASignup } from './SecureReCAPTCHASignup';

interface AppEmailSignUpWrapperProps extends EmailSignUpProps {
	skipToIndex: number;
	identityName: string;
	successDescription: string;
	/** You should only set this to true if the privacy message will be shown elsewhere on the page */
	hidePrivacyMessage?: boolean;
}

export const AppEmailSignUpWrapper = ({
	skipToIndex,
	...emailSignUpProps
}: AppEmailSignUpWrapperProps) => {
	const isCompatible = useIsBridgetCompatible();
	console.log('is compatible:::', isCompatible);
	if (!isCompatible) {
		return null;
	}

	return (
		<InlineSkipToWrapper
			id={`EmailSignup-skip-link-${skipToIndex}`}
			blockDescription="newsletter promotion"
		>
			<p>HELLO APPS WORLD</p>

			<EmailSignup {...emailSignUpProps}>
				<SecureReCAPTCHASignup
					newsletterId={emailSignUpProps.identityName}
					successDescription={emailSignUpProps.successDescription}
				/>
				{!emailSignUpProps.hidePrivacyMessage && (
					<NewsletterPrivacyMessage />
				)}
			</EmailSignup>
		</InlineSkipToWrapper>
	);
};
