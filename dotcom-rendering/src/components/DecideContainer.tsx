import type {
	DCRContainerPalette,
	DCRContainerType,
	DCRFrontCard,
	DCRGroupedTrails,
} from '../types/front';
import { DynamicFast } from './DynamicFast';
import { DynamicPackage } from './DynamicPackage';
import { DynamicSlow } from './DynamicSlow';
import { DynamicSlowMPU } from './DynamicSlowMPU';
import { FixedLargeSlowXIV } from './FixedLargeSlowXIV';
import { FixedMediumFastXI } from './FixedMediumFastXI';
import { FixedMediumFastXII } from './FixedMediumFastXII';
import { FixedMediumSlowVI } from './FixedMediumSlowVI';
import { FixedMediumSlowVII } from './FixedMediumSlowVII';
import { FixedMediumSlowXIIMPU } from './FixedMediumSlowXIIMPU';
import { FixedSmallFastVIII } from './FixedSmallFastVIII';
import { FixedSmallSlowI } from './FixedSmallSlowI';
import { FixedSmallSlowIII } from './FixedSmallSlowIII';
import { FixedSmallSlowIV } from './FixedSmallSlowIV';
import { FixedSmallSlowVHalf } from './FixedSmallSlowVHalf';
import { FixedSmallSlowVMPU } from './FixedSmallSlowVMPU';
import { FixedSmallSlowVThird } from './FixedSmallSlowVThird';
import { NavList } from './NavList';

type Props = {
	trails: DCRFrontCard[];
	index: number;
	groupedTrails: DCRGroupedTrails;
	containerType: DCRContainerType;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	MPUIndex?: number;
	renderAds: boolean;
};

export const DecideContainer = ({
	trails,
	index,
	groupedTrails,
	containerType,
	containerPalette,
	showAge,
	renderAds,
	MPUIndex,
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
					index={index}
					renderAds={renderAds}
					trails={trails}
					MPUIndex={MPUIndex}
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
					index={index}
					renderAds={renderAds}
					MPUIndex={MPUIndex}
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
					index={index}
					MPUIndex={MPUIndex}
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
