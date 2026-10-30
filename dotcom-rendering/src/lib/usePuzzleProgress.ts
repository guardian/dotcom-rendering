import { useEffect, useRef, useState } from 'react';
import { subscribeToAuthStateChange } from './identity';
import type { PuzzleProgressItem } from './puzzleCardProgress';
import { loadPuzzleProgress } from './puzzleCardProgress';

/**
 * The reader's puzzle progress, fetched in the browser and refreshed when
 * they sign in or out. `undefined` until (and unless) it is available.
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

		refresh();
		const unsubscribe = subscribeToAuthStateChange(refresh);
		return () => {
			active = false;
			unsubscribe();
		};
	}, []);

	return progress;
};
