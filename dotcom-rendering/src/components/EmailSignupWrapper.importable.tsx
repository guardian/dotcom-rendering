import { useIsBridgetCompatible } from '../lib/useIsBridgetCompatible';
import type { EmailSignUpProps } from './EmailSignup';
import { EmailSignup } from './EmailSignup';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { SecureReCAPTCHASignup } from './SecureReCAPTCHASignup';

interface EmailSignUpWrapperProps extends EmailSignUpProps {
	skipToIndex: number;
}

export const EmailSignUpWrapper = ({
	skipToIndex,
	...emailSignUpProps
}: EmailSignUpWrapperProps) => {
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
