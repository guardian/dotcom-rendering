import { getCookie } from '@guardian/libs';
import { useEffect, useState } from 'react';

async function getIsSignedInStatusWithOkta() {
	return (await import('./identity')).isSignedInWithOkta();
}

function getIsSignedInStatusWithCookie() {
	return !!getCookie({ name: 'GU_U', shouldMemoize: true });
}

export const useIsSignedIn = (): boolean => {
	const [isSignedIn, setIsSignedIn] = useState(false);

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

	return isSignedIn;
};
