import { useIsBridgetCompatible } from '../lib/useIsBridgetCompatible';
import type { EmailSignUpProps } from './EmailSignup';
import { EmailSignup } from './EmailSignup';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { SecureSignup } from './SecureSignup';

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
				<SecureSignup
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
