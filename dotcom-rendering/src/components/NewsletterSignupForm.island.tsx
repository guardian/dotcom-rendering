import { css } from '@emotion/react';
import type { AbTest } from '@guardian/ophan-tracker-js';
import { from, space, textSans15, until } from '@guardian/source/foundations';
import type { ThemeButton } from '@guardian/source/react-components';
import {
	Button,
	InlineError,
	InlineSuccess,
	Link,
	LinkButton,
	SvgReload,
	TextInput,
} from '@guardian/source/react-components';
import { ToggleSwitch } from '@guardian/source-development-kitchen/react-components';
// Note - the package also exports a component as a named export "ReCAPTCHA",
// that version will compile and render but is non-functional.
// Use the default export instead.
import type { ChangeEvent } from 'react';
import ReactGoogleRecaptcha from 'react-google-recaptcha';
import { useHideMarketingToggleForCountry } from '../lib/useHideMarketingToggleForCountry';
import { useNewsletterSignupForm } from '../lib/useNewsletterSignupForm';
import { palette } from '../palette';
import { useConfig } from './ConfigContext';
import {
	NewsletterPreviewButton,
	newsletterTertiaryButtonTheme,
} from './NewsletterPreviewButton';
import type { NewsletterPreviewAction } from './NewsletterPreviewButton';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';

type Props = {
	newsletterId: string;
	newsletterName: string;
	frequency: string;
	hidePrivacyMessage?: boolean;
	previewAction?: NewsletterPreviewAction;
	/** When `true`, the success message is shown immediately (user is already subscribed). */
	isAlreadySubscribed?: boolean;
	/** Ophan A/B test metadata — forwarded to tracking events. */
	abTest?: AbTest;
};

const formStyles = css`
	display: grid;
	column-gap: ${space[3]}px;
	row-gap: ${space[2]}px;
	align-items: end;

	${until.tablet} {
		row-gap: ${space[3]}px;
	}
`;

const signedOutLayoutStyles = css`
	grid-template-columns: minmax(0, 1fr) auto;
	grid-template-areas: 'email submit';

	${until.tablet} {
		grid-template-columns: 1fr;
		grid-template-areas:
			'email'
			'submit';
	}
`;

const signedInLayoutStyles = css`
	grid-template-columns: minmax(0, 1fr);
	grid-template-areas: 'submit';
	padding-bottom: ${space[2]}px;
`;

const emailFieldStyles = css`
	grid-area: email;
	min-width: 0;

	label div {
		color: ${palette('--newsletter-signup-input-text')};
	}

	input {
		color: ${palette('--newsletter-signup-input-text')};
		background-color: ${palette('--newsletter-signup-input-background')};
	}
`;

const submitButtonContainerStyles = css`
	grid-area: submit;
	width: 100%;
	display: flex;
	gap: ${space[2]}px;
	${from.tablet} {
		width: auto;
	}
`;

const submitButtonStyles = css`
	width: 100%;
	${from.tablet} {
		width: auto;
	}
`;

const toggleContainerStyles = css`
	grid-column: 1;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${space[3]}px;
	min-width: 0;
`;

const privacyContainerStyles = css`
	grid-column: 1 / -1;
`;

const successTextStyles = css`
	color: ${palette('--newsletter-card-description')};
	${textSans15};
	strong {
		font-weight: bold;
	}
`;

const marketingToggleBoxStyles = css`
	width: 100%;
	padding: ${space[2]}px;
	border: 1px solid ${palette('--card-border-supporting')};
	border-radius: 4px;
	label {
		color: ${palette('--newsletter-signup-toggle-text')};
	}
`;

const responseBoxStyles = css`
	width: 100%;
	padding: ${space[2]}px;
	border: 1px solid ${palette('--card-border-supporting')};
	border-radius: 4px;
	margin-top: ${space[2]}px;
`;

const errorContainerStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[2]}px;
`;

const tryAgainButtonStyles = css`
	width: 100%;
	margin-top: ${space[2]}px;
	${from.tablet} {
		max-width: 350px;
	}
`;

const recaptchaContainerStyles = css`
	.grecaptcha-badge {
		visibility: hidden;
	}
`;

/**
 * Colour overrides for primary buttons so that article-level themes
 * (e.g. Opinion red) don't bleed in. Uses CSS custom properties from
 * the palette so the colours work in both light and dark mode.
 */
const primaryButtonTheme: Partial<ThemeButton> = {
	backgroundPrimary: palette('--newsletter-signup-submit-background'),
	backgroundPrimaryHover: palette(
		'--newsletter-signup-submit-background-hover',
	),
	textPrimary: palette('--newsletter-signup-submit-text'),
};

const ErrorMessageWithAdvice = ({ text }: { text?: string }) => (
	<InlineError>
		<span>
			{text} Please try again or contact{' '}
			<Link
				href="mailto:customer.help@theguardian.com"
				target="_blank"
				rel="noreferrer"
			>
				customer.help@theguardian.com
			</Link>
		</span>
	</InlineError>
);

const SuccessMessage = ({
	newsletterName,
	frequency,
}: {
	newsletterName: string;
	frequency: string;
}) => {
	return (
		<div css={responseBoxStyles}>
			<InlineSuccess size="medium">
				<span css={successTextStyles}>
					<strong>You're signed up!</strong>
					&nbsp;
					<span>
						You will receive {newsletterName}{' '}
						{frequency.toLowerCase()}.
					</span>
				</span>
			</InlineSuccess>
			<LinkButton
				href="/email-newsletters?INTCMP=DOTCOM_NEWSLETTER_SIGNUP_CARD"
				priority="tertiary"
				theme={newsletterTertiaryButtonTheme}
				cssOverrides={tryAgainButtonStyles}
				data-ignore="global-link-styling"
			>
				Browse more newsletters
			</LinkButton>
		</div>
	);
};

const FailureMessage = ({
	onRetry,
	text,
}: {
	onRetry: React.MouseEventHandler<HTMLButtonElement>;
	text: string;
}) => (
	<div css={[responseBoxStyles, errorContainerStyles]}>
		<ErrorMessageWithAdvice text={text} />
		<Button
			size="small"
			priority="primary"
			icon={<SvgReload />}
			iconSide="right"
			onClick={onRetry}
			theme={primaryButtonTheme}
			cssOverrides={tryAgainButtonStyles}
		>
			Try again
		</Button>
	</div>
);

/**
 * # Newsletter Signup Form
 *
 * Renders a newsletter signup form with email input, optional marketing opt-in
 * toggle, privacy message, reCAPTCHA, and success/failure feedback states.
 * All logic lives in {@link useNewsletterSignupForm}.
 *
 * When the user is already subscribed, the success message is shown immediately
 * without invoking the form hook (no Identity fetch, reCAPTCHA, etc.).
 */
export const NewsletterSignupForm = ({
	isAlreadySubscribed,
	...rest
}: Props) => {
	if (isAlreadySubscribed) {
		return (
			<SuccessMessage
				newsletterName={rest.newsletterName}
				frequency={rest.frequency}
			/>
		);
	}
	return <NewsletterSignupFormActive {...rest} />;
};

const NewsletterSignupFormActive = ({
	newsletterId,
	newsletterName,
	frequency,
	hidePrivacyMessage = false,
	previewAction,
	abTest,
}: Omit<Props, 'isAlreadySubscribed'>) => {
	const { renderingTarget } = useConfig();
	const hideMarketingToggle = useHideMarketingToggleForCountry();

	const {
		userEmail,
		isSignedIn,
		isInteracted,
		showMarketingToggle,
		marketingOptIn,
		isWaitingForResponse,
		responseOk,
		errorMessage,
		isValidationError,
		recaptchaRef,
		captchaSiteKey,
		handleCaptchaComplete,
		handleCaptchaLoadError,
		handleEmailChange,
		handleEmailFocus,
		handleEmailInvalid,
		handleMarketingToggle,
		handleSubmit,
		handleSubmitButtonClick,
		handleReset,
	} = useNewsletterSignupForm(
		newsletterId,
		renderingTarget,
		abTest,
		hideMarketingToggle,
	);

	const hasResponse = typeof responseOk === 'boolean';
	const hasNonValidationError = !!errorMessage && !isValidationError;
	const showForm = !hasResponse && !hasNonValidationError;
	const showSuccess = hasResponse && !!responseOk;
	// Show the failure box for server errors (responseOk === false) and for
	// reCAPTCHA / network errors that occur before a response is received.
	const showFailure = (hasResponse && !responseOk) || hasNonValidationError;
	const failureMessage = hasNonValidationError
		? errorMessage
		: 'Sign up failed.';
	const showAdditionalFields = isInteracted || !!userEmail;
	// isValidationError comes from the hook — true only for inline field
	// errors (empty / bad format), false for reCAPTCHA / network errors.

	return (
		<>
			<form
				onSubmit={handleSubmit}
				id={`newsletter-signup-${newsletterId}`}
				style={{
					display: !showForm ? 'none' : undefined,
				}}
				css={[
					formStyles,
					isSignedIn ? signedInLayoutStyles : signedOutLayoutStyles,
				]}
			>
				{isSignedIn ? (
					<input type="hidden" name="email" value={userEmail ?? ''} />
				) : (
					<div css={emailFieldStyles}>
						<TextInput
							name="email"
							label="Enter your email"
							type="email"
							value={userEmail ?? ''}
							error={isValidationError ? errorMessage : undefined}
							onFocus={handleEmailFocus}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								handleEmailChange(e.target.value)
							}
							onInvalid={handleEmailInvalid}
						/>
					</div>
				)}
				{showAdditionalFields && (
					<>
						{showMarketingToggle && (
							<div css={toggleContainerStyles}>
								<div css={marketingToggleBoxStyles}>
									<ToggleSwitch
										id={`marketing-opt-in-${newsletterId}`}
										checked={marketingOptIn ?? false}
										onClick={handleMarketingToggle}
										label="Get updates about our journalism and ways to support and enjoy
								our work. Toggle to opt out."
										labelPosition="left"
									/>
								</div>
							</div>
						)}
						{!hidePrivacyMessage && (
							<div css={privacyContainerStyles}>
								<NewsletterPrivacyMessage />
							</div>
						)}
					</>
				)}
				<div css={submitButtonContainerStyles}>
					{isSignedIn && previewAction && (
						<NewsletterPreviewButton
							previewAction={previewAction}
						/>
					)}
					<Button
						cssOverrides={submitButtonStyles}
						onClick={handleSubmitButtonClick}
						type="submit"
						theme={primaryButtonTheme}
						isLoading={isWaitingForResponse}
						loadingAnnouncement="Signing you up…"
						disabled={isWaitingForResponse}
					>
						Sign up
					</Button>
				</div>
			</form>

			{showSuccess && (
				<SuccessMessage
					newsletterName={newsletterName}
					frequency={frequency}
				/>
			)}
			{showFailure && (
				<FailureMessage text={failureMessage} onRetry={handleReset} />
			)}
			{!!captchaSiteKey && (
				<div css={recaptchaContainerStyles}>
					<ReactGoogleRecaptcha
						sitekey={captchaSiteKey}
						ref={recaptchaRef}
						onChange={handleCaptchaComplete}
						onError={handleCaptchaLoadError}
						size="invisible"
					/>
				</div>
			)}
		</>
	);
};
