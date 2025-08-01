import type { ImgHTMLAttributes } from 'react';
import type {
	AspectRatio,
	DCRContainerLevel,
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
import { FlexibleGeneral } from './FlexibleGeneral';
import { FlexibleSpecial } from './FlexibleSpecial';
import { Island } from './Island';
import { NavList } from './NavList';
import { ScrollableFeature } from './ScrollableFeature.importable';
import { ScrollableHighlights } from './ScrollableHighlights.importable';
import { ScrollableMedium } from './ScrollableMedium.importable';
import { ScrollableSmall } from './ScrollableSmall.importable';
import { StaticFeatureTwo } from './StaticFeatureTwo';
import { StaticMediumFour } from './StaticMediumFour';

type Props = {
	trails: DCRFrontCard[];
	groupedTrails: DCRGroupedTrails;
	imageLoading: NonNullable<ImgHTMLAttributes<unknown>['loading']>;
	containerType: DCRContainerType;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
	aspectRatio: AspectRatio;
	sectionId: string;
	frontId?: string;
	collectionId: number;
	containerLevel?: DCRContainerLevel;
	isInNoBoostsAbTestVariant?: boolean;
};

export const DecideContainer = ({
	trails,
	groupedTrails,
	containerType,
	containerPalette,
	showAge,
	absoluteServerTimes,
	imageLoading,
	aspectRatio,
	sectionId,
	frontId,
	collectionId,
	containerLevel,
	isInNoBoostsAbTestVariant,
}: Props) => {
	switch (containerType) {
		case 'dynamic/fast':
			return (
				<DynamicFast
					groupedTrails={groupedTrails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
				/>
			);
		case 'dynamic/slow':
			return (
				<DynamicSlow
					groupedTrails={groupedTrails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
				/>
			);
		case 'dynamic/slow-mpu':
			return (
				<DynamicSlowMPU
					groupedTrails={groupedTrails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
				/>
			);
		case 'dynamic/package':
			return (
				<DynamicPackage
					groupedTrails={groupedTrails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/large/slow-XIV':
			return (
				<FixedLargeSlowXIV
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/small/slow-IV':
			return (
				<FixedSmallSlowIV
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/small/slow-V-mpu':
			return (
				<FixedSmallSlowVMPU
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/small/slow-III':
			return (
				<FixedSmallSlowIII
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/small/slow-I':
			return (
				<FixedSmallSlowI
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/small/slow-V-third':
			return (
				<FixedSmallSlowVThird
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/small/slow-V-half':
			return (
				<FixedSmallSlowVHalf
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/medium/slow-VI':
			return (
				<FixedMediumSlowVI
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/medium/slow-VII':
			return (
				<FixedMediumSlowVII
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/medium/slow-XII-mpu':
			return (
				<FixedMediumSlowXIIMPU
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/medium/fast-XII':
			return (
				<FixedMediumFastXII
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/medium/fast-XI':
			return (
				<FixedMediumFastXI
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
				/>
			);
		case 'fixed/small/fast-VIII':
			return (
				<FixedSmallFastVIII
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
				/>
			);
		case 'nav/list':
			return <NavList trails={trails} showImage={false} />;
		case 'nav/media-list':
			return <NavList trails={trails} showImage={true} />;
		case 'scrollable/highlights':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<ScrollableHighlights trails={trails} frontId={frontId} />
				</Island>
			);
		case 'flexible/special':
			return (
				<FlexibleSpecial
					groupedTrails={groupedTrails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
					collectionId={collectionId}
				/>
			);
		case 'flexible/general':
			return (
				<FlexibleGeneral
					groupedTrails={groupedTrails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
					containerLevel={containerLevel}
					collectionId={collectionId}
					isInNoBoostsAbTestVariant={isInNoBoostsAbTestVariant}
				/>
			);
		case 'scrollable/small':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<ScrollableSmall
						trails={trails}
						imageLoading={imageLoading}
						containerType={'scrollable/small'}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						aspectRatio={aspectRatio}
						sectionId={sectionId}
					/>
				</Island>
			);
		case 'scrollable/medium':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<ScrollableMedium
						trails={trails}
						imageLoading={imageLoading}
						containerType={'scrollable/small'}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						aspectRatio={aspectRatio}
						sectionId={sectionId}
					/>
				</Island>
			);
		case 'static/medium/4':
			return (
				<StaticMediumFour
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
				/>
			);
		case 'scrollable/feature':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<ScrollableFeature
						trails={trails}
						imageLoading={imageLoading}
						containerPalette={containerPalette}
						absoluteServerTimes={absoluteServerTimes}
						aspectRatio={aspectRatio}
						collectionId={collectionId}
					/>
				</Island>
			);
		case 'static/feature/2':
			return (
				<StaticFeatureTwo
					trails={trails}
					containerPalette={containerPalette}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
					collectionId={collectionId}
				/>
			);
		default:
			return <p>{containerType} is not yet supported</p>;
	}
};
