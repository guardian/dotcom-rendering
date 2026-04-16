import { css } from '@emotion/react';
import { isString } from '@guardian/libs';
import { space, until } from '@guardian/source/foundations';
import {
	Button,
	InlineError,
	InlineSuccess,
	Link,
	Spinner,
	SvgReload,
	TextInput,
} from '@guardian/source/react-components';
import { ToggleSwitch } from '@guardian/source-development-kitchen/react-components';
import type { CSSProperties, FormEvent, ReactEventHandler } from 'react';
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
};

const formStyles = css`
	display: grid;
	grid-template-columns: auto 160px;
	grid-template-rows: 24px 48px;
	gap: 0 ${space[3]}px;

	grid-template-areas:
		'label label'
		'input button'
		'marketing marketing';

	label {
		grid-area: label;
		div {
			color: ${palette('--article-text')};
		}
	}
	input {
		grid-area: input;
		margin-top: 0;
		color: ${palette('--article-text')};
		background-color: ${palette('--article-background')};
	}
	button {
		grid-area: button;
	}

	${until.tablet} {
		grid-template-columns: 1fr;
		grid-template-rows: auto auto auto auto;
		grid-template-areas:
			'label'
			'input'
			'button'
			'marketing';
		gap: ${space[3]}px 0;

		button {
			width: 100%;
		}
	}
`;

const formStylesWhenSignedIn = {
	gridTemplateColumns: 'auto 1fr',
	gridTemplateAreas: [
		// this is easier to parse over multiple lines
		'"label  label"',
		'"button input"',
	].join(' '),
} satisfies CSSProperties;

const errorContainerStyles = css`
	display: flex;
	align-items: flex-start;
	${until.tablet} {
		flex-wrap: wrap;
	}
	button {
		margin-left: ${space[1]}px;
		background-color: ${palette('--recaptcha-button')};
		:hover {
			background-color: ${palette('--recaptcha-button-hover')};
		}
	}
`;

const toggleContainerStyles = css`
	grid-area: marketing;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${space[3]}px;
	margin-top: ${space[3]}px;
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
				// eslint-disable-next-line @typescript-eslint/no-base-to-string
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
}: Props) => {
	const [userEmail, setUserEmail] = useState<string>();
	const [hideEmailInput, setHideEmailInput] = useState<boolean>();
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

	const submitForm = async (): Promise<void> => {
		const input: HTMLInputElement | null =
			document.querySelector('input[type="email"]') ?? null;
		const emailAddress: string = input?.value ?? '';

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
		setErrorMessage(undefined);
		setIsWaitingForResponse(true);
		submitForm().catch((error) => {
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
			<form
				onSubmit={handleSubmit}
				id={`newsletter-signup-${newsletterId}`}
				style={{
					display:
						hasResponse || isWaitingForResponse
							? 'none'
							: undefined,
					...(hideEmailInput ? formStylesWhenSignedIn : undefined),
				}}
				css={formStyles}
			>
				<TextInput
					hidden={hideEmailInput}
					hideLabel={hideEmailInput}
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
				{showAdditionalFields && (
					<div css={toggleContainerStyles}>
						{isSignedIn === false && (
							<div css={marketingBoxStyles}>
								<ToggleSwitch
									id={`marketing-opt-in-${newsletterId}`}
									checked={marketingOptIn ?? false}
									onClick={() =>
										setMarketingOptIn(!marketingOptIn)
									}
									label="Get updates about our journalism and ways to support and enjoy
								our work. Toggle to opt out."
									labelPosition="left"
								/>
							</div>
						)}
						<NewsletterPrivacyMessage />
					</div>
				)}
				<Button onClick={handleClick} type="submit">
					Sign up
				</Button>
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
