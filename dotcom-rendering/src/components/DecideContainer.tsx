import type { ImgHTMLAttributes } from 'react';
import type {
	AspectRatio,
	DCRContainerLevel,
	DCRContainerPalette,
	DCRContainerType,
	DCRFrontCard,
	DCRGroupedTrails,
} from '../types/front';
import { FallbackContainer } from './FallbackContainer';
import { FixedMediumFastXI } from './FixedMediumFastXI';
import { FixedMediumSlowXIIMPU } from './FixedMediumSlowXIIMPU';
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
}: Props) => {
	// If you add a new container type which contains an MPU, you must also add it to
	switch (containerType) {
		case 'fixed/small/slow-IV':
		case 'fixed/small/slow-III':
		case 'fixed/small/slow-I':
		case 'fixed/small/slow-V-third':
		case 'fixed/small/slow-V-half':
		case 'fixed/medium/fast-XII':
		case 'fixed/small/fast-VIII':
		case 'fixed/small/slow-V-mpu':
		case 'dynamic/slow-mpu':
		case 'dynamic/package':
		case 'dynamic/slow':
		case 'dynamic/fast':
		case 'fixed/large/slow-XIV':
		case 'fixed/medium/slow-VI':
		case 'fixed/medium/slow-VII':
			return (
				<FallbackContainer
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
					aspectRatio={'5:4'}
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
