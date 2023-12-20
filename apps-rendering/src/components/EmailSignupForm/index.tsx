// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	neutral,
	pxToRem,
	remSpace,
	textSans,
	until,
} from '@guardian/source-foundations';
import {
	Button,
	InlineError,
	InlineSuccess,
	Label,
	Link,
	SvgReload,
	SvgSpinner,
	TextInput,
	userFeedbackThemeDefault,
} from '@guardian/source-react-components';
import { background, fill, hover, text } from 'palette';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
	identityName: string;
	successDescription: string;
}

const formStyle = css`
	min-height: 2.75rem;

	.js-signup-form__inputs {
		display: flex;
	}

	.js-signup-form__feedback {
		display: none;
	}

	&.js-signup-form--waiting {
		.js-signup-form__feedback--waiting {
			display: inline-flex;
		}
	}

	&.js-signup-form--success {
		.js-signup-form__inputs {
			display: none;
		}
		.js-signup-form__feedback--success {
			display: flex;
			color: ${userFeedbackThemeDefault.userFeedback.textSuccess};
		}
	}

	&.js-signup-form--failure {
		.js-signup-form__inputs {
			display: none;
		}
		.js-signup-form__feedback--failure {
			display: flex;
			color: ${userFeedbackThemeDefault.userFeedback.textError};
		}
	}
`;

const buttonStyle = (format: ArticleFormat): SerializedStyles => css`
	background-color: ${fill.newsletterSignUpFormButton(format)};
	color: ${text.newsletterSignUpFormButton(format)};
	margin-bottom: ${remSpace[2]};
	flex-basis: ${pxToRem(118)}rem;
	justify-content: center;

	:disabled {
		background-color: ${neutral[46]};
	}
	&:hover {
		background-color: ${hover.newsletterSignUpFormButton(format)};
	}

	${darkModeCss`
		background-color: ${fill.newsletterSignUpFormButtonDark(format)};
		color: ${text.newsletterSignUpFormButtonDark(format)};
		&:hover {
			background-color: ${hover.newsletterSignUpFormButtonDark(format)}
		}
`}
`;

/**
 * NOTE: this component is non functional and is for demonstration only.
 * The UI for the NewsletterSignup might not use an HTML form for apps
 * when implemented
 */
const EmailSignupForm: FC<Props> = ({
	identityName,
	successDescription,
	format,
}) => {
	return (
		<>
			<Label
				text="Enter your email address"
				cssOverrides={css`
					div {
						${textSans.xsmall({ fontWeight: 'bold' })};

						${darkModeCss`
							color: ${text.newsletterSignUpFormDark(format)};
						`}
					}
				`}
			/>
			<form
				className={'js-signup-form'}
				data-newsletter-id={identityName}
				css={formStyle}
			>
				<div
					className={'js-signup-form__inputs'}
					css={css`
						align-items: center;
						flex-wrap: wrap;
					`}
				>
					<TextInput
						type="email"
						width={30}
						hideLabel
						id={`email-signup-${identityName}`}
						label="Enter your email address"
						cssOverrides={css`
							height: ${remSpace[9]};
							margin-right: ${remSpace[3]};
							margin-top: 0;
							margin-bottom: ${remSpace[2]};
							flex-basis: ${pxToRem(335)}rem;

							${darkModeCss`
							background-color: ${background.newsletterSignUpFormDark(format)};
							color: ${text.newsletterSignUpFormDark(format)};
						`}
						`}
					/>
					<Button
						size="small"
						title="Sign up"
						type="submit"
						cssOverrides={buttonStyle(format)}
					>
						Sign up
						<span className="js-signup-form__feedback js-signup-form__feedback--waiting">
							<SvgSpinner size="small" />
						</span>
					</Button>
				</div>
				<div className="js-signup-form__feedback js-signup-form__feedback--success">
					<InlineSuccess>
						<span>
							<b>Subscription Confirmed. </b>
							<span>{successDescription}</span>
						</span>
					</InlineSuccess>
				</div>
				<div
					className="js-signup-form__feedback js-signup-form__feedback--failure"
					css={css`
						align-items: center;
						justify-content: flex-start;
						margin-bottom: ${remSpace[2]};
						${until.phablet} {
							flex-wrap: wrap;
							margin-bottom: 0;
						}
					`}
				>
					<InlineError
						cssOverrides={css`
							margin-right: ${remSpace[3]};
							${until.phablet} {
								margin-bottom: ${remSpace[4]};
								margin-right: 0;
							}
						`}
					>
						<span>
							Sign up failed. Please try again or contact{' '}
							<Link
								href="mailto:customer.help@theguardian.com"
								target="_blank"
								rel="noreferrer"
							>
								customer.help@theguardian.com
							</Link>
						</span>
					</InlineError>
					<Button
						size="small"
						icon={<SvgReload />}
						iconSide={'right'}
						title="Try signing up again"
						type="reset"
						cssOverrides={[
							buttonStyle(format),
							css`
								margin-left: auto;
							`,
						]}
					>
						Try again
					</Button>
				</div>
			</form>
		</>
	);
};

// ----- Exports ----- //

export default EmailSignupForm;
