import { css } from '@emotion/react';
import { isString, type OphanAction } from '@guardian/libs';
import { space, until } from '@guardian/source-foundations';
import {
	Button,
	InlineError,
	InlineSuccess,
	Link,
	SvgReload,
	SvgSpinner,
	TextInput,
} from '@guardian/source-react-components';
import type { CSSProperties, FormEvent, ReactEventHandler } from 'react';
import { useEffect, useRef, useState } from 'react';
// Note - the package also exports a component as a named export "ReCAPTCHA",
// that version will compile and render but is non-functional.
// Use the default export instead.
import ReactGoogleRecaptcha from 'react-google-recaptcha';
import { submitComponentEvent } from '../client/ophan/ophan';
import { lazyFetchEmailWithTimeout } from '../lib/fetchEmail';
import { palette } from '../palette';
import type { RenderingTarget } from '../types/renderingTarget';
import { useConfig } from './ConfigContext';

// The Google documentation specifies that if the 'recaptcha-badge' is hidden,
// their T+C's must be displayed instead. While this component hides the
// badge, its parent must include the T+C along side it.
// The T+C are not included in this componet directly to reduce layout shift
// from the island hydrating (placeholder height for the text can't
// be accurately predicated for every breakpoint).
// https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge.-what-is-allowed

type Props = {
	newsletterId: string;
	successDescription: string;
};

const formStyles = css`
	display: grid;
	align-items: center;
	grid-template-columns: auto min-content;
	grid-template-rows: 24px 48px;
	gap: 0 ${space[3]}px;

	grid-template-areas:
		'label label'
		'input button';

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
		background-color: ${palette('--recaptcha-button')};
		color: ${palette('--recaptcha-button-text')};
		:hover {
			background-color: ${palette('--recaptcha-button-hover')};
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
	token: string,
): FormData => {
	const pageRef = window.location.origin + window.location.pathname;
	const refViewId = window.guardian.ophan?.pageViewId ?? '';

	const formData = new FormData();
	formData.append('email', emailAddress);
	formData.append('csrfToken', ''); // TO DO - PR on form handlers in frontend/identity to see how/if this is needed
	formData.append('listName', newsletterId);
	formData.append('ref', pageRef);
	formData.append('refViewId', refViewId);
	formData.append('name', '');
	if (window.guardian.config.switches.emailSignupRecaptcha) {
		formData.append('g-recaptcha-response', token); // TO DO - PR on form handlers - is the token verified?
	}

	return formData;
};

const resolveEmailIfSignedIn = async (): Promise<string | undefined> => {
	const { idApiUrl } = window.guardian.config.page;
	if (!idApiUrl) return;
	const fetchedEmail = await lazyFetchEmailWithTimeout(idApiUrl)();
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
	| 'open-captcha'
	| 'captcha-load-error'
	| 'form-submit-error'
	| 'captcha-not-passed'
	| 'captcha-passed';

const sendTracking = (
	newsletterId: string,
	eventDescription: EventDescription,
	renderingTarget: RenderingTarget,
): void => {
	let action: OphanAction = 'CLICK';

	switch (eventDescription) {
		case 'form-submission':
		case 'captcha-not-passed':
		case 'captcha-passed':
			action = 'ANSWER';
			break;
		case 'submission-confirmed':
			action = 'SUBSCRIBE';
			break;
		case 'captcha-load-error':
		case 'form-submit-error':
		case 'submission-failed':
			action = 'CLOSE';
			break;
		case 'open-captcha':
			action = 'EXPAND';
			break;
		case 'click-button':
		default:
			action = 'CLICK';
			break;
	}

	// The data team use a custom date format for timestamps,
	// (yyy-MM-dd hh:mm:ss.ssssss UTC)
	// and will cast the integer value  to this
	// format at their end
	const value = JSON.stringify({
		eventDescription,
		newsletterId,
		timestamp: Date.now(),
	});

	void submitComponentEvent(
		{
			action,
			value,
			//check if this can be used or needs to be added
			component: {
				componentType: 'NEWSLETTER_SUBSCRIPTION',
				id: `AR SecureSignup ${newsletterId}`,
			},
		},
		renderingTarget,
	);
};

/**
 * # Secure Signup
 *
 * We can only inject ReCAPTCHA client-side, and need to respond to user input.
 *
 * ---
 *
 * [`EmailSignup` on Chromatic](https://www.chromatic.com/component?appId=63e251470cfbe61776b0ef19&csfId=components-emailsignup)
 */
export const SecureSignup = ({ newsletterId, successDescription }: Props) => {
	const recaptchaRef = useRef<ReactGoogleRecaptcha>(null);
	const [captchaSiteKey, setCaptchaSiteKey] = useState<string>();
	const [signedInUserEmail, setSignedInUserEmail] = useState<string>();
	const [isWaitingForResponse, setIsWaitingForResponse] =
		useState<boolean>(false);
	const [responseOk, setResponseOk] = useState<boolean | undefined>(
		undefined,
	);
	const [errorMessage, setErrorMessage] = useState<string | undefined>(
		undefined,
	);

	useEffect(() => {
		setCaptchaSiteKey(window.guardian.config.page.googleRecaptchaSiteKey);
		void resolveEmailIfSignedIn().then(setSignedInUserEmail);
	}, []);
	const { renderingTarget } = useConfig();

	const hasResponse = typeof responseOk === 'boolean';

	const submitForm = async (token: string): Promise<void> => {
		const input: HTMLInputElement | null =
			document.querySelector('input[type="email"]') ?? null;
		const emailAddress: string = input?.value ?? '';

		sendTracking(newsletterId, 'form-submission', renderingTarget);
		const response = await postFormData(
			window.guardian.config.page.ajaxUrl + '/email',
			buildFormData(emailAddress, newsletterId, token),
		);

		// The response body could be accessed with await response.text()
		// here and added to state but the response is not informative
		// enough to convey the actualreason for a failure to the user,
		// so a generic failure message is used.
		setIsWaitingForResponse(false);
		setResponseOk(response.ok);

		sendTracking(
			newsletterId,
			response.ok ? 'submission-confirmed' : 'submission-failed',
			renderingTarget,
		);
	};

	const resetForm: ReactEventHandler<HTMLButtonElement> = () => {
		setErrorMessage(undefined);
		setResponseOk(undefined);
		recaptchaRef.current?.reset();
	};

	const handleCaptchaLoadError: ReactEventHandler<HTMLDivElement> = () => {
		sendTracking(newsletterId, 'captcha-load-error', renderingTarget);
		setErrorMessage(`Sorry, the reCAPTCHA failed to load.`);
		recaptchaRef.current?.reset();
	};

	const handleCaptchaComplete = (token: string | null) => {
		if (!token) {
			sendTracking(newsletterId, 'captcha-not-passed', renderingTarget);
			return;
		}
		sendTracking(newsletterId, 'captcha-passed', renderingTarget);
		setIsWaitingForResponse(true);
		submitForm(token).catch((error) => {
			// eslint-disable-next-line no-console -- unexpected error
			console.error(error);
			sendTracking(newsletterId, 'form-submit-error', renderingTarget);
			setErrorMessage(`Sorry, there was an error signing you up.`);
			setIsWaitingForResponse(false);
		});
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
		sendTracking(newsletterId, 'open-captcha', renderingTarget);
		recaptchaRef.current?.execute();
	};

	const hideEmailInput = isString(signedInUserEmail);

	return (
		<>
			<form
				onSubmit={handleSubmit}
				id={`secure-signup-${newsletterId}`}
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
					label="Enter your email address"
					type="email"
					value={signedInUserEmail}
				/>
				<Button onClick={handleClick} size="small" type="submit">
					Sign up
				</Button>
			</form>
			{isWaitingForResponse && (
				<div>
					<SvgSpinner isAnnouncedByScreenReader={true} size="small" />
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

			{!!captchaSiteKey && (
				<div
					css={css`
						.grecaptcha-badge {
							visibility: hidden;
						}
					`}
				>
					<ReactGoogleRecaptcha
						sitekey={captchaSiteKey}
						ref={recaptchaRef}
						onChange={handleCaptchaComplete}
						onError={handleCaptchaLoadError}
						size="invisible"
						// Note - the component supports an onExpired callback
						// (for when the user completed a challenge, but did
						// not submit the form before the token expired.
						// We don't need that here as completing the captcha
						// (onChange callback) triggers the submission
					/>
				</div>
			)}
		</>
	);
};
