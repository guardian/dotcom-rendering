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
import { FEContainer } from '../frontend/feFront';

type Props = {
	trails: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
	showImage?: boolean;
	aspectRatio: AspectRatio;
	containerType?: FEContainer;
};

export const FallbackContainer = ({
	trails,
	containerPalette,
	showAge,
	absoluteServerTimes,
	imageLoading,
	showImage = true,
	aspectRatio,
	containerType,
}: Props) => {
	const groupedCards: DCRFrontCard[][] = [];
	const totalCardsInARow = 4;
	for (let i = 0; i < trails.length; i += totalCardsInARow) {
		const row = trails.slice(i, i + totalCardsInARow);
		groupedCards.push(row);
	}
	console.warn(
		`${containerType} container type is deprecated. Please update this container type in the Fronts Config tool.`,
	);

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
								containerType={containerType}
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
