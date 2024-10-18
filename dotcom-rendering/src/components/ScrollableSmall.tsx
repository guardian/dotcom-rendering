import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { palette } from '../palette';
import type {
	DCRContainerPalette,
	DCRContainerType,
	DCRFrontCard,
} from '../types/front';
import { FrontCard } from './FrontCard';
import { Island } from './Island';
import { ScrollableCarousel } from './ScrollableCarousel.Importable';

type Props = {
	trails: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes?: boolean;
	imageLoading: 'lazy' | 'eager';
	containerType: DCRContainerType;
};

const itemStyles = css`
	scroll-snap-align: start;
	grid-area: span 1;
	position: relative;
`;

const verticalLineStyles = css`
	:not(:last-child)::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		right: -10px;
		width: 1px;
		background-color: ${palette('--card-border-top')};
		transform: translateX(-50%);
	}
	${from.leftCol} {
		:first-child::before {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			left: -10px;
			width: 1px;
			background-color: ${palette('--card-border-top')};
			transform: translateX(-50%);
		}
	}
`;

/**
 * A container used on fronts to display a carousel of small cards
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
		<Island priority="feature" defer={{ until: 'visible' }}>
			<ScrollableCarousel carouselLength={trails.length}>
				{trails.map((trail) => {
					return (
						<li
							key={trail.url}
							css={[itemStyles, verticalLineStyles]}
						>
							<FrontCard
								trail={trail}
								imageLoading={imageLoading}
								absoluteServerTimes={!!absoluteServerTimes}
								containerPalette={containerPalette}
								containerType={containerType}
								showAge={!!showAge}
								headlineSize="small"
								headlineSizeOnMobile="small"
								headlineSizeOnTablet="small"
								imagePositionOnDesktop="left"
								imagePositionOnMobile="left"
								imageSize="small" // TODO - needs fixed width images
								trailText={undefined} // unsupported
								supportingContent={undefined} // unsupported
								aspectRatio="5:4"
								kickerText={trail.kickerText}
								showLivePlayable={trail.showLivePlayable}
								showTopBarDesktop={false}
								showTopBarMobile={false}
							/>
						</li>
					);
				})}
			</ScrollableCarousel>
		</Island>
	);
};
