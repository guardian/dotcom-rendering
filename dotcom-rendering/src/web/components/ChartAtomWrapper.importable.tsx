import { ChartAtom } from '@guardian/atoms-rendering';
import type { ChartAtomType } from '@guardian/atoms-rendering/dist/types/types';

export const ChartAtomWrapper = (props: ChartAtomType) => {
	return <ChartAtom {...props} />;
};
