import type { DCRContainerPalette, DCRFrontCard } from 'src/types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { Loading } from './CardPicture';
import { FrontCard } from './FrontCard';

type Props = {
	trails: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
	showImage?: boolean;
};

export const StaticMediumFour = ({
	trails,
	containerPalette,
	showAge,
	absoluteServerTimes,
	imageLoading,
	showImage = true,
}: Props) => {
	const cards = trails.splice(0, 4);

	return (
		<UL
			direction="row"
			padBottom={true}
			showTopBar={true}
			isFlexibleContainer={true}
		>
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
							containerType="flexible/special"
							showAge={showAge}
							absoluteServerTimes={absoluteServerTimes}
							image={showImage ? card.image : undefined}
							imageLoading={imageLoading}
							imagePositionOnDesktop={'bottom'}
							/* we don't want to support sublinks on standard cards here so we hard code to undefined */
							supportingContent={undefined}
							imageSize={'medium'}
							aspectRatio="5:4"
							kickerText={card.kickerText}
							showLivePlayable={false}
							showTopBarDesktop={false}
							showTopBarMobile={true}
						/>
					</LI>
				);
			})}
		</UL>
	);
};
