import type { CountryCode } from '@guardian/libs';
import { isObject, log } from '@guardian/libs';
import { submitComponentEvent } from '../client/ophan/ophan';
import type { Result } from '../lib/result';
import { error, ok } from '../lib/result';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { useConsent } from '../lib/useConsent';
import { useCountryCode } from '../lib/useCountryCode';
import { useOnce } from '../lib/useOnce';
import type { ServerSideTests, StageType, Switches } from '../types/config';

type IdentityProviderConfig = {
	configURL: string;
	clientId: string;
};

type CredentialsProvider = {
	get: (options: {
		mediation: 'required';
		identity: {
			context: 'continue';
			providers: IdentityProviderConfig[];
		};
	}) => Promise<{ token: string }>;
};

export const isGoogleOneTapEnabled = (
	tests: ServerSideTests,
	switches: Switches,
): boolean =>
	tests['googleOneTapVariant'] === 'variant' ||
	switches['googleOneTapSwitch'] === true;

/**
 * Detect the current stage of the application based on the hostname.
 *
 * We do have a `window.guardian.config.stage` field, but it is based on the
 * environment of the article that DCR is rendering, which may not be the same as environment
 * DCR is running in.
 *
 * For example, running DCR locally and loading `https://r.thegulocal.com/Front/https://www.theguardian.com/international` will
 * give a stage of `PROD` as the article is in PROD, but DCR is running in `DEV`.
 */
const getStage = (hostname: string): StageType => {
	if (window.location.hostname === 'm.code.dev-theguardian.com') {
		return 'CODE';
	} else if (['r.thegulocal.com', 'localhost'].includes(hostname)) {
		return 'DEV';
	}

	return 'PROD';
};

/**
 * Extract the readers email address from a JWT token.
 *
 * As we're not using the token for authentication we don't need to verify the signature,
 * if the user wants to spoof a token it doesn't matter as they can only sign in as themselves.
 *
 * @param token A JWT Token
 * @returns extracted email address
 */
export const extractEmailFromToken = (
	token: string,
): Result<'ParsingError', string> => {
	const payload = token.split('.')[1];
	if (!payload) return error('ParsingError');
	try {
		const decoded = atob(payload);
		const parsed = JSON.parse(decoded) as unknown;
		if (!isObject(parsed) || typeof parsed.email !== 'string') {
			return error('ParsingError');
		}
		return ok(parsed.email);
	} catch (e) {
		return error('ParsingError');
	}
};

export const getRedirectUrl = ({
	stage,
	signInEmail,
	currentLocation,
}: {
	stage: StageType;
	signInEmail: string;
	currentLocation: string;
}): string => {
	const profileDomain = {
		PROD: 'https://profile.theguardian.com',
		CODE: 'https://profile.code.dev-theguardian.com',
		DEV: 'https://profile.thegulocal.com',
	}[stage];
	const queryParams = new URLSearchParams({
		signInEmail,
		returnUrl: currentLocation,
	});

	return `${profileDomain}/signin/google?${queryParams.toString()}`;
};

const getProviders = (stage: StageType): IdentityProviderConfig[] => {
	switch (stage) {
		case 'PROD':
			return [
				{
					configURL: 'https://accounts.google.com/gsi/fedcm.json',
					clientId:
						'774465807556-4d50ur6svcjj90l7fe6i0bnp4t4qhkga.apps.googleusercontent.com',
				},
			];
		case 'CODE':
		case 'DEV':
			return [
				{
					configURL: 'https://accounts.google.com/gsi/fedcm.json',
					clientId:
						'774465807556-h24eigcs027mj7sunatfem926c4310jo.apps.googleusercontent.com',
				},
			];
	}
};

const ENABLED_COUNTRIES: CountryCode[] = ['IE', 'NZ'];

export const initializeFedCM = async ({
	isSignedIn,
	countryCode,
}: {
	isSignedIn?: boolean;
	countryCode?: CountryCode;
}): Promise<void> => {
	// If the window doesn't support "hover" interactions we assume its a touch only device (e.g. mobile)
	// and we don't show Google One Tap. This is because mobile browsers render Google One Tap differently
	// which can potentially cover the reader revenue banner and lead to a poor user experience.
	const isSupported =
		'IdentityCredential' in window &&
		window.matchMedia('(any-hover: hover)').matches;

	void submitComponentEvent(
		{
			action: 'DETECT',
			component: {
				componentType: 'SIGN_IN_GOOGLE_ONE_TAP',
			},
			value: isSupported ? 'SUPPORTED' : 'NOT_SUPPORTED',
		},
		'Web',
	);

	// TODO: Expand Google One Tap to outside Ireland
	if (!countryCode || !ENABLED_COUNTRIES.includes(countryCode)) return;
	if (isSignedIn) return;

	/**
	 * Firefox does not support the FedCM API at the time of writting,
	 * and it seems like it will not support it in the near future.
	 *
	 * Instead they're focusing on an alternative API called "Lightweight FedCM"
	 * which may not support Google One Tap.
	 *
	 * See: https://bugzilla.mozilla.org/show_bug.cgi?id=1803629
	 */
	if (!isSupported) {
		log('identity', 'FedCM API not supported in this browser');
		return;
	}

	const stage = getStage(window.location.hostname);

	/**
	 * Typescripts built-in DOM types do not include the full `CredentialsProvider`
	 * interface, so we need to cast `window.navigator.credentials` to our own
	 * `CredentialsProvider` type which includes the FedCM API.
	 *
	 * Related issue: https://github.com/microsoft/TypeScript/issues/60641
	 */
	const credentialsProvider = window.navigator
		.credentials as unknown as CredentialsProvider;

	const credentials = await credentialsProvider
		.get({
			/**.
			 * Default `mediation` is "optional" which auto-authenticates the user if they have already interacted with FedCM
			 * prompt on a previous page view.
			 *
			 * In practice this shouldn't happen as we won't trigger the prompt if the user is already signed in. But just in
			 * case, we set `mediation` to "required" to ensure the user isn't put in a login loop where they are signed in,
			 * FedCM auto-authenticates them, and they're sent to Gateway to get a new Okta token.
			 */
			mediation: 'required',
			identity: {
				context: 'continue',
				providers: getProviders(stage),
			},
		})
		.catch((e) => {
			/**
			 * The fedcm API hides issues with the user's federated login state
			 * behind a generic NetworkError. This error is thrown up to 60
			 * seconds after the prompt is triggered to avoid timing attacks.
			 *
			 * This allows the browser to avoid leaking sensitive information
			 * about the user's login state to the website.
			 *
			 * Unfortunately for us it means we can't differentiate between
			 * a genuine network error and a user declining the FedCM prompt.
			 */
			if (e instanceof Error && e.name === 'NetworkError') {
				log(
					'identity',
					'FedCM prompt failed, potentially due to user declining',
				);
			} else {
				throw e;
			}
		});

	if (credentials) {
		log('identity', 'FedCM credentials received');

		const signInEmail = extractEmailFromToken(credentials.token).getOrThrow(
			'Failed to extract email from FedCM token',
		);

		await submitComponentEvent(
			{
				action: 'SIGN_IN',
				component: {
					componentType: 'SIGN_IN_GOOGLE_ONE_TAP',
				},
			},
			'Web',
		);

		window.location.replace(
			getRedirectUrl({
				stage,
				signInEmail,
				currentLocation: window.location.href,
			}),
		);
	} else {
		void submitComponentEvent(
			{
				action: 'CLOSE',
				component: {
					componentType: 'SIGN_IN_GOOGLE_ONE_TAP',
				},
			},
			'Web',
		);
		log('identity', 'No FedCM credentials received');
	}
};

export const GoogleOneTap = () => {
	// We don't care what consent we get, we just want to make sure Google One Tap is not shown above the consent banner.
	const consent = useConsent();
	const isSignedIn = useIsSignedIn();
	const countryCode = useCountryCode('google-one-tap');
	// useIsSignedIn returns 'Pending' until the auth status is known.
	// We don't want to initialize FedCM until we know the auth status, so we pass `undefined` to `useOnce` if it is 'Pending'
	// to stop it from initializing.
	const isSignedInWithoutPending =
		isSignedIn !== 'Pending' ? isSignedIn : undefined;

	useOnce(() => {
		void initializeFedCM({
			isSignedIn: isSignedInWithoutPending,
			countryCode,
		});
	}, [isSignedInWithoutPending, consent]);

	return <></>;
};
