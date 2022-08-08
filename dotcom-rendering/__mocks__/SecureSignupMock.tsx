import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { NewsletterPrivacyMessage } from '../src/web/components/NewsletterPrivacyMessage';
import { NewsletterSignupForm } from '../src/web/components/NewsletterSignupForm';

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
			{!hidePrivacyMessage && (
				<div
					css={css`
						margin-top: ${space[2]}px;
					`}
				>
					<NewsletterPrivacyMessage />
				</div>
			)}
		</div>
	);
};
