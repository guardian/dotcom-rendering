import type {
	DCRContainerPalette,
	DCRContainerType,
	DCRFrontCard,
	DCRGroupedTrails,
} from '../../types/front';
import { DynamicFast } from '../components/DynamicFast';
import { DynamicPackage } from '../components/DynamicPackage';
import { DynamicSlow } from '../components/DynamicSlow';
import { DynamicSlowMPU } from '../components/DynamicSlowMPU';
import { FixedLargeSlowXIV } from '../components/FixedLargeSlowXIV';
import { FixedMediumSlowVI } from '../components/FixedMediumSlowVI';
import { FixedSmallSlowIII } from '../components/FixedSmallSlowIII';
import { FixedSmallSlowIV } from '../components/FixedSmallSlowIV';
import { FixedSmallSlowVMPU } from '../components/FixedSmallSlowVMPU';
import { FixedSmallSlowVThird } from '../components/FixedSmallSlowVThird';

type Props = {
	trails: DCRFrontCard[];
	index: number;
	groupedTrails: DCRGroupedTrails;
	containerType: DCRContainerType;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const DecideContainer = ({
	trails,
	index,
	groupedTrails,
	containerType,
	containerPalette,
	showAge,
}: Props) => {
	switch (containerType) {
		case 'dynamic/fast':
			return (
				<DynamicFast
					groupedTrails={groupedTrails}
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
		case 'dynamic/slow-mpu':
			return (
				<DynamicSlowMPU
					groupedTrails={groupedTrails}
					containerPalette={containerPalette}
					showAge={showAge}
					index={index}
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
		case 'fixed/small/slow-V-mpu':
			return (
				<FixedSmallSlowVMPU
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					index={index}
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
		case 'fixed/small/slow-V-third':
			return (
				<FixedSmallSlowVThird
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
