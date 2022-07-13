import type { DCRContainerPalette } from '../../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

type Props = {
	collectionId: string;
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	hasMore: boolean;
};

export const FixedSmallSlowIV = ({
	collectionId,
	trails,
	containerPalette,
	showAge,
	hasMore,
}: Props) => {
	const slicedTrails = trails.slice(0, 4);

	return (
		<>
			<UL direction="row">
				{slicedTrails.map((trail, index) => {
					return (
						<LI
							key={trail.url}
							padSides={true}
							showDivider={index > 0}
							padBottomOnMobile={true}
						>
							<FrontCard
								trail={trail}
								containerPalette={containerPalette}
								showAge={showAge}
								imageSize="medium"
							/>
						</LI>
					);
				})}
			</UL>
			{hasMore && <span data-show-more-placeholder={collectionId} />}
		</>
	);
};
