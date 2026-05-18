import { isString } from '@guardian/libs';
import type { AbTest } from '@guardian/ophan-tracker-js';
import type { FormEvent, ReactEventHandler, RefObject } from 'react';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type ReactGoogleRecaptcha from 'react-google-recaptcha';
import type { RenderingTarget } from '../types/renderingTarget';
import { lazyFetchEmailWithTimeout } from './fetchEmail';
import { requestSingleSignUp } from './newsletter-sign-up-requests';
import {
	EVENT_DESCRIPTION_TO_ACTION,
	NEWSLETTER_SIGNUP_COMPONENT_ID,
	type NewsletterEventDescription,
	sendNewsletterSignupEvent,
} from './newsletterSignupTracking';
import { clearSubscriptionCache } from './newsletterSubscriptionCache';
import { useAuthStatus, useIsSignedIn } from './useAuthStatus';
import { useBrowserId } from './useBrowserId';

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
	if (idApiUrl === undefined || idApiUrl === '') return;
	const fetchedEmail = await lazyFetchEmailWithTimeout()();
	return fetchedEmail ?? undefined;
};

const sendTracking = (
	newsletterId: string,
	eventDescription: NewsletterEventDescription,
	renderingTarget: RenderingTarget,
	abTest?: AbTest,
	marketingOptInType?: string,
): void => {
	sendNewsletterSignupEvent({
		action: EVENT_DESCRIPTION_TO_ACTION[eventDescription],
		identityName: newsletterId,
		componentId: NEWSLETTER_SIGNUP_COMPONENT_ID.variant(newsletterId),
		renderingTarget,
		value: {
			eventDescription,
			...(marketingOptInType !== undefined && { marketingOptInType }),
		},
		abTest,
	});
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
	/** `true` when the marketing toggle should be shown. */
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
	abTest?: AbTest,
	showMarketingToggle = true,
	countryCode?: string,
): NewsletterSignupFormState => {
	const recaptchaRef = useRef<ReactGoogleRecaptcha>(null);
	const [captchaSiteKey] = useState<string | undefined>(
		window.guardian.config.page.googleRecaptchaSiteKey,
	);
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
	const effectiveMarketingOptIn =
		marketingOptIn ?? (isSignedIn !== true ? true : undefined);

	// Refs that mirror state — read inside submit handlers so we always see the
	// latest value rather than whatever was captured when the handler was
	// created. This avoids the stale-closure bug where a user could toggle
	// marketing opt-in between pressing Sign Up and the captcha resolving.
	const marketingOptInRef = useRef(effectiveMarketingOptIn);
	const browserIdRef = useRef(browserId);
	const authStatusRef = useRef(authStatus);
	const showMarketingToggleRef = useRef(showMarketingToggle);
	const countryCodeRef = useRef(countryCode);
	useEffect(() => {
		marketingOptInRef.current = effectiveMarketingOptIn;
	}, [effectiveMarketingOptIn]);
	useEffect(() => {
		browserIdRef.current = browserId;
	}, [browserId]);
	useEffect(() => {
		authStatusRef.current = authStatus;
	}, [authStatus]);
	useEffect(() => {
		showMarketingToggleRef.current = showMarketingToggle;
	}, [showMarketingToggle]);
	useEffect(() => {
		countryCodeRef.current = countryCode;
	}, [countryCode]);

	// The email address that was validated at submit-time. We stash it in a
	// ref and read it back when the captcha resolves, so it can't change out
	// from under us between validation and POST.
	const pendingEmailRef = useRef<string | undefined>(undefined);

	// Track whether the user has attempted to submit, so we only show inline
	// validation errors from the `invalid` event after a submit attempt —
	// not on focus/blur or other browser-triggered validity checks.
	const hasAttemptedSubmitRef = useRef(false);

	// Pre-fill the email from Identity once sign-in status is known.
	// Guarded with a ref so we don't re-fetch if the hook re-mounts or
	// `isSignedIn` briefly flips.
	const emailFetchStartedRef = useRef(false);
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
			sendTracking(
				newsletterId,
				'form-submission',
				renderingTarget,
				abTest,
			);

			const locationHidesToggle = !showMarketingToggleRef.current;

			const getMarketingOptInType = (): string | undefined => {
				if (locationHidesToggle) {
					return 'similar-guardian-products-hidden-optin-us';
				}
				const currentMarketingOptIn = marketingOptInRef.current ?? true;
				return currentMarketingOptIn
					? 'similar-guardian-products-optin'
					: 'similar-guardian-products-optout';
			};

			const response = await requestSingleSignUp({
				emailAddress,
				newsletterId,
				recaptchaToken: token,
				marketingOptIn: locationHidesToggle
					? true
					: marketingOptInRef.current,
				browserId: browserIdRef.current,
				marketingOptInHidden: locationHidesToggle ? true : undefined,
				countryCode: locationHidesToggle
					? countryCodeRef.current
					: undefined,
			});

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
				abTest,
				getMarketingOptInType(),
			);
		},
		[abTest, newsletterId, renderingTarget],
	);

	const handleCaptchaComplete = useCallback(
		(token: string | null): void => {
			if (token === null || token === '') {
				sendTracking(
					newsletterId,
					'captcha-not-passed',
					renderingTarget,
					abTest,
				);
				setIsValidationError(false);
				setErrorMessage('The reCAPTCHA check did not complete.');
				setIsWaitingForResponse(false);
				recaptchaRef.current?.reset();
				return;
			}
			sendTracking(
				newsletterId,
				'captcha-passed',
				renderingTarget,
				abTest,
			);
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
						abTest,
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
		[abTest, newsletterId, renderingTarget, submitForm],
	);

	const handleCaptchaLoadError = useCallback((): void => {
		sendTracking(
			newsletterId,
			'captcha-load-error',
			renderingTarget,
			abTest,
		);
		setIsValidationError(false);
		setErrorMessage('Sorry, the reCAPTCHA failed to load.');
		setIsWaitingForResponse(false);
		recaptchaRef.current?.reset();
	}, [abTest, newsletterId, renderingTarget]);

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
			sendTracking(newsletterId, 'open-captcha', renderingTarget, abTest);
			recaptchaRef.current?.execute();
		},
		[
			abTest,
			isWaitingForResponse,
			newsletterId,
			renderingTarget,
			userEmail,
		],
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
		setMarketingOptIn((prev) => !(prev ?? true));
	}, []);

	const handleSubmitButtonClick = useCallback((): void => {
		hasAttemptedSubmitRef.current = true;
		sendTracking(newsletterId, 'click-button', renderingTarget, abTest);
	}, [abTest, newsletterId, renderingTarget]);

	const handleReset = useCallback<
		ReactEventHandler<HTMLButtonElement>
	>(() => {
		setIsValidationError(false);
		setErrorMessage(undefined);
		setResponseOk(undefined);
		hasAttemptedSubmitRef.current = false;
		recaptchaRef.current?.reset();
	}, []);

	const effectiveShowMarketingToggle =
		showMarketingToggle && isSignedIn !== true;

	return {
		userEmail,
		isSignedIn: hasPrefilledEmail,
		isInteracted,
		showMarketingToggle: effectiveShowMarketingToggle,
		marketingOptIn: effectiveMarketingOptIn,
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
