import {
	Card50Media50,
	CardDefaultMedia,
	CardDefaultMediaMobile,
} from '../lib/cardWrappers';
import {
	Card100PictureRight,
	Card100PictureTop,
	Card25_Card75,
	Card50_Card50,
	Card75_Card25,
	ColumnOfCards50_Card25_Card25,
	filterGroupedTrails,
	shouldPadWrappableRows,
} from '../lib/dynamicSlices';
import type {
	DCRContainerPalette,
	DCRFrontCard,
	DCRGroupedTrails,
} from '../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import type { Loading } from './CardPicture';

type Props = {
	groupedTrails: DCRGroupedTrails;
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

const ColumnOfCards50_Card50 = ({
	cards,
	showAge,
	containerPalette,
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
}) => {
	const big = cards.slice(0, 1);
	const remaining = cards.slice(1);

	return (
		<UL direction="row-reverse">
			{big.map((card) => (
				<LI
					percentage="50%"
					padSides={true}
					showDivider={true}
					containerPalette={containerPalette}
					key={card.url}
				>
					<Card50Media50
						trail={card}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				</LI>
			))}
			<LI percentage="50%">
				<UL direction="row" wrapCards={true}>
					{remaining.map((card) => {
						return (
							<LI
								percentage="100%"
								key={card.url}
								padSides={true}
							>
								<CardDefaultMediaMobile
									trail={card}
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

const ColumnOfCards50_ColumnOfCards50 = ({
	cards,
	showAge,
	containerPalette,
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
}) => {
	return (
		<UL direction="row" wrapCards={true}>
			{cards.map((card, index, { length }) => {
				const columns = 2;
				return (
					<LI
						percentage="50%"
						padSides={true}
						showDivider={index % 2 === 1}
						containerPalette={containerPalette}
						offsetBottomPaddingOnDivider={shouldPadWrappableRows(
							index,
							length - (length % columns),
							columns,
						)}
						key={card.url}
					>
						<CardDefaultMedia
							trail={card}
							containerPalette={containerPalette}
							showAge={showAge}
							imageLoading={imageLoading}
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
	imageLoading,
}: Props) => {
	let firstSliceLayout:
		| undefined // If there are no very bigs or huges, there is no first slice
		| 'oneHuge'
		| 'oneVeryBig'
		| 'twoVeryBigs'
		| 'TwoVeryBigsFirstBoosted'
		| 'TwoVeryBigsSecondBoosted';

	let firstSliceCards: DCRFrontCard[] = [];

	// Decide the layout and contents for the first slice, demoting any remaining cards to the second slice
	if (groupedTrails.huge.length > 0) {
		firstSliceLayout = 'oneHuge';
		firstSliceCards = groupedTrails.huge.slice(0, 1);
	} else if (groupedTrails.veryBig.length === 1) {
		firstSliceLayout = 'oneVeryBig';
		firstSliceCards = groupedTrails.veryBig.slice(0, 1);
	} else if (groupedTrails.veryBig.length > 1) {
		if (groupedTrails.veryBig[0]?.isBoosted) {
			firstSliceLayout = 'TwoVeryBigsFirstBoosted';
		} else if (groupedTrails.veryBig[1]?.isBoosted) {
			firstSliceLayout = 'TwoVeryBigsSecondBoosted';
		} else {
			firstSliceLayout = 'twoVeryBigs';
		}
		firstSliceCards = groupedTrails.veryBig.slice(0, 2);
	}

	// Create our object of grouped trails that doesn't include any
	// cards used by the first slice
	const secondSliceGroupedTrails = filterGroupedTrails({
		groupedTrails,
		filter: firstSliceCards,
	});

	let secondSliceLayout: 'twoBigs' | 'oneBig' | 'noBigs';
	let secondSliceCards: DCRFrontCard[] = [];
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
			// We support up to 8 standards when there are no bigs
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
						imageLoading={imageLoading}
					/>
				);
			case 'oneVeryBig':
				return (
					<Card100PictureRight
						cards={firstSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				);
			case 'TwoVeryBigsFirstBoosted':
				return (
					<Card75_Card25
						cards={firstSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				);
			case 'TwoVeryBigsSecondBoosted':
				return (
					<Card25_Card75
						cards={firstSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				);
			case 'twoVeryBigs':
				return (
					<Card50_Card50
						cards={firstSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				);
			default:
				return null;
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
						imageLoading={imageLoading}
					/>
				);
			case 'oneBig':
				return (
					<ColumnOfCards50_Card50
						cards={secondSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
					/>
				);
			case 'twoBigs':
				return (
					<ColumnOfCards50_Card25_Card25
						cards={secondSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
						imageLoading={imageLoading}
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
