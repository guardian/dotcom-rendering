import { GuideAtom } from './GuideAtom/GuideAtom';
import type { GuideAtomProps } from './GuideAtom/GuideAtom';

export const GuideAtomWrapper = (props: GuideAtomProps) => {
	return <GuideAtom {...props} />;
};
