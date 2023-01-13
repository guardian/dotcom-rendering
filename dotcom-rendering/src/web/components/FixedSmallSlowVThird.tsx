import type { DCRContainerPalette } from '../../types/front';
import type { TrailType } from '../../types/trails';
import { Card25Media25Tall } from '../lib/cardWrappers';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const FixedSmallSlowVThird = ({
	trails,
	containerPalette,
	showAge,
}: Props) => {
	const firstSlice25 = trails.slice(0, 2);
	const remaining = trails.slice(2, 5);

	return (
		<UL direction="row">
			{firstSlice25.map((trail, index) => {
				return (
					<LI
						key={trail.url}
						padSides={true}
						showDivider={index > 0}
						containerPalette={containerPalette}
						percentage="25%"
					>
						<Card25Media25Tall
							trail={trail}
							containerPalette={containerPalette}
							showAge={showAge}
						/>
					</LI>
				);
			})}
			<LI
				showDivider={true}
				containerPalette={containerPalette}
				percentage="50%"
			>
				<UL direction="column">
					{remaining.map((trail) => {
						return (
							<LI key={trail.url} padSides={true}>
								<FrontCard
									trail={trail}
									containerPalette={containerPalette}
									showAge={showAge}
									headlineSize="small"
									imagePosition="left"
									imagePositionOnMobile="none"
									imageSize="small"
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};
