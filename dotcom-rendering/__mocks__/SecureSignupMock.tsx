import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { NewsletterPrivacyMessage } from '../src/web/components/Newsletters/NewsletterPrivacyMessage';
import { SignupForm } from '../src/web/components/Newsletters/SignupForm';

type Props = {
	newsletterId: string;
	successDescription: string;
	hidePrivacyMessage?: boolean;
};

export const SecureSignup: React.FC<Props> = ({
	newsletterId,
	hidePrivacyMessage = false,
}) => {
	return (
		<div title="This is a mock for the SecureSignup component which is not compatible with storybook. Changes to the real component may not be automatically reflected in this mock.">
			<SignupForm newsletterId={newsletterId} />
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
