import { useEffect, useState } from 'react';
import type { AuthStatus } from './identity';
import {
	eitherInOktaTestOrElse,
	getSignedInStatusWithCookies,
	getSignedInStatusWithOkta,
} from './identity';

export const useAuthStatus = (): AuthStatus => {
	const [authStatus, setAuthStatus] = useState<AuthStatus>({
		kind: 'Pending',
	});

	useEffect(() => {
		eitherInOktaTestOrElse(
			(oktaAuthState) => {
				setAuthStatus(getSignedInStatusWithOkta(oktaAuthState));
			},
			() => setAuthStatus(getSignedInStatusWithCookies()),
		).catch((error) => {
			console.error(error);
		});
	}, []);

	return authStatus;
};
