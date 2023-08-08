import { useEffect, useState } from 'react';
import { getOphan } from '../client/ophan/ophan';

type Ophan = Awaited<ReturnType<typeof getOphan>>;

export const useOphan = (): Ophan | undefined => {
	const [ophan, setOphan] = useState<Ophan>();

	useEffect(() => {
		void getOphan().then(setOphan);
	}, []);

	return ophan;
};
