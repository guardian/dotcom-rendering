import { TimelineAtom } from '@guardian/atoms-rendering';
import { TimelineAtomType } from '@guardian/atoms-rendering/dist/types/types';

export const TimelineAtomWrapper = (props: TimelineAtomType) => {
	// eslint-disable-next-line react/jsx-props-no-spreading
	return <TimelineAtom {...props} />;
};
