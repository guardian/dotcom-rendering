import type {
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
	absoluteServerTimes?: boolean;
	imageLoading: 'lazy' | 'eager';
	containerType: DCRContainerType;
};

/**
 * A container used on fronts to display a carousel of small cards
 *
 * ## Why does this need to be an Island?
 *
 * The carouselling arrow buttons need to run javascript.
 */
export const ScrollableSmall = ({
	trails,
	containerPalette,
	containerType,
	absoluteServerTimes,
	imageLoading,
	showAge,
}: Props) => {
	return (
		<ScrollableCarousel
			carouselLength={trails.length}
			visibleCardsOnMobile={1}
			visibleCardsOnTablet={2}
		>
			{trails.map((trail) => {
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
								desktop: 'xxsmall',
								mobile: 'xxxsmall',
							}}
							imagePositionOnDesktop="left"
							imagePositionOnMobile="left"
							imageSize="small"
							trailText={undefined} // unsupported
							supportingContent={undefined} // unsupported
							aspectRatio="5:4"
							kickerText={trail.kickerText}
							showLivePlayable={trail.showLivePlayable}
							showTopBarDesktop={false}
							showTopBarMobile={false}
						/>
					</ScrollableCarousel.Item>
				);
			})}
		</ScrollableCarousel>
	);
};
