/* eslint-disable @typescript-eslint/naming-convention -- because underscores work here*/
import type { DCRContainerPalette } from '../../types/front';
import type { TrailType } from '../../types/trails';
import { LI } from '../components/Card/components/LI';
import { UL } from '../components/Card/components/UL';
import { FrontCard } from '../components/FrontCard';

/**
 * A place for shared slices which are used across multiple dynamic/ containers
 *
 * ASCII Art Guide:
 * '#' 			=> Image
 * ' ' | '_' 	=> text / trail / supporting content
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
		<LI
			percentage="50%"
			padSides={true}
			showTopMarginWhenStacked={true}
			showDivider={true}
		>
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
		<LI
			percentage="25%"
			padSides={true}
			showTopMarginWhenStacked={true}
			showDivider={true}
		>
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
		<LI
			percentage="75%"
			padSides={true}
			showTopMarginWhenStacked={true}
			showDivider={true}
		>
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

/**
 * Abstraction to decide whether to show padding on wrapped rows of cards, e.g
 *
 * Card - Card - Card ↵
 * Card - Card
 *
 * In the above example we want padding on all but the bottom two cards,
 * but in another example
 *
 * Card - Card - Card ↵
 * Card - Card - Card ↵
 * Card - Card - Card
 *
 * We want padding on all but the last 3.
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
