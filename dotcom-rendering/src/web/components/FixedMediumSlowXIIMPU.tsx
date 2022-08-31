/* eslint-disable @typescript-eslint/naming-convention -- because underscores work here*/
import { Hide } from '@guardian/source-react-components';
import type { DCRContainerPalette } from '../../types/front';
import type { TrailType } from '../../types/trails';
import { shouldPadWrappableRows } from '../lib/dynamicSlices';
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

/* .___________________________________.
 * |         ##########################|
 * |         ###########(^)>###########|
 * |         ###########(_)############|
 * |         ##########################|
 * |_________##########################|
 */
const Card100 = ({
	trails,
	containerPalette,
	showAge,
}: {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
}) => (
	<UL>
		<LI padSides={true}>
			<FrontCard
				trail={trails[0]}
				containerPalette={containerPalette}
				showAge={showAge}
				imagePosition="right"
				imagePositionOnMobile="top"
				imageSize="jumbo"
				headlineSize="huge"
				headlineSizeOnMobile="large"
				trailText={trails[0].trailText}
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
	trails,
	containerPalette,
	showAge,
}: {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
}) => (
	<UL direction="row">
		<LI percentage="50%" padSides={true}>
			<FrontCard
				trail={trails[0]}
				containerPalette={containerPalette}
				showAge={showAge}
				trailText={trails[0].trailText}
				imagePositionOnMobile="top"
			/>
		</LI>
		<LI percentage="50%" padSides={true} showDivider={true}>
			<FrontCard
				trail={trails[1]}
				containerPalette={containerPalette}
				showAge={showAge}
				trailText={trails[1].trailText}
				imagePositionOnMobile="top"
			/>
		</LI>
	</UL>
);

/* .___________.___________.___________.
 * |###########|###########|###########|
 * |           |           |           |
 * |___________|___________|___________|
 */
const Card33_Card33_Card33 = ({
	trails,
	containerPalette,
	showAge,
	padBottom,
}: {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	padBottom?: boolean;
}) => (
	<UL direction="row" padBottom={padBottom}>
		<LI percentage="33.333%" padSides={true}>
			<FrontCard
				trail={trails[0]}
				containerPalette={containerPalette}
				showAge={showAge}
				trailText={trails[0].trailText}
				imagePositionOnMobile="top"
			/>
		</LI>
		<LI percentage="33.333%" padSides={true} showDivider={true}>
			<FrontCard
				trail={trails[1]}
				containerPalette={containerPalette}
				showAge={showAge}
				trailText={trails[1].trailText}
				imagePositionOnMobile="left"
			/>
		</LI>
		<LI percentage="33.333%" padSides={true} showDivider={true}>
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
	<UL direction="row">
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
	<UL direction="row">
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
		<LI percentage="33.333%" padSides={true} showDivider={true}>
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
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
				/>
			);
		}
		case 2: {
			return (
				<Card50_Card50
					trails={trails}
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
						padBottom={true}
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
						padBottom={true}
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
			return (
				<>
					<Card33_Card33_Card33
						trails={topThree}
						containerPalette={containerPalette}
						showAge={showAge}
						padBottom={remainingCards.length >= 2}
					/>
					<UL direction="row">
						<LI percentage="66.666%">
							{/*
							 *	This pattern of using wrapCards on the UL + percentage=50 and stretch=true
							 * on the LI creates a dynamic list of cards over two columns. Crucially,
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
										offsetBottomPaddingOnDivider={shouldPadWrappableRows(
											trailIndex,
											remainingCards.length,
											2,
										)}
										showDivider={trailIndex % 2 !== 0}
										percentage="50%"
										stretch={true}
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
