import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	palette,
	space,
} from '@guardian/source/foundations';
import {
	Button,
	Checkbox,
	CheckboxGroup,
	TextInput,
} from '@guardian/source/react-components';
import {
	type ChangeEventHandler,
	type ReactEventHandler,
	useState,
} from 'react';
import ReactGoogleRecaptcha from 'react-google-recaptcha';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';

interface FormProps {
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

const inputWrapperStyle = css`
	margin-bottom: ${space[2]}px;
	${from.desktop} {
		margin-bottom: 0;
		margin-right: ${space[2]}px;
		flex-basis: 296px;
	}
`;

const inputAndOptInWrapperStyle = css`
	${from.desktop} {
		flex-basis: 296px;
		margin-right: ${space[2]}px;
	}
`;

const optInCheckboxTextSmall = css`
	label > div {
		font-size: 13px;
		line-height: 16px;
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
	const [firstInteractionOccurred, setFirstInteractionOccurred] =
		useState(false);
	const hidePrivacyOnMobile = !formHasFocus && email.length === 0;

	const isMarketingOptInVisible = marketingOptIn !== undefined;

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
						<div css={inputAndOptInWrapperStyle}>
							<span css={inputWrapperStyle}>
								<TextInput
									label="Enter your email"
									value={email}
									onChange={handleTextInput}
									error={errorMessage}
									disabled={status === 'Loading'}
									onFocus={() =>
										setFirstInteractionOccurred(true)
									}
								/>
							</span>
							{isMarketingOptInVisible && (
								<div>
									<CheckboxGroup
										name="marketing-preferences"
										label="Marketing preferences"
										hideLabel={true}
										cssOverrides={optInCheckboxTextSmall}
									>
										<Checkbox
											label="Receive information on our products and ways to support and enjoy our journalism. Untick to opt out."
											value="marketing-opt-in"
											checked={marketingOptIn}
											onChange={(e) =>
												setMarketingOptIn(
													e.target.checked,
												)
											}
											theme={{
												fillUnselected:
													palette.neutral[100],
												borderUnselected:
													palette.neutral[46],
												fillSelected:
													palette.brand[500],
												borderSelected:
													palette.brand[500],
												borderHover: palette.brand[500],
											}}
										/>
									</CheckboxGroup>
								</div>
							)}
							{useReCaptcha && !!captchaSiteKey && (
								<div
									css={css`
										.grecaptcha-badge {
											visibility: hidden;
										}
									`}
								>
									{(!visibleRecaptcha ||
										firstInteractionOccurred) && (
										<ReactGoogleRecaptcha
											sitekey={captchaSiteKey}
											ref={reCaptchaRef}
											onError={handleCaptchaError}
											size={
												visibleRecaptcha
													? 'normal'
													: 'invisible'
											}
										/>
									)}
								</div>
							)}
						</div>
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
