import { useState } from 'react';
import { useOnce } from './useOnce';

export const useHydrated = (): boolean => {
	const [hydrated, setHydrated] = useState(false);
	useOnce(() => {
		setHydrated(true);
	}, []);

	return hydrated;
};
