import { LinkButton } from '@guardian/source/react-components';
import type { EmailSignUpProps } from './EmailSignup';
import { EmailSignup } from './EmailSignup';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';

interface MarketingEmailSignUpWrapperProps extends EmailSignUpProps {
	index: number;
	emailId: string;
	mmaUrl: string;
}

export const MarketingEmailSignUpWrapper = ({
	index,
	mmaUrl,
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
				<div>
					<LinkButton size="small" href={`${mmaUrl}/email-prefs`}>
						Sign up from my account
					</LinkButton>
				</div>

				<NewsletterPrivacyMessage
					emailType={emailType}
					textColor="regular"
				/>
			</EmailSignup>
		</InlineSkipToWrapper>
	);
};
