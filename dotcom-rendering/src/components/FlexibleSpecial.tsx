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
import type { TrailTextSize } from './Card/components/TrailTextWrapper';
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

type BoostProperties = {
	headlineSize: SmallHeadlineSize;
	headlineSizeOnMobile: SmallHeadlineSize;
	headlineSizeOnTablet: SmallHeadlineSize;
	imagePositionOnDesktop: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	imageSize: ImageSizeType;
	supportingContentAlignment: Alignment;
	trailTextSize: TrailTextSize;
};

/**
 * Boosting a card will affect the layout and style of the card. This function will determine the properties of the card based on the boost level.
 */
const determineCardProperties = (
	boostLevel: BoostLevel,
	supportingContentLength: number,
): BoostProperties => {
	switch (boostLevel) {
		// The default boost level is equal to no boost. It is the same as the default card layout.
		case 'default':
			return {
				headlineSize: 'large',
				headlineSizeOnMobile: 'small',
				headlineSizeOnTablet: 'medium',
				imagePositionOnDesktop: 'right',
				imagePositionOnMobile: 'bottom',
				imageSize: 'large',
				supportingContentAlignment:
					supportingContentLength >= 3 ? 'horizontal' : 'vertical',
				trailTextSize: 'regular',
			};

		case 'boost':
			return {
				headlineSize: 'huge',
				headlineSizeOnMobile: 'medium',
				headlineSizeOnTablet: 'large',
				imagePositionOnDesktop: 'right',
				imagePositionOnMobile: 'bottom',
				imageSize: 'jumbo',
				supportingContentAlignment:
					supportingContentLength >= 3 ? 'horizontal' : 'vertical',
				trailTextSize: 'regular',
			};
		case 'megaboost':
			return {
				headlineSize: 'huge',
				headlineSizeOnMobile: 'large',
				headlineSizeOnTablet: 'large',
				imagePositionOnDesktop: 'bottom',
				imagePositionOnMobile: 'bottom',
				imageSize: 'jumbo',
				supportingContentAlignment: 'horizontal',
				trailTextSize: 'large',
			};
		case 'gigaboost':
			return {
				headlineSize: 'ginormous',
				headlineSizeOnMobile: 'huge',
				headlineSizeOnTablet: 'huge',
				imagePositionOnDesktop: 'bottom',
				imagePositionOnMobile: 'bottom',
				imageSize: 'jumbo',
				supportingContentAlignment: 'horizontal',
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
		imageSize,
		supportingContentAlignment,
		trailTextSize,
	} = determineCardProperties(
		card.boostLevel ?? 'default',
		card.supportingContent?.length ?? 0,
	);
	return (
		<UL padBottom={true} isFlexibleContainer={true}>
			<LI padSides={true}>
				<FrontCard
					trail={card}
					containerPalette={containerPalette}
					containerType="flexible/special"
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					headlineSize={headlineSize}
					headlineSizeOnMobile={headlineSizeOnMobile}
					headlineSizeOnTablet={headlineSizeOnTablet}
					imagePositionOnDesktop={imagePositionOnDesktop}
					imagePositionOnMobile={imagePositionOnMobile}
					imageSize={imageSize}
					trailText={card.trailText}
					supportingContent={card.supportingContent}
					supportingContentAlignment={supportingContentAlignment}
					imageLoading={imageLoading}
					aspectRatio="5:4"
					kickerText={card.kickerText}
					showLivePlayable={card.showLivePlayable}
					boostedFontSizes={true}
					isFlexSplash={true}
					showTopBarDesktop={false}
					showTopBarMobile={true}
					trailTextSize={trailTextSize}
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
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
	showImage?: boolean;
}) => {
	const hasTwoOrFewerCards = cards.length <= 2;
	return (
		<UL
			direction="row"
			padBottom={true}
			showTopBar={true}
			isFlexibleContainer={true}
		>
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
							/* we don't want to support sublinks on standard cards here so we hard code to undefined */
							supportingContent={undefined}
							imageSize={'medium'}
							aspectRatio="5:4"
							kickerText={card.kickerText}
							showLivePlayable={false}
							showTopBarDesktop={false}
							showTopBarMobile={true}
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
