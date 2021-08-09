import { useEffect, useState } from 'react';

function checkNavigatorStatus(): boolean {
	if (
		typeof navigator !== 'undefined' &&
		typeof navigator.onLine === 'boolean'
	) {
		return navigator.onLine;
	}
	return true;
}

export function useOnlineStatus(): boolean {
	const [onlineStatus, setOnlineStatus] = useState(checkNavigatorStatus());

	const goOnline = (): void => setOnlineStatus(true);
	const goOffline = (): void => setOnlineStatus(false);

	useEffect(() => {
		window.addEventListener('online', goOnline);
		window.addEventListener('offline', goOffline);

		return (): void => {
			window.removeEventListener('online', goOnline);
			window.removeEventListener('offline', goOffline);
		};
	}, []);

	return onlineStatus;
}
