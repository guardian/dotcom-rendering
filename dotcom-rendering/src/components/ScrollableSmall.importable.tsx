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

type Props = {
	trails: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	serverTime?: number;
	imageLoading: 'lazy' | 'eager';
	aspectRatio: AspectRatio;
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
}: Props) => {
	const mobileBottomCards = [1, 3];
	const desktopBottomCards = [2, 3];

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
								canPlayInline={false}
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
								serverTime={serverTime}
								containerPalette={containerPalette}
								containerType="scrollable/small"
								showAge={!!showAge}
								headlineSizes={{
									desktop: 'xxsmall',
									tablet: 'xxxsmall',
									mobile: 'small',
								}}
								mediaPositionOnDesktop="left"
								mediaPositionOnMobile="bottom"
								mediaSize="scrollable-small"
								trailText={undefined}
								supportingContent={undefined} // unsupported
								aspectRatio={aspectRatio}
								kickerText={trail.kickerText}
								showLivePlayable={false}
								showTopBarDesktop={desktopBottomCards.includes(
									index,
								)}
								showTopBarMobile={mobileBottomCards.includes(
									index,
								)}
								canPlayInline={false}
							/>
						</LI>
					);
				})}
			</UL>
		</>
	);
};
