import { ProfileAtom } from '@guardian/atoms-rendering';
import type { ProfileAtomType } from '@guardian/atoms-rendering/dist/types/types';

export const ProfileAtomWrapper = (props: ProfileAtomType) => {
	return <ProfileAtom {...props} />;
};
