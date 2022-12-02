// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { Newsletter } from '@guardian/apps-rendering-api-models/newsletter';
import {
	background,
	border,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace } from '@guardian/source-foundations';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import EmailSignupForm from '../EmailSignupForm';
import PrivacyWording from '../NewsletterSignup/PrivacyWording';
import NotSupportedMessage from './NotSupportedMessage';

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
	newsletter: Newsletter;
	/**
	 * Content to render if the cliet app does not support the sign-up feature.
	 * If not set, a default inline error is rendered.
	 */
	fallbackContent?: JSX.Element;
	/**
	 * Content to render while the article script is checking the bridget version.
	 * If not set, nothing is rendered while waiting for the version check.
	 */
	waitingContent?: JSX.Element;
}

const containerStyles = (format: ArticleFormat): SerializedStyles => css`
	${darkModeCss`
		background-color: ${background.newsletterSignUpFormDark(format)};
		border-color: ${border.newsletterSignUpFormDark(format)};
		color: ${text.newsletterSignUpFormDark(format)};
	`}
	margin-bottom: ${remSpace[4]};
`;

const initiallyHidden = css`
	display: none;
`;

const InPageNewsletterSignup: FC<Props> = ({
	format,
	newsletter,
	waitingContent: loadingContent,
	fallbackContent,
}) => {
	const { identityName, successDescription } = newsletter;
	return (
		<>
			<section
				css={[containerStyles(format), initiallyHidden]}
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
				css={initiallyHidden}
				className="js-signup-form-fallback-container"
			>
				{fallbackContent ? fallbackContent : <NotSupportedMessage />}
			</section>

			{!!loadingContent && (
				<aside className="js-signup-form-loading-content">
					{loadingContent}
				</aside>
			)}
		</>
	);
};

// ----- Exports ----- //

export default InPageNewsletterSignup;
