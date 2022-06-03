import { DynamicFast } from '../components/DynamicFast';
import { DynamicSlow } from '../components/DynamicSlow';
import { FixedLargeSlowXIV } from '../components/FixedLargeSlowXIV';
import { FixedSmallSlowIV } from '../components/FixedSmallSlowIV';

type Props = {
	collectionId: string;
	trails: DCRFrontCard[];
	containerType: DCRContainerType;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	hasMore: boolean;
};

export const DecideContainer = ({
	collectionId,
	trails,
	containerType,
	containerPalette,
	showAge,
	hasMore,
}: Props) => {
	switch (containerType) {
		case 'dynamic/fast':
			return (
				<DynamicFast
					collectionId={collectionId}
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					hasMore={hasMore}
				/>
			);
		case 'dynamic/slow':
			return (
				<DynamicSlow
					collectionId={collectionId}
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					hasMore={hasMore}
				/>
			);
		case 'fixed/large/slow-XIV':
			return (
				<FixedLargeSlowXIV
					collectionId={collectionId}
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					hasMore={hasMore}
				/>
			);
		case 'fixed/small/slow-IV':
			return (
				<FixedSmallSlowIV
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
