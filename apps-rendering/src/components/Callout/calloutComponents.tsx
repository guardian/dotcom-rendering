import type { FC } from 'react';
import { highlight, info, termsConditions } from './styles';

export const TermsAndConditions: FC = () => (
	<div css={termsConditions}>
		Please share your story if you are 18 or over, anonymously if you wish.{' '}
		For more information please see our{' '}
		<a href="https://www.theguardian.com/help/terms-of-service">
			terms of service
		</a>{' '}
		and{' '}
		<a href="https://www.theguardian.com/help/privacy-policy">
			privacy policy
		</a>
		.
	</div>
);

export const Disclaimer: FC = () => (
	<div css={info}>
		Your responses, which can be anonymous, are secure as the form is
		encrypted and only the Guardian has access to your contributions. We
		will only use the data you provide us for the purpose of the feature and
		we will delete any personal data when we no longer require it for this
		purpose. For true anonymity please use our{' '}
		<a href="https://www.theguardian.com/securedrop">SecureDrop</a> service
		instead.
	</div>
);

export const ContactText: FC = () => (
	<div css={info}>
		By submitting your response, you are agreeing to share your details with
		us for this feature.
	</div>
);

export const InactiveCallout: FC = () => (
	<div css={highlight}>
		<p>This callout is now closed to any further submissions.</p>
		<p>
			You can see{' '}
			<a href="https://www.theguardian.com/profile/guardian-community-team">
				other Guardian community callouts here
			</a>{' '}
			or{' '}
			<a href="https://www.theguardian.com/community/2015/sep/02/guardianwitness-send-us-a-story">
				tell us about a story here.
			</a>
		</p>
	</div>
);
