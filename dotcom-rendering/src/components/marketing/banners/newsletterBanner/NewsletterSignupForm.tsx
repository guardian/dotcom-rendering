import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import { Button, TextInput } from '@guardian/source/react-components';
import { ToggleSwitch } from '@guardian/source-development-kitchen/react-components';
// Note - the package also exports a component as a named export "ReCAPTCHA",
// that version will compile and render but is non-functional.
// Use the default export instead.
import { type ChangeEvent, useEffect, useState } from 'react';
import ReactGoogleRecaptcha from 'react-google-recaptcha';
import { useHideMarketingToggleForCountry } from '../../../../lib/useHideMarketingToggleForCountry';
import { useNewsletterSignupForm } from '../../../../lib/useNewsletterSignupForm';
import { useConfig } from '../../../ConfigContext';
import { NewsletterPrivacyMessage } from '../../../NewsletterPrivacyMessage';
import type { NewsletterSignupFormProps } from '../../../NewsletterSignupForm.island';
import {
	emailFieldStyles as baseEmailFieldStyles,
	formStyles,
	getToggleContainerStyles,
	marketingToggleBoxStyles,
	primaryButtonTheme,
	recaptchaContainerStyles,
	signedInLayoutStyles,
	signedOutLayoutStyles,
	submitButtonContainerStyles,
	submitButtonStyles,
} from '../../../NewsletterSignupForm.island';
import { contentTransitionEasing } from '../../shared/transitions';
import { FailureMessage } from './ErrorMessage';

const newsletterFormTransition = `0.2s ${contentTransitionEasing}`;

const collapsedFormStyles = css`
	row-gap: 0;
`;

const bannerSignedInLayoutStyles = css`
	${signedInLayoutStyles};
	margin-top: ${space[2]}px;
	row-gap: ${space[4]}px;
`;

const signedInButtonStyles = css`
	max-width: 100%;
	${from.tablet} {
		width: 240px;
	}
`;

const emailFieldStyles = css`
	${baseEmailFieldStyles};

	label div {
		font-size: 14px;
	}

	[role='alert'] {
		min-height: 24px;
		line-height: 24px;
		margin-bottom: 6px;

		svg {
			width: 24px;
			height: 24px;
			transform: none;
		}
	}
`;

const additionalFieldsStyles = (isExpanded: boolean) => css`
	display: grid;
	grid-column: 1 / -1;
	grid-template-rows: ${isExpanded ? '1fr' : '0fr'};
	margin-top: -${space[2]}px;
	transition: ${newsletterFormTransition};
	transition-property: grid-template-rows;

	> div {
		min-height: 0;
		overflow: hidden;
	}

	${until.tablet} {
		margin-top: -${space[3]}px;
	}

	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}
`;

const additionalFieldsContentStyles = css`
	padding-top: ${space[2]}px;
	padding-bottom: 28px;

	${until.tablet} {
		padding-top: ${space[3]}px;
	}
`;

const toggleContainerStyles = getToggleContainerStyles(true);

const getPrivacyContainerStyles = (isSignedIn: boolean | 'Pending') => css`
	margin-top: ${space[2]}px;
	${until.tablet} {
		margin-top: ${space[3]}px;
	}
	grid-column: 1 / -1;
	${isSignedIn === true &&
	css`
		margin-top: 0;
	`};
`;

/**
 * # Newsletter Signup Form
 *
 * Renders a newsletter signup form with email input, optional marketing opt-in
 * toggle, privacy message, reCAPTCHA, and success/failure feedback states.
 * All logic lives in {@link useNewsletterSignupForm}.
 */

export const NewsletterSignupForm = ({
	newsletterId,
	componentId,
	abTest,
	isModal = false,
	onSuccess,
}: Omit<NewsletterSignupFormProps, 'isAlreadySubscribed'> & {
	onSuccess?: () => void;
}) => {
	const { renderingTarget } = useConfig();
	const hideMarketingToggle = useHideMarketingToggleForCountry();
	// Temporary local stub for manual testing; disable before shipping.
	const [stubSignup] = useState(true);
	const [stubSuccess, setStubSuccess] = useState(false);

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
		componentId,
		abTest,
		hideMarketingToggle,
	);

	const hasResponse = typeof responseOk === 'boolean';
	const hasNonValidationError =
		errorMessage !== undefined && errorMessage !== '' && !isValidationError;
	const isSuccess = stubSuccess || (hasResponse && !!responseOk);
	const showForm = (!hasResponse || isSuccess) && !hasNonValidationError;

	useEffect(() => {
		if (isSuccess) onSuccess?.();
	}, [isSuccess, onSuccess]);

	// Show the failure box for server errors (responseOk === false) and for
	// reCAPTCHA / network errors that occur before a response is received.
	const showFailure = (hasResponse && !responseOk) || hasNonValidationError;
	const failureMessage = hasNonValidationError
		? errorMessage
		: 'Sign up failed.';
	const showAdditionalFields =
		isModal || isInteracted || (userEmail ?? '') !== '';
	// isValidationError comes from the hook — true only for inline field
	// errors (empty / bad format), false for reCAPTCHA / network errors.

	return (
		<>
			<form
				onSubmit={
					stubSignup
						? (event) => {
								event.preventDefault();
								setStubSuccess(true);
							}
						: handleSubmit
				}
				id={`newsletter-signup-${newsletterId}`}
				style={{
					display: !showForm ? 'none' : undefined,
				}}
				css={[
					formStyles,
					isSignedIn
						? bannerSignedInLayoutStyles
						: signedOutLayoutStyles,
					!showAdditionalFields && collapsedFormStyles,
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
				<div css={submitButtonContainerStyles}>
					<Button
						cssOverrides={
							isSignedIn
								? [submitButtonStyles, signedInButtonStyles]
								: submitButtonStyles
						}
						onClick={
							stubSignup ? undefined : handleSubmitButtonClick
						}
						type="submit"
						theme={primaryButtonTheme}
						isLoading={isWaitingForResponse}
						loadingAnnouncement="Signing you up…"
						disabled={isWaitingForResponse}
					>
						Sign up
					</Button>
				</div>
				<div
					aria-hidden={!showAdditionalFields}
					css={additionalFieldsStyles(showAdditionalFields)}
				>
					<div>
						<div css={additionalFieldsContentStyles}>
							<div
								css={toggleContainerStyles}
								style={{
									display: showMarketingToggle
										? undefined
										: 'none',
								}}
							>
								<div css={marketingToggleBoxStyles}>
									<ToggleSwitch
										id={`marketing-opt-in-${newsletterId}`}
										checked={marketingOptIn ?? false}
										onClick={handleMarketingToggle}
										label="Get updates about our journalism and ways to support and enjoy our work. Toggle to opt out."
										labelPosition="left"
									/>
								</div>
							</div>
							<div css={getPrivacyContainerStyles(isSignedIn)}>
								<NewsletterPrivacyMessage
									isSignedIn={isSignedIn}
								/>
							</div>
						</div>
					</div>
				</div>
			</form>

			{showFailure && (
				<FailureMessage text={failureMessage} onRetry={handleReset} />
			)}
			{!stubSignup &&
				captchaSiteKey !== undefined &&
				captchaSiteKey !== '' && (
					<div css={recaptchaContainerStyles}>
						<ReactGoogleRecaptcha
							sitekey={captchaSiteKey}
							ref={recaptchaRef}
							onChange={handleCaptchaComplete}
							onErrored={handleCaptchaLoadError}
							size="invisible"
						/>
					</div>
				)}
		</>
	);
};
