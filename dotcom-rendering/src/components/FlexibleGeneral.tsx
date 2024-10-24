import { palette } from '../palette';
import type { BoostLevel } from '../types/content';
import type {
	DCRContainerPalette,
	DCRFrontCard,
	DCRGroupedTrails,
} from '../types/front';
import type { Position } from './Card/Card';
import type {
	ImagePositionType,
	ImageSizeType,
} from './Card/components/ImageWrapper';
import { LI } from './Card/components/LI';
import type { TrailTextSize } from './Card/components/TrailText';
import { UL } from './Card/components/UL';
import type { ResponsiveFontSize } from './CardHeadline';
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
	headlineSizes: ResponsiveFontSize;
	imagePositionOnDesktop: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	imageSize: ImageSizeType;
	supportingContentAlignment: Alignment;
	liveUpdatesAlignment: Alignment;
	trailTextSize: TrailTextSize;
};

/**
 * Boosting a splash card will affect the layout and style of the card. This function will determine the properties of the card based on the boost level.
 */
const decideSplashCardProperties = (
	boostLevel: BoostLevel,
	supportingContentLength: number,
): BoostedSplashProperties => {
	switch (boostLevel) {
		// boostedfont sizing
		// The default boost level is equal to no boost. It is the same as the default card layout.
		case 'default':
			return {
				headlineSizes: {
					desktop: 'medium',
					tablet: 'medium',
					mobile: 'medium',
				},
				imagePositionOnDesktop: 'right',
				imagePositionOnMobile: 'bottom',
				imageSize: 'large',
				supportingContentAlignment:
					supportingContentLength >= 4 ? 'horizontal' : 'vertical',
				liveUpdatesAlignment: 'vertical',
				trailTextSize: 'regular',
			};
		case 'boost':
			return {
				headlineSizes: {
					desktop: 'large',
					tablet: 'large',
					mobile: 'large',
				},
				imagePositionOnDesktop: 'right',
				imagePositionOnMobile: 'bottom',
				imageSize: 'jumbo',
				supportingContentAlignment:
					supportingContentLength >= 4 ? 'horizontal' : 'vertical',
				liveUpdatesAlignment: 'vertical',
				trailTextSize: 'regular',
			};
		case 'megaboost':
			return {
				headlineSizes: {
					desktop: 'xlarge',
					tablet: 'xlarge',
					mobile: 'xlarge',
				},
				imagePositionOnDesktop: 'bottom',
				imagePositionOnMobile: 'bottom',
				imageSize: 'jumbo',
				supportingContentAlignment: 'horizontal',
				liveUpdatesAlignment: 'horizontal',
				trailTextSize: 'large',
			};
		case 'gigaboost':
			return {
				headlineSizes: {
					desktop: 'xxlarge',
					tablet: 'xlarge',
					mobile: 'xxlarge',
				},
				imagePositionOnDesktop: 'bottom',
				imagePositionOnMobile: 'bottom',
				imageSize: 'jumbo',
				supportingContentAlignment: 'horizontal',
				liveUpdatesAlignment: 'horizontal',
				trailTextSize: 'large',
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
		headlineSizes,
		imagePositionOnDesktop,
		imagePositionOnMobile,
		imageSize,
		supportingContentAlignment,
		liveUpdatesAlignment,
		trailTextSize,
	} = decideSplashCardProperties(
		card.boostLevel ?? 'default',
		card.supportingContent?.length ?? 0,
	);

	return (
		<UL padBottom={true} isFlexibleContainer={true} showTopBar={false}>
			<LI
				padSides={true}
				verticalDividerColour={palette('--card-border-supporting')}
			>
				<FrontCard
					trail={card}
					containerPalette={containerPalette}
					containerType="flexible/general"
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					headlineSizes={headlineSizes}
					imagePositionOnDesktop={imagePositionOnDesktop}
					imagePositionOnMobile={imagePositionOnMobile}
					imageSize={imageSize}
					trailText={card.trailText}
					supportingContent={card.supportingContent}
					supportingContentAlignment={
						card.showLivePlayable
							? 'horizontal'
							: supportingContentAlignment
					}
					imageLoading={imageLoading}
					aspectRatio="5:4"
					kickerText={card.kickerText}
					showLivePlayable={card.showLivePlayable}
					liveUpdatesAlignment={liveUpdatesAlignment}
					isFlexSplash={true}
					showTopBarDesktop={false}
					showTopBarMobile={true}
					trailTextSize={trailTextSize}
				/>
			</LI>
		</UL>
	);
};

type BoostedCardProperties = {
	headlineSizes: ResponsiveFontSize;
	imageSize: ImageSizeType;
	liveUpdatesPosition: Position;
	supportingContentAlignment: Alignment;
};

/**
 * Boosting a standard card will affect the layout and style of the card. This function will determine the properties of the card based on the boost level.
 */
const decideCardProperties = (
	boostLevel: Omit<BoostLevel, 'default' | 'gigaboost'> = 'boost',
): BoostedCardProperties => {
	switch (boostLevel) {
		case 'megaboost':
			return {
				headlineSizes: {
					desktop: 'medium',
					tablet: 'small',
					mobile: 'medium',
				},
				imageSize: 'jumbo',
				liveUpdatesPosition: 'outer',
				supportingContentAlignment: 'horizontal',
			};
		case 'boost':
		default:
			return {
				headlineSizes: {
					desktop: 'small',
					tablet: 'small',
					mobile: 'small',
				},
				imageSize: 'medium',
				liveUpdatesPosition: 'inner',
				supportingContentAlignment: 'horizontal',
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
		headlineSizes,
		imageSize,
		supportingContentAlignment,
		liveUpdatesPosition,
	} = decideCardProperties(card.boostLevel);
	return (
		<UL padBottom={true} isFlexibleContainer={true} showTopBar={true}>
			<LI
				padSides={true}
				verticalDividerColour={palette('--card-border-supporting')}
			>
				<FrontCard
					trail={card}
					containerPalette={containerPalette}
					containerType="flexible/general"
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					headlineSizes={headlineSizes}
					imagePositionOnDesktop={'right'}
					imagePositionOnMobile={'bottom'}
					imageSize={imageSize}
					trailText={card.trailText}
					supportingContent={card.supportingContent}
					supportingContentAlignment={
						card.showLivePlayable
							? 'horizontal'
							: supportingContentAlignment
					}
					imageLoading={imageLoading}
					aspectRatio="5:4"
					kickerText={card.kickerText}
					showLivePlayable={card.showLivePlayable}
					liveUpdatesAlignment="horizontal"
					showTopBarDesktop={false}
					showTopBarMobile={true}
					liveUpdatesPosition={liveUpdatesPosition}
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
	imageLoading,
	isFirstRow,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	isFirstRow: boolean;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
	showImage?: boolean;
}) => {
	return (
		<UL
			direction="row"
			padBottom={true}
			isFlexibleContainer={true}
			showTopBar={true}
			splitTopBar={!isFirstRow}
		>
			{cards.map((card, cardIndex) => {
				return (
					<LI
						stretch={false}
						percentage={'50%'}
						key={card.url}
						padSides={true}
						showDivider={cardIndex > 0}
						verticalDividerColour={palette(
							'--card-border-supporting',
						)}
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
							supportingContent={card.supportingContent}
							supportingContentAlignment="vertical"
							supportingContentPosition="outer"
							imageSize={'medium'}
							aspectRatio="5:4"
							kickerText={card.kickerText}
							showLivePlayable={false}
							showTopBarDesktop={false}
							showTopBarMobile={true}
							// On standard cards, we only show the trail text if the trail image has been hidden
							trailText={!card.image ? card.trailText : undefined}
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

			{groupedCards.map((row, i) => {
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
								isFirstRow={i === 0}
							/>
						);
				}
			})}
		</>
	);
};
