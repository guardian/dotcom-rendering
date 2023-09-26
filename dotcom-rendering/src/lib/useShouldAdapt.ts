import { log } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { shouldAdapt as shouldAdaptPromise } from '../client/poorPerformanceMonitoring';
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

	useEffect(() => {
		if (shouldAdapt) log('openJournalism', '🎛️ Adapting');
	}, [shouldAdapt]);

	return shouldAdapt;
};
