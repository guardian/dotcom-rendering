import type { EmailSignUpProps } from './EmailSignup';
import { EmailSignup } from './EmailSignup';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { Island } from './Island';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { SecureSignup } from './SecureSignup.importable';

interface MarketingEmailSignUpWrapperProps extends EmailSignUpProps {
	index: number;
	emailId: string;
}

export const MarketingEmailSignUpWrapper = ({
	index,
	emailId,
	name,
	description,
	emailType,
	theme,
}: MarketingEmailSignUpWrapperProps) => {
	return (
		<InlineSkipToWrapper
			id={`EmailSignup-skip-link-${index}`}
			blockDescription="marketing email promotion"
		>
			<EmailSignup
				emailType={emailType}
				name={name}
				description={description}
				theme={theme}
			>
				<Island priority="feature" defer={{ until: 'visible' }}>
					<SecureSignup
						newsletterId={emailId}
						emailType={emailType}
						successDescription={`We will send you an email to confirm your subscription to ${name} - please use the subscribe link to sign up.`}
					/>
				</Island>

				<NewsletterPrivacyMessage
					emailType={emailType}
					textColor="regular"
				/>
			</EmailSignup>
		</InlineSkipToWrapper>
	);
};
