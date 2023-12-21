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
};

/*
 * Note:
 * dynamic/package does not use cardWrappers as
 * most of the card configurations are custom and not used
 * in other front containers
 */

const Snap100 = ({
	snaps,
	containerPalette,
	showAge,
	imageLoading,
}: {
	snaps: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
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
					headlineSize="large"
					headlineSizeOnMobile="medium"
					imagePosition="right"
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
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
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
					headlineSize={cards[0].isBoosted ? 'ginormous' : 'huge'}
					imagePosition="bottom"
					imagePositionOnMobile="bottom"
					imageSize="large"
					isDynamo={containerPalette && true}
					supportingContent={cards[0].supportingContent}
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
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
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
						headlineSize="large"
						headlineSizeOnMobile="huge"
						imagePosition="right"
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
					containerPalette={containerPalette}
					key={card.url}
				>
					<FrontCard
						trail={card}
						containerPalette={containerPalette}
						containerType="dynamic/package"
						showAge={showAge}
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
	showImage = true,
	padBottom,
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
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
						containerPalette={containerPalette}
					>
						<FrontCard
							trail={card}
							containerPalette={containerPalette}
							containerType="dynamic/package"
							showAge={showAge}
							supportingContent={card.supportingContent}
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
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
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
						containerPalette={containerPalette}
						percentage="25%"
					>
						<FrontCard
							trail={card}
							containerPalette={containerPalette}
							containerType="dynamic/package"
							showAge={showAge}
							supportingContent={card.supportingContent}
							imageLoading={imageLoading}
						/>
					</LI>
				);
			})}
			<LI
				showDivider={bigs.length > 0}
				containerPalette={containerPalette}
				percentage="25%"
			>
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
									supportingContent={card.supportingContent}
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
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
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
						containerPalette={containerPalette}
					>
						<FrontCard
							trail={card}
							containerPalette={containerPalette}
							containerType="dynamic/package"
							showAge={showAge}
							supportingContent={card.supportingContent}
							imageLoading={imageLoading}
						/>
					</LI>
				);
			})}
			<LI
				showDivider={true}
				containerPalette={containerPalette}
				percentage="50%"
			>
				<UL direction="row" wrapCards={true}>
					{remaining.map((card, cardIndex) => {
						return (
							<LI
								percentage="50%"
								key={card.url}
								padSides={true}
								showDivider={cardIndex % 2 !== 0}
								containerPalette={containerPalette}
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
									supportingContent={card.supportingContent}
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
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
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
							supportingContent={card.supportingContent}
							imageLoading={imageLoading}
						/>
					</LI>
				);
			})}
			<LI
				showDivider={true}
				containerPalette={containerPalette}
				percentage="75%"
			>
				<UL direction="row" wrapCards={true}>
					{remaining.map((card, cardIndex) => {
						return (
							<LI
								percentage="33.333%"
								key={card.url}
								padSides={true}
								showDivider={cardIndex % 3 !== 0}
								containerPalette={containerPalette}
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
									supportingContent={card.supportingContent}
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
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
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
						headlineSize="huge"
						imagePosition="bottom"
						imagePositionOnMobile="bottom"
						imageSize="large"
						supportingContent={card.supportingContent}
						isDynamo={true}
						imageLoading={imageLoading}
					/>
				</LI>
			))}
			<LI
				showDivider={true}
				containerPalette={containerPalette}
				percentage="25%"
			>
				<UL direction="column">
					{remaining.map((card, cardIndex) => {
						return (
							<LI key={card.url} padSides={true}>
								<FrontCard
									trail={card}
									containerPalette={containerPalette}
									containerType="dynamic/package"
									showAge={showAge}
									image={
										// Always show the image on the first card and only
										// on the second if there are two items in two
										cardIndex === 0 ||
										remaining.length === 2
											? card.image
											: undefined
									}
									headlineSize={
										cardIndex === 0 ||
										remaining.length === 2
											? 'medium'
											: 'small'
									}
									supportingContent={card.supportingContent}
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
						imageLoading={imageLoading}
					/>
					<Card100
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
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
						imageLoading={imageLoading}
					/>
					{/* Card75_Card25 does not support the first card being boosted - on Frontend the 75% card would
						receive a ginourmous headline size - however this broke the layout visually, so we decided not
						to support boosting for the twoStandards layout */}
					<Card75_Card25
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
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
						imageLoading={imageLoading}
					/>
					<Card100
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
					<Card25_Card25_Card25_Card25
						cards={thirdSlice}
						containerPalette={containerPalette}
						showAge={showAge}
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
						imageLoading={imageLoading}
					/>
					<Card75_ColumnOfCards25
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
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
						imageLoading={imageLoading}
					/>
					<Card100
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
					<Card25_Card25_Card25_Card25
						cards={thirdSlice}
						containerPalette={containerPalette}
						showAge={showAge}
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
						imageLoading={imageLoading}
					/>
					<Card100
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
					<Card25_Card25_Card25_ColumnOfTwo25
						cards={thirdSlice}
						containerPalette={containerPalette}
						showAge={showAge}
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
						imageLoading={imageLoading}
					/>
					<Card100
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
					<Card25_Card25_ColumnOfTwo25_ColumnOfTwo25
						cards={thirdSlice}
						containerPalette={containerPalette}
						showAge={showAge}
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
						imageLoading={imageLoading}
					/>
					<Card100
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
					<Card25_ColumnOfTwo25_ColumnOfTwo25_ColumnOfTwo25
						cards={thirdSlice}
						containerPalette={containerPalette}
						showAge={showAge}
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
						imageLoading={imageLoading}
					/>
					<Card100
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
					<Card25_Card25_Card25_Card25
						cards={thirdSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						padBottom={true}
						imageLoading={imageLoading}
					/>
					<Card25_Card25_Card25_Card25
						cards={fourthSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						showImage={false}
						imageLoading={imageLoading}
					/>
				</>
			);
	}
};
