import type { AbTest } from '@guardian/ophan-tracker-js';
import { Button, TextInput } from '@guardian/source/react-components';
import { ToggleSwitch } from '@guardian/source-development-kitchen/react-components';
import { type ChangeEvent, useEffect } from 'react';
import ReactGoogleRecaptcha from 'react-google-recaptcha';
import { useHideMarketingToggleForCountry } from '../../../../lib/useHideMarketingToggleForCountry';
import { useNewsletterSignupForm } from '../../../../lib/useNewsletterSignupForm';
import { useConfig } from '../../../ConfigContext';
import { NewsletterPrivacyMessage } from '../../../NewsletterPrivacyMessage';
import { FailureMessage } from './ErrorMessage';
import { styles } from './NewsletterSignupForm.styles';

type NewsletterSignupFormProps = {
	newsletterId: string;
	componentId: string;
	abTest?: AbTest;
	isModal?: boolean;
	onSuccess?: () => void;
};

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
}: NewsletterSignupFormProps) => {
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
		componentId,
		abTest,
		hideMarketingToggle,
	);

	const hasResponse = typeof responseOk === 'boolean';
	const hasNonValidationError =
		errorMessage !== undefined && errorMessage !== '' && !isValidationError;
	const isSuccess = hasResponse && !!responseOk;
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
				onSubmit={handleSubmit}
				id={`newsletter-signup-${newsletterId}`}
				style={{
					display: !showForm ? 'none' : undefined,
				}}
				css={[
					styles.form,
					isSignedIn
						? styles.bannerSignedInLayout
						: styles.bannerSignedOutLayout,
					!showAdditionalFields && styles.collapsedForm,
				]}
			>
				{isSignedIn ? (
					<input type="hidden" name="email" value={userEmail ?? ''} />
				) : (
					<div css={styles.emailField}>
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
				<div css={styles.submitButtonContainer}>
					<Button
						cssOverrides={
							isSignedIn
								? [styles.submitButton, styles.signedInButton]
								: styles.submitButton
						}
						onClick={handleSubmitButtonClick}
						type="submit"
						isLoading={isWaitingForResponse}
						loadingAnnouncement="Signing you up…"
						disabled={isWaitingForResponse}
					>
						Sign up
					</Button>
				</div>
				<div
					aria-hidden={!showAdditionalFields}
					css={styles.additionalFields(showAdditionalFields)}
				>
					<div>
						<div css={styles.additionalFieldsContent}>
							<div
								css={styles.toggleContainer}
								style={{
									display: showMarketingToggle
										? undefined
										: 'none',
								}}
							>
								<div css={styles.marketingToggleBox}>
									<ToggleSwitch
										id={`marketing-opt-in-${newsletterId}`}
										checked={marketingOptIn ?? false}
										onClick={handleMarketingToggle}
										label="Get updates about our journalism and ways to support and enjoy our work. Toggle to opt out."
										labelPosition="left"
									/>
								</div>
							</div>
							<div css={styles.privacyContainer(isSignedIn)}>
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
			{captchaSiteKey !== undefined && captchaSiteKey !== '' && (
				<div css={styles.recaptchaContainer}>
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
