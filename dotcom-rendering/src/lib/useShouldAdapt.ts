import { useState } from 'react';
import { shouldAdapt as shouldAdaptPromise } from '../client/adaptiveSite';
import { useOnce } from './useOnce';

/**
 * A hook that reports whether we should adapt the current page
 * to address poor performance issues
 */
export const useShouldAdapt = (): boolean => {
	const [shouldAdapt, setShouldAdapt] = useState(false);

	useOnce(() => {
		void shouldAdaptPromise.then(setShouldAdapt);
	}, []);

	return shouldAdapt;
};
