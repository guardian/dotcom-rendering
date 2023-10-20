import { useEffect, useState } from 'react';
import { shouldAdapt as checkShouldAdapt } from '../client/adaptiveSite';

/**
 * A hook that reports whether we should adapt the current page
 * to address poor performance issues
 */
export const useShouldAdapt = (): boolean => {
	const [shouldAdapt, setShouldAdapt] = useState(false);

	useEffect(() => {
		void checkShouldAdapt().then(setShouldAdapt);
	}, []);

	return shouldAdapt;
};
