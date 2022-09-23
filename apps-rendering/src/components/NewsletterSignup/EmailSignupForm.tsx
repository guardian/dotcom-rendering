// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import {
	background,
	fill,
	hover,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
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
} from '@guardian/source-react-components';
import { FC, useState } from 'react';
import { darkModeCss } from 'styles';
import { fakeRequestToEmailSignupService } from 'client/requestEmailSignUp';

// ----- Constants ----- //

const VISUALLY_HIDDEN_CSS_CLASS = 'js-EmailSignupForm__hide';

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
	newsletterId: string;
	successDescription: string;
}

const formStyle = css`
	min-height: 2.75rem;
`;

const buttonStyle = (format: ArticleFormat): SerializedStyles => css`
	background-color: ${fill.newsletterSignUpFormButton(format)};
	color: ${text.newsletterSignUpFormButton(format)};
	margin-bottom: ${remSpace[2]};
	flex-basis: ${pxToRem(118)}rem;
	justify-content: center;
	align-items: center;

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

// Instead of conditionally rendering content based on state, this component
// renders all the content in advance and the VISUALLY_HIDDEN_CSS_CLASS
// to hide the content based on state.

// Why?
// Rendering or changing Source Components client-side involves Emotion
// dynamically generating new stylesheets needed to render those components
// with the specific combination of props and css-overrides used.

// The Content Security policy (CSP) blocks any stylesheet or scripts not
// signed as safe in the server-side-rendering stage, so any Source Component
// created or modified client side will be unstyled.

// By "pre-rendering" all the content that could be required, the component
// can be hydrated for client-side interactions without Emotion generating
// any new stylesheets.

const stateControlCss = css`
	.${VISUALLY_HIDDEN_CSS_CLASS} {
		display: none !important;
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
	const [inputValue, setInputValue] = useState('');
	const [isWaiting, setIsWaiting] = useState(false);
	const [responseType, setResponseType] = useState<
		undefined | 'success' | 'failure'
	>(undefined);

	const sendRequest = async (emailAddress: string, newsletterId: string) => {
		const response = await fakeRequestToEmailSignupService(
			emailAddress,
			newsletterId,
		);
		setIsWaiting(false);
		if (response.status === 200) {
			setResponseType('success');
		} else {
			setResponseType('failure');
		}
	};

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
		event,
	): void => {
		event.preventDefault();
		setIsWaiting(true);
		sendRequest(inputValue, newsletterId);
	};
	const handleReset: React.MouseEventHandler<HTMLButtonElement> = (
		event,
	): void => {
		event.preventDefault();
		setResponseType(undefined);
	};
	const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
		event,
	) => {
		event.preventDefault();
		setInputValue(event.target.value);
	};

	return (
		<div css={stateControlCss}>
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
				data-newsletter-id={newsletterId}
				css={formStyle}
				onSubmit={handleSubmit}
			>
				<div
					className={
						responseType === undefined
							? undefined
							: VISUALLY_HIDDEN_CSS_CLASS
					}
					css={css`
						display: flex;
						align-items: center;
						flex-wrap: wrap;
					`}
				>
					<TextInput
						type="email"
						width={30}
						hideLabel
						value={inputValue}
						onChange={handleInputChange}
						label="Enter your email address"
						cssOverrides={css`
							height: 2.25rem;
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
						<span
							className={isWaiting ? undefined : VISUALLY_HIDDEN_CSS_CLASS}
							css={css`
								display: inline-flex;
							`}
						>
							<SvgSpinner size="xsmall" />
						</span>
					</Button>
				</div>

				<div
					className={
						responseType === 'success'
							? undefined
							: VISUALLY_HIDDEN_CSS_CLASS
					}
				>
					<InlineSuccess>
						<span>
							<b>Subscription Confirmed. </b>
							<span>{successDescription}</span>
						</span>
					</InlineSuccess>
				</div>

				<div
					className={
						responseType === 'failure'
							? undefined
							: VISUALLY_HIDDEN_CSS_CLASS
					}
					css={css`
						align-items: center;
						justify-content: flex-start;
						${until.tablet} {
							flex-wrap: wrap;
						}
					`}
				>
					<InlineError
						cssOverrides={css`
							margin-right: ${remSpace[3]};
						`}
					>
						<span>
							Sign up failed. Please try again or contact{' '}
							<Link
								href="mailto:customer.help@theguardian.com"
								target="_blank"
							>
								customer.help@theguardian.com
							</Link>
						</span>
					</InlineError>
					<Button
						onClick={handleReset}
						size="small"
						icon={<SvgReload />}
						iconSide={'right'}
						title="Try signing up again"
						type="reset"
						cssOverrides={buttonStyle(format)}
					>
						Try again
					</Button>
				</div>
			</form>
		</div>
	);
};

// ----- Exports ----- //

export default EmailSignupForm;
