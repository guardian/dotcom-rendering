import { getCookie } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { isSignedInWithOkta } from './identity';

function doOktaMethodForSignIn() {
	return isSignedInWithOkta();
}

function doCookieMethodForSignIn() {
	const isSignedIn = !!getCookie({ name: 'GU_U', shouldMemoize: true });
	return isSignedIn;
}

export const useIsSignedIn = (): boolean => {
	const [isSignedIn, setIsSignedIn] = useState(false);
	console.log('at first', isSignedIn);

	useEffect(() => {
		const isInOktaExperiment = !!getCookie({
			name: 'X-GU-Experiment-0perc-E',
			shouldMemoize: true,
		});
		console.log('isInOktaExperiment', isInOktaExperiment);
		if (isInOktaExperiment) {
			doOktaMethodForSignIn()
				.then((result) => {
					setIsSignedIn(result);
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			setIsSignedIn(doCookieMethodForSignIn());
		}
	}, []);
	console.log('at end isSignedIn', isSignedIn);

	return isSignedIn;
};
