import type { BoostLevel } from '../types/content';
import type {
	DCRContainerPalette,
	DCRFrontCard,
	DCRGroupedTrails,
} from '../types/front';
import type { ImagePositionType } from './Card/components/ImageWrapper';
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

type boostProperties = {
	headlineSize: SmallHeadlineSize;
	headlineSizeOnMobile: SmallHeadlineSize;
	headlineSizeOnTablet: SmallHeadlineSize;
	imagePositionOnDesktop: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	supportingContentAlignment: Alignment;
};

type RowLayout = 'oneCard' | 'oneCardBoosted' | 'twoCard';

type GroupedRow = {
	rowLayout: RowLayout;
	cards: DCRFrontCard[];
};
type GroupedCards = GroupedRow[];

export const determineCardPositions = (cards: DCRFrontCard[]): GroupedCards => {
	return cards.reduce(
		(acc: GroupedCards, card: DCRFrontCard): GroupedCards => {
			/// if, the accumulator is empty, add the card to a new row.
			if (acc.length === 0) {
				const firstRow: GroupedRow = {
					rowLayout: 'oneCard',
					cards: [card],
				};
				return [firstRow];
			}

			// If the new card is boosted, we always create a new row
			if (card.boostLevel !== 'default') {
				const newRow: GroupedRow = {
					rowLayout: 'oneCardBoosted',
					cards: [card],
				};
				return [...acc, newRow];
			}

			// If the new card is a standard, we need to check if there is
			//  space in the current row before creating a new one

			// Which row are we currently on?
			const currentRow = acc[acc.length - 1];

			if (!currentRow) {
				return acc;
			}

			if (currentRow.cards.length < 2) {
				const accWithoutCurrentRow = acc.slice(0, acc.length);
				const updatedCurrentRow: GroupedRow = {
					rowLayout: 'twoCard',
					cards: [...currentRow.cards, card],
				};
				return [...accWithoutCurrentRow, updatedCurrentRow];
			} else {
				// we need to start a new row
				const newRow: GroupedRow = {
					rowLayout: 'oneCard',
					cards: [card],
				};
				return [newRow];
			}
		},
		[],
	);
};

/**
 * Boosting a card will affect the layout and style of the card. This function will determine the properties of the card based on the boost level.
 */
const determineCardProperties = (
	boostLevel: BoostLevel = 'default',
	supportingContentLength: number,
): boostProperties => {
	switch (boostLevel) {
		// The default boost level is equal to no boost. It is the same as the default card layout.
		case 'default':
			return {
				headlineSize: 'medium',
				headlineSizeOnMobile: 'tiny',
				headlineSizeOnTablet: 'small',
				imagePositionOnDesktop: 'right',
				imagePositionOnMobile: 'top',
				supportingContentAlignment:
					supportingContentLength >= 3 ? 'horizontal' : 'vertical',
			};
		case 'boost':
			return {
				headlineSize: 'large',
				headlineSizeOnMobile: 'small',
				headlineSizeOnTablet: 'medium',
				imagePositionOnDesktop: 'right',
				imagePositionOnMobile: 'top',
				supportingContentAlignment:
					supportingContentLength >= 3 ? 'horizontal' : 'vertical',
			};
		case 'megaboost':
			return {
				headlineSize: 'large',
				headlineSizeOnMobile: 'medium',
				headlineSizeOnTablet: 'medium',
				imagePositionOnDesktop: 'bottom',
				imagePositionOnMobile: 'top',
				supportingContentAlignment: 'horizontal',
			};
		case 'gigaboost':
			return {
				headlineSize: 'huge',
				headlineSizeOnMobile: 'large',
				headlineSizeOnTablet: 'large',
				imagePositionOnDesktop: 'bottom',
				imagePositionOnMobile: 'top',
				supportingContentAlignment: 'horizontal',
			};
	}
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
	const card = cards[0];
	if (!card) return null;

	const {
		headlineSize,
		headlineSizeOnMobile,
		headlineSizeOnTablet,
		imagePositionOnDesktop,
		imagePositionOnMobile,
		supportingContentAlignment,
	} = determineCardProperties(
		card.boostLevel,
		card?.supportingContent?.length ?? 0,
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
	const cards = [...groupedTrails.standard].slice(0, 8); // TODO check maximum number of cards

	return (
		<>
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
