/* eslint-disable react-hooks/rules-of-hooks -- temporary to just see impact of logic in code*/
import { getCookie } from '@guardian/libs';
import { useState } from 'react';
// import { CheckUserSignInStatus } from './identity';

function doOktaMethodForSignIn() {
	console.log('doOktaMethodForSignIn called');
	const [signInStatus, setSignInStatus] = useState(false);

	const loadOktaForSignInCheck = async () => {
		console.log('doOkta called');
		// await import('./identity');

		const { CheckUserSignInStatus } = await import('./identity');
		return CheckUserSignInStatus();
	};

	loadOktaForSignInCheck()
		.then((result) => {
			setSignInStatus(result);
			console.log('result', result);
			console.log('signInStatus after setting the result', signInStatus);
		})
		.catch((error) => {
			console.error('error', error);
		});

	const isSignedIn = signInStatus;
	// const isSignedIn = CheckUserSignInStatus();
	console.log('isSignedIn at the end of useOktaForSignIn', isSignedIn);
	return isSignedIn;
}

//Commented out for testing
// function doCookieMethodForSignIn() {
// 	console.log('doCookieMethodForSignIn called');
// 	const isSignedIn = !!getCookie({ name: 'GU_U', shouldMemoize: true });
// 	return isSignedIn;
// }

export function checkIfInOktaTestToCheckSignInStatus() {
	console.log('checkIfInOktaTestToCheckSignInStatus called');

	if (typeof window !== 'undefined' && typeof document !== 'undefined') {
		console.log('window and document are defined');
		const isInOktaExperiment = !!getCookie({
			name: 'X-GU-Experiment-0perc-E',
			shouldMemoize: true,
		});
		console.log('isInOktaExperiment', isInOktaExperiment);
		const isSignedIn = isInOktaExperiment
			? doOktaMethodForSignIn()
			: // : doCookieMethodForSignIn(); //commented out to make it easier to test
			  doOktaMethodForSignIn();
		return isSignedIn;
	} else {
		console.log(
			'window and document are not defined so just returning false',
		);
		return false;
	}
}
