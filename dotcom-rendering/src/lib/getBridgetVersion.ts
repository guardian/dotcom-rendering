import { useEffect, useState } from 'react';
import { getEnvironmentClient } from './bridgetApi';

const isCorrectBridgetVersion = (
	version: string,
	requiredVersion: number,
): boolean => {
	const majorVersion = parseInt(version);
	return majorVersion >= requiredVersion;
};

export const useIsBridgetCompatible = (
	requiredVersion = 2,
): boolean | undefined => {
	const [isCompatible, setIsCompatible] = useState<boolean | undefined>(
		undefined,
	);

	useEffect(() => {
		void getEnvironmentClient()
			.nativeThriftPackageVersion()
			.then((bridgetVersion) => {
				setIsCompatible(
					isCorrectBridgetVersion(bridgetVersion, requiredVersion),
				);
			})
			.catch((error) => {
				setIsCompatible(false);
				console.log('nativeThriftPackageVersion', { error });
			});
	}, [requiredVersion]);
	return isCompatible;
};
