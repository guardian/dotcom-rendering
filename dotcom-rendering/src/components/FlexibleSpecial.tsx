import type {
	DCRContainerPalette,
	DCRFrontCard,
	DCRGroupedTrails,
} from '../types/front';
import { Snap100 } from './DynamicPackage';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { Loading } from './CardPicture';
import { FrontCard } from './FrontCard';

type Props = { groupedTrails: DCRGroupedTrails };

const SupportingStoryLayout = ({
	cards,
	containerPalette,
	showAge,
	absoluteServerTimes,
	showImage = true,
	padBottom,
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
	showImage?: boolean;
	padBottom?: boolean;
}) => {
	return (
		<UL direction="row" padBottom={padBottom}>
			{cards.map((card, cardIndex) => {
				return (
					<LI
						stretch={false}
						percentage={cards.length <= 2 ? '50%' : '25%'}
						key={card.url}
						padSides={true}
						showDivider={cardIndex > 0}
					>
						<FrontCard
							trail={card}
							containerPalette={containerPalette}
							containerType="dynamic/package"
							showAge={showAge}
							absoluteServerTimes={absoluteServerTimes}
							image={showImage ? card.image : undefined}
							imageLoading={imageLoading}
						/>
					</LI>
				);
			})}
		</UL>
	);
};

export const FlexibleSpecial = ({ groupedTrails }: Props) => {
	const snaps = [...groupedTrails.snap].slice(0, 1);
	const cards = [...groupedTrails.standard].slice(0, 4);
	cards.map((card) => console.log(card.headline));

	return (
		<>
			<Snap100
				snaps={snaps}
				absoluteServerTimes={false}
				imageLoading={'eager'}
			/>
			<SupportingStoryLayout
				cards={cards}
				absoluteServerTimes={false}
				imageLoading={'eager'}
			/>
		</>
	);
};
