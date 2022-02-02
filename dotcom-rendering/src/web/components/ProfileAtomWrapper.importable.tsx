import { ProfileAtom } from '@guardian/atoms-rendering';
import { ProfileAtomType } from '@guardian/atoms-rendering/dist/types/types';

export const ProfileAtomWrapper = (props: ProfileAtomType) => {
	// eslint-disable-next-line react/jsx-props-no-spreading
	return <ProfileAtom {...props} />;
};
