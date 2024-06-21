import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { NewsletterPrivacyMessage } from '../../NewsletterPrivacyMessage';
import { SecureSignup } from '../../SecureSignup.importable';

const containerStyles = css`
	margin: ${space[6]}px ${space[2]}px ${space[1]}px 0;
`;

interface ContributionsEpicNewsletterSignupV2Props {
	newsletterId: string;
	successDescription: string;
}

export const ContributionsEpicNewsletterSignupV2 = ({
	newsletterId,
	successDescription,
}: ContributionsEpicNewsletterSignupV2Props): JSX.Element => {
	return (
		<div css={containerStyles}>
			<SecureSignup
				newsletterId={newsletterId}
				successDescription={successDescription}
			/>
			<NewsletterPrivacyMessage />
		</div>
	);
};
