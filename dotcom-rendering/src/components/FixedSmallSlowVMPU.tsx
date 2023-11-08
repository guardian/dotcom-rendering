import { Card25Media25SmallHeadline } from '../lib/cardWrappers';
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

export const FixedSmallSlowVMPU = ({
	trails,
	containerPalette,
	showAge,
	imageLoading,
}: Props) => (
	<UL direction="row" padBottom={true}>
		{trails.slice(0, 4).map((card, cardIndex) => {
			return (
				<LI
					padSides={true}
					percentage="25%"
					showDivider={cardIndex > 0}
					containerPalette={containerPalette}
					key={card.url}
				>
					<Card25Media25SmallHeadline
						trail={card}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
				</LI>
			);
		})}
	</UL>
);
