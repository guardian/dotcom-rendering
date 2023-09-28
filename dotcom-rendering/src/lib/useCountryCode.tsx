import type { CountryCode } from '@guardian/libs';
import { useState } from 'react';
import { getLocaleCode } from './getCountryCode';
import { useOnce } from './useOnce';

export const useCountryCode = (): CountryCode | undefined => {
	const [localeCode, setLocaleCode] = useState<CountryCode | null>(null);
	useOnce(() => {
		getLocaleCode()
			.then((code) => {
				setLocaleCode(code);
			})
			.catch((e) =>
				console.error(`countryCodePromise - error: ${String(e)}`),
			);
	}, []);

	return localeCode ?? undefined;
};
