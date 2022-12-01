/* eslint-disable @typescript-eslint/naming-convention -- because underscores work here*/
import type {
	DCRContainerPalette,
	DCRContainerType,
	DCRGroupedTrails,
} from '../../types/front';
import type { TrailType } from '../../types/trails';
import { LI } from '../components/Card/components/LI';
import { UL } from '../components/Card/components/UL';
import { FrontCard } from '../components/FrontCard';
import {
	Card100Media100,
	Card100Media75,
	Card25Media25,
	Card50Media50Tall,
	Card75Media50Left,
	Card75Media50Right,
} from './cardWrappers';

/**
 * A place for shared slices which are used across multiple dynamic/ containers
 *
 * ASCII Art Guide:
 * '#'            => Image
 * ' ' | '_'      => text / trail / supporting content
 */

/* .___________________________________.
 * |         ##########################|
 * |         ###########(^)>###########|
 * |         ###########(_)############|
 * |         ##########################|
 * |_________##########################|
 */
export const Card100 = ({
	cards,
	containerPalette,
	containerType,
	showAge,
}: {
	cards: TrailType[];
	containerPalette?: DCRContainerPalette;
	containerType?: DCRContainerType;
	showAge?: boolean;
}) => (
	<UL>
		<LI padSides={true}>
			<FrontCard
				trail={cards[0]}
				containerPalette={containerPalette}
				containerType={containerType}
				showAge={showAge}
				imagePosition="right"
				imagePositionOnMobile="top"
				imageSize="jumbo"
				headlineSize="huge"
				headlineSizeOnMobile="large"
				trailText={cards[0].trailText}
			/>
		</LI>
	</UL>
);

/* ._________________._________________.
 * |#################|#################|
 * |#################|#################|
 * |_________________|_________________|
 */
export const Card50_Card50 = ({
	cards,
	containerPalette,
	showAge,
}: {
	cards: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
}) => (
	<UL direction="row" padBottom={true}>
		<LI percentage="50%" padSides={true}>
			<Card50Media50Tall
				trail={cards[0]}
				containerPalette={containerPalette}
				showAge={showAge}
			/>
		</LI>
		<LI percentage="50%" padSides={true} showDivider={true}>
			<Card50Media50Tall
				trail={cards[1]}
				containerPalette={containerPalette}
				showAge={showAge}
			/>
		</LI>
	</UL>
);

/* ._________________________._________.
 * |         ################|#########|
 * |         ################|#########|
 * |_________################|_________|
 */
export const Card75_Card25 = ({
	cards,
	containerPalette,
	showAge,
}: {
	cards: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
}) => (
	<UL direction="row" padBottom={true}>
		<LI percentage="75%" padSides={true}>
			<Card75Media50Right
				trail={cards[0]}
				showAge={showAge}
				containerPalette={containerPalette}
			/>
		</LI>
		<LI percentage="25%" padSides={true} showDivider={true}>
			<Card25Media25
				trail={cards[1]}
				showAge={showAge}
				containerPalette={containerPalette}
			/>
		</LI>
	</UL>
);

/* ._________________________._________.
 * |#########|###############          |
 * |#########|###############          |
 * |_________|###############__________|
 */
export const Card25_Card75 = ({
	cards,
	containerPalette,
	showAge,
}: {
	cards: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
}) => (
	<UL direction="row" padBottom={true}>
		<LI percentage="25%" padSides={true}>
			<Card25Media25
				trail={cards[0]}
				showAge={showAge}
				containerPalette={containerPalette}
			/>
		</LI>
		<LI percentage="75%" padSides={true} showDivider={true}>
			<Card75Media50Left
				trail={cards[1]}
				showAge={showAge}
				containerPalette={containerPalette}
			/>
		</LI>
	</UL>
);

/* ._______________________.___________.
 * |#######################|###########|
 * |                       |           |
 * |_______________________|___________|
 */
export const Card66_Card33 = ({
	cards,
	containerPalette,
	containerType,
	showAge,
}: {
	cards: TrailType[];
	containerPalette?: DCRContainerPalette;
	containerType?: DCRContainerType;
	showAge?: boolean;
}) => (
	<UL direction="row">
		<LI percentage="66.666%" padSides={true}>
			<FrontCard // Card66Media66
				trail={cards[0]}
				containerPalette={containerPalette}
				containerType={containerType}
				showAge={showAge}
				trailText={cards[0].trailText}
				imagePositionOnMobile="top"
			/>
		</LI>
		<LI percentage="33.333%" padSides={true} showDivider={true}>
			<FrontCard // Card33Media33
				trail={cards[1]}
				containerPalette={containerPalette}
				containerType={containerType}
				showAge={showAge}
				trailText={cards[1].trailText}
				imagePositionOnMobile="left"
			/>
		</LI>
	</UL>
);

/* ._________________.________.________.
 * |#################|########|########|
 * |                 |        |        |
 * |_________________|________|________|
 */
export const Card50_Card25_Card25 = ({
	cards,
	containerPalette,
	containerType,
	showAge,
}: {
	cards: TrailType[];
	containerPalette?: DCRContainerPalette;
	containerType?: DCRContainerType;
	showAge?: boolean;
}) => (
	<UL direction="row" padBottom={true}>
		<LI percentage="50%" padSides={true}>
			<FrontCard // Card50Media50
				trail={cards[0]}
				containerPalette={containerPalette}
				containerType={containerType}
				showAge={showAge}
				headlineSize="large"
				imagePosition="top"
				imagePositionOnMobile="top"
				supportingContent={cards[0].supportingContent}
			/>
		</LI>
		<LI percentage="25%" padSides={true} showDivider={true}>
			<FrontCard // Card25Media25
				trail={cards[1]}
				containerPalette={containerPalette}
				containerType={containerType}
				showAge={showAge}
				trailText={
					cards[1]?.supportingContent &&
					cards[1].supportingContent.length > 0
						? undefined
						: cards[1].trailText
				}
				supportingContent={
					cards[1].trailText ? undefined : cards[1].supportingContent
				}
			/>
		</LI>
		<LI percentage="25%" padSides={true} showDivider={true}>
			<FrontCard // Card25Media25
				trail={cards[2]}
				containerPalette={containerPalette}
				containerType={containerType}
				showAge={showAge}
				trailText={
					cards[2]?.supportingContent &&
					cards[2].supportingContent.length > 0
						? undefined
						: cards[2].trailText
				}
				supportingContent={
					cards[2].trailText ? undefined : cards[2].supportingContent
				}
			/>
		</LI>
	</UL>
);

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
}: {
	cards: TrailType[];
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
}) => {
	if (!cards[0]) return null;
	return (
		<UL padBottom={true}>
			<LI percentage="100%" padSides={true}>
				<Card100Media100
					trail={cards[0]}
					showAge={showAge}
					containerPalette={containerPalette}
				/>
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
	// Card100Media75
	cards,
	showAge,
	containerPalette,
}: {
	cards: TrailType[];
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
}) => {
	if (!cards[0]) return null;
	return (
		<UL padBottom={true}>
			<LI percentage="100%" padSides={true}>
				<Card100Media75
					trail={cards[0]}
					showAge={showAge}
					containerPalette={containerPalette}
				/>
			</LI>
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
