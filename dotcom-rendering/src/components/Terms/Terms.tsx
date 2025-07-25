/**
 * @file Terms.tsx
 * This file was migrated from:
 * https://github.com/guardian/gateway/blob/b980d008f91bd1abb108e50de9cdd1c364f37f4d/src/client/components/Terms.tsx
 */
import { ExternalLink } from '../ExternalLink/ExternalLink';
import { InformationBoxText } from '../InformationBox/InformationBox';

export const GuardianTerms = () => (
	<InformationBoxText>
		By proceeding, you agree to our{' '}
		<ExternalLink
			href="https://www.theguardian.com/help/terms-of-service"
			data-ignore="global-link-styling"
		>
			terms and conditions
		</ExternalLink>
		. For information about how we use your data, see our{' '}
		<ExternalLink
			href="https://www.theguardian.com/help/privacy-policy"
			data-ignore="global-link-styling"
		>
			privacy policy
		</ExternalLink>
		.
	</InformationBoxText>
);

export const JobsTerms = () => (
	<InformationBoxText>
		By proceeding, you agree to our{' '}
		<ExternalLink href="https://jobs.theguardian.com/terms-and-conditions/">
			Guardian Jobs terms and conditions
		</ExternalLink>
		. For information about how we use your data, see our{' '}
		<ExternalLink href="https://jobs.theguardian.com/privacy-policy/">
			Guardian Jobs privacy policy
		</ExternalLink>
		.
	</InformationBoxText>
);

export const RecaptchaTerms = () => (
	<InformationBoxText>
		This service is protected by reCAPTCHA and the Google{' '}
		<ExternalLink href="https://policies.google.com/privacy">
			privacy policy
		</ExternalLink>{' '}
		and{' '}
		<ExternalLink href="https://policies.google.com/terms">
			terms of service
		</ExternalLink>{' '}
		apply.
	</InformationBoxText>
);
