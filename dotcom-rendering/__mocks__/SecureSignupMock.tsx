import { NewsletterPrivacyMessage } from '../src/components/NewsletterPrivacyMessage.tsx';
import { NewsletterSignupForm } from '../src/components/NewsletterSignupForm.tsx';

type Props = {
	newsletterId: string;
	successDescription: string;
	hidePrivacyMessage?: boolean;
};

export const SecureSignup = ({
	newsletterId,
	hidePrivacyMessage = false,
}: Props) => {
	return (
		<div title="This is a mock for the SecureSignup component which is not compatible with storybook. Changes to the real component may not be automatically reflected in this mock.">
			<NewsletterSignupForm newsletterId={newsletterId} />
			{!hidePrivacyMessage && <NewsletterPrivacyMessage />}
		</div>
	);
};
