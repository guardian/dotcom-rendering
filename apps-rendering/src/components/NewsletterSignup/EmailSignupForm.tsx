// ----- Imports ----- //

import { css } from '@emotion/react';
import {
	neutral,
	pxToRem,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import {
	Button,
	InlineError,
	InlineSuccess,
	Label,
	SvgSpinner,
	TextInput,
	userFeedbackThemeDefault,
} from '@guardian/source-react-components';
import {
	background,
	fill,
	hover,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';

import type { FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
	newsletterId: string;
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
			display: block;
			color: ${userFeedbackThemeDefault.userFeedback.textSuccess};
		}
	}

	&.js-signup-form--failure {
		.js-signup-form__inputs {
			display: none;
		}
		.js-signup-form__feedback--failure {
			display: block;
			color: ${userFeedbackThemeDefault.userFeedback.textError};
		}
	}
`;

/**
 * NOTE: this component is non functional and is for demonstration only.
 * The UI for the NewsletterSignup might not use an HTML form for apps
 * when implemented
 */
const EmailSignupForm: FC<Props> = ({
	newsletterId,
	successDescription,
	format,
}) => {
	const handleSubmit = (): void => {
		console.log({ newsletterId });
	};

	return (
		<>
			<Label
				text="Enter your email address"
				cssOverrides={css`
					div {
						${textSans.xsmall({ fontWeight: 'bold' })};

						${darkModeCss`
							color: ${text.signUpFormDark(format)};
						`}
					}
				`}
			/>
			<form
				className={'js-signup-form'}
				data-newsletter-id={newsletterId}
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
						label="Enter your email address"
						cssOverrides={css`
							height: 2.25rem;
							margin-right: ${remSpace[3]};
							margin-top: 0;
							margin-bottom: ${remSpace[2]};
							flex-basis: ${pxToRem(335)}rem;

							${darkModeCss`
							background-color: ${background.signUpFormDark(format)};
							color: ${text.signUpFormDark(format)};
						`}
						`}
					/>
					<Button
						onClick={handleSubmit}
						size="small"
						title="Sign up"
						type="submit"
						cssOverrides={css`
							background-color: ${fill.signUpFormButton(format)};
							color: ${text.signUpFormButton(format)};
							margin-bottom: ${remSpace[2]};
							flex-basis: ${pxToRem(118)}rem;
							justify-content: center;

							:disabled {
								background-color: ${neutral[46]};
							}
							&:hover {
								background-color: ${hover.signUpFormButton(
									format,
								)};
							}

							${darkModeCss`
							background-color: ${fill.signUpFormButtonDark(format)};
							color: ${text.signUpFormButtonDark(format)};
							&:hover {
								background-color: ${hover.signUpFormButtonDark(format)}
							}
						`}
						`}
					>
						Sign up
						<span className="js-signup-form__feedback js-signup-form__feedback--waiting">
							<SvgSpinner size="small" />
						</span>
					</Button>
				</div>
				<div className="js-signup-form__feedback js-signup-form__feedback--success">
					<InlineSuccess>{successDescription}</InlineSuccess>
				</div>
				<div className="js-signup-form__feedback js-signup-form__feedback--failure">
					<InlineError>error - failed to sign up</InlineError>
				</div>
			</form>
		</>
	);
};

// ----- Exports ----- //

export default EmailSignupForm;
