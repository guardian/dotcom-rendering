import { log } from '@guardian/libs';
import { setAdTargeting } from '../lib/useAdTargeting';
import { useHydrated } from '../lib/useHydrated';

type Props = {
	adTargeting: AdTargeting;
};

export const SetAdTargeting = ({ adTargeting }: Props) => {
	const hydrated = useHydrated();
	if (!hydrated) return null;

	setAdTargeting(adTargeting);
	log('commercial', '🎯 Ad targeting', adTargeting);

	return null;
};
