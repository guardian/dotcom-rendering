import { shouldPadWrappableRows } from '../lib/dynamicSlices';
import type {
	DCRContainerPalette,
	DCRFrontCard,
	DCRGroupedTrails,
} from '../types/front';
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

/*
 * Note:
 * dynamic/package does not use cardWrappers as
 * most of the card configurations are custom and not used
 * in other front containers
 */

/** Supporting content is limited to a maximum of n items (defaults to four) */
const limitSupportingContent = (card: DCRFrontCard, items = 4) =>
	card.supportingContent?.slice(0, items) ?? [];

const Snap100 = ({
	snaps,
	containerPalette,
	showAge,
	absoluteServerTimes,
	imageLoading,
}: {
	snaps: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
}) => {
	if (!snaps[0]) return null;
	return (
		<UL padBottom={true}>
			<LI padSides={true}>
				<FrontCard
					trail={snaps[0]}
					containerPalette={containerPalette}
					containerType="dynamic/package"
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					headlineSize="large"
					headlineSizeOnMobile="medium"
					imagePositionOnDesktop="right"
					imagePositionOnMobile="left"
					imageSize="medium"
					trailText={snaps[0].trailText}
					supportingContentAlignment="horizontal"
					imageLoading={imageLoading}
				/>
			</LI>
		</UL>
	);
};

const Card100 = ({
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

	return (
		<UL padBottom={true}>
			<LI padSides={true}>
				<FrontCard
					trail={cards[0]}
					containerPalette={containerPalette}
					containerType="dynamic/package"
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					headlineSize={cards[0].isBoosted ? 'ginormous' : 'huge'}
					imagePositionOnDesktop="bottom"
					imagePositionOnMobile="bottom"
					imageSize="large"
					supportingContent={limitSupportingContent(cards[0])}
					supportingContentAlignment="horizontal"
					imageLoading={imageLoading}
				/>
			</LI>
		</UL>
	);
};

const Card75_Card25 = ({
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
	if (cards.length < 2) return null;
	const card75 = cards.slice(0, 1);
	const card25 = cards.slice(1, 2);

	return (
		<UL direction="row">
			{card75.map((card) => (
				<LI padSides={true} percentage="75%" key={card.url}>
					<FrontCard
						trail={card}
						containerPalette={containerPalette}
						containerType="dynamic/package"
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						headlineSize="large"
						headlineSizeOnMobile="huge"
						imagePositionOnDesktop="right"
						imagePositionOnMobile="bottom"
						imageSize="medium"
						trailText={card.trailText}
						imageLoading={imageLoading}
					/>
				</LI>
			))}
			{card25.map((card) => (
				<LI
					padSides={true}
					percentage="25%"
					showDivider={true}
					key={card.url}
				>
					<FrontCard
						trail={card}
						containerPalette={containerPalette}
						containerType="dynamic/package"
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
				</LI>
			))}
		</UL>
	);
};

const Card25_Card25_Card25_Card25 = ({
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
						key={card.url}
						padSides={true}
						showDivider={cardIndex > 0}
					>
						<FrontCard
							trail={card}
							containerPalette={containerPalette}
							containerType="dynamic/package"
							showAge={showAge}
							absoluteServerTimes={absoluteServerTimes}
							supportingContent={limitSupportingContent(card)}
							image={showImage ? card.image : undefined}
							imageLoading={imageLoading}
						/>
					</LI>
				);
			})}
		</UL>
	);
};

const Card25_Card25_Card25_ColumnOfTwo25 = ({
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
	const bigs = cards.slice(0, 3);
	const remaining = cards.slice(3);

	return (
		<UL direction="row">
			{bigs.map((card, cardIndex) => {
				return (
					<LI
						key={card.url}
						padSides={true}
						showDivider={cardIndex > 0}
						percentage="25%"
					>
						<FrontCard
							trail={card}
							containerPalette={containerPalette}
							containerType="dynamic/package"
							showAge={showAge}
							absoluteServerTimes={absoluteServerTimes}
							supportingContent={limitSupportingContent(card)}
							imageLoading={imageLoading}
						/>
					</LI>
				);
			})}
			<LI showDivider={bigs.length > 0} percentage="25%">
				<UL direction="row" wrapCards={true}>
					{remaining.map((card) => {
						return (
							<LI
								percentage="100%"
								key={card.url}
								padSides={true}
							>
								<FrontCard
									trail={card}
									containerPalette={containerPalette}
									containerType="dynamic/package"
									showAge={showAge}
									absoluteServerTimes={absoluteServerTimes}
									supportingContent={limitSupportingContent(
										card,
									)}
									image={undefined}
									imageLoading={imageLoading}
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};

const Card25_Card25_ColumnOfTwo25_ColumnOfTwo25 = ({
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
	const bigs = cards.slice(0, 2);
	const remaining = cards.slice(2, 6);

	return (
		<UL direction="row">
			{bigs.map((card, cardIndex) => {
				return (
					<LI
						key={card.url}
						padSides={true}
						percentage="25%"
						showDivider={cardIndex > 0}
					>
						<FrontCard
							trail={card}
							containerPalette={containerPalette}
							containerType="dynamic/package"
							showAge={showAge}
							absoluteServerTimes={absoluteServerTimes}
							supportingContent={limitSupportingContent(card)}
							imageLoading={imageLoading}
						/>
					</LI>
				);
			})}
			<LI showDivider={true} percentage="50%">
				<UL direction="row" wrapCards={true}>
					{remaining.map((card, cardIndex) => {
						return (
							<LI
								percentage="50%"
								key={card.url}
								padSides={true}
								showDivider={cardIndex % 2 !== 0}
								offsetBottomPaddingOnDivider={shouldPadWrappableRows(
									cardIndex,
									remaining.length,
									2,
								)}
							>
								<FrontCard
									trail={card}
									containerPalette={containerPalette}
									containerType="dynamic/package"
									showAge={showAge}
									absoluteServerTimes={absoluteServerTimes}
									supportingContent={limitSupportingContent(
										card,
									)}
									image={undefined}
									imageLoading={imageLoading}
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};

const Card25_ColumnOfTwo25_ColumnOfTwo25_ColumnOfTwo25 = ({
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
	const bigs = cards.slice(0, 1);
	const remaining = cards.slice(1, 7);

	return (
		<UL direction="row">
			{bigs.map((card) => {
				return (
					<LI key={card.url} padSides={true} percentage="25%">
						<FrontCard
							trail={card}
							containerPalette={containerPalette}
							containerType="dynamic/package"
							showAge={showAge}
							absoluteServerTimes={absoluteServerTimes}
							supportingContent={limitSupportingContent(card)}
							imageLoading={imageLoading}
						/>
					</LI>
				);
			})}
			<LI showDivider={true} percentage="75%">
				<UL direction="row" wrapCards={true}>
					{remaining.map((card, cardIndex) => {
						return (
							<LI
								percentage="33.333%"
								key={card.url}
								padSides={true}
								showDivider={cardIndex % 3 !== 0}
								offsetBottomPaddingOnDivider={shouldPadWrappableRows(
									cardIndex,
									remaining.length,
									3,
								)}
							>
								<FrontCard
									trail={card}
									containerPalette={containerPalette}
									containerType="dynamic/package"
									showAge={showAge}
									absoluteServerTimes={absoluteServerTimes}
									supportingContent={limitSupportingContent(
										card,
									)}
									image={undefined}
									imageLoading={imageLoading}
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};

const Card75_ColumnOfCards25 = ({
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
	const card75 = cards.slice(0, 1);
	const remaining = cards.slice(1, 4);

	return (
		<UL direction="row" padBottom={true}>
			{card75.map((card) => (
				<LI padSides={true} percentage="75%" key={card.url}>
					<FrontCard
						trail={card}
						containerPalette={containerPalette}
						containerType="dynamic/package"
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						headlineSize="huge"
						imagePositionOnDesktop="bottom"
						imagePositionOnMobile="bottom"
						imageSize="large"
						supportingContent={limitSupportingContent(card)}
						imageLoading={imageLoading}
					/>
				</LI>
			))}
			<LI showDivider={true} percentage="25%">
				<UL direction="column">
					{remaining.map((card, cardIndex) => {
						// Always show the image on the first card and only
						// on the second if there are two items in two
						const shouldShowImage =
							cardIndex === 0 || remaining.length === 2;
						const cardWithoutMainMedia = shouldShowImage
							? card
							: {
									...card,
									mainMedia: undefined,
							  };

						return (
							<LI key={card.url} padSides={true}>
								<FrontCard
									trail={cardWithoutMainMedia}
									containerPalette={containerPalette}
									containerType="dynamic/package"
									showAge={showAge}
									absoluteServerTimes={absoluteServerTimes}
									image={
										shouldShowImage ? card.image : undefined
									}
									headlineSize={
										cardIndex === 0 ||
										remaining.length === 2
											? 'medium'
											: 'small'
									}
									supportingContent={limitSupportingContent(
										card,
									)}
									imageLoading={imageLoading}
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};

export const DynamicPackage = ({
	groupedTrails,
	containerPalette,
	showAge,
	absoluteServerTimes,
	imageLoading,
}: Props) => {
	let layout:
		| 'oneStandard'
		| 'twoStandards'
		| 'threeOrFourStandardsBoosted'
		| 'threeOrFourStandards'
		| 'fiveStandards'
		| 'sixStandards'
		| 'sevenStandards'
		| 'eightStandards'
		| 'nineStandards';

	const snaps = [...groupedTrails.snap].slice(0, 1);

	// We support up to 9 cards
	const cards = [
		...groupedTrails.snap.slice(1),
		...groupedTrails.standard,
	].slice(0, 9);

	let firstSlice: DCRFrontCard[] = [];
	let secondSlice: DCRFrontCard[] = [];
	let thirdSlice: DCRFrontCard[] = [];
	let fourthSlice: DCRFrontCard[] = [];

	switch (cards.length) {
		case 9: {
			layout = 'nineStandards';
			firstSlice = snaps;
			secondSlice = cards.slice(0, 1);
			thirdSlice = cards.slice(1, 5);
			fourthSlice = cards.slice(5);
			break;
		}
		case 8:
			layout = 'eightStandards';
			firstSlice = snaps;
			secondSlice = cards.slice(0, 1);
			thirdSlice = cards.slice(1);
			break;
		case 7:
			layout = 'sevenStandards';
			firstSlice = snaps;
			secondSlice = cards.slice(0, 1);
			thirdSlice = cards.slice(1);
			break;
		case 6:
			layout = 'sixStandards';
			firstSlice = snaps;
			secondSlice = cards.slice(0, 1);
			thirdSlice = cards.slice(1);
			break;
		case 5:
			layout = 'fiveStandards';
			firstSlice = snaps;
			secondSlice = cards.slice(0, 1);
			thirdSlice = cards.slice(1);
			break;
		case 2:
			layout = 'twoStandards';
			firstSlice = snaps;
			secondSlice = cards.slice(0, 2);
			break;
		case 1:
			layout = 'oneStandard';
			firstSlice = snaps;
			secondSlice = cards.slice(0, 1);
			break;
		default:
			if (cards[0]?.isBoosted) {
				layout = 'threeOrFourStandardsBoosted';
				firstSlice = snaps;
				secondSlice = cards.slice(0, 1);
				thirdSlice = cards.slice(1);
			} else {
				layout = 'threeOrFourStandards';
				firstSlice = snaps;
				secondSlice = cards;
			}
	}

	switch (layout) {
		case 'oneStandard':
			return (
				<>
					<Snap100
						snaps={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
					<Card100
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
				</>
			);
		case 'twoStandards':
			return (
				<>
					<Snap100
						snaps={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
					{/* Card75_Card25 does not support the first card being boosted - on Frontend the 75% card would
						receive a ginourmous headline size - however this broke the layout visually, so we decided not
						to support boosting for the twoStandards layout */}
					<Card75_Card25
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
				</>
			);
		case 'threeOrFourStandardsBoosted':
			return (
				<>
					<Snap100
						snaps={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
					<Card100
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
					<Card25_Card25_Card25_Card25
						cards={thirdSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
				</>
			);
		case 'threeOrFourStandards':
			return (
				<>
					<Snap100
						snaps={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
					<Card75_ColumnOfCards25
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
				</>
			);
		case 'fiveStandards':
			return (
				<>
					<Snap100
						snaps={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
					<Card100
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
					<Card25_Card25_Card25_Card25
						cards={thirdSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
				</>
			);
		case 'sixStandards':
			return (
				<>
					<Snap100
						snaps={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
					<Card100
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
					<Card25_Card25_Card25_ColumnOfTwo25
						cards={thirdSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
				</>
			);
		case 'sevenStandards':
			return (
				<>
					<Snap100
						snaps={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
					<Card100
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
					<Card25_Card25_ColumnOfTwo25_ColumnOfTwo25
						cards={thirdSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
				</>
			);
		case 'eightStandards':
			return (
				<>
					<Snap100
						snaps={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
					<Card100
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
					<Card25_ColumnOfTwo25_ColumnOfTwo25_ColumnOfTwo25
						cards={thirdSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
				</>
			);
		case 'nineStandards':
			return (
				<>
					<Snap100
						snaps={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
					<Card100
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
					<Card25_Card25_Card25_Card25
						cards={thirdSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						padBottom={true}
						imageLoading={imageLoading}
					/>
					<Card25_Card25_Card25_Card25
						cards={fourthSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						showImage={false}
						imageLoading={imageLoading}
					/>
				</>
			);
	}
};
