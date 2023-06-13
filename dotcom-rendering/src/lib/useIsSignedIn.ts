import { getCookie } from '@guardian/libs';
import { useEffect, useState } from 'react';

async function doOktaMethodForSignIn() {
	const identityModule = await import('./identity');
	return identityModule.isSignedInWithOkta();
}

function doCookieMethodForSignIn() {
	const isSignedIn = !!getCookie({ name: 'GU_U', shouldMemoize: true });
	return isSignedIn;
}

export const useIsSignedIn = (): boolean => {
	const [isSignedIn, setIsSignedIn] = useState(false);

	useEffect(() => {
		const isInOktaExperiment =
			window.guardian.config.tests.oktaVariant == 'variant';

		if (isInOktaExperiment) {
			doOktaMethodForSignIn()
				.then((result) => {
					setIsSignedIn(result);
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			setIsSignedIn(doCookieMethodForSignIn());
		}
	}, []);

	return isSignedIn;
};
