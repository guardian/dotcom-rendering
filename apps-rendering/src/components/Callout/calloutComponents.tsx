import type { FC } from 'react';
import { info, tab, tabContainer, termsConditions } from './styles';

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
		One of our journalists will be in contact before we publish your
		information, so please do leave contact details.
	</div>
);

/* This component will be replaced with functioning tabs at some point */
/* But for now its just a styled div, as we don't have the Share tab in scope */

export const PseudoTab: FC = () => (
	<div css={tabContainer}>
		<div css={tab}>Tell us here</div>
	</div>
);
