import type {
	DCRContainerPalette,
	DCRContainerType,
	DCRFrontCard,
	DCRGroupedTrails,
} from '../types/front.ts';
import { DynamicFast } from './DynamicFast.tsx';
import { DynamicPackage } from './DynamicPackage.tsx';
import { DynamicSlow } from './DynamicSlow.tsx';
import { DynamicSlowMPU } from './DynamicSlowMPU.tsx';
import { FixedLargeSlowXIV } from './FixedLargeSlowXIV.tsx';
import { FixedMediumFastXI } from './FixedMediumFastXI.tsx';
import { FixedMediumFastXII } from './FixedMediumFastXII.tsx';
import { FixedMediumSlowVI } from './FixedMediumSlowVI.tsx';
import { FixedMediumSlowVII } from './FixedMediumSlowVII.tsx';
import { FixedMediumSlowXIIMPU } from './FixedMediumSlowXIIMPU.tsx';
import { FixedSmallFastVIII } from './FixedSmallFastVIII.tsx';
import { FixedSmallSlowI } from './FixedSmallSlowI.tsx';
import { FixedSmallSlowIII } from './FixedSmallSlowIII.tsx';
import { FixedSmallSlowIV } from './FixedSmallSlowIV.tsx';
import { FixedSmallSlowVHalf } from './FixedSmallSlowVHalf.tsx';
import { FixedSmallSlowVMPU } from './FixedSmallSlowVMPU.tsx';
import { FixedSmallSlowVThird } from './FixedSmallSlowVThird.tsx';
import { NavList } from './NavList.tsx';

type Props = {
	trails: DCRFrontCard[];
	adIndex: number;
	groupedTrails: DCRGroupedTrails;
	containerType: DCRContainerType;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	renderAds: boolean;
};

export const DecideContainer = ({
	trails,
	adIndex,
	groupedTrails,
	containerType,
	containerPalette,
	showAge,
	renderAds,
}: Props) => {
	// If you add a new container type which contains an MPU, you must also add it to
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
					groupedTrails={groupedTrails}
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
					adIndex={adIndex}
					renderAds={renderAds}
				/>
			);
		case 'dynamic/package':
			return (
				<DynamicPackage
					groupedTrails={groupedTrails}
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
					adIndex={adIndex}
					renderAds={renderAds}
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
		case 'fixed/small/slow-I':
			return (
				<FixedSmallSlowI
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
		case 'fixed/small/slow-V-half':
			return (
				<FixedSmallSlowVHalf
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
		case 'fixed/medium/slow-VII':
			return (
				<FixedMediumSlowVII
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
				/>
			);
		case 'fixed/medium/slow-XII-mpu':
			return (
				<FixedMediumSlowXIIMPU
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					renderAds={renderAds}
					adIndex={adIndex}
				/>
			);
		case 'fixed/medium/fast-XII':
			return (
				<FixedMediumFastXII
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
				/>
			);
		case 'fixed/medium/fast-XI':
			return (
				<FixedMediumFastXI
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
				/>
			);
		case 'fixed/small/fast-VIII':
			return (
				<FixedSmallFastVIII
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
				/>
			);
		case 'nav/list':
			return (
				<NavList
					trails={trails}
					containerPalette={containerPalette}
					showImage={false}
				/>
			);
		case 'nav/media-list':
			return (
				<NavList
					trails={trails}
					containerPalette={containerPalette}
					showImage={true}
				/>
			);
		default:
			return <p>{containerType} is not yet supported</p>;
	}
};
