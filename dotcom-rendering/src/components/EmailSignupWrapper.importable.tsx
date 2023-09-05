import { SecureSignup } from '../components/SecureSignup';
import { useIsBridgetCompatible } from '../lib/getBridgetVersion';
import type { EmailSignUpProps } from './EmailSignup';
import { EmailSignup } from './EmailSignup';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { SecureReCAPTCHASignup } from './SecureReCAPTCHASignup';

interface EmailSignUpWrapperProps extends EmailSignUpProps {
	skipToIndex: number;
}

export const AppEmailSignupWrapper = ({
	skipToIndex,
	...emailSignUpProps
}: EmailSignUpWrapperProps) => {
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

export const WebEmailSignupWrapper = ({
	skipToIndex,
	...emailSignUpProps
}: EmailSignUpWrapperProps) => (
	<InlineSkipToWrapper
		id={`EmailSignup-skip-link-${skipToIndex}`}
		blockDescription="newsletter promotion"
	>
		<EmailSignup {...emailSignUpProps}>
			<SecureSignup
				name={emailSignUpProps.name}
				newsletterId={emailSignUpProps.identityName}
				successDescription={emailSignUpProps.description}
			/>
		</EmailSignup>
	</InlineSkipToWrapper>
);
