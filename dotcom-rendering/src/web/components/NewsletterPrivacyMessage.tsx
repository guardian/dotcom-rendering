import { css } from '@emotion/react';
import { neutral, text, textSans } from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';

const hrefLookup = {
	guardianPrivacyPolicy: 'https://www.theguardian.com/help/privacy-policy',
	googlePrivacyPolicy: 'https://policies.google.com/privacy',
	googleTermsOfService: 'https://policies.google.com/terms',
};

type ExternalLinkProps = { href: string; children: React.ReactNode };
/** Link component fixed with data-ignore and rel attributes for consistency in this file only */
const ExternalLink = ({ href, children }: ExternalLinkProps) => (
	<Link
		data-ignore="global-link-styling"
		href={href}
		rel="noopener noreferrer"
	>
		{children}
	</Link>
);

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
		<ExternalLink href={hrefLookup.guardianPrivacyPolicy}>
			privacy policy
		</ExternalLink>
		. We use Google reCaptcha to protect our website and the Google{' '}
		<ExternalLink href={hrefLookup.googlePrivacyPolicy}>
			Privacy Policy
		</ExternalLink>{' '}
		and{' '}
		<ExternalLink href={hrefLookup.googleTermsOfService}>
			Terms of Service
		</ExternalLink>{' '}
		apply.
	</span>
);
