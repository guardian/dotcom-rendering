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
		hasMinimumBridgetVersion(requiredVersion).then(setIsCompatible);
	}, [requiredVersion]);
	return isCompatible;
};

export const hasMinimumBridgetVersion = (
	requiredVersion: string,
): Promise<boolean> =>
	getEnvironmentClient()
		.nativeThriftPackageVersion()
		.then((bridgetVersion) => {
			return compare(bridgetVersion, requiredVersion, '>=');
		})
		.catch((error) => {
			console.log('nativeThriftPackageVersion', { error });
			return false;
		});
