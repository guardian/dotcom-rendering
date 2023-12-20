import { useEffect, useState } from 'react';

export const useHydrated = (): boolean => {
	const [hydrated, setHydrated] = useState(false);
	useEffect(() => {
		setHydrated(true);
	}, []);

	return hydrated;
};
