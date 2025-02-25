import { isMediaCard } from '../lib/cardHelpers';
import type {
	AspectRatio,
	DCRContainerLevel,
	DCRContainerPalette,
	DCRFrontCard,
} from '../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import type { Loading } from './CardPicture';
import { FrontCard } from './FrontCard';

type Props = {
	trails: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
	showImage?: boolean;
	aspectRatio: AspectRatio;
	containerLevel?: DCRContainerLevel;
};

export const StaticMediumFour = ({
	trails,
	containerPalette,
	showAge,
	absoluteServerTimes,
	imageLoading,
	showImage = true,
	aspectRatio,
	containerLevel = 'Primary',
}: Props) => {
	const cards = trails.slice(0, 4);

	return (
		<UL direction="row">
			{cards.map((card, cardIndex) => {
				return (
					<LI
						stretch={false}
						percentage={'25%'}
						key={card.url}
						padSides={true}
						showDivider={cardIndex > 0}
					>
						<FrontCard
							trail={card}
							containerPalette={containerPalette}
							containerType="static/medium/4"
							showAge={showAge}
							absoluteServerTimes={absoluteServerTimes}
							image={showImage ? card.image : undefined}
							imageLoading={imageLoading}
							imagePositionOnDesktop={
								isMediaCard(card.format) ? 'top' : 'bottom'
							}
							/* we don't want to support sublinks on standard cards here so we hard code to undefined */
							supportingContent={undefined}
							imageSize={'medium'}
							aspectRatio={aspectRatio}
							kickerText={card.kickerText}
							showLivePlayable={false}
							showTopBarDesktop={false}
							showTopBarMobile={
								cardIndex != 0 ||
								(containerLevel === 'Primary' &&
									!isMediaCard(card.format))
							}
							canPlayInline={false}
						/>
					</LI>
				);
			})}
		</UL>
	);
};
