import { ArticleDesign } from '../lib/articleFormat';
import { isMediaCard } from '../lib/cardHelpers';
import { isNonEmptyArray } from '../lib/tuple';
import type { BoostLevel } from '../types/content';
import type {
	AspectRatio,
	DCRContainerLevel,
	DCRContainerPalette,
	DCRFrontCard,
	DCRGroupedTrails,
} from '../types/front';
import { LI } from './Card/components/LI';
import type {
	MediaPositionType,
	MediaSizeType,
} from './Card/components/MediaWrapper';
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
	containerLevel?: DCRContainerLevel;
	collectionId: number;
	showLabsRedesign?: boolean;
};

type BoostProperties = {
	headlineSizes: ResponsiveFontSize;
	mediaSize: MediaSizeType;
	mediaPositionOnDesktop: MediaPositionType;
	mediaPositionOnMobile: MediaPositionType;
	supportingContentAlignment: Alignment;
	liveUpdatesAlignment: Alignment;
	trailTextSize: TrailTextSize;
};

/**
 * Boosting a card will affect the layout and style of the card. This function
 * will determine the properties of the card based on the boost level.
 */
const determineCardProperties = (
	boostLevel: BoostLevel,
	supportingContentLength: number,
	mediaCard: boolean,
	imageSuppressed: boolean,
): BoostProperties => {
	switch (boostLevel) {
		// The default boost level is equal to no boost. It is the same as the default card layout.
		case 'default':
			return {
				headlineSizes: {
					desktop: imageSuppressed ? 'xxlarge' : 'xlarge',
					tablet: 'large',
					mobile: 'medium',
				},
				mediaSize: 'xlarge',
				mediaPositionOnDesktop: 'right',
				mediaPositionOnMobile: mediaCard ? 'top' : 'bottom',
				supportingContentAlignment:
					supportingContentLength >= 3 ? 'horizontal' : 'vertical',
				liveUpdatesAlignment: 'vertical',
				trailTextSize: 'regular',
			};
		case 'boost':
			return {
				headlineSizes: {
					desktop: imageSuppressed ? 'xxxlarge' : 'xxlarge',
					tablet: 'xlarge',
					mobile: 'large',
				},
				mediaSize: 'xlarge',
				mediaPositionOnDesktop: 'right',
				mediaPositionOnMobile: mediaCard ? 'top' : 'bottom',
				supportingContentAlignment:
					supportingContentLength >= 3 ? 'horizontal' : 'vertical',
				liveUpdatesAlignment: 'vertical',
				trailTextSize: 'regular',
			};
		case 'megaboost':
			return {
				headlineSizes: {
					desktop: imageSuppressed ? 'xxxlarge' : 'xxlarge',
					tablet: 'xlarge',
					mobile: 'xlarge',
				},
				mediaSize: 'jumbo',
				mediaPositionOnDesktop: mediaCard ? 'top' : 'bottom',
				mediaPositionOnMobile: mediaCard ? 'top' : 'bottom',
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
				mediaSize: 'jumbo',
				mediaPositionOnDesktop: mediaCard ? 'top' : 'bottom',
				mediaPositionOnMobile: mediaCard ? 'top' : 'bottom',
				supportingContentAlignment: 'horizontal',
				liveUpdatesAlignment: 'horizontal',
				trailTextSize: 'large',
			};
	}
};

type OneCardLayoutProps = {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
	aspectRatio: AspectRatio;
	isLastRow: boolean;
	isFirstRow: boolean;
	containerLevel: DCRContainerLevel;
	isSplashCard?: boolean;
	showLabsRedesign?: boolean;
};

export const OneCardLayout = ({
	cards,
	containerPalette,
	showAge,
	absoluteServerTimes,
	imageLoading,
	aspectRatio,
	isLastRow,
	isFirstRow,
	containerLevel,
	isSplashCard,
	showLabsRedesign,
}: OneCardLayoutProps) => {
	const card = cards[0];
	if (!card) return null;

	const {
		headlineSizes,
		mediaSize,
		mediaPositionOnDesktop,
		mediaPositionOnMobile,
		supportingContentAlignment,
		liveUpdatesAlignment,
		trailTextSize,
	} = determineCardProperties(
		card.boostLevel ?? 'default',
		card.supportingContent?.length ?? 0,
		isMediaCard(card.format),
		!card.image,
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
					mediaSize={mediaSize}
					mediaPositionOnDesktop={mediaPositionOnDesktop}
					mediaPositionOnMobile={mediaPositionOnMobile}
					trailText={card.trailText}
					supportingContent={card.supportingContent}
					supportingContentAlignment={supportingContentAlignment}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
					kickerText={card.kickerText}
					showLivePlayable={card.showLivePlayable}
					liveUpdatesAlignment={liveUpdatesAlignment}
					isFlexSplash={true}
					showTopBarDesktop={!isFirstRow}
					showTopBarMobile={
						!isFirstRow ||
						(containerLevel === 'Primary' &&
							!isMediaCard(card.format))
					}
					trailTextSize={trailTextSize}
					canPlayInline={true}
					showKickerImage={card.format.design === ArticleDesign.Audio}
					headlinePosition={isSplashCard ? 'outer' : 'inner'}
					showLabsRedesign={showLabsRedesign}
				/>
			</LI>
		</UL>
	);
};

const getImagePosition = (
	hasTwoOrFewerCards: boolean,
	isMediaCardOrNewsletter: boolean,
) => {
	if (hasTwoOrFewerCards) return 'left';

	if (isMediaCardOrNewsletter) return 'top';

	return 'bottom';
};

type TwoOrFourCardLayoutProps = {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
	showImage?: boolean;
	aspectRatio: AspectRatio;
	isFirstRow: boolean;
	containerLevel: DCRContainerLevel;
	/** Feature flag for the labs redesign work */
	showLabsRedesign?: boolean;
};

const TwoOrFourCardLayout = ({
	cards,
	containerPalette,
	showAge,
	absoluteServerTimes,
	showImage = true,
	imageLoading,
	aspectRatio,
	isFirstRow,
	containerLevel,
	showLabsRedesign,
}: TwoOrFourCardLayoutProps) => {
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
							mediaPositionOnDesktop={getImagePosition(
								hasTwoOrFewerCards,
								isMediaCard(card.format) || !!card.isNewsletter,
							)}
							mediaPositionOnMobile="left"
							headlineSizes={undefined}
							/* we don't want to support sublinks on standard cards here so we hard code to undefined */
							supportingContent={undefined}
							mediaSize="small"
							aspectRatio={aspectRatio}
							kickerText={card.kickerText}
							showLivePlayable={false}
							showTopBarDesktop={false}
							showTopBarMobile={
								!isFirstRow ||
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

export const FlexibleSpecial = ({
	groupedTrails,
	containerPalette,
	showAge,
	absoluteServerTimes,
	imageLoading,
	aspectRatio,
	containerLevel = 'Primary',
	collectionId,
	showLabsRedesign,
}: Props) => {
	const snaps = [...groupedTrails.snap].slice(0, 1).map((snap) => ({
		...snap,
		uniqueId: `collection-${collectionId}-snap-0`,
	}));
	const splash = [...groupedTrails.standard].slice(0, 1).map((snap) => ({
		...snap,
		uniqueId: `collection-${collectionId}-splash-0`,
	}));
	const cards = [...groupedTrails.standard].slice(1, 5).map((snap, i) => ({
		...snap,
		uniqueId: `collection-${collectionId}-standard-${i}`,
	}));

	return (
		<>
			{isNonEmptyArray(snaps) && (
				<OneCardLayout
					cards={snaps}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
					isFirstRow={true}
					isLastRow={splash.length === 0 && cards.length === 0}
					containerLevel={containerLevel}
					isSplashCard={false}
					showLabsRedesign={showLabsRedesign}
				/>
			)}
			{isNonEmptyArray(splash) && (
				<OneCardLayout
					cards={splash}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
					isLastRow={cards.length === 0}
					isFirstRow={!isNonEmptyArray(snaps)}
					containerLevel={containerLevel}
					isSplashCard={true}
					showLabsRedesign={showLabsRedesign}
				/>
			)}

			<TwoOrFourCardLayout
				cards={cards}
				containerPalette={containerPalette}
				showAge={showAge}
				absoluteServerTimes={absoluteServerTimes}
				imageLoading={imageLoading}
				aspectRatio={aspectRatio}
				isFirstRow={!isNonEmptyArray(snaps) && !isNonEmptyArray(splash)}
				containerLevel={containerLevel}
				showLabsRedesign={showLabsRedesign}
			/>
		</>
	);
};
