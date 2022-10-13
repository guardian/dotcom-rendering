/* eslint-disable @typescript-eslint/naming-convention -- because underscores work here*/
import type { DCRContainerPalette, DCRContainerType } from '../../types/front';
import type { TrailType } from '../../types/trails';
import { LI } from '../components/Card/components/LI';
import { UL } from '../components/Card/components/UL';
import { FrontCard } from '../components/FrontCard';

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
			<FrontCard
				trail={cards[0]}
				containerPalette={containerPalette}
				showAge={showAge}
				trailText={cards[0].trailText}
				imagePositionOnMobile="top"
			/>
		</LI>
		<LI percentage="50%" padSides={true} showDivider={true}>
			<FrontCard
				trail={cards[1]}
				containerPalette={containerPalette}
				showAge={showAge}
				trailText={cards[1].trailText}
				imagePositionOnMobile="top"
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
			<FrontCard
				trail={cards[0]}
				containerPalette={containerPalette}
				showAge={showAge}
				trailText={cards[0].trailText}
				imagePosition="right"
				imageSize="large"
				imagePositionOnMobile="top"
			/>
		</LI>
		<LI percentage="25%" padSides={true} showDivider={true}>
			<FrontCard
				trail={cards[1]}
				containerPalette={containerPalette}
				showAge={showAge}
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
			<FrontCard
				trail={cards[1]}
				containerPalette={containerPalette}
				showAge={showAge}
			/>
		</LI>
		<LI percentage="75%" padSides={true} showDivider={true}>
			<FrontCard
				trail={cards[0]}
				containerPalette={containerPalette}
				showAge={showAge}
				trailText={cards[0].trailText}
				imagePosition="right"
				imageSize="large"
				imagePositionOnMobile="top"
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
			<FrontCard
				trail={cards[0]}
				containerPalette={containerPalette}
				containerType={containerType}
				showAge={showAge}
				trailText={cards[0].trailText}
				imagePositionOnMobile="top"
			/>
		</LI>
		<LI percentage="33.333%" padSides={true} showDivider={true}>
			<FrontCard
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
			<FrontCard
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
			<FrontCard
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
			<FrontCard
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
