import { GuideAtom } from '@guardian/atoms-rendering';
import { GuideAtomType } from '@guardian/atoms-rendering/dist/types/types';

export const GuideAtomWrapper = (props: GuideAtomType) => {
	// eslint-disable-next-line react/jsx-props-no-spreading
	return <GuideAtom {...props} />;
};
