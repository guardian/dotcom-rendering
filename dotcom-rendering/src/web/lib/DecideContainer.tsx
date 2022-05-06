import { DynamicFast } from '../components/DynamicFast';
import { DynamicPackage } from '../components/DynamicPackage';
import { DynamicSlow } from '../components/DynamicSlow';
import { FixedLargeSlowXIV } from '../components/FixedLargeSlowXIV';
import { FixedSmallSlowI } from '../components/FixedSmallSlowI';
import { FixedSmallSlowIV } from '../components/FixedSmallSlowIV';

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
		case 'fixed/small/slow-IV':
			return <FixedSmallSlowIV trails={trails} />;
		case 'fixed/small/slow-I':
			return <FixedSmallSlowI trails={trails} />;
		default:
			return <p>{containerType} is not yet supported</p>;
	}
};
