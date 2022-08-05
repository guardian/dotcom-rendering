import { Hide } from '@guardian/source-react-components';
import type { DCRContainerPalette } from '../../types/front';
import { AdSlot } from './AdSlot';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const FixedSmallSlowVMPU = ({
	trails,
	containerPalette,
	showAge,
}: Props) => {
	return (
		<UL direction="row">
			<LI percentage="33.333%" padSides={true} padBottomOnMobile={true}>
				<FrontCard
					trail={trails[0]}
					containerPalette={containerPalette}
					showAge={showAge}
				/>
			</LI>
			<LI
				percentage="33.333%"
				padSides={true}
				showDivider={true}
				padBottomOnMobile={true}
			>
				<UL direction="column">
					<LI padBottom={true}>
						<FrontCard
							trail={trails[1]}
							containerPalette={containerPalette}
							showAge={showAge}
							imageUrl={undefined}
							headlineSize="small"
						/>
					</LI>
					<LI padBottom={true}>
						<FrontCard
							trail={trails[2]}
							containerPalette={containerPalette}
							showAge={showAge}
							imageUrl={undefined}
							headlineSize="small"
						/>
					</LI>
					<LI>
						<FrontCard
							trail={trails[3]}
							containerPalette={containerPalette}
							showAge={showAge}
							imageUrl={undefined}
							headlineSize="small"
						/>
					</LI>
				</UL>
			</LI>
			<LI percentage="33.333%" padSides={true} showDivider={true}>
				<Hide until="tablet">
					{/* TODO: Replace mostpop with a more appropriate value */}
					<AdSlot position="mostpop" />
				</Hide>
			</LI>
		</UL>
	);
};
