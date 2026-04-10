import { takeFirst, type Tuple } from '../lib/tuple';
import type { AspectRatio, DCRFrontCard } from '../types/front';
import type { Props as CardProps } from './Card/Card';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import type { Loading } from './CardPicture';
import { FrontCard } from './FrontCard';

type Props = {
	trails: DCRFrontCard[];
	imageLoading: Loading;
	aspectRatio: AspectRatio;
};

const defaultCardProps: Partial<CardProps> = {
	showAge: true,
	ageFormat: 'absolute',
	avatarUrl: undefined,
	canPlayInline: false,
};

export const OneCard = ({
	trails,
	imageLoading,
	aspectRatio,
}: {
	trails: Tuple<DCRFrontCard, 1>;
} & Props) => (
	<UL padBottom={true}>
		<LI padSides={true}>
			<FrontCard
				{...defaultCardProps}
				trail={trails[0]}
				imageLoading={imageLoading}
				aspectRatio={aspectRatio}
				mediaPositionOnDesktop="right"
				mediaPositionOnMobile="top"
				showTopBarDesktop={false}
				showTopBarMobile={true}
				mediaSize="medium"
				trailText={trails[0].trailText}
				headlineSizes={{
					desktop: 'small',
					tablet: 'small',
					mobile: 'small',
				}}
			/>
		</LI>
	</UL>
);

export const TwoCard = ({
	trails,
	imageLoading,
	aspectRatio,
}: {
	trails: Tuple<DCRFrontCard, 2>;
} & Props) => {
	return (
		<UL direction="row" padBottom={true}>
			{trails.map((trail, index) => (
				<LI key={trail.url} padSides={true} showDivider={index > 0}>
					<FrontCard
						{...defaultCardProps}
						trail={trail}
						imageLoading={imageLoading}
						aspectRatio={aspectRatio}
						mediaPositionOnDesktop="left"
						mediaPositionOnMobile="left"
						showTopBarDesktop={false}
						showTopBarMobile={true}
						mediaSize="small"
						containerType="flexible/general"
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
} & Props) => {
	return (
		<UL direction="row" padBottom={true}>
			{trails.map((trail, index) => (
				<LI key={trail.url} padSides={true} showDivider={index > 0}>
					<FrontCard
						{...defaultCardProps}
						trail={trail}
						imageLoading={imageLoading}
						aspectRatio={aspectRatio}
						mediaPositionOnDesktop="top"
						mediaPositionOnMobile="left"
						showTopBarDesktop={false}
						showTopBarMobile={true}
						mediaSize="medium"
						trailText={trail.trailText}
					/>
				</LI>
			))}
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
} & Props) => (
	<UL direction="row" padBottom={true}>
		{trails.map((trail, index) => (
			<LI key={trail.url} padSides={true} showDivider={index > 0}>
				<FrontCard
					{...defaultCardProps}
					key={trail.url}
					trail={trail}
					imageLoading={imageLoading}
					containerType="scrollable/medium"
					mediaPositionOnDesktop="top"
					mediaPositionOnMobile="top"
					mediaSize="scrollable-medium"
					aspectRatio={aspectRatio}
					kickerText={trail.kickerText}
					showLivePlayable={false}
					showTopBarDesktop={showTopBarDesktop}
					showTopBarMobile={true}
					image={showImages ? trail.image : undefined}
				/>
			</LI>
		))}
	</UL>
);

export const FiveCard = ({
	trails,
	imageLoading,
	aspectRatio,
}: {
	trails: Tuple<DCRFrontCard, 5>;
} & Props) => {
	return (
		<>
			<OneCard
				trails={trails.slice(0, 1) as Tuple<DCRFrontCard, 1>}
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
} & Props) => {
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
} & Props) => {
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
} & Props) => {
	const numContainers = Math.floor(trails.length / 4);

	return (
		<>
			<FourCard
				trails={trails.slice(0, 4) as Tuple<DCRFrontCard, 4>}
				imageLoading={imageLoading}
				aspectRatio={aspectRatio}
			/>
			{Array.from({ length: numContainers }).map((_, index) => {
				const nextTrails = trails.slice(
					index * 4 + 4,
					index * 4 + 8,
				) as Tuple<DCRFrontCard, 4>;

				return (
					<FourCard
						key={index}
						trails={nextTrails}
						imageLoading={imageLoading}
						aspectRatio={aspectRatio}
						showImages={false}
						showTopBarDesktop={true}
					/>
				);
			})}
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
			return null;
		case 1:
			return (
				<OneCard
					trails={initialTrails}
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
