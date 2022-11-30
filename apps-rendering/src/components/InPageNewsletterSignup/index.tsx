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
	/** Whether to initialy the form or the fallback content. */
	defaultTo?: 'form' | 'fallback' | undefined;
	/** Content to render if the cliet app does not support the sign-up feature.
	 * If not set, an inline error is rendered by default.
	 */
	fallbackContent?: JSX.Element;
	/** Content to render while the article script is checking the bridget version.
	 * If not set, nothing is rendered while waiting for the version check.
	 */
	waitingContent?: JSX.Element;
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

const fallbackContainerStyles = (
	defaultTo: 'form' | 'fallback' | undefined,
): SerializedStyles => css`
	display: ${defaultTo === 'fallback' ? 'block' : 'none'};
`;

const loadingContainerStyles = (
	defaultTo: 'form' | 'fallback' | undefined,
): SerializedStyles => css`
	display: ${defaultTo === undefined ? 'block' : 'none'};
`;

const InPageNewsletterSignup: FC<Props> = ({
	format,
	newsletter,
	defaultTo,
	waitingContent: loadingContent,
	fallbackContent,
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
				css={fallbackContainerStyles(defaultTo)}
				className="js-signup-form-fallback-container"
			>
				{!!fallbackContent ? fallbackContent : <NotSupportedMessage />}
			</section>

			{!!loadingContent && (
				<aside
					css={loadingContainerStyles(defaultTo)}
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
