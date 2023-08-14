import { useEffect, useState } from 'react';
import { environmentClient } from './bridgetApi';

export const useBridgetVersion = (): string | undefined => {
	const [bridgetVersion, setBridgetVersion] = useState<string | undefined>(
		undefined,
	);
	useEffect(() => {
		void environmentClient
			.nativeThriftPackageVersion()
			.then(setBridgetVersion);
	}, []);

	return bridgetVersion;
};
