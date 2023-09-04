import { useEffect, useState } from 'react';
import { getNewslettersClient } from './bridgetApi';

export const useRequestSignUp = (
	input: string,
	identityName: string,
): boolean | undefined => {
	const [isSuccess, setIsSuccess] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		if (input) {
			getNewslettersClient()
				.requestSignUp(input, identityName)
				.then((success) => {
					setIsSuccess(success);
				})
				.catch(() => {
					setIsSuccess(false);
				});
		}
	}, [input, identityName]);

	return isSuccess;
};
