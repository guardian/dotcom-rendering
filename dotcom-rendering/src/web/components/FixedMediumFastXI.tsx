import type { DCRContainerPalette } from '../../types/front';
import type { TrailType } from '../../types/trails';
import { Card100, Card50_Card25_Card25, Card66_Card33 } from '../lib/slices';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const FixedMediumFastXI = ({
	trails,
	containerPalette,
	showAge,
}: Props) => {
	switch (trails.length) {
		case 0: {
			return null;
		}
		case 1: {
			return (
				<Card100
					cards={trails}
					containerPalette={containerPalette}
					showAge={showAge}
				/>
			);
		}
		case 2: {
			return (
				<Card66_Card33
					cards={trails}
					containerPalette={containerPalette}
					showAge={showAge}
				/>
			);
		}
		case 3: {
			return (
				<Card50_Card25_Card25
					cards={trails}
					containerPalette={containerPalette}
					showAge={showAge}
				/>
			);
		}
		case 4:
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
		default: {
			const topThree = trails.slice(0, 3);
			const remainingCards = trails.slice(3, 11);
			return (
				<>
					<Card50_Card25_Card25
						cards={topThree}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
					{/*
					 * This pattern of using wrapCards on the UL + percentage=25 and stretch=true
					 * on the LI creates a dynanic list of cards over two rows where the second row
					 * only appears when there are more than 4 cards
					 *
					 * E.g:
					 * ._____._____._____._____.
					 * |_____|_____|_____|_____|
					 * |___________|___________|
					 */}
					<UL direction="row" wrapCards={true}>
						{remainingCards.map((trail, trailIndex) => (
							<LI
								padSides={true}
								offsetBottomPaddingOnDivider={
									trails.length === 11
										? false
										: trailIndex < 4
								}
								showDivider={trailIndex % 4 !== 0}
								percentage="25%"
								stretch={true}
							>
								<FrontCard
									trail={trail}
									containerPalette={containerPalette}
									showAge={showAge}
									imageUrl={undefined}
									headlineSize="small"
								/>
							</LI>
						))}
					</UL>
				</>
			);
		}
	}
};
