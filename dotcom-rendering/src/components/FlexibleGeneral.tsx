import { ArticleDesign } from '../lib/articleFormat';
import { isMediaCard } from '../lib/cardHelpers';
import { palette } from '../palette';
import type { BoostLevel } from '../types/content';
import type {
	AspectRatio,
	DCRContainerLevel,
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
import { FeatureCard } from './FeatureCard';
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
};

type RowLayout = 'oneCardHalfWidth' | 'oneCardFullWidth' | 'twoCard';

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
		// Early return if the card is boosted or immersive since it takes up a whole row
		if (
			card.isImmersive ||
			(card.boostLevel && card.boostLevel !== 'default')
		) {
			return [...acc, createNewRow('oneCardFullWidth', card)];
		}

		// Otherwise we need to check the status of the current row
		const row = acc[acc.length - 1];

		// If the current row has one card, we can add one more standard card to it
		// We change the row layout to 'twoCard' to indicate that it is now full
		if (row && row.layout === 'oneCardHalfWidth') {
			return [...acc.slice(0, acc.length - 1), addCardToRow(row, card)];
		}
		// Otherwise we consider the row to be 'full' and start a new row
		else {
			return [...acc, createNewRow('oneCardHalfWidth', card)];
		}
	}, []);
};

/**
 * ImmersiveCardLayout is a special case of the card layout that is used for cards with the isImmersive property.
 * It is a single feature card that takes up the full width of the container on all breakpoints.
 * It is used in the FlexibleGeneral only.
 * It can be used in any slot within the container.
 */
const ImmersiveCardLayout = ({
	card,
	containerPalette,
	absoluteServerTimes,
	imageLoading,
	collectionId,
}: {
	card: DCRFrontCard;
	containerPalette?: DCRContainerPalette;
	absoluteServerTimes: boolean;
	imageLoading: Loading;
	collectionId: number;
}) => {
	return (
		<UL padBottom={true}>
			<LI key={card.url} padSides={true}>
				<FeatureCard
					collectionId={collectionId}
					linkTo={card.url}
					format={card.format}
					headlineText={card.headline}
					byline={card.byline}
					showByline={card.showByline}
					webPublicationDate={card.webPublicationDate}
					kickerText={card.kickerText}
					showClock={false}
					image={card.image}
					canPlayInline={true}
					starRating={card.starRating}
					dataLinkName={card.dataLinkName}
					discussionApiUrl={card.discussionApiUrl}
					discussionId={card.discussionId}
					mainMedia={card.mainMedia}
					isExternalLink={card.isExternalLink}
					// branding={card.branding}
					containerPalette={containerPalette}
					trailText={card.trailText}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
					aspectRatio="5:3"
					mobileAspectRatio="4:5"
					imageSize="feature-immersive"
					headlineSizes={{ desktop: 'medium', tablet: 'small' }}
					supportingContent={card.supportingContent}
					isImmersive={true}
					showVideo={card.showVideo}
				/>
			</LI>
		</UL>
	);
};

type BoostedSplashProperties = {
	headlineSizes: ResponsiveFontSize;
	imagePositionOnDesktop: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	imageSize: ImageSizeType;
	supportingContentAlignment: Alignment;
	liveUpdatesAlignment: Alignment;
	trailTextSize: TrailTextSize;
	avatarUrl?: string;
};

/**
 * Boosting a splash card will affect the layout and style of the card.
 * This function will determine the properties of the card based on the boost level.
 */
const decideSplashCardProperties = (
	boostLevel: BoostLevel,
	supportingContentLength: number,
	mediaCard: boolean,
	useLargerHeadlineSizeDesktop: boolean,
	avatarUrl: boolean,
): BoostedSplashProperties => {
	switch (boostLevel) {
		// The default boost level is equal to no boost. It is the same as the default card layout.
		case 'default':
			return {
				headlineSizes: {
					desktop: useLargerHeadlineSizeDesktop ? 'large' : 'medium',
					tablet: 'medium',
					mobile: 'medium',
				},
				imagePositionOnDesktop: 'right',
				imagePositionOnMobile: mediaCard ? 'top' : 'bottom',
				imageSize: 'large',
				supportingContentAlignment:
					supportingContentLength >= 4 ? 'horizontal' : 'vertical',
				liveUpdatesAlignment: 'vertical',
				trailTextSize: 'regular',
			};
		case 'boost':
			return {
				headlineSizes: {
					desktop: useLargerHeadlineSizeDesktop ? 'xlarge' : 'large',
					tablet: 'large',
					mobile: 'large',
				},
				imagePositionOnDesktop: 'right',
				imagePositionOnMobile: mediaCard ? 'top' : 'bottom',
				imageSize: avatarUrl ? 'large' : 'jumbo',
				supportingContentAlignment:
					supportingContentLength >= 4 ? 'horizontal' : 'vertical',
				liveUpdatesAlignment: 'vertical',
				trailTextSize: 'regular',
			};
		case 'megaboost':
			return {
				headlineSizes: {
					desktop: useLargerHeadlineSizeDesktop
						? 'xxlarge'
						: 'xlarge',
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
					desktop: useLargerHeadlineSizeDesktop
						? 'xxxlarge'
						: 'xxlarge',
					tablet: 'xlarge',
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

export const SplashCardLayout = ({
	cards,
	containerPalette,
	showAge,
	absoluteServerTimes,
	imageLoading,
	aspectRatio,
	isLastRow,
	containerLevel,
	collectionId,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
	aspectRatio: AspectRatio;
	isLastRow: boolean;
	containerLevel: DCRContainerLevel;
	collectionId: number;
}) => {
	const card = cards[0];
	if (!card) return null;

	const shouldShowImmersive = card.isImmersive;
	if (shouldShowImmersive) {
		return (
			<ImmersiveCardLayout
				card={card}
				containerPalette={containerPalette}
				absoluteServerTimes={absoluteServerTimes}
				imageLoading={imageLoading}
				collectionId={collectionId}
			/>
		);
	}

	const useLargerHeadlineSizeDesktop =
		// When there's no image, we want the text to take up more space. The exception is Opinion
		// cards, as avatars are more common and command less visual weight than a standard image.
		(!card.image && card.format.design !== ArticleDesign.Comment) ||
		card.showLivePlayable;

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
		isMediaCard(card.format),
		useLargerHeadlineSizeDesktop,
		!!card.avatarUrl,
	);

	return (
		<UL
			padBottom={!isLastRow}
			hasLargeSpacing={!isLastRow}
			showTopBar={false}
		>
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
					aspectRatio={aspectRatio}
					kickerText={card.kickerText}
					showLivePlayable={card.showLivePlayable}
					liveUpdatesAlignment={liveUpdatesAlignment}
					isFlexSplash={true}
					showTopBarDesktop={false}
					showTopBarMobile={
						containerLevel === 'Primary' &&
						!isMediaCard(card.format)
					}
					trailTextSize={trailTextSize}
					canPlayInline={true}
					showKickerImage={card.format.design === ArticleDesign.Audio}
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
 * Boosting a standard card will affect the layout and style of the card.
 * This function will determine the properties of the card based on the boost level.
 */
const decideCardProperties = (
	supportingContentLength: number,
	boostLevel: Omit<BoostLevel, 'default' | 'gigaboost'> = 'boost',
	avatarUrl?: string,
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
				supportingContentAlignment:
					supportingContentLength >= 2 ? 'horizontal' : 'vertical',
			};
		case 'boost':
		default:
			return {
				headlineSizes: {
					desktop: 'small',
					tablet: 'small',
					mobile: 'small',
				},
				imageSize: avatarUrl ? 'large' : 'medium',
				liveUpdatesPosition: 'inner',
				supportingContentAlignment:
					supportingContentLength >= 2 ? 'horizontal' : 'vertical',
			};
	}
};

const FullWidthCardLayout = ({
	cards,
	containerPalette,
	showAge,
	absoluteServerTimes,
	imageLoading,
	aspectRatio,
	isFirstRow,
	isLastRow,
	containerLevel,
	collectionId,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
	aspectRatio: AspectRatio;
	isFirstRow: boolean;
	isLastRow: boolean;
	containerLevel: DCRContainerLevel;
	collectionId: number;
}) => {
	const card = cards[0];
	if (!card) return null;

	const {
		headlineSizes,
		imageSize,
		supportingContentAlignment,
		liveUpdatesPosition,
	} = decideCardProperties(
		card.supportingContent?.length ?? 0,
		card.boostLevel,
		card.avatarUrl,
	);

	const shouldShowImmersive = card.isImmersive;

	if (shouldShowImmersive) {
		return (
			<ImmersiveCardLayout
				card={card}
				containerPalette={containerPalette}
				absoluteServerTimes={absoluteServerTimes}
				imageLoading={imageLoading}
				collectionId={collectionId}
			/>
		);
	}

	return (
		<UL
			showTopBar={!isFirstRow}
			padBottom={!isLastRow}
			hasLargeSpacing={!isLastRow}
		>
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
					imagePositionOnDesktop="right"
					imagePositionOnMobile={
						isMediaCard(card.format) ? 'top' : 'bottom'
					}
					imageSize={imageSize}
					trailText={card.trailText}
					supportingContent={card.supportingContent}
					supportingContentAlignment={
						card.showLivePlayable
							? 'horizontal'
							: supportingContentAlignment
					}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
					kickerText={card.kickerText}
					showLivePlayable={card.showLivePlayable}
					liveUpdatesAlignment="horizontal"
					showTopBarDesktop={false}
					showTopBarMobile={
						!isFirstRow ||
						(containerLevel === 'Primary' &&
							!isMediaCard(card.format))
					}
					liveUpdatesPosition={liveUpdatesPosition}
					canPlayInline={true}
					showKickerImage={card.format.design === ArticleDesign.Audio}
				/>
			</LI>
		</UL>
	);
};

const HalfWidthCardLayout = ({
	cards,
	containerPalette,
	showAge,
	absoluteServerTimes,
	imageLoading,
	isFirstRow,
	isFirstStandardRow,
	aspectRatio,
	isLastRow,
	containerLevel,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	isFirstRow?: boolean;
	isFirstStandardRow?: boolean;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
	aspectRatio: AspectRatio;
	isLastRow: boolean;
	containerLevel: DCRContainerLevel;
}) => {
	if (cards.length === 0) return null;

	return (
		<UL
			direction="row"
			padBottom={!isLastRow}
			hasLargeSpacing={!isLastRow}
			showTopBar={!isFirstRow}
			/** We use one full top bar for the first row and use a split one for subsequent rows */
			splitTopBar={!isFirstStandardRow}
		>
			{cards.map((card, cardIndex) => {
				return (
					<LI
						stretch={false}
						percentage="50%"
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
							image={card.image}
							imageLoading={imageLoading}
							imagePositionOnDesktop="left"
							supportingContent={card.supportingContent?.slice(
								0,
								2,
							)}
							supportingContentAlignment="vertical"
							supportingContentPosition="outer"
							imageSize="medium"
							aspectRatio={aspectRatio}
							kickerText={card.kickerText}
							showLivePlayable={false}
							showTopBarDesktop={false}
							showTopBarMobile={
								!isFirstRow ||
								(containerLevel === 'Primary' &&
									!isMediaCard(card.format)) ||
								(containerLevel !== 'Primary' && cardIndex > 0)
							}
							trailText={undefined}
							headlineSizes={undefined}
							canPlayInline={false}
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
	aspectRatio,
	containerLevel = 'Primary',
	collectionId,
}: Props) => {
	const splash = [...groupedTrails.splash].slice(0, 1);
	const cards = [...groupedTrails.standard].slice(0, 19);
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
					aspectRatio={aspectRatio}
					isLastRow={cards.length === 0}
					containerLevel={containerLevel}
					collectionId={collectionId}
				/>
			)}

			{groupedCards.map((row, i) => {
				switch (row.layout) {
					case 'oneCardFullWidth':
						return (
							<FullWidthCardLayout
								cards={row.cards}
								containerPalette={containerPalette}
								showAge={showAge}
								absoluteServerTimes={absoluteServerTimes}
								imageLoading={imageLoading}
								aspectRatio={aspectRatio}
								isFirstRow={!splash.length && i === 0}
								isLastRow={i === groupedCards.length - 1}
								containerLevel={containerLevel}
								collectionId={collectionId}
							/>
						);

					case 'oneCardHalfWidth':
					case 'twoCard':
					default:
						return (
							<HalfWidthCardLayout
								cards={row.cards}
								containerPalette={containerPalette}
								showAge={showAge}
								absoluteServerTimes={absoluteServerTimes}
								imageLoading={imageLoading}
								isFirstRow={!splash.length && i === 0}
								isFirstStandardRow={i === 0}
								aspectRatio={aspectRatio}
								isLastRow={i === groupedCards.length - 1}
								containerLevel={containerLevel}
							/>
						);
				}
			})}
		</>
	);
};
