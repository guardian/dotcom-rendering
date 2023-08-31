import { useIsBridgetCompatible } from '../lib/getBridgetVersion';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { SecureReCAPTCHASignup } from './SecureReCAPTCHASignup';
import { EmailSignUpProps, EmailSignup } from './EmailSignup';

interface Props extends EmailSignUpProps {
	skipToIndex: number;
}

export const EmailSignupWrapper = ({
	skipToIndex,
	...EmailSignUpProps
}: Props) => {
	const isCompatible = useIsBridgetCompatible();

	if (!isCompatible) {
		return null;
	}

	return (
		<InlineSkipToWrapper
			id={`EmailSignup-skip-link-${skipToIndex}`}
			blockDescription="newsletter promotion"
		>
			<EmailSignup {...EmailSignUpProps}>
				<SecureReCAPTCHASignup
					newsletterId={EmailSignUpProps.identityName}
					successDescription={EmailSignUpProps.successDescription}
				/>
				{!EmailSignUpProps.hidePrivacyMessage && (
					<NewsletterPrivacyMessage />
				)}
			</EmailSignup>
		</InlineSkipToWrapper>
	);
};
