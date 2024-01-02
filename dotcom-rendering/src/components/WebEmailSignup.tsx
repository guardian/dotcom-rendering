import type { EmailSignUpProps } from './EmailSignup';
import { EmailSignup } from './EmailSignup';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { SecureReCAPTCHASignup } from '../components/SecureReCAPTCHASignup';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';

interface WebEmailSignProps extends EmailSignUpProps {
	index: number;
	identityName: string;
	successDescription: string;
	/** You should only set this to true if the privacy message will be shown elsewhere on the page */
	hidePrivacyMessage?: boolean;
}

export const WebEmailSignUp = ({
	index,
	...emailSignUpProps
}: WebEmailSignProps) => {
	return (
		<InlineSkipToWrapper
			id={`EmailSignup-skip-link-${index}`}
			blockDescription="newsletter promotion"
		>
			<EmailSignup {...emailSignUpProps}>
				<SecureReCAPTCHASignup
					newsletterId={emailSignUpProps.identityName}
					successDescription={emailSignUpProps.description}
				/>
			</EmailSignup>
			{!emailSignUpProps.hidePrivacyMessage && (
				<NewsletterPrivacyMessage />
			)}
		</InlineSkipToWrapper>
	);
};
