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
		void hasMinimumBridgetVersion(requiredVersion).then(setIsCompatible);
	}, [requiredVersion]);
	return isCompatible;
};

export const hasMinimumBridgetVersion = (
	requiredVersion: string,
): Promise<boolean> =>
	getEnvironmentClient()
		.nativeThriftPackageVersion()
		.then((bridgetVersion) => {
			return compare(
				bridgetVersion.replace(/^v/i, ''),
				requiredVersion.replace(/^v/i, ''),
				'>=',
			);
		})
		.catch((error) => {
			console.log('nativeThriftPackageVersion', { error });
			return false;
		});
