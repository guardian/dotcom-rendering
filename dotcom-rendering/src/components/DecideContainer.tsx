import type { ImgHTMLAttributes } from 'react';
import type {
	AspectRatio,
	DCRContainerLevel,
	DCRContainerPalette,
	DCRContainerType,
	DCRFrontCard,
	DCRGroupedTrails,
} from '../types/front';
import { FlexibleGeneral } from './FlexibleGeneral';
import { FlexibleSpecial } from './FlexibleSpecial';
import { Island } from './Island';
import { NavList } from './NavList';
import { ScrollableFeature } from './ScrollableFeature.island';
import { ScrollableHighlights } from './ScrollableHighlights.island';
import { ScrollableMedium } from './ScrollableMedium.island';
import { ScrollableSmall } from './ScrollableSmall.island';
import { StaticFeatureTwo } from './StaticFeatureTwo';
import { StaticMediumFour } from './StaticMediumFour';

type Props = {
	trails: DCRFrontCard[];
	groupedTrails: DCRGroupedTrails;
	imageLoading: NonNullable<ImgHTMLAttributes<unknown>['loading']>;
	containerType: DCRContainerType;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	serverTime?: number;
	aspectRatio: AspectRatio;
	sectionId: string;
	frontId?: string;
	collectionId: number;
	containerLevel?: DCRContainerLevel;
	isInSlimHomepageAbTestVariant?: boolean;
};

export const DecideContainer = ({
	trails,
	groupedTrails,
	containerType,
	containerPalette,
	showAge,
	serverTime,
	imageLoading,
	aspectRatio,
	sectionId,
	frontId,
	collectionId,
	containerLevel,
	isInSlimHomepageAbTestVariant = false,
}: Props) => {
	switch (containerType) {
		case 'nav/list':
			return <NavList trails={trails} showImage={false} />;
		case 'nav/media-list':
			return <NavList trails={trails} showImage={true} />;
		case 'scrollable/highlights':
			return (
				<Island priority="critical" defer={{ until: 'visible' }}>
					<ScrollableHighlights trails={trails} frontId={frontId} />
				</Island>
			);
		case 'flexible/special':
			return (
				<FlexibleSpecial
					groupedTrails={groupedTrails}
					containerPalette={containerPalette}
					showAge={showAge}
					serverTime={serverTime}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
					collectionId={collectionId}
					isInSlimHomepageAbTestVariant={
						isInSlimHomepageAbTestVariant
					}
				/>
			);
		case 'flexible/general':
			return (
				<FlexibleGeneral
					groupedTrails={groupedTrails}
					containerPalette={containerPalette}
					showAge={showAge}
					serverTime={serverTime}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
					containerLevel={containerLevel}
					collectionId={collectionId}
					isInSlimHomepageAbTestVariant={
						isInSlimHomepageAbTestVariant
					}
				/>
			);
		case 'scrollable/small':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<ScrollableSmall
						trails={trails}
						imageLoading={imageLoading}
						containerPalette={containerPalette}
						showAge={showAge}
						serverTime={serverTime}
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
						containerPalette={containerPalette}
						showAge={showAge}
						serverTime={serverTime}
						aspectRatio={aspectRatio}
						sectionId={sectionId}
						isInSlimHomepageAbTestVariant={
							isInSlimHomepageAbTestVariant
						}
					/>
				</Island>
			);
		case 'static/medium/4':
			return (
				<StaticMediumFour
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					serverTime={serverTime}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
					isInSlimHomepageAbTestVariant={
						isInSlimHomepageAbTestVariant
					}
				/>
			);
		case 'scrollable/feature':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<ScrollableFeature
						trails={trails}
						imageLoading={imageLoading}
						containerPalette={containerPalette}
						serverTime={serverTime}
						aspectRatio={aspectRatio}
						collectionId={collectionId}
						isInSlimHomepageAbTestVariant={
							isInSlimHomepageAbTestVariant
						}
					/>
				</Island>
			);
		case 'static/feature/2':
			return (
				<StaticFeatureTwo
					trails={trails}
					containerPalette={containerPalette}
					serverTime={serverTime}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
					collectionId={collectionId}
				/>
			);
		default:
			return null;
	}
};
