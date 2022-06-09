import { DynamicFast } from '../components/DynamicFast';
import { DynamicSlow } from '../components/DynamicSlow';
import { FixedLargeSlowXIV } from '../components/FixedLargeSlowXIV';
import { FixedSmallSlowIII } from '../components/FixedSmallSlowIII';
import { FixedSmallSlowIV } from '../components/FixedSmallSlowIV';

type Props = {
	trails: DCRFrontCard[];
	containerType: DCRContainerType;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const DecideContainer = ({
	trails,
	containerType,
	containerPalette,
	showAge,
}: Props) => {
	switch (containerType) {
		case 'dynamic/fast':
			return (
				<DynamicFast
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
				/>
			);
		case 'dynamic/slow':
			return (
				<DynamicSlow
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
				/>
			);
		case 'fixed/large/slow-XIV':
			return (
				<FixedLargeSlowXIV
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
				/>
			);
		case 'fixed/small/slow-IV':
			return (
				<FixedSmallSlowIV
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
				/>
			);
		case 'fixed/small/slow-III':
			return (
				<FixedSmallSlowIII
					collectionId={collectionId}
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					hasMore={hasMore}
				/>
			);
		default:
			return <p>{containerType} is not yet supported</p>;
	}
};
