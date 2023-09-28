import { NewsletterPrivacyMessage } from '../src/components/NewsletterPrivacyMessage';
import { NewsletterSignupForm } from '../src/components/NewsletterSignupForm';
import type { SecureSignup as MockedSecureSignup } from '../src/components/SecureSignup';

export const SecureSignup: typeof MockedSecureSignup = ({
	newsletterId,
	hidePrivacyMessage = false,
}) => {
	return (
		<div title="This is a mock for the SecureSignup component which is not compatible with storybook. Changes to the real component may not be automatically reflected in this mock.">
			<NewsletterSignupForm newsletterId={newsletterId} />
			{!hidePrivacyMessage && <NewsletterPrivacyMessage />}
		</div>
	);
};
