import type {
	DCRContainerPalette,
	DCRFrontCard,
	DCRGroupedTrails,
} from '../types/front';
import type { ImageSizeType } from './Card/components/ImageWrapper';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import type { Loading } from './CardPicture';
import { FrontCard } from './FrontCard';

type Props = {
	groupedTrails: DCRGroupedTrails;
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
};

export const OneCardLayout = ({
	cards,
	containerPalette,
	showAge,
	absoluteServerTimes,
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
}) => {
	if (!cards[0]) return null;

	function getCardImageSize(boostLevel: string | undefined): ImageSizeType {
		switch (boostLevel) {
			case 'gigaboost':
			case 'megaboost':
				return 'jumbo';
			case 'boosted':
				return 'large';
			case 'default':
			default:
				return 'medium';
		}
	}

	return (
		<UL padBottom={true}>
			<LI padSides={true}>
				<FrontCard
					trail={cards[0]}
					containerPalette={containerPalette}
					containerType="flexible/special"
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					headlineSize="large"
					headlineSizeOnMobile="medium"
					imagePositionOnDesktop="right"
					imagePositionOnMobile="top"
					imageSize={getCardImageSize(cards[0].boostLevel)}
					trailText={cards[0].trailText}
					supportingContent={cards[0].supportingContent}
					supportingContentAlignment={
						cards[0].supportingContent &&
						cards[0].supportingContent.length > 3
							? 'horizontal'
							: 'vertical'
					}
					imageLoading={imageLoading}
					aspectRatio="5:4"
					kickerText={cards[0].kickerText}
				/>
			</LI>
		</UL>
	);
};

const TwoCardOrFourCardLayout = ({
	cards,
	containerPalette,
	showAge,
	absoluteServerTimes,
	showImage = true,
	padBottom,
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
	showImage?: boolean;
	padBottom?: boolean;
}) => {
	const hasTwoOrFewerCards = cards.length <= 2;
	return (
		<UL direction="row" padBottom={padBottom}>
			{cards.map((card, cardIndex) => {
				return (
					<LI
						stretch={false}
						percentage={hasTwoOrFewerCards ? '50%' : '25%'}
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
							imagePositionOnDesktop={
								hasTwoOrFewerCards ? 'left' : 'bottom'
							}
							imageSize={'medium'}
							aspectRatio="5:4"
							kickerText={card.kickerText}
						/>
					</LI>
				);
			})}
		</UL>
	);
};

export const FlexibleSpecial = ({
	groupedTrails,
	containerPalette,
	showAge,
	absoluteServerTimes,
	imageLoading,
}: Props) => {
	const snaps = [...groupedTrails.snap].slice(0, 1);
	const splash = [...groupedTrails.standard].slice(0, 1);
	const cards = [...groupedTrails.standard].slice(1, 5);

	return (
		<>
			<OneCardLayout
				cards={snaps}
				containerPalette={containerPalette}
				showAge={showAge}
				absoluteServerTimes={absoluteServerTimes}
				imageLoading={imageLoading}
			/>

			<OneCardLayout
				cards={splash}
				containerPalette={containerPalette}
				showAge={showAge}
				absoluteServerTimes={absoluteServerTimes}
				imageLoading={imageLoading}
			/>

			<TwoCardOrFourCardLayout
				cards={cards}
				containerPalette={containerPalette}
				showAge={showAge}
				absoluteServerTimes={absoluteServerTimes}
				imageLoading={imageLoading}
			/>
		</>
	);
};
