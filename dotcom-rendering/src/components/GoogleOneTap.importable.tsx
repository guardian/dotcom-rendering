import { log } from '@guardian/libs';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { useConsent } from '../lib/useConsent';
import { useOnce } from '../lib/useOnce';
import type { ServerSideTests, StageType } from '../types/config';

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

export const isInGoogleOneTapTest = (tests: ServerSideTests): boolean =>
	tests['googleOneTapVariant'] === 'variant';

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

export const getRedirectUrl = ({
	stage,
	token,
	currentLocation,
}: {
	stage: StageType;
	token: string;
	currentLocation: string;
}): string => {
	const profileDomain = {
		PROD: 'https://profile.theguardian.com',
		CODE: 'https://profile.code.dev-theguardian.com',
		DEV: 'https://profile.thegulocal.com',
	}[stage];
	const queryParams = new URLSearchParams({
		token,
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

export const initializeFedCM = async ({
	isSignedIn,
}: {
	isSignedIn?: boolean;
	isInTest?: boolean;
}): Promise<void> => {
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
	if (!('IdentityCredential' in window)) {
		// TODO: Track Ophan "FedCM" unsupported event here.
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
		.catch((error) => {
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
			if (error instanceof Error && error.name === 'NetworkError') {
				log(
					'identity',
					'FedCM prompt failed, potentially due to user declining',
				);
			} else {
				throw error;
			}
		});

	if (credentials) {
		// TODO: Track Ophan "FedCM" success event here.
		log('identity', 'FedCM credentials received', {
			credentials,
		});

		window.location.replace(
			getRedirectUrl({
				stage,
				token: credentials.token,
				currentLocation: window.location.href,
			}),
		);
	} else {
		// TODO: Track Ophan "FedCM" skip event here.
		log('identity', 'No FedCM credentials received');
	}
};

// TODO: GoogleOneTap is currently only used on the front page, but we do probably want to use it on other pages in the future.
export const GoogleOneTap = () => {
	// We don't care what consent we get, we just want to make sure Google One Tap is not shown above the consent banner.
	// TODO: FedCM doesn't require cookies? Do we need to check consent?
	const consent = useConsent();
	const isSignedIn = useIsSignedIn();
	// useIsSignedIn returns 'Pending' until the auth status is known.
	// We don't want to initialize FedCM until we know the auth status, so we pass `undefined` to `useOnce` if it is 'Pending'
	// to stop it from initializing.
	const isSignedInWithoutPending =
		isSignedIn !== 'Pending' ? isSignedIn : undefined;

	useOnce(() => {
		void initializeFedCM({
			isSignedIn: isSignedInWithoutPending,
		});
	}, [isSignedInWithoutPending, consent]);

	return <></>;
};
