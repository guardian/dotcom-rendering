import { compare } from 'compare-versions';
import { useEffect, useState } from 'react';
import { type EnvironmentClient, getEnvironmentClient } from './bridgetApi';

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

export const hasMinimumBridgetVersionWithClient =
	(requiredVersion: string) =>
	(client: EnvironmentClient): Promise<boolean> =>
		client
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

/**
 * A version of {@linkcode hasMinimumBridgetVersionWithClient} that
 * automatically uses the production Bridget API client. Prefer using that over
 * this function, as it allows you to pass different clients in different
 * environments (e.g. a mock client in tests or stories).
 */
export const hasMinimumBridgetVersion = (
	requiredVersion: string,
): Promise<boolean> =>
	hasMinimumBridgetVersionWithClient(requiredVersion)(getEnvironmentClient());
