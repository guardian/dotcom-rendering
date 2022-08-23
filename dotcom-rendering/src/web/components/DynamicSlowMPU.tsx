/* eslint-disable @typescript-eslint/naming-convention -- because underscores work here*/
import { Hide } from '@guardian/source-react-components';
import type { DCRContainerPalette, DCRGroupedTrails } from '../../types/front';
import type { TrailType } from '../../types/trails';
import { isTuple } from '../lib/tuple';
import { AdSlot } from './AdSlot';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

type Props = {
	groupedTrails: DCRGroupedTrails;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	index: number;
};

/* .___________.___________.___________.
 * |###########|___________|           |
 * |           |___________|    MPU    |
 * |___________|___________|___________|
 */
const Card33_ColumnOfThree33_Ad33 = ({
	cards,
	containerPalette,
	showAge,
	index,
}: {
	cards: [TrailType, TrailType, TrailType, TrailType];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	index: number;
}) => (
	<UL direction="row">
		<LI percentage="33.333%" padSides={true}>
			<FrontCard
				trail={cards[0]}
				containerPalette={containerPalette}
				showAge={showAge}
			/>
		</LI>
		<LI
			percentage="33.333%"
			showDivider={true}
			showTopMarginWhenStacked={true}
		>
			<UL direction="column">
				<LI padSides={true} padBottom={true}>
					<FrontCard
						trail={cards[1]}
						containerPalette={containerPalette}
						showAge={showAge}
						imageUrl={undefined}
						headlineSize="small"
					/>
				</LI>
				<LI padSides={true} padBottom={true}>
					<FrontCard
						trail={cards[2]}
						containerPalette={containerPalette}
						showAge={showAge}
						imageUrl={undefined}
						headlineSize="small"
					/>
				</LI>
				<LI padSides={true}>
					<FrontCard
						trail={cards[3]}
						containerPalette={containerPalette}
						showAge={showAge}
						imageUrl={undefined}
						headlineSize="small"
					/>
				</LI>
			</UL>
		</LI>
		<LI percentage="33.333%">
			<Hide until="tablet">
				<AdSlot position="inline" index={index} />
			</Hide>
		</LI>
	</UL>
);

/* ._________________._________________.
 * |_###_____________|                 |
 * |_###_____________|       MPU       |
 * |_###_____________|_________________|
 */
const ColumnOfThree50_Ad50 = ({
	cards,
	containerPalette,
	showAge,
	index,
}: {
	cards: [TrailType, TrailType, TrailType];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	index: number;
}) => (
	<UL direction="row">
		<LI percentage="50%">
			<UL direction="column">
				<LI padSides={true} padBottom={true}>
					<FrontCard
						trail={cards[0]}
						containerPalette={containerPalette}
						showAge={showAge}
						imagePosition="left"
						headlineSize="small"
					/>
				</LI>
				<LI padSides={true} padBottom={true}>
					<FrontCard
						trail={cards[1]}
						containerPalette={containerPalette}
						showAge={showAge}
						imagePosition="left"
						headlineSize="small"
					/>
				</LI>
				<LI padSides={true}>
					<FrontCard
						trail={cards[2]}
						containerPalette={containerPalette}
						showAge={showAge}
						imagePosition="left"
						headlineSize="small"
					/>
				</LI>
			</UL>
		</LI>
		<LI percentage="50%">
			<Hide until="tablet">
				<AdSlot position="inline" index={index} />
			</Hide>
		</LI>
	</UL>
);

/* ._________________________._________.
 * |         ################|#########|
 * |         ################|         |
 * |_________################|_________|
 */
const Card75_Card25 = ({
	cards,
	containerPalette,
	showAge,
}: {
	cards: [TrailType, TrailType];
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

/* ._________________._________________.
 * |#################|#################|
 * |                 |                 |
 * |_________________|_________________|
 */
const Card50_Card50 = ({
	cards,
	containerPalette,
	showAge,
}: {
	cards: [TrailType, TrailType];
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

/* ._________________.________.________.
 * |#################|########|########|
 * |                 |        |        |
 * |_________________|________|________|
 */
const Card50_Card25_Card25 = ({
	cards,
	containerPalette,
	showAge,
}: {
	cards: [TrailType, TrailType, TrailType];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
}) => (
	<UL direction="row" padBottom={true}>
		<LI percentage="50%" padSides={true}>
			<FrontCard
				trail={cards[0]}
				containerPalette={containerPalette}
				showAge={showAge}
				headlineSize="large"
				imagePosition="top"
				imagePositionOnMobile="top"
				supportingContent={cards[0].supportingContent}
			/>
		</LI>
		<LI
			percentage="25%"
			padSides={true}
			showDivider={true}
			showTopMarginWhenStacked={true}
		>
			<FrontCard
				trail={cards[1]}
				containerPalette={containerPalette}
				showAge={showAge}
				trailText={
					cards[1].supportingContent &&
					cards[1].supportingContent.length > 0
						? undefined
						: cards[1].trailText
				}
				supportingContent={
					cards[1].trailText ? undefined : cards[1].supportingContent
				}
			/>
		</LI>
		<LI
			percentage="25%"
			padSides={true}
			showDivider={true}
			showTopMarginWhenStacked={true}
		>
			<FrontCard
				trail={cards[2]}
				containerPalette={containerPalette}
				showAge={showAge}
				trailText={
					cards[2].supportingContent &&
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
 * DynamicSlowMPU
 *
 * This container only allows big and standard cards (from groupedTrails)
 *
 * Layout is dynamic deopending on the number of big cards. You're only
 * allowed to have 2 or 3 big cards. If you pass 1 a standard card will
 * get promoted to make two bigs. If you pass more than 3 bigs then the
 * extras will get demoted to standard.
 *
 * If you pass no bigs at all the top slice will not render and a special
 * 3 column layout is used for the remaining slice.
 *
 */
export const DynamicSlowMPU = ({
	groupedTrails,
	containerPalette,
	showAge,
	index,
}: Props) => {
	let layout: 'noBigs' | 'twoBigs' | 'twoBigsBoosted' | 'threeBigs';
	let bigCards: TrailType[] = [];
	let standardCards: TrailType[] = [];
	switch (groupedTrails.big.length) {
		case 0: {
			standardCards = groupedTrails.standard.slice(0, 4);
			layout = 'noBigs';
			break;
		}
		case 1: {
			// If there is only one big item a standard item is promoted such that
			// there is always at least two
			const promoted = groupedTrails.standard.slice(0, 1);
			bigCards = [...groupedTrails.big, ...promoted];
			standardCards = groupedTrails.standard.slice(1, 4);
			layout = 'twoBigs';
			break;
		}
		case 2: {
			bigCards = groupedTrails.big;
			standardCards = groupedTrails.standard.slice(0, 3);
			if (groupedTrails.big[0]?.isBoosted) {
				layout = 'twoBigsBoosted';
			} else {
				layout = 'twoBigs';
			}
			break;
		}
		case 3: {
			bigCards = groupedTrails.big;
			standardCards = groupedTrails.standard.slice(0, 3);
			layout = 'threeBigs';
			break;
		}
		default: {
			// If there are more than three big cards, these extra bigs are demoted to
			// standard.
			const demoted = groupedTrails.big.slice(3);
			standardCards = [...demoted, ...groupedTrails.standard].slice(0, 3);
			bigCards = groupedTrails.big.slice(0, 3);
			layout = 'threeBigs';
		}
	}

	switch (layout) {
		case 'noBigs': {
			if (!isTuple(standardCards, 4)) {
				throw new Error(
					`Invalid number of cards: ${bigCards.length} big & ${standardCards.length} standard`,
				);
			}
			return (
				<Card33_ColumnOfThree33_Ad33
					cards={standardCards}
					containerPalette={containerPalette}
					showAge={showAge}
					index={index}
				/>
			);
		}
		case 'twoBigs': {
			if (!(isTuple(bigCards, 2) && isTuple(standardCards, 3))) {
				throw new Error(
					`Invalid number of cards: ${bigCards.length} big & ${standardCards.length} standard`,
				);
			}
			return (
				<>
					<Card50_Card50
						cards={bigCards}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
					<ColumnOfThree50_Ad50
						cards={standardCards}
						containerPalette={containerPalette}
						showAge={showAge}
						index={index}
					/>
				</>
			);
		}
		case 'twoBigsBoosted': {
			if (!(isTuple(bigCards, 2) && isTuple(standardCards, 3))) {
				throw new Error(
					`Invalid number of cards: ${bigCards.length} big & ${standardCards.length} standard`,
				);
			}
			return (
				<>
					<Card75_Card25
						cards={bigCards}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
					<ColumnOfThree50_Ad50
						cards={standardCards}
						containerPalette={containerPalette}
						showAge={showAge}
						index={index}
					/>
				</>
			);
		}
		case 'threeBigs': {
			if (!(isTuple(bigCards, 3) && isTuple(standardCards, 3))) {
				throw new Error(
					`Invalid number of cards: ${bigCards.length} big & ${standardCards.length} standard`,
				);
			}
			return (
				<>
					<Card50_Card25_Card25
						cards={bigCards}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
					<ColumnOfThree50_Ad50
						cards={standardCards}
						containerPalette={containerPalette}
						showAge={showAge}
						index={index}
					/>
				</>
			);
		}
	}
};
