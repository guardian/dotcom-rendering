import { isMediaCard } from '../lib/cardHelpers';
import type {
	AspectRatio,
	DCRContainerPalette,
	DCRContainerType,
	DCRFrontCard,
} from '../types/front';
import { FrontCard } from './FrontCard';
import { ScrollableCarousel } from './ScrollableCarousel';

type Props = {
	trails: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
	imageLoading: 'lazy' | 'eager';
	containerType: DCRContainerType;
	aspectRatio: AspectRatio;
	sectionId: string;
	isInHideTrailsAbTest?: boolean;
};

/**
 * A container used on fronts to display a carousel of small cards
 *
 * ## Why does this need to be an Island?
 *
 * The carouselling arrow buttons need to run javascript.
 */
export const ScrollableMedium = ({
	trails,
	containerPalette,
	containerType,
	absoluteServerTimes,
	imageLoading,
	showAge,
	aspectRatio,
	sectionId,
	isInHideTrailsAbTest,
}: Props) => {
	return (
		<ScrollableCarousel
			carouselLength={trails.length}
			visibleCarouselSlidesOnMobile={2}
			visibleCarouselSlidesOnTablet={4}
			sectionId={sectionId}
		>
			{trails.map((trail) => {
				const imagePosition = isMediaCard(trail.format)
					? 'top'
					: 'bottom';

				return (
					<ScrollableCarousel.Item key={trail.url}>
						<FrontCard
							trail={trail}
							imageLoading={imageLoading}
							absoluteServerTimes={!!absoluteServerTimes}
							containerPalette={containerPalette}
							containerType={containerType}
							showAge={!!showAge}
							headlineSizes={{
								desktop: 'xsmall',
								tablet: 'xxsmall',
							}}
							imagePositionOnDesktop={imagePosition}
							imagePositionOnMobile={imagePosition}
							imageSize="medium"
							trailText={undefined} // unsupported
							supportingContent={undefined} // unsupported
							aspectRatio={aspectRatio}
							kickerText={trail.kickerText}
							showLivePlayable={trail.showLivePlayable}
							showTopBarDesktop={false}
							showTopBarMobile={false}
							canPlayInline={false}
							isInHideTrailsAbTest={isInHideTrailsAbTest}
						/>
					</ScrollableCarousel.Item>
				);
			})}
		</ScrollableCarousel>
	);
};
