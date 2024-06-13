// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { textSans12, textSansBold12 } from '@guardian/source/foundations';
import { Link } from '@guardian/source/react-components';
import { text } from 'palette';

import { darkModeCss } from 'styles';

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
	useCaptcha: boolean;
}

const termsStyle = (format: ArticleFormat): SerializedStyles => css`
	${textSans12};
	/**
	 * Typography preset styles should not be overridden.
	 * This has been done because the styles do not directly map to the new presets.
	 * Please speak to your team's designer and update this to use a more appropriate preset.
	 */
	line-height: 1.15;
	color: ${text.privacyMessage(format)};
	a {
		${textSansBold12};
		color: ${text.newsletterSignUpForm(format)};
		text-decoration: underline;
		:hover {
			color: ${text.newsletterSignUpForm(format)};
			text-decoration: underline;
		}
	}
	strong {
		color: ${text.newsletterSignUpForm(format)};
		font-weight: bold;
	}

	${darkModeCss`
		color: ${text.privacyMessageDark(format)};

		a {
			color: ${text.newsletterSignUpFormDark(format)};
			:hover {
				color: ${text.newsletterSignUpFormDark(format)};
			}
		}
		strong {
			color: ${text.newsletterSignUpFormDark(format)};
		}
	`}
`;

const PrivacyWording = ({ useCaptcha, format }: Props) => {
	return (
		<p css={termsStyle(format)}>
			<strong>Privacy Notice: </strong>
			<span>
				Newsletters may contain info about charities, online ads, and
				content funded by outside parties. For more information see our{' '}
				<Link
					data-ignore="global-link-styling"
					href="https://www.theguardian.com/help/privacy-policy"
					rel="noopener noreferrer"
				>
					Privacy Policy
				</Link>
				.
			</span>{' '}
			{useCaptcha && (
				<span>
					We use Google reCAPTCHA to protect our website and the
					Google{' '}
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
			)}
		</p>
	);
};

// ----- Exports ----- //

export default PrivacyWording;
