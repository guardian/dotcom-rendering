import { loadScript, log } from '@guardian/libs';
import { useEffect } from 'react';
import { useIsSignedIn } from '../lib/useAuthStatus';

const getGSIConfiguration = (): { clientId: string; loginUri: string } => {
	switch (window.guardian.config.stage) {
		case 'PROD':
			return {
				clientId: 'PROD CLIENT ID',
				loginUri: 'https://profile.thegulocal.com/signin/google',
			};
		case 'CODE':
			return {
				clientId: 'CODE CLIENT ID',
				loginUri: 'https://profile.thegulocal.com/signin/google',
			};
		default:
			return {
				clientId:
					'774465807556-pkevncqpfs9486ms0bo5q1f2g9vhpior.apps.googleusercontent.com',
				loginUri: 'https://profile.thegulocal.com/signin/google',
			};
	}
};

const initializeGoogleOneTap = () => (response: { credential: string }) => {
	const { credential } = response;

	const queryParams = new URLSearchParams();
	queryParams.append('got', credential);
	queryParams.append('returnUrl', window.location.href);

	window.location.replace(
		`https://profile.thegulocal.com/signin/google?${queryParams.toString()}`,
	);
};

type PromptMomentNotification = {
	isSkippedMoment: () => boolean;
	isDismissedMoment: () => boolean;
	getDismissedReason: () =>
		| 'credential_returned'
		| 'cancel_called'
		| 'flow_restarted';
	getMomentType: () => 'display' | 'skipped' | 'dismissed';
};

export type GoogleIdentityService = {
	initialize: (config: {
		client_id: string;
		login_uri: string;
		callback: (response: { credential: string }) => void;
		auto_select?: boolean;
		cancel_on_tap_outside?: boolean;
		use_fedcm_for_prompt?: boolean;
	}) => void;
	prompt: (
		callback: (momentNotification: PromptMomentNotification) => void,
	) => void;
};

const loadGSI = async (): Promise<GoogleIdentityService> => {
	log('identity', 'Loading Google Sign-in Services (GSI)');
	// TODO: Can we invoke the built-in FedCM API instead of using GSI?
	// This would reduce our dpenedency on a third-party library and all of the privacy
	// implications that come with it. It would also save loading ~80KB of JS.
	await loadScript('https://accounts.google.com/gsi/client').catch((e) => {
		throw new Error(
			`Failed to initialize Google One Tap: failed to load GSI`,
			{ cause: e },
		);
	});

	if (!window.google?.accounts?.id) {
		throw new Error('Failed to initialize Google One Tap: GSI not found');
	}

	log('identity', 'Loaded Google Sign-in Services (GSI)');
	return window.google.accounts.id;
};

export const GoogleOneTap = () => {
	const isSignedIn = useIsSignedIn();

	useEffect(() => {
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

		const { clientId, loginUri } = getGSIConfiguration();

		void loadGSI().then((gsi) => {
			log('identity', 'Initializing Google One Tap', {
				clientId,
				loginUri,
			});

			gsi.initialize({
				client_id: clientId,
				login_uri: loginUri,
				callback: initializeGoogleOneTap,
				auto_select: true,
				cancel_on_tap_outside: false,
				use_fedcm_for_prompt: true,
			});

			log('identity', 'Requesting Google One Tap prompt');
			gsi.prompt((notifcation) => {
				// TODO: Handle tracking of the prompt moment notification. Ophan?
				log('identity', 'Google One Tap prompt notification received', {
					isSkippedMoment: notifcation.isSkippedMoment(),
					isDismissedMoment: notifcation.isDismissedMoment(),
					dismissedReason: notifcation.getDismissedReason(),
					momentType: notifcation.getMomentType(),
				});
			});
		});
	}, [isSignedIn]);

	return <></>;
};
