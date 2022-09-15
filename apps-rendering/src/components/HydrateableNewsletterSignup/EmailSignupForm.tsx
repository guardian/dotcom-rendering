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
import { FC, useState } from 'react';
import { darkModeCss } from 'styles';

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
	const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (
		event,
	): void => {
		event.preventDefault();
		setFormCondition('failure');
		console.log({ newsletterId });
	};
	const handleReset: React.MouseEventHandler<HTMLButtonElement> = (
		event,
	): void => {
		event.preventDefault();
		setFormCondition('initial');
		console.log({ newsletterId });
	};

	const [formCondition, setFormCondition] = useState<
		'initial' | 'waiting' | 'success' | 'failure'
	>('initial');

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
			<form data-newsletter-id={newsletterId} css={formStyle}>
				{(formCondition === 'initial' ||
					formCondition === 'waiting') && (
					<div
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
							onClick={handleSubmit}
							size="small"
							title="Sign up"
							type="submit"
							cssOverrides={buttonStyle(format)}
							isLoading={formCondition === 'waiting'}
						>
							Sign up
						</Button>
					</div>
				)}

				{formCondition === 'success' && (
					<InlineSuccess>
						<span>
							<b>Subscription Confirmed. </b>
							<span>{successDescription}</span>
						</span>
					</InlineSuccess>
				)}

				{formCondition === 'failure' && (
					<div
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
				)}
			</form>
		</>
	);
};

// ----- Exports ----- //

export default EmailSignupForm;
