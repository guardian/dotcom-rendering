import { DynamicFast } from '../components/DynamicFast';
import { DynamicSlow } from '../components/DynamicSlow';
import { FixedLargeSlowXIV } from '../components/FixedLargeSlowXIV';
import { FixedSmallSlowIV } from '../components/FixedSmallSlowIV';

type Props = {
	trails: DCRFrontCard[];
	containerType: DCRContainerType;
	containerPalette?: DCRContainerPalette;
	containerDisplayName: string;
};

export const DecideContainer = ({
	trails,
	containerType,
	containerPalette,
	containerDisplayName,
}: Props) => {
	switch (containerType) {
		case 'dynamic/fast':
			return (
				<DynamicFast
					trails={trails}
					containerPalette={containerPalette}
					containerDisplayName={containerDisplayName}
				/>
			);
		case 'dynamic/slow':
			return (
				<DynamicSlow
					trails={trails}
					containerPalette={containerPalette}
					containerDisplayName={containerDisplayName}
				/>
			);
		case 'fixed/large/slow-XIV':
			return (
				<FixedLargeSlowXIV
					trails={trails}
					containerPalette={containerPalette}
					containerDisplayName={containerDisplayName}
				/>
			);
		case 'fixed/small/slow-IV':
			return (
				<FixedSmallSlowIV
					trails={trails}
					containerPalette={containerPalette}
					containerDisplayName={containerDisplayName}
				/>
			);
		default:
			return <p>{containerType} is not yet supported</p>;
	}
};
