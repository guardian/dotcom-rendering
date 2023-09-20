import { LI } from '../components/Card/components/LI';
import { UL } from '../components/Card/components/UL';
import type { Loading } from '../components/CardPicture';
import type {
	DCRContainerPalette,
	DCRFrontCard,
	DCRGroupedTrails,
} from '../types/front';
import type { TrailType } from '../types/trails';
import {
	Card100Media100,
	Card100Media75,
	Card25Media25,
	Card25Media25Tall,
	Card50Media50,
	Card50Media50Tall,
	Card75Media50Left,
	Card75Media50Right,
	CardDefaultMedia,
} from './cardWrappers';

/**
 * A place for shared slices which are used across multiple dynamic/ containers
 *
 * ASCII Art Guide:
 * '#'            => Image
 * ' ' | '_'      => text / trail / supporting content
 */

/* ._________________._________________.
 * |#################|#################|
 * |#################|#################|
 * |_________________|_________________|
 */
export const Card50_Card50 = ({
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
	const cards50 = cards.slice(0, 2);

	return (
		<UL direction="row" padBottom={true}>
			{cards50.map((trail, index) => (
				<LI
					key={trail.url}
					percentage="50%"
					padSides={true}
					showDivider={index !== 0}
					containerPalette={containerPalette}
				>
					<Card50Media50Tall
						trail={trail}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
				</LI>
			))}
		</UL>
	);
};

/* ._________________________._________.
 * |         ################|#########|
 * |         ################|#########|
 * |_________################|_________|
 */
export const Card75_Card25 = ({
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
	const card25 = cards.slice(1, 2);

	return (
		<UL direction="row" padBottom={true}>
			{card75.map((trail) => (
				<LI key={trail.url} percentage="75%" padSides={true}>
					<Card75Media50Right
						trail={trail}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				</LI>
			))}
			{card25.map((trail) => (
				<LI
					key={trail.url}
					percentage="25%"
					padSides={true}
					showDivider={true}
					containerPalette={containerPalette}
				>
					<Card25Media25
						trail={trail}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				</LI>
			))}
		</UL>
	);
};

/* ._________________________._________.
 * |#########|###############          |
 * |#########|###############          |
 * |_________|###############__________|
 */
export const Card25_Card75 = ({
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
	const card25 = cards.slice(0, 1);
	const card75 = cards.slice(1, 2);

	return (
		<UL direction="row" padBottom={true}>
			{card25.map((trail) => (
				<LI key={trail.url} percentage="25%" padSides={true}>
					<Card25Media25
						trail={trail}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				</LI>
			))}
			{card75.map((trail) => (
				<LI
					key={trail.url}
					percentage="75%"
					padSides={true}
					showDivider={true}
					containerPalette={containerPalette}
				>
					<Card75Media50Left
						trail={trail}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				</LI>
			))}
		</UL>
	);
};

/* ._________________.________.________.
 * |#################|########|########|
 * |                 |        |        |
 * |_________________|________|________|
 */
export const Card50_Card25_Card25 = ({
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
	const card50 = cards.slice(0, 1);
	const cards25 = cards.slice(1, 3);

	return (
		<UL direction="row" padBottom={true}>
			{card50.map((trail) => (
				<LI key={trail.url} percentage="50%" padSides={true}>
					<Card50Media50
						trail={trail}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
				</LI>
			))}

			{cards25.map((trail) => (
				<LI
					key={trail.url}
					percentage="25%"
					padSides={true}
					showDivider={true}
					containerPalette={containerPalette}
				>
					<Card25Media25Tall
						trail={trail}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
				</LI>
			))}
		</UL>
	);
};

/* ._________________.
 * |#################|
 * |#################|
 * |#################|
 * |_________________|
 */
export const Card100PictureTop = ({
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
	const card100 = cards.slice(0, 1);

	return (
		<UL padBottom={true}>
			{card100.map((card) => (
				<LI key={card.url} percentage="100%" padSides={true}>
					<Card100Media100
						trail={card}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				</LI>
			))}
		</UL>
	);
};

export const Card25_Card25_Card25_Card25 = ({
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
	if (cards.length < 4) return null;

	const bigs = cards.slice(0, 4);

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
		</UL>
	);
};

export const ColumnOfCards50_Card25_Card25 = ({
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
	const bigs = cards.slice(0, 2).reverse();
	const remaining = cards.slice(2);

	return (
		<UL direction="row-reverse">
			{bigs.map((big) => {
				return (
					<LI
						percentage="25%"
						padSides={true}
						showDivider={true}
						containerPalette={containerPalette}
						key={big.url}
					>
						<Card25Media25Tall
							trail={big}
							showAge={showAge}
							containerPalette={containerPalette}
							imageLoading={imageLoading}
						/>
					</LI>
				);
			})}
			<LI percentage="50%">
				<UL direction="row" wrapCards={true}>
					{remaining.map((card) => {
						return (
							<LI
								percentage="100%"
								key={card.url}
								padSides={true}
							>
								<CardDefaultMedia
									trail={card}
									containerPalette={containerPalette}
									showAge={showAge}
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

/* .___________________________________.
 * |       ############################|
 * |       ############################|
 * |       ############################|
 * |_______############################|
 */
export const Card100PictureRight = ({
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
	const card100 = cards.slice(0, 1);

	return (
		<UL padBottom={true}>
			{card100.map((card) => (
				<LI key={card.url} percentage="100%" padSides={true}>
					<Card100Media75
						trail={card}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
				</LI>
			))}
		</UL>
	);
};

/**
 * Abstraction to decide whether to show padding on wrapped rows of cards.
 *
 * For three columns, We have different results with 5 or 9 cards
 *
 * @example - All but last 2
 * ```
 * ┌───┐ ┌───┐ ┌───┐
 * │Pad│ │Pad│ │Pad│
 * └───┘ └───┘ └───┘
 * ┌───┐ ┌───┐
 * │No!│ │No!│
 * └───┘ └───┘
 * ```
 * - All but last 3
 * ```
 * ┌───┐ ┌───┐ ┌───┐
 * │Pad│ │Pad│ │Pad│
 * └───┘ └───┘ └───┘
 * ┌───┐ ┌───┐ ┌───┐
 * │Pad│ │Pad│ │Pad│
 * └───┘ └───┘ └───┘
 * ┌───┐ ┌───┐ ┌───┐
 * │No!│ │No!│ │No!│
 * └───┘ └───┘ └───┘
 * ```
 *
 * @param index - Index of the current card
 * @param totalCards - Total number of cards being shown
 * @param cardsPerRow - No. of cards in each row (if full)
 */
export const shouldPadWrappableRows = (
	index: number,
	totalCards: number,
	cardsPerRow: number,
): boolean => index < totalCards - (totalCards % cardsPerRow || cardsPerRow);

/**
 * Filter trails an object of grouped trails, removing any trails included in the
 * 'filter' array
 *
 * @param opts.groupedTrails Object of grouped trails we want to filter cards from
 * @param opts.filter Array of cards we want to filter against
 * @returns grouped trails object filtered against the 'filter' array
 */
export const filterGroupedTrails = ({
	groupedTrails,
	filter,
}: {
	groupedTrails: DCRGroupedTrails;
	filter: TrailType[];
}): DCRGroupedTrails => {
	const shouldFilterCard = (card: TrailType) =>
		filter.findIndex((filterCard) => filterCard.url === card.url) === -1;
	return {
		snap: groupedTrails.snap.filter(shouldFilterCard),
		huge: groupedTrails.huge.filter(shouldFilterCard),
		veryBig: groupedTrails.veryBig.filter(shouldFilterCard),
		big: groupedTrails.big.filter(shouldFilterCard),
		standard: groupedTrails.standard.filter(shouldFilterCard),
	};
};
