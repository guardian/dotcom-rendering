import { useEffect, useRef, useState } from 'react';
import { subscribeToAuthStateChange } from './identity';
import type { PuzzleProgressItem } from './puzzleCardProgress';
import { loadPuzzleProgress } from './puzzleCardProgress';

/**
 * The reader's puzzle progress, refreshed on auth changes and restoration
 * from the browser's back/forward cache. `undefined` until it is available.
 */
export const usePuzzleProgress = (): PuzzleProgressItem[] | undefined => {
	const [progress, setProgress] = useState<PuzzleProgressItem[]>();
	const requests = useRef(0);

	useEffect(() => {
		let active = true;

		const refresh = () => {
			const request = ++requests.current;
			void loadPuzzleProgress().then((items) => {
				if (active && request === requests.current && items) {
					setProgress(items);
				}
			});
		};

		const onPageShow = (event: PageTransitionEvent) => {
			if (event.persisted) refresh();
		};
		refresh();
		const unsubscribe = subscribeToAuthStateChange(refresh);
		window.addEventListener('pageshow', onPageShow);
		return () => {
			active = false;
			unsubscribe();
			window.removeEventListener('pageshow', onPageShow);
		};
	}, []);

	return progress;
};
