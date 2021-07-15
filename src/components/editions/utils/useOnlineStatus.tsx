import { useEffect, useState } from 'react';

const useOnlineStatus = (): boolean => {
	const [onlineStatus, setOnlineStatus] = useState<boolean>(true);

	const setOnline = (): void => {
		setOnlineStatus(true);
	};
	const setOffline = (): void => {
		setOnlineStatus(false);
	};

	useEffect(() => {
		window.addEventListener('offline', setOffline);
		window.addEventListener('online', setOnline);

		return (): void => {
			window.removeEventListener('offline', setOffline);
			window.removeEventListener('online', setOnline);
		};
	}, []);

	return onlineStatus;
};

export default useOnlineStatus;
