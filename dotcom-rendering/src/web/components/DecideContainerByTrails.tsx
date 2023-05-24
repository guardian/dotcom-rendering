import type { DCRFrontCard } from '../../types/front';
import {
	Card100Media50,
	Card25Media25,
	Card33Media33,
	Card50Media50,
	CardDefault,
} from '../lib/cardWrappers';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';

type Props = {
	trails: DCRFrontCard[];
	speed: 'fast' | 'slow';
};

export const OneCardFast = ({ trail }: { trail: DCRFrontCard }) => {
	return (
		<UL direction="row">
			<LI percentage="100%" padSides={true}>
				<Card100Media50 trail={trail} showAge={true} />
			</LI>
		</UL>
	);
};

export const TwoCardFast = ({ trails }: { trails: DCRFrontCard[] }) => {
	if (!trails[0] || !trails[1]) return <></>;
	return (
		<UL direction="row">
			<LI percentage="50%" padSides={true}>
				<Card50Media50 trail={trails[0]} showAge={true} />
			</LI>
			<LI percentage="50%" padSides={true}>
				<Card50Media50 trail={trails[1]} showAge={true} />
			</LI>
		</UL>
	);
};

export const ThreeCardFast = ({ trails }: { trails: DCRFrontCard[] }) => {
	if (!trails[0] || !trails[1] || !trails[2]) return <></>;
	return (
		<UL direction="row">
			<LI percentage="33.333%" padSides={true}>
				<Card33Media33 trail={trails[0]} showAge={true} />
			</LI>
			<LI percentage="33.333%" padSides={true}>
				<Card33Media33 trail={trails[1]} showAge={true} />
			</LI>
			<LI percentage="33.333%" padSides={true}>
				<Card33Media33 trail={trails[2]} showAge={true} />
			</LI>
		</UL>
	);
};

export const FourCardFast = ({ trails }: { trails: DCRFrontCard[] }) => {
	if (!trails[0] || !trails[1] || !trails[2] || !trails[3]) return <></>;
	return (
		<UL direction="row">
			<LI percentage="25%" padSides={true}>
				<Card25Media25 trail={trails[0]} showAge={true} />
			</LI>
			<LI percentage="25%" padSides={true}>
				<Card25Media25 trail={trails[1]} showAge={true} />
			</LI>
			<LI percentage="25%" padSides={true}>
				<Card25Media25 trail={trails[2]} showAge={true} />
			</LI>
			<LI percentage="25%" padSides={true}>
				<Card25Media25 trail={trails[3]} showAge={true} />
			</LI>
		</UL>
	);
};

export const FiveCardFast = ({ trails }: { trails: DCRFrontCard[] }) => {
	if (!trails[0] || !trails[1] || !trails[2] || !trails[3] || !trails[4])
		return <></>;
	return (
		<UL direction="row">
			<LI percentage="33.333%" padSides={true}>
				<Card33Media33 trail={trails[0]} showAge={true} />
			</LI>
			<LI percentage="33.333%" padSides={true}>
				<Card33Media33 trail={trails[1]} showAge={true} />
			</LI>
			<LI percentage="33.333%">
				<UL direction="column" showDivider={true}>
					<LI padSides={true}>
						<CardDefault trail={trails[2]} showAge={true} />
					</LI>
					<LI padSides={true}>
						<CardDefault trail={trails[3]} showAge={true} />
					</LI>
					<LI padSides={true}>
						<CardDefault trail={trails[4]} showAge={true} />
					</LI>
				</UL>
			</LI>
		</UL>
	);
};

export const SixCardFast = ({ trails }: { trails: DCRFrontCard[] }) => {
	if (
		!trails[0] ||
		!trails[1] ||
		!trails[2] ||
		!trails[3] ||
		!trails[4] ||
		!trails[5]
	)
		return <></>;

	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="25%" padSides={true}>
					<Card25Media25 trail={trails[0]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true}>
					<Card25Media25 trail={trails[1]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true}>
					<Card25Media25 trail={trails[2]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true}>
					<Card25Media25 trail={trails[3]} showAge={true} />
				</LI>
			</UL>
			<UL direction="row">
				<LI percentage="50%" padSides={true}>
					<CardDefault trail={trails[4]} showAge={true} />
				</LI>
				<LI percentage="50%" padSides={true}>
					<CardDefault trail={trails[5]} showAge={true} />
				</LI>
			</UL>
		</>
	);
};
export const SevenCardFast = ({ trails }: { trails: DCRFrontCard[] }) => {
	if (
		!trails[0] ||
		!trails[1] ||
		!trails[2] ||
		!trails[3] ||
		!trails[4] ||
		!trails[5] ||
		!trails[6]
	)
		return <></>;

	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="25%" padSides={true}>
					<Card25Media25 trail={trails[0]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true}>
					<Card25Media25 trail={trails[1]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true}>
					<Card25Media25 trail={trails[2]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true}>
					<Card25Media25 trail={trails[3]} showAge={true} />
				</LI>
			</UL>
			<UL direction="row">
				<LI percentage="33.333%" padSides={true}>
					<CardDefault trail={trails[4]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true}>
					<CardDefault trail={trails[5]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true}>
					<CardDefault trail={trails[6]} showAge={true} />
				</LI>
			</UL>
		</>
	);
};

export const EightCardFast = ({ trails }: { trails: DCRFrontCard[] }) => {
	if (
		!trails[0] ||
		!trails[1] ||
		!trails[2] ||
		!trails[3] ||
		!trails[4] ||
		!trails[5] ||
		!trails[6] ||
		!trails[7]
	)
		return <></>;

	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="25%" padSides={true}>
					<Card25Media25 trail={trails[0]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true}>
					<Card25Media25 trail={trails[1]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true}>
					<Card25Media25 trail={trails[2]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true}>
					<Card25Media25 trail={trails[3]} showAge={true} />
				</LI>
			</UL>
			<UL direction="row">
				<LI percentage="25%" padSides={true}>
					<CardDefault trail={trails[4]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true}>
					<CardDefault trail={trails[5]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true}>
					<CardDefault trail={trails[6]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true}>
					<CardDefault trail={trails[6]} showAge={true} />
				</LI>
			</UL>
		</>
	);
};

export const DecideContainerByTrails = ({ trails }: Props) => {
	// TODO: Respect 'speed'

	switch (trails.length) {
		case 1:
			return trails[0] !== undefined ? (
				<OneCardFast trail={trails[0]} />
			) : null;
		case 2:
			return <TwoCardFast trails={trails} />;
		case 3:
			return <ThreeCardFast trails={trails} />;
		case 4:
			return <FourCardFast trails={trails} />;
		case 5:
			return <FiveCardFast trails={trails} />;
		case 6:
			return <SixCardFast trails={trails} />;
		case 7:
			return <SevenCardFast trails={trails} />;
		case 8:
			return <EightCardFast trails={trails} />;
		default:
			// Fallback ensures we always render something
			return (
				<UL wrapCards={true} direction="row">
					{trails.map((trail) => (
						<LI key={trail.url} percentage="25%" padSides={true}>
							<CardDefault trail={trail} showAge={true} />
						</LI>
					))}
				</UL>
			);
	}
};
