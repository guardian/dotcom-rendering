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
	trails: DCRFrontCard[];
	containerType: DCRContainerType;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	showMoreId?: string;
};

export const DecideContainer = ({
	trails,
	containerType,
	containerPalette,
	showAge,
	showMoreId,
}: Props) => {
	switch (containerType) {
		case 'dynamic/fast':
			return (
				<DynamicFast
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					showMoreId={showMoreId}
				/>
			);
		case 'dynamic/slow':
			return (
				<DynamicSlow
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					showMoreId={showMoreId}
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
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					showMoreId={showMoreId}
				/>
			);
		case 'fixed/small/slow-IV':
			return (
				<FixedSmallSlowIV
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					showMoreId={showMoreId}
				/>
			);
		case 'fixed/small/slow-III':
			return (
				<FixedSmallSlowIII
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					showMoreId={showMoreId}
				/>
			);
		case 'fixed/medium/slow-VI':
			return (
				<FixedMediumSlowVI
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					showMoreId={showMoreId}
				/>
			);
		default:
			return <p>{containerType} is not yet supported</p>;
	}
};
