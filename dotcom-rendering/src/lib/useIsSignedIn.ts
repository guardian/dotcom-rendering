import { getCookie } from '@guardian/libs';
import { useEffect, useState } from 'react';


export type SignedInStatus = 'Pending' | 'SignedOut' | 'SignedIn'

async function getIsSignedInStatusWithOkta(): Promise<'SignedOut' | 'SignedIn'> {
	const {isSignedInWithOkta} = await import('./identity')
	const isSignedIn = await isSignedInWithOkta()
	return isSignedIn ? 'SignedIn' : 'SignedOut';
}

function getIsSignedInStatusWithCookie(): 'SignedOut' | 'SignedIn' {
	const GU_UCookie = getCookie({ name: 'GU_U', shouldMemoize: true })
	return GU_UCookie === null || GU_UCookie === "" ? 'SignedOut' : 'SignedIn'
}

//rename to useSignInStatus
export const useIsSignedIn = (): SignedInStatus => {
	const [isSignedIn, setIsSignedIn] = useState<SignedInStatus>('Pending');
	console.log("isSignedIn at first", isSignedIn)

	useEffect(() => {
		const isInOktaExperiment =
			window.guardian.config.tests.oktaVariant == 'variant';

		if (isInOktaExperiment) {
			getIsSignedInStatusWithOkta()
				.then((result) => {
					setIsSignedIn(result);
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			setIsSignedIn(getIsSignedInStatusWithCookie());
		}
	}, []);
	console.log("is signed in after useeffect", isSignedIn)

	return isSignedIn;
};
