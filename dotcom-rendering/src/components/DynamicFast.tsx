import {
	Card25Media25,
	Card50Media50Tall,
	CardDefault,
} from '../lib/cardWrappers';
import {
	Card100PictureRight,
	Card100PictureTop,
	Card25_Card25_Card25_Card25,
	Card25_Card75,
	Card50_Card50,
	Card75_Card25,
	filterGroupedTrails,
	shouldPadWrappableRows,
} from '../lib/dynamicSlices';
import type {
	DCRContainerPalette,
	DCRFrontCard,
	DCRGroupedTrails,
} from '../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import type { Loading } from './CardPicture';

/**
 * Not sure where to start? This PR documents a lot of the key features
 * https://github.com/guardian/dotcom-rendering/pull/5427
 *
 * Also check out DynamicFast.stories.tsx & check it out on storybook,
 * it's a great way to learn about the business logic!
 */

type Props = {
	groupedTrails: DCRGroupedTrails;
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

/* ._________________.________.________.
 * |#################|########|________|
 * |#################|########|________|
 * |#################|________|________|
 * |#################|________|________|
 * |_________________|________|________|
 */
const Card50_ColumnOfThreeCards25_ColumnOfFiveCards = ({
	cards,
	showAge,
	containerPalette,
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
}) => {
	if (!cards[0]) return null;

	const big = cards[0];
	const columnOne = cards.slice(1, 4);
	const columnTwo = cards.slice(4, 10);

	return (
		<UL direction="row">
			<LI percentage="50%" padSides={true}>
				<Card50Media50Tall
					trail={big}
					containerPalette={containerPalette}
					showAge={showAge}
					imageLoading={imageLoading}
				/>
			</LI>
			<LI
				percentage="25%"
				showDivider={true}
				containerPalette={containerPalette}
			>
				<UL direction="column">
					{columnOne.map((card, cardIndex) => {
						return (
							<LI
								key={card.url}
								showDivider={false}
								padSides={true}
							>
								{/* The first card shows an image */}
								{cardIndex === 0 ? (
									<Card25Media25
										trail={card}
										containerPalette={containerPalette}
										showAge={showAge}
										imageLoading={imageLoading}
									/>
								) : (
									<CardDefault
										trail={card}
										containerPalette={containerPalette}
										showAge={showAge}
									/>
								)}
							</LI>
						);
					})}
				</UL>
			</LI>
			<LI
				percentage="25%"
				showDivider={columnTwo.length > 0}
				containerPalette={containerPalette}
			>
				<UL direction="column">
					{columnTwo.map((card) => {
						return (
							<LI
								key={card.url}
								showDivider={false}
								padSides={true}
							>
								<CardDefault
									trail={card}
									containerPalette={containerPalette}
									showAge={showAge}
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};

const Card50_ColumnOfThreeCards25_ColumnOfThreeCards25 = ({
	cards,
	showAge,
	containerPalette,
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
}) => {
	if (!cards[0]) return null;
	const big = cards[0];
	const remaining = cards.slice(1, 7);

	return (
		<UL direction="row" wrapCards={true}>
			<LI percentage="50%" padSides={true} showDivider={false}>
				<Card50Media50Tall
					trail={big}
					containerPalette={containerPalette}
					showAge={showAge}
					imageLoading={imageLoading}
				/>
			</LI>
			<LI percentage="50%">
				<UL
					direction="row"
					wrapCards={true}
					showDivider={true}
					containerPalette={containerPalette}
				>
					{remaining.map((card, cardIndex) => {
						const columns = 2;
						return (
							<LI
								key={card.url}
								percentage="50%"
								stretch={true}
								showDivider={cardIndex > 0}
								containerPalette={containerPalette}
								offsetBottomPaddingOnDivider={shouldPadWrappableRows(
									cardIndex,
									remaining.length -
										(remaining.length % columns),
									columns,
								)}
								padSides={true}
							>
								<CardDefault
									trail={card}
									containerPalette={containerPalette}
									showAge={showAge}
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};

const ColumnOfThreeCards25_ColumnOfThreeCards25_ColumnOfThreeCards25_ColumnOfThreeCards25 =
	({
		cards,
		showAge,
		containerPalette,
		imageLoading,
	}: {
		cards: DCRFrontCard[];
		imageLoading: Loading;
		showAge?: boolean;
		containerPalette?: DCRContainerPalette;
	}) => {
		if (cards.length === 0) return null;

		return (
			<UL direction="row" wrapCards={true}>
				{cards.map((card, cardIndex) => {
					const columns = 4;
					return (
						<LI
							key={card.url}
							percentage="25%"
							stretch={true}
							padSides={true}
							showDivider={cardIndex % columns !== 0}
							containerPalette={containerPalette}
							offsetBottomPaddingOnDivider={shouldPadWrappableRows(
								cardIndex,
								cards.length,
								columns,
							)}
						>
							<CardDefault
								trail={card}
								containerPalette={containerPalette}
								showAge={showAge}
							/>
						</LI>
					);
				})}
			</UL>
		);
	};

const Card25_ColumnOfCards25_ColumnOfThreeCards25_ColumnOfThreeCards25 = ({
	cards,
	showAge,
	containerPalette,
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
}) => {
	if (!cards[0]) return null;
	const big = cards[0];
	const remaining = cards.slice(1, 10);

	return (
		<UL direction="row" wrapCards={true}>
			<LI percentage="25%" padSides={true} showDivider={false}>
				<Card25Media25
					trail={big}
					containerPalette={containerPalette}
					showAge={showAge}
					imageLoading={imageLoading}
				/>
			</LI>
			<LI percentage="75%">
				<UL
					direction="row"
					wrapCards={true}
					showDivider={true}
					containerPalette={containerPalette}
				>
					{remaining.map((card, cardIndex) => {
						const columns = 3;
						return (
							<LI
								key={card.url}
								percentage="33.333%"
								stretch={true}
								padSides={true}
								showDivider={cardIndex % columns !== 0}
								containerPalette={containerPalette}
								offsetBottomPaddingOnDivider={shouldPadWrappableRows(
									cardIndex,
									remaining.length -
										(remaining.length % columns),
									columns,
								)}
							>
								<CardDefault
									trail={card}
									containerPalette={containerPalette}
									showAge={showAge}
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};

const Card25_Card25_ColumnOfThreeCards25_ColumnOfThreeCards25 = ({
	cards,
	showAge,
	containerPalette,
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
}) => {
	if (cards.length < 0) return null;

	const bigs = cards.slice(0, 2);
	const remaining = cards.slice(2, 8);

	return (
		<UL direction="row" wrapCards={true}>
			{bigs.map((card, cardIndex) => {
				return (
					<LI
						key={card.url}
						percentage={`25%`}
						padSides={true}
						showDivider={cardIndex > 0}
						containerPalette={containerPalette}
					>
						<Card25Media25
							trail={card}
							containerPalette={containerPalette}
							showAge={showAge}
							imageLoading={imageLoading}
						/>
					</LI>
				);
			})}

			<LI percentage="50%">
				<UL
					direction="row"
					wrapCards={true}
					showDivider={true}
					containerPalette={containerPalette}
				>
					{remaining.map((card, cardIndex) => {
						const columns = 2;
						return (
							<LI
								key={card.url}
								percentage="50%"
								stretch={true}
								padSides={true}
								showDivider={cardIndex % columns !== 0}
								containerPalette={containerPalette}
								offsetBottomPaddingOnDivider={shouldPadWrappableRows(
									cardIndex,
									remaining.length -
										(remaining.length % columns),
									columns,
								)}
							>
								<CardDefault
									trail={card}
									containerPalette={containerPalette}
									showAge={showAge}
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};

const Card25_Card25_Card25_ColumnOfThreeCards25 = ({
	cards,
	showAge,
	containerPalette,
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
}) => {
	if (cards.length < 3) return null;

	const bigs = cards.slice(0, 3);
	const remaining = cards.slice(3, 6);

	return (
		<UL direction="row" wrapCards={true}>
			{bigs.map((card, cardIndex) => {
				return (
					<LI
						key={card.url}
						percentage={`25%`}
						padSides={true}
						showDivider={cardIndex !== 0}
						containerPalette={containerPalette}
					>
						<Card25Media25
							trail={card}
							containerPalette={containerPalette}
							showAge={showAge}
							imageLoading={imageLoading}
						/>
					</LI>
				);
			})}

			<LI percentage="25%">
				<UL
					direction="row"
					wrapCards={true}
					showDivider={true}
					containerPalette={containerPalette}
				>
					{remaining.map((card) => {
						return (
							<LI
								key={card.url}
								percentage="100%"
								stretch={true}
								showDivider={false}
								padSides={true}
							>
								<CardDefault
									trail={card}
									containerPalette={containerPalette}
									showAge={showAge}
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};

export const DynamicFast = ({
	groupedTrails,
	containerPalette,
	showAge,
	imageLoading,
}: Props) => {
	let firstSliceLayout:
		| undefined // If there are no very bigs or huges, there is no first slice
		| 'oneHuge'
		| 'oneVeryBig'
		| 'twoVeryBigs'
		| 'TwoVeryBigsFirstBoosted'
		| 'TwoVeryBigsSecondBoosted';

	let firstSliceCards: DCRFrontCard[] = [];

	// Decide the layout and contents for the first slice, demoting any remaining cards to the second slice
	if (groupedTrails.huge.length > 0) {
		firstSliceLayout = 'oneHuge';
		firstSliceCards = groupedTrails.huge.slice(0, 1);
	} else if (groupedTrails.veryBig.length === 1) {
		firstSliceLayout = 'oneVeryBig';
		firstSliceCards = groupedTrails.veryBig.slice(0, 1);
	} else if (groupedTrails.veryBig.length > 1) {
		if (groupedTrails.veryBig[0]?.isBoosted) {
			firstSliceLayout = 'TwoVeryBigsFirstBoosted';
		} else if (groupedTrails.veryBig[1]?.isBoosted) {
			firstSliceLayout = 'TwoVeryBigsSecondBoosted';
		} else {
			firstSliceLayout = 'twoVeryBigs';
		}
		firstSliceCards = groupedTrails.veryBig.slice(0, 2);
	}

	let secondSliceLayout:
		| 'oneBigBoosted'
		| 'twoOrMoreBigsFirstBoosted'
		| 'fourBigs'
		| 'threeBigs'
		| 'twoBigs'
		| 'oneBig'
		| 'noBigs';

	// Create our object of grouped trails that doesn't include any
	// cards used by the first slice
	const secondSliceGroupedTrails = filterGroupedTrails({
		groupedTrails,
		filter: firstSliceCards,
	});

	let secondSliceCards: DCRFrontCard[] = [];
	const bigs = [
		// Demote any left over 'huge' or 'veryBig' grouped cards
		...secondSliceGroupedTrails.huge,
		...secondSliceGroupedTrails.veryBig,
		...secondSliceGroupedTrails.big,
	];

	switch (bigs.length) {
		case 0: {
			secondSliceLayout = 'noBigs';
			secondSliceCards = [
				...secondSliceGroupedTrails.standard.slice(0, 12),
			];
			break;
		}
		case 1: {
			if (bigs[0]?.isBoosted) {
				secondSliceLayout = 'oneBigBoosted';
				secondSliceCards = [
					...bigs.slice(0, 1),
					...secondSliceGroupedTrails.standard.slice(0, 6),
				];
			} else {
				secondSliceLayout = 'oneBig';
				secondSliceCards = [
					...bigs.slice(0, 1),
					...secondSliceGroupedTrails.standard.slice(0, 9),
				];
			}
			break;
		}
		case 2: {
			if (bigs[0]?.isBoosted) {
				secondSliceLayout = 'twoOrMoreBigsFirstBoosted';
				secondSliceCards = [
					...bigs,
					...secondSliceGroupedTrails.standard.slice(0, 7),
				];
			} else {
				secondSliceLayout = 'twoBigs';
				secondSliceCards = [
					...bigs.slice(0, 2),
					...secondSliceGroupedTrails.standard.slice(0, 6),
				];
			}
			break;
		}
		case 3: {
			if (bigs[0]?.isBoosted) {
				secondSliceLayout = 'twoOrMoreBigsFirstBoosted';
				secondSliceCards = [
					...bigs,
					...secondSliceGroupedTrails.standard.slice(0, 6),
				];
			} else {
				secondSliceLayout = 'threeBigs';
				secondSliceCards = [
					...bigs.slice(0, 3),
					...secondSliceGroupedTrails.standard.slice(0, 3),
				];
			}
			break;
		}
		default: {
			if (bigs[0]?.isBoosted) {
				secondSliceLayout = 'twoOrMoreBigsFirstBoosted';
				secondSliceCards = [
					...bigs,
					...secondSliceGroupedTrails.standard.slice(0, 5),
				];
			} else {
				secondSliceLayout = 'fourBigs';
				secondSliceCards = [...bigs.slice(0, 4)];
			}
			break;
		}
	}

	const FirstSlice = () => {
		switch (firstSliceLayout) {
			case 'oneHuge':
				return (
					<Card100PictureTop
						cards={firstSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				);
			case 'oneVeryBig':
				return (
					<Card100PictureRight
						cards={firstSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				);
			case 'TwoVeryBigsFirstBoosted':
				return (
					<Card75_Card25
						cards={firstSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				);
			case 'TwoVeryBigsSecondBoosted':
				return (
					<Card25_Card75
						cards={firstSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				);
			case 'twoVeryBigs':
				return (
					<Card50_Card50
						cards={firstSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				);
			default:
				return <></>;
		}
	};

	const SecondSlice = () => {
		switch (secondSliceLayout) {
			case 'oneBigBoosted':
				return (
					<Card50_ColumnOfThreeCards25_ColumnOfThreeCards25
						cards={secondSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				);
			case 'twoOrMoreBigsFirstBoosted':
				return (
					<Card50_ColumnOfThreeCards25_ColumnOfFiveCards
						cards={secondSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				);
			case 'noBigs':
				return (
					<ColumnOfThreeCards25_ColumnOfThreeCards25_ColumnOfThreeCards25_ColumnOfThreeCards25
						cards={secondSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				);
			case 'oneBig':
				return (
					<Card25_ColumnOfCards25_ColumnOfThreeCards25_ColumnOfThreeCards25
						cards={secondSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				);
			case 'twoBigs':
				return (
					<Card25_Card25_ColumnOfThreeCards25_ColumnOfThreeCards25
						cards={secondSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				);
			case 'threeBigs':
				return (
					<Card25_Card25_Card25_ColumnOfThreeCards25
						cards={secondSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				);
			case 'fourBigs':
				return (
					<Card25_Card25_Card25_Card25
						cards={secondSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				);
			default:
				return <></>;
		}
	};

	return (
		<>
			<FirstSlice />
			<SecondSlice />
		</>
	);
};
