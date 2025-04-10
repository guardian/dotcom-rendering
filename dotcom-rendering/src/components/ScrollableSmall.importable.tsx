import { css } from '@emotion/react';
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
			{stackedTrails.map((trails) => {
				if (trails.length === 0 || trails[0] === undefined) {
					return null;
				}
				return (
					<ScrollableCarousel.Item key={'TODO_ADD_KEY'}>
						<div
							css={css`
								display: flex;
								flex-direction: column;
								justify-content: space-between;
							`}
						>
							<FrontCard
								trail={trails[0]}
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
								kickerText={trails[0].kickerText}
								showLivePlayable={trails[0].showLivePlayable}
								showTopBarDesktop={false}
								showTopBarMobile={false}
								canPlayInline={false}
							/>
							{trails[1] && (
								<FrontCard
									trail={trails[1]}
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
									kickerText={trails[1].kickerText}
									showLivePlayable={
										trails[1].showLivePlayable
									}
									showTopBarDesktop={true}
									showTopBarMobile={true}
									canPlayInline={false}
								/>
							)}
						</div>
					</ScrollableCarousel.Item>
				);
			})}
		</ScrollableCarousel>
	);
};
