import { useEffect, useState } from 'react';

/**
 * Ensures that the given task is only run once and only after all items in waitFor are defined
 * @param {Function} task - The task to execute once
 * @param {Array} waitFor - An array of variables that must be defined before the task is executed
 * */
export const useOnce = (task: () => void, waitFor: unknown[]): void => {
	const [alreadyRun, setAlreadyRun] = useState(false);
	const isReady = waitFor.every((dep) => dep !== undefined);
	useEffect(() => {
		if (alreadyRun || isReady) return;
		task();
		setAlreadyRun(true);
	}, [alreadyRun, isReady, task]);
};
