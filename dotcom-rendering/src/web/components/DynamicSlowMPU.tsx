/* eslint-disable @typescript-eslint/naming-convention -- because underscores work here*/
import { Hide } from '@guardian/source-react-components';
import type { DCRContainerPalette, DCRGroupedTrails } from '../../types/front';
import { AdSlot } from './AdSlot';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

type Props = {
	groupedTrails: DCRGroupedTrails;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
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
}: {
	cards: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
}) => (
	<UL direction="row">
		<LI percentage="33.333%">
			<FrontCard
				trail={cards[0]}
				containerPalette={containerPalette}
				showAge={showAge}
			/>
		</LI>
		<LI percentage="33.333%">
			<UL direction="column">
				<LI padSides={true} padBottom={true}>
					<FrontCard
						trail={cards[0]}
						containerPalette={containerPalette}
						showAge={showAge}
						imageUrl={undefined}
						headlineSize="small"
					/>
				</LI>
				<LI padSides={true} padBottom={true}>
					<FrontCard
						trail={cards[1]}
						containerPalette={containerPalette}
						showAge={showAge}
						imageUrl={undefined}
						headlineSize="small"
					/>
				</LI>
				<LI padSides={true}>
					<FrontCard
						trail={cards[2]}
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
				{/* TODO: Replace mostpop with a more appropriate value */}
				<AdSlot position="mostpop" />
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
}: {
	cards: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
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
				{/* TODO: Replace mostpop with a more appropriate value */}
				<AdSlot position="mostpop" />
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
}: Props) => {
	let bigCards = groupedTrails.big;
	let standardCards = groupedTrails.standard;

	if (bigCards.length === 0) {
		// If there are no big cards at all we get just one, special, slice:
		return (
			<Card33_ColumnOfThree33_Ad33
				cards={standardCards}
				containerPalette={containerPalette}
				showAge={showAge}
			/>
		);
	}

	if (bigCards.length === 1) {
		// If there is only one big item a standard item is promoted such that
		// there is always at least two
		const promoted = standardCards.slice(0, 1);
		bigCards = [...bigCards, ...promoted];
		standardCards = standardCards.slice(1);
	}

	if (bigCards.length > 3) {
		// If there are more than three big cards, these extra bigs are demoted to
		// standard.
		const demoted = bigCards.slice(2);
		standardCards = [...demoted, ...standardCards];
	}

	if (bigCards.length === 2 && bigCards[0].isBoosted) {
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
				/>
			</>
		);
	}

	if (bigCards.length === 2) {
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
				/>
			</>
		);
	}

	// Else bigCards.length === 3
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
			/>
		</>
	);
};
