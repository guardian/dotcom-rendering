import { Card25Media25, CardDefault } from '../lib/cardWrappers';
import { shouldPadWrappableRows } from '../lib/dynamicSlices';
import type { DCRContainerPalette, DCRFrontCard } from '../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import type { Loading } from './CardPicture';

type Props = {
	trails: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const FixedSmallFastVIII = ({
	trails,
	containerPalette,
	showAge,
	imageLoading,
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
						<Card25Media25
							trail={card}
							containerPalette={containerPalette}
							showAge={showAge}
							imageLoading={imageLoading}
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
									remaining.length -
										(remaining.length % columns),
									columns,
								)}
							>
								<CardDefault
									trail={card}
									containerPalette={containerPalette}
									showAge={showAge}
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};
