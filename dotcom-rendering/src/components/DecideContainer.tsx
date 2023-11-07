import type { ImgHTMLAttributes } from 'react';
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
	groupedTrails: DCRGroupedTrails;
	imageLoading: NonNullable<ImgHTMLAttributes<unknown>['loading']>;
	containerType: DCRContainerType;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const DecideContainer = ({
	trails,
	groupedTrails,
	containerType,
	containerPalette,
	showAge,
	imageLoading,
}: Props) => {
	// If you add a new container type which contains an MPU, you must also add it to
	switch (containerType) {
		case 'dynamic/fast':
			return (
				<DynamicFast
					groupedTrails={groupedTrails}
					containerPalette={containerPalette}
					showAge={showAge}
					imageLoading={imageLoading}
				/>
			);
		case 'dynamic/slow':
			return (
				<DynamicSlow
					groupedTrails={groupedTrails}
					containerPalette={containerPalette}
					showAge={showAge}
					imageLoading={imageLoading}
				/>
			);
		case 'dynamic/slow-mpu':
			return (
				<DynamicSlowMPU
					groupedTrails={groupedTrails}
					containerPalette={containerPalette}
					showAge={showAge}
					imageLoading={imageLoading}
				/>
			);
		case 'dynamic/package':
			return (
				<DynamicPackage
					groupedTrails={groupedTrails}
					containerPalette={containerPalette}
					showAge={showAge}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/large/slow-XIV':
			return (
				<FixedLargeSlowXIV
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/small/slow-IV':
			return (
				<FixedSmallSlowIV
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/small/slow-V-mpu':
			return (
				<FixedSmallSlowVMPU
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/small/slow-III':
			return (
				<FixedSmallSlowIII
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/small/slow-I':
			return (
				<FixedSmallSlowI
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/small/slow-V-third':
			return (
				<FixedSmallSlowVThird
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/small/slow-V-half':
			return (
				<FixedSmallSlowVHalf
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/medium/slow-VI':
			return (
				<FixedMediumSlowVI
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/medium/slow-VII':
			return (
				<FixedMediumSlowVII
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/medium/slow-XII-mpu':
			return (
				<FixedMediumSlowXIIMPU
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/medium/fast-XII':
			return (
				<FixedMediumFastXII
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/medium/fast-XI':
			return (
				<FixedMediumFastXI
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/small/fast-VIII':
			return (
				<FixedSmallFastVIII
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					imageLoading={imageLoading}
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
