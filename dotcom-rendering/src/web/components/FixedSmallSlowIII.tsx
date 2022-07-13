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

export const FixedSmallSlowIII = ({
	collectionId,
	trails,
	containerPalette,
	showAge,
	hasMore,
}: Props) => {
	const smallTrails = trails.slice(0, 3);

	return (
		<>
			<UL direction="row">
				{smallTrails.map((trail, index) => {
					return (
						<LI
							padSides={true}
							showDivider={index > 0}
							padBottomOnMobile={true}
							percentage={index === 0 ? '50%' : '25%'}
							key={trail.url}
						>
							<FrontCard
								trail={trail}
								containerPalette={containerPalette}
								showAge={showAge}
								headlineSize={index === 0 ? 'large' : 'medium'}
								imagePositionOnMobile={
									index === 0 ? 'top' : 'left'
								}
								trailText={
									index === 0 ? undefined : trail.trailText
								}
							/>
						</LI>
					);
				})}
			</UL>
			{hasMore && <span data-show-more-placeholder={collectionId} />}
		</>
	);
};
