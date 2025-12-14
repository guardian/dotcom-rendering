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
import { LI } from './Card/components/LI';
import type {
	MediaPositionType,
	MediaSizeType,
} from './Card/components/MediaWrapper';
import type { TrailTextSize } from './Card/components/TrailText';
import { UL } from './Card/components/UL';
import type { ResponsiveFontSize } from './CardHeadline';
import type { Loading } from './CardPicture';
import { FeatureCard } from './FeatureCard';
import { FrontCard } from './FrontCard';
import type { SubtitleSize } from './SelfHostedVideoPlayer';
import type { Alignment } from './SupportingContent';

type Props = {
	groupedTrails: DCRGroupedTrails;
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	serverTime?: number;
	aspectRatio: AspectRatio;
	containerLevel?: DCRContainerLevel;
	collectionId: number;
	/** Feature flag for the labs redesign work */
	showLabsRedesign?: boolean;
	enableHls?: boolean;
	storylinesStyle?: boolean;
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

type ImmersiveCardLayoutProps = {
	card: DCRFrontCard;
	containerPalette?: DCRContainerPalette;
	serverTime?: number;
	imageLoading: Loading;
	collectionId: number;
	showLabsRedesign?: boolean;
	storylinesStyle?: boolean;
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
	serverTime,
	imageLoading,
	collectionId,
	showLabsRedesign,
	storylinesStyle,
}: ImmersiveCardLayoutProps) => {
	const isLoopingVideo =
		card.mainMedia?.type === 'SelfHostedVideo' &&
		card.mainMedia.videoStyle === 'Loop';

	return (
		<UL padBottom={true}>
			<LI padSides={true}>
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
					canPlayInline={isLoopingVideo ? false : true}
					starRating={card.starRating}
					dataLinkName={card.dataLinkName}
					discussionApiUrl={card.discussionApiUrl}
					discussionId={card.discussionId}
					mainMedia={card.mainMedia}
					isExternalLink={card.isExternalLink}
					branding={card.branding}
					containerPalette={containerPalette}
					trailText={card.trailText}
					serverTime={serverTime}
					imageLoading={imageLoading}
					aspectRatio="5:3"
					mobileAspectRatio="4:5"
					imageSize="feature-immersive"
					headlineSizes={{ desktop: 'medium', tablet: 'small' }}
					supportingContent={card.supportingContent}
					isImmersive={true}
					showVideo={card.showVideo}
					showLabsRedesign={showLabsRedesign}
					storylinesStyle={storylinesStyle}
				/>
			</LI>
		</UL>
	);
};

type BoostedSplashProperties = {
	headlineSizes: ResponsiveFontSize;
	mediaPositionOnDesktop: MediaPositionType;
	mediaPositionOnMobile: MediaPositionType;
	mediaSize: MediaSizeType;
	supportingContentAlignment: Alignment;
	liveUpdatesAlignment: Alignment;
	trailTextSize: TrailTextSize;
	subtitleSize: SubtitleSize;
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
	storylinesStyle?: boolean,
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
				mediaPositionOnDesktop: 'right',
				mediaPositionOnMobile: mediaCard ? 'top' : 'bottom',
				mediaSize: 'large',
				supportingContentAlignment:
					supportingContentLength >= 4 ? 'horizontal' : 'vertical',
				liveUpdatesAlignment: 'vertical',
				trailTextSize: 'regular',
				subtitleSize: 'medium',
			};
		case 'boost':
			return {
				headlineSizes: {
					desktop: useLargerHeadlineSizeDesktop ? 'xlarge' : 'large',
					tablet: 'large',
					mobile: 'large',
				},
				mediaPositionOnDesktop: 'right',
				mediaPositionOnMobile: mediaCard ? 'top' : 'bottom',
				mediaSize: avatarUrl ? 'large' : 'xlarge',
				supportingContentAlignment: storylinesStyle
					? 'vertical'
					: supportingContentLength >= 4
					? 'horizontal'
					: 'vertical',
				liveUpdatesAlignment: 'vertical',
				trailTextSize: storylinesStyle ? 'large' : 'regular',
				subtitleSize: 'medium',
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
				mediaPositionOnDesktop: mediaCard ? 'top' : 'bottom',
				mediaPositionOnMobile: mediaCard ? 'top' : 'bottom',
				mediaSize: 'jumbo',
				supportingContentAlignment: 'horizontal',
				liveUpdatesAlignment: 'horizontal',
				trailTextSize: 'large',
				subtitleSize: 'large',
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
				mediaPositionOnDesktop: mediaCard ? 'top' : 'bottom',
				mediaPositionOnMobile: mediaCard ? 'top' : 'bottom',
				mediaSize: 'jumbo',
				supportingContentAlignment: 'horizontal',
				liveUpdatesAlignment: 'horizontal',
				trailTextSize: 'large',
				subtitleSize: 'large',
			};
	}
};

type SplashCardLayoutProps = {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	serverTime?: number;
	aspectRatio: AspectRatio;
	isLastRow: boolean;
	containerLevel: DCRContainerLevel;
	collectionId: number;
	/** Feature flag for the labs redesign work */
	showLabsRedesign?: boolean;
	enableHls?: boolean;
	storylinesStyle?: boolean;
};

const SplashCardLayout = ({
	cards,
	containerPalette,
	showAge,
	serverTime,
	imageLoading,
	aspectRatio,
	isLastRow,
	containerLevel,
	collectionId,
	showLabsRedesign,
	enableHls,
	storylinesStyle,
}: SplashCardLayoutProps) => {
	const card = cards[0];
	if (!card) return null;

	const shouldShowImmersive = card.isImmersive;
	if (shouldShowImmersive) {
		return (
			<ImmersiveCardLayout
				card={card}
				containerPalette={containerPalette}
				serverTime={serverTime}
				imageLoading={imageLoading}
				collectionId={collectionId}
				showLabsRedesign={showLabsRedesign}
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
		mediaPositionOnDesktop,
		mediaPositionOnMobile,
		mediaSize,
		supportingContentAlignment,
		liveUpdatesAlignment,
		trailTextSize,
		subtitleSize,
	} = decideSplashCardProperties(
		card.boostLevel ?? 'default',
		card.supportingContent?.length ?? 0,
		isMediaCard(card.format),
		useLargerHeadlineSizeDesktop,
		!!card.avatarUrl,
		storylinesStyle,
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
					serverTime={serverTime}
					headlineSizes={headlineSizes}
					mediaPositionOnDesktop={mediaPositionOnDesktop}
					mediaPositionOnMobile={mediaPositionOnMobile}
					mediaSize={mediaSize}
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
					subtitleSize={subtitleSize}
					headlinePosition={card.showLivePlayable ? 'outer' : 'inner'}
					showLabsRedesign={showLabsRedesign}
					enableHls={enableHls}
					storylinesStyle={storylinesStyle}
				/>
			</LI>
		</UL>
	);
};

type BoostedCardProperties = {
	headlineSizes: ResponsiveFontSize;
	mediaSize: MediaSizeType;
	liveUpdatesPosition: Position;
	supportingContentAlignment: Alignment;
	subtitleSize: SubtitleSize;
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
				mediaSize: 'xlarge',
				liveUpdatesPosition: 'outer',
				supportingContentAlignment:
					supportingContentLength >= 2 ? 'horizontal' : 'vertical',
				subtitleSize: 'medium',
			};
		case 'boost':
		default:
			return {
				headlineSizes: {
					desktop: 'small',
					tablet: 'small',
					mobile: 'small',
				},
				mediaSize: avatarUrl ? 'large' : 'medium',
				liveUpdatesPosition: 'inner',
				supportingContentAlignment:
					supportingContentLength >= 2 ? 'horizontal' : 'vertical',
				subtitleSize: 'small',
			};
	}
};

type FullWidthCardLayoutProps = {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	serverTime?: number;
	aspectRatio: AspectRatio;
	isFirstRow: boolean;
	isLastRow: boolean;
	containerLevel: DCRContainerLevel;
	collectionId: number;
	/** Feature flag for the labs redesign work */
	showLabsRedesign?: boolean;
	enableHls?: boolean;
	storylinesStyle?: boolean;
};

const FullWidthCardLayout = ({
	cards,
	containerPalette,
	showAge,
	serverTime,
	imageLoading,
	aspectRatio,
	isFirstRow,
	isLastRow,
	containerLevel,
	collectionId,
	showLabsRedesign,
	enableHls,
	storylinesStyle,
}: FullWidthCardLayoutProps) => {
	const card = cards[0];
	if (!card) return null;

	const {
		headlineSizes,
		mediaSize,
		supportingContentAlignment,
		liveUpdatesPosition,
		subtitleSize,
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
				serverTime={serverTime}
				imageLoading={imageLoading}
				collectionId={collectionId}
				showLabsRedesign={showLabsRedesign}
				storylinesStyle={storylinesStyle}
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
					serverTime={serverTime}
					headlineSizes={headlineSizes}
					mediaPositionOnDesktop="right"
					mediaPositionOnMobile={
						isMediaCard(card.format) ? 'top' : 'bottom'
					}
					mediaSize={mediaSize}
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
					showLabsRedesign={showLabsRedesign}
					subtitleSize={subtitleSize}
					enableHls={enableHls}
					storylinesStyle={storylinesStyle}
				/>
			</LI>
		</UL>
	);
};

type HalfWidthCardLayoutProps = {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	isFirstRow?: boolean;
	isFirstStandardRow?: boolean;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	serverTime?: number;
	aspectRatio: AspectRatio;
	isLastRow: boolean;
	containerLevel: DCRContainerLevel;
	/** Feature flag for the labs redesign work */
	showLabsRedesign?: boolean;
	enableHls?: boolean;
	storylinesStyle?: boolean;
};

const HalfWidthCardLayout = ({
	cards,
	containerPalette,
	showAge,
	serverTime,
	imageLoading,
	isFirstRow,
	isFirstStandardRow,
	aspectRatio,
	isLastRow,
	containerLevel,
	showLabsRedesign,
	enableHls,
	storylinesStyle,
}: HalfWidthCardLayoutProps) => {
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
						key={card.url}
						stretch={false}
						percentage="50%"
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
							serverTime={serverTime}
							image={card.image}
							imageLoading={imageLoading}
							mediaPositionOnDesktop="left"
							mediaPositionOnMobile="left"
							supportingContent={card.supportingContent?.slice(
								0,
								2,
							)}
							supportingContentAlignment="vertical"
							supportingContentPosition="outer"
							mediaSize="small"
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
							showLabsRedesign={showLabsRedesign}
							enableHls={enableHls}
							storylinesStyle={storylinesStyle}
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
	serverTime,
	imageLoading,
	aspectRatio,
	containerLevel = 'Primary',
	collectionId,
	showLabsRedesign,
	enableHls,
	storylinesStyle = false,
}: Props) => {
	const splash = [...groupedTrails.splash].slice(0, 1).map((snap) => ({
		...snap,
		uniqueId: `collection-${collectionId}-splash-0`,
	}));

	const cards = [...groupedTrails.standard]
		.slice(0, 19)
		.map((standard, i) => ({
			...standard,
			uniqueId: `collection-${collectionId}-standard-${i}`,
		}));

	const groupedCards = decideCardPositions(cards);

	return (
		<>
			{splash.length > 0 && (
				<SplashCardLayout
					cards={splash}
					containerPalette={containerPalette}
					showAge={showAge}
					serverTime={serverTime}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
					isLastRow={cards.length === 0}
					containerLevel={containerLevel}
					collectionId={collectionId}
					showLabsRedesign={showLabsRedesign}
					enableHls={enableHls}
					storylinesStyle={storylinesStyle}
				/>
			)}
			{groupedCards.map((row, i) => {
				switch (row.layout) {
					case 'oneCardFullWidth':
						return (
							<FullWidthCardLayout
								key={row.cards[0]?.uniqueId}
								cards={row.cards}
								containerPalette={containerPalette}
								showAge={showAge}
								serverTime={serverTime}
								imageLoading={imageLoading}
								aspectRatio={aspectRatio}
								isFirstRow={!splash.length && i === 0}
								isLastRow={i === groupedCards.length - 1}
								containerLevel={containerLevel}
								collectionId={collectionId}
								showLabsRedesign={showLabsRedesign}
								enableHls={enableHls}
								storylinesStyle={storylinesStyle}
							/>
						);

					case 'oneCardHalfWidth':
					case 'twoCard':
					default:
						return (
							<HalfWidthCardLayout
								key={row.cards[0]?.uniqueId}
								cards={row.cards}
								containerPalette={containerPalette}
								showAge={showAge}
								serverTime={serverTime}
								imageLoading={imageLoading}
								isFirstRow={!splash.length && i === 0}
								isFirstStandardRow={i === 0}
								aspectRatio={aspectRatio}
								isLastRow={i === groupedCards.length - 1}
								containerLevel={containerLevel}
								showLabsRedesign={showLabsRedesign}
								enableHls={enableHls}
								storylinesStyle={storylinesStyle}
							/>
						);
				}
			})}
		</>
	);
};
