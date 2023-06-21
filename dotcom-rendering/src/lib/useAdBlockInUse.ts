import { isAdBlockInUse } from '@guardian/commercial';
import { useEffect, useState } from 'react';

/**
 * @description
 * useAdBlockInUse provides a custom hook to integrate the isAdBlockInUse
 * promise into a react component
 * */
export const useAdBlockInUse = (): boolean | undefined => {
	const [isInUse, setIsInUse] = useState<boolean | undefined>();
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		isAdBlockInUse().then((blockerDetected) => {
			setIsInUse(blockerDetected);
		});
	}, []);

	return isInUse;
};
