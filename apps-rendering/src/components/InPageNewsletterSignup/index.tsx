// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import {
	background,
	border,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import EmailSignupForm from '../EmailSignupForm';
import { Newsletter } from '@guardian/apps-rendering-api-models/newsletter';
import { SvgSpinner } from '@guardian/source-react-components';
import PrivacyWording from 'components/NewsletterSignup/PrivacyWording';
import { remSpace } from '@guardian/source-foundations';

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
	newsletter: Newsletter;
	defaultTo?: 'form' | 'fallback' | undefined;
	fallbackContent: JSX.Element;
	loadingContent: JSX.Element;
}

const containerStyles = (
	format: ArticleFormat,
	defaultTo: 'form' | 'fallback' | undefined,
): SerializedStyles => css`
	${darkModeCss`
		background-color: ${background.newsletterSignUpFormDark(format)};
		border-color: ${border.newsletterSignUpFormDark(format)};
		color: ${text.newsletterSignUpFormDark(format)};
	`}

	margin-bottom: ${remSpace[4]};
	display: ${defaultTo === 'form' ? 'block' : 'none'};
`;

// TO DO - update initSignupForms function to display fallback content
// if the Bridget version is not compatible with the sign-up forms
const fallbackContainerStyles = (
	format: ArticleFormat,
	defaultTo: 'form' | 'fallback' | undefined,
): SerializedStyles => css`
	display: ${defaultTo === 'fallback' ? 'block' : 'none'};
`;

// TO DO - update initSignupForms function to hide loading content
// when showing displaying the fallback content or the form
const loadingContainerStyles = (
	format: ArticleFormat,
	defaultTo: 'form' | 'fallback' | undefined,
): SerializedStyles => css`
	display: ${defaultTo === undefined ? 'block' : 'none'};
`;

const InPageNewsletterSignup: FC<Props> = ({
	format,
	newsletter,
	defaultTo,
	fallbackContent,
	loadingContent,
}) => {
	const { identityName, successDescription } = newsletter;
	return (
		<>
			<section
				css={containerStyles(format, defaultTo)}
				className="js-signup-form-container"
			>
				<EmailSignupForm
					identityName={identityName}
					format={format}
					successDescription={successDescription}
				/>
				<PrivacyWording format={format} useCaptcha={false} />
			</section>

			<section
				css={fallbackContainerStyles(format, defaultTo)}
				className="js-signup-form-fallback-container"
			>
				{fallbackContent}
			</section>

			<aside
				css={loadingContainerStyles(format, defaultTo)}
				className="js-signup-form-loading-content"
			>
				{loadingContent}
			</aside>
		</>
	);
};

// ----- Exports ----- //

export default InPageNewsletterSignup;
