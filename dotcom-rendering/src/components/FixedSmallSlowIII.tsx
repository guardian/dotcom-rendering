import { Card25Media25Tall, Card50Media50 } from '../lib/cardWrappers';
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

export const FixedSmallSlowIII = ({
	trails,
	containerPalette,
	showAge,
	imageLoading,
}: Props) => {
	const firstSlice50 = trails.slice(0, 1);
	const firstSlice25 = trails.slice(1, 3);

	return (
		<UL direction="row">
			{firstSlice50.map((trail) => (
				<LI padSides={true} percentage={'50%'} key={trail.url}>
					<Card50Media50
						trail={trail}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
				</LI>
			))}
			{firstSlice25.map((trail) => (
				<LI
					padSides={true}
					showDivider={true}
					containerPalette={containerPalette}
					percentage={'25%'}
					key={trail.url}
				>
					<Card25Media25Tall
						trail={trail}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
				</LI>
			))}
		</UL>
	);
};
