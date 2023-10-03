import { useState } from 'react';
import { useOnce } from './useOnce';

export const useHydrated = (hydrateInStorybook = true): boolean => {
	const [hydrated, setHydrated] = useState(false);
	useOnce(() => {
		if (!hydrateInStorybook && window.IS_STORYBOOK) return;
		setHydrated(true);
	}, []);

	return hydrated;
};
