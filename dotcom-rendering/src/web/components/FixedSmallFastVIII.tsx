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
	const firstSlice25 = trails.slice(0, 2);
	const remaining = trails.slice(2, 8);

	return (
		<UL direction="row" wrapCards={true}>
			{firstSlice25.map((card, cardIndex) => {
				return (
					<LI
						percentage="25%"
						padSides={true}
						showDivider={cardIndex === 1}
						key={card.url}
					>
						<FrontCard
							trail={card}
							containerPalette={containerPalette}
							showAge={showAge}
							headlineSize="medium"
							imageUrl={card.image}
						/>
					</LI>
				);
			})}
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
									remaining.length - (remaining.length % columns),
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
