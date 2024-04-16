import { useSyncExternalStore } from 'react';

const subscribe = (callback: (this: Window, ev: Event) => void) => {
	window.addEventListener('online', callback);
	window.addEventListener('offline', callback);
	return () => {
		window.removeEventListener('online', callback);
		window.removeEventListener('offline', callback);
	};
};

//  We want to avoid reading from navigator.onLine directly as this is an external, mutable piece of state
//  Seehttps://react.dev/reference/react/useSyncExternalStore#subscribing-to-a-browser-api
const useOnlineStatus = (): boolean => {
	return useSyncExternalStore(subscribe, () => navigator.onLine);
};

export { useOnlineStatus };
