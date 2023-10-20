import { useEffect, useState } from 'react';
import type { NonEmptyArray } from './tuple';

/**
 * Ensures that the given task is only run once and only after all items in waitFor are defined
 * @param {Function} task - The task to execute once
 * @param {Array} waitFor - An array of variables that must be defined before the task is executed
 * */
export const useOnce = (
	task: () => void,
	waitFor: NonEmptyArray<unknown>,
): void => {
	const [alreadyRun, setAlreadyRun] = useState(false);
	const isReady = waitFor.every((dep) => dep !== undefined);
	useEffect(() => {
		if (!alreadyRun && isReady) {
			task();
			setAlreadyRun(true);
		}
	}, [alreadyRun, isReady, task]);
};
