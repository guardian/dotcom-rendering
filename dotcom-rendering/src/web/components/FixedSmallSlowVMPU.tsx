import { Hide } from '@guardian/source-react-components';
import type { DCRContainerPalette } from '../../types/front';
import type { TrailType } from '../../types/trails';
import { Card33Media33Tall, CardDefault } from '../lib/cardWrappers';
import { AdSlot } from './AdSlot';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	index: number;
};

export const FixedSmallSlowVMPU = ({
	trails,
	containerPalette,
	showAge,
	index,
}: Props) => {
	const firstSlice33 = trails.slice(0, 1);
	const remaining = trails.slice(1, 4);

	return (
		<UL direction="row">
			{firstSlice33.map((trail) => (
				<LI percentage="33.333%" padSides={true} key={trail.url}>
					<Card33Media33Tall
						trail={trail}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
				</LI>
			))}
			<LI
				percentage="33.333%"
				padSides={true}
				showDivider={true}
				containerPalette={containerPalette}
			>
				<UL direction="column">
					{remaining.map((trail) => (
						<LI key={trail.url}>
							<CardDefault
								trail={trail}
								containerPalette={containerPalette}
								showAge={showAge}
							/>
						</LI>
					))}
				</UL>
			</LI>
			<LI
				percentage="33.333%"
				padSides={true}
				showDivider={true}
				containerPalette={containerPalette}
			>
				<Hide until="tablet">
					<AdSlot position="inline" index={index} />
				</Hide>
			</LI>
		</UL>
	);
};
