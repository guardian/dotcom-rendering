import { useEffect, useState } from 'react';
import { getOphan } from '../client/ophan/ophan';

export const useOphan = () => {
	const [ophan, setOphan] = useState<Awaited<ReturnType<typeof getOphan>>>();

	useEffect(() => {
		getOphan().then(setOphan);
	}, []);

	return ophan;
};
