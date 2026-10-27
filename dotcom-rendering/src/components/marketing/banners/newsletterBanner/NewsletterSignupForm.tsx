import { css } from '@emotion/react';
import type { AbTest } from '@guardian/ophan-tracker-js';
import { from, space, until } from '@guardian/source/foundations';
import { Button, TextInput } from '@guardian/source/react-components';
import { ToggleSwitch } from '@guardian/source-development-kitchen/react-components';
// Note - the package also exports a component as a named export "ReCAPTCHA",
// that version will compile and render but is non-functional.
// Use the default export instead.
import { type ChangeEvent, useEffect } from 'react';
import ReactGoogleRecaptcha from 'react-google-recaptcha';
import { useHideMarketingToggleForCountry } from '../../../../lib/useHideMarketingToggleForCountry';
import { useNewsletterSignupForm } from '../../../../lib/useNewsletterSignupForm';
import { palette } from '../../../../palette';
import { useConfig } from '../../../ConfigContext';
import { NewsletterPrivacyMessage } from '../../../NewsletterPrivacyMessage';
import { contentTransitionEasing } from '../../shared/transitions';
import { FailureMessage } from './ErrorMessage';

type NewsletterSignupFormProps = {
	newsletterId: string;
	componentId: string;
	abTest?: AbTest;
	isModal?: boolean;
	onSuccess?: () => void;
};

const newsletterFormTransition = `0.2s ${contentTransitionEasing}`;

const formStyles = css`
	display: grid;
	column-gap: ${space[3]}px;
	row-gap: ${space[2]}px;
	align-items: end;

	${until.tablet} {
		row-gap: ${space[3]}px;
	}
`;

const collapsedFormStyles = css`
	row-gap: 0;
`;

const bannerSignedInLayoutStyles = css`
	grid-template-columns: minmax(0, 1fr);
	grid-template-areas: 'submit';
	margin-top: ${space[2]}px;
	row-gap: ${space[4]}px;
	${until.tablet} {
		padding: 0 10px;
		margin-top: 0;
	}
`;

const bannerSignedOutLayoutStyles = css`
	grid-template-columns: minmax(0, 1fr) auto;
	grid-template-areas: 'email submit';

	${until.tablet} {
		grid-template-columns: 1fr;
		grid-template-areas:
			'email'
			'submit';
		padding: 0 10px;
	}
`;

const signedInButtonStyles = css`
	max-width: 100%;
	${from.tablet} {
		width: 240px;
	}
`;

const emailFieldStyles = css`
	grid-area: email;
	min-width: 0;

	label div {
		color: ${palette('--newsletter-signup-input-text')};
		font-size: 14px;
	}

	input {
		color: ${palette('--newsletter-signup-input-text')};
		background-color: ${palette('--newsletter-signup-input-background')};
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

const toggleContainerStyles = css`
	grid-column: 1 / -1;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${space[3]}px;
	min-width: 0;
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

const recaptchaContainerStyles = css`
	.grecaptcha-badge {
		visibility: hidden;
	}
`;

const getPrivacyContainerStyles = (isSignedIn: boolean | 'Pending') => css`
	margin-top: ${space[2]}px;
	${until.tablet} {
		margin-top: ${isSignedIn ? 0 : space[3]}px;
	}
	grid-column: 1 / -1;
	${isSignedIn === true &&
	css`
		margin-top: 0;
	`};
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
					formStyles,
					isSignedIn
						? bannerSignedInLayoutStyles
						: bannerSignedOutLayoutStyles,
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
			{captchaSiteKey !== undefined && captchaSiteKey !== '' && (
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
