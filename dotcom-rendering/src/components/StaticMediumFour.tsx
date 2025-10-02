import type { ArticleFormat } from '../lib/articleFormat';
import { isMediaCard } from '../lib/cardHelpers';
import type {
	AspectRatio,
	DCRContainerLevel,
	DCRContainerPalette,
	DCRFrontCard,
} from '../types/front';
import { LI } from './Card/components/LI';
import type { MediaPositionType } from './Card/components/MediaWrapper';
import { UL } from './Card/components/UL';
import type { Loading } from './CardPicture';
import { FrontCard } from './FrontCard';

const getMediaPositionOnDesktop = (
	format: ArticleFormat,
	isNewsletter: boolean,
): MediaPositionType => {
	if (isMediaCard(format) || isNewsletter) {
		return 'top';
	}

	return 'bottom';
};

type Props = {
	trails: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
	showImage?: boolean;
	aspectRatio: AspectRatio;
	containerLevel?: DCRContainerLevel;
	/** Feature flag for the labs redesign work */
	showLabsRedesign?: boolean;
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
	showLabsRedesign,
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
							mediaPositionOnDesktop={getMediaPositionOnDesktop(
								card.format,
								!!card.isNewsletter,
							)}
							/* we don't want to support sublinks on standard cards here so we hard code to undefined */
							supportingContent={undefined}
							mediaSize="medium"
							aspectRatio={aspectRatio}
							kickerText={card.kickerText}
							showLivePlayable={false}
							showTopBarDesktop={false}
							showTopBarMobile={
								cardIndex !== 0 ||
								(containerLevel === 'Primary' &&
									!isMediaCard(card.format))
							}
							canPlayInline={false}
							showLabsRedesign={showLabsRedesign}
						/>
					</LI>
				);
			})}
		</UL>
	);
};
