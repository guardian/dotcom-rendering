import { getCookie, isString } from '@guardian/libs';
import { useEffect, useState } from 'react';

export const useBrowserId = (): string | undefined => {
	const [browserId, setBrowserId] = useState<string>();

	useEffect(() => {
		const cookie = getCookie({ name: 'bwid', shouldMemoize: true });

		const id = isString(cookie) ? cookie : 'no-browser-id-available';

		setBrowserId(id);
	}, []);

	return browserId;
};
