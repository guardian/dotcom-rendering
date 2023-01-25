import { GuideAtom } from '@guardian/atoms-rendering';
import type { GuideAtomType } from '@guardian/atoms-rendering';

export const GuideAtomWrapper = (props: GuideAtomType) => {
	return <GuideAtom {...props} />;
};
