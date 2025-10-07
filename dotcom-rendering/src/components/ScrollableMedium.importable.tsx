import { isMediaCard } from '../lib/cardHelpers';
import { palette } from '../palette';
import type {
	AspectRatio,
	DCRContainerLevel,
	DCRContainerPalette,
	DCRFrontCard,
} from '../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';
import { ScrollableCarousel } from './ScrollableCarousel';

type Props = {
	trails: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
	imageLoading: 'lazy' | 'eager';
	aspectRatio: AspectRatio;
	sectionId: string;
	containerLevel?: DCRContainerLevel;
	/** Feature flag for the labs redesign work */
	showLabsRedesign?: boolean;
	isInAllBoostsTest?: boolean;
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
	absoluteServerTimes,
	imageLoading,
	showAge,
	aspectRatio,
	sectionId,
	containerLevel,
	showLabsRedesign,
	isInAllBoostsTest = false,
}: Props) => {
	if (isInAllBoostsTest) {
		return (
			<UL direction="row">
				{trails.map((trail, index) => {
					const imagePosition = isMediaCard(trail.format)
						? 'top'
						: 'bottom';

					return (
						<LI
							key={trail.url}
							stretch={false}
							padSides={true}
							showDivider={true}
							verticalDividerColour={palette(
								'--card-border-supporting',
							)}
						>
							<FrontCard
								trail={trail}
								imageLoading={imageLoading}
								absoluteServerTimes={absoluteServerTimes}
								containerPalette={containerPalette}
								containerType="scrollable/medium"
								showAge={showAge}
								headlineSizes={{
									desktop: 'xsmall',
									tablet: 'xxsmall',
									mobile: 'small',
								}}
								mediaPositionOnDesktop={imagePosition}
								mediaPositionOnMobile={imagePosition}
								mediaSize="small"
								trailText={undefined}
								supportingContent={undefined} // unsupported
								aspectRatio={aspectRatio}
								kickerText={trail.kickerText}
								showLivePlayable={trail.showLivePlayable}
								showTopBarDesktop={false}
								showTopBarMobile={
									// !isFirstRow ||
									(containerLevel === 'Primary' &&
										!isMediaCard(trail.format)) ||
									(containerLevel !== 'Primary' && index > 0)
								}
								isInAllBoostsTest={isInAllBoostsTest}
								canPlayInline={false}
								showLabsRedesign={showLabsRedesign}
							/>
						</LI>
					);
				})}
			</UL>
		);
	}

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
							containerType="scrollable/medium"
							showAge={!!showAge}
							headlineSizes={{
								desktop: 'xsmall',
								tablet: 'xxsmall',
							}}
							mediaPositionOnDesktop={imagePosition}
							mediaPositionOnMobile={imagePosition}
							mediaSize="medium"
							trailText={undefined} // unsupported
							supportingContent={undefined} // unsupported
							aspectRatio={aspectRatio}
							kickerText={trail.kickerText}
							showLivePlayable={trail.showLivePlayable}
							showTopBarDesktop={false}
							showTopBarMobile={false}
							canPlayInline={false}
							showLabsRedesign={showLabsRedesign}
						/>
					</ScrollableCarousel.Item>
				);
			})}
		</ScrollableCarousel>
	);
};
