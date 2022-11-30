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
	 * Whether to initialy render the form or the fallback content.
	 * If not set, the "waitingContent" is rendered.
	 *
	 * If the fallback content is initially rendered, it will not be
	 * replaced with the form if the client app supports the sign-up
	 * feature.
	 */
	initiallyRender?: 'form' | 'fallback' | undefined;
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

const containerStyles = (
	format: ArticleFormat,
	initiallyRender: 'form' | 'fallback' | undefined,
): SerializedStyles => css`
	${darkModeCss`
		background-color: ${background.newsletterSignUpFormDark(format)};
		border-color: ${border.newsletterSignUpFormDark(format)};
		color: ${text.newsletterSignUpFormDark(format)};
	`}

	margin-bottom: ${remSpace[4]};
	display: ${initiallyRender === 'form' ? 'block' : 'none'};
`;

const fallbackContainerStyles = (
	initiallyRender: 'form' | 'fallback' | undefined,
): SerializedStyles => css`
	display: ${initiallyRender === 'fallback' ? 'block' : 'none'};
`;

const loadingContainerStyles = (
	initiallyRender: 'form' | 'fallback' | undefined,
): SerializedStyles => css`
	display: ${initiallyRender === undefined ? 'block' : 'none'};
`;

const InPageNewsletterSignup: FC<Props> = ({
	format,
	newsletter,
	initiallyRender,
	waitingContent: loadingContent,
	fallbackContent,
}) => {
	const { identityName, successDescription } = newsletter;
	return (
		<>
			{initiallyRender !== 'fallback' && (
				<section
					css={containerStyles(format, initiallyRender)}
					className="js-signup-form-container"
				>
					<EmailSignupForm
						identityName={identityName}
						format={format}
						successDescription={successDescription}
					/>
					<PrivacyWording format={format} useCaptcha={false} />
				</section>
			)}

			{initiallyRender !== 'form' && (
				<section
					css={fallbackContainerStyles(initiallyRender)}
					// if initially rendering the fallback content,
					// do not switch to the form
					className={
						initiallyRender === 'fallback'
							? undefined
							: 'js-signup-form-fallback-container'
					}
				>
					{fallbackContent ? (
						fallbackContent
					) : (
						<NotSupportedMessage />
					)}
				</section>
			)}

			{!!loadingContent && initiallyRender === undefined && (
				<aside
					css={loadingContainerStyles(initiallyRender)}
					className="js-signup-form-loading-content"
				>
					{loadingContent}
				</aside>
			)}
		</>
	);
};

// ----- Exports ----- //

export default InPageNewsletterSignup;
