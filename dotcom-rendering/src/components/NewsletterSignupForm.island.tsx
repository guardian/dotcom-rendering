import { css } from '@emotion/react';
import { isString } from '@guardian/libs';
import { space, until } from '@guardian/source/foundations';
import {
	Button,
	InlineError,
	InlineSuccess,
	Link,
	Spinner,
	SvgEye,
	SvgReload,
	TextInput,
} from '@guardian/source/react-components';
import { ToggleSwitch } from '@guardian/source-development-kitchen/react-components';
import type { FormEvent, ReactEventHandler } from 'react';
import { useEffect, useState } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import { lazyFetchEmailWithTimeout } from '../lib/fetchEmail';
import { clearSubscriptionCache } from '../lib/newsletterSubscriptionCache';
import { useAuthStatus, useIsSignedIn } from '../lib/useAuthStatus';
import { useBrowserId } from '../lib/useBrowserId';
import { palette } from '../palette';
import type { RenderingTarget } from '../types/renderingTarget';
import { useConfig } from './ConfigContext';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';

type Props = {
	newsletterId: string;
	successDescription: string;
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

const marketingBoxStyles = css`
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

const SuccessMessage = ({ text }: { text?: string }) => (
	<InlineSuccess>
		<span>
			<b>Subscription Confirmed.&nbsp;</b>
			<span>{text}</span>
		</span>
	</InlineSuccess>
);

const buildFormData = (
	emailAddress: string,
	newsletterId: string,
	marketingOptIn?: boolean,
	browserId?: string,
): FormData => {
	const pageRef = window.location.origin + window.location.pathname;
	const refViewId = window.guardian.ophan?.pageViewId ?? '';

	const formData = new FormData();
	formData.append('email', emailAddress);
	formData.append('csrfToken', '');
	formData.append('listName', newsletterId);
	formData.append('ref', pageRef);
	formData.append('refViewId', refViewId);
	formData.append('name', '');

	if (marketingOptIn !== undefined) {
		formData.append('marketing', marketingOptIn ? 'true' : 'false');
	}

	if (browserId !== undefined) {
		formData.append('browserId', browserId);
	}

	return formData;
};

const resolveEmailIfSignedIn = async (): Promise<string | undefined> => {
	const { idApiUrl } = window.guardian.config.page;
	if (!idApiUrl) return;
	const fetchedEmail = await lazyFetchEmailWithTimeout()();
	if (!fetchedEmail) return;
	return fetchedEmail;
};

const postFormData = async (
	endpoint: string,
	formData: FormData,
): Promise<Response> => {
	const requestBodyStrings: string[] = [];

	for (const [key, value] of formData.entries()) {
		requestBodyStrings.push(
			`${encodeURIComponent(key)}=${encodeURIComponent(
				// eslint-disable-next-line @typescript-eslint/no-base-to-string -- value.toString() is safe here as we are dealing with FormData entries
				value.toString(),
			)}`,
		);
	}

	return fetch(endpoint, {
		method: 'POST',
		body: requestBodyStrings.join('&'),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});
};

type EventDescription =
	| 'click-button'
	| 'form-submission'
	| 'submission-confirmed'
	| 'submission-failed'
	| 'form-submit-error';

const sendTracking = (
	newsletterId: string,
	eventDescription: EventDescription,
	renderingTarget: RenderingTarget,
): void => {
	let action: 'CLICK' | 'ANSWER' | 'SUBSCRIBE' | 'CLOSE';

	switch (eventDescription) {
		case 'form-submission':
			action = 'ANSWER';
			break;
		case 'submission-confirmed':
			action = 'SUBSCRIBE';
			break;
		case 'form-submit-error':
		case 'submission-failed':
			action = 'CLOSE';
			break;
		case 'click-button':
		default:
			action = 'CLICK';
			break;
	}

	const value = JSON.stringify({
		eventDescription,
		newsletterId,
		timestamp: Date.now(),
	});

	void submitComponentEvent(
		{
			action,
			value,
			component: {
				componentType: 'NEWSLETTER_SUBSCRIPTION',
				id: `AR NewsletterSignupForm ${newsletterId}`,
			},
		},
		renderingTarget,
	);
};

/**
 * # Newsletter Signup Form
 *
 * A simplified version of SecureSignup without reCAPTCHA or A/B testing.
 */
export const NewsletterSignupForm = ({
	newsletterId,
	successDescription,
	hidePrivacyMessage = false,
	onPreviewClick,
}: Props) => {
	const [userEmail, setUserEmail] = useState<string>();
	const [hideEmailInput, setHideEmailInput] = useState<boolean>(false);
	const [isWaitingForResponse, setIsWaitingForResponse] =
		useState<boolean>(false);
	const [responseOk, setResponseOk] = useState<boolean | undefined>(
		undefined,
	);
	const [errorMessage, setErrorMessage] = useState<string | undefined>(
		undefined,
	);
	const [marketingOptIn, setMarketingOptIn] = useState<boolean | undefined>(
		undefined,
	);
	const [isInteracted, setIsInteracted] = useState<boolean>(false);
	const isSignedIn = useIsSignedIn();
	const authStatus = useAuthStatus();

	useEffect(() => {
		if (isSignedIn !== 'Pending' && !isSignedIn) {
			setMarketingOptIn(true);
		}
	}, [isSignedIn]);

	useEffect(() => {
		void resolveEmailIfSignedIn().then((email) => {
			setUserEmail(email);
			setHideEmailInput(isString(email));
			if (isString(email)) {
				setIsInteracted(true);
			}
		});
	}, []);
	const { renderingTarget } = useConfig();
	const browserId = useBrowserId();

	const hasResponse = typeof responseOk === 'boolean';

	const submitForm = async (emailAddress: string): Promise<void> => {
		sendTracking(newsletterId, 'form-submission', renderingTarget);

		const formData = buildFormData(
			emailAddress,
			newsletterId,
			marketingOptIn,
			browserId,
		);

		const response = await postFormData(
			window.guardian.config.page.ajaxUrl + '/email',
			formData,
		);

		setIsWaitingForResponse(false);
		setResponseOk(response.ok);

		if (response.ok && authStatus.kind === 'SignedIn') {
			clearSubscriptionCache();
		}

		sendTracking(
			newsletterId,
			response.ok ? 'submission-confirmed' : 'submission-failed',
			renderingTarget,
		);
	};

	const resetForm: ReactEventHandler<HTMLButtonElement> = () => {
		setErrorMessage(undefined);
		setResponseOk(undefined);
	};

	const handleClick = (): void => {
		sendTracking(newsletterId, 'click-button', renderingTarget);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		if (isWaitingForResponse) {
			return;
		}

		const emailAddress = userEmail?.trim() ?? '';
		if (!emailAddress) {
			setErrorMessage('Please enter a valid email address.');
			return;
		}

		setErrorMessage(undefined);
		setIsWaitingForResponse(true);
		submitForm(emailAddress).catch((error) => {
			// eslint-disable-next-line no-console -- unexpected error
			console.error(error);
			sendTracking(newsletterId, 'form-submit-error', renderingTarget);
			setErrorMessage(`Sorry, there was an error signing you up.`);
			setIsWaitingForResponse(false);
		});
	};

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
							onFocus={() => setIsInteracted(true)}
							onChange={(e) => {
								setUserEmail(e.target.value);
								setIsInteracted(true);
							}}
						/>
					</div>
				)}
				{showAdditionalFields && (
					<>
						{isSignedIn === false && (
							<div css={toggleContainerStyles}>
								<div css={marketingBoxStyles}>
									<ToggleSwitch
										id={`marketing-opt-in-${newsletterId}`}
										checked={marketingOptIn ?? false}
										onClick={(event) => {
											// ToggleSwitch renders a button; prevent accidental form submit.
											event.preventDefault();
											setMarketingOptIn(!marketingOptIn);
										}}
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
						onClick={handleClick}
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
					<div>
						<SuccessMessage text={successDescription} />
					</div>
				) : (
					<div css={errorContainerStyles}>
						<ErrorMessageWithAdvice text={`Sign up failed.`} />
						<Button
							size="small"
							priority="primary"
							icon={<SvgReload />}
							iconSide={'right'}
							onClick={resetForm}
						>
							Try again
						</Button>
					</div>
				))}
		</>
	);
};
