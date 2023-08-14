import { useEffect, useState } from 'react';
import { environmentClient } from './bridgetApi';

export const useBridgetVersion = (): string | undefined => {
	const [bridgetVersion, setBridgetVersion] = useState<string | undefined>(
		undefined,
	);
	useEffect(() => {
		void environmentClient
			.nativeThriftPackageVersion()
			.then(setBridgetVersion)
			// we don't care enough :)
			.catch((e) => console.error(e));
	}, []);

	return bridgetVersion;
};
