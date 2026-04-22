import { isString } from '@guardian/libs';
import type { TAction } from '@guardian/ophan-tracker-js';
import type { FormEvent, ReactEventHandler } from 'react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import type ReactGoogleRecaptcha from 'react-google-recaptcha';
import { submitComponentEvent } from '../client/ophan/ophan';
import type { RenderingTarget } from '../types/renderingTarget';
import { lazyFetchEmailWithTimeout } from './fetchEmail';
import { clearSubscriptionCache } from './newsletterSubscriptionCache';
import { useAuthStatus, useIsSignedIn } from './useAuthStatus';
import { useBrowserId } from './useBrowserId';

// ---------------------------------------------------------------------------
// Helpers (kept local — not part of the public API)
// ---------------------------------------------------------------------------

const buildFormData = (
	emailAddress: string,
	newsletterId: string,
	token: string,
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
	formData.append('g-recaptcha-response', token);

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
	let action: TAction = 'CLICK';

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

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export type NewsletterSignupFormState = {
	/** The email address currently in the field (or resolved from Identity). */
	userEmail: string | undefined;
	/**
	 * When `true` the email `<input>` should be hidden (signed-in user whose
	 * address was fetched automatically).
	 */
	isSignedIn: boolean;
	/**
	 * `true` once the user has focused or typed in the email field, or when
	 * the user's email was pre-filled. Reveals the marketing toggle and
	 * privacy message.
	 */
	isInteracted: boolean;
	/** `true` for signed-out users — shows the marketing opt-in toggle. */
	showMarketingToggle: boolean;
	marketingOptIn: boolean | undefined;

	/** `true` while the POST request is in-flight. */
	isWaitingForResponse: boolean;
	/**
	 * `true`  → subscription confirmed
	 * `false` → server returned a non-2xx response
	 * `undefined` → no response yet
	 */
	responseOk: boolean | undefined;
	/** Inline validation / network error copy. */
	errorMessage: string | undefined;

	/** Ref to pass to the `<ReactGoogleRecaptcha>` widget. */
	recaptchaRef: React.RefObject<ReactGoogleRecaptcha>;
	/** Site key for the reCAPTCHA widget — `undefined` until resolved. */
	captchaSiteKey: string | undefined;
	/** Pass to `ReactGoogleRecaptcha`'s `onChange` prop. */
	handleCaptchaComplete: (token: string | null) => void;
	/** Pass to `ReactGoogleRecaptcha`'s `onError` prop. */
	handleCaptchaLoadError: () => void;

	// Event handlers
	handleEmailChange: (value: string) => void;
	handleEmailFocus: () => void;
	handleMarketingToggle: ReactEventHandler<HTMLButtonElement>;
	handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
	handleSubmitButtonClick: () => void;
	handleReset: ReactEventHandler<HTMLButtonElement>;
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Encapsulates all state and side-effects for the newsletter signup form.
 * The component itself only needs to call this hook and render the returned
 * state — making every visual state trivially reproducible in Storybook by
 * mocking this hook.
 */
export const useNewsletterSignupForm = (
	newsletterId: string,
	renderingTarget: RenderingTarget,
): NewsletterSignupFormState => {
	const recaptchaRef = useRef<ReactGoogleRecaptcha>(null);
	const [captchaSiteKey, setCaptchaSiteKey] = useState<string>();
	const [userEmail, setUserEmail] = useState<string>();
	const [hideEmailInput, setHideEmailInput] = useState(false);
	const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
	const [responseOk, setResponseOk] = useState<boolean | undefined>(
		undefined,
	);
	const [errorMessage, setErrorMessage] = useState<string | undefined>(
		undefined,
	);
	const [marketingOptIn, setMarketingOptIn] = useState<boolean | undefined>(
		undefined,
	);
	const [isInteracted, setIsInteracted] = useState(false);

	const isSignedIn = useIsSignedIn();
	const authStatus = useAuthStatus();
	const browserId = useBrowserId();

	useEffect(() => {
		if (isSignedIn !== 'Pending' && !isSignedIn) {
			setMarketingOptIn(true);
		}
	}, [isSignedIn]);

	useEffect(() => {
		setCaptchaSiteKey(window.guardian.config.page.googleRecaptchaSiteKey);
		void resolveEmailIfSignedIn().then((email) => {
			setUserEmail(email);
			setHideEmailInput(isString(email));
			if (isString(email)) {
				setIsInteracted(true);
			}
		});
	}, []);

	const submitForm = async (
		emailAddress: string,
		token: string,
	): Promise<void> => {
		sendTracking(newsletterId, 'form-submission', renderingTarget);

		const formData = buildFormData(
			emailAddress,
			newsletterId,
			token,
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

	const handleCaptchaComplete = (token: string | null): void => {
		if (!token) {
			sendTracking(newsletterId, 'captcha-not-passed', renderingTarget);
			setIsWaitingForResponse(false);
			return;
		}
		sendTracking(newsletterId, 'captcha-passed', renderingTarget);
		const emailAddress = userEmail?.trim() ?? '';
		submitForm(emailAddress, token).catch((error) => {
			// eslint-disable-next-line no-console -- unexpected error
			console.error(error);
			sendTracking(newsletterId, 'form-submit-error', renderingTarget);
			setErrorMessage('Sorry, there was an error signing you up.');
			setIsWaitingForResponse(false);
			recaptchaRef.current?.reset();
		});
	};

	const handleCaptchaLoadError = (): void => {
		sendTracking(newsletterId, 'captcha-load-error', renderingTarget);
		setErrorMessage('Sorry, the reCAPTCHA failed to load.');
		recaptchaRef.current?.reset();
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		if (isWaitingForResponse) return;

		const emailAddress = userEmail?.trim() ?? '';
		if (!emailAddress) {
			setErrorMessage('Please enter a valid email address.');
			return;
		}

		setErrorMessage(undefined);
		setIsWaitingForResponse(true);
		sendTracking(newsletterId, 'open-captcha', renderingTarget);
		recaptchaRef.current?.execute();
	};

	return {
		userEmail,
		isSignedIn: hideEmailInput,
		isInteracted,
		showMarketingToggle: isSignedIn === false,
		marketingOptIn,
		isWaitingForResponse,
		responseOk,
		errorMessage,
		recaptchaRef,
		captchaSiteKey,
		handleCaptchaComplete,
		handleCaptchaLoadError,
		handleEmailChange: (value) => {
			setUserEmail(value);
			setIsInteracted(true);
		},
		handleEmailFocus: () => setIsInteracted(true),
		handleMarketingToggle: (event) => {
			event.preventDefault();
			setMarketingOptIn((prev) => !prev);
		},
		handleSubmit,
		handleSubmitButtonClick: () =>
			sendTracking(newsletterId, 'click-button', renderingTarget),
		handleReset: () => {
			setErrorMessage(undefined);
			setResponseOk(undefined);
		},
	};
};
