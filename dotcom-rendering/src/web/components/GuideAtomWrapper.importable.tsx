import { GuideAtom } from '@guardian/atoms-rendering';
import type { GuideAtomType } from '@guardian/atoms-rendering/dist/types/types';

export const GuideAtomWrapper = (props: GuideAtomType) => {
	return <GuideAtom {...props} />;
};
