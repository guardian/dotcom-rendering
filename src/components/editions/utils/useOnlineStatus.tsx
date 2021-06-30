import { useEffect, useState } from 'react';

const PING_RESOURCE = '/ping.txt';
const TIMEOUT_TIME_MS = 3000;
const onlinePollingInterval = 10000;

const timeout = (
	time: number,
	promise: Promise<Response>,
): Promise<Response> => {
	return new Promise(function (resolve, reject) {
		setTimeout(() => {
			reject(new Error('Request timed out.'));
		}, time);
		promise.then(resolve, reject);
	});
};

const checkOnlineStatus = async (): Promise<boolean> => {
	const controller = new AbortController();
	const { signal } = controller;

	// If the browser has no network connection return offline
	if (!navigator.onLine) return navigator.onLine;

	try {
		await timeout(
			TIMEOUT_TIME_MS,
			fetch(PING_RESOURCE, {
				method: 'GET',
				signal,
			}),
		);
		return true;
	} catch (error) {
		console.error(error);
		controller.abort();
	}
	return false;
};

const useOnlineStatus = (): boolean => {
	const [onlineStatus, setOnlineStatus] = useState<boolean>(true);

	const checkStatus = async (): Promise<void> => {
		const online = await checkOnlineStatus();
		setOnlineStatus(online);
	};

	useEffect(() => {
		window.addEventListener('offline', () => {
			setOnlineStatus(false);
		});

		const id = setInterval((): void => {
			void checkStatus();
		}, onlinePollingInterval);

		return (): void => {
			window.removeEventListener('offline', () => {
				setOnlineStatus(false);
			});
			return clearInterval(id);
		};
	}, []);

	return onlineStatus;
};

export default useOnlineStatus;
