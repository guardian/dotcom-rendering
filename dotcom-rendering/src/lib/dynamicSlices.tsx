import { LI } from '../components/Card/components/LI';
import { UL } from '../components/Card/components/UL';
import type { Loading } from '../components/CardPicture';
import type { DCRContainerPalette, DCRFrontCard } from '../types/front';
import { Card25Media25Tall, Card50Media50 } from './cardWrappers';

/* ._________________.________.________.
 * |#################|########|########|
 * |                 |        |        |
 * |_________________|________|________|
 */
export const Card50_Card25_Card25 = ({
	cards,
	containerPalette,
	showAge,
	serverTime,
	imageLoading,
}: {
	cards: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	serverTime?: number;
}) => {
	const card50 = cards.slice(0, 1);
	const cards25 = cards.slice(1, 3);

	return (
		<UL direction="row" padBottom={true}>
			{card50.map((trail) => (
				<LI key={trail.url} percentage="50%" padSides={true}>
					<Card50Media50
						trail={trail}
						containerPalette={containerPalette}
						showAge={showAge}
						serverTime={serverTime}
						imageLoading={imageLoading}
					/>
				</LI>
			))}

			{cards25.map((trail) => (
				<LI
					key={trail.url}
					percentage="25%"
					padSides={true}
					showDivider={true}
				>
					<Card25Media25Tall
						trail={trail}
						containerPalette={containerPalette}
						showAge={showAge}
						serverTime={serverTime}
						imageLoading={imageLoading}
					/>
				</LI>
			))}
		</UL>
	);
};

/**
 * Abstraction to decide whether to show padding on wrapped rows of cards.
 *
 * For three columns, We have different results with 5 or 9 cards
 *
 * @example - All but last 2
 * ```
 * ┌───┐ ┌───┐ ┌───┐
 * │Pad│ │Pad│ │Pad│
 * └───┘ └───┘ └───┘
 * ┌───┐ ┌───┐
 * │No!│ │No!│
 * └───┘ └───┘
 * ```
 * - All but last 3
 * ```
 * ┌───┐ ┌───┐ ┌───┐
 * │Pad│ │Pad│ │Pad│
 * └───┘ └───┘ └───┘
 * ┌───┐ ┌───┐ ┌───┐
 * │Pad│ │Pad│ │Pad│
 * └───┘ └───┘ └───┘
 * ┌───┐ ┌───┐ ┌───┐
 * │No!│ │No!│ │No!│
 * └───┘ └───┘ └───┘
 * ```
 *
 * @param index - Index of the current card
 * @param totalCards - Total number of cards being shown
 * @param cardsPerRow - No. of cards in each row (if full)
 */
export const shouldPadWrappableRows = (
	index: number,
	totalCards: number,
	cardsPerRow: number,
): boolean => index < totalCards - (totalCards % cardsPerRow || cardsPerRow);
