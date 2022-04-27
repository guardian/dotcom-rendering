import { DynamicFast } from '../components/DynamicFast';
import { DynamicSlow } from '../components/DynamicSlow';
import { FixedLargeSlowXIV } from '../components/FixedLargeSlowXIV';

type Props = {
	trails: DCRFrontCard[];
	containerType: DCRContainerType;
};

export const DecideContainer = ({ trails, containerType }: Props) => {
	switch (containerType) {
		case 'dynamic/fast':
			return <DynamicFast trails={trails} />;
		case 'dynamic/slow':
			return <DynamicSlow trails={trails} />;
		case 'fixed/large/slow-XIV':
			return <FixedLargeSlowXIV trails={trails} />;
		default:
			return <p>{containerType} is not yet supported</p>;
	}
};
