import { useEffect, useState } from 'react';
import { getEnvironmentClient } from './bridgetApi';

export const useIsMyGuardianEnabled = (): boolean | undefined => {
	const [isEnabled, setIsEnabled] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		void getEnvironmentClient()
			.isMyGuardianEnabled()
			.then(setIsEnabled)
			.catch((error) => {
				setIsEnabled(false);
				console.log('isMyGuardianEnabled', { error });
			});
	}, []);
	return isEnabled;
};
