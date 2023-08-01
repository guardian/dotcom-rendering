import { css } from '@emotion/react';
import {
	from,
	headlineObjectStyles,
	palette,
	space,
} from '@guardian/source-foundations';
import {
	Button,
	InlineError,
	TextInput,
} from '@guardian/source-react-components';
import type { ChangeEventHandler } from 'react';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';

interface FormProps {
	status: 'NotSent' | 'Loading' | 'Success' | 'Failed';
	email: string;
	handleTextInput: ChangeEventHandler<HTMLInputElement>;
	handleSubmitButton: { (): Promise<void> };
	newsletterCount: number;
}

export const formFrameStyle = css`
	border: ${palette.brand[400]} 2px dashed;
	border-radius: 12px;
	padding: ${space[2]}px;

	display: flex;
	flex-direction: column-reverse;

	${from.desktop} {
		flex-direction: row-reverse;
		align-items: center;
		justify-content: space-between;
	}
`;

export const formFieldsStyle = css`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	padding-bottom: ${space[1]}px;

	${from.desktop} {
		flex: 1;
		flex-direction: row;
		flex-shrink: 0;
		align-items: flex-end;
	}
`;

export const inputWrapperStyle = css`
	margin-bottom: ${space[2]}px;
	${from.desktop} {
		margin-bottom: 0;
		margin-right: ${space[2]}px;
		flex-basis: 280px;
	}
`;

export const formAsideStyle = css`
	${from.desktop} {
		flex-basis: 400px;
	}
`;

export const signUpButtonStyle = css`
	justify-content: center;
	background-color: ${palette.neutral[0]};
	border-color: ${palette.neutral[0]};

	${from.desktop} {
		flex-basis: 110px;
	}

	&:hover {
		background-color: ${palette.neutral[46]};
		border-color: ${palette.neutral[46]};
	}
`;

export const successMessageStyle = css`
	${headlineObjectStyles.xsmall({
		lineHeight: 'tight',
		fontWeight: 'bold',
	})}

	${from.desktop} {
		flex-basis: 340px;
	}
`;

export const ManyNewslettersForm = ({
	status,
	email,
	handleTextInput,
	handleSubmitButton,
	newsletterCount,
}: FormProps) => {
	const ariaLabel =
		newsletterCount === 1
			? 'Sign up for the newsletter you selected'
			: `Sign up for the ${newsletterCount} newsletters you selected`;

	return (
		<form
			aria-label="sign-up confirmation form"
			aria-live="polite"
			css={formFrameStyle}
			onSubmit={(submitEvent) => {
				submitEvent.preventDefault();
			}}
		>
			<aside css={formAsideStyle}>
				<InlineSkipToWrapper
					id={'man-newsletter-form-inline-skip-to-wrapper'}
					blockDescription="Privacy Notice"
				>
					<NewsletterPrivacyMessage textColor="regular" />
				</InlineSkipToWrapper>
			</aside>

			{(status === 'NotSent' || status === 'Loading') && (
				<div css={formFieldsStyle}>
					<span css={inputWrapperStyle}>
						<TextInput
							label="Enter your email"
							value={email}
							onChange={handleTextInput}
						/>
					</span>
					<Button
						aria-label={ariaLabel}
						isLoading={status === 'Loading'}
						iconSide="right"
						onClick={() => {
							void handleSubmitButton();
						}}
						cssOverrides={signUpButtonStyle}
					>
						Sign up
					</Button>
				</div>
			)}

			{status === 'Failed' && <InlineError>Sign up failed.</InlineError>}

			{status === 'Success' && (
				<p css={successMessageStyle}>
					You are now a subscriber! Thank you for signing up
				</p>
			)}
		</form>
	);
};
