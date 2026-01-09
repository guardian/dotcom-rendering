import type {
	AspectRatio,
	DCRContainerPalette,
	DCRFrontCard,
} from '../types/front';
import { FrontCard } from './FrontCard';
import { CarouselKind, ScrollableCarousel } from './ScrollableCarousel';

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
 * The scrollable small container displays in the following ways:
 * It is limited to 4 cards maximum and displays in a 2x2 grid.
 * It is scrollable on mobile and static on tablet and desktop.
 * On mobile, each column is scrollable
 *
 * The layout of cards within the 2x2 grid differs between breakpoints:
 *
 * On mobile, the layout is:
 *
 * +--------+--------+
 * | Card 0 | Card 2 |
 * +--------+--------+
 * | Card 1 | Card 3 |
 * +--------+--------+
 *
 * On tablet and above, the layout is:
 *
 * +--------+--------+
 * | Card 0 | Card 1 |
 * +--------+--------+
 * | Card 2 | Card 3 |
 * +--------+--------+
 *
 */

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
	serverTime,
	imageLoading,
	showAge,
	aspectRatio,
	sectionId,
}: Props) => {
	const mobileBottomCards = [1, 3];
	const desktopBottomCards = [2, 3];

	return (
		<ScrollableCarousel
			kind={CarouselKind.FrontCarousel}
			carouselLength={Math.ceil(trails.length / 2)}
			visibleCarouselSlidesOnMobile={1}
			visibleCarouselSlidesOnTablet={2}
			sectionId={sectionId}
			shouldStackCards={{ desktop: trails.length > 2, mobile: true }}
			gapSizes={{ column: 'large', row: 'medium' }}
		>
			{trails.map((trail, index) => {
				return (
					<ScrollableCarousel.Item
						key={trail.url}
						isStackingCarousel={true}
					>
						<FrontCard
							trail={trail}
							imageLoading={imageLoading}
							serverTime={serverTime}
							containerPalette={containerPalette}
							containerType="scrollable/small"
							showAge={!!showAge}
							headlineSizes={{
								desktop: 'xxsmall',
								mobile: 'xxxsmall',
							}}
							mediaPositionOnDesktop="left"
							mediaPositionOnMobile="left"
							mediaSize="scrollable-small"
							trailText={undefined} // unsupported
							supportingContent={undefined} // unsupported
							aspectRatio={aspectRatio}
							kickerText={trail.kickerText}
							showLivePlayable={false}
							showTopBarDesktop={desktopBottomCards.includes(
								index,
							)}
							showTopBarMobile={mobileBottomCards.includes(index)}
							canPlayInline={false}
						/>
					</ScrollableCarousel.Item>
				);
			})}
		</ScrollableCarousel>
	);
};
