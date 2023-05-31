import { getCookie } from '@guardian/libs';
import { CheckUserSignInStatus } from './identity';

export function checkIfInOktaTestToCheckSignInStatus() {
	const isInOktaExperiment = window.guardian.config.switches.okta == true;
	const isSignedIn = isInOktaExperiment
		? CheckUserSignInStatus()
		: !!getCookie({ name: 'GU_U', shouldMemoize: true });
	return isSignedIn;
}
