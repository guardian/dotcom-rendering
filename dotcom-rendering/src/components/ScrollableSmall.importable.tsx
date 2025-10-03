import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { palette } from '../palette';
import type {
	AspectRatio,
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
	absoluteServerTimes?: boolean;
	imageLoading: 'lazy' | 'eager';
	aspectRatio: AspectRatio;
	isInAllBoostsTest?: boolean;
	sectionId: string;
	/** Feature flag for the labs redesign work */
	showLabsRedesign?: boolean;
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
	absoluteServerTimes,
	imageLoading,
	showAge,
	aspectRatio,
	isInAllBoostsTest = false,
	sectionId,
	showLabsRedesign,
}: Props) => {
	const mobileBottomCards = [1, 3];
	const desktopBottomCards = [2, 3];

	if (isInAllBoostsTest) {
		return (
			<>
				<UL direction="row" padBottom={true}>
					{trails.slice(0, 2).map((trail, index) => {
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
									absoluteServerTimes={!!absoluteServerTimes}
									containerPalette={containerPalette}
									containerType="scrollable/small"
									showAge={showAge}
									headlineSizes={{
										desktop: 'xxsmall',
										tablet: 'xxxsmall',
										mobile: 'small',
									}}
									mediaPositionOnDesktop="left"
									mediaPositionOnMobile="bottom"
									fixImageWidth={true}
									mediaSize="small"
									trailText={undefined}
									supportingContent={undefined} // unsupported
									aspectRatio={aspectRatio}
									kickerText={trail.kickerText}
									showLivePlayable={trail.showLivePlayable}
									showTopBarDesktop={desktopBottomCards.includes(
										index,
									)}
									showTopBarMobile={mobileBottomCards.includes(
										index,
									)}
									isInAllBoostsTest={isInAllBoostsTest}
									canPlayInline={false}
									showLabsRedesign={showLabsRedesign}
								/>
							</LI>
						);
					})}
				</UL>
				<hr
					css={css`
						border: 0;
						border-top: 1px solid ${palette('--card-border-top')};
						${from.tablet} {
							display: none;
						}
					`}
				/>
				<UL direction="row" showTopBar={true} splitTopBar={true}>
					{trails.slice(2, 4).map((trail, index) => {
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
									absoluteServerTimes={!!absoluteServerTimes}
									containerPalette={containerPalette}
									containerType="scrollable/small"
									showAge={showAge}
									headlineSizes={{
										desktop: 'xxsmall',
										tablet: 'xxxsmall',
										mobile: 'small',
									}}
									mediaPositionOnDesktop="left"
									mediaPositionOnMobile="bottom"
									fixImageWidth={true}
									mediaSize="small"
									trailText={undefined}
									supportingContent={undefined} // unsupported
									aspectRatio={aspectRatio}
									kickerText={trail.kickerText}
									showLivePlayable={trail.showLivePlayable}
									showTopBarDesktop={desktopBottomCards.includes(
										index,
									)}
									showTopBarMobile={mobileBottomCards.includes(
										index,
									)}
									isInAllBoostsTest={isInAllBoostsTest}
									canPlayInline={false}
									showLabsRedesign={showLabsRedesign}
								/>
							</LI>
						);
					})}
				</UL>
			</>
		);
	}

	return (
		<ScrollableCarousel
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
							absoluteServerTimes={!!absoluteServerTimes}
							containerPalette={containerPalette}
							containerType="scrollable/small"
							showAge={!!showAge}
							headlineSizes={{
								desktop: 'xxsmall',
								mobile: 'xxxsmall',
							}}
							mediaPositionOnDesktop="left"
							mediaPositionOnMobile="left"
							mediaSize="small"
							trailText={undefined} // unsupported
							supportingContent={undefined} // unsupported
							aspectRatio={aspectRatio}
							kickerText={trail.kickerText}
							showLivePlayable={trail.showLivePlayable}
							showTopBarDesktop={desktopBottomCards.includes(
								index,
							)}
							showTopBarMobile={mobileBottomCards.includes(index)}
							canPlayInline={false}
							showLabsRedesign={showLabsRedesign}
						/>
					</ScrollableCarousel.Item>
				);
			})}
		</ScrollableCarousel>
	);
};
