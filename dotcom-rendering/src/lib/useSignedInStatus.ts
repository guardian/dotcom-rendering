import { getCookie } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { useSignedInAuthState } from './useSignedInAuthState';

export type SignedInStatus = 'Pending' | 'NotSignedIn' | 'SignedIn';

function getSignedInStatusWithCookie(): 'NotSignedIn' | 'SignedIn' {
	const GU_UCookie = getCookie({ name: 'GU_U', shouldMemoize: true });
	return GU_UCookie === null || GU_UCookie === ''
		? 'NotSignedIn'
		: 'SignedIn';
}

export const useSignedInStatus = (): SignedInStatus => {
	const [signedInStatus, setSignedInStatus] =
		useState<SignedInStatus>('Pending');
	const [authStateStatus, authState] = useSignedInAuthState();

	useEffect(() => {
		if (authStateStatus === 'Ready') {
			setSignedInStatus(
				authState.isAuthenticated ? 'SignedIn' : 'NotSignedIn',
			);
		}

		if (authStateStatus === 'NotInTest') {
			setSignedInStatus(getSignedInStatusWithCookie());
		}
	}, [authState.isAuthenticated, authStateStatus]);

	return signedInStatus;
};
