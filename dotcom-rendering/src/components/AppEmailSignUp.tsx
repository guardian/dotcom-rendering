import type { EmailSignUpProps } from './EmailSignup';
import { EmailSignup } from './EmailSignup';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { Island } from './Island';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { SecureReCAPTCHASignup } from './SecureReCAPTCHASignup.importable';

interface AppEmailSignupProps extends EmailSignUpProps {
	skipToIndex: number;
	identityName: string;
	successDescription: string;
	/** You should only set this to true if the privacy message will be shown elsewhere on the page */
	hidePrivacyMessage?: boolean;
}

export const AppEmailSignUp = ({
	skipToIndex,
	...emailSignUpProps
}: AppEmailSignupProps) => {
	return (
		<InlineSkipToWrapper
			id={`EmailSignup-skip-link-${skipToIndex}`}
			blockDescription="newsletter promotion"
		>
			<EmailSignup {...emailSignUpProps}>
				<Island priority="feature" defer={{ until: 'idle' }}>
					<SecureReCAPTCHASignup
						newsletterId={emailSignUpProps.identityName}
						successDescription={emailSignUpProps.successDescription}
					/>
				</Island>
				{!emailSignUpProps.hidePrivacyMessage && (
					<NewsletterPrivacyMessage />
				)}
			</EmailSignup>
		</InlineSkipToWrapper>
	);
};
