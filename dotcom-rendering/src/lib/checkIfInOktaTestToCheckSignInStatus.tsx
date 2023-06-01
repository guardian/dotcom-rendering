import { getCookie } from '@guardian/libs';
import { CheckUserSignInStatus } from './identity';

function useOkta() {
	import(
		/* webpackChunkName: "3044.modern.75ac511357ae17baae47.js" */ '@okta/okta-auth-js'
	);
	const isSignedIn = CheckUserSignInStatus();
	return isSignedIn;
}

function useCurrent() {
	const isSignedIn = !!getCookie({ name: 'GU_U', shouldMemoize: true });
	return isSignedIn;
}

export function checkIfInOktaTestToCheckSignInStatus() {
	if (typeof window !== 'undefined' && typeof document !== 'undefined') {
		const isInOktaExperiment = !!getCookie({
			name: 'X-GU-Experiment-0perc-E=true',
			shouldMemoize: true,
		});
		const isSignedIn = isInOktaExperiment ? useOkta() : useCurrent();
		return isSignedIn;
	} else {
		return false;
	}
}
