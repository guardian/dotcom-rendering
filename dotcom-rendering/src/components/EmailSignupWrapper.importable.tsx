import { Island } from '../components/Island';
import { SecureSignup } from '../components/SecureSignup';
import { useIsBridgetCompatible } from '../lib/getBridgetVersion';
import type { RenderingTarget } from '../types/renderingTarget';
import type { EmailSignUpProps } from './EmailSignup';
import { EmailSignup } from './EmailSignup';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { SecureReCAPTCHASignup } from './SecureReCAPTCHASignup';

interface EmailSignUpWrapperProps extends EmailSignUpProps {
	skipToIndex: number;
}
interface Props extends EmailSignUpWrapperProps {
	renderingTarget: RenderingTarget;
}

const AppEmailSignupWrapper = ({
	skipToIndex,
	...emailSignUpProps
}: EmailSignUpWrapperProps) => {
	const isCompatible = useIsBridgetCompatible();

	if (!isCompatible) {
		return null;
	}

	return (
		<Island clientOnly={true} deferUntil={'idle'}>
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
		</Island>
	);
};

const WebEmailSignupWrapper = ({
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

export const EmailSignupWrapper = ({
	renderingTarget,
	skipToIndex,
	...emailSignUpProps
}: Props) =>
	renderingTarget === 'Apps' ? (
		<AppEmailSignupWrapper
			skipToIndex={skipToIndex}
			{...emailSignUpProps}
		/>
	) : (
		<WebEmailSignupWrapper
			skipToIndex={skipToIndex}
			{...emailSignUpProps}
		/>
	);
