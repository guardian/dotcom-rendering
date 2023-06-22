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
	const authStateStatus = useSignedInAuthState();

	useEffect(() => {
		if (authStateStatus.kind === 'Ready') {
			setSignedInStatus(
				authStateStatus.authState.isAuthenticated
					? 'SignedIn'
					: 'NotSignedIn',
			);
		}

		if (authStateStatus.kind === 'NotInTest') {
			setSignedInStatus(getSignedInStatusWithCookie());
		}
	}, [authStateStatus]);

	return signedInStatus;
};
