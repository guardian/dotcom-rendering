import { useIsBridgetCompatible } from '../lib/getBridgetVersion';
import type { EmailSignUpProps } from './EmailSignup';
import { EmailSignup } from './EmailSignup';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { SecureReCAPTCHASignup } from './SecureReCAPTCHASignup';

interface Props extends EmailSignUpProps {
	skipToIndex: number;
}

export const EmailSignupWrapper = ({
	skipToIndex,
	...emailSignUpProps
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
