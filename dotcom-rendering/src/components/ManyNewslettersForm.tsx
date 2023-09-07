import { css } from '@emotion/react';
import {
	from,
	headlineObjectStyles,
	palette,
	space,
} from '@guardian/source-foundations';
import { Button, TextInput } from '@guardian/source-react-components';
import { type ChangeEventHandler, useState } from 'react';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';

interface FormProps {
	status: 'NotSent' | 'Loading' | 'Success' | 'Failed' | 'InvalidEmail';
	email: string;
	handleTextInput: ChangeEventHandler<HTMLInputElement>;
	handleSubmitButton: { (): Promise<void> | void };
	newsletterCount: number;
}

// The design brief requires the layout of the form to align with the
// CarouselForNewsletters placed above it on desktop.
const CARD_CONTAINER_WIDTH = 240;
const CARD_CONTAINER_PADDING = 10;

const formFrameStyle = css`
	border: ${palette.brand[400]} 2px dashed;
	border-radius: 12px;
	padding: ${space[2]}px;

	display: flex;
	flex-direction: column-reverse;

	${from.desktop} {
		flex-basis: ${4 * CARD_CONTAINER_WIDTH - CARD_CONTAINER_PADDING}px;
		flex-direction: row-reverse;
		align-items: flex-start;
		justify-content: space-between;
	}
`;

const formFieldsStyle = css`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	padding-bottom: ${space[1]}px;

	${from.desktop} {
		flex-basis: ${2 * CARD_CONTAINER_WIDTH - CARD_CONTAINER_PADDING * 2}px;
		flex-direction: row;
		flex-shrink: 0;
		align-items: flex-end;
	}
`;

const inputWrapperStyle = css`
	margin-bottom: ${space[2]}px;
	${from.desktop} {
		margin-bottom: 0;
		margin-right: ${space[2]}px;
		flex-basis: 296px;
	}
`;

const formAsideStyle = (hideOnMobile: boolean) => css`
	overflow: hidden;
	transition: max-height 1.5s linear;
	max-height: 300px;

	${hideOnMobile &&
	css`
		max-height: 0;
	`}

	${from.desktop} {
		flex: 1;
		padding-left: ${CARD_CONTAINER_PADDING}px;
		max-height: unset;
		transition: none;
	}
`;

const signUpButtonStyle = css`
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

const successMessageStyle = css`
	${headlineObjectStyles.xsmall({
		lineHeight: 'tight',
		fontWeight: 'bold',
	})}

	padding-bottom: ${space[12]}px;
	max-width: 340px;

	${from.desktop} {
		padding-bottom: 0;
		max-width: unset;
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
	const [formHasFocus, setFormHasFocus] = useState(false);
	const hidePrivacyOnMobile = !formHasFocus && email.length === 0;

	const ariaLabel =
		newsletterCount === 1
			? 'Sign up for the newsletter you selected'
			: `Sign up for the ${newsletterCount} newsletters you selected`;

	const errorMessage =
		status === 'Failed'
			? 'Sign up failed. Please try again'
			: status === 'InvalidEmail'
			? 'Please enter a valid email address'
			: undefined;

	return (
		<form
			aria-label="sign-up confirmation form"
			aria-live="polite"
			css={formFrameStyle}
			onSubmit={(submitEvent) => {
				submitEvent.preventDefault();
			}}
			onFocus={() => {
				setFormHasFocus(true);
			}}
			onBlur={() => {
				setFormHasFocus(false);
			}}
		>
			<aside css={formAsideStyle(hidePrivacyOnMobile)}>
				<InlineSkipToWrapper
					id={'man-newsletter-form-inline-skip-to-wrapper'}
					blockDescription="Privacy Notice"
				>
					<NewsletterPrivacyMessage textColor="regular" />
				</InlineSkipToWrapper>
			</aside>

			<div css={formFieldsStyle}>
				{status !== 'Success' ? (
					<>
						<span css={inputWrapperStyle}>
							<TextInput
								label="Enter your email"
								value={email}
								onChange={handleTextInput}
								error={errorMessage}
								disabled={status === 'Loading'}
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
					</>
				) : (
					<p css={successMessageStyle}>
						You are now a subscriber! Thank you for signing up
					</p>
				)}
			</div>
		</form>
	);
};
