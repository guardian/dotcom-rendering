import { log } from '@guardian/libs';
import { isServer } from '../lib/isServer';
import { setAdTargeting } from '../lib/useAdTargeting';

type Props = {
	adTargeting: AdTargeting;
};

export const SetAdTargeting = ({ adTargeting }: Props) => {
	if (isServer) {
		throw new Error('SetAdTargeting is client only');
	}

	setAdTargeting(adTargeting);
	log('commercial', '🎯 Ad targeting', adTargeting);

	return null;
};
