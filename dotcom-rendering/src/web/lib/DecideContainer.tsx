import { DynamicFast } from '../components/DynamicFast';
import { DynamicSlow } from '../components/DynamicSlow';
import { FixedLargeSlowXIV } from '../components/FixedLargeSlowXIV';
import { FixedSmallSlowIV } from '../components/FixedSmallSlowIV';

type Props = {
	trails: DCRFrontCard[];
	containerType: DCRContainerType;
	containerPalette?: DCRContainerPalette;
};

export const DecideContainer = ({
	trails,
	containerType,
	containerPalette,
}: Props) => {
	switch (containerType) {
		case 'dynamic/fast':
			return (
				<DynamicFast
					trails={trails}
					containerPalette={containerPalette}
				/>
			);
		case 'dynamic/slow':
			return (
				<DynamicSlow
					trails={trails}
					containerPalette={containerPalette}
				/>
			);
		case 'fixed/large/slow-XIV':
			return (
				<FixedLargeSlowXIV
					trails={trails}
					containerPalette={containerPalette}
				/>
			);
		case 'fixed/small/slow-IV':
			return (
				<FixedSmallSlowIV
					trails={trails}
					containerPalette={containerPalette}
				/>
			);
		default:
			return <p>{containerType} is not yet supported</p>;
	}
};
