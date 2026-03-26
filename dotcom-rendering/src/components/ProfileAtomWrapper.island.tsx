import type { ProfileAtomProps } from './ProfileAtom.island';
import { ProfileAtom } from './ProfileAtom.island';

export const ProfileAtomWrapper = (props: ProfileAtomProps) => {
	return <ProfileAtom {...props} />;
};
