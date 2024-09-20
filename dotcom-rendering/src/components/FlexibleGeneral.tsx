import type { BoostLevel } from '../types/content';
import type {
	DCRContainerPalette,
	DCRFrontCard,
	DCRGroupedTrails,
} from '../types/front';
import type {
	ImagePositionType,
	ImageSizeType,
} from './Card/components/ImageWrapper';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import type { Loading } from './CardPicture';
import { FrontCard } from './FrontCard';
import type { Alignment } from './SupportingContent';

type Props = {
	groupedTrails: DCRGroupedTrails;
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
};

type RowLayout = 'oneCard' | 'oneCardBoosted' | 'twoCard';

type GroupedRow = {
	layout: RowLayout;
	cards: DCRFrontCard[];
};
type GroupedCards = GroupedRow[];

export const decideCardPositions = (cards: DCRFrontCard[]): GroupedCards => {
	const createNewRow = (
		layout: RowLayout,
		card: DCRFrontCard,
	): GroupedRow => ({
		layout,
		cards: [card],
	});

	const addCardToRow = (row: GroupedRow, card: DCRFrontCard): GroupedRow => ({
		cards: [...row.cards, card],
		layout: 'twoCard',
	});

	return cards.reduce<GroupedCards>((acc, card) => {
		// Early return if the card is boosted since it takes up a whole row
		if (card.boostLevel && card.boostLevel !== 'default') {
			return [...acc, createNewRow('oneCardBoosted', card)];
		}

		// Otherwise we need to check the status of the current row
		const row = acc[acc.length - 1];

		// If the current row has one card, we can add one more standard card to it
		// We change the row layout to 'twoCard' to indicate that it is now full
		if (row && row.layout === 'oneCard') {
			return [...acc.slice(0, acc.length - 1), addCardToRow(row, card)];
		} // Otherwise we consider the row to be 'full' and start a new row
		else {
			return [...acc, createNewRow('oneCard', card)];
		}
	}, []);
};

type BoostedSplashProperties = {
	headlineSize: SmallHeadlineSize;
	headlineSizeOnMobile: SmallHeadlineSize;
	headlineSizeOnTablet: SmallHeadlineSize;
	imagePositionOnDesktop: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	supportingContentAlignment: Alignment;
};

/**
 * Boosting a splash card will affect the layout and style of the card. This function will determine the properties of the card based on the boost level.
 */
const decideSplashCardProperties = (
	boostLevel: BoostLevel,
	supportingContentLength: number,
): BoostedSplashProperties => {
	switch (boostLevel) {
		// The default boost level is equal to no boost. It is the same as the default card layout.
		case 'default':
			return {
				headlineSize: 'tiny',
				headlineSizeOnMobile: 'tiny',
				headlineSizeOnTablet: 'tiny',
				imagePositionOnDesktop: 'right',
				imagePositionOnMobile: 'bottom',
				supportingContentAlignment:
					supportingContentLength >= 4 ? 'horizontal' : 'vertical',
			};
		case 'boost':
			return {
				headlineSize: 'small',
				headlineSizeOnMobile: 'small',
				headlineSizeOnTablet: 'small',
				imagePositionOnDesktop: 'right',
				imagePositionOnMobile: 'bottom',
				supportingContentAlignment:
					supportingContentLength >= 4 ? 'horizontal' : 'vertical',
			};
		case 'megaboost':
			return {
				headlineSize: 'medium',
				headlineSizeOnMobile: 'medium',
				headlineSizeOnTablet: 'medium',
				imagePositionOnDesktop: 'bottom',
				imagePositionOnMobile: 'bottom',
				supportingContentAlignment: 'horizontal',
			};
		case 'gigaboost':
			return {
				headlineSize: 'large',
				headlineSizeOnMobile: 'large',
				headlineSizeOnTablet: 'large',
				imagePositionOnDesktop: 'bottom',
				imagePositionOnMobile: 'top',
				supportingContentAlignment: 'horizontal',
			};
	}
};

export const SplashCardLayout = ({
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
	const card = cards[0];
	if (!card) return null;

	const {
		headlineSize,
		headlineSizeOnMobile,
		headlineSizeOnTablet,
		imagePositionOnDesktop,
		imagePositionOnMobile,
		supportingContentAlignment,
	} = decideSplashCardProperties(
		card.boostLevel ?? 'default',
		card.supportingContent?.length ?? 0,
	);

	return (
		<UL padBottom={true}>
			<LI padSides={true}>
				<FrontCard
					trail={card}
					containerPalette={containerPalette}
					containerType="flexible/general"
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					headlineSize={headlineSize}
					headlineSizeOnMobile={headlineSizeOnMobile}
					headlineSizeOnTablet={headlineSizeOnTablet}
					imagePositionOnDesktop={imagePositionOnDesktop}
					imagePositionOnMobile={imagePositionOnMobile}
					imageSize="jumbo"
					trailText={card.trailText}
					supportingContent={card.supportingContent}
					supportingContentAlignment={supportingContentAlignment}
					imageLoading={imageLoading}
					aspectRatio="5:4"
					kickerText={card.kickerText}
					showLivePlayable={card.showLivePlayable}
					boostedFontSizes={true}
				/>
			</LI>
		</UL>
	);
};

type BoostedCardProperties = {
	headlineSize: SmallHeadlineSize;
	headlineSizeOnMobile: SmallHeadlineSize;
	headlineSizeOnTablet: SmallHeadlineSize;
	imageSize: ImageSizeType;
};

/**
 * Boosting a standard card will affect the layout and style of the card. This function will determine the properties of the card based on the boost level.
 */
const decideCardProperties = (
	boostLevel: BoostLevel = 'boost',
): BoostedCardProperties => {
	switch (boostLevel) {
		case 'megaboost':
			return {
				headlineSize: 'huge',
				headlineSizeOnMobile: 'huge',
				headlineSizeOnTablet: 'huge',
				imageSize: 'jumbo',
			};
		case 'boost':
		default:
			return {
				headlineSize: 'large',
				headlineSizeOnMobile: 'large',
				headlineSizeOnTablet: 'large',
				imageSize: 'medium',
			};
	}
};

export const BoostedCardLayout = ({
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
	const card = cards[0];
	if (!card) return null;

	const {
		headlineSize,
		headlineSizeOnMobile,
		headlineSizeOnTablet,
		imageSize,
	} = decideCardProperties(card.boostLevel);
	return (
		<UL padBottom={true}>
			<LI padSides={true}>
				<FrontCard
					trail={card}
					containerPalette={containerPalette}
					containerType="flexible/general"
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					headlineSize={headlineSize}
					headlineSizeOnMobile={headlineSizeOnMobile}
					headlineSizeOnTablet={headlineSizeOnTablet}
					imagePositionOnDesktop={'right'}
					imagePositionOnMobile={'bottom'}
					imageSize={imageSize}
					trailText={card.trailText}
					supportingContent={undefined}
					imageLoading={imageLoading}
					aspectRatio="5:4"
					kickerText={card.kickerText}
					showLivePlayable={card.showLivePlayable}
				/>
			</LI>
		</UL>
	);
};

export const StandardCardLayout = ({
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
	return (
		<UL direction="row" padBottom={padBottom}>
			{cards.map((card, cardIndex) => {
				return (
					<LI
						stretch={false}
						percentage={'50%'}
						key={card.url}
						padSides={true}
						showDivider={cardIndex > 0}
					>
						<FrontCard
							trail={card}
							containerPalette={containerPalette}
							containerType="flexible/general"
							showAge={showAge}
							absoluteServerTimes={absoluteServerTimes}
							image={showImage ? card.image : undefined}
							imageLoading={imageLoading}
							imagePositionOnDesktop={'left'}
							supportingContent={undefined} // we don't want to support sublinks on standard cards here so we hard code to undefined.
							imageSize={'medium'}
							aspectRatio="5:4"
							kickerText={card.kickerText}
							showLivePlayable={false}
						/>
					</LI>
				);
			})}
		</UL>
	);
};

export const FlexibleGeneral = ({
	groupedTrails,
	containerPalette,
	showAge,
	absoluteServerTimes,
	imageLoading,
}: Props) => {
	const splash = [...groupedTrails.splash].slice(0, 1);
	const cards = [...groupedTrails.standard].slice(0, 8);
	const groupedCards = decideCardPositions(cards);

	return (
		<>
			{splash.length > 0 && (
				<SplashCardLayout
					cards={splash}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
				/>
			)}

			{groupedCards.map((row) => {
				switch (row.layout) {
					case 'oneCardBoosted':
						return (
							<BoostedCardLayout
								cards={row.cards}
								containerPalette={containerPalette}
								showAge={showAge}
								absoluteServerTimes={absoluteServerTimes}
								imageLoading={imageLoading}
							/>
						);

					case 'oneCard':
					case 'twoCard':
					default:
						return (
							<StandardCardLayout
								cards={row.cards}
								containerPalette={containerPalette}
								showAge={showAge}
								absoluteServerTimes={absoluteServerTimes}
								imageLoading={imageLoading}
							/>
						);
				}
			})}
		</>
	);
};
