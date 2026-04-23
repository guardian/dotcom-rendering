import { css } from '@emotion/react';
import { from, space, textSans15, until } from '@guardian/source/foundations';
import type { Size } from '@guardian/source/react-components';
import {
	Button,
	InlineError,
	InlineSuccess,
	Link,
	LinkButton,
	Spinner,
	SvgEye,
	SvgReload,
	TextInput,
	themeButton,
} from '@guardian/source/react-components';
import { ToggleSwitch } from '@guardian/source-development-kitchen/react-components';
// Note - the package also exports a component as a named export "ReCAPTCHA",
// that version will compile and render but is non-functional.
// Use the default export instead.
import ReactGoogleRecaptcha from 'react-google-recaptcha';
import { useNewsletterSignupForm } from '../lib/useNewsletterSignupForm';
import { palette } from '../palette';
import { useConfig } from './ConfigContext';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';

type Props = {
	newsletterId: string;
	newsletterName: string;
	frequency: string;
	hidePrivacyMessage?: boolean;
	onPreviewClick?: () => void;
	/** When `true`, the success message is shown immediately (user is already subscribed). */
	isAlreadySubscribed?: boolean;
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
	grid-template-columns: minmax(0, 1fr) 160px;
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
		color: ${palette('--article-text')};
	}

	input {
		color: ${palette('--article-text')};
		background-color: ${palette('--article-background')};
	}
`;

const submitButtonContainerStyles = css`
	grid-area: submit;
	width: 100%;
	display: flex;
	gap: ${space[2]}px;
`;

const signedOutSubmitButtonStyles = css`
	flex: 1;
	button {
		width: 100%;
	}
	${from.tablet} {
		max-width: 220px;
	}
`;

const signedInSubmitButtonStyles = css`
	flex: 1;
	button {
		width: 100%;
	}
	${from.tablet} {
		max-width: 220px;
	}
`;

const previewButtonContainerStyles = css`
	margin-bottom: ${space[2]}px;
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
`;

const recaptchaContainerStyles = css`
	.grecaptcha-badge {
		visibility: hidden;
	}
`;

const browseMoreLinksStyles = css`
	${tryAgainButtonStyles};
	${from.tablet} {
		max-width: 350px;
	}
`;

const PreviewButton = ({
	onClick,
	size = 'default',
}: {
	onClick: () => void;
	size?: Size;
}) => (
	<Button
		priority="tertiary"
		icon={<SvgEye />}
		iconSide="left"
		onClick={onClick}
		type="button"
		size={size}
	>
		Preview latest
	</Button>
);

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
				href="/email-newsletters"
				priority="tertiary"
				theme={themeButton}
				cssOverrides={browseMoreLinksStyles}
			>
				Browse more newsletters
			</LinkButton>
		</div>
	);
};

/**
 * # Newsletter Signup Form
 *
 * A simplified version of SecureSignup without reCAPTCHA or A/B testing.
 * All logic lives in {@link useNewsletterSignupForm}.
 */
export const NewsletterSignupForm = ({
	newsletterId,
	newsletterName,
	frequency,
	hidePrivacyMessage = false,
	onPreviewClick,
	isAlreadySubscribed = false,
}: Props) => {
	const { renderingTarget } = useConfig();

	const {
		userEmail,
		isSignedIn,
		isInteracted,
		showMarketingToggle,
		marketingOptIn,
		isWaitingForResponse,
		responseOk,
		errorMessage,
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
	} = useNewsletterSignupForm(newsletterId, renderingTarget);

	const hasResponse = typeof responseOk === 'boolean';
	const showForm =
		!isAlreadySubscribed && !hasResponse && !isWaitingForResponse;
	const showAdditionalFields = isInteracted || !!userEmail;
	// Validation errors (before submission) are shown inline on the input.
	// Network/server errors (after a failed submission) use the standalone message.
	const isValidationError = !!errorMessage && !hasResponse;

	return (
		<>
			{!isAlreadySubscribed &&
				!hasResponse &&
				!isWaitingForResponse &&
				onPreviewClick &&
				!isSignedIn && (
					<div css={previewButtonContainerStyles}>
						<PreviewButton onClick={onPreviewClick} size="small" />
					</div>
				)}
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
							onChange={(e) => handleEmailChange(e.target.value)}
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
					{isSignedIn && onPreviewClick && (
						<PreviewButton onClick={onPreviewClick} />
					)}
					<Button
						cssOverrides={
							isSignedIn
								? signedInSubmitButtonStyles
								: signedOutSubmitButtonStyles
						}
						onClick={handleSubmitButtonClick}
						type="submit"
					>
						Sign up
					</Button>
				</div>
			</form>
			{isWaitingForResponse && (
				<div role="status" aria-label="loading">
					<Spinner size="small" />
				</div>
			)}

			{!!errorMessage && !isValidationError && (
				<ErrorMessageWithAdvice text={errorMessage} />
			)}

			{isAlreadySubscribed && (
				<SuccessMessage
					newsletterName={newsletterName}
					frequency={frequency}
				/>
			)}
			{!isAlreadySubscribed &&
				hasResponse &&
				(responseOk ? (
					<SuccessMessage
						newsletterName={newsletterName}
						frequency={frequency}
					/>
				) : (
					<div css={[responseBoxStyles, errorContainerStyles]}>
						<ErrorMessageWithAdvice text="Sign up failed." />
						<Button
							size="small"
							priority="primary"
							icon={<SvgReload />}
							iconSide="right"
							onClick={handleReset}
							cssOverrides={tryAgainButtonStyles}
						>
							Try again
						</Button>
					</div>
				))}
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
