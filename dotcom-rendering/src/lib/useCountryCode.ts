import { type CountryCode, isNonNullable } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { getLocaleCode } from './getCountryCode';

export const useCountryCode = (feature: string): CountryCode | undefined => {
	const [countryCode, setCountryCode] = useState<CountryCode>();

	useEffect(() => {
		getLocaleCode()
			.then((cc) => {
				if (isNonNullable(cc)) setCountryCode(cc);
			})
			.catch((e) => {
				const msg = `Error fetching country code: ${String(e)}`;
				window.guardian.modules.sentry.reportError(
					new Error(msg),
					feature,
				);
			});
	}, [feature]);

	return countryCode;
};
