import type {
	DCRContainerPalette,
	DCRFrontCard,
	DCRGroupedTrails,
} from '../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { Loading } from './CardPicture';
import { FrontCard } from './FrontCard';

type Props = { groupedTrails: DCRGroupedTrails };

export const OneCardLayout = ({
	cards,
	containerPalette,
	showAge,
	absoluteServerTimes,
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
}) => {
	if (!cards[0]) return null;

	return (
		<UL padBottom={true}>
			<LI padSides={true}>
				<FrontCard
					trail={cards[0]}
					containerPalette={containerPalette}
					containerType="dynamic/package"
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					headlineSize="large"
					headlineSizeOnMobile="medium"
					imagePositionOnDesktop="right"
					imagePositionOnMobile="left"
					imageSize="medium"
					trailText={cards[0].trailText}
					supportingContentAlignment="horizontal"
					imageLoading={imageLoading}
				/>
			</LI>
		</UL>
	);
};

const TwoCardorFourCardLayout = ({
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
	const splash = [...groupedTrails.standard].slice(0, 1);
	const cards = [...groupedTrails.standard].slice(1, 5);
	console.log('snaps::', snaps[0]?.headline);
	console.log('splash::', splash[0]?.headline);
	cards.map((card, i) => console.log(`card headline ${i}:: `, card.headline));

	return (
		<>
			{snaps && snaps.length > 0 && (
				<OneCardLayout
					cards={snaps}
					absoluteServerTimes={false}
					imageLoading={'eager'}
				/>
			)}
			<OneCardLayout
				cards={splash}
				absoluteServerTimes={false}
				imageLoading={'eager'}
			/>

			<TwoCardorFourCardLayout
				cards={cards}
				absoluteServerTimes={false}
				imageLoading={'eager'}
			/>
		</>
	);
};
