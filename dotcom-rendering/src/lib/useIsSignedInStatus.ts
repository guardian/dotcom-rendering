import { getCookie } from '@guardian/libs';
import { useEffect, useState } from 'react';

export type SignedInStatus = 'Pending' | 'NotSignedIn' | 'SignedIn';

async function getIsSignedInStatusWithOkta(): Promise<
	'NotSignedIn' | 'SignedIn'
> {
	const { isSignedInWithOkta } = await import('./identity');
	const isSignedIn = await isSignedInWithOkta();
	return isSignedIn ? 'SignedIn' : 'NotSignedIn';
}

function getIsSignedInStatusWithCookie(): 'NotSignedIn' | 'SignedIn' {
	const GU_UCookie = getCookie({ name: 'GU_U', shouldMemoize: true });
	return GU_UCookie === null || GU_UCookie === ''
		? 'NotSignedIn'
		: 'SignedIn';
}

//rename to useSignInStatus
export const useIsSignedInStatus = (): SignedInStatus => {
	const [isSignedInStatus, setIsSignedInStatus] =
		useState<SignedInStatus>('Pending');

	useEffect(() => {
		const isInOktaExperiment =
			window.guardian.config.tests.oktaVariant == 'variant';

		if (isInOktaExperiment) {
			getIsSignedInStatusWithOkta()
				.then((result) => {
					setIsSignedInStatus(result);
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			setIsSignedInStatus(getIsSignedInStatusWithCookie());
		}
	}, []);

	return isSignedInStatus;
};
