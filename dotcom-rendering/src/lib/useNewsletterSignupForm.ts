import { isString } from '@guardian/libs';
import type { TAction } from '@guardian/ophan-tracker-js';
import type { FormEvent, ReactEventHandler, RefObject } from 'react';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
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
	if (window.guardian.config.switches.emailSignupRecaptcha) {
		formData.append('g-recaptcha-response', token);
	}

	if (marketingOptIn !== undefined) {
		formData.append('marketing', marketingOptIn ? 'true' : 'false');
	}

	if (browserId !== undefined) {
		formData.append('browserId', browserId);
	}

	return formData;
};

/**
 * Fetch the user's email from Identity if they are signed in.
 *
 * Previously named `resolveEmailIfSignedIn`, but only checked that `idApiUrl`
 * was configured — it would fire for every visitor. Now it takes the real
 * sign-in state and bails out for signed-out / pending users.
 */
const resolveUserEmail = async (
	isSignedIn: boolean | 'Pending',
): Promise<string | undefined> => {
	if (isSignedIn !== true) return;
	const { idApiUrl } = window.guardian.config.page;
	if (!idApiUrl) return;
	const fetchedEmail = await lazyFetchEmailWithTimeout()();
	return fetchedEmail ?? undefined;
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

const actionForEventDescription = (
	eventDescription: EventDescription,
): TAction => {
	switch (eventDescription) {
		case 'form-submission':
		case 'captcha-not-passed':
		case 'captcha-passed':
			return 'ANSWER';
		case 'submission-confirmed':
			return 'SUBSCRIBE';
		case 'captcha-load-error':
		case 'form-submit-error':
		case 'submission-failed':
			return 'CLOSE';
		case 'open-captcha':
			return 'EXPAND';
		case 'click-button':
			return 'CLICK';
	}
};

const sendTracking = (
	newsletterId: string,
	eventDescription: EventDescription,
	renderingTarget: RenderingTarget,
): void => {
	const value = JSON.stringify({
		eventDescription,
		newsletterId,
		timestamp: Date.now(),
	});

	void submitComponentEvent(
		{
			action: actionForEventDescription(eventDescription),
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
	 * `true` once we've successfully pre-filled the email from Identity, which
	 * means the email `<input>` should be hidden.
	 *
	 * NOTE: this is NOT the same as "the user is signed in" — the Identity
	 * fetch can fail or time out even for signed-in users. Consumers that
	 * need the real sign-in state should call `useIsSignedIn` directly.
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
	/**
	 * `true` when the error should be shown inline on the email input
	 * (e.g. empty field, bad format).  `false` for reCAPTCHA / network
	 * errors, which are shown as a standalone message below the form.
	 */
	isValidationError: boolean;

	/** Ref to pass to the `<ReactGoogleRecaptcha>` widget. */
	recaptchaRef: RefObject<ReactGoogleRecaptcha>;
	/** Site key for the reCAPTCHA widget — `undefined` until resolved. */
	captchaSiteKey: string | undefined;
	/** Pass to `ReactGoogleRecaptcha`'s `onChange` prop. */
	handleCaptchaComplete: (token: string | null) => void;
	/** Pass to `ReactGoogleRecaptcha`'s `onError` prop. */
	handleCaptchaLoadError: () => void;

	// Event handlers
	handleEmailChange: (value: string) => void;
	handleEmailFocus: () => void;
	handleEmailInvalid: React.FormEventHandler<HTMLInputElement>;
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
	const [hasPrefilledEmail, setHasPrefilledEmail] = useState(false);
	const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
	const [responseOk, setResponseOk] = useState<boolean | undefined>(
		undefined,
	);
	const [errorMessage, setErrorMessage] = useState<string | undefined>(
		undefined,
	);
	const [isValidationError, setIsValidationError] = useState(false);
	const [marketingOptIn, setMarketingOptIn] = useState<boolean | undefined>(
		undefined,
	);
	const [isInteracted, setIsInteracted] = useState(false);

	const isSignedIn = useIsSignedIn();
	const authStatus = useAuthStatus();
	const browserId = useBrowserId();

	// Refs that mirror state — read inside submit handlers so we always see the
	// latest value rather than whatever was captured when the handler was
	// created. This avoids the stale-closure bug where a user could toggle
	// marketing opt-in between pressing Sign Up and the captcha resolving.
	const marketingOptInRef = useRef(marketingOptIn);
	const browserIdRef = useRef(browserId);
	const authStatusRef = useRef(authStatus);
	useEffect(() => {
		marketingOptInRef.current = marketingOptIn;
	}, [marketingOptIn]);
	useEffect(() => {
		browserIdRef.current = browserId;
	}, [browserId]);
	useEffect(() => {
		authStatusRef.current = authStatus;
	}, [authStatus]);

	// The email address that was validated at submit-time. We stash it in a
	// ref and read it back when the captcha resolves, so it can't change out
	// from under us between validation and POST.
	const pendingEmailRef = useRef<string | undefined>(undefined);

	// Track whether the user has attempted to submit, so we only show inline
	// validation errors from the `invalid` event after a submit attempt —
	// not on focus/blur or other browser-triggered validity checks.
	const hasAttemptedSubmitRef = useRef(false);

	// Default marketing opt-in to `true` for signed-out users, but only once —
	// guard with a ref so flipping `isSignedIn` later (e.g. token expiry)
	// doesn't overwrite the user's choice.
	const marketingDefaultAppliedRef = useRef(false);
	useEffect(() => {
		if (marketingDefaultAppliedRef.current) return;
		if (isSignedIn === 'Pending') return;
		if (!isSignedIn) {
			setMarketingOptIn(true);
		}
		marketingDefaultAppliedRef.current = true;
	}, [isSignedIn]);

	// Pre-fill the email from Identity once sign-in status is known.
	// Guarded with a ref so we don't re-fetch if the hook re-mounts or
	// `isSignedIn` briefly flips.
	const emailFetchStartedRef = useRef(false);
	useEffect(() => {
		setCaptchaSiteKey(window.guardian.config.page.googleRecaptchaSiteKey);
	}, []);
	useEffect(() => {
		if (emailFetchStartedRef.current) return;
		if (isSignedIn === 'Pending') return;
		emailFetchStartedRef.current = true;

		void resolveUserEmail(isSignedIn).then((email) => {
			if (!isString(email)) return;
			setUserEmail(email);
			setHasPrefilledEmail(true);
			setIsInteracted(true);
		});
	}, [isSignedIn]);

	const submitForm = useCallback(
		async (emailAddress: string, token: string): Promise<void> => {
			sendTracking(newsletterId, 'form-submission', renderingTarget);

			const formData = buildFormData(
				emailAddress,
				newsletterId,
				token,
				marketingOptInRef.current,
				browserIdRef.current,
			);

			const response = await postFormData(
				window.guardian.config.page.ajaxUrl + '/email',
				formData,
			);

			try {
				if (response.ok && authStatusRef.current.kind === 'SignedIn') {
					clearSubscriptionCache();
				}
			} catch (error) {
				// Don't let a cache-clear failure block the UI state update below.
				// eslint-disable-next-line no-console -- unexpected error
				console.error(error);
			}

			setResponseOk(response.ok);

			sendTracking(
				newsletterId,
				response.ok ? 'submission-confirmed' : 'submission-failed',
				renderingTarget,
			);
		},
		[newsletterId, renderingTarget],
	);

	const handleCaptchaComplete = useCallback(
		(token: string | null): void => {
			if (!token) {
				sendTracking(
					newsletterId,
					'captcha-not-passed',
					renderingTarget,
				);
				setIsValidationError(false);
				setErrorMessage('The reCAPTCHA check did not complete.');
				setIsWaitingForResponse(false);
				recaptchaRef.current?.reset();
				return;
			}
			sendTracking(newsletterId, 'captcha-passed', renderingTarget);
			// Read the email that was validated at submit-time — not the
			// current value, which may have been edited since.
			const emailAddress = pendingEmailRef.current ?? '';
			submitForm(emailAddress, token)
				.catch((error) => {
					// eslint-disable-next-line no-console -- unexpected error
					console.error(error);
					sendTracking(
						newsletterId,
						'form-submit-error',
						renderingTarget,
					);
					setIsValidationError(false);
					setErrorMessage(
						'Sorry, there was an error signing you up.',
					);
					recaptchaRef.current?.reset();
				})
				.finally(() => {
					setIsWaitingForResponse(false);
				});
		},
		[newsletterId, renderingTarget, submitForm],
	);

	const handleCaptchaLoadError = useCallback((): void => {
		sendTracking(newsletterId, 'captcha-load-error', renderingTarget);
		setIsValidationError(false);
		setErrorMessage('Sorry, the reCAPTCHA failed to load.');
		setIsWaitingForResponse(false);
		recaptchaRef.current?.reset();
	}, [newsletterId, renderingTarget]);

	const handleSubmit = useCallback(
		(event: FormEvent<HTMLFormElement>): void => {
			event.preventDefault();
			if (isWaitingForResponse) return;

			const emailAddress = userEmail?.trim() ?? '';
			if (!emailAddress) {
				setIsValidationError(true);
				setErrorMessage('Please enter your email address.');
				return;
			}

			pendingEmailRef.current = emailAddress;
			setIsValidationError(false);
			setErrorMessage(undefined);
			setIsWaitingForResponse(true);
			sendTracking(newsletterId, 'open-captcha', renderingTarget);
			recaptchaRef.current?.execute();
		},
		[isWaitingForResponse, newsletterId, renderingTarget, userEmail],
	);

	const handleEmailChange = useCallback((value: string): void => {
		setUserEmail(value);
		setIsInteracted(true);
		setIsValidationError(false);
		setErrorMessage(undefined);
	}, []);

	const handleEmailFocus = useCallback((): void => {
		setIsInteracted(true);
	}, []);

	const handleEmailInvalid = useCallback<
		React.FormEventHandler<HTMLInputElement>
	>((event) => {
		event.preventDefault();
		if (!hasAttemptedSubmitRef.current) return;
		const { validity } = event.currentTarget;
		setIsValidationError(true);
		setErrorMessage(
			validity.valueMissing
				? 'Please enter your email address.'
				: 'Incorrect email format. Please check.',
		);
	}, []);

	const handleMarketingToggle = useCallback<
		ReactEventHandler<HTMLButtonElement>
	>((event) => {
		event.preventDefault();
		setMarketingOptIn((prev) => !prev);
	}, []);

	const handleSubmitButtonClick = useCallback((): void => {
		hasAttemptedSubmitRef.current = true;
		sendTracking(newsletterId, 'click-button', renderingTarget);
	}, [newsletterId, renderingTarget]);

	const handleReset = useCallback<
		ReactEventHandler<HTMLButtonElement>
	>(() => {
		setIsValidationError(false);
		setErrorMessage(undefined);
		setResponseOk(undefined);
		hasAttemptedSubmitRef.current = false;
		recaptchaRef.current?.reset();
	}, []);

	return {
		userEmail,
		isSignedIn: hasPrefilledEmail,
		isInteracted,
		showMarketingToggle: isSignedIn === false,
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
	};
};
