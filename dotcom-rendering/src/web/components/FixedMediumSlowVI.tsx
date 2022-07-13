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

export const FixedMediumSlowVI = ({
	collectionId,
	trails,
	containerPalette,
	showAge,
	hasMore,
}: Props) => {
	const topTrails = trails.slice(0, 2);
	const bottomTrails = trails.slice(2, 6);

	return (
		<>
			<UL direction="row" padBottom={true}>
				{topTrails.map((trail, index) => {
					return (
						<LI
							key={trail.url}
							padSides={true}
							showDivider={index > 0}
							padBottomOnMobile={index === 0 ? true : false}
							percentage={index === 0 ? '75%' : '25%'}
						>
							<FrontCard
								trail={trail}
								containerPalette={containerPalette}
								showAge={showAge}
								headlineSize={index === 0 ? 'large' : 'medium'}
								imagePosition={index === 0 ? 'right' : 'top'}
								imagePositionOnMobile={
									index === 0 ? 'top' : 'left'
								}
								imageSize={index === 0 ? 'large' : 'medium'}
								trailText={trail.trailText}
							/>
						</LI>
					);
				})}
			</UL>
			<UL direction="row">
				{bottomTrails.map((trail, index) => {
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
								headlineSize="small"
							/>
						</LI>
					);
				})}
			</UL>
			{hasMore && <span data-show-more-placeholder={collectionId} />}
		</>
	);
};
