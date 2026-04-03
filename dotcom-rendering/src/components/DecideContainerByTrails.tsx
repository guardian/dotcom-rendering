import { isMediaCard } from '../lib/cardHelpers';
import { takeFirst, type Tuple } from '../lib/tuple';
import { palette } from '../palette';
import type { AspectRatio, DCRFrontCard } from '../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import type { Loading } from './CardPicture';
import { FrontCard } from './FrontCard';

type Props = {
	trails: DCRFrontCard[];
	imageLoading: Loading;
	aspectRatio: AspectRatio;
};

type CardProps = {
	imageLoading: Loading;
	aspectRatio: AspectRatio;
};

export const OneCard = ({
	trail,
	imageLoading,
	aspectRatio,
}: {
	trail: DCRFrontCard;
} & CardProps) => {
	return (
		<UL showTopBar={false} padBottom={true}>
			<LI
				padSides={true}
				verticalDividerColour={palette('--card-border-supporting')}
			>
				<FrontCard
					trail={trail}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
					mediaPositionOnDesktop="right"
					mediaPositionOnMobile="top"
					showTopBarDesktop={false}
					showTopBarMobile={false}
					mediaSize="medium"
					trailText={trail.trailText}
					showAge={true}
					ageFormat="absolute"
					avatarUrl={undefined}
				/>
			</LI>
		</UL>
	);
};

export const TwoCard = ({
	trails,
	imageLoading,
	aspectRatio,
}: {
	trails: Tuple<DCRFrontCard, 2>;
} & CardProps) => {
	return (
		<UL direction="row">
			{trails.map((trail, index) => (
				<LI
					key={trail.url}
					percentage="50%"
					padSides={true}
					showDivider={index > 0}
					verticalDividerColour={palette('--card-border-supporting')}
				>
					<FrontCard
						trail={trail}
						imageLoading={imageLoading}
						aspectRatio={aspectRatio}
						mediaPositionOnDesktop="left"
						mediaPositionOnMobile="left"
						showTopBarDesktop={false}
						showTopBarMobile={false}
						mediaSize="small"
						containerType="flexible/general"
						showAge={true}
						ageFormat="absolute"
						avatarUrl={undefined}
					/>
				</LI>
			))}
		</UL>
	);
};

export const ThreeCard = ({
	trails,
	imageLoading,
	aspectRatio,
}: {
	trails: Tuple<DCRFrontCard, 3>;
} & CardProps) => {
	return (
		<UL showTopBar={false} padBottom={true} hasLargeSpacing={false}>
			<LI
				padSides={true}
				verticalDividerColour={palette('--card-border-supporting')}
			>
				<FrontCard
					trail={trails[0]}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
				/>
				<FrontCard
					trail={trails[1]}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
				/>
				<FrontCard
					trail={trails[2]}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
				/>
			</LI>
		</UL>
	);
};

export const FourCard = ({
	trails,
	imageLoading,
	aspectRatio,
	showTopBarDesktop = false,
	showImages = true,
}: {
	trails: Tuple<DCRFrontCard, 4>;
	showTopBarDesktop?: boolean;
	showImages?: boolean;
} & CardProps) => {
	const MyCard = ({ trail, i }: { trail: DCRFrontCard; i: number }) => (
		<FrontCard
			key={i}
			trail={trail}
			imageLoading={imageLoading}
			containerType="scrollable/medium"
			headlineSizes={{
				desktop: 'xsmall',
				tablet: 'xxsmall',
			}}
			mediaPositionOnDesktop={
				// isMediaCard(trail.format) ? 'top' : 'bottom'
				'top'
			}
			mediaPositionOnMobile={isMediaCard(trail.format) ? 'top' : 'bottom'}
			mediaSize="scrollable-medium"
			aspectRatio={aspectRatio}
			kickerText={trail.kickerText}
			showLivePlayable={false}
			showTopBarDesktop={showTopBarDesktop}
			showTopBarMobile={false}
			canPlayInline={false}
			image={showImages ? trail.image : undefined}
		/>
	);

	return (
		<UL direction="row" padBottom={true} hasLargeSpacing={true}>
			{trails.map((trail, i) => (
				<LI
					stretch={false}
					percentage="25%"
					key={trail.url}
					padSides={true}
					showDivider={i > 0}
				>
					<MyCard key={trail.url} trail={trail} i={i} />
				</LI>
			))}
		</UL>
	);
};

export const FiveCard = ({
	trails,
	imageLoading,
	aspectRatio,
}: {
	trails: Tuple<DCRFrontCard, 5>;
} & CardProps) => {
	return (
		<>
			<OneCard
				trail={trails[0]}
				imageLoading={imageLoading}
				aspectRatio={aspectRatio}
			/>
			<FourCard
				trails={trails.slice(1, 5) as Tuple<DCRFrontCard, 4>}
				showTopBarDesktop={true}
				imageLoading={imageLoading}
				aspectRatio={aspectRatio}
			/>
		</>
	);
};

export const SixCard = ({
	trails,
	imageLoading,
	aspectRatio,
}: {
	trails: Tuple<DCRFrontCard, 6>;
} & CardProps) => {
	return (
		<>
			<TwoCard
				trails={trails.slice(0, 2) as Tuple<DCRFrontCard, 2>}
				imageLoading={imageLoading}
				aspectRatio={aspectRatio}
			/>
			<FourCard
				trails={trails.slice(2, 6) as Tuple<DCRFrontCard, 4>}
				imageLoading={imageLoading}
				aspectRatio={aspectRatio}
				showTopBarDesktop={true}
			/>
		</>
	);
};

export const SevenCard = ({
	trails,
	imageLoading,
	aspectRatio,
}: {
	trails: Tuple<DCRFrontCard, 7>;
} & CardProps) => {
	return (
		<>
			<ThreeCard
				trails={trails.slice(0, 3) as Tuple<DCRFrontCard, 3>}
				imageLoading={imageLoading}
				aspectRatio={aspectRatio}
			/>
			<FourCard
				trails={trails.slice(3, 7) as Tuple<DCRFrontCard, 4>}
				imageLoading={imageLoading}
				aspectRatio={aspectRatio}
				showTopBarDesktop={true}
			/>
		</>
	);
};

export const EightOrMore = ({
	trails,
	imageLoading,
	aspectRatio,
}: {
	trails: [...Tuple<DCRFrontCard, 8>, ...DCRFrontCard[]];
} & CardProps) => {
	const numContainers = Math.floor(trails.length / 4);

	return (
		<>
			<FourCard
				trails={trails.slice(0, 4) as Tuple<DCRFrontCard, 4>}
				imageLoading={imageLoading}
				aspectRatio={aspectRatio}
			/>
			{Array.from({ length: numContainers }).map((_, i) => (
				<FourCard
					key={i}
					trails={
						trails.slice(i * 4 + 4, i * 4 + 8) as Tuple<
							DCRFrontCard,
							4
						>
					}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
					showImages={false}
					showTopBarDesktop={true}
				/>
			))}
		</>
	);
};

export const DecideContainerByTrails = ({
	trails,
	imageLoading,
	aspectRatio,
}: Props) => {
	const initialTrails = takeFirst(trails, 8);
	switch (initialTrails.length) {
		case 0:
			return <></>;
		case 1:
			return (
				<OneCard
					trail={initialTrails[0]}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
				/>
			);
		case 2:
			return (
				<TwoCard
					trails={initialTrails}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
				/>
			);
		case 3:
			return (
				<ThreeCard
					trails={initialTrails}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
				/>
			);
		case 4:
			return (
				<FourCard
					trails={initialTrails}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
				/>
			);
		case 5:
			return (
				<FiveCard
					trails={initialTrails}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
				/>
			);
		case 6:
			return (
				<SixCard
					trails={initialTrails}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
				/>
			);
		case 7:
			return (
				<SevenCard
					trails={initialTrails}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
				/>
			);
		case 8:
			return (
				<EightOrMore
					trails={[...initialTrails, ...trails.slice(8)]}
					imageLoading={imageLoading}
					aspectRatio={aspectRatio}
				/>
			);
	}
};
