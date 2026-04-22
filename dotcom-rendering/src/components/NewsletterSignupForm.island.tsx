import { css } from '@emotion/react';
import { space, until } from '@guardian/source/foundations';
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
} from '@guardian/source/react-components';
import { ToggleSwitch } from '@guardian/source-development-kitchen/react-components';
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
};

const formStyles = css`
	display: grid;
	column-gap: ${space[3]}px;
	row-gap: ${space[2]}px;
	align-items: end;
`;

const signedOutLayoutStyles = css`
	grid-template-columns: minmax(0, 1fr) 160px;
	grid-template-areas:
		'email submit'
		'marketing .'
		'privacy privacy';

	${until.tablet} {
		grid-template-columns: 1fr;
		grid-template-areas:
			'email'
			'submit'
			'marketing'
			'privacy';
	}
`;

const signedInLayoutStyles = css`
	grid-template-columns: minmax(0, 1fr);
	grid-template-areas:
		'submit'
		'marketing'
		'privacy';
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
`;

const signedInSubmitButtonStyles = css`
	width: 100%;
	max-width: 220px;
`;

const previewButtonContainerStyles = css`
	margin-bottom: ${space[3]}px;
`;

const errorContainerStyles = css`
	margin-top: ${space[6]}px;
	display: flex;
	align-items: flex-start;
	gap: ${space[2]}px;

	${until.tablet} {
		flex-wrap: wrap;
	}
`;

const toggleContainerStyles = css`
	grid-area: marketing;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${space[3]}px;
	min-width: 0;
`;

const privacyContainerStyles = css`
	grid-area: privacy;
`;

const successTextStyles = css`
	color: ${palette('--newsletter-card-description')};
	strong {
		font-weight: bold;
	}
`;

const marketingSuccessBoxStyles = css`
	width: 100%;
	padding: ${space[2]}px;
	border: 1px solid ${palette('--card-border-supporting')};
	border-radius: 4px;
`;

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
		<div css={marketingSuccessBoxStyles}>
			<InlineSuccess>
				<span css={successTextStyles}>
					<strong>You're signed up!</strong>
					&nbsp;
					<span>
						You will receive {newsletterName} {frequency}.
					</span>
				</span>
			</InlineSuccess>
			<LinkButton href="/email-newsletters" priority="tertiary">
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
}: Props) => {
	const { renderingTarget } = useConfig();

	const {
		userEmail,
		hideEmailInput,
		isInteracted,
		showMarketingToggle,
		marketingOptIn,
		isWaitingForResponse,
		responseOk,
		errorMessage,
		handleEmailChange,
		handleEmailFocus,
		handleMarketingToggle,
		handleSubmit,
		handleSubmitButtonClick,
		handleReset,
	} = useNewsletterSignupForm(newsletterId, renderingTarget);

	const hasResponse = typeof responseOk === 'boolean';
	const showAdditionalFields = isInteracted || !!userEmail;

	return (
		<>
			{!hasResponse &&
				!isWaitingForResponse &&
				onPreviewClick &&
				!hideEmailInput && (
					<div css={previewButtonContainerStyles}>
						<Button
							priority="tertiary"
							icon={<SvgEye />}
							iconSide="left"
							onClick={onPreviewClick}
							type="button"
						>
							Preview latest
						</Button>
					</div>
				)}
			<form
				onSubmit={handleSubmit}
				id={`newsletter-signup-${newsletterId}`}
				style={{
					display:
						hasResponse || isWaitingForResponse
							? 'none'
							: undefined,
				}}
				css={[
					formStyles,
					hideEmailInput
						? signedInLayoutStyles
						: signedOutLayoutStyles,
				]}
			>
				{hideEmailInput ? (
					<input type="hidden" name="email" value={userEmail ?? ''} />
				) : (
					<div css={emailFieldStyles}>
						<TextInput
							name="email"
							label="Enter your email"
							type="email"
							value={userEmail ?? ''}
							onFocus={handleEmailFocus}
							onChange={(e) => handleEmailChange(e.target.value)}
						/>
					</div>
				)}
				{showAdditionalFields && (
					<>
						{showMarketingToggle && (
							<div css={toggleContainerStyles}>
								<div css={marketingSuccessBoxStyles}>
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
					{hideEmailInput && onPreviewClick && (
						<Button
							priority="tertiary"
							icon={<SvgEye />}
							iconSide="left"
							onClick={onPreviewClick}
							type="button"
						>
							Preview latest
						</Button>
					)}
					<Button
						cssOverrides={
							hideEmailInput
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

			{!!errorMessage && <ErrorMessageWithAdvice text={errorMessage} />}

			{hasResponse &&
				(responseOk ? (
					<SuccessMessage
						newsletterName={newsletterName}
						frequency={frequency}
					/>
				) : (
					<div css={errorContainerStyles}>
						<ErrorMessageWithAdvice text="Sign up failed." />
						<Button
							size="small"
							priority="primary"
							icon={<SvgReload />}
							iconSide="right"
							onClick={handleReset}
						>
							Try again
						</Button>
					</div>
				))}
		</>
	);
};
