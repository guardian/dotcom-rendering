import { css } from '@emotion/react';
import { neutral, text, textSans } from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';

const termsStyle = css`
	${textSans.xxsmall({ lineHeight: 'tight' })}
	color: ${text.supporting};
	a {
		${textSans.xxsmall()};
		color: ${neutral[0]};
		text-decoration: underline;
		:hover {
			color: ${neutral[0]};
			text-decoration: underline;
		}
	}
	strong {
		color: ${neutral[0]};
		font-weight: bold;
	}
`;

export const NewsletterPrivacyMessage = () => (
	<span css={termsStyle}>
		<strong>Privacy Notice: </strong>
		Newsletters may contain info about charities, online ads, and content
		funded by outside parties. For more information see our{' '}
		<Link
			data-ignore="global-link-styling"
			href="https://www.theguardian.com/help/privacy-policy"
			rel="noopener noreferrer"
		>
			privacy policy
		</Link>
		. We use Google reCaptcha to protect our website and the Google{' '}
		<Link
			data-ignore="global-link-styling"
			href="https://policies.google.com/privacy"
			rel="noopener noreferrer"
		>
			Privacy Policy
		</Link>{' '}
		and{' '}
		<Link
			data-ignore="global-link-styling"
			href="https://policies.google.com/terms"
			rel="noopener noreferrer"
		>
			Terms of Service
		</Link>{' '}
		apply.
	</span>
);
