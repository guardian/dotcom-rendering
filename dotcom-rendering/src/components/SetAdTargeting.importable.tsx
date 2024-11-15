import { log } from '@guardian/libs';
import { setAdTargeting } from '../lib/useAdTargeting';
import type { AdTargeting } from '../types/commercial';

type Props = {
	adTargeting: AdTargeting;
};

export const SetAdTargeting = ({ adTargeting }: Props) => {
	setAdTargeting(adTargeting);
	log('commercial', '🎯 Ad targeting', adTargeting);

	return null;
};
