import type { ProfileAtomProps } from './ProfileAtom.importable';
import { ProfileAtom } from './ProfileAtom.importable';

export const ProfileAtomWrapper = (props: ProfileAtomProps) => {
	return <ProfileAtom {...props} />;
};
