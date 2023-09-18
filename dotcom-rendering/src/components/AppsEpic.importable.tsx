import type { IGetEpics__Result } from '@guardian/bridget/Acquisitions';
import { useEffect, useState } from 'react';
import { getAcquisitionsClient, getUserClient } from '../lib/bridgetApi';
import { EpicContent } from './EpicContent.apps';

export const AppsEpic = () => {
	console.log('*** ads-epic ***');
	const [isPremium, setIsPremium] = useState<boolean | undefined>(undefined);
	const [maybeEpic, setMaybeEpic] =
		useState<IGetEpics__Result['success']>(undefined);

	useEffect(() => {
		void getUserClient()
			.isPremium()
			.then(setIsPremium)
			.catch(() => undefined);
	}, []);

	useEffect(() => {
		void getAcquisitionsClient()
			.getEpics()
			.then((me) => {
				setMaybeEpic(me);
				console.log('*** maybe-epid', me);
			})
			.catch((e) => console.log('*** error', e));
	}, []);

	if (navigator.onLine) {
		if (!isPremium && maybeEpic?.epic) {
			const { title, body, firstButton, secondButton } = maybeEpic.epic;
			const epicProps = {
				title,
				body,
				firstButton,
				secondButton,
			};
			return <EpicContent {...epicProps} />;
		}
	}
	return <></>;
};
