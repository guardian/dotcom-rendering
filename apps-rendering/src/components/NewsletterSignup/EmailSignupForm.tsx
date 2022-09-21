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
	TextInput,
} from '@guardian/source-react-components';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import { useState } from 'react';
import { fakeRequestToEmailSignupService } from 'client/requestEmailSignUp';

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
	newsletterId,
	successDescription,
	format,
}) => {
	const [state, setState] = useState<
		'open' | 'waiting' | 'success' | 'error'
	>('open');
	const [email, setEmail] = useState<string>('');

	const handleSubmit = (): void => {
		setState(() => 'waiting');
		fakeRequestToEmailSignupService(email, newsletterId).then((r) => {
			if (r.status === 500) {
				setState(() => 'error');
			} else {
				setState(() => 'success');
			}
		});
	};

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
				className={''}
				data-newsletter-id={newsletterId}
				css={formStyle}
			>
				{(state === 'open' || state === 'waiting') && (
					<div
						className={''}
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
							value={email}
							onChange={(ev) => setEmail(() => ev.target.value)}
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
							onClick={() => handleSubmit()}
							size="small"
							title="Sign up"
							type="button"
							priority="primary"
							isLoading={state === 'waiting'}
							cssOverrides={buttonStyle(format)}
						>
							Sign up
						</Button>
					</div>
				)}

				{state === 'success' && (
					<div className="">
						<InlineSuccess>
							<span>
								<b>Subscription Confirmed. </b>
								<span>{successDescription}</span>
							</span>
						</InlineSuccess>
					</div>
				)}
				{state === 'error' && (
					<div
						className=""
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
							size="small"
							icon={<SvgReload />}
							iconSide={'right'}
							title="Try signing up again"
							type="reset"
							onClick={() => setState(() => 'open')}
							cssOverrides={buttonStyle(format)}
						>
							Try again
						</Button>
					</div>
				)}
			</form>
		</>
	);
};

// ----- Exports ----- //

export default EmailSignupForm;
