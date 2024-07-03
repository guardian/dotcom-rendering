import { css } from '@emotion/react';
import {
	palette as sourcePalette,
	textSans12,
} from '@guardian/source/foundations';
import { Link } from '@guardian/source/react-components';
import { palette as themePalette } from '../palette';

interface Props {
	textColor?: 'supporting' | 'regular';
}

const GUARDIAN_PRIVACY_POLICY =
	'https://www.theguardian.com/help/privacy-policy';
const GOOGLE_PRIVACY_POLICY = 'https://policies.google.com/privacy';
const GOOGLE_TERMS_OF_SERVICE = 'https://policies.google.com/terms';

type PolicyUrl =
	| typeof GUARDIAN_PRIVACY_POLICY
	| typeof GOOGLE_PRIVACY_POLICY
	| typeof GOOGLE_TERMS_OF_SERVICE;

type LegalLinkProps = { href: PolicyUrl; children: string };

/** Link component fixed with data-ignore and rel attributes for consistency in this file only */
const LegalLink = ({ href, children }: LegalLinkProps) => (
	<Link data-ignore="global-link-styling" href={href} rel="noreferrer">
		{children}
	</Link>
);

const termsStyle = css`
	${textSans12};
	/**
	 * Typography preset styles should not be overridden.
	 * This has been done because the styles do not directly map to the new presets.
	 * Please speak to your team's designer and update this to use a more appropriate preset.
	 */
	line-height: 1.15;
	a {
		${textSans12};
		text-decoration: underline;
		:hover {
			text-decoration: underline;
		}
	}
	strong {
		font-weight: bold;
	}
`;
const textStyles = (textColor: 'supporting' | 'regular') => {
	switch (textColor) {
		case 'supporting':
			return css`
				color: ${themePalette('--privacy-text-supporting-subdued')};
				a,
				strong {
					color: ${themePalette('--privacy-text-supporting')};
					:hover {
						color: inherit;
					}
				}
			`;
		case 'regular':
			return css`
				color: ${sourcePalette.neutral[20]};
				a,
				strong {
					color: ${themePalette('--privacy-text-regular')};
					:hover {
						color: inherit;
					}
				}
			`;
	}
};

export const NewsletterPrivacyMessage = ({
	textColor = 'supporting',
}: Props) => (
	<span css={[termsStyle, textStyles(textColor)]}>
		<strong>Privacy Notice: </strong>
		Newsletters may contain info about charities, online ads, and content
		funded by outside parties. For more information see our{' '}
		<LegalLink href={GUARDIAN_PRIVACY_POLICY}>Privacy Policy</LegalLink>. We
		use Google reCaptcha to protect our website and the Google{' '}
		<LegalLink href={GOOGLE_PRIVACY_POLICY}>Privacy Policy</LegalLink> and{' '}
		<LegalLink href={GOOGLE_TERMS_OF_SERVICE}>Terms of Service</LegalLink>{' '}
		apply.
	</span>
);
