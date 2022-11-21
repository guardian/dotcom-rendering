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
}) => {
	const primary = trails.slice(0, 1);
	const secondary = trails.slice(1, 3);

	return (
		<UL direction="row" padBottom={padBottom}>
			{primary.map((trail) => (
				<LI percentage="33.333%" padSides={true}>
					<FrontCard
						trail={trail}
						containerPalette={containerPalette}
						showAge={showAge}
						trailText={trail.trailText}
						imagePositionOnMobile="top"
					/>
				</LI>
			))}
			{secondary.map((trail) => (
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<FrontCard
						trail={trail}
						containerPalette={containerPalette}
						showAge={showAge}
						trailText={trail.trailText}
						imagePositionOnMobile="left"
					/>
				</LI>
			))}
		</UL>
	);
};

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
	const topThree = trails.slice(0, 3);
	const remainingCards = trails.slice(3, 9);
	return (
		<>
			<Card33_Card33_Card33
				trails={topThree}
				containerPalette={containerPalette}
				showAge={showAge}
				padBottom={true}
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
						{remainingCards.map((trail, trailIndex, { length }) => (
							<LI
								padSides={true}
								offsetBottomPaddingOnDivider={shouldPadWrappableRows(
									trailIndex,
									length - (length % 2),
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
};
