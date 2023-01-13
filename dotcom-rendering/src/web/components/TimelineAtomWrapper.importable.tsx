import { TimelineAtom } from '@guardian/atoms-rendering';
import type { TimelineAtomType } from '@guardian/atoms-rendering';

export const TimelineAtomWrapper = (props: TimelineAtomType) => {
	return <TimelineAtom {...props} />;
};
