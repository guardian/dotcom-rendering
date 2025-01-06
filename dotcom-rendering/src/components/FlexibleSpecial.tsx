import { ArticleDesign } from 'src/lib/articleFormat';
import { isMediaCard } from '../lib/cardHelpers';
import type { BoostLevel } from '../types/content';
import type {
	AspectRatio,
	DCRContainerPalette,
	DCRFrontCard,
	DCRGroupedTrails,
} from '../types/front';
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
	aspectRatio: AspectRatio;
};

type BoostProperties = {
	headlineSizes: ResponsiveFontSize;
	imagePositionOnDesktop: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	imageSize: ImageSizeType;
	supportingContentAlignment: Alignment;
	liveUpdatesAlignment: Alignment;
	trailTextSize: TrailTextSize;
};

/**
 * Boosting a card will affect the layout and style of the card. This function will determine the properties of the card based on the boost level.
 */
const determineCardProperties = (
	boostLevel: BoostLevel,
	supportingContentLength: number,
	mediaCard: boolean,
): BoostProperties => {
	switch (boostLevel) {
		// The default boost level is equal to no boost. It is the same as the default card layout.
		case 'default':
			return {
				headlineSizes: {
					desktop: 'xlarge',
					tablet: 'large',
					mobile: 'medium',
				},
				imagePositionOnDesktop: 'right',
				imagePositionOnMobile: mediaCard ? 'top' : 'bottom',
				imageSize: 'large',
				supportingContentAlignment:
					supportingContentLength >= 3 ? 'horizontal' : 'vertical',
				liveUpdatesAlignment: 'vertical',
				trailTextSize: 'regular',
			};

		case 'boost':
			return {
				headlineSizes: {
					desktop: 'xxlarge',
					tablet: 'xlarge',
					mobile: 'large',
				},
				imagePositionOnDesktop: 'right',
				imagePositionOnMobile: mediaCard ? 'top' : 'bottom',
				imageSize: 'jumbo',
				supportingContentAlignment:
					supportingContentLength >= 3 ? 'horizontal' : 'vertical',
				liveUpdatesAlignment: 'horizontal',
				trailTextSize: 'regular',
			};
		case 'megaboost':
			return {
				headlineSizes: {
					desktop: 'xxlarge',
					tablet: 'xlarge',
					mobile: 'xlarge',
				},
				imagePositionOnDesktop: mediaCard ? 'top' : 'bottom',
				imagePositionOnMobile: mediaCard ? 'top' : 'bottom',
				imageSize: 'jumbo',
				supportingContentAlignment: 'horizontal',
				liveUpdatesAlignment: 'horizontal',
				trailTextSize: 'large',
			};
		case 'gigaboost':
			return {
				headlineSizes: {
					desktop: 'xxxlarge',
					tablet: 'xxlarge',
					mobile: 'xxlarge',
				},
				imagePositionOnDesktop: mediaCard ? 'top' : 'bottom',
				imagePositionOnMobile: mediaCard ? 'top' : 'bottom',
				imageSize: 'jumbo',
				supportingContentAlignment: 'horizontal',
				liveUpdatesAlignment: 'horizontal',
				trailTextSize: 'large',
			};
	}
};
export const OneCardLayout = ({
	cards,
	containerPalette,
	showAge,
	absoluteServerTimes,
	imageLoading,
	aspectRatio,
	isLastRow,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
	aspectRatio: AspectRatio;
	isLastRow: boolean;
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
	} = determineCardProperties(
		card.boostLevel ?? 'default',
		card.supportingContent?.length ?? 0,
		isMediaCard(card.format),
	);
	return (
		<UL padBottom={!isLastRow} hasLargeSpacing={!isLastRow}>
			<LI padSides={true}>
				<FrontCard
					trail={card}
					containerPalette={containerPalette}
					containerType="flexible/special"
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					headlineSizes={headlineSizes}
					imagePositionOnDesktop={imagePositionOnDesktop}
					imagePositionOnMobile={imagePositionOnMobile}
					imageSize={imageSize}
					trailText={card.trailText}
					supportingContent={card.supportingContent}
					supportingContentAlignment={supportingContentAlignment}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
					kickerText={card.kickerText}
					showLivePlayable={card.showLivePlayable}
					liveUpdatesAlignment={liveUpdatesAlignment}
					isFlexSplash={true}
					showTopBarDesktop={false}
					showTopBarMobile={true}
					trailTextSize={trailTextSize}
					canPlayInline={true}
					showKickerImage={card.format.design === ArticleDesign.Audio}
				/>
			</LI>
		</UL>
	);
};

const getImagePosition = (
	hasTwoOrFewerCards: boolean,
	isAMediaCard: boolean,
) => {
	if (isAMediaCard && !hasTwoOrFewerCards) return 'top';
	if (hasTwoOrFewerCards) return 'left';
	return 'bottom';
};

const TwoCardOrFourCardLayout = ({
	cards,
	containerPalette,
	showAge,
	absoluteServerTimes,
	showImage = true,
	imageLoading,
	aspectRatio,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
	showImage?: boolean;
	aspectRatio: AspectRatio;
}) => {
	if (cards.length === 0) return null;
	const hasTwoOrFewerCards = cards.length <= 2;
	return (
		<UL direction="row" showTopBar={true}>
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
							imagePositionOnDesktop={getImagePosition(
								hasTwoOrFewerCards,
								isMediaCard(card.format),
							)}
							/* we don't want to support sublinks on standard cards here so we hard code to undefined */
							supportingContent={undefined}
							imageSize={'medium'}
							aspectRatio={aspectRatio}
							kickerText={card.kickerText}
							showLivePlayable={false}
							showTopBarDesktop={false}
							showTopBarMobile={true}
							canPlayInline={false}
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
	aspectRatio,
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
				aspectRatio={aspectRatio}
				isLastRow={splash.length === 0 && cards.length === 0}
			/>
			<OneCardLayout
				cards={splash}
				containerPalette={containerPalette}
				showAge={showAge}
				absoluteServerTimes={absoluteServerTimes}
				imageLoading={imageLoading}
				aspectRatio={aspectRatio}
				isLastRow={cards.length === 0}
			/>
			<TwoCardOrFourCardLayout
				cards={cards}
				containerPalette={containerPalette}
				showAge={showAge}
				absoluteServerTimes={absoluteServerTimes}
				imageLoading={imageLoading}
				aspectRatio={aspectRatio}
			/>
		</>
	);
};
