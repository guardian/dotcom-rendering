import type {
	AspectRatio,
	DCRContainerPalette,
	DCRContainerType,
	DCRFrontCard,
} from '../types/front';
import { FrontCard } from './FrontCard';
import { ScrollableCarouselStacked } from './ScrollableCarouselStacked';

type Props = {
	trails: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes?: boolean;
	imageLoading: 'lazy' | 'eager';
	containerType: DCRContainerType;
	aspectRatio: AspectRatio;
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
	aspectRatio,
}: Props) => {
	return (
		<ScrollableCarouselStacked
			carouselLength={trails.length}
			visibleCardsOnMobile={1}
			visibleCardsOnTablet={2}
		>
			{trails.map((trail) => {
				return (
					<ScrollableCarouselStacked.Item key={trail.url}>
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
							aspectRatio={aspectRatio}
							kickerText={trail.kickerText}
							showLivePlayable={trail.showLivePlayable}
							showTopBarDesktop={false}
							showTopBarMobile={false}
							canPlayInline={false}
						/>
					</ScrollableCarouselStacked.Item>
				);
			})}
		</ScrollableCarouselStacked>
	);
};
