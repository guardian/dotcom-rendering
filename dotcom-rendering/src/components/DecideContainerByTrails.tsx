import {
	Card100Media50,
	Card100Media75,
	Card25Media25,
	Card33Media33,
	Card50Media50,
	CardDefault,
} from '../lib/cardWrappers';
import type { Tuple } from '../lib/tuple';
import { isTuple, isTupleOrGreater } from '../lib/tuple';
import type { DCRFrontCard } from '../types/front';
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

export const OneCardSlow = ({ trail }: { trail: DCRFrontCard }) => {
	return (
		<UL direction="row">
			<LI percentage="100%" padSides={true}>
				<Card100Media75 trail={trail} showAge={true} />
			</LI>
		</UL>
	);
};

export const TwoCard = ({ trails }: { trails: Tuple<DCRFrontCard, 2> }) => {
	return (
		<UL direction="row">
			<LI percentage="50%" padSides={true}>
				<Card50Media50 trail={trails[0]} showAge={true} />
			</LI>
			<LI percentage="50%" padSides={true} showDivider={true}>
				<Card50Media50 trail={trails[1]} showAge={true} />
			</LI>
		</UL>
	);
};

export const ThreeCard = ({ trails }: { trails: Tuple<DCRFrontCard, 3> }) => {
	return (
		<UL direction="row">
			<LI percentage="33.333%" padSides={true}>
				<Card33Media33 trail={trails[0]} showAge={true} />
			</LI>
			<LI percentage="33.333%" padSides={true} showDivider={true}>
				<Card33Media33 trail={trails[1]} showAge={true} />
			</LI>
			<LI percentage="33.333%" padSides={true} showDivider={true}>
				<Card33Media33 trail={trails[2]} showAge={true} />
			</LI>
		</UL>
	);
};

export const FourCard = ({ trails }: { trails: Tuple<DCRFrontCard, 4> }) => {
	return (
		<UL direction="row">
			<LI percentage="25%" padSides={true}>
				<Card25Media25 trail={trails[0]} showAge={true} />
			</LI>
			<LI percentage="25%" padSides={true} showDivider={true}>
				<Card25Media25 trail={trails[1]} showAge={true} />
			</LI>
			<LI percentage="25%" padSides={true} showDivider={true}>
				<Card25Media25 trail={trails[2]} showAge={true} />
			</LI>
			<LI percentage="25%" padSides={true} showDivider={true}>
				<Card25Media25 trail={trails[3]} showAge={true} />
			</LI>
		</UL>
	);
};

export const FiveCardFast = ({
	trails,
}: {
	trails: Tuple<DCRFrontCard, 5>;
}) => {
	return (
		<UL direction="row">
			<LI percentage="33.333%" padSides={true}>
				<Card33Media33 trail={trails[0]} showAge={true} />
			</LI>
			<LI percentage="33.333%" padSides={true} showDivider={true}>
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

export const FiveCardSlow = ({
	trails,
}: {
	trails: Tuple<DCRFrontCard, 5>;
}) => {
	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="50%" padSides={true}>
					<Card33Media33 trail={trails[0]} showAge={true} />
				</LI>
				<LI percentage="50%" padSides={true} showDivider={true}>
					<Card33Media33 trail={trails[1]} showAge={true} />
				</LI>
			</UL>
			<UL direction="row">
				<LI percentage="33.333%" padSides={true}>
					<Card33Media33 trail={trails[2]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33 trail={trails[3]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33 trail={trails[4]} showAge={true} />
				</LI>
			</UL>
		</>
	);
};

export const SixCardFast = ({ trails }: { trails: Tuple<DCRFrontCard, 6> }) => {
	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="25%" padSides={true}>
					<Card25Media25 trail={trails[0]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[1]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[2]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[3]} showAge={true} />
				</LI>
			</UL>
			<UL direction="row">
				<LI percentage="50%" padSides={true}>
					<CardDefault trail={trails[4]} showAge={true} />
				</LI>
				<LI percentage="50%" padSides={true} showDivider={true}>
					<CardDefault trail={trails[5]} showAge={true} />
				</LI>
			</UL>
		</>
	);
};

export const SixCardSlow = ({ trails }: { trails: Tuple<DCRFrontCard, 6> }) => {
	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="33.333%" padSides={true}>
					<Card33Media33 trail={trails[0]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33 trail={trails[1]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33 trail={trails[2]} showAge={true} />
				</LI>
			</UL>
			<UL direction="row">
				<LI percentage="33.333%" padSides={true}>
					<Card33Media33 trail={trails[3]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33 trail={trails[4]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33 trail={trails[5]} showAge={true} />
				</LI>
			</UL>
		</>
	);
};

export const SevenCardFast = ({
	trails,
}: {
	trails: Tuple<DCRFrontCard, 7>;
}) => {
	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="25%" padSides={true}>
					<Card25Media25 trail={trails[0]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[1]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[2]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[3]} showAge={true} />
				</LI>
			</UL>
			<UL direction="row">
				<LI percentage="33.333%" padSides={true}>
					<CardDefault trail={trails[4]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<CardDefault trail={trails[5]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<CardDefault trail={trails[6]} showAge={true} />
				</LI>
			</UL>
		</>
	);
};

export const SevenCardSlow = ({
	trails,
}: {
	trails: Tuple<DCRFrontCard, 7>;
}) => {
	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="33.333%" padSides={true}>
					<Card33Media33 trail={trails[0]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33 trail={trails[1]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33 trail={trails[2]} showAge={true} />
				</LI>
			</UL>
			<UL direction="row">
				<LI percentage="33.333%" padSides={true}>
					<Card25Media25 trail={trails[3]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[4]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[5]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[6]} showAge={true} />
				</LI>
			</UL>
		</>
	);
};

export const EightCardFast = ({
	trails,
}: {
	trails: Tuple<DCRFrontCard, 8>;
}) => {
	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="25%" padSides={true}>
					<Card25Media25 trail={trails[0]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[1]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[2]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[3]} showAge={true} />
				</LI>
			</UL>
			<UL direction="row">
				<LI percentage="25%" padSides={true}>
					<CardDefault trail={trails[4]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<CardDefault trail={trails[5]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<CardDefault trail={trails[6]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<CardDefault trail={trails[6]} showAge={true} />
				</LI>
			</UL>
		</>
	);
};

export const EightCardSlow = ({
	trails,
}: {
	trails: Tuple<DCRFrontCard, 8>;
}) => {
	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="25%" padSides={true}>
					<Card25Media25 trail={trails[0]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[1]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[2]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[3]} showAge={true} />
				</LI>
			</UL>
			<UL direction="row">
				<LI percentage="33.333%" padSides={true}>
					<Card25Media25 trail={trails[4]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[5]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[6]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[7]} showAge={true} />
				</LI>
			</UL>
		</>
	);
};

export const BeyondEightFast = ({
	trails,
}: {
	trails: [...Tuple<DCRFrontCard, 8>, ...DCRFrontCard[]];
}) => {
	const firstEight = trails.slice(0, 8) as Tuple<DCRFrontCard, 8>;
	const afterEight = trails.slice(8);

	return (
		<>
			<EightCardFast trails={firstEight} />;
			<UL wrapCards={true} direction="row">
				{afterEight.map((trail, index) => (
					<LI
						key={trail.url}
						percentage="33.333%"
						padSides={true}
						showDivider={index % 3 !== 0}
					>
						<CardDefault trail={trail} showAge={true} />
					</LI>
				))}
			</UL>
		</>
	);
};

export const BeyondEightSlow = ({
	trails,
}: {
	trails: [...Tuple<DCRFrontCard, 8>, ...DCRFrontCard[]];
}) => {
	const firstEight = trails.slice(0, 8) as Tuple<DCRFrontCard, 8>;
	const afterEight = trails.slice(8);

	return (
		<>
			<EightCardSlow trails={firstEight} />;
			<UL wrapCards={true} direction="row">
				{afterEight.map((trail, index) => (
					<LI
						key={trail.url}
						percentage="25%"
						padSides={true}
						showDivider={index % 4 !== 0}
					>
						<Card25Media25 trail={trail} showAge={true} />
					</LI>
				))}
			</UL>
		</>
	);
};

export const DecideContainerByTrails = ({ trails, speed }: Props) => {
	if (speed === 'fast') {
		if (isTuple(trails, 1)) {
			return <OneCardFast trail={trails[0]} />;
		} else if (isTuple(trails, 2)) {
			return <TwoCard trails={trails} />;
		} else if (isTuple(trails, 3)) {
			return <ThreeCard trails={trails} />;
		} else if (isTuple(trails, 4)) {
			return <FourCard trails={trails} />;
		} else if (isTuple(trails, 5)) {
			return <FiveCardFast trails={trails} />;
		} else if (isTuple(trails, 6)) {
			return <SixCardFast trails={trails} />;
		} else if (isTuple(trails, 7)) {
			return <SevenCardFast trails={trails} />;
		} else if (isTuple(trails, 8)) {
			return <EightCardFast trails={trails} />;
		} else if (isTupleOrGreater(trails, 9)) {
			return <BeyondEightFast trails={trails} />;
		} else {
			return <></>;
		}
	} else {
		if (isTuple(trails, 1)) {
			return <OneCardSlow trail={trails[0]} />;
		} else if (isTuple(trails, 2)) {
			return <TwoCard trails={trails} />;
		} else if (isTuple(trails, 3)) {
			return <ThreeCard trails={trails} />;
		} else if (isTuple(trails, 4)) {
			return <FourCard trails={trails} />;
		} else if (isTuple(trails, 5)) {
			return <FiveCardSlow trails={trails} />;
		} else if (isTuple(trails, 6)) {
			return <SixCardSlow trails={trails} />;
		} else if (isTuple(trails, 7)) {
			return <SevenCardSlow trails={trails} />;
		} else if (isTuple(trails, 8)) {
			return <EightCardSlow trails={trails} />;
		} else if (isTupleOrGreater(trails, 9)) {
			return <BeyondEightSlow trails={trails} />;
		} else {
			return <></>;
		}
	}
};
