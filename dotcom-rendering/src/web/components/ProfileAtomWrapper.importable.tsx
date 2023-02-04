import { ProfileAtom } from '@guardian/atoms-rendering';
import type { ProfileAtomType } from '@guardian/atoms-rendering';

export const ProfileAtomWrapper = (props: ProfileAtomType) => {
	return <ProfileAtom {...props} />;
};
