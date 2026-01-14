import { isMediaCard } from '../lib/cardHelpers';
import type {
	AspectRatio,
	DCRContainerPalette,
	DCRFrontCard,
} from '../types/front';
import { FrontCard } from './FrontCard';
import { ScrollableCarousel } from './ScrollableCarousel';

type Props = {
	trails: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	serverTime?: number;
	imageLoading: 'lazy' | 'eager';
	aspectRatio: AspectRatio;
	sectionId: string;
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
	serverTime,
	imageLoading,
	showAge,
	aspectRatio,
	sectionId,
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
							serverTime={serverTime}
							containerPalette={containerPalette}
							containerType="scrollable/medium"
							showAge={!!showAge}
							headlineSizes={{
								desktop: 'xsmall',
								tablet: 'xxsmall',
							}}
							mediaPositionOnDesktop={imagePosition}
							mediaPositionOnMobile={imagePosition}
							mediaSize="scrollable-medium"
							trailText={undefined} // unsupported
							supportingContent={undefined} // unsupported
							aspectRatio={aspectRatio}
							kickerText={trail.kickerText}
							showLivePlayable={false}
							showTopBarDesktop={false}
							showTopBarMobile={false}
							canPlayInline={false}
						/>
					</ScrollableCarousel.Item>
				);
			})}
		</ScrollableCarousel>
	);
};
