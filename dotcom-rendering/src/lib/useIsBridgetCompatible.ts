import { compare } from 'compare-versions';
import { useEffect, useState } from 'react';
import { getEnvironmentClient } from './bridgetApi';

export const useIsBridgetCompatible = (
	requiredVersion = '2.0.0',
): boolean | undefined => {
	const [isCompatible, setIsCompatible] = useState<boolean | undefined>(
		undefined,
	);

	useEffect(() => {
		console.log('useEffect runs');

		void getEnvironmentClient()
			.nativeThriftPackageVersion()
			.then((bridgetVersion) => {
				console.log(
					bridgetVersion,
					requiredVersion,
					compare(bridgetVersion, requiredVersion, '>='),
				);
				setIsCompatible(compare(bridgetVersion, requiredVersion, '>='));
			})
			.catch((error) => {
				setIsCompatible(false);
				console.log('nativeThriftPackageVersion', { error });
			});
	}, [requiredVersion]);
	return isCompatible;
};
