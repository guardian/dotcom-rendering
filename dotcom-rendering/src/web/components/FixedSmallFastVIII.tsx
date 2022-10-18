import type { DCRContainerPalette } from '../../types/front';
import type { TrailType } from '../../types/trails';
import { shouldPadWrappableRows } from '../lib/dynamicSlices';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const FixedSmallFastVIII = ({
	trails,
	containerPalette,
	showAge,
}: Props) => {
	if (!trails[0]) return null;
	const primary = trails[0];
	const secondary = trails[1];
	const remaining = trails.slice(2, 7);

	return (
		<UL direction="row" wrapCards={true}>
			<LI percentage="25%" padSides={true} showDivider={false}>
				<FrontCard
					trail={primary}
					containerPalette={containerPalette}
					showAge={showAge}
					headlineSize="medium"
					imageUrl={primary.image}
				/>
			</LI>
			<LI percentage="25%" padSides={true} showDivider={true}>
				<FrontCard
					trail={secondary}
					containerPalette={containerPalette}
					showAge={showAge}
					headlineSize="medium"
					imageUrl={secondary.image}
				/>
			</LI>
			<LI percentage="50%">
				<UL direction="row" wrapCards={true} showDivider={true}>
					{remaining.map((card, cardIndex) => {
						const columns = 2;
						return (
							<LI
								key={card.url}
								percentage="50%"
								stretch={true}
								padSides={true}
								showDivider={cardIndex % columns !== 0}
								offsetBottomPaddingOnDivider={shouldPadWrappableRows(
									cardIndex,
									remaining.length -
										(remaining.length % columns),
									columns,
								)}
							>
								<FrontCard
									trail={card}
									containerPalette={containerPalette}
									showAge={showAge}
									imageUrl={undefined}
									headlineSize="small"
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};
