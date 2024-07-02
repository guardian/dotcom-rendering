import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { Tracking } from '@guardian/support-dotcom-components/dist/shared/src/types/props/shared';
import { NewsletterPrivacyMessage } from '../../NewsletterPrivacyMessage';
import { SecureSignup } from '../../SecureSignup.importable';

const containerStyles = css`
	margin: ${space[6]}px ${space[2]}px ${space[1]}px 0;
`;

interface ContributionsEpicNewsletterSignupV2Props {
	newsletterId: string;
	successDescription: string;
	tracking: Tracking;
}

export const ContributionsEpicNewsletterSignup = ({
	newsletterId,
	successDescription,
	tracking,
}: ContributionsEpicNewsletterSignupV2Props): JSX.Element => {
	return (
		<div css={containerStyles}>
			<SecureSignup
				newsletterId={newsletterId}
				successDescription={successDescription}
				abTest={{
					name: tracking.abTestName,
					variant: tracking.abTestVariant,
				}}
			/>
			<NewsletterPrivacyMessage />
		</div>
	);
};
