import type {
	DCRContainerPalette,
	DCRContainerType,
	DCRFrontCard,
} from '../../types/front';
import { DynamicFast } from '../components/DynamicFast';
import { DynamicPackage } from '../components/DynamicPackage';
import { DynamicSlow } from '../components/DynamicSlow';
import { FixedLargeSlowXIV } from '../components/FixedLargeSlowXIV';
import { FixedMediumSlowVI } from '../components/FixedMediumSlowVI';
import { FixedSmallSlowIII } from '../components/FixedSmallSlowIII';
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
		case 'dynamic/package':
			return (
				<DynamicPackage
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
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
		case 'fixed/small/slow-III':
			return (
				<FixedSmallSlowIII
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
				/>
			);
		case 'fixed/medium/slow-VI':
			return (
				<FixedMediumSlowVI
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
				/>
			);
		default:
			return <p>{containerType} is not yet supported</p>;
	}
};
