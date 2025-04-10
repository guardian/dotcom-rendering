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
	absoluteServerTimes?: boolean;
	imageLoading: 'lazy' | 'eager';
	containerType: DCRContainerType;
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
export const ScrollableSmall = ({
	trails,
	containerPalette,
	containerType,
	absoluteServerTimes,
	imageLoading,
	showAge,
	aspectRatio,
	sectionId,
}: Props) => {
	const stackedTrails = trails.reduce<DCRFrontCard[][]>((acc, trail) => {
		if (acc.length === 0 || acc[acc.length - 1]?.length === 2) {
			acc.push([trail]);
		} else {
			acc[acc.length - 1]?.push(trail);
		}
		return acc;
	}, []);

	return (
		<ScrollableCarousel
			carouselLength={stackedTrails.length}
			visibleCardsOnMobile={1}
			visibleCardsOnTablet={2}
			sectionId={sectionId}
		>
			{stackedTrails.map((column, index) => {
				if (column.length === 0 || column[0] === undefined) {
					return null;
				}
				return (
					<ScrollableCarousel.Item
						splitLeftBorder={true}
						stackRows={true}
						key={`carousel-item-${index}`}
					>
						<>
							<FrontCard
								trail={column[0]}
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
								kickerText={column[0].kickerText}
								showLivePlayable={column[0].showLivePlayable}
								showTopBarDesktop={false}
								showTopBarMobile={false}
								canPlayInline={false}
							/>
							{column[1] && (
								<FrontCard
									trail={column[1]}
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
									kickerText={column[1].kickerText}
									showLivePlayable={
										column[1].showLivePlayable
									}
									showTopBarDesktop={true}
									showTopBarMobile={true}
									canPlayInline={false}
								/>
							)}
						</>
					</ScrollableCarousel.Item>
				);
			})}
		</ScrollableCarousel>
	);
};
