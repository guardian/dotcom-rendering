import { css } from '@emotion/react';
import { isString } from '@guardian/libs';
import type { AbTest } from '@guardian/ophan-tracker-js';
import { space, textSans14, until } from '@guardian/source/foundations';
import {
	Button,
	Checkbox,
	CheckboxGroup,
	InlineError,
	InlineSuccess,
	Link,
	Spinner,
	SvgReload,
	TextInput,
} from '@guardian/source/react-components';
import type { CSSProperties, FormEvent, ReactEventHandler } from 'react';
import { useEffect, useRef, useState } from 'react';
// Note - the package also exports a component as a named export "ReCAPTCHA",
// that version will compile and render but is non-functional.
// Use the default export instead.
import ReactGoogleRecaptcha from 'react-google-recaptcha';
import { lazyFetchEmailWithTimeout } from '../lib/fetchEmail';
import {
	getEffectiveMarketingOptIn,
	getMarketingOptInType,
} from '../lib/newsletter-marketing-opt-in';
import {
	getErrorType,
	getResponseFailureDetails,
} from '../lib/newsletterSignupFailureDetails';
import {
	EVENT_DESCRIPTION_TO_ACTION,
	NEWSLETTER_SIGNUP_COMPONENT_ID,
	type NewsletterEventDescription,
	sendNewsletterSignupEvent,
} from '../lib/newsletterSignupTracking';
import { clearSubscriptionCache } from '../lib/newsletterSubscriptionCache';
import { useAuthStatus, useIsSignedIn } from '../lib/useAuthStatus';
import { useBrowserId } from '../lib/useBrowserId';
import { useHideMarketingToggleForCountry } from '../lib/useHideMarketingToggleForCountry';
import { palette } from '../palette';
import type { RenderingTarget } from '../types/renderingTarget';
import { useConfig } from './ConfigContext';

// The Google documentation specifies that if the 'recaptcha-badge' is hidden,
// their T+C's must be displayed instead. While this component hides the
// badge, its parent must include the T+C along side it.
// The T+C are not included in this component directly to reduce layout shift
// from the island hydrating (placeholder height for the text can't
// be accurately predicated for every breakpoint).
// https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge.-what-is-allowed

type Props = {
	newsletterId: string;
	successDescription: string;
	abTest?: AbTest;
	emailInputNameOverride?: string;
	emailInputIdOverride?: string;
	addCountryField?: boolean;
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

const optInCheckboxTextSmall = css`
	label > div {
		${textSans14};
		line-height: 16px;
	}
`;

/*
 * The country form field is used here to try and fool bots into filling the field in
 * and therefore be able to detect them
 */
const countryFieldStyles = css`
	display: none;
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
	additionalOptions?: {
		marketingOptIn?: boolean;
		browserId?: string;
		marketingOptInHiddenForCountry?: boolean;
		countryValue?: string;
	},
): FormData => {
	const {
		marketingOptIn,
		browserId,
		marketingOptInHiddenForCountry,
		countryValue,
	} = additionalOptions ?? {};
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

	if (marketingOptIn !== undefined) {
		formData.append('marketing', marketingOptIn ? 'true' : 'false');
	}

	if (marketingOptInHiddenForCountry === true) {
		formData.append('marketingOptInHidden', 'true');
	}

	if (browserId !== undefined) {
		formData.append('browserId', browserId);
	}

	/*
		The country form field is used here to try and fool bots into filling the field in
	*/
	if (countryValue !== undefined) {
		formData.append('country', countryValue);
	}

	return formData;
};

const resolveEmailForSignedInUser = async (
	isSignedIn: boolean | 'Pending',
): Promise<string | undefined> => {
	if (isSignedIn !== true) {
		return;
	}
	const { idApiUrl } = window.guardian.config.page;
	if (!idApiUrl) {
		return;
	}
	const fetchedEmail = await lazyFetchEmailWithTimeout()();
	if (!fetchedEmail) {
		return;
	}
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
				// eslint-disable-next-line @typescript-eslint/no-base-to-string -- people can still sign up (apparently)
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
const sendTracking = (
	newsletterId: string,
	eventDescription: NewsletterEventDescription,
	renderingTarget: RenderingTarget,
	isSignedIn: boolean | 'Pending',
	abTest?: AbTest,
	extraDetails?: Record<string, unknown>,
): void => {
	sendNewsletterSignupEvent({
		action: EVENT_DESCRIPTION_TO_ACTION[eventDescription],
		identityName: newsletterId,
		componentId: NEWSLETTER_SIGNUP_COMPONENT_ID.secureSignup(newsletterId),
		renderingTarget,
		value: {
			...extraDetails,
			eventDescription,
			isSignedIn,
		},
		abTest,
	});
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
export const SecureSignup = ({
	newsletterId,
	successDescription,
	abTest,
	emailInputNameOverride,
	emailInputIdOverride,
	addCountryField = false,
}: Props) => {
	const recaptchaRef = useRef<ReactGoogleRecaptcha>(null);
	const [captchaSiteKey, setCaptchaSiteKey] = useState<string>();
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
	const isSignedIn = useIsSignedIn();
	const authStatus = useAuthStatus();
	const hideMarketingToggle = useHideMarketingToggleForCountry();
	const marketingOptInHiddenForCountry =
		hideMarketingToggle && isSignedIn === false;

	useEffect(() => {
		if (isSignedIn !== 'Pending' && !isSignedIn) {
			setMarketingOptIn(true);
		}
	}, [isSignedIn]);

	useEffect(() => {
		setCaptchaSiteKey(window.guardian.config.page.googleRecaptchaSiteKey);
	}, []);

	useEffect(() => {
		if (isSignedIn === true) {
			void resolveEmailForSignedInUser(isSignedIn).then((email) => {
				setUserEmail(email);
				setHideEmailInput(isString(email));
			});
		}
	}, [isSignedIn]);
	const { renderingTarget } = useConfig();
	const browserId = useBrowserId();

	const hasResponse = typeof responseOk === 'boolean';

	const submitForm = async (token: string): Promise<void> => {
		const input: HTMLInputElement | null =
			document.querySelector('input[type="email"]') ?? null;
		const emailAddress: string = input?.value ?? '';
		const effectiveMarketingOptIn = getEffectiveMarketingOptIn({
			marketingOptInHiddenForCountry,
			isSignedIn,
			marketingOptIn,
		});
		const marketingOptInType = getMarketingOptInType({
			marketingOptInHiddenForCountry,
			isSignedIn,
			effectiveMarketingOptIn,
		});
		const possibleCountryInput: HTMLInputElement | null =
			document.querySelector(
				`#secure-signup-${newsletterId} input[name="country"]`,
			) ?? null;
		const countryValue = possibleCountryInput?.value;

		sendTracking(
			newsletterId,
			'form-submission',
			renderingTarget,
			isSignedIn,
			abTest,
			marketingOptInType ? { marketingOptInType } : undefined,
		);

		const formData = buildFormData(emailAddress, newsletterId, token, {
			marketingOptIn: effectiveMarketingOptIn,
			browserId,
			marketingOptInHiddenForCountry: marketingOptInHiddenForCountry
				? true
				: undefined,
			countryValue,
		});

		const response = await postFormData(
			window.guardian.config.page.ajaxUrl + '/email',
			formData,
		);

		// The response body could be accessed with await response.text()
		// here and added to state but the response is not informative
		// enough to convey the actualreason for a failure to the user,
		// so a generic failure message is used.
		setIsWaitingForResponse(false);
		setResponseOk(response.ok);

		if (response.ok && authStatus.kind === 'SignedIn') {
			clearSubscriptionCache();
		}

		const trackingDetails: Record<string, unknown> = {};

		if (marketingOptInType) {
			trackingDetails.marketingOptInType = marketingOptInType;
		}

		if (!response.ok) {
			trackingDetails.responseStatus = response.status;
			Object.assign(
				trackingDetails,
				await getResponseFailureDetails(response),
			);
		}

		sendTracking(
			newsletterId,
			response.ok ? 'submission-confirmed' : 'submission-failed',
			renderingTarget,
			isSignedIn,
			abTest,
			Object.keys(trackingDetails).length > 0
				? trackingDetails
				: undefined,
		);
	};

	const resetForm: ReactEventHandler<HTMLButtonElement> = () => {
		setErrorMessage(undefined);
		setResponseOk(undefined);
		recaptchaRef.current?.reset();
	};

	const handleCaptchaLoadError: ReactEventHandler<HTMLDivElement> = () => {
		sendTracking(
			newsletterId,
			'captcha-load-error',
			renderingTarget,
			isSignedIn,
			abTest,
		);
		setErrorMessage(`Sorry, the reCAPTCHA failed to load.`);
		recaptchaRef.current?.reset();
	};

	const handleCaptchaComplete = (token: string | null) => {
		if (!token) {
			sendTracking(
				newsletterId,
				'captcha-not-passed',
				renderingTarget,
				isSignedIn,
				abTest,
			);
			return;
		}
		sendTracking(
			newsletterId,
			'captcha-passed',
			renderingTarget,
			isSignedIn,
			abTest,
		);
		setIsWaitingForResponse(true);
		submitForm(token).catch((error) => {
			console.error(error);
			sendTracking(
				newsletterId,
				'form-submit-error',
				renderingTarget,
				isSignedIn,
				abTest,
				{ errorType: getErrorType(error) },
			);
			setErrorMessage(`Sorry, there was an error signing you up.`);
			setIsWaitingForResponse(false);
		});
	};

	const handleClick = (): void => {
		sendTracking(
			newsletterId,
			'click-button',
			renderingTarget,
			isSignedIn,
			abTest,
		);
	};

	const handleEmailFocus = (): void => {
		sendTracking(
			newsletterId,
			'email-input-focused',
			renderingTarget,
			isSignedIn,
			abTest,
		);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		if (isWaitingForResponse) {
			return;
		}
		setErrorMessage(undefined);
		sendTracking(
			newsletterId,
			'open-captcha',
			renderingTarget,
			isSignedIn,
			abTest,
		);
		recaptchaRef.current?.execute();
	};

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
					name={emailInputNameOverride ?? 'email'}
					id={emailInputIdOverride}
					label="Enter your email address"
					type="email"
					value={userEmail ?? ''}
					onChange={(e) => setUserEmail(e.target.value)}
					onFocus={handleEmailFocus}
				/>
				{isSignedIn !== true && !marketingOptInHiddenForCountry && (
					<CheckboxGroup
						name="marketing-preferences"
						label="Marketing preferences"
						hideLabel={true}
						cssOverrides={optInCheckboxTextSmall}
					>
						<Checkbox
							label="Get updates about our journalism and ways to support and enjoy our work."
							value="marketing-opt-in"
							checked={marketingOptIn ?? false}
							onChange={(e) =>
								setMarketingOptIn(e.target.checked)
							}
						/>
					</CheckboxGroup>
				)}
				{/*
					The country form field is used here to try and fool bots into filling the field in
				*/}
				{addCountryField && (
					<TextInput
						name="country"
						label="country"
						hideLabel={true}
						type="text"
						maxLength={100}
						optional={true}
						tabIndex={-1}
						autoComplete="off"
						aria-hidden="true"
						cssOverrides={countryFieldStyles}
					/>
				)}
				<Button onClick={handleClick} size="small" type="submit">
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
