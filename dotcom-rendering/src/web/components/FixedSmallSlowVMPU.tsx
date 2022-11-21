import { Hide } from '@guardian/source-react-components';
import type { DCRContainerPalette } from '../../types/front';
import type { TrailType } from '../../types/trails';
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

export const FixedSmallSlowVMPU = ({
	trails,
	containerPalette,
	showAge,
	index,
}: Props) => {
	const primary = trails.slice(0, 1);
	const secondary = trails.slice(1, 4);

	return (
		<UL direction="row">
			{primary.map((trail) => (
				<LI percentage="33.333%" padSides={true}>
					<FrontCard
						trail={trail}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
				</LI>
			))}
			<LI percentage="33.333%" padSides={true} showDivider={true}>
				<UL direction="column">
					{secondary.map((trail) => (
						<LI>
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
			<LI percentage="33.333%" padSides={true} showDivider={true}>
				<Hide until="tablet">
					<AdSlot position="inline" index={index} />
				</Hide>
			</LI>
		</UL>
	);
};
