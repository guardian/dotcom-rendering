/* eslint-disable @typescript-eslint/naming-convention -- because underscores work here*/
import type { TrailType } from 'src/types/trails';
import type { DCRContainerPalette, DCRGroupedTrails } from '../../types/front';
import {
	Card25_Card75,
	Card50_Card50,
	Card75_Card25,
	shouldPadWrappableRows,
} from '../lib/dynamicSlices';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

type Props = {
	groupedTrails: DCRGroupedTrails;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

const Card100PictureTop = ({
	cards,
	showAge,
	containerPalette,
}: {
	cards: TrailType[];
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
}) => {
	if (!cards[0]) return null;
	return (
		<UL>
			<LI percentage="100%" padSides={true} padBottom={true}>
				<FrontCard
					trail={cards[0]}
					containerPalette={containerPalette}
					showAge={showAge}
					headlineSize="huge"
					headlineSizeOnMobile="large"
					imageUrl={cards[0].image}
					imagePosition={'top'}
					imagePositionOnMobile={'top'}
				/>
			</LI>
		</UL>
	);
};

const Card100PictureRight = ({
	cards,
	showAge,
	containerPalette,
}: {
	cards: TrailType[];
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
}) => {
	if (!cards[0]) return null;
	return (
		<UL>
			<LI percentage="100%" padSides={true} padBottom={true}>
				<FrontCard
					trail={cards[0]}
					containerPalette={containerPalette}
					showAge={showAge}
					headlineSize="huge"
					headlineSizeOnMobile="large"
					imageUrl={cards[0].image}
					imageSize={'jumbo'}
					imagePosition={'right'}
					imagePositionOnMobile={'top'}
					trailText={cards[0].trailText}
				/>
			</LI>
		</UL>
	);
};

const ColumnOfCards50_Card50 = ({
	cards,
	showAge,
	containerPalette,
}: {
	cards: TrailType[];
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
}) => {
	const big = cards[0];
	const remaining = cards.slice(1);

	return (
		<UL direction="row-reverse">
			<LI
				percentage="50%"
				padSides={true}
				showDivider={true}
				padBottomOnMobile={true}
			>
				<FrontCard
					trail={big}
					containerPalette={containerPalette}
					headlineSizeOnMobile="large"
					showAge={showAge}
					trailText={big.trailText}
					imagePositionOnMobile="top"
				/>
			</LI>
			<LI percentage="50%">
				<UL direction="row" wrapCards={true}>
					{remaining.map((card, cardIndex) => {
						return (
							<LI
								percentage="100%"
								key={card.url}
								padSides={true}
								showTopMarginWhenStacked={false}
								padBottom={cardIndex < remaining.length - 1}
								padBottomOnMobile={
									cardIndex < remaining.length - 1
								}
							>
								<FrontCard
									trail={card}
									containerPalette={containerPalette}
									showAge={showAge}
									supportingContent={card.supportingContent}
									imagePosition="left"
									imagePositionOnMobile="left"
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};

const ColumnOfCards50_Card25_Card25 = ({
	cards,
	showAge,
	containerPalette,
}: {
	cards: TrailType[];
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
}) => {
	const bigs = cards.slice(0, 2);
	const remaining = cards.slice(2);

	return (
		<UL direction="row-reverse">
			{bigs.map((big) => {
				return (
					<LI
						percentage="25%"
						padSides={true}
						padBottomOnMobile={true}
						showDivider={true}
					>
						<FrontCard
							trail={big}
							containerPalette={containerPalette}
							showAge={showAge}
							trailText={big.trailText}
							imagePositionOnMobile="left"
						/>
					</LI>
				);
			})}
			<LI percentage="50%">
				<UL direction="row" wrapCards={true}>
					{remaining.map((card, cardIndex) => {
						return (
							<LI
								percentage="100%"
								key={card.url}
								padSides={true}
								showTopMarginWhenStacked={false}
								padBottom={cardIndex < remaining.length - 1}
								padBottomOnMobile={
									cardIndex < remaining.length - 1
								}
							>
								<FrontCard
									trail={card}
									containerPalette={containerPalette}
									showAge={showAge}
									supportingContent={card.supportingContent}
									imagePosition="left"
									imagePositionOnMobile="none"
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};

const ColumnOfCards50_ColumnOfCards50 = ({
	cards,
	showAge,
	containerPalette,
}: {
	cards: TrailType[];
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
}) => {
	return (
		<UL direction="row" wrapCards={true}>
			{cards.map((card, index) => {
				return (
					<LI
						percentage="50%"
						padSides={true}
						showDivider={index % 2 === 1}
						padBottom={shouldPadWrappableRows(
							index,
							cards.length,
							2,
						)}
					>
						<FrontCard
							trail={card}
							containerPalette={containerPalette}
							showAge={showAge}
							supportingContent={card.supportingContent}
							imagePosition="left"
							imagePositionOnMobile="none"
						/>
					</LI>
				);
			})}
		</UL>
	);
};

/**
 * A `Card` container for up to 8 trails.
 *
 * @see {@link https://www.figma.com/file/sx2vMFHbL7SsUo0LcpsKNe/%E2%AC%A3--Front-container?node-id=123%3A137122 Figma designs}
 */
export const DynamicSlow = ({
	groupedTrails,
	containerPalette,
	showAge,
}: Props) => {
	let firstSliceLayout:
		| undefined // If there are no very bigs or huges, there is no first slice
		| 'oneHuge'
		| 'oneVeryBig'
		| 'twoVeryBigs'
		| 'TwoVeryBigsFirstBoosted'
		| 'TwoVeryBigsSecondBoosted';

	let firstSliceCards: TrailType[] = [];
	// this is updated to container all the trails *not* used in the first slice
	let secondSliceGroupedTrails: DCRGroupedTrails = { ...groupedTrails };

	// Decide the layout and contents for the first slice, demoting any remaining cards to the second slice
	if (groupedTrails.huge.length > 0) {
		firstSliceLayout = 'oneHuge';
		firstSliceCards = groupedTrails.huge.slice(0, 1);
		secondSliceGroupedTrails = {
			...groupedTrails,
			huge: groupedTrails.huge.slice(1),
		};
	} else if (groupedTrails.veryBig.length === 1) {
		firstSliceLayout = 'oneVeryBig';
		firstSliceCards = groupedTrails.veryBig.slice(0, 1);
		secondSliceGroupedTrails = {
			...groupedTrails,
			veryBig: groupedTrails.veryBig.slice(1),
		};
	} else if (groupedTrails.veryBig.length > 1) {
		if (groupedTrails.veryBig[0].isBoosted) {
			firstSliceLayout = 'TwoVeryBigsFirstBoosted';
		} else if (groupedTrails.veryBig[1].isBoosted) {
			firstSliceLayout = 'TwoVeryBigsSecondBoosted';
		} else {
			firstSliceLayout = 'twoVeryBigs';
		}
		firstSliceCards = groupedTrails.veryBig.slice(0, 2);
		secondSliceGroupedTrails = {
			...groupedTrails,
			veryBig: groupedTrails.veryBig.slice(2),
		};
	}

	let secondSliceLayout: 'twoBigs' | 'oneBig' | 'noBigs';
	let secondSliceCards: TrailType[] = [];
	const bigs = [
		// Demote any left over 'huge' or 'veryBig' grouped cards
		...secondSliceGroupedTrails.huge,
		...secondSliceGroupedTrails.veryBig,
		...secondSliceGroupedTrails.big,
	];

	// Decide the contents of the second slice
	switch (bigs.length) {
		case 0: {
			secondSliceLayout = 'noBigs';
			// We support up to 6 standards when there are no bigs
			secondSliceCards = [
				...secondSliceGroupedTrails.standard.slice(0, 8),
			];
			break;
		}
		case 1: {
			secondSliceLayout = 'oneBig';
			secondSliceCards = [
				...bigs.slice(0, 1),
				...secondSliceGroupedTrails.standard.slice(0, 4),
			];
			break;
		}
		default: {
			secondSliceLayout = 'twoBigs';
			// We support up to 2 bigs, any others will be shown as standards,
			// meaning we support 6 total cards for this slice
			secondSliceCards = [
				...bigs,
				...secondSliceGroupedTrails.standard,
			].slice(0, 6);
			break;
		}
	}

	const FirstSlice = () => {
		switch (firstSliceLayout) {
			case 'oneHuge':
				return (
					<Card100PictureTop
						cards={firstSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
					/>
				);
			case 'oneVeryBig':
				return (
					<Card100PictureRight
						cards={firstSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
					/>
				);
			case 'TwoVeryBigsFirstBoosted':
				return (
					<Card75_Card25
						cards={firstSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
					/>
				);
			case 'TwoVeryBigsSecondBoosted':
				return (
					<Card25_Card75
						cards={firstSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
					/>
				);
			case 'twoVeryBigs':
				return (
					<Card50_Card50
						cards={firstSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
					/>
				);
			default:
				return <></>;
		}
	};

	const SecondSlice = () => {
		switch (secondSliceLayout) {
			case 'noBigs':
				return (
					<ColumnOfCards50_ColumnOfCards50
						cards={secondSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
					/>
				);
			case 'oneBig':
				return (
					<ColumnOfCards50_Card50
						cards={secondSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
					/>
				);
			case 'twoBigs':
				return (
					<ColumnOfCards50_Card25_Card25
						cards={secondSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
					/>
				);
		}
	};

	return (
		<>
			<FirstSlice />
			<SecondSlice />
		</>
	);
};
