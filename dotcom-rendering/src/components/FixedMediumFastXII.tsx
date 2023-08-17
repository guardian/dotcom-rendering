import { Card25Media25, CardDefault } from '../lib/cardWrappers';
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

export const FixedMediumFastXII = ({
	trails,
	containerPalette,
	showAge,
	imageLoading,
}: Props) => {
	const firstSlice25 = trails.slice(0, 4);
	const remaining = trails.slice(4, 12);

	return (
		<>
			<UL direction="row" padBottom={true}>
				{firstSlice25.map((trail, index) => {
					return (
						<LI
							key={trail.url}
							padSides={true}
							percentage="25%"
							showDivider={index > 0}
						>
							<Card25Media25
								trail={trail}
								containerPalette={containerPalette}
								showAge={showAge}
								imageLoading={imageLoading}
							/>
						</LI>
					);
				})}
			</UL>
			<UL direction="row" padBottom={true} wrapCards={true}>
				{remaining.map((trail, index) => {
					return (
						<LI
							key={trail.url}
							padSides={true}
							percentage="25%"
							showDivider={index != 0 && index != 4}
						>
							<CardDefault
								trail={trail}
								containerPalette={containerPalette}
								showAge={showAge}
							/>
						</LI>
					);
				})}
			</UL>
		</>
	);
};
