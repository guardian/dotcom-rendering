import { Card25Media25 } from '../lib/cardWrappers';
import type { DCRContainerPalette, DCRFrontCard } from '../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import type { Loading } from './CardPicture';
import { FrontCard } from './FrontCard';

type Props = {
	trails: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const FixedSmallSlowVThird = ({
	trails,
	containerPalette,
	showAge,
	imageLoading,
}: Props) => {
	const firstSlice25 = trails.slice(0, 2);
	const remaining = trails.slice(2, 5);

	return (
		<UL direction="row">
			{firstSlice25.map((trail, index) => {
				return (
					<LI
						key={trail.url}
						padSides={true}
						showDivider={index > 0}
						containerPalette={containerPalette}
						percentage="25%"
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
			<LI
				showDivider={true}
				containerPalette={containerPalette}
				percentage="50%"
			>
				<UL direction="column">
					{remaining.map((trail) => {
						return (
							<LI key={trail.url} padSides={true}>
								<FrontCard
									trail={trail}
									containerPalette={containerPalette}
									showAge={showAge}
									headlineSize="small"
									imagePosition="left"
									imagePositionOnMobile="none"
									imageSize="small"
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
