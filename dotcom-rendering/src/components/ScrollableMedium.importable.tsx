import { isMediaCard } from '../lib/cardHelpers';
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
}: Props) => {
	return (
		<UL direction="row">
			{trails.map((trail) => {
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
							serverTime={serverTime}
							containerPalette={containerPalette}
							containerType="scrollable/medium"
							showAge={!!showAge}
							headlineSizes={{
								desktop: 'xsmall',
								tablet: 'xxsmall',
								mobile: 'small',
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
					</LI>
				);
			})}
		</UL>
	);
};
