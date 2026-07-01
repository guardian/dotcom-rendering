import { useEffect, useState } from 'react';

export const useLocationHash = (): string => {
	const [hash, setHash] = useState('');

	useEffect(() => {
		function onHashChange() {
			setHash(window.location.hash);
		}

		// Set the initial hash value
		onHashChange();

		const event = 'hashchange';
		window.addEventListener(event, onHashChange);
		return () => window.removeEventListener(event, onHashChange);
	}, []);

	return hash;
};
