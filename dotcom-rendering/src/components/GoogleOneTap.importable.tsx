import { log } from '@guardian/libs';
import { useEffect } from 'react';
import { useAB } from '../lib/useAB';
import { useIsSignedIn } from '../lib/useAuthStatus';
import type { StageType } from '../types/config';

const getFedCMProviders = (stage: StageType): IdentityProviderConfig[] => {
	switch (stage) {
		// case 'PROD':
		// 	return [
		// 		{
		// 			configURL: 'https://accounts.google.com/gsi/fedcm.json',
		// 			clientId: '774465807556.apps.googleusercontent.com',
		// 		},
		// 	];
		// case 'CODE':
		// 	return [
		// 		{
		// 			configURL: 'https://accounts.google.com/gsi/fedcm.json',
		// 			clientId: '774465807556-pkevncqpfs9486ms0bo5q1f2g9vhpior.apps.googleusercontent.com',
		// 		},
		// 	];
		default:
			return [
				{
					configURL: 'https://accounts.google.com/gsi/fedcm.json',
					clientId:
						'774465807556-pkevncqpfs9486ms0bo5q1f2g9vhpior.apps.googleusercontent.com',
				},
			];
	}
};

type IdentityCredentials = {
	token: string;
};

type IdentityProviderConfig = {
	configURL: string;
	clientId: string;
};

type CredentialsProvider = {
	get: (options: {
		identity: {
			context: 'signin';
			providers: IdentityProviderConfig[];
		};
	}) => Promise<IdentityCredentials>;
};

export const GoogleOneTap = () => {
	const isSignedIn = useIsSignedIn();
	const abTests = useAB();
	const isUserInTest = abTests?.api.isUserInVariant(
		'GoogleOneTap',
		'variant',
	);

	useEffect(() => {
		// Only initialize Google One Tap if the user is in the AB test. Currently 0% of users are in the test.
		if (!isUserInTest) return;

		// FedCM has no knowledge of the user's auth state, so we need to check
		// if the user is already signed in before initializing it.
		if (isSignedIn === true) {
			log(
				'identity',
				'User is already signed in, skipping Google One Tap initialization',
			);
			return;
		} else if (isSignedIn === 'Pending') {
			// If the auth status is still pending, we don't want to initialize Google One Tap yet.
			log(
				'identity',
				'User auth state is still pending, delaying Google One Tap initialization',
			);
			return;
		}

		/**
		 * Typescripts built-in DOM types do not include the full `CredentialsProvider`
		 * interface, so we need to cast `window.navigator.credentials` to our own
		 * `CredentialsProvider` type which includes the FedCM API.
		 *
		 * Related issue: https://github.com/microsoft/TypeScript/issues/60641
		 */
		const credentialsProvider = window.navigator
			.credentials as unknown as CredentialsProvider;

		void credentialsProvider
			.get({
				identity: {
					context: 'signin',
					providers: getFedCMProviders(window.guardian.config.stage),
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
			})
			.then((credentials) => {
				if (credentials) {
					log('identity', 'FedCM credentials received', {
						credentials,
					});
				} else {
					log('identity', 'No FedCM credentials received');
				}
			});
	}, [isSignedIn, isUserInTest]);

	return <></>;
};
