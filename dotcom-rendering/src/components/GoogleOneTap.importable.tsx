import { loadScript } from '@guardian/libs';
import { useEffect } from 'react';
import { useIsSignedIn } from '../lib/useAuthStatus';

export const GoogleOneTap = () => {
	const isSignedIn = useIsSignedIn();
	console.log('GoogleOneTap component');
	useEffect(() => {
		console.log('isSignedIn', isSignedIn);
		console.log('window.location.origin', window.location.origin);
		if (
			window.location.origin !== 'https://r.thegulocal.com' ||
			// Only show the Google One Tap prompt if the user is not signed in and isSignedIn is not 'Pending'
			isSignedIn !== false
		) {
			return;
		}

		console.log('loading google one tap');

		loadScript('https://accounts.google.com/gsi/client')
			.then(() => {
				if (window.google) {
					window.google.accounts.id.initialize({
						client_id:
							'774465807556-pkevncqpfs9486ms0bo5q1f2g9vhpior.apps.googleusercontent.com',
						login_uri: 'https://r.thegulocal.com/',
						callback: (response: { credential: string }) => {
							console.log('callback', response);
							const { credential } = response;
							const queryParams = new URLSearchParams();
							queryParams.append('got', credential);
							queryParams.append(
								'returnUrl',
								window.location.href,
							);
							console.log(
								`https://profile.thegulocal.com/signin/google?${queryParams.toString()}`,
							);
							window.location.replace(
								`https://profile.thegulocal.com/signin/google?${queryParams.toString()}`,
							);
						},
						auto_select: false,
						cancel_on_tap_outside: false,
						use_fedcm_for_prompt: true,
					});
					window.google.accounts.id.prompt();
				}
			})
			.catch((e) => console.log(e));
	}, [isSignedIn]);

	return <></>;
};
