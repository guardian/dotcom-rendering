import { DCRContainerPalette } from '../../types/front';
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
	const primaries = trails.slice(0, 2);
	const secondaries = trails.slice(2, 5);

	return (
		<UL direction="row">
			{primaries.map((trail, index) => {
				return (
					<LI
						key={trail.url}
						padSides={true}
						showDivider={index > 0}
						padBottomOnMobile={true}
						percentage="25%"
					>
						<FrontCard
							trail={trail}
							containerPalette={containerPalette}
							showAge={showAge}
							supportingContent={trail.supportingContent}
						/>
					</LI>
				);
			})}
			<LI showDivider={true} percentage="50%">
				<UL direction="column">
					{secondaries.map((trail, index) => {
						return (
							<LI
								key={trail.url}
								padBottom={index != 2}
								padSides={true}
								padBottomOnMobile={true}
							>
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
