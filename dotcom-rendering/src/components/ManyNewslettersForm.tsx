import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	palette,
	space,
} from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import {
	type ChangeEventHandler,
	type ReactEventHandler,
	useState,
} from 'react';
import type ReactGoogleRecaptcha from 'react-google-recaptcha';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { ManyNewslettersFormFields } from './ManyNewslettersFormFields';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';

export interface FormProps {
	status: 'NotSent' | 'Loading' | 'Success' | 'Failed' | 'InvalidEmail';
	email: string;
	handleTextInput: ChangeEventHandler<HTMLInputElement>;
	handleSubmitButton: { (): Promise<void> | void };
	newsletterCount: number;
	marketingOptIn?: boolean;
	setMarketingOptIn: (value: boolean) => void;
	// Captcha props
	useReCaptcha?: boolean;
	captchaSiteKey?: string;
	visibleRecaptcha?: boolean;
	reCaptchaRef?: React.RefObject<ReactGoogleRecaptcha>;
	handleCaptchaError?: ReactEventHandler<HTMLDivElement>;
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
		align-items: last baseline;
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
	${headlineBold24};

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
	marketingOptIn,
	setMarketingOptIn,
	useReCaptcha = false,
	captchaSiteKey,
	visibleRecaptcha = false,
	reCaptchaRef,
	handleCaptchaError,
}: FormProps) => {
	const [formHasFocus, setFormHasFocus] = useState(false);
	const hidePrivacyOnMobile = !formHasFocus && email.length === 0;

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
						<ManyNewslettersFormFields
							status={status}
							email={email}
							handleTextInput={handleTextInput}
							marketingOptIn={marketingOptIn}
							setMarketingOptIn={setMarketingOptIn}
							useReCaptcha={useReCaptcha}
							captchaSiteKey={captchaSiteKey}
							visibleRecaptcha={visibleRecaptcha}
							reCaptchaRef={reCaptchaRef}
							handleCaptchaError={handleCaptchaError}
						/>
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
						Please check your email to confirm your subscription
					</p>
				)}
			</div>
		</form>
	);
};
