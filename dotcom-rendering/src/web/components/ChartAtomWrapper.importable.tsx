import { ChartAtom } from '@guardian/atoms-rendering';
import { ChartAtomType } from '@guardian/atoms-rendering/dist/types/types';

export const ChartAtomWrapper = (props: ChartAtomType) => {
	// eslint-disable-next-line react/jsx-props-no-spreading
	return <ChartAtom {...props} />;
};
