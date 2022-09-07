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
				supportingContent={cards[0].supportingContent}
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
				supportingContent={cards[1].supportingContent}
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
				supportingContent={cards[0].supportingContent}
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
				supportingContent={cards[1].supportingContent}
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
				trail={cards[0]}
				supportingContent={cards[0].supportingContent}
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
				trail={cards[1]}
				containerPalette={containerPalette}
				showAge={showAge}
				trailText={cards[1].trailText}
				supportingContent={cards[1].supportingContent}
				imagePosition="right"
				imageSize="large"
				imagePositionOnMobile="top"
			/>
		</LI>
	</UL>
);

/* ._________________._________________.
 * |###################################|
 * |###################################|
 * |###################################|
 * |___________________________________|
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
		<UL>
			<LI percentage="100%" padSides={true} padBottom={true}>
				<FrontCard
					trail={cards[0]}
					containerPalette={containerPalette}
					showAge={showAge}
					headlineSize="huge"
					headlineSizeOnMobile="large"
					imageUrl={cards[0].image}
					imagePosition={'top'}
					imagePositionOnMobile={'top'}
					supportingContent={cards[0].supportingContent}
				/>
			</LI>
		</UL>
	);
};

/* ._________________._________________.
 * |       ############################|
 * |       ############################|
 * |       ############################|
 * |_______############################|
 */
export const Card100PictureRight = ({
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
		<UL>
			<LI percentage="100%" padSides={true} padBottom={true}>
				<FrontCard
					trail={cards[0]}
					containerPalette={containerPalette}
					showAge={showAge}
					headlineSize="huge"
					headlineSizeOnMobile="large"
					imageUrl={cards[0].image}
					imageSize={'jumbo'}
					imagePosition={'right'}
					imagePositionOnMobile={'top'}
					trailText={
						// Only show trail text if there is no supportContent
						cards[0].supportingContent === undefined ||
						cards[0].supportingContent.length === 0
							? cards[0].trailText
							: undefined
					}
					supportingContent={cards[0].supportingContent}
				/>
			</LI>
		</UL>
	);
};

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
