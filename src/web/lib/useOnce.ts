import { useEffect, useState } from 'react';

/**
 * Ensures that the given task is only run once and only after all items in waitFor are defined
 * @param {Function} task - The task to execute once
 * @param {Array} waitFor - An array of variables that must be defined before the task is executed
 * */
export const useOnce = (task: Function, waitFor: unknown[]) => {
	const [alreadyRun, setAlreadyRun] = useState(false);
	const isReady = (dependencies: unknown[]) => {
		return dependencies.every((dep) => dep !== undefined);
	};
	useEffect(() => {
		if (!alreadyRun && isReady(waitFor)) {
			task();
			setAlreadyRun(true);
		}
	}, [alreadyRun, waitFor, task]);
};
