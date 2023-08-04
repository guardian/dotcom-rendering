import { Hide } from '@guardian/source-react-components';
import {
	Card25Media25SmallHeadline,
	Card33Media33Tall,
	CardDefault,
} from '../lib/cardWrappers.tsx';
import type { DCRContainerPalette, DCRFrontCard } from '../types/front.ts';
import { AdSlot } from './AdSlot.tsx';
import { LI } from './Card/components/LI.tsx';
import { UL } from './Card/components/UL.tsx';

type Props = {
	trails: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	adIndex: number;
	renderAds: boolean;
};

export const FixedSmallSlowVMPU = ({
	trails,
	containerPalette,
	showAge,
	adIndex,
	renderAds,
}: Props) => {
	const firstSlice33 = trails.slice(0, 1);
	const remaining = trails.slice(1, 4);
	{
		return renderAds ? (
			<UL direction="row">
				{firstSlice33.map((trail) => (
					<LI percentage="33.333%" padSides={true} key={trail.url}>
						<Card33Media33Tall
							trail={trail}
							containerPalette={containerPalette}
							showAge={showAge}
						/>
					</LI>
				))}
				<LI
					percentage="33.333%"
					padSides={true}
					showDivider={true}
					containerPalette={containerPalette}
				>
					<UL direction="column">
						{remaining.map((trail) => (
							<LI key={trail.url}>
								<CardDefault
									trail={trail}
									containerPalette={containerPalette}
									showAge={showAge}
								/>
							</LI>
						))}
					</UL>
				</LI>
				<LI
					percentage="33.333%"
					padSides={true}
					showDivider={true}
					containerPalette={containerPalette}
				>
					<Hide until="tablet">
						<AdSlot position="inline" index={adIndex} />
					</Hide>
				</LI>
			</UL>
		) : (
			<UL direction="row" padBottom={true}>
				{trails.slice(0, 4).map((card, cardIndex) => {
					return (
						<LI
							padSides={true}
							percentage="25%"
							showDivider={cardIndex > 0}
							containerPalette={containerPalette}
							key={card.url}
						>
							<Card25Media25SmallHeadline
								trail={card}
								containerPalette={containerPalette}
								showAge={showAge}
							/>
						</LI>
					);
				})}
			</UL>
		);
	}
};
