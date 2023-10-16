import { useEffect, useState } from 'react';

/**
 * Ensures that the given task is only run once and only after all items in waitFor are defined
 * @param {Function} task - The task to execute once
 * @param {Array} waitFor - An array of variables that must be defined before the task is executed
 * */
export const useOnce = (task: () => void, waitFor: unknown[]): void => {
	const [alreadyRun, setAlreadyRun] = useState(false);
	const isReady = waitFor.every((dep) => dep !== undefined);
	if (waitFor.length === 0) {
		throw new Error(
			'useOnce must be passed at least one variable to wait for',
		);
	}
	useEffect(() => {
		if (!alreadyRun && isReady) {
			task();
			setAlreadyRun(true);
		}
	}, [alreadyRun, isReady, task]);
};
