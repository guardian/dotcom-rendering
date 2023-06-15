import { getCookie } from '@guardian/libs';
import { useEffect, useState } from 'react';

export type SignedInStatus = 'Pending' | 'NotSignedIn' | 'SignedIn';

async function getSignedInStatusWithOkta(): Promise<
	'NotSignedIn' | 'SignedIn'
> {
	const { isSignedInWithOkta } = await import('./identity');
	const isSignedIn = await isSignedInWithOkta();
	return isSignedIn ? 'SignedIn' : 'NotSignedIn';
}

function getSignedInStatusWithCookie(): 'NotSignedIn' | 'SignedIn' {
	const GU_UCookie = getCookie({ name: 'GU_U', shouldMemoize: true });
	return GU_UCookie === null || GU_UCookie === ''
		? 'NotSignedIn'
		: 'SignedIn';
}

export const useSignedInStatus = (): SignedInStatus => {
	const [signedInStatus, setSignedInStatus] =
		useState<SignedInStatus>('Pending');

	useEffect(() => {
		const isInOktaExperiment =
			window.guardian.config.tests.oktaVariant === 'variant';

		if (isInOktaExperiment) {
			getSignedInStatusWithOkta()
				.then((result) => {
					setSignedInStatus(result);
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			setSignedInStatus(getSignedInStatusWithCookie());
		}
	}, []);

	return signedInStatus;
};
