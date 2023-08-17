import { Card50Media50, CardDefaultMediaMobile } from '../lib/cardWrappers';
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

export const FixedSmallSlowVHalf = ({
	trails,
	containerPalette,
	showAge,
	imageLoading,
}: Props) => {
	const firstSlice50 = trails.slice(0, 1);
	const remaining = trails.slice(1, 5);

	return (
		<UL direction="row-reverse">
			{firstSlice50.map((trail, index) => {
				return (
					<LI
						key={trail.url}
						padSides={true}
						showDivider={true}
						containerPalette={containerPalette}
						percentage="50%"
					>
						<Card50Media50
							trail={trail}
							containerPalette={containerPalette}
							showAge={showAge}
							imageLoading={imageLoading}
						/>
					</LI>
				);
			})}
			<LI containerPalette={containerPalette} percentage="50%">
				<UL direction="column">
					{remaining.map((trail) => {
						return (
							<LI key={trail.url} padSides={true}>
								<CardDefaultMediaMobile
									trail={trail}
									containerPalette={containerPalette}
									showAge={showAge}
									imageLoading={imageLoading}
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};
