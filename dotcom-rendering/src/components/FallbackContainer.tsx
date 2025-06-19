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

export const FallbackContainer = ({
	trails,
	containerPalette,
	showAge,
	absoluteServerTimes,
	imageLoading,
	showImage = true,
	aspectRatio,
	containerLevel = 'Primary',
}: Props) => {
	const groupedCards: DCRFrontCard[][] = [];
	const totalCardsInARow = 4;
	for (let i = 0; i < trails.length; i += totalCardsInARow) {
		const row = trails.slice(i, i + totalCardsInARow);
		groupedCards.push(row);
	}

	return (
		<>
			{groupedCards.map((row, rowIndex) => (
				<UL direction="row" key={rowIndex} padBottom={true}>
					{row.map((card, cardIndex) => (
						<LI
							stretch={false}
							percentage="25%"
							key={card.url}
							padSides={true}
							showDivider={cardIndex > 0}
						>
							<FrontCard
								trail={card}
								containerPalette={containerPalette}
								containerType="fallback/container"
								showAge={showAge}
								absoluteServerTimes={absoluteServerTimes}
								image={showImage ? card.image : undefined}
								imageLoading={imageLoading}
								imagePositionOnDesktop="top"
								supportingContent={undefined}
								imageSize="medium"
								aspectRatio={aspectRatio}
								kickerText={card.kickerText}
								showLivePlayable={false}
								showTopBarDesktop={rowIndex !== 0}
								showTopBarMobile={cardIndex !== 0}
								canPlayInline={false}
							/>
						</LI>
					))}
				</UL>
			))}
		</>
	);
};
