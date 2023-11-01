import { CardDefault } from '../lib/cardWrappers';
import {
	Card25_Card25_Card25_Card25,
	Card25_Card75,
	Card50_Card25_Card25,
	Card50_Card50,
	Card75_Card25,
	ColumnOfCards50_Card25_Card25,
	filterGroupedTrails,
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
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	imageLoading: Loading;
};

/* .___________.___________.___________.
 * |___________|___________|___________|
 */
const Card33_Card33_Card33 = ({
	cards,
	containerPalette,
	showAge,
}: {
	cards: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
}) => {
	return (
		<UL direction="row">
			{cards.slice(0, 3).map((card) => (
				<LI padSides={true} key={card.url} percentage="33.333%">
					<CardDefault
						trail={card}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
				</LI>
			))}
		</UL>
	);
};

/**
 * DynamicSlowMPU
 *
 * This container only allows big and standard cards (from groupedTrails)
 *
 * Layout is dynamic depending on the number of big cards. You're only
 * allowed to have 2 or 3 big cards. If you pass 1 a standard card will
 * get promoted to make two bigs. If you pass more than 3 bigs then the
 * extras will get demoted to standard.
 *
 * If you pass no bigs at all the top slice will not render and a special
 * 3 column layout is used for the remaining slice.
 *
 */
export const DynamicSlowMPU = ({
	groupedTrails,
	containerPalette,
	showAge,
	imageLoading,
}: Props) => {
	let firstSliceLayout:
		| undefined
		| 'twoBigs'
		| 'twoBigsFirstBoosted'
		| 'twoBigsSecondBoosted'
		| 'threeBigs';
	let firstSliceCards: DCRFrontCard[] = [];
	if (groupedTrails.big.length === 1) {
		// If there is only one big item a standard item is promoted such that
		// there is always at least two
		const promoted = groupedTrails.standard.slice(0, 1);
		firstSliceCards = [...groupedTrails.big, ...promoted];
		firstSliceLayout = 'twoBigs';
	} else if (groupedTrails.big.length === 2) {
		firstSliceCards = groupedTrails.big.slice(0, 2);
		if (groupedTrails.big[0]?.isBoosted) {
			firstSliceLayout = 'twoBigsFirstBoosted';
		} else if (groupedTrails.big[1]?.isBoosted) {
			firstSliceLayout = 'twoBigsSecondBoosted';
		} else {
			firstSliceLayout = 'twoBigs';
		}
	} else if (groupedTrails.big.length > 2) {
		firstSliceCards = groupedTrails.big.slice(0, 3);
		firstSliceLayout = 'threeBigs';
	}

	// Create our object of grouped trails that doesn't include any
	// cards used by the first slice
	const secondSliceGroupedTrails = filterGroupedTrails({
		groupedTrails,
		filter: firstSliceCards,
	});

	let secondSliceLayout:
		| 'noFirstSlice'
		| 'noFirstSliceThreeOrMore'
		| 'standard'
		| 'standardFourOrMore';

	let secondSliceCards: DCRFrontCard[] = [];
	const standards = [
		// Demote any left over 'big' grouped cards
		...secondSliceGroupedTrails.big,
		...secondSliceGroupedTrails.standard,
	];

	if (firstSliceCards.length === 0) {
		if (standards.length > 2) {
			secondSliceCards = standards.slice(0, 4);
			secondSliceLayout = 'noFirstSliceThreeOrMore';
		} else {
			secondSliceCards = standards.slice(0, 2);
			secondSliceLayout = 'noFirstSlice';
		}
	} else {
		if (standards.length > 3) {
			secondSliceCards = standards.slice(0, 5);
			secondSliceLayout = 'standardFourOrMore';
		} else {
			secondSliceCards = standards.slice(0, 3);
			secondSliceLayout = 'standard';
		}
	}

	const FirstSlice = () => {
		switch (firstSliceLayout) {
			case 'twoBigs':
				return (
					<Card50_Card50
						cards={firstSliceCards}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
				);
			case 'twoBigsFirstBoosted':
				return (
					<Card75_Card25
						cards={firstSliceCards}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
				);
			case 'twoBigsSecondBoosted':
				return (
					<Card25_Card75
						cards={firstSliceCards}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
				);
			case 'threeBigs':
				return (
					<Card50_Card25_Card25
						cards={firstSliceCards}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
				);
			default:
				return <></>;
		}
	};

	const SecondSlice = () => {
		switch (secondSliceLayout) {
			case 'standard':
				return (
					<Card33_Card33_Card33
						cards={secondSliceCards}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
				);

			case 'standardFourOrMore':
				return (
					<ColumnOfCards50_Card25_Card25
						cards={secondSliceCards}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
				);

			case 'noFirstSlice':
				return (
					<Card50_Card50
						cards={secondSliceCards}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
				);
			case 'noFirstSliceThreeOrMore':
				return (
					<Card25_Card25_Card25_Card25
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
