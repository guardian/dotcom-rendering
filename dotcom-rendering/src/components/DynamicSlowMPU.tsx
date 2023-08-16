import { Hide } from '@guardian/source-react-components';
import {
	Card33Media33,
	CardDefault,
	CardDefaultMediaMobile,
} from '../lib/cardWrappers';
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
import { AdSlot } from './AdSlot';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import type { Loading } from './CardPicture';

type Props = {
	groupedTrails: DCRGroupedTrails;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	adIndex: number;
	renderAds: boolean;
	imageLoading: Loading;
};

/* .___________.___________.___________.
 * |###########|___________|           |
 * |           |___________|    MPU    |
 * |___________|___________|___________|
 */
const Card33_ColumnOfThree33_Ad33 = ({
	cards,
	containerPalette,
	showAge,
	adIndex,
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	adIndex: number;
}) => {
	const card33 = cards.slice(0, 1);
	const cards33 = cards.slice(1, 4);

	return (
		<UL direction="row">
			{card33.map((card) => (
				<LI percentage="33.333%" padSides={true} key={card.url}>
					<Card33Media33
						trail={card}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
				</LI>
			))}

			<LI
				percentage="33.333%"
				showDivider={true}
				containerPalette={containerPalette}
			>
				<UL direction="column">
					{cards33.map((card) => (
						<LI padSides={true} key={card.url}>
							<CardDefault
								trail={card}
								containerPalette={containerPalette}
								showAge={showAge}
							/>
						</LI>
					))}
				</UL>
			</LI>
			<LI percentage="33.333%" padSides={true} showDivider={true}>
				<Hide until="tablet">
					<AdSlot position="inline" index={adIndex} />
				</Hide>
			</LI>
		</UL>
	);
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

/* ._________________._________________.
 * |_###_____________|                 |
 * |_###_____________|       MPU       |
 * |_###_____________|_________________|
 */
const ColumnOfThree50_Ad50 = ({
	cards,
	containerPalette,
	showAge,
	adIndex,
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	adIndex: number;
}) => {
	const cards50 = cards.slice(0, 3);

	return (
		<UL direction="row">
			<LI percentage="50%">
				<UL direction="column">
					{cards50.map((card) => (
						<LI padSides={true} key={card.url}>
							<CardDefaultMediaMobile
								trail={card}
								containerPalette={containerPalette}
								showAge={showAge}
								imageLoading={imageLoading}
							/>
						</LI>
					))}
				</UL>
			</LI>
			<LI percentage="50%" padSides={true} showDivider={true}>
				<Hide until="tablet">
					<AdSlot position="inline" index={adIndex} />
				</Hide>
			</LI>
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
	adIndex,
	renderAds,
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
		| 'standard'
		| 'noFirstSliceNoMPU'
		| 'noFirstSliceNoMPUThreeOrMore'
		| 'standardNoMPU'
		| 'standardNoMPUFourOrMore';

	let secondSliceCards: DCRFrontCard[] = [];
	const standards = [
		// Demote any left over 'big' grouped cards
		...secondSliceGroupedTrails.big,
		...secondSliceGroupedTrails.standard,
	];

	if (firstSliceCards.length === 0) {
		if (renderAds) {
			secondSliceCards = standards;
			secondSliceLayout = 'noFirstSlice';
		} else {
			if (standards.length > 2) {
				secondSliceCards = standards.slice(0, 4);
				secondSliceLayout = 'noFirstSliceNoMPUThreeOrMore';
			} else {
				secondSliceCards = standards.slice(0, 2);
				secondSliceLayout = 'noFirstSliceNoMPU';
			}
		}
	} else {
		if (renderAds) {
			secondSliceCards = standards;
			secondSliceLayout = 'standard';
		} else {
			if (standards.length > 3) {
				secondSliceCards = standards.slice(0, 5);
				secondSliceLayout = 'standardNoMPUFourOrMore';
			} else {
				secondSliceCards = standards.slice(0, 3);
				secondSliceLayout = 'standardNoMPU';
			}
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
			// With MPU
			case 'standard':
				return (
					<ColumnOfThree50_Ad50
						cards={secondSliceCards}
						containerPalette={containerPalette}
						showAge={showAge}
						adIndex={adIndex}
						imageLoading={imageLoading}
					/>
				);
			case 'noFirstSlice':
				return (
					<Card33_ColumnOfThree33_Ad33
						cards={secondSliceCards}
						containerPalette={containerPalette}
						showAge={showAge}
						adIndex={adIndex}
						imageLoading={imageLoading}
					/>
				);
			// Without MPU
			case 'standardNoMPU':
				return (
					<Card33_Card33_Card33
						cards={secondSliceCards}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
				);

			case 'standardNoMPUFourOrMore':
				return (
					<ColumnOfCards50_Card25_Card25
						cards={secondSliceCards}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
				);

			case 'noFirstSliceNoMPU':
				return (
					<Card50_Card50
						cards={secondSliceCards}
						containerPalette={containerPalette}
						showAge={showAge}
						imageLoading={imageLoading}
					/>
				);
			case 'noFirstSliceNoMPUThreeOrMore':
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
