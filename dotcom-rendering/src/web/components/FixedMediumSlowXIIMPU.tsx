/* eslint-disable @typescript-eslint/naming-convention -- because underscores work here*/
import { Hide } from '@guardian/source-react-components';
import type { DCRContainerPalette } from '../../types/front';
import type { TrailType } from '../../types/trails';
import { Card100, Card50_Card50 } from '../lib/slices';
import { AdSlot } from './AdSlot';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	index: number;
};

/* .___________.___________.___________.
 * |###########|###########|###########|
 * |           |           |           |
 * |___________|___________|___________|
 */
const Card33_Card33_Card33 = ({
	trails,
	containerPalette,
	showAge,
}: {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
}) => (
	<UL direction="row" padBottom={true}>
		<LI percentage="33.333%" padSides={true}>
			<FrontCard
				trail={trails[0]}
				containerPalette={containerPalette}
				showAge={showAge}
				trailText={trails[0].trailText}
				imagePositionOnMobile="top"
			/>
		</LI>
		<LI
			percentage="33.333%"
			padSides={true}
			showTopMarginWhenStacked={true}
			showDivider={true}
		>
			<FrontCard
				trail={trails[1]}
				containerPalette={containerPalette}
				showAge={showAge}
				trailText={trails[1].trailText}
				imagePositionOnMobile="left"
			/>
		</LI>
		<LI
			percentage="33.333%"
			padSides={true}
			showTopMarginWhenStacked={true}
			showDivider={true}
		>
			<FrontCard
				trail={trails[2]}
				containerPalette={containerPalette}
				showAge={showAge}
				trailText={trails[2].trailText}
				imagePositionOnMobile="left"
			/>
		</LI>
	</UL>
);

/* ._______________________.___________.
 * |       ################|           |
 * |       ################|    MPU    |
 * |_______################|___________|
 */
const Card66_Ad33 = ({
	trails,
	containerPalette,
	showAge,
	index,
}: {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	index: number;
}) => (
	<UL direction="row" padBottom={true}>
		<LI percentage="66.666%" padSides={true}>
			<FrontCard
				trail={trails[0]}
				containerPalette={containerPalette}
				showAge={showAge}
				trailText={trails[0].trailText}
				imagePosition="right"
				imageSize="large"
				imagePositionOnMobile="top"
			/>
		</LI>
		<LI percentage="33.333%" showDivider={true}>
			<Hide until="tablet">
				<AdSlot position="inline" index={index} />
			</Hide>
		</LI>
	</UL>
);

/* .___________.___________.___________.
 * |###########|###########|           |
 * |           |           |    MPU    |
 * |___________|___________|___________|
 */
const Card33_Card33_Ad33 = ({
	trails,
	containerPalette,
	showAge,
	index,
}: {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	index: number;
}) => (
	<UL direction="row" padBottom={true}>
		<LI percentage="33.333%" padSides={true}>
			<FrontCard
				trail={trails[0]}
				containerPalette={containerPalette}
				showAge={showAge}
				trailText={
					trails[0]?.supportingContent &&
					trails[0].supportingContent.length > 0
						? undefined
						: trails[0].trailText
				}
				supportingContent={
					trails[0].trailText
						? undefined
						: trails[0].supportingContent
				}
			/>
		</LI>
		<LI
			percentage="33.333%"
			padSides={true}
			showDivider={true}
			showTopMarginWhenStacked={true}
		>
			<FrontCard
				trail={trails[1]}
				containerPalette={containerPalette}
				showAge={showAge}
				trailText={
					trails[1]?.supportingContent &&
					trails[1].supportingContent.length > 0
						? undefined
						: trails[1].trailText
				}
				supportingContent={
					trails[1].trailText
						? undefined
						: trails[1].supportingContent
				}
			/>
		</LI>
		<LI percentage="33.333%" showDivider={true}>
			<Hide until="tablet">
				<AdSlot position="inline" index={index} />
			</Hide>
		</LI>
	</UL>
);

/**
 * If the count of cards is odd there is just a single card on
 * the bottom row with nothing under it which does not need
 * padding
 */
function shouldPadWhenOdd(i: number, noOfCards: number) {
	return i !== noOfCards - 1;
}

/**
 * If the count of cards is even the last two sit on the bottom
 * row with nothing underneath so we don't want to pad them
 */
function shouldPadWhenEven(i: number, noOfCards: number) {
	return i !== noOfCards - 1 && i !== noOfCards - 2;
}

/**
 *
 * When there is an odd number of cards the last card spans
 * both columns so we don't want to push the divider for the
 * previous two cards above it down. If we did it would
 * touch
 */
function shouldOffsetWhenOdd(i: number, noOfCards: number) {
	return i === noOfCards - 2 || i === noOfCards - 3;
}

/**
 * FixedMediumSlowXIIMPU
 *
 */
export const FixedMediumSlowXIIMPU = ({
	trails,
	containerPalette,
	showAge,
	index,
}: Props) => {
	switch (trails.length) {
		case 0: {
			return null;
		}
		case 1: {
			return (
				<Card100
					cards={trails}
					containerPalette={containerPalette}
					showAge={showAge}
				/>
			);
		}
		case 2: {
			return (
				<Card50_Card50
					cards={trails}
					containerPalette={containerPalette}
					showAge={showAge}
				/>
			);
		}
		case 3: {
			return (
				<Card33_Card33_Card33
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
				/>
			);
		}
		case 4: {
			const topThree = trails.slice(0, 3);
			const remainingCards = trails.slice(3);
			return (
				<>
					<Card33_Card33_Card33
						trails={topThree}
						containerPalette={containerPalette}
						showAge={showAge}
					/>

					<Card66_Ad33
						trails={remainingCards}
						containerPalette={containerPalette}
						showAge={showAge}
						index={index}
					/>
				</>
			);
		}
		case 5: {
			const topThree = trails.slice(0, 3);
			const remainingCards = trails.slice(3);
			return (
				<>
					<Card33_Card33_Card33
						trails={topThree}
						containerPalette={containerPalette}
						showAge={showAge}
					/>

					<Card33_Card33_Ad33
						trails={remainingCards}
						containerPalette={containerPalette}
						showAge={showAge}
						index={index}
					/>
				</>
			);
		}
		case 6:
		case 7:
		case 8:
		case 9:
		default: {
			const topThree = trails.slice(0, 3);
			const remainingCards = trails.slice(3, 9);
			const lengthIsEven = remainingCards.length % 2 === 0;
			return (
				<>
					<Card33_Card33_Card33
						trails={topThree}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
					<UL direction="row">
						<LI percentage="66.666%">
							{/*
							 *	This pattern of using wrapCards on the UL + percentage=50 and stretch=true
							 * on the LI creates a dynanic list of cards over two columns. Crucially,
							 * cards align horizontally in rows. If the number of trails is odd the last
							 * card stretches full width.
							 *
							 * E.g:
							 * .___________.___________.
							 * |___________|___________|
							 * |___________|___________|
							 * |_______________________|
							 */}
							<UL direction="row" wrapCards={true}>
								{remainingCards.map((trail, trailIndex) => (
									<LI
										padSides={true}
										padBottom={
											lengthIsEven
												? shouldPadWhenEven(
														trailIndex,
														remainingCards.length,
												  )
												: shouldPadWhenOdd(
														trailIndex,
														remainingCards.length,
												  )
										}
										offsetBottomPaddingOnDivider={
											lengthIsEven
												? false
												: shouldOffsetWhenOdd(
														trailIndex,
														remainingCards.length,
												  )
										}
										showDivider={trailIndex % 2 !== 0}
										percentage="50%"
										stretch={true}
										showTopMarginWhenStacked={
											lengthIsEven &&
											remainingCards.length ===
												trailIndex + 1
										}
									>
										<FrontCard
											trail={trail}
											containerPalette={containerPalette}
											showAge={showAge}
											imageUrl={undefined}
											headlineSize="small"
										/>
									</LI>
								))}
							</UL>
						</LI>
						<LI percentage="33.333%" showDivider={true}>
							<Hide until="tablet">
								<AdSlot position="inline" index={index} />
							</Hide>
						</LI>
					</UL>
				</>
			);
		}
	}
};
