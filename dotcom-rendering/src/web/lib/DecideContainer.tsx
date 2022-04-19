import { DynamicFast } from '../components/DynamicFast';
import { FixedLargeSlowXIV } from '../components/FixedLargeSlowXIV';

type Props = {
	trails: DCRFrontCard[];
	containerType: DCRContainerType;
};

export const DecideContainer = ({ trails, containerType }: Props) => {
	switch (containerType) {
		case 'dynamic/fast':
			return <DynamicFast trails={trails} />;
		case 'fixed/large/slow-XIV':
			return <FixedLargeSlowXIV trails={trails} />;
		default:
			// TODO: This default allows us to render fronts in-development where we might
			// not support all the container types, but it should be removed / re-investigated
			// before fronts are released
			return <DynamicFast trails={trails} />;
	}
};
