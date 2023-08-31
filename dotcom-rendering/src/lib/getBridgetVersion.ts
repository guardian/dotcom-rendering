import { useEffect, useState } from 'react';
import { getEnvironmentClient } from './bridgetApi';
import { compare } from 'compare-versions';

export const useIsBridgetCompatible = (
	requiredVersion = '2.0.0',
): boolean | undefined => {
	const [isCompatible, setIsCompatible] = useState<boolean | undefined>(
		undefined,
	);

	useEffect(() => {
		void getEnvironmentClient()
			.nativeThriftPackageVersion()
			.then((bridgetVersion) => {
				setIsCompatible(compare(bridgetVersion, requiredVersion, '>='));
			})
			.catch((error) => {
				setIsCompatible(false);
				console.log('nativeThriftPackageVersion', { error });
			});
	}, [requiredVersion]);
	return isCompatible;
};
